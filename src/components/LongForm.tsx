import { motion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import type { Video } from '../lib/types';
import { CATEGORY_LABELS } from '../lib/types';
import VideoThumb from './VideoThumb';
import { TextReveal } from './TextReveal';

interface Props {
  videos: Video[];
  onOpen: (index: number) => void;
}

export default function LongForm({ videos, onOpen }: Props) {
  if (videos.length === 0) return null;
  return (
    <section className="relative py-24 md:py-36">
      <div className="frame-x">
        {/* Section header */}
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">02 / LONG FORM</span>
            <h2 className="headline mt-4 text-[clamp(2.8rem,9vw,8rem)] text-chalk">
              <TextReveal text={'Long\nForm.'} lineClassName="[&:last-child]:text-grad" />
            </h2>
          </div>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted">
            Stories that take their time — documentaries, interviews, podcasts and
            features built to hold attention.
          </p>
        </div>

        {/* Uniform, structured project rows */}
        <div className="space-y-14 md:space-y-20">
          {videos.map((v, i) => (
            <LongRow
              key={v.id}
              video={v}
              index={i}
              total={videos.length}
              onOpen={() => onOpen(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LongRow({
  video,
  index,
  total,
  onOpen,
}: {
  video: Video;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-10"
    >
      {/* LEFT — thumbnail */}
      <button
        type="button"
        onClick={onOpen}
        data-cursor="media"
        data-cursor-label="Watch"
        aria-label={`Watch ${video.title}`}
        className="group relative md:col-span-7"
      >
        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 transition-colors duration-500 group-hover:border-violet-soft/40">
          <VideoThumb
            video={video}
            className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-violet-glow/0 transition-colors duration-500 group-hover:bg-violet-glow/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-violet-soft group-hover:bg-violet-glow/30">
              <Play size={22} className="ml-1 fill-current" />
            </span>
          </div>
          <div className="absolute left-3 top-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
            REC ●
          </div>
        </div>
      </button>

      {/* RIGHT — meta */}
      <div className="md:col-span-5">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          <span className="text-violet-light">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-6 bg-white/20" />
          <span>{String(total).padStart(2, '0')}</span>
        </div>

        <h3 className="mt-4 font-anton text-[clamp(2rem,4vw,3.2rem)] uppercase leading-[0.95] tracking-tight text-chalk">
          {video.title}
        </h3>

        <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-violet-soft">
          {CATEGORY_LABELS[video.category]}
        </div>

        {video.description && (
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
            {video.description}
          </p>
        )}

        <button
          type="button"
          onClick={onOpen}
          data-cursor="media"
          data-cursor-label="Watch"
          className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-chalk transition-colors hover:text-violet-light"
        >
          View project
          <ArrowUpRight
            size={16}
            className="text-violet-light transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </motion.div>
  );
}
