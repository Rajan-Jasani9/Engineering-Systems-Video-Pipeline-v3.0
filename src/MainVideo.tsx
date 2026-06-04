import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {DoodleBackground} from './components/DoodleBackground';
import {LessonVisuals} from './components/LessonVisuals';
import {WordChunk} from './components/WordChunk';
import {chunkWords} from './utils/chunker';
import type {LessonBeat, MainVideoProps} from './types';

const getActiveBeat = (lessonPlan: LessonBeat[], currentTime: number): LessonBeat => {
  return (
    lessonPlan.find((beat) => currentTime >= beat.start && currentTime < beat.end) ??
    lessonPlan[lessonPlan.length - 1]
  );
};

export const MainVideo: React.FC<MainVideoProps> = ({audioSrc, words, lessonPlan}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const currentTime = frame / fps;
  const chunks = useMemo(() => chunkWords(words), [words]);
  const activeBeat = getActiveBeat(lessonPlan, currentTime);
  const activeChunk = chunks.find((chunk) => currentTime >= chunk.start && currentTime <= chunk.end);
  const showCaptions = activeBeat.kind !== 'closing';

  return (
    <AbsoluteFill className="video-root">
      <Audio src={audioSrc || staticFile('audio/consistency-in-practice.mp3')} />

      <AbsoluteFill className="drifting-stage">
        <DoodleBackground currentTime={0} />
      </AbsoluteFill>

      <AbsoluteFill className="lesson-layer">
        <LessonVisuals beat={activeBeat} currentTime={currentTime} frame={frame} fps={fps} />
      </AbsoluteFill>

      <AbsoluteFill className="content-layer">
        <div className="chunk-stage">
          {showCaptions && activeChunk ? (
            <WordChunk
              key={activeChunk.id}
              chunk={activeChunk}
              currentTime={currentTime}
              frame={frame}
              fps={fps}
              isVisible
            />
          ) : null}
        </div>

        <div className="footer-row">
          <span>Strong consistency</span>
          <span>Queues</span>
          <span>Retries</span>
          <span>Eventual consistency</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
