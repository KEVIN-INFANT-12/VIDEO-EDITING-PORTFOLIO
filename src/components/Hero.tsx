import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import Timecode from './Timecode';
import MagneticButton from './MagneticButton';
import { person, photos, showreelUrl } from '../data/site';
import { scrollToSection } from '../hooks/useLenis';
import { useHasFinePointer } from '../hooks/useMediaQuery';

const ease = [0.16, 1, 0.3, 1] as const;
const INTRO_WORDS = ['Raw footage.', 'Becomes', 'A story.', 'Edited by Kevin Infant.'];

export default function Hero() {
  const fine = useHasFinePointer();
  const sectionRef = useRef<HTMLElement>(null);

  // Play the title sequence once per browser session.
  const [phase, setPhase] = useState<'intro' | 'main'>(() => {
    if (typeof window === 'undefined') return 'intro';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return 'main';
    return sessionStorage.getItem('ki_intro') ? 'main' : 'intro';
  });
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (phase !== 'intro') return;
    if (word >= INTRO_WORDS.length) {
      sessionStorage.setItem('ki_intro', '1');
      const t = setTimeout(() => setPhase('main'), 500);
      return () => clearTimeout(t);
    }
    const dur = word === INTRO_WORDS.length - 1 ? 1200 : 850;
    const t = setTimeout(() => setWord((w) => w + 1), dur);
    return () => clearTimeout(t);
  }, [phase, word]);

  const skipIntro = () => {
    if (phase === 'intro') {
      sessionStorage.setItem('ki_intro', '1');
      setPhase('main');
    }
  };

  // Cursor-tracked purple light + photo parallax
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const lightX = useSpring(useTransform(mx, [0, 1], ['30%', '70%']), {
    stiffness: 60,
    damping: 20,
  });
  const lightY = useSpring(useTransform(my, [0, 1], ['30%', '70%']), {
    stiffness: 60,
    damping: 20,
  });
  const photoX = useSpring(useTransform(mx, [0, 1], [18, -18]), {
    stiffness: 80,
    damping: 20,
  });
  const photoY = useSpring(useTransform(my, [0, 1], [12, -12]), {
    stiffness: 80,
    damping: 20,
  });

  const onMouse = (e: React.MouseEvent) => {
    if (!fine || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  // Scroll-out parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const lightBg = useTransform(
    [lightX, lightY],
    ([x, y]) =>
      `radial-gradient(46vw 46vw at ${x} ${y}, rgba(139,92,246,0.22), transparent 60%)`,
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMouse}
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Cursor-tracked ambient light */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: lightBg }}
      />
      {/* Faint editing grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
          backgroundSize: '90px 90px',
          maskImage: 'radial-gradient(circle at 50% 45%, #000, transparent 75%)',
        }}
      />

      {/* ---------------- Intro title sequence ---------------- */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.button
            type="button"
            onClick={skipIntro}
            aria-label="Skip intro"
            className="absolute inset-0 z-30 flex items-center justify-center bg-base-900"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="absolute left-0 right-0 top-6 flex justify-center">
              <span className="eyebrow flex items-center gap-2 text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-glow animate-blink" />
                Title sequence
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={word}
                className="headline px-6 text-center text-[clamp(2.5rem,9vw,7rem)] text-chalk"
                initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
                transition={{ duration: 0.55, ease }}
              >
                {INTRO_WORDS[Math.min(word, INTRO_WORDS.length - 1)]}
              </motion.h2>
            </AnimatePresence>
            <span className="absolute bottom-6 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70">
              tap to skip
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ---------------- Main hero ---------------- */}
      {/* Masked photo */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 w-full md:w-[62%]"
        style={{ x: photoX, y: photoY, scale: photoScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'main' ? 1 : 0 }}
        transition={{ duration: 1.6, ease, delay: phase === 'main' ? 0.2 : 0 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-[0.62]"
          style={{
            backgroundImage: `url(${photos.wide})`,
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, #000 42%, #000 100%), linear-gradient(0deg, transparent 2%, #000 26%)',
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
            maskImage:
              'linear-gradient(90deg, transparent 0%, #000 42%, #000 100%), linear-gradient(0deg, transparent 2%, #000 26%)',
          }}
        />
        {/* violet duotone + light */}
        <div className="absolute inset-0 bg-violet-glow/25 mix-blend-color" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(192,132,252,0.4),transparent_55%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-r from-base-900 via-base-900/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="frame-x relative z-10 flex min-h-[100svh] flex-col justify-center pt-24"
        style={{ y: contentY, opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'main' ? 1 : 0 }}
        transition={{ duration: 0.8, delay: phase === 'main' ? 0.3 : 0 }}
      >
        <motion.div
          className="mb-6 flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={phase === 'main' ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
        >
          <span className="eyebrow flex items-center gap-2 text-chalk">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-blink" />
            {person.name}
          </span>
          <span className="h-px w-8 bg-white/20" />
          <span className="eyebrow text-muted">{person.role}</span>
        </motion.div>

        <h1 className="headline text-[clamp(3.75rem,16vw,14.5rem)] text-chalk">
          {['Edit.', 'Elevate.', 'Engage.'].map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 2 ? 'text-grad' : ''}`}
                initial={{ y: '110%' }}
                animate={phase === 'main' ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.9, ease, delay: 0.5 + i * 0.12 }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-chalk/70 md:text-xl"
          initial={{ opacity: 0, y: 18 }}
          animate={phase === 'main' ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 1 }}
        >
          {person.positioning} Short-form, long-form and cinematic content —
          cut for timing, rhythm and feel.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-6"
          initial={{ opacity: 0, y: 18 }}
          animate={phase === 'main' ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 1.15 }}
        >
          <MagneticButton
            variant="solid"
            onClick={() => scrollToSection('#work')}
            cursorLabel="Explore"
            ariaLabel="View portfolio"
          >
            View Portfolio <ArrowUpRight size={16} />
          </MagneticButton>
          <MagneticButton
            variant="line"
            onClick={() => scrollToSection('#about')}
            cursorLabel="Say hi"
            ariaLabel="Get in touch"
          >
            Get in Touch <ArrowUpRight size={16} />
          </MagneticButton>
          <a
            href={showreelUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="media"
            data-cursor-label="Watch"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-muted transition hover:text-violet-light"
          >
            <Play size={13} className="fill-current" /> Showreel
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative corners */}
      <div className="pointer-events-none absolute bottom-6 left-5 z-10 hidden items-center gap-3 sm:flex sm:left-8">
        <Timecode className="text-[11px] text-muted" />
        <span className="font-mono text-[11px] text-muted/60">FRAME 001</span>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-5 z-10 hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted/60 sm:right-8 md:block">
        Scroll to enter ↓
      </div>
    </section>
  );
}
