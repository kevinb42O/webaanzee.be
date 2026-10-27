import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import ffmpeg from 'ffmpeg-static';
import { projects } from '../data/projects.mjs';

const root = new URL('../public/', import.meta.url);
const decode = path => new Promise((resolve, reject) => {
  const child = spawn(ffmpeg, ['-hide_banner', '-ss', '4', '-i', path, '-t', '3', '-an', '-f', 'framemd5', '-']);
  let output = '', diagnostics = '';
  child.stdout.on('data', data => { output += data; });
  child.stderr.on('data', data => { diagnostics += data; });
  child.once('error', reject);
  child.once('exit', code => code === 0 ? resolve({ output, diagnostics }) : reject(new Error(diagnostics)));
});

for (const project of projects) {
  assert.ok(project.videoSrc, `${project.id}: missing video`);
  const { output, diagnostics } = await decode(fileURLToPath(new URL(project.videoSrc.replace(/^\//, ''), root)));
  assert.match(diagnostics, /1280x720/, `${project.id}: expected HD recording`);
  assert.match(diagnostics, /Video: h264.*yuv420p/, `${project.id}: expected browser-compatible H.264 video`);
  assert.match(diagnostics, /60 fps/, `${project.id}: expected 60 fps`);
  const hashes = output.split('\n').filter(line => /^0,/.test(line)).map(line => line.split(',').at(-1).trim());
  assert.equal(hashes.length, 180, `${project.id}: three seconds must decode to 180 frames`);
  const unique = new Set(hashes).size;
  assert.ok(unique >= 150, `${project.id}: too many repeated frames during motion (${unique}/180)`);
  console.log(`${project.id}: 1280×720, 60 fps, ${unique}/180 distinct decoded frames during motion`);
}
console.log(`All ${projects.length} portfolio projects have smooth, decodable videos.`);
