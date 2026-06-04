import React from 'react';
import {Composition} from 'remotion';
import {getAudioDurationInSeconds} from '@remotion/media-utils';
import {MainVideo} from './MainVideo';
import {VisualLayoutPreview} from './VisualLayoutPreview';
import type {LayoutKind} from './components/visual-library';
import {getLastWordEnd} from './utils/chunker';
import {videos} from './videos';

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

const visualPreviewCompositions: Array<{
  id: string;
  kind: LayoutKind;
  title: string;
  subtitle: string;
}> = [
  {
    id: 'PreviewQueueFlow',
    kind: 'queue-flow',
    title: 'Queue Flow',
    subtitle: 'Producer, queue, worker, and database under backpressure.',
  },
  {
    id: 'PreviewIncidentDashboard',
    kind: 'incident-dashboard',
    title: 'Incident Dashboard',
    subtitle: 'SRE status view for severity, metrics, owners, and action.',
  },
  {
    id: 'PreviewTradeoffMatrix',
    kind: 'tradeoff-matrix',
    title: 'Tradeoff Matrix',
    subtitle: 'Subtle comparison board for architecture choices.',
  },
  {
    id: 'PreviewChatScreen',
    kind: 'chat-screen',
    title: 'Chat Screen',
    subtitle: 'Mobile UI view for causality, ordering, and delivery state.',
  },
  {
    id: 'PreviewLatencyCurve',
    kind: 'latency-curve',
    title: 'Latency Curve',
    subtitle: 'Metric chart for saturation and tail-latency pressure.',
  },
  {
    id: 'PreviewRetryLoop',
    kind: 'retry-loop',
    title: 'Retry Loop',
    subtitle: 'Process flow for retry, wait, and capped recovery.',
  },
];

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
      {visualPreviewCompositions.map((preview) => (
        <Composition
          key={preview.id}
          id={preview.id}
          component={VisualLayoutPreview}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          durationInFrames={90}
          defaultProps={preview}
        />
      ))}
    </>
  );
};
