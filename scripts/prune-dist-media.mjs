import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const obsolete = [
  'videos/seascape.mp4',
  'videos/seascape-hero-hq.mp4',
  'videos/seascape-optimized.mp4',
  'videos/dashboard.mp4',
  'videos/dashboard.mov',
  'videos/spaarkaart.mp4',
  'videos/spaarkaart.mov',
  'videos/ocean-sunset-final.mp4'
];
for (const relative of obsolete) await rm(path.join(root, 'dist', relative), { force: true });
console.log(`Removed ${obsolete.length} unused source-media files from the deployment output.`);
