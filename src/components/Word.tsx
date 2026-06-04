import React from 'react';
import {interpolate, spring} from 'remotion';
import type {WordTiming} from '../types';

type WordProps = {
  word: WordTiming;
  currentTime: number;
  frame: number;
  fps: number;
};

export const Word: React.FC<WordProps> = ({word, currentTime, frame, fps}) => {
  const isCurrent = currentTime >= word.start && currentTime <= word.end;
  const hasBeenSpoken = currentTime > word.end;
  const wordStartFrame = Math.round(word.start * fps);
  const localFrame = frame - wordStartFrame;

  const popIn = spring({
    frame: Math.max(0, localFrame),
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 9,
      stiffness: 260,
      mass: 0.55,
    },
    durationInFrames: 8,
  });

  const settle = spring({
    frame: Math.max(0, localFrame - 5),
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 14,
      stiffness: 220,
      mass: 0.75,
    },
    durationInFrames: 12,
  });

  const activeScale = 1 + 0.2 * popIn * (1 - settle);
  const futureOpacity = 0.3;
  const opacity = isCurrent || hasBeenSpoken ? 1 : futureOpacity;
  const underlineWidth = isCurrent
    ? interpolate(Math.max(0, localFrame), [0, 6], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  return (
    <span
      className={[
        'word-token',
        isCurrent ? 'word-token-active' : '',
        hasBeenSpoken ? 'word-token-spoken' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        opacity,
        transform: `scale(${isCurrent ? activeScale : 1})`,
      }}
    >
      <span className="word-text">{word.text}</span>
      <span
        className="word-underline"
        style={{
          width: `${underlineWidth}%`,
        }}
      />
    </span>
  );
};
