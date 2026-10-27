import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import { projects } from '../data/projects.mjs';

const origin = process.argv[2] ?? 'http://127.0.0.1:4173';
const targets = projects.filter(project => ['lothuus', 'welzijnswerking', 'carabus'].includes(project.id));
const browser = await puppeteer.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 390]) {
    await page.setViewport({ width, height: 900, isMobile: width < 1000, hasTouch: width < 1000 });
    for (const project of targets) {
      await page.goto(origin + project.casePath, { waitUntil: 'networkidle0' });
      assert.ok(await page.$eval('.case-intro video', video => video.controls && video.preload === 'none' && !video.autoplay));
      await page.$eval('.case-intro video', async video => { video.muted = true; await video.play(); });
      await page.waitForFunction(() => document.querySelector('.case-intro video').currentTime > .4);
      const media = await page.$eval('.case-intro video', video => ({ duration: video.duration, width: video.videoWidth, height: video.videoHeight, ratio: video.clientWidth / video.clientHeight, src: video.currentSrc }));
      assert.ok(media.duration >= 15, `${project.id}: complete recording`);
      assert.equal(media.width, 1280);
      assert.ok(Math.abs(media.ratio - 16 / 9) < .02, `${project.id}: responsive video ratio`);
      assert.ok(media.src.endsWith(project.videoSrc));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    }
    console.log(`${width}px: all three case videos play with controls and the correct ratio.`);

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
        return video && !video.paused && video.currentTime > .4 && video.readyState >= 2;
      }, {}, index);
      const others = await page.$$eval('video[data-portfolio-video]', (videos, index) => videos.filter(video => Number(video.dataset.portfolioVideo) !== index).every(video => video.paused), index);
      assert.ok(others, 'Only the visible card plays');
      const source = await page.$eval(`video[data-portfolio-video="${index}"]`, video => video.currentSrc);
      assert.ok(source.endsWith(project.videoSrc));
      await pause(500);
      if (process.env.CAPTURE_PROJECT_VIDEOS) await page.screenshot({ path: `.tmp/project-refresh/home-${project.id}-${width}.png` });
    }
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    assert.ok(await page.$$eval('video[data-portfolio-video]', videos => videos.every(video => video.paused)), 'Hidden tabs pause all previews');
    await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
    const last = projects.indexOf(targets.at(-1));
    await page.waitForFunction(index => !document.querySelector(`video[data-portfolio-video="${index}"]`).paused, {}, last);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await pause(800);
    assert.ok(await page.$$eval('video[data-portfolio-video]', videos => videos.every(video => video.paused)), 'Leaving the gallery pauses all videos');
    console.log(`${width}px: existing 3D cards play all three videos; inactive cards, hidden tabs and offscreen media pause.`);
  }
  assert.deepEqual(errors, [], 'No browser runtime errors');
} finally { await browser.close(); }
