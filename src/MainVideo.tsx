import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {DoodleBackground} from './components/DoodleBackground';
import {LessonVisuals} from './components/LessonVisuals';
import {WordChunk} from './components/WordChunk';
import {chunkWords} from './utils/chunker';
import type {LessonBeat, MainVideoProps} from './types';

const getActiveBeat = (lessonPlan: LessonBeat[], currentTime: number): LessonBeat => {
  const activeBeat = lessonPlan.find((beat) => currentTime >= beat.start && currentTime < beat.end);
  if (activeBeat) {
    return activeBeat;
  }

  for (let index = lessonPlan.length - 1; index >= 0; index -= 1) {
    if (currentTime >= lessonPlan[index].start) {
      return lessonPlan[index];
    }
  }

  return lessonPlan[0];
};

export const MainVideo: React.FC<MainVideoProps> = ({audioSrc, words, lessonPlan}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const currentTime = frame / fps;
  const chunks = useMemo(() => chunkWords(words), [words]);
  const activeBeat = getActiveBeat(lessonPlan, currentTime);
  const activeChunk = chunks.find((chunk) => currentTime >= chunk.start && currentTime <= chunk.end);
  const showCaptions = activeBeat.kind !== 'closing';
  const footerLabels = lessonPlan.some((beat) => beat.kind.startsWith('spof-'))
    ? ['Availability', 'SPOFs', 'FoodDash', 'High availability']
    : lessonPlan.some((beat) => beat.kind === 'hc-screen')
      ? ['Health checks', 'Failover', 'Load balancers', 'Chaos engineering']
      : ['Strong consistency', 'Queues', 'Retries', 'Eventual consistency'];

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
          {footerLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
