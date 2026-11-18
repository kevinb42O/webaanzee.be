import assert from 'node:assert/strict';
import { mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { independentProjects, independentProjectPreviews } from '../data/independent-projects.mjs';
import { pwaymentScreens } from '../data/pwayment-screens.mjs';

const origin = process.argv[2] ?? 'http://127.0.0.1:4178';
const output = path.resolve('.tmp/independent-projects');
await mkdir(output, { recursive: true });
const executablePath = process.env.CHROME_PATH ?? (process.platform === 'darwin'
  ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined);
const browser = await puppeteer.launch({ headless: true, executablePath });
const errors = [];
const page = await browser.newPage();
await page.setCacheEnabled(false);
page.on('pageerror', error => errors.push(error.message));

try {
  for (const project of independentProjectPreviews) {
    assert.ok((await stat(path.resolve('dist', `.${project.hero.src}`))).size > 0, project.hero.src);
    const destination = path.resolve('dist', `.${project.path}`, project.path.endsWith('/') ? 'index.html' : '');
    assert.ok((await stat(destination)).isFile(), `Project destination: ${project.path}`);
  }
  for (const project of independentProjects) {
    // Every advertised responsive source and full-size link must ship.
    for (const image of [project.hero, ...project.sections.map(section => section.image)]) {
      for (const src of [...image.srcSet.split(', ').map(source => source.split(' ')[0]), image.src, image.full]) {
        assert.ok((await stat(path.resolve('dist', `.${src}`))).size > 0, src);
      }
    }
    const html = await readFile(path.resolve('dist', `.${project.path}`, 'index.html'), 'utf8');
    assert.ok(html.includes(`https://www.webaanzee.be${project.path}`), 'Canonical is present');
    assert.ok(html.includes('CreativeWork'), 'Personal project schema is present');
    assert.ok(!html.includes('codex-clipboard'), 'Temporary sources are not published');
    // The generated project story works without JavaScript.
    await page.setJavaScriptEnabled(false);
    for (const width of [390, 768, 1440]) {
      await page.setViewport({ width, height: 900 });
      const response = await page.goto(origin + project.path, { waitUntil: 'load' });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      // Lazy media is loaded before its visual verification, without altering layout.
      await page.evaluate(async () => {
        const images = [...document.querySelectorAll('.ip-project img')];
        images.forEach(image => image.loading = 'eager');
        await Promise.all(images.map(image => image.decode()));
      });
      const state = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth, viewport: innerWidth,
        h1: document.querySelector('h1')?.textContent,
        figures: document.querySelectorAll('.ip-figure').length,
        broken: [...document.querySelectorAll('.ip-project img')].filter(image => !image.naturalWidth).length,
        ids: [...document.querySelectorAll('[id]')].map(node => node.id),
      }));
      assert.ok(state.width <= state.viewport + 1, `${project.slug} ${width}: horizontal overflow`);
      assert.equal(state.h1, project.title);
      assert.equal(state.figures, project.sections.length + 1);
      assert.equal(state.broken, 0);
      assert.equal(new Set(state.ids).size, state.ids.length, 'Unique IDs');
      await page.screenshot({ path: `${output}/${project.slug}-${width}.png`, fullPage: true });
      console.log(`${project.slug} ${width}px: static page, images, heading and overflow passed.`);
    }
  }
  const pwaymentHtml = await readFile('dist/pwayment.html', 'utf8');
  assert.ok(!pwaymentHtml.includes('pwayment.vercel.app/website/'), 'PWAYMENT does not reuse old remote screenshots');
  for (const screen of pwaymentScreens) {
    for (const src of [...screen.srcSet.split(', ').map(source => source.split(' ')[0]), screen.full]) {
      assert.ok((await stat(path.resolve('dist', `.${src}`))).size > 0, src);
    }
  }
  for (const width of [390, 768, 1440]) {
    await page.setViewport({ width, height: 900 });
    await page.goto(`${origin}/pwayment.html`, { waitUntil: 'load' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img[src*="/eigen-projecten/pwayment/"]')].map(image => { image.loading = 'eager'; return image.decode(); }));
    });
    const state = await page.evaluate(() => ({
      screenshots: document.querySelectorAll('img[src*="/eigen-projecten/pwayment/"]').length,
      enlargeLinks: document.querySelectorAll('a[href$="-2400.webp"]').length,
      headings: document.querySelectorAll('h1').length,
      width: document.documentElement.scrollWidth, viewport: innerWidth,
    }));
    assert.equal(state.screenshots, 7);
    assert.equal(state.enlargeLinks, 7);
    assert.equal(state.headings, 1);
    assert.ok(state.width <= state.viewport + 1, `PWAYMENT ${width}: horizontal overflow`);
    await page.screenshot({ path: `${output}/pwayment-${width}.png`, fullPage: true });
    console.log(`PWAYMENT ${width}px: seven current captures, enlargement links and layout passed.`);
  }
  await page.setJavaScriptEnabled(true);
  for (const width of [390, 768, 1440]) {
    await page.setViewport({ width, height: 900 });
    await page.goto(`${origin}/#eigen-projecten`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForSelector('#eigen-projecten');
    await page.waitForFunction(() => {
      const top = document.getElementById('eigen-projecten')?.getBoundingClientRect().top;
      return top !== undefined && top >= -10 && top < 180;
    });
    await page.evaluate(async () => {
      await Promise.all([...document.querySelectorAll('#eigen-projecten img')].map(image => image.decode()));
    });
    const state = await page.$eval('#eigen-projecten', node => ({
      projects: [...node.querySelectorAll('article h3')].map(heading => heading.textContent),
      previous: node.previousElementSibling?.querySelector('#about-title')?.textContent,
      next: node.nextElementSibling?.querySelector('h2')?.textContent,
      links: [...node.querySelectorAll('a')].map(link => link.getAttribute('href')),
      width: document.documentElement.scrollWidth, viewport: innerWidth,
    }));
    assert.deepEqual(state.projects, ['PWAYMENT POS', 'Velvet', 'Sunline']);
    assert.ok(state.previous && state.next, 'Section sits between About and FAQ');
    assert.ok(state.width <= state.viewport + 1, `Homepage ${width}: horizontal overflow`);
    for (const project of independentProjectPreviews) assert.ok(state.links.includes(project.path));
    await page.$eval('#eigen-projecten', node => node.scrollIntoView({ behavior: 'instant' }));
    await (await page.$('#eigen-projecten')).screenshot({ path: `${output}/home-${width}.png` });
    console.log(`Homepage ${width}px: PWAYMENT, Velvet, Sunline order, links and layout passed.`);
  }
  // Switching the existing homepage choreography must preserve the new section.
  for (const width of [390, 1440]) {
    await page.setViewport({ width, height: 900 });
    await page.waitForFunction(() => {
      const top = document.getElementById('eigen-projecten')?.getBoundingClientRect().top;
      return top !== undefined && top >= -10 && top < 180;
    });
  }
  console.log('Homepage direct anchor and desktop/mobile reading position passed.');
  // Reduced motion retains the section and all three project links.
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(`${origin}/#eigen-projecten`, { waitUntil: 'load' });
  assert.equal(await page.$$eval('#eigen-projecten article', nodes => nodes.length), 3);
  assert.deepEqual(errors, [], 'Browser runtime errors');
  console.log(`Independent project checks passed. Review captures: ${output}`);
} finally {
  await browser.close();
}
