import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

// A new URL for new bytes prevents an open player from mixing cached MP4
// metadata/ranges with a replacement recording at the same public filename.
export async function versionProjectVideos() {
  const registry = new URL('../data/projects.mjs', import.meta.url);
  const source = await readFile(registry, 'utf8');
  const pattern = /"(\/videos\/[^"?]+\.mp4)(?:\?v=[^"]+)?"/g;
  const paths = [...new Set([...source.matchAll(pattern)].map(match => match[1]))];
  const versions = new Map(await Promise.all(paths.map(async path => {
    const bytes = await readFile(new URL(`../public${path}`, import.meta.url));
    return [path, createHash('sha256').update(bytes).digest('hex').slice(0, 12)];
  })));
  const updated = source.replace(pattern, (_, path) => `"${path}?v=${versions.get(path)}"`);
  if (updated !== source) await writeFile(registry, updated);
  console.log(`Versioned ${versions.size} project videos by their file contents.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) await versionProjectVideos();
