import React from 'react';
import {interpolate, spring} from 'remotion';
import {Word} from './Word';
import type {TimedWordChunk} from '../types';

type WordChunkProps = {
  chunk: TimedWordChunk;
  currentTime: number;
  frame: number;
  fps: number;
  isVisible: boolean;
};

export const WordChunk: React.FC<WordChunkProps> = ({chunk, currentTime, frame, fps, isVisible}) => {
  if (!isVisible) {
    return null;
  }

  const chunkStartFrame = Math.round(chunk.start * fps);
  const localFrame = frame - chunkStartFrame;
  const intro = spring({
    frame: localFrame,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 18,
      stiffness: 170,
      mass: 0.8,
    },
  });
  const opacity = interpolate(localFrame, [0, 5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <section
      className="word-chunk"
      style={{
        opacity,
        transform: `translateY(${(1 - intro) * 28}px) scale(${0.96 + intro * 0.04})`,
      }}
    >
      <div className="chunk-meta">
        <span>{String(chunk.index + 1).padStart(2, '0')}</span>
        <span>{chunk.start.toFixed(2)}s</span>
      </div>

      <div className="words-wrap">
        {chunk.words.map((word) => (
          <Word key={word.i} word={word} currentTime={currentTime} frame={frame} fps={fps} />
        ))}
      </div>
    </section>
  );
};
