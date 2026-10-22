import { createHomeScore, itemPhase, scrollToHomeMoment, servicePhase, serviceReadMoment } from './homeChoreography';
import { mobileViewportQuery } from './useMediaQuery';
import { scrollToSection } from './scrollToSection';

type Spot = { type: 'project' | 'service' | 'price'; index: number } | { type: 'quality' | 'home' | 'resultaten' } | { type: 'section'; id: string };
let spot: Spot = { type: 'home' };
let readingMode: string | undefined;
const renderedMode = () => document.querySelector('[data-home-sequence]') ? 'desktop'
  : document.querySelector('[data-mobile-home]') ? 'mobile' : 'static';

/** Called while the old desktop controller still owns its measured timeline. */
export function rememberHomeMoment(t: number, projectCount: number, serviceCount: number) {
  if (spot.type === 'section') return;
  const score = createHomeScore(projectCount, serviceCount);
  if (t < score.work) spot = { type: t > score.hero ? 'resultaten' : 'home' };
  else if (t < score.handoff) spot = { type: 'project', index: Math.min(projectCount - 1, Math.round((t - score.work) / .75)) };
  else if (t < score.quality) spot = { type: 'service', index: Math.round(servicePhase(t - score.services, serviceCount)) };
  else if (t < score.priceEntrance) spot = { type: 'quality' };
  else spot = { type: 'price', index: Math.round(itemPhase(t - score.prices, 4, 1)) };
}

/** Cache semantic position while the old tree exists: resize can render before matchMedia fires. */
export function trackHomeReadingPosition(projectCount: number, serviceCount: number) {
  const score = createHomeScore(projectCount, serviceCount);
  readingMode = undefined;
  const capture = () => {
    const mode = renderedMode();
    // React replaces the long sticky sequence with a shorter document. Layout
    // can fire scroll before restoration; those pixels belong to neither spot.
    if (readingMode !== undefined && readingMode !== mode) return;
    readingMode = mode;
    if (window.scrollY < 64) { spot = { type: 'home' }; return; }
    const center = window.innerHeight * .45;
    const contains = (node: Element | null) => {
      const rect = node?.getBoundingClientRect();
      return !!rect && rect.top <= center && rect.bottom >= center;
    };
    for (const id of ['over-ons', 'faq', 'contact', 'prijsdetails']) {
      if (contains(document.getElementById(id))) { spot = { type: 'section', id }; return; }
    }
    const sequence = document.querySelector<HTMLElement>('[data-home-sequence]');
    if (sequence) {
      const stage = sequence.querySelector<HTMLElement>('[data-home-stage]');
      if (!stage) return;
      const t = -sequence.getBoundingClientRect().top / (sequence.offsetHeight - stage.offsetHeight) * score.total;
      if (t < score.work) spot = { type: t > score.hero ? 'resultaten' : 'home' };
      else if (t < score.handoff) spot = { type: 'project', index: Math.round(itemPhase(t - score.work, projectCount, .5)) };
      else if (t < score.quality) spot = { type: 'service', index: Math.round(servicePhase(t - score.services, serviceCount)) };
      else if (t < score.priceEntrance) spot = { type: 'quality' };
      else spot = { type: 'price', index: Math.round(itemPhase(t - score.prices, 4, 1)) };
      return;
    }
    const project = Array.from(document.querySelectorAll<HTMLElement>('[data-mobile-project]')).find(contains);
    if (project) { spot = { type: 'project', index: Number(project.dataset.mobileProject) }; return; }
    const service = Array.from(document.querySelectorAll<HTMLElement>('[data-service-chapter]')).find(contains);
    if (service) { spot = { type: 'service', index: Number(service.dataset.serviceChapter) }; return; }
    if (contains(document.getElementById('quality-static-title')?.closest('section') ?? null)) { spot = { type: 'quality' }; return; }
    const prices = Array.from(document.querySelectorAll('#prijzen article'));
    const price = prices.findIndex(contains);
    if (price >= 0) { spot = { type: 'price', index: price }; return; }
    if (contains(document.getElementById('prijzen'))) { spot = { type: 'section', id: 'prijsdetails' }; return; }
    spot = { type: 'resultaten' };
  };
  window.addEventListener('scroll', capture, { passive: true });
  const frame = requestAnimationFrame(capture);
  return () => { window.removeEventListener('scroll', capture); cancelAnimationFrame(frame); };
}

export function preserveHomeReadingPosition(nextMobile: boolean, projectCount: number, serviceCount: number) {
  const saved = spot;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (window.matchMedia(mobileViewportQuery).matches !== nextMobile) return;
    readingMode = renderedMode();
    const sequence = document.querySelector<HTMLElement>('[data-home-sequence]');
    if (!nextMobile && sequence && saved.type !== 'section') {
      const score = createHomeScore(projectCount, serviceCount);
      const moment = saved.type === 'project' ? score.work + saved.index * .75 + .25
        : saved.type === 'service' ? score.services + serviceReadMoment(saved.index)
        : saved.type === 'quality' ? score.quality + 1
        : saved.type === 'price' ? score.prices + saved.index * 1.25 + .5
        : saved.type === 'resultaten' ? score.work + .25 : 0;
      scrollToHomeMoment(sequence, moment, score.total, 'instant');
      return;
    }
    let target: HTMLElement | null = null;
    if (saved.type === 'project') target = document.querySelector(`[data-mobile-project="${saved.index}"] h3`);
    else if (saved.type === 'service') {
      target = document.getElementById(`service-trigger-${saved.index}`);
    } else if (saved.type === 'quality') target = document.getElementById('quality-static-title');
    else if (saved.type === 'price') target = document.querySelectorAll<HTMLElement>('#prijzen article h3')[saved.index];
    else if (saved.type === 'section' && saved.id === 'prijsdetails') {
      target = document.getElementById('prijsdetails') ?? Array.from(document.querySelectorAll<HTMLElement>('#prijzen h3')).find(node => node.textContent?.startsWith('Kosten na')) ?? null;
    } else { scrollToSection(null, saved.type === 'section' ? saved.id : saved.type, 'instant'); return; }
    if (target) {
      const header = document.querySelector('header')?.getBoundingClientRect().height ?? 64;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - header - 16, behavior: 'instant' });
    }
  }));
}
