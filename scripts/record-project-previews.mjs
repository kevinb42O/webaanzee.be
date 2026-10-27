import puppeteer from 'puppeteer';
import ffmpegPath from 'ffmpeg-static';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

// Record the rendered website, including its DOM/canvas transition after the source movie.
const scenes = [
  { id: 'lothuus', url: 'https://www.lothuus.be/', seconds: 23, movie: true },
  { id: 'welzijnswerking', url: 'https://www.welzijnswerking.be/', seconds: 16, scrollSeconds: 9, travel: 1.8 },
  { id: 'carabus', url: 'https://www.carabusads.com/', seconds: 22, scrollSeconds: 16, travel: 4.5 },
];
const selected = process.argv.slice(2);
const root = new URL('..', import.meta.url).pathname;
const run = (args) => new Promise((resolve, reject) => {
  const child = spawn(ffmpegPath, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  let error = '';
  child.stderr.on('data', data => { error = (error + data).slice(-2000); });
  child.once('error', reject);
  child.once('exit', code => code === 0 ? resolve() : reject(new Error(error)));
});
const browser = await puppeteer.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args: ['--no-sandbox', '--mute-audio'] });
try {
  for (const scene of scenes.filter(scene => !selected.length || selected.includes(scene.id))) {
    const temp = await mkdtemp(join(tmpdir(), 'webaanzee-preview-'));
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
      await page.goto(scene.url, { waitUntil: 'networkidle2', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      if (scene.movie) {
        await page.waitForSelector('.house-entry-stage.is-ready');
        await page.$eval('.house-entry-movie', video => { video.pause(); video.currentTime = 0; });
        await page.waitForFunction(() => document.querySelector('.house-entry-movie')?.readyState >= 2);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1800));
      }
      await page.mouse.move(1279, 719);
      await page.screenshot({ path: join(root, 'public/images/cases', `${scene.id}-intro.jpg`), type: 'jpeg', quality: 88 });
      console.log(`Recording ${scene.id}: ${scene.seconds}s`);
      const recorder = await page.screencast({ path: join(temp, 'recording.webm'), ffmpegPath, fps: 30, quality: 24 });
      if (scene.movie) {
        await page.$eval('.house-entry-movie', video => video.play());
        await new Promise(resolve => setTimeout(resolve, scene.seconds * 1000));
        const arrived = await page.$eval('.house-entry-experience', node => node.classList.contains('house-entry-arrived'));
        if (!arrived) throw new Error('LOTHUUS recording did not reach the collection grid.');
      } else {
        await page.evaluate(async ({ seconds, scrollSeconds, travel }) => {
          const start = performance.now();
          await new Promise(resolve => {
            const frame = now => {
              const elapsed = (now - start) / 1000;
              const progress = Math.max(0, Math.min(1, (elapsed - 2.5) / scrollSeconds));
              const eased = progress * progress * (3 - 2 * progress);
              window.scrollTo({ top: innerHeight * travel * eased, behavior: 'instant' });
              if (elapsed < seconds) requestAnimationFrame(frame); else resolve();
            };
            requestAnimationFrame(frame);
          });
        }, scene);
      }
      await recorder.stop();
      await page.screenshot({ path: join(root, '.tmp/project-refresh', `${scene.id}-recording-end.png`) });
      await run(['-y', '-i', join(temp, 'recording.webm'), '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', join(root, 'public/videos', `${scene.id}-preview.mp4`)]);
      console.log(`Saved ${scene.id}-preview.mp4; final state captured for review.`);
    } finally {
      await page.close();
      await rm(temp, { recursive: true, force: true });
    }
  }
} finally { await browser.close(); }
