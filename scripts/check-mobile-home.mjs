import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

// Run against a production preview (npm run build && npm run preview).
// Native scroll scenes: Chromium emulation and synthesized touch, not physical Safari.
const origin = process.argv[2] ?? 'http://127.0.0.1:3000';
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const settle = async (milliseconds = 90) => {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  if (milliseconds) await new Promise(resolve => setTimeout(resolve, milliseconds));
};
const go = async (hash = '') => {
  await page.goto(`${origin}/${hash}`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await settle();
};
const moment = async (target, extra = 0) => {
  await page.$eval(`[data-mobile-target="${target}"]`, (node, extra) => {
    const root = node.closest('[data-mobile-sequence]');
    window.scrollTo({ top: root.getBoundingClientRect().top + scrollY + Number(node.dataset.mobileMoment) + extra, behavior: 'instant' });
  }, extra);
  await settle();
};
const scroll = async y => {
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await settle();
};

try {
  for (const [width, height] of [[320,568],[375,667],[390,844],[430,932],[768,1024],[820,1180],[844,390],[999,844],[1000,649],[1000,650],[1440,900]]) {
    await page.setViewport({ width, height, isMobile: width < 1000, hasTouch: width < 1000 });
    await go();
    const state = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
      return {
        mobile: !!document.querySelector('[data-mobile-cinematic]'),
        overflow: document.documentElement.scrollWidth - innerWidth,
        h1: document.querySelectorAll('h1').length,
        projects: document.querySelectorAll('[data-mobile-target^="project:"]').length,
        services: document.querySelectorAll('[data-mobile-target^="service:"]').length,
        prices: document.querySelectorAll('[data-mobile-target^="price:"]').length,
        duplicates: ids.filter((id, index) => ids.indexOf(id) !== index),
        depth: !!document.querySelector('[data-depth-showcase]'),
        grid: !!document.querySelector('[data-sticky-grid]'),
        workbench: !!document.querySelector('[data-service-workbench]'),
        staticQuality: !!document.querySelector('#quality-static-title'),
        priceDetails: !!document.querySelector('#prijsdetails'),
      };
    });
    assert.equal(state.mobile, width < 1000, `${width}: correct cinematic route`);
    assert.equal(state.h1, 1, `${width}: one H1`);
    assert.ok(state.overflow <= 1, `${width}: overflow ${state.overflow}`);
    assert.deepEqual(state.duplicates, [], `${width}: duplicate IDs`);
    if (width < 1000) {
      assert.equal(state.projects, 10);
      assert.equal(state.services, 5);
      assert.equal(state.prices, 4);
      assert.ok(state.depth && state.workbench && state.priceDetails);
      assert.equal(state.grid, false, 'only mosaic is omitted');
      assert.equal(state.staticQuality, false, 'no duplicate quality section');
      for (const target of ['project:0', 'service:4', 'price:3']) {
        await moment(target);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      }
    }
    console.log(`${width}×${height}: route, complete scenes, layout and IDs passed.`);
  }

  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await go();
  // The portal, depth camera, services and price drum all reverse under native scroll.
  for (const [kind, selector] of [['project', '[data-depth-showcase]'], ['service', '[data-service-workbench]']]) {
    for (let i = 0; i < (kind === 'project' ? 10 : 5); i++) {
      await moment(`${kind}:${i}`);
      if (kind === 'project') await page.waitForFunction(index => Number(document.querySelector('[data-depth-showcase]').dataset.depthIndex) === index, {}, i);
      const value = await page.$eval(selector, (node, kind) => Number(node.dataset[kind === 'project' ? 'depthIndex' : 'serviceIndex']), kind);
      assert.equal(value, i, `${kind} ${i}: image and active index agree`);
    }
    await moment(`${kind}:0`);
    await settle(700);
    assert.equal(await page.$eval(selector, (node, kind) => Number(node.dataset[kind === 'project' ? 'depthIndex' : 'serviceIndex']), kind), 0, `${kind}: reverse scroll`);
  }
  console.log('All ten depth projects and five service transitions passed in both directions.');
  assert.equal(await page.$eval('[data-depth-showcase]', node => node.dataset.depthReady), 'true', 'real WebGL engine initialized');

  for (let i = 0; i < 4; i++) {
    await moment(`price:${i}`);
    const state = await page.evaluate(() => {
      const root = document.querySelector('[data-mobile-kind="price"]');
      const chapter = root.querySelector('article:not([inert])');
      return { index: Number(root.dataset.mobileIndex), label: chapter?.getAttribute('aria-label'), transform: chapter?.querySelector('[class*="glyphWindow"] > span')?.style.transform };
    });
    assert.equal(state.index, i);
    assert.ok(state.label);
    assert.ok(state.transform, 'price glyphs use the original 3D drum');
  }

  // Long compositions have a measured reading path. Their final actions must enter the viewport.
  for (const [kind, count] of [['service', 5], ['price', 4]]) {
    for (let i = 0; i < count; i++) {
      await moment(`${kind}:${i}`);
      const result = await page.evaluate(({ kind, i }) => {
        const root = document.querySelector(`[data-mobile-kind="${kind}"]`);
        const anchors = [...root.querySelectorAll('[data-mobile-target]')];
        const viewport = root.querySelector('[data-mobile-stage]').offsetHeight;
        const slot = Number(anchors[1].dataset.mobileMoment) - Number(anchors[0].dataset.mobileMoment);
        const hold = JSON.parse(root.dataset.mobileHolds)[i];
        const top = root.getBoundingClientRect().top + scrollY + Number(anchors[i].dataset.mobileMoment) - viewport * .15;
        window.scrollTo({ top: top + hold - 1, behavior: 'instant' });
        return { top, hold };
      }, { kind, i });
      await settle();
      const actions = await page.evaluate(kind => {
        const root = document.querySelector(`[data-mobile-kind="${kind}"]`);
        const article = root.querySelector('article:not([inert])');
        return [...article.querySelectorAll('a[href]')].map(n => ({ top: n.getBoundingClientRect().top, bottom: n.getBoundingClientRect().bottom }));
      }, kind);
      assert.ok(actions.length);
      assert.ok(actions.every(a => a.top >= 64 && a.bottom <= 844), `${kind} ${i}: actions fit at end of reading ${JSON.stringify(actions)} ${JSON.stringify(result)}`);
    }
  }

  for (const kind of ['service', 'price']) {
    await moment(`${kind}:0`);
    await page.$eval(`[data-mobile-kind="${kind}"] article:not([inert]) a[href]`, n => n.focus());
    await settle();
    const bounds = await page.evaluate(() => ({ top: document.activeElement.getBoundingClientRect().top, bottom: document.activeElement.getBoundingClientRect().bottom }));
    assert.ok(bounds.top >= 64 && bounds.bottom <= 844, `${kind}: focused action stays visible ${JSON.stringify(bounds)}`);
  }

  await scroll(0);
  const cdp = await page.createCDPSession();
  await cdp.send('Input.synthesizeScrollGesture', { x: 195, y: 700, yDistance: -450, speed: 750, gestureSourceType: 'touch' });
  assert.ok(await page.evaluate(() => scrollY > 100), 'native touch swipe scrolls the page');
  const first = await page.$eval('[data-coastal-portal]', n => n.style.transform);
  const position = await page.evaluate(() => scrollY);
  await scroll(position + 150);
  await scroll(position);
  assert.equal(await page.$eval('[data-coastal-portal]', n => n.style.transform), first, 'portal reverses to the same scroll frame');

  console.log('Price drums, complete reading paths, keyboard focus and native touch passed.');

  // Buttons seek the exact same timeline as touch scrolling.
  await moment('project:0');
  await settle(700);
  await page.tap('button[aria-label="Volgend project"]');
  await page.waitForFunction(() => document.querySelector('[data-depth-showcase]').dataset.depthIndex === '1');
  await moment('service:0', 400);
  await page.tap('#service-trigger-3');
  await page.waitForFunction(() => document.querySelector('[data-service-workbench]').dataset.serviceIndex === '3');

  for (const hash of ['#home','#resultaten','#projecten','#werkwijze','#prijzen','#prijsdetails','#over-ons','#faq','#contact']) {
    await go(hash);
    const state = await page.evaluate(hash => {
      const node = document.querySelector(hash);
      const sequence = node.closest('[data-mobile-sequence]');
      const expected = sequence && node.dataset.mobileMoment !== undefined ? (node === sequence ? -Number(node.dataset.mobileMoment) : 0) : 80;
      return { top: node.getBoundingClientRect().top, expected };
    }, hash);
    assert.ok(Math.abs(state.top - state.expected) < 165, `${hash}: ${JSON.stringify(state)}`);
  }
  await go('#prijzen');
  await page.reload({ waitUntil: 'networkidle0' });
  await settle();
  assert.ok(Math.abs(await page.$eval('#prijzen', n => n.getBoundingClientRect().top)) < 2, 'reload restores the semantic price anchor');
  await go('#faq');
  await go('#contact');
  await page.goBack();
  await settle();
  assert.ok(Math.abs(await page.$eval('#faq', n => n.getBoundingClientRect().top) - 80) < 30, 'history restores the visible FAQ');
  await page.$eval('#faq', n => n.scrollIntoView({ behavior: 'instant' }));
  await page.tap('#faq summary');
  assert.equal(await page.$eval('#faq details', n => n.open), true);
  await page.$eval('#contact button', n => n.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.tap('#contact button');
  await page.waitForSelector('[role="dialog"]');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'contact-name');
  await page.keyboard.type('Test');
  await page.keyboard.press('Escape');
  assert.equal(await page.$('[role="dialog"]'), null);
  assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
  await page.tap('button[aria-controls="mobile-navigation"]');
  assert.equal(await page.$eval('#mobile-navigation', n => n.getAttribute('aria-hidden')), 'false');
  await page.keyboard.press('Escape');
  assert.equal(await page.$eval('#mobile-navigation', n => n.getAttribute('aria-hidden')), 'true');

  console.log('Touch controls, direct anchors, reload, history, menu, FAQ and contact dialog passed.');
  await go();
  await moment('project:4');
  await settle(700);
  await page.setViewport({ width: 1440, height: 900, isMobile: true, hasTouch: true });
  await page.waitForFunction(() => document.querySelector('[data-depth-showcase]')?.dataset.depthIndex === '4');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.waitForFunction(() => document.querySelector('[data-mobile-kind="project"]')?.dataset.mobileIndex === '4');
  await page.setViewport({ width: 430, height: 932, isMobile: true, hasTouch: true });
  await settle(700);
  assert.equal(await page.$eval('[data-mobile-kind="project"]', n => n.dataset.mobileIndex), '4', 'rotation/resize preserves project');

  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await go();
  assert.equal(await page.$('[data-mobile-cinematic]'), null);
  assert.equal(await page.$$eval('[data-mobile-project]', nodes => nodes.length), 10);
  assert.ok(await page.$('#quality-static-title'));
  assert.ok(await page.$('#prijzen'));
  await page.emulateMediaFeatures([]);
  await go();
  await page.addStyleTag({ content: 'html { font-size: 24px !important; }' });
  await settle(200);
  await moment('price:3');
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'large text fits');

  const fallback = await page.evaluateOnNewDocument(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, options) {
      if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') return null;
      return getContext.call(this, type, options);
    };
  });
  await go();
  await moment('project:7');
  assert.equal(await page.$eval('[data-depth-showcase]', n => n.dataset.depthReady), 'false');
  assert.ok(await page.$('[data-depth-showcase] > a[href]'), 'WebGL fallback keeps a real case link');
  assert.equal(await page.$eval('[data-depth-showcase]', n => n.dataset.depthIndex), '7', 'fallback follows the same project navigation');
  await page.removeScriptToEvaluateOnNewDocument(fallback.identifier);

  console.log('Responsive reading position, reduced motion, large text and WebGL fallback passed.');
  await page.setJavaScriptEnabled(false);
  await page.goto(origin, { waitUntil: 'networkidle0' });
  assert.equal(await page.$$eval('h1', nodes => nodes.length), 1);
  assert.equal(await page.$$eval('main article', nodes => nodes.length), 19, 'server fallback contains ten cases, five services and four offers');
  assert.deepEqual(errors, [], 'no browser runtime errors');
  console.log('All cases, services, prices, reading actions, touch, reversal, anchors, interactions, responsive restoration and fallbacks passed.');
} finally {
  await browser.close();
}
