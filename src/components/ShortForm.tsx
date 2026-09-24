import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import type { Video } from '../lib/types';
import { CATEGORY_LABELS } from '../lib/types';
import { useMediaQuery } from '../hooks/useMediaQuery';
import VideoThumb from './VideoThumb';

interface Props {
  videos: Video[];
  onOpen: (index: number) => void;
}

export default function ShortForm({ videos, onOpen }: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (videos.length === 0) return null;
  return isDesktop ? (
    <PinnedRail videos={videos} onOpen={onOpen} />
  ) : (
    <SwipeRail videos={videos} onOpen={onOpen} />
  );
}

/* ---------------- Desktop: pinned horizontal takeover ---------------- */
function PinnedRail({ videos, onOpen }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', calc);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', calc);
    };
  }, [videos.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-6 px-[7vw]">
          {/* Title panel */}
          <div className="mr-4 flex h-[70vh] w-[42vw] shrink-0 flex-col justify-center">
            <span className="eyebrow">01 / SELECTED WORK</span>
            <h2 className="headline mt-4 text-[clamp(3rem,7vw,7rem)] text-chalk">
              Short
              <br />
              <span className="text-grad">Form.</span>
            </h2>
            <p className="mt-6 max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.15em] text-muted">
              Fast. Impactful.
              <br />
              Made to stop the scroll.
            </p>
            <span className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-violet-soft">
              Drag / scroll →
            </span>
          </div>

          {videos.map((v, i) => (
            <ShortCard key={v.id} video={v} index={i} onOpen={() => onOpen(i)} />
          ))}
          <div className="w-[6vw] shrink-0" aria-hidden />
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Mobile: native swipe rail ---------------- */
function SwipeRail({ videos, onOpen }: Props) {
  return (
    <div className="py-4">
      <div className="frame-x mb-8">
        <span className="eyebrow">01 / SELECTED WORK</span>
        <h2 className="headline mt-3 text-[clamp(2.6rem,13vw,5rem)] text-chalk">
          Short <span className="text-grad">Form.</span>
        </h2>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          Fast. Impactful. Made to stop the scroll.
        </p>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
        {videos.map((v, i) => (
          <div key={v.id} className="w-[68vw] shrink-0 snap-start sm:w-[300px]">
            <ShortCard video={v} index={i} onOpen={() => onOpen(i)} />
          </div>
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
    </div>
  );
}

/* ---------------- Card ---------------- */
function ShortCard({
  video,
  index,
  onOpen,
}: {
  video: Video;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      data-cursor="media"
      data-cursor-label="Watch"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-[9/14] w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-base-700 text-left transition-colors duration-500 hover:border-violet-soft/40 md:w-[clamp(240px,20vw,300px)]"
      aria-label={`Watch ${video.title}`}
    >
      <VideoThumb
        video={video}
        className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-violet-glow/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{CATEGORY_LABELS[video.category]}</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-violet-soft group-hover:bg-violet-glow/30">
          <Play size={18} className="ml-0.5 fill-current" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-anton text-2xl uppercase leading-none tracking-tight text-white">
          {video.title}
        </h3>
      </div>
    </motion.button>
  );
}
