import type {TimedWordChunk, WordTiming} from '../types';

export type ChunkOptions = {
  maxWords?: number;
  minWords?: number;
  maxChars?: number;
  silenceGapSeconds?: number;
};

const TERMINAL_PUNCTUATION = /[.!?]$/;

const chunkFromWords = (words: WordTiming[], index: number): TimedWordChunk => {
  const first = words[0];
  const last = words[words.length - 1];
  const charLength = words.reduce((total, word) => total + word.text.length, 0) + Math.max(words.length - 1, 0);

  return {
    id: `${index}-${first.i}-${last.i}`,
    index,
    words,
    start: first.start,
    end: last.end,
    charLength,
  };
};

export const chunkWords = (
  rawWords: WordTiming[],
  {
    maxWords = 6,
    minWords = 4,
    maxChars = 38,
    silenceGapSeconds = 0.4,
  }: ChunkOptions = {},
): TimedWordChunk[] => {
  const words = rawWords
    .filter((word) => word.text && Number.isFinite(word.start) && Number.isFinite(word.end))
    .sort((a, b) => a.start - b.start || a.i - b.i);

  const chunks: TimedWordChunk[] = [];
  let current: WordTiming[] = [];

  const flush = () => {
    if (current.length === 0) {
      return;
    }

    chunks.push(chunkFromWords(current, chunks.length));
    current = [];
  };

  for (const word of words) {
    const previous = current[current.length - 1];
    const gap = previous ? word.start - previous.end : 0;
    const projectedChars =
      current.reduce((total, item) => total + item.text.length, 0) + current.length + word.text.length;
    const previousEndsSentence = previous ? TERMINAL_PUNCTUATION.test(previous.text) : false;

    const shouldStartNew =
      current.length > 0 &&
      (gap > silenceGapSeconds ||
        projectedChars > maxChars ||
        current.length >= maxWords ||
        (current.length >= minWords && previousEndsSentence));

    if (shouldStartNew) {
      flush();
    }

    current.push(word);
  }

  flush();

  return chunks;
};

export const getLastWordEnd = (words: WordTiming[]): number => {
  return words.reduce((latest, word) => Math.max(latest, word.end), 0);
};
