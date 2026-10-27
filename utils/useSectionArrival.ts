import { useEffect, type RefObject } from 'react';
import { animate } from 'motion';

/** One arrival per mount. Default HTML stays visible if motion or JS is unavailable. */
export function useSectionArrival(ref: RefObject<HTMLElement | null>, kind: 'cost' | 'contact') {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const controls: { cancel: () => void }[] = [];
    const stop = () => controls.splice(0).forEach(control => control.cancel());
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      if (preference.matches || root.getBoundingClientRect().bottom < 0) return;
      const ease = [.16, 1, .3, 1] as const;
      if (kind === 'cost') {
        root.querySelectorAll<HTMLElement>('[data-cost-row]').forEach((row, index) => {
          controls.push(animate(row, { x: [index ? 24 : 0, 0], y: [index ? 12 : 0, 0] }, { duration: .65, delay: index * .16, ease }));
        });
        const total = root.querySelector<HTMLElement>('[data-cost-total]');
        if (total) controls.push(animate(total, { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] }, { duration: .7, delay: .3, ease }));
      } else {
        controls.push(animate(root, { clipPath: ['inset(64px 0 0 0)', 'inset(0px 0 0 0)'] }, { duration: .85, ease }));
        const title = root.querySelector<HTMLElement>('[data-contact-title]');
        if (title) controls.push(animate(title, { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'], y: [22, 0] }, { duration: .75, delay: .16, ease }));
        const actions = root.querySelector<HTMLElement>('[data-contact-actions]');
        if (actions) controls.push(animate(actions, { y: [40, 0] }, { duration: .75, delay: .28, ease }));
      }
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    observer.observe(root);
    preference.addEventListener('change', stop);
    return () => { observer.disconnect(); stop(); preference.removeEventListener('change', stop); };
  }, [ref, kind]);
}
