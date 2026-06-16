const fs = require('fs');
const path = require('path');
const base = 'D:\\Engineering Systems\\Engineering-Systems-Video-Pipeline-v3.0';
const words = JSON.parse(fs.readFileSync(path.join(base, 'src', 'videos', 'health-checks-and-failover', 'words.json'), 'utf8'));

function findWordAt(time) {
  let lo = 0, hi = words.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (time >= words[mid].start && time <= words[mid].end) return mid;
    if (time < words[mid].start) hi = mid - 1;
    else lo = mid + 1;
  }
  if (hi < 0) return 0;
  if (lo >= words.length) return words.length - 1;
  const d1 = Math.abs(time - words[hi].end);
  const d2 = Math.abs(time - words[lo].start);
  return d1 <= d2 ? hi : lo;
}

const mis = [95, 125, 152, 162, 218, 355];
for (const b of mis) {
  const idx = findWordAt(b);
  console.log('=== Boundary ' + b + 's ===');
  const start = Math.max(0, idx - 5);
  const end = Math.min(words.length - 1, idx + 5);
  for (let i = start; i <= end; i++) {
    const inBound = words[i].start <= b && words[i].end >= b;
    let mark = '';
    if (inBound) {
      const dS = Math.abs(b - words[i].start);
      const dE = Math.abs(b - words[i].end);
      mark = ' <<< BOUNDARY (distStart=' + dS.toFixed(3) + ', distEnd=' + dE.toFixed(3) + ')';
    }
    console.log('  [' + words[i].i + '] name=' + words[i].text + ' ' + words[i].start.toFixed(3) + '-' + words[i].end.toFixed(3) + mark);
  }
  console.log('');
}
