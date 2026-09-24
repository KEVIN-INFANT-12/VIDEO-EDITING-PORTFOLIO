import { supabase } from './supabase';
import type { Video, VideoInput } from './types';
import { shortFormProjects, longFormProjects } from '../data/projects';

/* ------------------------- YouTube helpers ------------------------- */

export function ytId(url: string): string {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : '';
}

export function ytThumb(url: string, quality: 'max' | 'hq' = 'max'): string {
  const id = ytId(url);
  if (!id) return '';
  return `https://img.youtube.com/vi/${id}/${
    quality === 'max' ? 'maxresdefault' : 'hqdefault'
  }.jpg`;
}

export function ytEmbed(url: string): string {
  return `https://www.youtube.com/embed/${ytId(
    url,
  )}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

/** Best available cover for a video. */
export function thumbnailFor(v: Pick<Video, 'thumbnail_url' | 'video_url'>): string {
  return v.thumbnail_url || ytThumb(v.video_url, 'max');
}

/* ------------------------- Local fallback ------------------------- */

/** Maps the bundled static projects into the dynamic Video shape. */
export const fallbackVideos: Video[] = [
  ...shortFormProjects.map((p, i) => toFallback(p, 'short_form', i)),
  ...longFormProjects.map((p, i) => toFallback(p, 'long_form', i)),
];

function toFallback(
  p: { id: string; title: string; youtubeUrl: string; description: string },
  category: Video['category'],
  i: number,
): Video {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    category,
    video_url: p.youtubeUrl,
    thumbnail_url: null,
    display_order: i,
    is_featured: i < 2,
    is_published: true,
  };
}

const byOrder = (a: Video, b: Video) =>
  a.display_order - b.display_order ||
  (a.created_at ?? '').localeCompare(b.created_at ?? '');

/* ------------------------- Public reads ------------------------- */

/** Published videos for the public site (Supabase, else local fallback). */
export async function getPublishedVideos(): Promise<Video[]> {
  if (!supabase) return fallbackVideos.filter((v) => v.is_published).sort(byOrder);
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });
  if (error) {
    console.warn('[videos] falling back to local data:', error.message);
    return fallbackVideos.filter((v) => v.is_published).sort(byOrder);
  }
  return (data as Video[]) ?? [];
}

/* ------------------------- Admin CRUD ------------------------- */

export async function listAllVideos(): Promise<Video[]> {
  if (!supabase) return [...fallbackVideos].sort(byOrder);
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data as Video[]) ?? [];
}

export async function createVideo(input: VideoInput): Promise<Video> {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('videos')
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as Video;
}

export async function updateVideo(
  id: string,
  patch: Partial<VideoInput>,
): Promise<Video> {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase
    .from('videos')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Video;
}

export async function deleteVideo(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('videos').delete().eq('id', id);
  if (error) throw error;
}

/** Persist a new ordering. `orderedIds` is the desired top-to-bottom order. */
export async function reorderVideos(orderedIds: string[]): Promise<void> {
  const db = supabase;
  if (!db) throw new Error('Supabase not configured');
  const updates = orderedIds.map((id, index) =>
    db
      .from('videos')
      .update({ display_order: index, updated_at: new Date().toISOString() })
      .eq('id', id),
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;
}
