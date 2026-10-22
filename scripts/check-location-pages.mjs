import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { locations, cityPath } from '../data/locations.mjs';
import { projects } from '../data/projects.mjs';
import { pricing, euro } from '../data/pricing.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const paths = ['/webdesign-belgische-kust/', ...locations.map(l => cityPath(l.slug))];
const introductions = new Set(locations.map(l => l.intro));
assert.equal(locations.length, 10, 'Preserve the existing ten regional routes');
assert.equal(introductions.size, 10, 'Each region needs its own introduction');
for (const route of paths) {
  const html = await readFile(path.join(dist, route, 'index.html'), 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: exactly one H1`);
  assert.ok(html.includes(`/location-pages.css`), `${route}: regional design must be present`);
  assert.ok(html.includes(`https://www.webaanzee.be${route}`), `${route}: preserve canonical URL`);
  assert.ok(html.includes('id="werk"') && html.includes('id="prijzen"'), `${route}: work and prices available in first HTML`);
  for (const offer of [pricing.website, pricing.cms, pricing.webshop, pricing.application]) {
    assert.ok(html.includes(`<strong>${euro(offer.price)}</strong>`), `${route}: price must match central data`);
  }
  assert.ok(!/geen marketingzin|grotere bureaus|stadspagina’s publiceren|concurrentie is groter|blij[fv] je niet alleen/i.test(html), `${route}: stale editorial claims`);
  for (const match of html.matchAll(/(?:src|data-src)="(\/[^"#]+)"/g)) {
    assert.ok((await stat(path.join(dist, match[1]))).isFile(), `${route}: missing media ${match[1]}`);
  }
  const loc = locations.find(l => cityPath(l.slug) === route);
  if (loc) {
    const shown = [...html.matchAll(/class="rg-project-media" href="\/cases\/([^/]+)\//g)].map(m => m[1]);
    assert.deepEqual(shown, loc.cases.map(c => c[0]), `${route}: no arbitrary fallback projects`);
    for (const [slug, reason] of loc.cases) {
      assert.ok(projects.some(p => p.slug === slug), `${route}: valid project reference`);
      assert.ok(reason.length > 50, `${route}: explain the relevance of each project`);
    }
  }
}
console.log(`Regional checks passed: ${paths.length} pages, 10 unique introductions, central prices, selected projects and all media.`);
