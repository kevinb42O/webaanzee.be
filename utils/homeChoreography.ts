import { scrollHomeTo } from './homeScroll.ts';

/** Distances are stage heights, never seconds. All scenes share this score. */
export const desktopMotionQuery = '(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)';
export const portalDistance = 1.8;
export const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
// Zero velocity AND acceleration at each end: no hard starts or braking points.
export const soften = (value: number) => {
  const t = clamp(value);
  return t * t * t * (t * (t * 6 - 15) + 10);
};
export const windowProgress = (value: number, start: number, end: number) => soften((value - start) / (end - start));
export const interpolate = (value: number, stops: number[], values: number[]) => {
  for (let i = 1; i < stops.length; i++) {
    if (value <= stops[i]) return values[i - 1] + (values[i] - values[i - 1]) * windowProgress(value, stops[i - 1], stops[i]);
  }
  return values[values.length - 1];
};
export const itemPhase = (distance: number, count: number, hold: number) => {
  const slot = hold + .25;
  const index = Math.floor(Math.max(0, distance) / slot);
  return clamp(index + windowProgress(distance - index * slot, hold, slot), 0, count - 1);
};
/** Text never overlaps: outgoing is gone before incoming becomes readable. */
export const itemOpacity = (phase: number, index: number) => 1 - windowProgress(Math.abs(phase - index), .05, .48);

// Service text rests while the image and chapter line keep tracking native scroll.
export const serviceTiming = { entrance: .55, read: .36, change: .25, exit: .5 } as const;
export const serviceStart = (index: number) => index * (serviceTiming.read + serviceTiming.change);
export const serviceReadMoment = (index: number) => serviceStart(index) + serviceTiming.read / 2;
export const serviceDuration = (count: number) => count * serviceTiming.read + Math.max(0, count - 1) * serviceTiming.change;
export const servicePhase = (distance: number, count: number) => itemPhase(distance, count, serviceTiming.read);
export const serviceReading = (distance: number, index: number) => clamp((distance - serviceStart(index)) / serviceTiming.read);
export const serviceCompletion = (distance: number, index: number, count: number) => clamp((distance - serviceStart(index)) / (serviceTiming.read + (index < count - 1 ? serviceTiming.change : 0)));

export const createHomeScore = (projectCount: number, serviceCount: number) => {
  const portal = portalDistance;
  const hero = portal + .75;
  // Let the incoming scene travel over a full viewport of scroll before the tiles enter.
  const gridReveal = hero + .65;
  const gridZoom = gridReveal + .85;
  const gridContent = gridReveal + 2.2;
  const gridSettle = gridReveal + 2.7;
  const gridExit = gridSettle + .55;
  // Give the full-screen handover its own generous travel before project navigation starts.
  const work = gridExit + 1.6;
  const handoff = work + projectCount * .75;
  const services = handoff + serviceTiming.entrance;
  const quality = services + serviceDuration(serviceCount);
  const priceEntrance = quality + 2.25;
  const prices = priceEntrance + .75;
  const release = prices + 4 * 1.25;
  return { portal, hero, gridReveal, gridZoom, gridContent, gridSettle, gridExit, work, handoff, services, quality, priceEntrance, prices, release, total: release + .5 };
};

export const scrollToHomeMoment = (sequence: HTMLElement, moment: number, total: number, behavior: ScrollBehavior = 'smooth') => {
  const stage = sequence.querySelector<HTMLElement>('[data-home-stage]');
  if (!stage) return;
  const distance = sequence.offsetHeight - stage.offsetHeight;
  scrollHomeTo(sequence.getBoundingClientRect().top + window.scrollY + moment / total * distance, behavior);
};
