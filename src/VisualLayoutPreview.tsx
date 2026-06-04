import React from 'react';
import {AbsoluteFill} from 'remotion';
import {DoodleBackground} from './components/DoodleBackground';
import {VisualLayoutPreset, type LayoutKind} from './components/visual-library';

export type VisualLayoutPreviewProps = {
  kind: LayoutKind;
  title?: string;
  subtitle?: string;
};

export const VisualLayoutPreview: React.FC<VisualLayoutPreviewProps> = ({kind, title, subtitle}) => (
  <AbsoluteFill className="video-root">
    <AbsoluteFill className="drifting-stage">
      <DoodleBackground currentTime={0} />
    </AbsoluteFill>
    <AbsoluteFill className="vl-preview-stage">
      <VisualLayoutPreset kind={kind} title={title} subtitle={subtitle} />
    </AbsoluteFill>
  </AbsoluteFill>
);
