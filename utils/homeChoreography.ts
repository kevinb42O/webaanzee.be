/** Distances are stage heights, never seconds. All scenes share this score. */
export const desktopMotionQuery = '(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)';
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

export const createHomeScore = (projectCount: number, serviceCount: number) => {
  const hero = .75;
  const work = hero + 1;
  const handoff = work + projectCount * .75;
  const services = handoff + .75;
  const quality = services + serviceCount * .85;
  const priceEntrance = quality + 2.25;
  const prices = priceEntrance + .75;
  const release = prices + 4 * 1.25;
  return { hero, work, handoff, services, quality, priceEntrance, prices, release, total: release + .5 };
};

export const scrollToHomeMoment = (sequence: HTMLElement, moment: number, total: number, behavior: ScrollBehavior = 'smooth') => {
  const stage = sequence.querySelector<HTMLElement>('[data-home-stage]');
  if (!stage) return;
  const distance = sequence.offsetHeight - stage.offsetHeight;
  window.scrollTo({ top: sequence.getBoundingClientRect().top + window.scrollY + moment / total * distance, behavior });
};
