import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

// Check media behavior without depending on a browser autoplay policy.
class Events {
  handlers = new Map();
  addEventListener(name, fn) { this.handlers.set(name, fn); }
  async fire(name, value = {}) { await this.handlers.get(name)?.(value); }
}
const mediaQuery = Object.assign(new Events(), { matches: false });
const document = Object.assign(new Events(), { hidden: false });
let plays = 0;
let pauses = 0;
let source = null;
let finishPlay;
let delayed = false;
const video = Object.assign(new Events(), {
  dataset: { src: '/videos/cozy.mp4' },
  getAttribute: () => source,
  async play() { plays++; if (delayed) await new Promise(resolve => { finishPlay = resolve; }); },
  pause() { pauses++; },
});
Object.defineProperty(video, 'src', { set(value) { source = value; } });
const classes = new Set();
const element = Object.assign(new Events(), {
  querySelector: () => video,
  classList: { add: v => classes.add(v), remove: v => classes.delete(v) },
});
document.querySelector = () => null;
document.querySelectorAll = () => [element];
const observers = [];
class IntersectionObserver {
  constructor(callback) { observers.push(callback); }
  observe() {}
}
vm.runInNewContext(await readFile(new URL('../public/location-pages.js', import.meta.url), 'utf8'), {
  document,
  window: { matchMedia: query => query.includes('reduced-motion') ? mediaQuery : { matches: false }, IntersectionObserver },
  IntersectionObserver,
});
assert.equal(source, null, 'No video download before interaction');
mediaQuery.matches = true;
await element.fire('pointerenter');
assert.equal(plays, 0, 'Reduced motion prevents preview playback');
mediaQuery.matches = false;
await element.fire('focus');
assert.equal(source, '/videos/cozy.mp4');
assert.ok(classes.has('is-playing'), 'Keyboard focus starts the preview');
await element.fire('blur');
assert.ok(!classes.has('is-playing'), 'Blur restores the static poster');
await element.fire('pointerenter');
observers[0]([{ isIntersecting: false }]);
assert.ok(!classes.has('is-playing'), 'Offscreen media stops');
await element.fire('pointerenter');
document.hidden = true;
await document.fire('visibilitychange');
assert.ok(!classes.has('is-playing'), 'Hidden tabs pause media');
document.hidden = false;
delayed = true;
const pending = element.fire('pointerenter');
await element.fire('pointerleave');
finishPlay();
await pending;
assert.ok(!classes.has('is-playing'), 'A late play promise cannot override pointerleave');
assert.ok(pauses > 0);
const css = await readFile(new URL('../public/location-pages.css', import.meta.url), 'utf8');
assert.match(css, /prefers-reduced-motion:reduce/);
assert.match(css, /animation:none!important/);
console.log('Regional motion checks passed: deferred media, reduced motion, keyboard focus, offscreen pause, hidden tabs and late-play cancellation.');
