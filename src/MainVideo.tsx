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

export const MainVideo: React.FC<MainVideoProps> = ({audioSrc, words, lessonPlan, slug}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const currentTime = frame / fps;
  const audioVolume = slug === 'layer-4-vs-layer-7-load-balancing' && currentTime >= 32 && currentTime < 33.2 ? 0 : 1;
  const chunks = useMemo(() => chunkWords(words), [words]);
  const activeBeat = getActiveBeat(lessonPlan, currentTime);
  const activeChunk = chunks.find((chunk) => currentTime >= chunk.start && currentTime <= chunk.end);
  const captionsDisabled =
    slug === 'health-checks-and-failover' ||
    slug === 'the-famous-nines' ||
    slug === 'series-vs-parallel-availability' ||
    slug === 'load-balancing' ||
    slug === 'load-balancing-algorithms' ||
    slug === 'layer-4-vs-layer-7-load-balancing';
  const showCaptions = !captionsDisabled && activeBeat.kind !== 'closing';
  const footerLabels = lessonPlan.some((beat) => beat.kind.startsWith('spof-'))
    ? ['Availability', 'SPOFs', 'FoodDash', 'High availability']
    : ['Strong consistency', 'Queues', 'Retries', 'Eventual consistency'];

  return (
    <AbsoluteFill className={captionsDisabled ? 'video-root video-root-no-captions' : 'video-root'}>
      <Audio src={audioSrc || staticFile('audio/consistency-in-practice.mp3')} volume={audioVolume} />

      <AbsoluteFill className="drifting-stage">
        <DoodleBackground currentTime={0} />
      </AbsoluteFill>

      <AbsoluteFill className="lesson-layer">
        <LessonVisuals beat={activeBeat} currentTime={currentTime} frame={frame} fps={fps} />
      </AbsoluteFill>

      {!captionsDisabled ? (
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
      ) : null}
    </AbsoluteFill>
  );
};
