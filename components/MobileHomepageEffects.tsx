import { useEffect } from 'react';
import { animate } from 'motion/react';
import quality from './Quality.module.css';
import offer from './Offer.module.css';
import about from './About.module.css';
import faq from './FAQ.module.css';
import styles from './MobileHomepageEffects.module.css';

/** Local enhancements for the existing reading sections. Never mounts another copy of content. */
export default function MobileHomepageEffects({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    const main = document.querySelector('main');
    if (!enabled || !main) return;
    main.classList.add(styles.enhanced);
    const originals = new Map<HTMLElement, string | null>();
    const animations: ReturnType<typeof animate>[] = [];
    const rules: HTMLElement[] = [];
    const remember = (node: HTMLElement) => {
      if (!originals.has(node)) originals.set(node, node.getAttribute('style'));
    };
    const entrance = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const node = entry.target as HTMLElement;
        entrance.unobserve(node);
        remember(node);
        animations.push(animate(node, node.classList.contains(styles.rule)
          ? { scaleX: [0, 1] }
          : { y: [12, 0] }, { duration: .5, ease: [.16, 1, .3, 1] }));
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

    const selectors = [
      '#services-title', '#quality-static-title', '#prijzen h2',
      `#prijzen .${offer.chapterIdentity}`, `#prijzen .${offer.moreHeading}`,
      `#prijzen .${offer.costIntro} h3`, '#about-title', '#faq h2', '#contact h2',
    ];
    main.querySelectorAll<HTMLElement>(selectors.join(',')).forEach(node => entrance.observe(node));
    const addRule = (node: HTMLElement) => {
      const rule = document.createElement('span');
      rule.className = styles.rule;
      rule.setAttribute('aria-hidden', 'true');
      node.append(rule);
      rules.push(rule);
      entrance.observe(rule);
    };
    main.querySelectorAll<HTMLElement>(`#quality-static-title, .${quality.content} li, #faq h2`).forEach(addRule);

    // Animate answers on the existing native details elements; never change focus or open state.
    const details = new MutationObserver(records => {
      for (const record of records) {
        const node = record.target as HTMLDetailsElement;
        if (!node.open) continue;
        const answer = node.querySelector<HTMLElement>(`.${faq.answer}`);
        if (!answer) continue;
        remember(answer);
        animations.push(animate(answer, { opacity: [.6, 1], y: [4, 0] }, { duration: .22 }));
      }
    });
    main.querySelectorAll('#faq details').forEach(node => details.observe(node, { attributes: true, attributeFilter: ['open'] }));

    const visual = main.querySelector<HTMLElement>(`#over-ons .${about.visual}`);
    const portrait = visual?.querySelector<HTMLElement>(`.${about.portraitFrame}`);
    const coast = visual?.querySelector<HTMLElement>(`.${about.coastFrame}`);
    let frame = 0;
    let visible = false;
    const drawPortrait = () => {
      frame = 0;
      if (!visual || !portrait || !coast) return;
      const bounds = visual.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight * .65)));
      portrait.style.transform = `translateY(${(1 - progress) * 12}px) scale(${.98 + progress * .02})`;
      coast.style.transform = `translateX(${-progress * 10}px)`;
    };
    const schedule = () => { if (visible && !frame) frame = requestAnimationFrame(drawPortrait); };
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); });
    if (visual && portrait && coast) {
      remember(portrait);
      remember(coast);
      visibility.observe(visual);
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    }
    return () => {
      entrance.disconnect();
      details.disconnect();
      visibility.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
      animations.forEach(animation => animation.cancel());
      originals.forEach((style, node) => style === null ? node.removeAttribute('style') : node.setAttribute('style', style));
      rules.forEach(rule => rule.remove());
      main.classList.remove(styles.enhanced);
    };
  }, [enabled]);
  return null;
}
