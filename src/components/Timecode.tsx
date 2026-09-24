import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Decorative running SMPTE-style timecode HH:MM:SS:FF (writes to DOM, no re-renders). */
export default function Timecode({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      if (ref.current) ref.current.textContent = '00:00:12:00';
      return;
    }
    const start = performance.now();
    let raf = 0;
    const pad = (n: number) => String(n).padStart(2, '0');
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const ff = Math.floor((t * 24) % 24);
      const ss = Math.floor(t % 60);
      const mm = Math.floor((t / 60) % 60);
      const hh = Math.floor(t / 3600);
      if (ref.current)
        ref.current.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      00:00:00:00
    </span>
  );
}
