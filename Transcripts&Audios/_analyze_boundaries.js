const fs = require('fs');
const path = require('path');

const base = 'D:\\Engineering Systems\\Engineering-Systems-Video-Pipeline-v3.0';
const words = JSON.parse(fs.readFileSync(path.join(base, 'src', 'videos', 'health-checks-and-failover', 'words.json'), 'utf8'));
const transcript = fs.readFileSync(path.join(base, 'Transcripts&Audios', 'health-checks-and-failover-transcript.txt'), 'utf8');

// Parse transcript timestamps
const transcriptLines = transcript.split('\n');
const transcriptTimestamps = {};
transcriptLines.forEach(line => {
  const match = line.match(/\((\d+):(\d+)\)\s*(.*)/);
  if (match) {
    const mins = parseInt(match[1]);
    const secs = parseInt(match[2]);
    const totalSecs = mins * 60 + secs;
    transcriptTimestamps[totalSecs] = (transcriptTimestamps[totalSecs] || '') + match[3].trim() + ' ';
  }
});

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

function getWordsAround(time, windowSec) {
  const idx = findWordAt(time);
  const result = [];
  for (let i = idx; i >= 0 && time - words[i].start <= windowSec; i--) {
    result.unshift(words[i]);
  }
  for (let i = idx + 1; i < words.length && words[i].start - time <= windowSec; i++) {
    result.push(words[i]);
  }
  if (result.length === 0) {
    for (let i = 0; i < words.length; i++) {
      if (Math.abs(words[i].start - time) <= windowSec || Math.abs(words[i].end - time) <= windowSec) {
        result.push(words[i]);
      }
    }
  }
  return result;
}

function isSentenceEnd(word) {
  return /[.!?]/.test(word.text);
}

const reportLines = [];
function pr(str) { reportLines.push(str || ''); }

pr('='.repeat(120));
pr('BEAT BOUNDARY VERIFICATION REPORT: Health Checks & Failover');
pr('='.repeat(120));
pr('');
pr('Beat boundaries: ' + boundaries.join(', '));
pr('Total words in words.json: ' + words.length);
pr('Last word index: ' + words[words.length-1].i + ', end time: ' + words[words.length-1].end + 's');
pr('');

for (let b = 0; b < boundaries.length; b++) {
  const boundary = boundaries[b];
  const idx = findWordAt(boundary);
  
  pr('');
  pr('--- BOUNDARY: ' + boundary + 's (beat ' + (b+1) + ' of ' + boundaries.length + ') ---');
  
  if (idx >= 0 && idx < words.length) {
    const w = words[idx];
    const dS = Math.abs(boundary - w.start);
    const dE = Math.abs(boundary - w.end);
    
    pr('  Word at boundary: [' + w.i + '] "' + w.text + '" start=' + w.start.toFixed(3) + ' end=' + w.end.toFixed(3));
    pr('  Dist from word start: ' + dS.toFixed(3) + ', from end: ' + dE.toFixed(3));
    
    if (w.i > 0) {
      const prev = words[w.i - 1];
      pr('  Previous word: [' + prev.i + '] "' + prev.text + '" end=' + prev.end.toFixed(3));
      pr('  Gap: ' + ((w.start - prev.end) * 1000).toFixed(0) + 'ms');
      if (isSentenceEnd(prev)) pr('  ** SENTENCE END **');
    }
    if (w.i < words.length - 1) {
      const next = words[w.i + 1];
      pr('  Next word: [' + next.i + '] "' + next.text + '" start=' + next.start.toFixed(3));
    }
  }
  
  // Context words
  pr('  Words +/-2s:');
  getWordsAround(boundary, 2).forEach(w => {
    const mark = (w.start <= boundary && w.end >= boundary) ? ' <-- BOUNDARY' : '';
    pr('    [' + w.i + '] "' + w.text + '" ' + w.start.toFixed(3) + '-' + w.end.toFixed(3) + mark);
  });
  
  // Transcript
  pr('  Transcript markers near ' + boundary + 's:');
  const tss = Object.keys(transcriptTimestamps).map(Number).sort((a,b) => a-b);
  tss.filter(ts => Math.abs(ts - boundary) <= 5).forEach(ts => {
    const m = Math.floor(ts / 60), s = ts % 60;
    pr('    (' + m + ':' + String(s).padStart(2,'0') + ') ' + transcriptTimestamps[ts].trim().substring(0, 80));
  });
}

// Summary
pr('');
pr('='.repeat(120));
pr('SUMMARY');
pr('='.repeat(120));

pr('');
const lastW = words[words.length-1];
pr('Last word index: ' + lastW.i + ', text="' + lastW.text + '", end time: ' + lastW.end + 's');
pr('LessonPlan last end: 403s');
pr('Match: ' + (Math.abs(lastW.end - 403) < 0.1 ? 'YES' : 'NO (diff=' + (403 - lastW.end).toFixed(3) + 's)'));

// Transcript alignment
pr('');
pr('TRANSCRIPT vs BEAT BOUNDARIES:');
pr('');
const transcriptMarkers = [];
transcriptLines.forEach(line => {
  const match = line.match(/\((\d+):(\d+)\)\s*(.*)/);
  if (match) {
    const mins = parseInt(match[1]), secs = parseInt(match[2]);
    transcriptMarkers.push({ seconds: mins * 60 + secs, text: match[3].trim().substring(0, 80) });
  }
});

pr('  Boundary -> Closest Transcript Marker:');
for (const b of boundaries) {
  let closest = null, minDist = Infinity;
  for (const tm of transcriptMarkers) {
    const d = Math.abs(tm.seconds - b);
    if (d < minDist) { minDist = d; closest = tm; }
  }
  if (closest) {
    const m = Math.floor(closest.seconds / 60), s = closest.seconds % 60;
    const tag = minDist <= 1 ? 'OK' : (minDist <= 3 ? 'FAIR' : 'MISMATCH');
    pr('    ' + String(b).padStart(3) + 's <-> (' + m + ':' + String(s).padStart(2,'0') + ') diff=' + String(minDist).padStart(2) + 's [' + tag + '] "' + closest.text.substring(0, 60) + '"');
  }
}

// Check for misalignments where beat cuts through sentence
pr('');
pr('SENTENCE-CUT ANALYSIS:');
let cuts = 0;
for (let b = 0; b < boundaries.length; b++) {
  const boundary = boundaries[b];
  const idx = findWordAt(boundary);
  if (idx < 0 || idx >= words.length) continue;
  const w = words[idx];
  const dS = Math.abs(boundary - w.start);
  const dE = Math.abs(boundary - w.end);
  
  // Is this in the middle of a sentence? (not at word boundary)
  const atWordBoundary = dS < 0.05 || dE < 0.05;
  // Is the previous word a sentence end?
  const prevIsSentenceEnd = w.i > 0 && isSentenceEnd(words[w.i - 1]);
  // Is this word a sentence end?
  const thisIsSentenceEnd = isSentenceEnd(w);
  
  if (!atWordBoundary && !prevIsSentenceEnd && !thisIsSentenceEnd) {
    cuts++;
    const m = Math.floor(boundary / 60), s = boundary % 60;
    pr('  [' + m + ':' + String(s).padStart(2,'0') + '] Boundary ' + boundary + 's cuts through word "' + w.text + '" (idx=' + w.i + ')');
  }
}
if (cuts === 0) pr('  No boundaries cut through words (all at word boundaries or sentence ends).');
pr('  Total potential cuts: ' + cuts);

pr('');
pr('TRANSCRIPT TIMESTAMP vs WORD TIMING CROSS-CHECK:');
pr('');
// For each transcript marker, find the word at that time
for (const tm of transcriptMarkers) {
  const idx = findWordAt(tm.seconds);
  if (idx >= 0 && idx < words.length) {
    const w = words[idx];
    const diff = Math.abs(tm.seconds - w.start);
    pr('  (' + Math.floor(tm.seconds/60) + ':' + String(tm.seconds%60).padStart(2,'0') + ') word[' + w.i + ']="' + w.text + '" start=' + w.start.toFixed(3) + ' diff=' + diff.toFixed(3) + 's "' + tm.text.substring(0, 60) + '"');
  }
}

pr('');
pr('='.repeat(120));
pr('END OF REPORT');
pr('='.repeat(120));

const output = reportLines.join('\n');
console.log(output);
fs.writeFileSync(path.join(base, 'Transcripts&Audios', 'beat-boundary-analysis.txt'), output, 'utf8');
console.log('\nSaved to beat-boundary-analysis.txt');
