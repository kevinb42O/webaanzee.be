/** Coordinate native scrolling, the desktop scroll controller and modal focus isolation. */
export const pageScrollLockEvent = 'webaanzee:scroll-lock-change';
let locks = 0;
let previousOverflow = '';
const isolated = new Map<HTMLElement, { count: number; previous: boolean }>();
export const isPageScrollLocked = () => locks > 0;

export function lockPageScroll(surface?: HTMLElement | null) {
  const siblings: HTMLElement[] = [];
  for (let node = surface; node && node !== document.body; node = node.parentElement) {
    for (const sibling of Array.from(node.parentElement?.children ?? [])) {
      if (sibling === node || !(sibling instanceof HTMLElement) || /^(SCRIPT|STYLE|LINK)$/.test(sibling.tagName)) continue;
      const state = isolated.get(sibling) ?? { count: 0, previous: sibling.inert };
      state.count++;
      isolated.set(sibling, state);
      sibling.inert = true;
      siblings.push(sibling);
    }
  }
  if (locks++ === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.dataset.scrollLocked = 'true';
    window.dispatchEvent(new Event(pageScrollLockEvent));
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    siblings.forEach(node => {
      const state = isolated.get(node)!;
      if (--state.count === 0) { node.inert = state.previous; isolated.delete(node); }
    });
    if (--locks === 0) {
      document.body.style.overflow = previousOverflow;
      delete document.documentElement.dataset.scrollLocked;
      window.dispatchEvent(new Event(pageScrollLockEvent));
    }
  };
}
