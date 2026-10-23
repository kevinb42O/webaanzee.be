import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const origin = process.argv[2] ?? 'http://127.0.0.1:4173';
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
const scroll = async y => { await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await settle(); };
const jump = async target => {
  await page.$eval(`[data-mobile-target="${target}"]`, node => { const root = node.closest('[data-mobile-sequence]'); scrollTo({ top: root.getBoundingClientRect().top + scrollY + Number(node.dataset.mobileMoment), behavior: 'instant' }); });
  await settle();
};
try {
  for (const [width, height, font] of [[320,568,16],[390,844,16],[430,932,16],[820,1180,16],[844,390,16],[320,568,24],[320,568,32],[390,844,32]].slice(Number(process.argv[3] ?? 0))) {
    await page.setViewport({ width, height, isMobile: true, hasTouch: true });
    await page.goto(origin, { waitUntil: 'networkidle0' });
    if (font !== 16) await page.addStyleTag({ content: `html { font-size: ${font}px !important; }` });
    await settle();
    await scroll(0);
    assert.ok(await page.evaluate(width => document.documentElement.scrollWidth <= width + 1 && innerWidth <= width + 1, width), `${width}/${font}: horizontal overflow`);
    const headlines = await page.$$eval('h1 > span', nodes => nodes.map(n => ({ top: n.getBoundingClientRect().top, bottom: n.getBoundingClientRect().bottom })));
    assert.ok(headlines.every(r => r.top >= 0 && r.bottom < height - 30), `${width}/${font}: clipped portal headline ${JSON.stringify(headlines)}`);
    const hint = await page.$eval('[data-mobile-cinematic-opening] p[class*="hint"]', n => { const r=n.getBoundingClientRect(); return {left:r.left,right:r.right}; });
    assert.ok(hint.left >= 0 && hint.right <= width - 80, `${width}/${font}: scroll hint collides with chat`);
    const passage = await page.$eval('[data-mobile-cinematic-opening]', n => Number(getComputedStyle(n).getPropertyValue('--portal-distance')));
    await scroll(passage * height);
    const intro = await page.$eval('[data-portal-description]', n => ({ top: n.getBoundingClientRect().top, bottom: n.getBoundingClientRect().bottom }));
    assert.ok(intro.bottom > 0 && intro.bottom <= height + 2 && (intro.bottom - intro.top > height || intro.top >= 0), `${width}/${font}: hero description inaccessible ${JSON.stringify(intro)}`);

    for (const [kind, count] of [['service',5],['price',4]]) {
      const model = await page.$eval(`[data-mobile-kind="${kind}"]`, root => ({ top: root.getBoundingClientRect().top + scrollY, starts: JSON.parse(root.dataset.mobileStarts), holds: JSON.parse(root.dataset.mobileHolds), change: Number(root.dataset.mobileChange) }));
      await jump(`${kind}:0`);
      const menu = await page.$eval('button[aria-controls="mobile-navigation"]', n => {
        const r=n.getBoundingClientRect(),hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
        return {left:r.left,right:r.right,width:r.width,height:r.height,hit:hit===n||n.contains(hit)};
      });
      assert.ok(menu.left>=0 && menu.right<=width && menu.width>=44 && menu.height>=44 && menu.hit, `${width}/${font}: inaccessible menu ${JSON.stringify(menu)}`);
      const before = await page.$eval(`[data-mobile-kind="${kind}"]`, root => ({ header: root.querySelector('h2').getBoundingClientRect().top, nav: root.querySelector('nav').getBoundingClientRect().top, view: root.querySelector('[data-mobile-reading-viewport]').clientHeight }));
      assert.ok(before.view >= 100, `${width}/${font}/${kind}: insufficient reading viewport ${before.view}`);
      // Test the middle of every handover, where the old implementation hid the entire screen.
      for (let i = 0; i < count - 1; i++) {
        for (const fraction of [.25,.49,.5,.51,.75]) {
          await scroll(model.top + model.starts[i] + model.holds[i] + fraction * model.change);
          const state = await page.$eval(`[data-mobile-kind="${kind}"]`, (root, i) => {
            const viewport = root.querySelector('[data-mobile-reading-viewport]');
            const old = viewport.querySelector(`[data-mobile-reading-item="${i}"]`);
            const incoming = viewport.querySelector(`[data-mobile-reading-item="${i+1}"]`);
            return { header: root.querySelector('h2').getBoundingClientRect().top, nav: root.querySelector('nav').getBoundingClientRect().top, opacity: Number(getComputedStyle(viewport).opacity), oldY: old.getBoundingClientRect().top, nextY: incoming.getBoundingClientRect().top };
          }, i);
          assert.ok(Math.abs(state.header - before.header) < 2 && Math.abs(state.nav - before.nav) < 2, `${width}/${font}/${kind}: moving controls`);
          assert.equal(state.opacity, 1, `${width}/${font}/${kind}: empty fading viewport`);
          assert.ok(Number.isFinite(state.oldY) && Number.isFinite(state.nextY));
        }
      }
      // Each action must actually pass through the reading window, including at 200% text.
      for (let i = 0; i < count; i++) {
        await jump(`${kind}:${i}`);
        let seen;
        for (let step = 0; step <= 16; step++) {
          await scroll(model.top + model.starts[i] + model.holds[i] * step / 16);
          const visible = await page.$eval(`[data-mobile-kind="${kind}"]`, (root, i) => {
            const box = root.querySelector('[data-mobile-reading-viewport]').getBoundingClientRect();
            return [...root.querySelector(`[data-mobile-reading-item="${i}"]`).querySelectorAll('a[href]')].map(a => {
              const r = a.getBoundingClientRect();
              const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
              return r.top >= box.top && r.bottom <= box.bottom - 2 && (hit === a || a.contains(hit));
            });
          }, i);
          seen = seen ? seen.map((value, index) => value || visible[index]) : visible;
        }
        for (let a = 0; a < (seen?.length ?? 0); a++) {
          if (seen[a]) continue;
          await page.$eval(`[data-mobile-kind="${kind}"] [data-mobile-reading-item="${i}"]`, (panel, a) => panel.querySelectorAll('a[href]')[a].focus(), a);
          await settle();
          seen[a] = await page.$eval(`[data-mobile-kind="${kind}"]`, (root, {i,a}) => {
            const box=root.querySelector('[data-mobile-reading-viewport]').getBoundingClientRect();
            const link=root.querySelector(`[data-mobile-reading-item="${i}"]`).querySelectorAll('a[href]')[a];
            const r=link.getBoundingClientRect(), hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
            return r.top>=box.top && r.bottom<=box.bottom-2 && (hit===link||link.contains(hit));
          }, {i,a});
        }
        assert.ok(seen.length && seen.every(Boolean), `${width}/${font}/${kind}:${i}: unreachable actions ${JSON.stringify(seen)}`);
      }
      await jump(`${kind}:0`);
      const controls = await page.$$eval(`[data-mobile-kind="${kind}"] nav button`, nodes => nodes.map(n => { const r=n.getBoundingClientRect();const hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return { w:r.width,h:r.height,hit:hit===n||n.contains(hit) }; }));
      assert.ok(controls.every(c => c.w >= 44 && c.h >= 44 && c.hit), `${width}/${font}/${kind}: blocked or small controls ${JSON.stringify(controls)}`);
    }
    await page.$eval('[data-mobile-kind="price"]', (n,height) => scrollTo({top:n.getBoundingClientRect().top+scrollY-height-10,behavior:'instant'}), height);
    await settle();
    const closing = await page.$eval('[data-mobile-kind="quality"]', n => {
      const p=[...n.querySelectorAll('p')].find(x=>x.textContent.startsWith('Je aanbod begrijpen.'));
      return {opacity:Number(getComputedStyle(p.parentElement).opacity),bottom:p.getBoundingClientRect().bottom};
    });
    assert.ok(closing.opacity > .99 && closing.bottom <= height + 2 && closing.bottom > 80, `${width}/${font}: quality closing inaccessible ${JSON.stringify(closing)}`);
    console.log(`${width}×${height}, ${font}px: continuous handovers, fixed controls, every action reachable, hero and quality text fit.`);
  }
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(origin, { waitUntil: 'networkidle0' });
  await jump('service:3');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.waitForSelector('[data-mobile-project]');
  await settle();
  assert.ok(await page.$eval('#service-trigger-3', n => { const r=n.getBoundingClientRect();return r.top>=60&&r.top<250; }), 'motion preference preserves the service');
  await page.emulateMediaFeatures([]);
  await page.waitForSelector('[data-mobile-cinematic]');
  await settle();
  assert.equal(await page.$eval('[data-mobile-kind="service"]', n=>n.dataset.mobileIndex),'3');
  await page.tap('button[aria-controls="mobile-navigation"]');
  await settle();
  for(let i=0;i<30;i++) {
    await page.keyboard.press('Tab');
    assert.ok(await page.evaluate(()=>document.getElementById('mobile-navigation').contains(document.activeElement)||document.activeElement.matches('button[aria-controls="mobile-navigation"]')), 'menu leaks keyboard focus');
  }
  await page.setViewport({width:1440,height:900,isMobile:true,hasTouch:true});
  await page.waitForFunction(()=>document.body.style.overflow!=='hidden');
  assert.deepEqual(errors, []);
  console.log('Motion-preference restoration, menu focus containment and resize unlock passed.');
} finally { await browser.close(); }
