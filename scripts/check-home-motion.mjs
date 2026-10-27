import assert from 'node:assert/strict';
import { clamp, createHomeScore, itemOpacity, itemPhase, pricePhase, priceMoment, scrollToHomeMoment, soften, serviceCompletion, serviceDuration, servicePhase, serviceReadMoment, serviceReading, serviceStart, serviceTiming } from '../utils/homeChoreography.ts';
import { registerHomeScroll } from '../utils/homeScroll.ts';

const score = createHomeScore(10, 5);
assert.ok(Math.abs(score.total - 24.9) < 1e-10);
assert.ok(Math.abs(score.hero - score.portal - .75) < 1e-10, 'The original hero duration is preserved after the portal');
assert.deepEqual(Object.values(score), [...Object.values(score)].sort((a, b) => a - b));
assert.ok(score.gridReveal < score.gridZoom && score.gridZoom < score.gridContent);
assert.ok(score.gridContent < score.gridSettle && score.gridSettle < score.gridExit && score.gridExit < score.work);

for (const [count, hold] of [[10, .5], [5, serviceTiming.read]]) {
  const slot = hold + .25;
  for (let index = 0; index < count; index++) {
    // Reading must be genuinely still, including either edge of the hold.
    for (const fraction of [0, .1, .5, .9, 1]) {
      assert.ok(Math.abs(itemPhase(index * slot + hold * fraction, count, hold) - index) < 1e-10);
    }
    let previous = index;
    for (let step = 0; step <= 100; step++) {
      const t = step / 100;
      const phase = itemPhase(index * slot + hold + t * .25, count, hold);
      assert.ok(phase >= previous - 1e-10);
      // Every family traverses the same curve over the same physical distance.
      assert.ok(Math.abs(phase - Math.min(index + soften(t), count - 1)) < 1e-9);
      if (index < count - 1) {
        assert.ok(itemOpacity(phase, index) === 0 || itemOpacity(phase, index + 1) === 0);
      }
      previous = phase;
    }
  }
  assert.equal(itemPhase(-100, count, hold), 0);
  assert.equal(itemPhase(100, count, hold), count - 1);
}

// A price sheet must move on the very first pixel and every subsequent wheel increment.
for (const viewport of [650, 720, 900]) {
  for (let sheet = 0; sheet < 3; sheet++) {
    for (const pixels of [1, 8, 24, 60, 120, 240, viewport - 1]) {
      const phase = pricePhase(priceMoment(sheet) + pixels / viewport);
      assert.ok(Math.abs(phase - sheet - pixels / viewport) < 1e-10);
      assert.ok(phase > sheet && phase < sheet + 1, 'partial scrolling keeps the sheet visibly between positions');
      assert.ok(Math.abs((1 - (phase - sheet)) * viewport - (viewport - pixels)) < 1e-8);
      assert.ok(pricePhase(sheet + (pixels - 1) / viewport) < phase, 'scrolling back reverses the sheet immediately');
    }
  }
}
assert.equal(pricePhase(-1), 0);
assert.equal(pricePhase(9), 3);
assert.equal(score.total, score.prices + priceMoment(3), 'the final sheet releases directly into normal scrolling');

// Services keep copy steady without swallowing scroll input; the last item
// exits directly into quality rather than waiting through a nonexistent sixth.
assert.ok(Math.abs(score.services - score.handoff - serviceTiming.entrance) < 1e-9);
assert.ok(Math.abs(score.quality - score.services - serviceDuration(5)) < 1e-9);
assert.ok(Math.abs(serviceTiming.entrance + serviceDuration(5) + serviceTiming.exit - 3.85) < 1e-9);
for (let index = 0; index < 5; index++) {
  assert.ok(Math.abs(servicePhase(serviceReadMoment(index), 5) - index) < 1e-9, 'navigation lands on stable copy');
  let previous = -1;
  for (let step = 0; step <= 100; step++) {
    const position = serviceStart(index) + serviceTiming.read * step / 100;
    assert.ok(Math.abs(servicePhase(position, 5) - index) < 1e-9, 'copy remains still throughout reading');
    assert.ok(serviceCompletion(position, index, 5) > previous, 'every reading increment advances feedback');
    assert.ok(Math.abs(serviceReading(position, index) - step / 100) < 1e-9, 'image follows scroll in both directions');
    previous = serviceCompletion(position, index, 5);
  }
}
assert.ok(Math.abs(serviceCompletion(serviceDuration(5), 4, 5) - 1) < 1e-9);
assert.equal(servicePhase(serviceDuration(5) + serviceTiming.exit, 5), 4);

// Value, velocity and acceleration meet the still reading windows continuously.
const epsilon = 1e-4;
assert.ok(soften(epsilon) / epsilon < 1e-6);
assert.ok(soften(epsilon) / epsilon ** 2 < .002);
assert.ok((1 - soften(1 - epsilon)) / epsilon < 1e-6);
for (let step = 0; step <= 100; step++) {
  const t = step / 100;
  assert.ok(Math.abs(soften(t) + soften(1 - t) - 1) < 1e-12);
}

// Navigation uses the measured sticky stage, even when innerHeight differs.
const calls = [];
globalThis.window = { scrollY: 200, innerHeight: 1000, scrollTo: args => calls.push(args) };
const sequence = {
  offsetHeight: (1 + score.total) * 1000,
  querySelector: () => ({ offsetHeight: 1000 }),
  getBoundingClientRect: () => ({ top: -200 }),
};
for (const moment of [score.work + .25, ...Array.from({ length: 5 }, (_, i) => score.services + serviceReadMoment(i)), score.prices + .5, score.total]) {
  scrollToHomeMoment(sequence, moment, score.total, 'instant');
  assert.ok(Math.abs(calls.at(-1).top - moment * 1000) < 1e-8);
}
// Anchor buttons must use the same controller as wheel scrolling, and release it on unmount.
const controlledCalls = [];
const unregister = registerHomeScroll((top, behavior) => controlledCalls.push({ top, behavior }));
scrollToHomeMoment(sequence, score.work, score.total);
assert.equal(controlledCalls.length, 1);
assert.equal(controlledCalls[0].behavior, 'smooth');
assert.ok(Math.abs(controlledCalls[0].top - score.work * 1000) < 1e-8);
const nativeCount = calls.length;
unregister();
scrollToHomeMoment(sequence, score.services, score.total, 'instant');
assert.equal(calls.length, nativeCount + 1, 'native navigation resumes after leaving desktop motion');
assert.equal(clamp(-1), 0);
assert.equal(clamp(2), 1);
console.log('Homepage motion: stable reading, uniform travel, soft boundaries, reversible curves, non-overlapping text and measured navigation passed.');
