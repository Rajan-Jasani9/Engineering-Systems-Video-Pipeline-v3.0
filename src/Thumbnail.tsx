import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Database, GitBranch, Globe, Server, ShieldAlert, ShoppingCart, Zap} from 'lucide-react';
import {DoodleBackground} from './components/DoodleBackground';

export type ThumbnailProps = {
  topic: 'consistency' | 'availability';
};

const ThumbnailShell: React.FC<{children: React.ReactNode; label: string}> = ({children, label}) => (
  <AbsoluteFill className="thumbnail-root">
    <AbsoluteFill className="drifting-stage">
      <DoodleBackground currentTime={0} />
    </AbsoluteFill>
    <div className="thumbnail-brand">
      <span>Engineering Systems</span>
      <strong>{label}</strong>
    </div>
    {children}
  </AbsoluteFill>
);

const ConsistencyThumbnail = () => (
  <ThumbnailShell label="Consistency in Practice">
    <div className="thumbnail-split">
      <div className="thumbnail-copy">
        <div className="thumbnail-kicker">System design trap</div>
        <h1>
          Strong or
          <br />
          Eventual?
        </h1>
        <div className="thumbnail-answer">The answer is both.</div>
      </div>
      <div className="thumbnail-system-board">
        <div className="thumbnail-center-node">
          <ShoppingCart size={58} />
          <strong>E-commerce</strong>
        </div>
        <div className="thumbnail-node top-left active">
          <Database size={36} />
          <span>Inventory</span>
          <small>Strong</small>
        </div>
        <div className="thumbnail-node top-right">
          <GitBranch size={36} />
          <span>Comments</span>
          <small>Causal</small>
        </div>
        <div className="thumbnail-node bottom-left">
          <Globe size={36} />
          <span>Reviews</span>
          <small>Eventual</small>
        </div>
        <div className="thumbnail-node bottom-right">
          <Server size={36} />
          <span>Profile</span>
          <small>Read-own</small>
        </div>
      </div>
    </div>
  </ThumbnailShell>
);

const AvailabilityThumbnail = () => (
  <ThumbnailShell label="Availability Patterns #1">
    <div className="thumbnail-split thumbnail-split-availability">
      <div className="thumbnail-copy">
        <div className="thumbnail-kicker">Can this ever be true?</div>
        <h1>
          100%
          <br />
          Uptime?
        </h1>
        <div className="thumbnail-answer">Why some systems never sleep.</div>
      </div>
      <div className="thumbnail-availability-board">
        <div className="thumbnail-server failed">
          <ShieldAlert size={54} />
          <strong>Server A</strong>
          <span>fails</span>
        </div>
        <div className="thumbnail-server live">
          <Zap size={54} />
          <strong>Traffic</strong>
          <span>reroutes</span>
        </div>
        <div className="thumbnail-server live">
          <Server size={54} />
          <strong>Server B</strong>
          <span>serves</span>
        </div>
        <div className="thumbnail-route-arrow">=&gt;</div>
      </div>
    </div>
  </ThumbnailShell>
);

export const Thumbnail: React.FC<ThumbnailProps> = ({topic}) => {
  if (topic === 'availability') {
    return <AvailabilityThumbnail />;
  }

  return <ConsistencyThumbnail />;
};
