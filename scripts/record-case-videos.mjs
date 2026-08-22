import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer';
import ffmpegPath from 'ffmpeg-static';

const projects = [
  { name: 'hondaanzee', url: 'https://www.hondaanzee.be/' },
  { name: 'fabrice', url: 'https://www.fabricegoffin.be/' },
  { name: 'carabus', url: 'https://www.carabusads.be/' },
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

if (selectedProjects.length === 0) {
  throw new Error('No matching project names were supplied.');
}

const root = new URL('..', import.meta.url).pathname;
const fps = 12;
const seconds = 12;
const frames = fps * seconds;
const viewport = { width: 1280, height: 720, deviceScaleFactor: 1 };

const run = (command, args) => new Promise((resolve, reject) => {
  const child = spawn(command, args, { stdio: 'ignore' });
  child.once('error', reject);
  child.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
});

const capture = async (page, directory, heroOnly = false) => {
  const maxScroll = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - window.innerHeight));
  const travel = Math.min(maxScroll, viewport.height * 2.4);

  for (let frame = 0; frame < frames; frame += 1) {
    if (!heroOnly) {
      const progress = frame / (frames - 1);
      // A slow eased movement produces a calm, legible preview rather than a frantic screen recording.
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - ((-2 * progress + 2) ** 2) / 2;
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), travel * eased);
    }
    await page.screenshot({ path: join(directory, `frame-${String(frame).padStart(3, '0')}.jpg`), type: 'jpeg', quality: 78 });
    if (heroOnly) await new Promise((resolve) => setTimeout(resolve, 1000 / fps));
  }
};

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--mute-audio'],
});

try {
  for (const project of selectedProjects) {
    const temp = await mkdtemp(join(tmpdir(), `webaanzee-${project.name}-`));
    const output = join(root, 'public', 'videos', `${project.name}.mp4`);
    const page = await browser.newPage();
    await page.setViewport(viewport);

    try {
      await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 60_000 });
      await page.evaluate(() => {
        const consent = [...document.querySelectorAll('button, a')]
          .find((element) => /alleen noodzakelijk/i.test(element.textContent ?? ''));
        if (consent instanceof HTMLElement) consent.click();
      });
      await page.evaluate(() => window.scrollTo(0, 0));
      await new Promise((resolve) => setTimeout(resolve, 1_500));
      if (project.heroOnly) {
        await page.screenshot({ path: join(root, 'public', 'images', 'cases', `${project.name}.png`), type: 'png' });
      }
      await capture(page, temp, project.heroOnly);
      await run(ffmpegPath, [
        '-y', '-framerate', String(fps), '-i', join(temp, 'frame-%03d.jpg'),
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart', '-an', output,
      ]);
      console.log(`Recorded ${project.name}: ${seconds}s → ${output}`);
    } finally {
      await page.close();
      await rm(temp, { recursive: true, force: true });
    }
  }
} finally {
  await browser.close();
}
