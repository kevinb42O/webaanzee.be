// Preserve the original command while using the same 60-fps capture, movie
// handling and content-versioned URLs as every other portfolio recording.
if (process.argv.length === 2) process.argv.push('lothuus', 'welzijnswerking', 'carabus');
await import('./record-case-videos.mjs');
