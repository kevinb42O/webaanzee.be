import { useLayoutEffect, type RefObject } from 'react';
import { useMotionValue } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { registerHomeScroll } from './homeScroll';
import { isPageScrollLocked, pageScrollLockEvent } from './pageScrollLock';
import { rememberHomeMoment } from './preserveHomeReadingPosition';

/** One native page position drives every scene, with Lenis smoothing wheel input. */
export function useHomeScroll(sequence: RefObject<HTMLDivElement | null>, total: number, projectCount: number, serviceCount: number) {
  const time = useMotionValue(0);

  useLayoutEffect(() => {
    const element = sequence.current;
    const stage = element?.querySelector<HTMLElement>('[data-home-stage]');
    if (!element || !stage) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: .08, wheelMultiplier: 1.4, syncTouch: false });
    const unregister = registerHomeScroll((top, behavior) => {
      lenis.scrollTo(top, { immediate: behavior !== 'smooth', force: true });
    });
    const syncScrollLock = () => { if (isPageScrollLocked()) lenis.stop(); else lenis.start(); };
    syncScrollLock();
    window.addEventListener(pageScrollLockEvent, syncScrollLock);
    const update = () => ScrollTrigger.update();
    lenis.on('scroll', update);
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    gsap.ticker.add(tick);
    let measuredHeight = stage.offsetHeight;
    let readingMoment = time.get();
    const read = (progress: number) => {
      const moment = progress * total;
      time.set(moment);
      // A resize changes physical pixels before ScrollTrigger refreshes. Keep
      // the last semantic moment until the new stage has been measured.
      if (stage.offsetHeight === measuredHeight) readingMoment = moment;
    };
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end: () => `+=${element.offsetHeight - stage.offsetHeight}`,
      onUpdate: self => read(self.progress),
      onRefresh: self => read(self.progress),
    });
    // Restore correctly on reload, history navigation and responsive remounts.
    time.set(trigger.progress * total);
    readingMoment = time.get();
    const resize = new ResizeObserver(() => {
      if (stage.offsetHeight === measuredHeight) return;
      const saved = readingMoment;
      measuredHeight = stage.offsetHeight;
      lenis.resize();
      trigger.refresh();
      const top = element.getBoundingClientRect().top + window.scrollY;
      lenis.scrollTo(top + saved / total * (element.offsetHeight - measuredHeight), { immediate: true, force: true });
      time.set(saved);
      readingMoment = saved;
    });
    resize.observe(stage);
    const refresh = () => { lenis.resize(); trigger.refresh(); };
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) refresh(); });
    return () => {
      disposed = true;
      rememberHomeMoment(readingMoment, projectCount, serviceCount);
      unregister();
      window.removeEventListener(pageScrollLockEvent, syncScrollLock);
      resize.disconnect();
      trigger.kill();
      gsap.ticker.remove(tick);
      lenis.off('scroll', update);
      lenis.destroy();
    };
  }, [sequence, time, total, projectCount, serviceCount]);

  return time;
}
