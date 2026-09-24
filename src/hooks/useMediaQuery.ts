import { useEffect, useState } from 'react';

/** Reactive media-query hook (SSR-safe default). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** True on devices that support a fine pointer (mouse) — for enabling the custom cursor. */
export function useHasFinePointer(): boolean {
  return useMediaQuery('(pointer: fine)');
}
