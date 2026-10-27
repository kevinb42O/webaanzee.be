import { useSyncExternalStore } from 'react';
import { useMediaQuery } from './useMediaQuery';

function rootFontSize() { return parseFloat(getComputedStyle(document.documentElement).fontSize) || 16; }
function subscribeTypography(notify: () => void) {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });
  window.addEventListener('resize', notify);
  return () => { observer.disconnect(); window.removeEventListener('resize', notify); };
}
export function useRootFontSize() { return useSyncExternalStore(subscribeTypography, rootFontSize, () => 16); }
const query = (size: number) => `(min-width: ${Math.max(1000, size * 62.5)}px) and (min-height: ${Math.max(650, size * 40.625)}px) and (prefers-reduced-motion: no-preference)`;
/** Fixed scenes are an enhancement only while their reading space fits the visitor's type size. */
export function useDesktopMotion() { return useMediaQuery(query(useRootFontSize())); }
export function desktopMotionEnabled() { return window.matchMedia(query(rootFontSize())).matches; }
