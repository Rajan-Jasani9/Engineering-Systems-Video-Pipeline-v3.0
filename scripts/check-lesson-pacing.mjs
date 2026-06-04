import fs from 'node:fs';
import path from 'node:path';

const WARN_SECONDS = 8;
const MAX_SECONDS = 12;
const videosDir = path.resolve('src/videos');

const readBeats = (lessonPlanPath) => {
  const source = fs.readFileSync(lessonPlanPath, 'utf8');
  const beats = [];
  const beatPattern = /\{\s*id:\s*'([^']+)'[\s\S]*?kind:\s*'([^']+)'[\s\S]*?start:\s*([\d.]+)[\s\S]*?end:\s*([\d.]+)/g;

  for (const match of source.matchAll(beatPattern)) {
    const [, id, kind, startRaw, endRaw] = match;
    const start = Number(startRaw);
    const end = Number(endRaw);

    if (Number.isFinite(start) && Number.isFinite(end)) {
      beats.push({id, kind, start, end, duration: end - start});
    }
  }

  return beats;
};

const readWordCount = (videoDir) => {
  const wordsPath = path.join(videoDir, 'words.json');

  if (!fs.existsSync(wordsPath)) {
    return null;
  }

  const words = JSON.parse(fs.readFileSync(wordsPath, 'utf8'));
  return Array.isArray(words) ? words.length : null;
};

const videoDirs = fs
  .readdirSync(videosDir, {withFileTypes: true})
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(videosDir, entry.name))
  .filter((videoDir) => fs.existsSync(path.join(videoDir, 'lessonPlan.ts')));

let hasError = false;

for (const videoDir of videoDirs) {
  const slug = path.basename(videoDir);
  const beats = readBeats(path.join(videoDir, 'lessonPlan.ts'));
  const wordCount = readWordCount(videoDir);
  const duration = beats.reduce((latest, beat) => Math.max(latest, beat.end), 0);
  const longBeats = beats.filter((beat) => beat.duration > WARN_SECONDS);
  const failingBeats = beats.filter((beat) => beat.duration > MAX_SECONDS);
  const recommendedMinimum = Math.ceil(duration / MAX_SECONDS);
  const typicalEightMinute = duration >= 420 && duration <= 510;

  console.log(`\n${slug}`);
  console.log(`  duration: ${duration.toFixed(2)}s`);
  console.log(`  words: ${wordCount ?? 'n/a'}`);
  console.log(`  visual scenes: ${beats.length}`);
  console.log(`  minimum scenes by ${MAX_SECONDS}s hard limit: ${recommendedMinimum}`);

  if (typicalEightMinute) {
    console.log('  7-8 min target: 40-70 scenes for roughly 8-12 major concepts');
  }

  if (longBeats.length) {
    console.log(`  scenes over ${WARN_SECONDS}s:`);
    for (const beat of longBeats) {
      const marker = beat.duration > MAX_SECONDS ? 'ERROR' : 'warn';
      console.log(`    ${marker}: ${beat.id} (${beat.kind}) ${beat.duration.toFixed(2)}s`);
    }
  }

  if (failingBeats.length) {
    hasError = true;
  }
}

if (hasError) {
  throw new Error(`Scene pacing check failed: no visual scene should exceed ${MAX_SECONDS}s.`);
}
