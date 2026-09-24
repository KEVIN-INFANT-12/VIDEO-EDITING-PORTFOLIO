import { useEffect, useRef, useState } from 'react';
import { useHasFinePointer } from '../hooks/useMediaQuery';

type Mode = 'default' | 'link' | 'media' | 'action';

/**
 * Cinematic custom cursor (desktop only).
 * Opt in on any element with:
 *   data-cursor="link" | "media" | "action"
 *   data-cursor-label="WATCH"   (optional override)
 */
export default function CustomCursor() {
  const fine = useHasFinePointer();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('default');
  const [label, setLabel] = useState('');
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add('cursor-none-all');

    const p = { x: innerWidth / 2, y: innerHeight / 2 };
    const r = { ...p };
    let raf = 0;
    const loop = () => {
      r.x += (p.x - r.x) * 0.16;
      r.y += (p.y - r.y) * 0.16;
      if (dot.current)
        dot.current.style.transform = `translate3d(${p.x}px,${p.y}px,0) translate(-50%,-50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${r.x}px,${r.y}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const move = (e: MouseEvent) => {
      p.x = e.clientX;
      p.y = e.clientY;
      if (!shown) setShown(true);
      const el = (e.target as HTMLElement)?.closest?.('[data-cursor]');
      const next = (el?.getAttribute('data-cursor') as Mode) || 'default';
      const lbl =
        el?.getAttribute('data-cursor-label') ||
        (next === 'media' ? 'Watch' : next === 'action' ? "Let's go" : '');
      setMode(next);
      setLabel(lbl);
    };
    const leave = () => setShown(false);

    addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('cursor-none-all');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fine]);

  if (!fine) return null;

  const hasLabel = (mode === 'media' || mode === 'action') && !!label;
  const size = hasLabel ? 92 : mode === 'link' ? 54 : 36;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120]"
      style={{ opacity: shown ? 1 : 0, transition: 'opacity .3s' }}
    >
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-violet-light mix-blend-difference"
        style={{
          opacity: mode === 'default' ? 1 : 0,
          transition: 'opacity .2s',
        }}
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border text-[10px] font-medium uppercase tracking-[0.15em]"
        style={{
          width: size,
          height: size,
          color: '#E9D5FF',
          borderColor:
            mode === 'default'
              ? 'rgba(233,213,255,0.5)'
              : 'rgba(192,132,252,0.8)',
          background: hasLabel ? 'rgba(139,92,246,0.18)' : 'transparent',
          backdropFilter: hasLabel ? 'blur(2px)' : 'none',
          transition:
            'width .32s cubic-bezier(.16,1,.3,1), height .32s cubic-bezier(.16,1,.3,1), background .3s, border-color .3s',
        }}
      >
        {hasLabel && (
          <span className="whitespace-nowrap">{label} →</span>
        )}
      </div>
    </div>
  );
}
