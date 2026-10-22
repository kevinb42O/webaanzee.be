// Prepare transparent production exports from the ImageGen master.
// Letterforms and sculptural emblem are generated imagery, not redrawn here.
import puppeteer from 'puppeteer';
import { readFile, writeFile } from 'node:fs/promises';
const source = await readFile(new URL('../public/wordmark-source.png', import.meta.url));
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  const exports = await page.evaluate(async (sourceUrl) => {
    const image = new Image(); image.src = sourceUrl; await image.decode();
    const master = document.createElement('canvas');
    master.width = image.width; master.height = image.height;
    const context = master.getContext('2d'); context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, image.width, image.height);
    const original = pixels.data;
    const result = {};
    for (const [name, ink] of [['wordmark.png', [245,242,235]], ['wordmark-dark.png', [23,24,21]]]) {
      const output = document.createElement('canvas'); output.width = 1823; output.height = 220;
      const outputContext = output.getContext('2d');
      const rgba = outputContext.createImageData(output.width, output.height);
      for (let y = 0; y < output.height; y++) for (let x = 0; x < output.width; x++) {
        const sx = x + 181, sy = y + 248;
        const from = (sy * image.width + sx) * 4, to = (y * output.width + x) * 4;
        const r = original[from], g = original[from + 1], b = original[from + 2];
        if (Math.max(r,g,b) < 16) continue;
        if (sx >= 685) {
          // The neutral lettering becomes the selected flat ink; luminance is alpha.
          const alpha = Math.max(0, Math.min(1, (Math.max(r,g,b) - 8) / 234));
          rgba.data.set([...ink, Math.round(alpha * 255)], to);
        } else {
          // Remove only the black matte, preserving the emblem's coral tonal folds.
          let localRed = r;
          for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
            const nearby = ((sy + dy) * image.width + sx + dx) * 4;
            localRed = Math.max(localRed, original[nearby]);
          }
          const alpha = Math.max(0, Math.min(1, (r - 5) / Math.max(1, localRed - 5)));
          if (alpha < .04) continue;
          rgba.data.set([Math.min(255,r / alpha), Math.min(255,g / alpha), Math.min(255,b / alpha), Math.round(alpha * 255)], to);
        }
      }
      outputContext.putImageData(rgba, 0, 0);
      result[name] = output.toDataURL('image/png').split(',')[1];
      if (name === 'wordmark.png') {
        const symbol = document.createElement('canvas'); symbol.width = 502; symbol.height = 202;
        symbol.getContext('2d').drawImage(output, 0, 16, 502, 202, 0, 0, 502, 202);
        result['brand-symbol.png'] = symbol.toDataURL('image/png').split(',')[1];
      }
    }
    return result;
  }, `data:image/png;base64,${source.toString('base64')}`);
  for (const [name, encoded] of Object.entries(exports)) await writeFile(new URL(`../public/${name}`, import.meta.url), Buffer.from(encoded, 'base64'));
} finally {
  await browser.close();
}
