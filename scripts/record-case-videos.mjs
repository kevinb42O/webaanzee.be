import { mkdtemp, mkdir, writeFile, rename, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer';
import ffmpegPath from 'ffmpeg-static';
import { versionProjectVideos } from './version-project-videos.mjs';

const projects = [
  { name: 'hondaanzee', url: 'https://hondaanzee.be/' },
  { name: 'fabrice', url: 'https://www.fabricegoffin.be/', seconds: 48, scrollSeconds: 44, fullPage: true, steadyScroll: true, nativeFrames: true, poster: 'images/cases/schepen-digitalisering/homepage-2026-10-27.webp' },
  { name: 'carabus', url: 'https://www.carabusads.com/', seconds: 22, scrollSeconds: 16, travel: 4.5, file: 'carabus-preview.mp4' },
  { name: 'cozy', url: 'https://www.cozy-moments.be/' },
  { name: 'dailygrind', url: 'https://www.daily-grind.be/' },
  { name: 'vishandel', url: 'https://www.vishandelolivierenkelly.be/' },
  { name: 'atelierrembrandt', url: 'https://www.atelierrembrandt.com/' },
  { name: 'pwayment', url: 'https://pwayment.vercel.app/', heroOnly: true },
  { name: 'mygrowise', url: 'https://mygrowise.vercel.app/', seconds: 48, scrollSeconds: 44, travel: 15, steadyScroll: true, preloadImages: true, nativeFrames: true, image: 'images/cases/mygrowise.png', preview: 'images/cases/previews/mygrowise.jpg' },
  { name: 'welzijnswerking', url: 'https://www.welzijnswerking.be/', scrollSeconds: 9, travel: 1.8, file: 'welzijnswerking-preview.mp4' },
  { name: 'lothuus', url: 'https://www.lothuus.be/', seconds: 23, movie: true, file: 'lothuus-preview.mp4' },
];
const requestedNames = process.argv.slice(2);
const selectedProjects = requestedNames.length === 0
  ? projects
  : projects.filter(({ name }) => requestedNames.includes(name));
if (selectedProjects.length === 0 || requestedNames.some(name => !projects.some(project => project.name === name))) {
  throw new Error('Supply valid project names.');
}
const root = new URL('..', import.meta.url).pathname;
const fps = 60;
const viewport = { width: 1280, height: 720, deviceScaleFactor: 1 };
const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const run = args => new Promise((resolve, reject) => {
  const child = spawn(ffmpegPath, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  let error = '';
  child.stderr.on('data', data => { error = (error + data).slice(-3000); });
  child.once('error', reject);
  child.once('exit', code => code === 0 ? resolve() : reject(new Error(error)));
});

// Capture real compositor frames with their timestamps. A screenshot loop advances
// scroll independently of website animations and used to produce only 12 fps.
const capture = async (page, directory, project) => {
  const { heroOnly = false, movie = false, seconds = 16, scrollSeconds = 12, travel = 2.4 } = project;
  const client = await page.createCDPSession();
  const initial = await client.send('Page.captureScreenshot', { format: 'jpeg', quality: 92 });
  const frames = [{ timestamp: Date.now() / 1000, data: Buffer.from(initial.data, 'base64') }];
  const onFrame = event => {
    if (event.metadata.timestamp > frames.at(-1).timestamp) {
      frames.push({ timestamp: event.metadata.timestamp, data: Buffer.from(event.data, 'base64') });
    }
    void client.send('Page.screencastFrameAck', { sessionId: event.sessionId }).catch(() => {});
  };
  client.on('Page.screencastFrame', onFrame);
  try {
    await client.send('Page.startScreencast', { format: 'jpeg', quality: 92, everyNthFrame: 1 });
    await page.evaluate(async ({ seconds, heroOnly, movie, scrollSeconds, travelScreens, steadyScroll, fullPage }) => {
      document.documentElement.style.scrollBehavior = 'auto';
      const available = document.documentElement.scrollHeight - innerHeight;
      const travel = fullPage ? available : Math.min(available, innerHeight * travelScreens);
      if (movie) await document.querySelector('.house-entry-movie').play();
      const start = performance.now();
      await new Promise(resolve => {
        const frame = now => {
          const elapsed = (now - start) / 1000;
          const progress = Math.max(0, Math.min(1, (elapsed - 1.5) / scrollSeconds));
          // Long tours keep a steady reading pace, with brief gentle ramps at
          // either end instead of accelerating through the middle sections.
          const ramp = .08;
          const eased = steadyScroll
            ? (progress < ramp ? progress ** 2 / (2 * ramp)
              : progress > 1 - ramp ? 1 - ramp - (1 - progress) ** 2 / (2 * ramp)
                : progress - ramp / 2) / (1 - ramp)
            : progress ** 3 * (progress * (progress * 6 - 15) + 10);
          if (!heroOnly && !movie) window.scrollTo({ top: travel * eased, behavior: 'instant' });
          if (elapsed < seconds) requestAnimationFrame(frame); else resolve();
        };
        requestAnimationFrame(frame);
      });
    }, { seconds, heroOnly, movie, scrollSeconds, travelScreens: travel, steadyScroll: project.steadyScroll, fullPage: project.fullPage });
    if (project.fullPage && !await page.evaluate(() => {
      const footer = document.querySelector('footer');
      return document.documentElement.scrollHeight - innerHeight - scrollY <= 2
        && footer && footer.getBoundingClientRect().top < innerHeight;
    })) throw new Error(`${project.name}: the recording did not reach the footer.`);
    if (movie && !await page.$eval('.house-entry-experience', node => node.classList.contains('house-entry-arrived'))) {
      throw new Error('LOTHUUS did not reach the collection.');
    }
    await client.send('Page.stopScreencast');
    const final = await client.send('Page.captureScreenshot', { format: 'jpeg', quality: 92 });
    const end = Math.max(Date.now() / 1000, frames.at(-1).timestamp + 1 / fps);
    // Static pages emit no compositor frames while holding. Explicit endpoints
    // retain those holds and give the interpolator its final lookahead frames.
    for (let index = 0; index < 3; index++) {
      frames.push({ timestamp: end + index / fps, data: Buffer.from(final.data, 'base64') });
    }
  } finally {
    client.off('Page.screencastFrame', onFrame);
    await client.detach();
  }
  if (frames.length < 2) throw new Error('No moving frames captured.');
  const manifest = ['ffconcat version 1.0'];
  for (let index = 0; index < frames.length; index++) {
    const filename = `frame-${String(index).padStart(5, '0')}.jpg`;
    await writeFile(join(directory, filename), frames[index].data);
    manifest.push(`file '${filename}'`, 'option framerate 1000');
    const duration = index + 1 < frames.length
      ? frames[index + 1].timestamp - frames[index].timestamp
      : 1 / fps;
    manifest.push(`duration ${duration.toFixed(6)}`);
  }
  manifest.push(`file 'frame-${String(frames.length - 1).padStart(5, '0')}.jpg'`, 'option framerate 1000');
  await writeFile(join(directory, 'frames.ffconcat'), manifest.join('\n'));
  const moving = frames.filter(frame => frame.timestamp - frames[0].timestamp > 2 && frame.timestamp - frames[0].timestamp < Math.min(seconds - 2.5, scrollSeconds + 1));
  const gaps = moving.slice(1).map((frame, index) => frame.timestamp - moving[index].timestamp);
  const stats = { frames: frames.length, movingFps: moving.length > 1 ? (moving.length - 1) / (moving.at(-1).timestamp - moving[0].timestamp) : 0, maxMovingGap: gaps.length ? Math.max(...gaps) : Infinity };
  console.log(`Capture: ${JSON.stringify(stats)}`);
  if (!heroOnly && !movie && (stats.movingFps < 30 || stats.maxMovingGap > .5)) {
    throw new Error('Capture cadence is too low; keep the existing video and retry.');
  }
  return stats;
};
const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--mute-audio'],
});
await mkdir(join(root, '.tmp', 'case-video-review'), { recursive: true });
const encodings = new Set();
const encodingErrors = [];
try {
  for (const project of selectedProjects) {
    if (encodingErrors.length) throw encodingErrors[0];
    const temp = await mkdtemp(join(tmpdir(), `webaanzee-${project.name}-`));
    const page = await browser.newPage();
    const seconds = project.seconds ?? 16;
    let queued = false;
    try {
      await page.setViewport(viewport);
      const response = await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 60_000 });
      if (!response.ok()) throw new Error(`${project.name}: HTTP ${response.status()}`);
      await pause(3000); // Allow canonical redirects and entrance animations to finish.
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        const consent = [...document.querySelectorAll('button, a')]
          .find(element => /alleen noodzakelijk/i.test(element.textContent ?? ''));
        if (consent instanceof HTMLElement) consent.click();
      });
      // Warm lazy images before recording so the scroll does not show blank assets.
      if (project.movie) {
        await page.waitForSelector('.house-entry-stage.is-ready');
        await page.$eval('.house-entry-movie', video => { video.pause(); video.currentTime = 0; });
        await page.waitForFunction(() => document.querySelector('.house-entry-movie')?.readyState >= 2);
      } else if (project.preloadImages) {
        // Load images without advancing one-way scroll scenes before filming.
        await page.evaluate(() => Promise.all([...document.images].map(image => {
          image.loading = 'eager';
          return image.decode().catch(() => {});
        })));
        // A cold load may choose the site's static fallback while images load.
        // Reload from the warm cache to capture the complete animated opening.
        await page.reload({ waitUntil: 'networkidle2', timeout: 60_000 });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForSelector('.hero-enhanced', { timeout: 10_000 });
      } else if (!project.heroOnly) {
        await page.evaluate(async ({ travelScreens, fullPage }) => {
          const available = document.documentElement.scrollHeight - innerHeight;
          const travel = fullPage ? available : Math.min(available, innerHeight * travelScreens);
          for (let y = 0; y <= travel; y += 360) {
            window.scrollTo({ top: y, behavior: 'instant' });
            await new Promise(resolve => setTimeout(resolve, fullPage ? 300 : 150));
          }
          if (fullPage) await new Promise(resolve => setTimeout(resolve, 2000));
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, { travelScreens: project.travel ?? 2.4, fullPage: project.fullPage });
      }
      await pause(2000);
      if (project.poster) await page.screenshot({ path: join(temp, 'poster.webp'), type: 'webp', quality: 90 });
      await page.mouse.move(1279, 719);
      // Keep the viewport intact: a clipped capture can resize it temporarily
      // and make responsive scroll experiences switch to their static layout.
      if (project.image) await page.screenshot({ path: join(temp, 'homepage.png') });
      await page.screenshot({ path: join(root, '.tmp/case-video-review', `${project.name}-start.jpg`), type: 'jpeg', quality: 90 });
      console.log(`Recording ${project.name} from ${page.url()}`);
      const stats = await capture(page, temp, project);
      await page.screenshot({ path: join(root, '.tmp/case-video-review', `${project.name}-end.jpg`), type: 'jpeg', quality: 90 });
      const url = page.url();
      // Timestamp-aware motion interpolation fills compositor gaps instead of
      // merely duplicating low-fps frames in a nominally 60-fps container.
      const encode = async () => {
        // Near-native 60-fps captures can retain the website's original frames,
        // avoiding optical-flow artifacts around text and the opening portal.
        if (project.nativeFrames && stats.movingFps < 50) throw new Error('Native-frame encoding needs at least 50 captured fps.');
        const frameFilter = project.nativeFrames ? `fps=${fps}`
          : `minterpolate=fps=${fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:search_param=16:vsbmc=1`;
        await run([
          '-y', '-safe', '0', '-f', 'concat', '-i', join(temp, 'frames.ffconcat'),
          '-vf', `${frameFilter},tpad=stop_mode=clone:stop_duration=${seconds}`,
          '-t', String(seconds), '-c:v', 'libx264', '-preset', 'slow', '-crf', '22',
          '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', join(temp, 'output.mp4'),
        ]);
        await rename(join(temp, 'output.mp4'), join(root, 'public/videos', project.file ?? `${project.name}.mp4`));
        if (project.poster) await rename(join(temp, 'poster.webp'), join(root, 'public', project.poster));
        if (project.image) {
          if (project.preview) {
            await run(['-y', '-i', join(temp, 'homepage.png'), '-vf', 'scale=800:451', '-q:v', '2', '-frames:v', '1', join(temp, 'preview.jpg')]);
            await rename(join(temp, 'preview.jpg'), join(root, 'public', project.preview));
          }
          await run(['-y', '-i', join(temp, 'homepage.png'), '-vf', 'scale=1276:720', '-frames:v', '1', join(temp, 'image.png')]);
          await rename(join(temp, 'image.png'), join(root, 'public', project.image));
        }
        await writeFile(join(root, '.tmp/case-video-review', `${project.name}-capture.json`), JSON.stringify({ ...stats, fps, seconds, url }, null, 2));
        console.log(`Saved ${project.file ?? `${project.name}.mp4`}: ${seconds}s at ${fps} fps`);
      };
      const task = encode().catch(error => encodingErrors.push(error)).finally(async () => {
        await rm(temp, { recursive: true, force: true });
        encodings.delete(task);
      });
      queued = true;
      encodings.add(task);
    } finally {
      await page.close();
      if (!queued) await rm(temp, { recursive: true, force: true });
    }
    if (encodings.size >= 2) await Promise.race(encodings);
  }
} finally {
  await browser.close();
  await Promise.all(encodings);
}
if (encodingErrors.length) throw encodingErrors[0];
await versionProjectVideos();
