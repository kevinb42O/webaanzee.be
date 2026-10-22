import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

// Run against a running Vite or preview server: node scripts/check-mobile-home.mjs http://127.0.0.1:3001
const origin = process.argv[2] ?? 'http://127.0.0.1:3000';
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
const go = async (hash = '') => {
  await page.goto(`${origin}/${hash}`, { waitUntil: 'networkidle0' });
  await settle();
};
const jump = async id => {
  await page.evaluate(id => {
    document.documentElement.style.scrollBehavior = 'auto';
    const node = document.getElementById(id);
    const offset = document.querySelector('header').offsetHeight + 16;
    window.scrollTo(0, node.getBoundingClientRect().top + scrollY - offset);
  }, id);
  await settle();
};
try {
  for (const [width, height] of [[320,568],[375,667],[390,844],[430,932],[768,1024],[820,1180],[844,390],[999,844],[1000,649],[1000,650],[1440,900]]) {
    await page.setViewport({ width, height, isMobile: width < 1000, hasTouch: width < 1000 });
    await go();
    const state = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
      return {
        mobile: !!document.querySelector('[data-mobile-home]'),
        opening: document.querySelector('[data-mobile-opening]')?.dataset.mobileOpening,
        overflow: document.documentElement.scrollWidth - innerWidth,
        h1: document.querySelectorAll('h1').length,
        projects: document.querySelectorAll('[data-mobile-project]').length,
        duplicates: ids.filter((id, index) => ids.indexOf(id) !== index),
      };
    });
    assert.equal(state.mobile, width < 1000, `${width}: correct route`);
    assert.equal(state.h1, 1, `${width}: one H1`);
    assert.ok(state.overflow <= 1, `${width}: overflow ${state.overflow}`);
    assert.deepEqual(state.duplicates, [], `${width}: duplicate IDs`);
    if (width < 1000) assert.equal(state.projects, 10, `${width}: all projects`);
    if (height < 600 && width < 1000) assert.equal(state.opening, 'flow');
    console.log(`${width}×${height}: layout, route, headings and IDs passed (${state.opening ?? 'desktop'}).`);
  }

  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await go();
  const openingHeight = await page.$eval('[data-mobile-opening]', node => node.offsetHeight);
  assert.equal(await page.$eval('[data-mobile-opening]', node => node.dataset.mobileOpening), 'pinned');
  assert.ok(openingHeight <= 844 * 1.65 + 1, 'opening scroll budget');
  const panelTransform = async y => {
    await page.evaluate(y => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0,y); }, y);
    await settle();
    return page.$eval('[data-mobile-opening] [inert]', node => getComputedStyle(node).transform);
  };
  const first = await panelTransform(210);
  await panelTransform(350);
  assert.equal(await panelTransform(210), first, 'opening reverses to the same frame');

  // A synthesized touch swipe checks scroll behavior separately from screenshots.
  await page.evaluate(() => scrollTo(0, 0));
  const cdp = await page.createCDPSession();
  await cdp.send('Input.synthesizeScrollGesture', { x: 195, y: 700, yDistance: -350, speed: 700, gestureSourceType: 'touch' });
  assert.ok(await page.evaluate(() => scrollY > 50), 'native touch scroll stays available');

  for (let index = 0; index < 5; index++) {
    await jump(`service-trigger-${index}`);
    const state = await page.$eval(`#service-panel-${index}`, node => ({
      height: node.getBoundingClientRect().height,
      image: !!node.closest('[data-service-chapter]')?.querySelector('figure img'),
      link: !!node.querySelector('a[href]'),
      concealed: !!node.closest('[inert], [hidden], [aria-hidden="true"]'),
    }));
    assert.equal(state.concealed, false);
    assert.ok(state.height > 200);
    assert.ok(state.image);
    assert.ok(state.link);
  }
  await jump('faq');
  await page.tap('#faq summary');
  assert.equal(await page.$eval('#faq details', node => node.open), true);
  await page.tap('#faq summary');
  assert.equal(await page.$eval('#faq details', node => node.open), false);

  await page.$eval('#contact button', node => node.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.tap('#contact button');
  await page.waitForSelector('[role="dialog"]');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'contact-name');
  await page.keyboard.type('Test');
  await page.keyboard.press('Escape');
  assert.equal(await page.$('[role="dialog"]'), null);
  assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
  await page.tap('button[aria-controls="mobile-navigation"]');
  assert.equal(await page.$eval('#mobile-navigation', node => node.getAttribute('aria-hidden')), 'false');
  await page.keyboard.press('Escape');
  assert.equal(await page.$eval('#mobile-navigation', node => node.getAttribute('aria-hidden')), 'true');

  for (const hash of ['#home','#resultaten','#projecten','#werkwijze','#prijzen','#over-ons','#faq','#contact']) {
    await go(hash);
    const state = await page.evaluate(hash => {
      const node = document.querySelector(hash);
      return { top: node.getBoundingClientRect().top, scrollY };
    }, hash);
    assert.ok(Math.abs(state.top) < 160, `${hash}: landing ${state.top}`);
  }
  console.log('Touch scrolling, five service panels, FAQ, reverse scrubbing and eight direct anchors passed.');

  await go();
  await page.$eval('[data-mobile-project="4"]', node => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, node.getBoundingClientRect().top + scrollY); });
  await settle();
  // Keep emulation flags constant: changing isMobile would reload the document, not resize it.
  await page.setViewport({ width: 1440, height: 900, isMobile: true, hasTouch: true });
  await page.waitForFunction(() => document.querySelector('button[aria-label][aria-current="step"]')?.getAttribute('aria-label') === 'Toon Daily Grind');
  assert.equal(await page.$eval('button[aria-label][aria-current="step"]', node => node.getAttribute('aria-label')), 'Toon Daily Grind', 'same project after mobile to desktop');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.waitForFunction(() => {
    const top = document.querySelector('[data-mobile-project="4"] h3')?.getBoundingClientRect().top;
    return top > 0 && top < 180;
  });
  const restoredTop = await page.$eval('[data-mobile-project="4"] h3', node => node.getBoundingClientRect().top);
  assert.ok(restoredTop > 0 && restoredTop < 180, `same project after desktop to mobile: ${restoredTop}`);
  console.log('Reading position survives mobile ↔ desktop switches.');

  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await go();
  assert.equal(await page.$eval('[data-mobile-opening]', node => node.dataset.mobileOpening), 'flow');
  assert.equal(await page.$eval('[data-mobile-project="1"] > div', node => getComputedStyle(node).transform), 'none');
  assert.equal(await page.$eval('h1 span span', node => getComputedStyle(node).transform), 'none');
  await page.emulateMediaFeatures([]);
  await go();
  await page.addStyleTag({ content: 'html { font-size: 24px !important; }' });
  await new Promise(resolve => setTimeout(resolve, 150));
  assert.equal(await page.$eval('[data-mobile-opening]', node => node.dataset.mobileOpening), 'flow', 'large text disables pin');
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'large text fits');
  assert.deepEqual(errors, [], 'no browser runtime errors');
  console.log('Reduced motion, large text and runtime checks passed.');
} finally {
  await browser.close();
}
