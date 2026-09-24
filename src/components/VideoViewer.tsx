import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { Video } from '../lib/types';
import { CATEGORY_LABELS } from '../lib/types';
import { ytEmbed } from '../lib/videos';

interface Props {
  videos: Video[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Full-screen cinematic viewer — prev/next, index counter, ESC & backdrop close. */
export default function VideoViewer({ videos, index, onClose, onNavigate }: Props) {
  const open = index !== null;
  const video = open ? videos[index] : null;

  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + videos.length) % videos.length);
  }, [index, videos.length, onNavigate]);

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % videos.length);
  }, [index, videos.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    const lenis = (window as unknown as { lenis?: { stop(): void; start(): void } })
      .lenis;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [open, onClose, prev, next]);

  return (
    <AnimatePresence>
      {open && video && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col bg-base-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${video.title} — video`}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="eyebrow truncate">{CATEGORY_LABELS[video.category]}</p>
              <h3 className="truncate font-anton text-2xl uppercase tracking-tight text-chalk sm:text-3xl">
                {video.title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-sm text-muted sm:block">
                {String(index! + 1).padStart(2, '0')} /{' '}
                {String(videos.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={onClose}
                data-cursor="link"
                aria-label="Close"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-chalk transition hover:border-violet-soft hover:bg-violet-glow/20 hover:text-violet-light"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div
            className="flex flex-1 items-center justify-center px-4 pb-4 sm:px-8"
            onClick={onClose}
          >
            <motion.div
              key={video.id}
              className="relative w-full max-w-6xl overflow-hidden rounded-xl border border-white/10 bg-black shadow-glow-lg"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={ytEmbed(video.video_url)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <button
              type="button"
              onClick={prev}
              data-cursor="link"
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted transition hover:text-violet-light"
            >
              <ChevronLeft size={18} className="transition group-hover:-translate-x-1" />
              Prev
            </button>
            <a
              href={video.video_url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-violet-light transition hover:text-violet-soft"
            >
              YouTube <ExternalLink size={14} />
            </a>
            <button
              type="button"
              onClick={next}
              data-cursor="link"
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted transition hover:text-violet-light"
            >
              Next
              <ChevronRight size={18} className="transition group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
