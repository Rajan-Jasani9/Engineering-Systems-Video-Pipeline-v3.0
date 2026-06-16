const fs = require('fs');
const path = require('path');
const base = 'D:\\Engineering Systems\\Engineering-Systems-Video-Pipeline-v3.0';
const words = JSON.parse(fs.readFileSync(path.join(base, 'src', 'videos', 'health-checks-and-failover', 'words.json'), 'utf8'));

const boundaries = [0, 8, 18, 28, 36, 48, 60, 72, 84, 95, 105, 115, 125, 140, 152, 162, 172, 182, 195, 205, 218, 232, 245, 255, 268, 278, 290, 302, 312, 328, 342, 355, 370, 378, 390, 403];

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

function isSentenceEnd(w) { return /[.!?]/.test(w.text); }

console.log('PRECISION ANALYSIS: Distance of each boundary from nearest word boundary');
console.log('');
let exact = 0, good = 0, fair = 0, misaligned = 0;
for (const b of boundaries) {
  const idx = findWordAt(b);
  if (idx < 0 || idx >= words.length) continue;
  const w = words[idx];
  const dS = Math.abs(b - w.start);
  const dE = Math.abs(b - w.end);
  const minDist = Math.min(dS, dE);
  const atStart = dS < 0.05;
  const atEnd = dE < 0.05;
  
  let prevEndsSentence = w.i > 0 && isSentenceEnd(words[w.i-1]);
  let thisEndsSentence = isSentenceEnd(w);
  
  let assess;
  if (atStart || atEnd) {
    assess = 'EXACT';
    exact++;
  } else if (prevEndsSentence || thisEndsSentence) {
    assess = 'GOOD (sentence)';
    good++;
  } else if (minDist < 0.15) {
    assess = 'FAIR';
    fair++;
  } else {
    assess = 'MISALIGNED';
    misaligned++;
  }
  
  const atType = atStart ? '@word-start' : atEnd ? '@word-end' : 'mid-word';
  const sent = prevEndsSentence ? 'prev-sent-end' : thisEndsSentence ? 'this-sent-end' : '-';
  const wordCtx = [];
  for (let i = Math.max(0, idx-1); i <= Math.min(words.length-1, idx+1); i++) {
    wordCtx.push(words[i].text);
  }
  
  console.log(
    String(b).padStart(3) + 's  ' + atType.padEnd(11) + 
    ' dist=' + minDist.toFixed(3) + 's  ' + sent.padEnd(14) + 
    assess.padEnd(18) + ' context: ' + wordCtx.join(' ')
  );
}

console.log('');
console.log('Summary: EXACT=' + exact + ' GOOD(sentence)=' + good + ' FAIR=' + fair + ' MISALIGNED=' + misaligned);
console.log('Total boundaries: ' + boundaries.length);

// Overlap check
console.log('');
console.log('CONSECUTIVE WORD GAP ANALYSIS:');
let gaps300 = 0, gaps500 = 0;
for (let i = 1; i < words.length; i++) {
  const gap = words[i].start - words[i-1].end;
  if (gap >= 0.3 && gap < 0.5) gaps300++;
  if (gap >= 0.5) gaps500++;
}
console.log('Gaps 300-499ms: ' + gaps300);
console.log('Gaps 500ms+: ' + gaps500);

// Check word time monotonicity
let badOrder = 0;
for (let i = 1; i < words.length; i++) {
  if (words[i].start < words[i-1].start || words[i].end < words[i-1].end) {
    badOrder++;
  }
}
console.log('Out-of-order word timestamps: ' + badOrder);
