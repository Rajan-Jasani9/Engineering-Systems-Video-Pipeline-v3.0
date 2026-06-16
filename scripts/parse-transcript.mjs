import fs from 'node:fs';
import path from 'node:path';

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  throw new Error('Usage: node scripts/parse-transcript.mjs <transcript.txt> <output.json>');
}

const text = fs.readFileSync(inputFile, 'utf8').trim();

// Find all timestamp matches with their positions
const regex = /\((\d+):(\d+)\)/g;
const timestamps = [];
let match;
while ((match = regex.exec(text)) !== null) {
  const minutes = parseInt(match[1], 10);
  const seconds = parseInt(match[2], 10);
  timestamps.push({
    time: minutes * 60 + seconds,
    index: match.index,
    endIndex: regex.lastIndex,
  });
}

// Build segments: for each timestamp, text goes from end of timestamp marker to next timestamp marker
const segments = [];
for (let i = 0; i < timestamps.length; i++) {
  const ts = timestamps[i];
  const nextTs = timestamps[i + 1];
  const segEnd = nextTs ? nextTs.index : text.length;
  const segmentText = text.substring(ts.endIndex, segEnd).trim();
  if (segmentText.length > 0) {
    segments.push({
      start: ts.time,
      text: segmentText,
    });
  }
}

// Build words with interpolated timings
const words = [];
let globalIndex = 0;

for (let i = 0; i < segments.length; i++) {
  const segment = segments[i];
  const nextStart = i < segments.length - 1 ? segments[i + 1].start : segment.start + 3;
  const duration = Math.max(nextStart - segment.start, 0.3);

  // Split into tokens
  const tokens = segment.text.split(/\s+/).filter(t => t.length > 0);
  if (tokens.length === 0) continue;

  const wordDuration = duration / tokens.length;

  tokens.forEach((token, tokenIndex) => {
    const wordStart = segment.start + wordDuration * tokenIndex;
    const wordEnd = wordStart + wordDuration;
    words.push({
      i: globalIndex++,
      text: token,
      start: Number(wordStart.toFixed(3)),
      end: Number(wordEnd.toFixed(3)),
    });
  });
}

const filtered = words.filter(w => w.text.length > 0);

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(filtered, null, 2));

console.log(`Extracted ${filtered.length} words to ${outputFile}`);
console.log(`Last word ends at ${filtered[filtered.length - 1].end}s`);
