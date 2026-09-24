/**
 * Project data. Add / remove / reorder freely — the UI follows.
 * Only `youtubeUrl` is required; `thumbnail` defaults to the YouTube still,
 * and falls back to a generated cover if that ever fails to load.
 */

export type Category = 'Short Form' | 'Long Form';

export interface Project {
  id: string;
  title: string;
  category: Category;
  type: string;
  youtubeUrl: string;
  thumbnail?: string;
  duration: string;
  description: string;
}

/** Extract the 11-char video id from any youtu.be / watch?v= URL. */
export function youtubeId(url: string): string {
  const m = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return m ? m[1] : '';
}

export function thumbFor(p: Project, quality: 'max' | 'hq' = 'max'): string {
  if (p.thumbnail) return p.thumbnail;
  const id = youtubeId(p.youtubeUrl);
  return `https://img.youtube.com/vi/${id}/${
    quality === 'max' ? 'maxresdefault' : 'hqdefault'
  }.jpg`;
}

export function embedFor(p: Project): string {
  return `https://www.youtube.com/embed/${youtubeId(
    p.youtubeUrl,
  )}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

export const shortFormProjects: Project[] = [
  {
    id: 'sf-01',
    title: 'Rhythm Cut',
    category: 'Short Form',
    type: 'Reel',
    youtubeUrl: 'https://youtu.be/ziPVMccjoyw',
    duration: '0:42',
    description:
      'Beat-synced edit engineered to stop the scroll in the first second and hold it to the last frame.',
  },
  {
    id: 'sf-02',
    title: 'Momentum',
    category: 'Short Form',
    type: 'Short',
    youtubeUrl: 'https://youtu.be/YLFFs3KMC7k',
    duration: '0:38',
    description:
      'Punchy transitions and dynamic pacing built for maximum retention on vertical platforms.',
  },
  {
    id: 'sf-03',
    title: 'Pulse',
    category: 'Short Form',
    type: 'Reel',
    youtubeUrl: 'https://youtu.be/M1ZIplANIHA',
    duration: '0:51',
    description:
      'Trend-driven editing with clean captions and rhythmic cuts that ride the sound.',
  },
  {
    id: 'sf-04',
    title: 'Snap',
    category: 'Short Form',
    type: 'TikTok',
    youtubeUrl: 'https://youtu.be/52s69frS52I',
    duration: '0:29',
    description:
      'Tight, high-energy edit made for the loop — every frame earns its place.',
  },
  {
    id: 'sf-05',
    title: 'Flux',
    category: 'Short Form',
    type: 'Short',
    youtubeUrl: 'https://youtu.be/iWqRaYxmEo4',
    duration: '0:47',
    description:
      'Story-first short-form with cinematic color and motion that feels effortless.',
  },
  {
    id: 'sf-06',
    title: 'Signal',
    category: 'Short Form',
    type: 'Reel',
    youtubeUrl: 'https://youtu.be/fhCaePXMJGs',
    duration: '0:34',
    description:
      'Sharp sound design paired with kinetic typography for a modern social feel.',
  },
  {
    id: 'sf-07',
    title: 'Spark',
    category: 'Short Form',
    type: 'TikTok',
    youtubeUrl: 'https://youtu.be/tp04JoOj9t8',
    duration: '0:40',
    description:
      'Trend-based editing that keeps the hook front and centre from frame one.',
  },
  {
    id: 'sf-08',
    title: 'Loop',
    category: 'Short Form',
    type: 'Short',
    youtubeUrl: 'https://youtu.be/7LiJSueJM7Y',
    duration: '0:36',
    description:
      'Seamless loop editing with a satisfying rhythm that begs a rewatch.',
  },
  {
    id: 'sf-09',
    title: 'Drift',
    category: 'Short Form',
    type: 'Reel',
    youtubeUrl: 'https://youtu.be/YpoCnKZyyxw',
    duration: '0:44',
    description:
      'Smooth, cinematic short-form with purposeful pacing and a clean grade.',
  },
];

export const longFormProjects: Project[] = [
  {
    id: 'lf-01',
    title: 'The Long Take',
    category: 'Long Form',
    type: 'YouTube',
    youtubeUrl: 'https://youtu.be/L-4wLdjHkEE',
    duration: '12:20',
    description:
      'A story-driven edit that builds tension and pays it off — pacing tuned to hold attention the whole way through.',
  },
  {
    id: 'lf-02',
    title: 'In Conversation',
    category: 'Long Form',
    type: 'Interview',
    youtubeUrl: 'https://youtu.be/CAuVJrm7vhk',
    duration: '18:05',
    description:
      'Multi-cam interview edit with clean flow, b-roll layering and invisible cuts.',
  },
  {
    id: 'lf-03',
    title: 'Field Notes',
    category: 'Long Form',
    type: 'Documentary',
    youtubeUrl: 'https://youtu.be/UaeWjTwaA8U',
    duration: '15:47',
    description:
      'Documentary-style narrative with layered sound design and a cinematic grade.',
  },
  {
    id: 'lf-04',
    title: 'The Breakdown',
    category: 'Long Form',
    type: 'YouTube',
    youtubeUrl: 'https://youtu.be/OuTD1NVmqOI',
    duration: '10:32',
    description:
      'Information-dense edit kept lively with motion graphics and tight pacing.',
  },
  {
    id: 'lf-05',
    title: 'Deep Dive',
    category: 'Long Form',
    type: 'Podcast',
    youtubeUrl: 'https://youtu.be/xH4Fnk3W9H8',
    duration: '24:11',
    description:
      'Podcast edit with dynamic framing, captions and a highlight-ready structure.',
  },
  {
    id: 'lf-06',
    title: 'Origins',
    category: 'Long Form',
    type: 'Documentary',
    youtubeUrl: 'https://youtu.be/MJ67F6TjwdE',
    duration: '16:58',
    description:
      'Narrative documentary edit focused on emotion, rhythm and story arc.',
  },
  {
    id: 'lf-07',
    title: 'The Feature',
    category: 'Long Form',
    type: 'Vlog',
    youtubeUrl: 'https://youtu.be/iPG-lyl-jlY',
    duration: '13:40',
    description:
      'A polished long-form piece balancing entertainment with clarity.',
  },
  {
    id: 'lf-08',
    title: 'Sessions',
    category: 'Long Form',
    type: 'Interview',
    youtubeUrl: 'https://youtu.be/p5fc1kC_oOU',
    duration: '20:26',
    description:
      'Long-form interview edit with seamless transitions and considered pacing.',
  },
];

export const allProjects: Project[] = [
  ...shortFormProjects,
  ...longFormProjects,
];
