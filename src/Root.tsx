import React from 'react';
import {Composition} from 'remotion';
import {getAudioDurationInSeconds} from '@remotion/media-utils';
import {MainVideo} from './MainVideo';
import {getLastWordEnd} from './utils/chunker';
import {videos} from './videos';

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {videos.map((video) => (
        <Composition
          key={video.id}
          id={video.id}
          component={MainVideo}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          durationInFrames={Math.ceil((getLastWordEnd(video.words) + 1) * FPS)}
          defaultProps={video}
          calculateMetadata={async ({props}) => {
            const lastWordEnd = getLastWordEnd(props.words);
            const audioDuration = await getAudioDurationInSeconds(props.audioSrc).catch(() => lastWordEnd);
            const durationInSeconds = Math.max(audioDuration, lastWordEnd + 0.75);

            return {
              durationInFrames: Math.ceil(durationInSeconds * FPS),
            };
          }}
        />
      ))}
    </>
  );
};
