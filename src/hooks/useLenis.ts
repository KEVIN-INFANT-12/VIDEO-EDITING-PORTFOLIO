import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Smooth scrolling via Lenis, synced to requestAnimationFrame.
 * Respects prefers-reduced-motion (skips smoothing entirely).
 * Exposes the instance on window for anchor-link scrolling.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Expose for programmatic scrolling (nav links)
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
}

/** Smoothly scroll to a selector, using Lenis when available. */
export function scrollToSection(href: string) {
  const target = document.querySelector(href);
  if (!target) return;
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
