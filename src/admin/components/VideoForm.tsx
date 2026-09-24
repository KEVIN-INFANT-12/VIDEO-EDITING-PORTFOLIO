import { useState, type FormEvent } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { Video, VideoInput, VideoCategory } from '../../lib/types';
import { CATEGORY_LABELS } from '../../lib/types';
import { createVideo, updateVideo, ytThumb } from '../../lib/videos';

interface Props {
  video: Video | null; // null = add
  nextOrder: number;
  onClose: () => void;
  onSaved: (msg: string) => void;
}

const field =
  'w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 outline-none transition focus:border-violet-500';
const label = 'mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500';

export default function VideoForm({ video, nextOrder, onClose, onSaved }: Props) {
  const editing = !!video;
  const [form, setForm] = useState<VideoInput>({
    title: video?.title ?? '',
    description: video?.description ?? '',
    category: video?.category ?? 'short_form',
    video_url: video?.video_url ?? '',
    thumbnail_url: video?.thumbnail_url ?? '',
    display_order: video?.display_order ?? nextOrder,
    is_featured: video?.is_featured ?? false,
    is_published: video?.is_published ?? true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');

  const set = <K extends keyof VideoInput>(k: K, v: VideoInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Title is required.';
    if (!form.video_url.trim()) e.video_url = 'Video URL is required.';
    else if (!/^https?:\/\//.test(form.video_url.trim())) e.video_url = 'Enter a valid URL.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setServerError('');
    try {
      const payload: VideoInput = {
        ...form,
        title: form.title.trim(),
        video_url: form.video_url.trim(),
        description: form.description?.trim() || null,
        thumbnail_url: form.thumbnail_url?.trim() || null,
      };
      if (editing) await updateVideo(video!.id, payload);
      else await createVideo(payload);
      onSaved(editing ? 'Video updated.' : 'Video added.');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Save failed.');
      setSaving(false);
    }
  };

  const previewThumb =
    form.thumbnail_url?.trim() || (form.video_url ? ytThumb(form.video_url, 'hq') : '');

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:p-8">
      <div className="my-auto w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900">
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
          <h2 className="text-base font-semibold text-neutral-100">
            {editing ? 'Edit video' : 'Add video'}
          </h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-200" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 p-6" noValidate>
          <div>
            <label className={label} htmlFor="v-title">Title *</label>
            <input id="v-title" className={field} value={form.title} onChange={(e) => set('title', e.target.value)} />
            {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
          </div>

          <div>
            <label className={label} htmlFor="v-url">Video URL *</label>
            <input id="v-url" className={field} placeholder="https://youtu.be/…" value={form.video_url} onChange={(e) => set('video_url', e.target.value)} />
            {errors.video_url && <p className="mt-1 text-xs text-red-400">{errors.video_url}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label} htmlFor="v-cat">Category</label>
              <select id="v-cat" className={field} value={form.category} onChange={(e) => set('category', e.target.value as VideoCategory)}>
                {(Object.keys(CATEGORY_LABELS) as VideoCategory[]).map((c) => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="v-order">Display order</label>
              <input id="v-order" type="number" className={field} value={form.display_order} onChange={(e) => set('display_order', Number(e.target.value))} />
            </div>
          </div>

          <div>
            <label className={label} htmlFor="v-thumb">Thumbnail URL (optional)</label>
            <input id="v-thumb" className={field} placeholder="Auto from YouTube if blank" value={form.thumbnail_url ?? ''} onChange={(e) => set('thumbnail_url', e.target.value)} />
            {previewThumb && (
              <img src={previewThumb} alt="" className="mt-2 h-24 w-full rounded-lg object-cover" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
            )}
          </div>

          <div>
            <label className={label} htmlFor="v-desc">Description (optional, internal)</label>
            <textarea id="v-desc" rows={2} className={`${field} resize-none`} value={form.description ?? ''} onChange={(e) => set('description', e.target.value)} />
          </div>

          <div className="flex flex-wrap gap-6 pt-1">
            <label className="flex items-center gap-2 text-sm text-neutral-300">
              <input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)} className="h-4 w-4 accent-violet-600" />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-300">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => set('is_featured', e.target.checked)} className="h-4 w-4 accent-violet-600" />
              Featured
            </label>
          </div>

          {serverError && <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-300">{serverError}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-neutral-700 px-4 py-2.5 text-sm text-neutral-300 transition hover:bg-neutral-800">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-60">
              {saving && <Loader2 size={15} className="animate-spin" />}
              {editing ? 'Save changes' : 'Add video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
