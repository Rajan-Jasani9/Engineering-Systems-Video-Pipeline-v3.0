import fs from 'node:fs';

const words = JSON.parse(fs.readFileSync('./src/videos/health-checks-and-failover/words.json', 'utf8'));

// Find words near each boundary
const boundaries = [95, 125, 152, 162, 218, 355];
for (const b of boundaries) {
  const nearby = words.filter(w => Math.abs(w.start - b) < 1 || Math.abs(w.end - b) < 1);
  console.log('--- Boundary', b + 's ---');
  nearby.slice(0, 8).forEach(w => console.log('  word[' + w.i + '] "' + w.text + '" start=' + w.start + ' end=' + w.end));
}

// Find words at component timing points
console.log('\n=== Component timing cross-ref ===');
const points = [80, 84, 178, 188];
for (const t of points) {
  const around = words.filter(w => w.start >= t - 2 && w.start <= t + 2).slice(0, 8);
  console.log('--- Time', t + 's ---');
  around.forEach(w => console.log('  word[' + w.i + '] "' + w.text + '" start=' + w.start));
}

// Suggest new boundary values
console.log('\n=== Suggested boundary fixes ===');
for (let i = 0; i < boundaries.length; i++) {
  const b = boundaries[i];
  // Find closest word boundary (word end ±100ms)
  const candidates = words.filter(w => {
    const distFromStart = Math.abs(w.start - b);
    const distFromEnd = Math.abs(w.end - b);
    return distFromStart < 1 || distFromEnd < 1;
  });
  if (candidates.length > 0) {
    const best = candidates.reduce((a, b) => Math.abs(a.start - boundaries[i]) < Math.abs(b.start - boundaries[i]) ? a : b);
    console.log(b + 's -> closest word "' + best.text + '" starts at ' + best.start + ' ends at ' + best.end);
  }
}
