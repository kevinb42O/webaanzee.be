import assert from 'node:assert/strict';
import { clamp, createHomeScore, itemOpacity, itemPhase, scrollToHomeMoment, soften } from '../utils/homeChoreography.ts';

const score = createHomeScore(10, 5);
assert.equal(score.total, 22.75);
assert.deepEqual(Object.values(score), [...Object.values(score)].sort((a, b) => a - b));

for (const [count, hold] of [[10, .5], [5, .6], [4, 1]]) {
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
  offsetHeight: 23750,
  querySelector: () => ({ offsetHeight: 1000 }),
  getBoundingClientRect: () => ({ top: -200 }),
};
for (const moment of [score.work + .25, score.services + .3, score.prices + .5, score.total]) {
  scrollToHomeMoment(sequence, moment, score.total, 'instant');
  assert.ok(Math.abs(calls.at(-1).top - moment * 1000) < 1e-8);
}
assert.equal(clamp(-1), 0);
assert.equal(clamp(2), 1);
console.log('Homepage motion: stable reading, uniform travel, soft boundaries, reversible curves, non-overlapping text and measured navigation passed.');
