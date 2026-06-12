import fs from "node:fs";

const input = fs.readFileSync("../Transcripts&Audios/Health Checks and Failover.srt", "utf8");

function timeToSeconds(value) {
  const match = value.match(/(\d+):(\d+):(\d+),(\d+)/);
  if (!match) return 0;
  const [, h, m, s, ms] = match.map(Number);
  return h * 3600 + m * 60 + s + ms / 1000;
}

const entries = input
  .trim()
  .split(/\r?\n\r?\n/)
  .map((block) => {
    const lines = block.split(/\r?\n/);
    const timing = lines.find((line) => line.includes("-->"));
    if (!timing) return null;
    const [startRaw, endRaw] = timing.split("-->").map((part) => part.trim());
    const text = lines.slice(lines.indexOf(timing) + 1).join(" ").replace(/\s+/g, " ").trim();
    return { start: timeToSeconds(startRaw), end: timeToSeconds(endRaw), text };
  })
  .filter(Boolean);

const words = [];
const captionGroups = [];
const cleanWord = (word) => word.replace(/[^\w'%-]+/g, "");

entries.forEach((entry) => {
  const rawWords = entry.text.split(/\s+/).filter(Boolean);
  const duration = Math.max(0.001, entry.end - entry.start);
  const weights = rawWords.map((word) => Math.max(0.75, cleanWord(word).length / 5));
  const totalWeight = weights.reduce((sum, value) => sum + value, 0);
  let cursor = entry.start;
  const timedWords = rawWords.map((word, index) => {
    const wordDuration = index === rawWords.length - 1 ? entry.end - cursor : (duration * weights[index]) / totalWeight;
    const start = cursor;
    const end = index === rawWords.length - 1 ? entry.end : Math.min(entry.end, cursor + wordDuration);
    cursor = end;
    const item = { word, start: +start.toFixed(3), end: +end.toFixed(3) };
    words.push(item);
    return item;
  });

  for (let i = 0; i < timedWords.length; i += 5) {
    const slice = timedWords.slice(i, i + 5);
    captionGroups.push({
      start: slice[0].start,
      end: slice[slice.length - 1].end,
      words: slice,
    });
  }
});

const output = `window.TRANSCRIPT_DATA = ${JSON.stringify({ entries, words, captionGroups }, null, 2)};\n`;
fs.writeFileSync("src/transcript-data.js", output);
fs.copyFileSync("../Transcripts&Audios/Health Checks and Failover.srt", "transcript.srt");

console.log(`Generated ${words.length} timed words and ${captionGroups.length} caption groups.`);
