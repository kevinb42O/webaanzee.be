import { createHomeScore, itemPhase, pricePhase, priceMoment, scrollToHomeMoment, servicePhase, serviceReadMoment } from './homeChoreography';
import { mobileViewportQuery } from './useMediaQuery';
import { scrollToSection } from './scrollToSection';

type Spot = { type: 'project' | 'service' | 'price'; index: number } | { type: 'quality' | 'home' | 'resultaten' } | { type: 'section'; id: string };
let spot: Spot = { type: 'home' };
let readingMode: string | undefined;
const renderedMode = () => document.querySelector('[data-home-sequence]') ? 'desktop'
  : document.querySelector('[data-mobile-cinematic]') ? 'mobile'
  : document.querySelector('[data-mobile-home]') ? 'mobile-static' : 'static';

/** Called while the old desktop controller still owns its measured timeline. */
export function rememberHomeMoment(t: number, projectCount: number, serviceCount: number) {
  if (spot.type === 'section') return;
  const score = createHomeScore(projectCount, serviceCount);
  if (t < score.work) spot = { type: t > score.hero ? 'resultaten' : 'home' };
  else if (t < score.handoff) spot = { type: 'project', index: Math.min(projectCount - 1, Math.round((t - score.work) / .75)) };
  else if (t < score.quality) spot = { type: 'service', index: Math.round(servicePhase(t - score.services, serviceCount)) };
  else if (t < score.priceEntrance) spot = { type: 'quality' };
  else spot = { type: 'price', index: Math.round(pricePhase(t - score.prices)) };
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
    const cinematic = Array.from(document.querySelectorAll<HTMLElement>('[data-mobile-sequence]')).find(contains);
    if (cinematic) {
      const kind = cinematic.dataset.mobileKind;
      // Native scroll events arrive before the Motion/React frame has committed.
      // Read the physical score, not the previous frame's rendered item index.
      const position = -cinematic.getBoundingClientRect().top;
      const first = Number(cinematic.dataset.mobileFirst ?? 0);
      const slot = Number(cinematic.dataset.mobileSlot ?? 1);
      const change = Number(cinematic.dataset.mobileChange ?? 0);
      const count = cinematic.querySelectorAll('[data-mobile-target]').length;
      const starts: number[] = JSON.parse(cinematic.dataset.mobileStarts ?? '[]');
      const holds: number[] = JSON.parse(cinematic.dataset.mobileHolds ?? '[]');
      const item = starts.findIndex((start, i) => position < start + holds[i] + change / 2);
      const index = starts.length ? (item < 0 ? starts.length - 1 : item)
        : Math.max(0, Math.min(count - 1, Math.floor((position - first + change / 2) / slot)));
      if (kind === 'project' && window.scrollY < Number(cinematic.querySelector<HTMLElement>('#projecten')?.dataset.mobileMoment ?? 0)) spot = { type: 'home' };
      else if (kind === 'project' || kind === 'service' || kind === 'price') spot = { type: kind, index };
      else if (kind === 'quality') spot = { type: 'quality' };
      return;
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
      else spot = { type: 'price', index: Math.round(pricePhase(t - score.prices)) };
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
        : saved.type === 'price' ? score.prices + priceMoment(saved.index)
        : saved.type === 'resultaten' ? score.work + .25 : 0;
      scrollToHomeMoment(sequence, moment, score.total, 'instant');
      return;
    }
    const targetKey = saved.type === 'project' || saved.type === 'service' || saved.type === 'price' ? `${saved.type}:${saved.index}` : saved.type === 'quality' ? 'quality' : null;
    const mobileAnchor = targetKey ? document.querySelector<HTMLElement>(`[data-mobile-target="${targetKey}"]`) : null;
    const mobileSequence = mobileAnchor?.closest<HTMLElement>('[data-mobile-sequence]');
    if (nextMobile && mobileAnchor && mobileSequence) {
      window.scrollTo({ top: mobileSequence.getBoundingClientRect().top + window.scrollY + Number(mobileAnchor.dataset.mobileMoment), behavior: 'instant' });
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
