import { useLayoutEffect, useRef, useState } from 'react';
import { useMotionValue } from 'motion/react';
import { clamp } from './homeChoreography';

export type MobileChapterLayout = {
  viewport: number; overflow: number; hold: number; change: number; entrance: number; total: number;
  starts: number[]; holds: number[]; overflows: number[];
};

export function chapterStart(layout: MobileChapterLayout, index: number) {
  return layout.starts[index] ?? layout.entrance + index * (layout.hold + layout.change);
}
export function chapterHold(layout: MobileChapterLayout, index: number) { return layout.holds[index] ?? layout.hold; }
export function chapterOverflow(layout: MobileChapterLayout, index: number) { return layout.overflows[index] ?? layout.overflow; }
export function chapterPosition(distance: number, layout: MobileChapterLayout, count: number) {
  let index = 0;
  while (index < count - 1 && distance >= chapterStart(layout, index + 1)) index++;
  const within = Math.max(0, distance - chapterStart(layout, index));
  const hold = chapterHold(layout, index);
  return { index, within, reading: hold > 0 ? clamp(within / hold) : 1, changing: clamp((within - hold) / layout.change) };
}
/** Outgoing content stays at its reading end; incoming content always starts at its own top. */
export function mobileReadingOffset(distance: number, layout: MobileChapterLayout, index: number) {
  const within = distance - chapterStart(layout, index);
  const travel = Math.max(1, chapterHold(layout, index) - layout.viewport * .4);
  return -chapterOverflow(layout, index) * clamp((within - layout.viewport * .15) / travel);
}

/** Native scroll, measured per-item reading paths and stable semantic restoration. */
export function useMobileChapter(count: number, fixedUnits?: number, tailUnits = .45, continuousPaper = false) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const visible = useMotionValue(0);
  const approach = useMotionValue(0);
  const [layout, setLayout] = useState<MobileChapterLayout>({ viewport: 844, overflow: 0, hold: 844, change: 422, entrance: 506, total: (fixedUnits ?? count * 1.5 + 1) * 844, starts: [], holds: [], overflows: [] });

  useLayoutEffect(() => {
    const element = root.current, podium = stage.current;
    if (!element || !podium) return;
    let frame = 0, focusFrame = 0;
    let current = layout;
    let measured = false, disposed = false;
    const header = document.querySelector<HTMLElement>('header');
    const read = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      approach.set(clamp((current.viewport - bounds.top) / current.viewport));
      visible.set(bounds.top < current.viewport && bounds.bottom > 0 ? 1 : 0);
      distance.set(clamp(-bounds.top, 0, current.total));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(read); };
    const measure = () => {
      if (disposed) return;
      element.style.setProperty('--mobile-header-height', `${header?.offsetHeight ?? 64}px`);
      const viewport = podium.offsetHeight;
      const panels = Array.from(content.current?.querySelectorAll<HTMLElement>('[data-mobile-reading-item]') ?? []);
      const available = panels.length ? content.current!.clientHeight : Math.max(100, viewport - 112);
      const overflows = panels.length ? panels.map(panel => Math.max(0, panel.offsetHeight - available))
        : Array.from({ length: count }, () => Math.max(0, (content.current?.offsetHeight ?? 0) - available));
      const holds = overflows.map(overflow => continuousPaper ? overflow : Math.max(viewport * .7, overflow + viewport * .65));
      const change = continuousPaper ? available : viewport * .5;
      const entrance = continuousPaper ? 1 : viewport * .65;
      const starts: number[] = [];
      let total = entrance;
      holds.forEach((hold, i) => { starts.push(total); total += hold + (i < count - 1 ? change : 0); });
      total = fixedUnits ? fixedUnits * viewport : total + viewport * tailUnits;
      const next = { viewport, overflow: Math.max(0, ...overflows), hold: Math.max(...holds), change, entrance, total, starts, holds, overflows };
      if (measured && JSON.stringify(next) === JSON.stringify(current)) return;
      const top = element.getBoundingClientRect().top;
      const previous = distance.get();
      const active = measured && top < 0 && -top < current.total;
      const position = chapterPosition(previous, current, count);
      const oldHold = chapterHold(current, position.index);
      let restored = previous / current.viewport * viewport;
      if (!fixedUnits) {
        if (previous < current.entrance) restored = previous / current.entrance * entrance;
        else if (previous >= chapterStart(current, count - 1) + chapterHold(current, count - 1)) {
          restored = starts[count - 1] + holds[count - 1] + (previous - chapterStart(current, count - 1) - chapterHold(current, count - 1)) / current.viewport * viewport;
        } else restored = starts[position.index] + (position.within <= oldHold
          ? position.within / Math.max(1, oldHold) * holds[position.index]
          : holds[position.index] + position.changing * change);
      }
      current = next;
      element.style.height = `${viewport + total}px`;
      setLayout(next);
      if (active) window.scrollTo({ top: window.scrollY + top + restored, behavior: 'instant' });
      measured = true;
      read();
    };
    const revealFocus = (event: FocusEvent) => {
      const target = event.target;
      if (fixedUnits || !(target instanceof HTMLElement) || !target.matches('a, button')) return;
      const panel = target.closest<HTMLElement>('[data-mobile-reading-item]');
      if (!panel) return; // Persistent chapter controls never change selection on focus.
      const viewport = content.current!.getBoundingClientRect();
      const bounds = target.getBoundingClientRect();
      if (bounds.top >= viewport.top + 8 && bounds.bottom <= viewport.bottom - 8) return;
      const item = Number(panel.dataset.mobileReadingItem);
      const naturalBottom = bounds.bottom - panel.getBoundingClientRect().top;
      const needed = clamp(naturalBottom - viewport.height + 12, 0, chapterOverflow(current, item));
      const reading = continuousPaper ? needed : current.viewport * .15 + (chapterOverflow(current, item) ? needed / chapterOverflow(current, item) : 0) * (chapterHold(current, item) - current.viewport * .4);
      const top = element.getBoundingClientRect().top + window.scrollY + chapterStart(current, item) + reading;
      const restore = () => { window.scrollTo({ top, behavior: 'instant' }); read(); target.focus({ preventScroll: true }); };
      restore();
      focusFrame = requestAnimationFrame(restore);
    };
    element.addEventListener('focusin', revealFocus);
    const observer = new ResizeObserver(measure);
    observer.observe(podium);
    if (header) observer.observe(header);
    if (content.current) {
      observer.observe(content.current);
      content.current.querySelectorAll('[data-mobile-reading-item]').forEach(panel => observer.observe(panel));
    }
    measure();
    document.fonts.ready.then(measure);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      disposed = true;
      observer.disconnect();
      element.removeEventListener('focusin', revealFocus);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame); cancelAnimationFrame(focusFrame);
    };
  }, [count, fixedUnits, tailUnits, continuousPaper, distance, visible, approach]);
  return { root, stage, content, distance, visible, approach, layout };
}
export function mobileMoment(root: HTMLElement | null, moment: number, behavior: ScrollBehavior = 'smooth') {
  if (!root) return;
  window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY + moment, behavior });
}
