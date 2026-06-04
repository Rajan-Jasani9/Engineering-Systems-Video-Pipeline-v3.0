import fs from 'node:fs';
import path from 'node:path';

const [inputFile, outputFile] = process.argv.slice(2);

if (!inputFile || !outputFile) {
  throw new Error('Usage: node scripts/extract-words.mjs <timing-json-or-srt> <output-json>');
}

const input = fs.readFileSync(inputFile, 'utf8').trim();

const parseSrtTime = (value) => {
  const match = value.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
  if (!match) {
    return null;
  }

  const [, hours, minutes, seconds, millis] = match.map(Number);
  return hours * 3600 + minutes * 60 + seconds + millis / 1000;
};

const pushWord = (words, text, start, end, i) => {
  const cleaned = text.trim();
  if (!cleaned) {
    return;
  }

  words.push({
    i,
    text: cleaned,
    start: Number(start.toFixed(3)),
    end: Number(end.toFixed(3)),
  });
};

const extractFromSlideJson = (json) => {
  const byIndex = new Map();

  for (const slide of json.slides ?? []) {
    const slideStart = Number(slide.start_ms ?? 0);

    for (const binding of Object.values(slide.bindings ?? {})) {
      for (const token of binding.tokens ?? []) {
        const i = Number(token.i);
        const start = (slideStart + Number(token.start_ms ?? 0)) / 1000;
        const end = (slideStart + Number(token.end_ms ?? 0)) / 1000;
        const candidate = {
          i,
          text: String(token.word ?? ''),
          start: Number(start.toFixed(3)),
          end: Number(end.toFixed(3)),
        };

        const previous = byIndex.get(i);
        if (!previous || candidate.start < previous.start) {
          byIndex.set(i, candidate);
        }
      }
    }
  }

  return [...byIndex.values()].sort((a, b) => a.start - b.start || a.i - b.i);
};

const extractFromSrt = (srt) => {
  const blocks = srt.split(/\r?\n\r?\n/);
  const words = [];
  let index = 0;

  for (const block of blocks) {
    const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const timingLine = lines.find((line) => line.includes('-->'));
    if (!timingLine) {
      continue;
    }

    const [startRaw, endRaw] = timingLine.split('-->').map((part) => part.trim());
    const start = parseSrtTime(startRaw);
    const end = parseSrtTime(endRaw);
    const text = lines.slice(lines.indexOf(timingLine) + 1).join(' ');
    const tokens = text.split(/\s+/).filter(Boolean);

    if (start === null || end === null || tokens.length === 0) {
      continue;
    }

    const duration = Math.max(end - start, 0.05);
    tokens.forEach((token, tokenIndex) => {
      const tokenStart = start + (duration * tokenIndex) / tokens.length;
      const tokenEnd = start + (duration * (tokenIndex + 1)) / tokens.length;
      pushWord(words, token, tokenStart, tokenEnd, index++);
    });
  }

  return words;
};

let words;
try {
  const json = JSON.parse(input);
  words = Array.isArray(json.words) ? json.words : extractFromSlideJson(json);
} catch {
  words = extractFromSrt(input);
}

if (!words.length) {
  throw new Error(`No words could be extracted from ${inputFile}`);
}

const normalized = words
  .map((word, i) => ({
    i: Number.isFinite(word.i) ? Number(word.i) : i,
    text: String(word.text ?? word.word ?? ''),
    start: Number(word.start),
    end: Number(word.end),
  }))
  .filter((word) => word.text && Number.isFinite(word.start) && Number.isFinite(word.end))
  .sort((a, b) => a.start - b.start || a.i - b.i);

const mergedHyphenated = [];
for (const word of normalized) {
  const previous = mergedHyphenated[mergedHyphenated.length - 1];
  if (previous && word.text.startsWith('-')) {
    previous.text = `${previous.text}${word.text}`;
    previous.end = word.end;
    continue;
  }

  mergedHyphenated.push({...word, i: mergedHyphenated.length});
}

fs.mkdirSync(path.dirname(outputFile), {recursive: true});
fs.writeFileSync(outputFile, `${JSON.stringify(mergedHyphenated, null, 2)}\n`);

console.log(`Extracted ${mergedHyphenated.length} words to ${outputFile}`);
