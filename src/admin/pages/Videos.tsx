import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus, Loader2, Film } from 'lucide-react';
import type { Video } from '../../lib/types';
import {
  listAllVideos,
  updateVideo,
  deleteVideo,
  reorderVideos,
} from '../../lib/videos';
import { useToast } from '../components/Toast';
import SortableVideoRow from '../components/SortableVideoRow';
import VideoForm from '../components/VideoForm';

export default function Videos() {
  const toast = useToast();
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Video | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Video | null>(null);
  const [deleting, setDeleting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const load = () =>
    listAllVideos()
      .then(setVideos)
      .catch((e) => {
        setVideos([]);
        toast(e.message ?? 'Failed to load videos', 'error');
      });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id || !videos) return;
    const oldIndex = videos.findIndex((v) => v.id === active.id);
    const newIndex = videos.findIndex((v) => v.id === over.id);
    const next = arrayMove(videos, oldIndex, newIndex);
    setVideos(next.map((v, i) => ({ ...v, display_order: i }))); // optimistic
    try {
      await reorderVideos(next.map((v) => v.id));
      toast('Order updated.');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Reorder failed', 'error');
      load();
    }
  };

  const patch = async (v: Video, changes: Partial<Video>) => {
    setVideos((prev) => prev?.map((x) => (x.id === v.id ? { ...x, ...changes } : x)) ?? prev);
    try {
      await updateVideo(v.id, changes);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Update failed', 'error');
      load();
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteVideo(deleteTarget.id);
      setVideos((prev) => prev?.filter((v) => v.id !== deleteTarget.id) ?? prev);
      toast('Video deleted.');
      setDeleteTarget(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Delete failed', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const nextOrder = videos && videos.length ? Math.max(...videos.map((v) => v.display_order)) + 1 : 0;

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-100">Videos</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Drag to reorder — the public site follows this order.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          <Plus size={16} /> Add video
        </button>
      </header>

      {videos === null ? (
        <div className="flex justify-center py-20 text-neutral-500">
          <Loader2 className="animate-spin" />
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-neutral-800 py-20 text-center">
          <Film className="text-neutral-600" />
          <p className="text-sm text-neutral-500">No videos yet. Add your first one.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={videos.map((v) => v.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2.5">
              {videos.map((v) => (
                <SortableVideoRow
                  key={v.id}
                  video={v}
                  onEdit={() => {
                    setEditing(v);
                    setFormOpen(true);
                  }}
                  onDelete={() => setDeleteTarget(v)}
                  onTogglePublish={() => patch(v, { is_published: !v.is_published })}
                  onToggleFeature={() => patch(v, { is_featured: !v.is_featured })}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {formOpen && (
        <VideoForm
          video={editing}
          nextOrder={nextOrder}
          onClose={() => setFormOpen(false)}
          onSaved={(msg) => {
            setFormOpen(false);
            toast(msg);
            load();
          }}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
            <h3 className="text-base font-semibold text-neutral-100">Delete video?</h3>
            <p className="mt-2 text-sm text-neutral-400">
              Are you sure you want to delete “{deleteTarget.title}”? This can't be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-neutral-700 px-4 py-2.5 text-sm text-neutral-300 transition hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
              >
                {deleting && <Loader2 size={15} className="animate-spin" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
