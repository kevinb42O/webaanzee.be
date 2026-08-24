import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');
const { render } = await import(pathToFileURL(serverEntry).href + `?v=${Date.now()}`);
const pages = ['index.html', 'privacy.html', 'klantenkaart.html', 'pwayment.html', 'blog/waarom-website-nodig-2026.html'];

for (const page of pages) {
  const target = path.join(root, 'dist', page);
  const html = await readFile(target, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error(`Missing empty root marker in ${page}`);
  const rendered = render(page);
  await writeFile(target, html.replace(marker, `<div id="root">${rendered}</div>`));
  console.log(`Prerendered ${page}`);
}
