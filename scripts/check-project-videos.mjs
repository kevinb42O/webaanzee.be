import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';
import { projects } from '../data/projects.mjs';

const origin = process.argv[2] ?? 'http://127.0.0.1:4173';
const targets = projects;
assert.ok(targets.every(project => project.videoSrc), 'Every portfolio project must have a video');
const browser = await puppeteer.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
let mediaServer;
let mediaOrigin;
if (process.env.REDIRECT_PROJECT_MEDIA) {
  const paths = new Set(targets.map(project => new URL(project.videoSrc, origin).pathname));
  mediaServer = createServer(async (request, response) => {
    const path = new URL(request.url, 'http://localhost').pathname;
    if (!paths.has(path)) { response.writeHead(404).end(); return; }
    try {
      const bytes = await readFile(new URL(`../public${path}`, import.meta.url));
      response.writeHead(200, { 'Content-Type': 'video/mp4', 'Content-Length': bytes.length, 'Access-Control-Allow-Origin': '*' });
      response.end(bytes);
    } catch { response.writeHead(500).end(); }
  });
  await new Promise(resolve => mediaServer.listen(0, '127.0.0.1', resolve));
  mediaOrigin = `http://127.0.0.1:${mediaServer.address().port}`;
}
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /THREE\.WebGL|SecurityError|cross-origin|texImage2D/i.test(message.text())) {
      const error = message.text().split('\n')[0];
      if (!errors.includes(error)) errors.push(error);
    }
  });
  if (mediaOrigin) {
    await page.setRequestInterception(true);
    page.on('request', request => {
      const url = new URL(request.url());
      if (request.resourceType() === 'media' && url.origin === new URL(origin).origin) {
        void request.respond({ status: 302, headers: { location: mediaOrigin + url.pathname + url.search, 'access-control-allow-origin': '*' } });
      } else void request.continue();
    });
  }
  for (const width of [1440, 390]) {
    await page.setViewport({ width, height: 900, isMobile: width < 1000, hasTouch: width < 1000 });
    for (const project of targets) {
      await page.goto(origin + project.casePath, { waitUntil: 'networkidle0' });
      assert.ok(await page.$eval('.case-intro video', video => video.controls && video.preload === 'none' && !video.autoplay));
      await page.$eval('.case-intro video', async video => { video.muted = true; await video.play(); });
      await page.waitForFunction(() => document.querySelector('.case-intro video').currentTime > .4);
      const media = await page.$eval('.case-intro video', video => ({ duration: video.duration, width: video.videoWidth, height: video.videoHeight, ratio: video.clientWidth / video.clientHeight, src: video.currentSrc }));
      assert.ok(media.duration >= 12, `${project.id}: complete recording`);
      assert.equal(media.width, 1280);
      assert.ok(Math.abs(media.ratio - 16 / 9) < .02, `${project.id}: responsive video ratio`);
      assert.ok(media.src.endsWith(project.videoSrc));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    }
    console.log(`${width}px: all ${targets.length} case videos play with controls and the correct ratio.`);

    await page.goto(origin, { waitUntil: 'networkidle0' });
    await page.waitForSelector('[data-depth-showcase][data-depth-ready="true"]');
    assert.equal(await page.$$eval('video[data-portfolio-video]', videos => videos.length), 0, 'No portfolio video downloads while the hero is visible');
    for (const project of targets) {
      const index = projects.indexOf(project);
      await page.evaluate(index => {
        const mobile = document.querySelector(`[data-mobile-target="project:${index}"]`);
        if (mobile) {
          const sequence = mobile.closest('[data-mobile-sequence]');
          window.scrollTo({ top: sequence.getBoundingClientRect().top + scrollY + Number(mobile.dataset.mobileMoment), behavior: 'instant' });
        } else {
          const sequence = document.querySelector('[data-home-sequence]');
          const stage = sequence.querySelector('[data-home-stage]');
          const moment = Number(document.querySelector('#projecten').dataset.homeMoment) + index * .75;
          window.scrollTo({ top: sequence.getBoundingClientRect().top + scrollY + moment / Number(sequence.dataset.homeTotal) * (sequence.offsetHeight - stage.offsetHeight), behavior: 'instant' });
        }
      }, index);
      await page.waitForFunction(index => Number(document.querySelector('[data-depth-showcase]').dataset.depthIndex) === index, {}, index);
      await page.waitForFunction(index => {
        const video = document.querySelector(`video[data-portfolio-video="${index}"]`);
        return video && !video.paused && video.currentTime > .4 && video.readyState >= 2 && video.dataset.portfolioFrameReady === 'true';
      }, {}, index);
      const others = await page.$$eval('video[data-portfolio-video]', (videos, index) => videos.filter(video => Number(video.dataset.portfolioVideo) !== index).every(video => video.paused), index);
      assert.ok(others, 'Only the visible card plays');
      const source = await page.$eval(`video[data-portfolio-video="${index}"]`, video => video.currentSrc);
      assert.ok(source.endsWith(project.videoSrc));
      const decoder = await page.$eval(`video[data-portfolio-video="${index}"]`, video => ({ hidden: video.hidden, inCanvas: video.parentElement.tagName === 'CANVAS', crossOrigin: video.crossOrigin }));
      assert.deepEqual(decoder, { hidden: false, inCanvas: false, crossOrigin: 'anonymous' }, 'The composited video decoder must allow media redirects across origins');
      await pause(500);
      // A running playback clock does not prove the WebGL card contains an image.
      const screenshot = await page.screenshot({ encoding: 'base64' });
      const brightness = await page.evaluate(async screenshot => {
        const image = new Image();
        image.src = `data:image/png;base64,${screenshot}`;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 16;
        const context = canvas.getContext('2d');
        context.drawImage(image, image.width / 2 - 40, image.height / 2 - 40, 80, 80, 0, 0, 16, 16);
        const pixels = context.getImageData(0, 0, 16, 16).data;
        let total = 0;
        for (let i = 0; i < pixels.length; i += 4) total += (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        return total / 256;
      }, screenshot);
      assert.ok(brightness > 8, `${project.id}: the rendered card must contain visible image pixels, got ${brightness}`);
      assert.deepEqual(errors, [], `${project.id}: no WebGL media security errors`);
      if (process.env.CAPTURE_PROJECT_VIDEOS) await page.screenshot({ path: `.tmp/project-refresh/home-${project.id}-${width}.png` });
    }
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    assert.ok(await page.$$eval('video[data-portfolio-video]', videos => videos.every(video => video.paused)), 'Hidden tabs pause all previews');
    await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
    const last = projects.indexOf(targets.at(-1));
    await page.waitForFunction(index => {
      const video = document.querySelector(`video[data-portfolio-video="${index}"]`);
      return !video.paused && video.dataset.portfolioFrameReady === 'true';
    }, {}, last);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await pause(800);
    assert.ok(await page.$$eval('video[data-portfolio-video]', videos => videos.every(video => video.paused)), 'Leaving the gallery pauses all videos');
    console.log(`${width}px: all ${targets.length} 3D video cards render visible frames; inactive cards, hidden tabs and offscreen media pause.`);
  }
  assert.deepEqual(errors, [], 'No browser runtime errors');
} finally {
  await browser.close();
  if (mediaServer) await new Promise(resolve => mediaServer.close(resolve));
}
