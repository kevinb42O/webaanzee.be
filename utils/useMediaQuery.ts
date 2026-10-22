import { useCallback, useSyncExternalStore } from 'react';

/** Server markup stays readable; only enhance after the actual viewport is known. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback((notify: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', notify);
    return () => media.removeEventListener('change', notify);
  }, [query]);
  const snapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, snapshot, () => false);
}

export const mobileViewportQuery = '(max-width: 999px)';
export const mobileMotionQuery = '(max-width: 999px) and (prefers-reduced-motion: no-preference)';
