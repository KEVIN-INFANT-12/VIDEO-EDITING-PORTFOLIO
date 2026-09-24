import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2, Star, Eye, EyeOff } from 'lucide-react';
import type { Video } from '../../lib/types';
import { CATEGORY_LABELS } from '../../lib/types';
import { thumbnailFor } from '../../lib/videos';

interface Props {
  video: Video;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
  onToggleFeature: () => void;
}

export default function SortableVideoRow({
  video,
  onEdit,
  onDelete,
  onTogglePublish,
  onToggleFeature,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: video.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-3 ${
        isDragging ? 'z-10 opacity-80 shadow-xl ring-1 ring-violet-500/40' : ''
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="shrink-0 cursor-grab touch-none text-neutral-600 hover:text-neutral-300 active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical size={18} />
      </button>

      <img
        src={thumbnailFor(video)}
        alt=""
        className="h-12 w-20 shrink-0 rounded-md object-cover"
        onError={(e) => ((e.target as HTMLImageElement).style.visibility = 'hidden')}
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-neutral-100">{video.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-neutral-400">
            {CATEGORY_LABELS[video.category]}
          </span>
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${
              video.is_published
                ? 'bg-emerald-500/15 text-emerald-300'
                : 'bg-amber-500/15 text-amber-300'
            }`}
          >
            {video.is_published ? 'Published' : 'Draft'}
          </span>
          {video.is_featured && (
            <span className="rounded bg-violet-500/15 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-violet-300">
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <IconBtn title={video.is_featured ? 'Unfeature' : 'Feature'} onClick={onToggleFeature} active={video.is_featured}>
          <Star size={16} className={video.is_featured ? 'fill-current' : ''} />
        </IconBtn>
        <IconBtn title={video.is_published ? 'Unpublish' : 'Publish'} onClick={onTogglePublish}>
          {video.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
        </IconBtn>
        <IconBtn title="Edit" onClick={onEdit}>
          <Pencil size={16} />
        </IconBtn>
        <IconBtn title="Delete" onClick={onDelete} danger>
          <Trash2 size={16} />
        </IconBtn>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  active,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  active?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`rounded-lg p-2 transition-colors ${
        active
          ? 'text-violet-300 hover:bg-neutral-800'
          : danger
            ? 'text-neutral-500 hover:bg-red-500/10 hover:text-red-300'
            : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100'
      }`}
    >
      {children}
    </button>
  );
}
