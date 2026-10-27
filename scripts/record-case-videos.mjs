import { mkdtemp, mkdir, writeFile, rename, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer';
import ffmpegPath from 'ffmpeg-static';

const projects = [
  { name: 'hondaanzee', url: 'https://hondaanzee.be/' },
  { name: 'fabrice', url: 'https://www.fabricegoffin.be/standpunten' },
  { name: 'carabus', url: 'https://www.carabusads.com/' },
  { name: 'cozy', url: 'https://www.cozy-moments.be/' },
  { name: 'dailygrind', url: 'https://www.daily-grind.be/' },
  { name: 'vishandel', url: 'https://www.vishandelolivierenkelly.be/' },
  { name: 'atelierrembrandt', url: 'https://www.atelierrembrandt.com/' },
  { name: 'pwayment', url: 'https://pwayment.vercel.app/', heroOnly: true },
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
const seconds = 16;
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
const capture = async (page, directory, heroOnly) => {
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
    await page.evaluate(async ({ seconds, heroOnly }) => {
      document.documentElement.style.scrollBehavior = 'auto';
      const travel = Math.min(document.documentElement.scrollHeight - innerHeight, innerHeight * 2.4);
      const start = performance.now();
      await new Promise(resolve => {
        const frame = now => {
          const elapsed = (now - start) / 1000;
          const progress = Math.max(0, Math.min(1, (elapsed - 1.5) / 12));
          const eased = progress ** 3 * (progress * (progress * 6 - 15) + 10);
          if (!heroOnly) window.scrollTo({ top: travel * eased, behavior: 'instant' });
          if (elapsed < seconds) requestAnimationFrame(frame); else resolve();
        };
        requestAnimationFrame(frame);
      });
    }, { seconds, heroOnly });
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
  const moving = frames.filter(frame => frame.timestamp - frames[0].timestamp > 2 && frame.timestamp - frames[0].timestamp < 13);
  const gaps = moving.slice(1).map((frame, index) => frame.timestamp - moving[index].timestamp);
  const stats = { frames: frames.length, movingFps: (moving.length - 1) / (moving.at(-1).timestamp - moving[0].timestamp), maxMovingGap: Math.max(...gaps) };
  console.log(`Capture: ${JSON.stringify(stats)}`);
  if (!heroOnly && (stats.movingFps < 30 || stats.maxMovingGap > .5)) {
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
try {
  for (const project of selectedProjects) {
    const temp = await mkdtemp(join(tmpdir(), `webaanzee-${project.name}-`));
    const page = await browser.newPage();
    try {
      await page.setViewport(viewport);
      await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 60_000 });
      await pause(3000); // Allow canonical redirects and entrance animations to finish.
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        const consent = [...document.querySelectorAll('button, a')]
          .find(element => /alleen noodzakelijk/i.test(element.textContent ?? ''));
        if (consent instanceof HTMLElement) consent.click();
      });
      // Warm lazy images before recording so the scroll does not show blank assets.
      if (!project.heroOnly) {
        await page.evaluate(async () => {
          const travel = Math.min(document.documentElement.scrollHeight - innerHeight, innerHeight * 2.4);
          for (let y = 0; y <= travel; y += 360) {
            window.scrollTo({ top: y, behavior: 'instant' });
            await new Promise(resolve => setTimeout(resolve, 150));
          }
          window.scrollTo({ top: 0, behavior: 'instant' });
        });
      }
      await pause(2000);
      await page.mouse.move(1279, 719);
      await page.screenshot({ path: join(root, '.tmp/case-video-review', `${project.name}-start.jpg`), type: 'jpeg', quality: 90 });
      console.log(`Recording ${project.name} from ${page.url()}`);
      const stats = await capture(page, temp, project.heroOnly);
      await page.screenshot({ path: join(root, '.tmp/case-video-review', `${project.name}-end.jpg`), type: 'jpeg', quality: 90 });
      // Timestamp-aware motion interpolation fills compositor gaps instead of
      // merely duplicating low-fps frames in a nominally 60-fps container.
      await run([
        '-y', '-safe', '0', '-f', 'concat', '-i', join(temp, 'frames.ffconcat'),
        '-vf', `minterpolate=fps=${fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,tpad=stop_mode=clone:stop_duration=${seconds}`,
        '-t', String(seconds), '-c:v', 'libx264', '-preset', 'slow', '-crf', '22',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', join(temp, 'output.mp4'),
      ]);
      await rename(join(temp, 'output.mp4'), join(root, 'public/videos', `${project.name}.mp4`));
      await writeFile(join(root, '.tmp/case-video-review', `${project.name}-capture.json`), JSON.stringify({ ...stats, fps, seconds, url: page.url() }, null, 2));
      console.log(`Saved ${project.name}.mp4: ${seconds}s at ${fps} fps`);
    } finally {
      await page.close();
      await rm(temp, { recursive: true, force: true });
    }
  }
} finally {
  await browser.close();
}
