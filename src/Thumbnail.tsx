import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Activity, CheckCircle2, Clock, Database, GitBranch, Globe, LineChart, RefreshCw, Server, ShieldAlert, ShoppingCart, XCircle, Zap} from 'lucide-react';
import {DoodleBackground} from './components/DoodleBackground';

export type ThumbnailProps = {
  topic: 'consistency' | 'availability' | 'famous-nines' | 'series-parallel';
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

const FamousNinesThumbnail = () => (
  <ThumbnailShell label="Availability Patterns #5">
    <div className="thumbnail-split thumbnail-split-nines">
      <div className="thumbnail-copy thumbnail-nines-copy">
        <div className="thumbnail-kicker">The famous nines</div>
        <h1>
          <span className="thumbnail-yellow-text">99.999%</span>
          <br />
          Uptime?
        </h1>
        <div className="thumbnail-brush-answer">Only 5 min / year</div>
      </div>
      <div className="thumbnail-nines-board">
        <svg className="thumbnail-nines-lines" viewBox="0 0 880 680" aria-hidden="true">
          <path d="M 122 182 C 232 130 320 130 414 196" />
          <path d="M 414 252 C 528 338 588 382 724 366" />
          <path className="active" d="M 166 508 C 330 594 516 586 676 478" />
        </svg>
        <div className="thumbnail-nines-card card-one">
          <Clock size={48} />
          <strong>99%</strong>
          <span>3.6 days</span>
        </div>
        <div className="thumbnail-nines-card card-two">
          <Activity size={48} />
          <strong>99.9%</strong>
          <span>8.7 hours</span>
        </div>
        <div className="thumbnail-nines-card card-three">
          <LineChart size={48} />
          <strong>99.99%</strong>
          <span>52 minutes</span>
        </div>
        <div className="thumbnail-nines-card card-four active">
          <Server size={54} />
          <strong>99.999%</strong>
          <span>5 minutes</span>
        </div>
        <div className="thumbnail-cost-callout">
          <Zap size={42} />
          <strong>Cost spikes</strong>
        </div>
      </div>
    </div>
  </ThumbnailShell>
);

const SeriesParallelThumbnail = () => (
  <ThumbnailShell label="Availability Patterns #6">
    <div className="thumbnail-split thumbnail-split-series-parallel">
      <div className="thumbnail-copy thumbnail-series-copy">
        <div className="thumbnail-kicker">Architecture math</div>
        <h1>
          Series
          <br />
          vs Parallel
        </h1>
        <div className="thumbnail-answer">Why one path changes uptime.</div>
      </div>
      <div className="thumbnail-series-board">
        <svg className="thumbnail-series-lines" viewBox="0 0 900 690" aria-hidden="true">
          <path d="M 82 190 H 270 H 458 H 646" />
          <path className="parallel" d="M 198 500 H 342 V 420 H 548 V 500 H 694" />
          <path className="parallel" d="M 198 500 H 342 V 580 H 548 V 500 H 694" />
        </svg>
        <div className="thumbnail-series-card series-a failed">
          <Server size={42} />
          <strong>API</strong>
          <span>99.9%</span>
        </div>
        <div className="thumbnail-series-card series-b failed">
          <Database size={42} />
          <strong>DB</strong>
          <span>required</span>
        </div>
        <div className="thumbnail-series-result failed">
          <XCircle size={46} />
          <strong>Chain breaks</strong>
        </div>
        <div className="thumbnail-series-card parallel-a">
          <Database size={42} />
          <strong>DB A</strong>
          <span>path 1</span>
        </div>
        <div className="thumbnail-series-card parallel-b active">
          <RefreshCw size={44} />
          <strong>DB B</strong>
          <span>takes over</span>
        </div>
        <div className="thumbnail-series-result active">
          <CheckCircle2 size={46} />
          <strong>One path works</strong>
        </div>
      </div>
    </div>
  </ThumbnailShell>
);

export const Thumbnail: React.FC<ThumbnailProps> = ({topic}) => {
  if (topic === 'availability') {
    return <AvailabilityThumbnail />;
  }

  if (topic === 'famous-nines') {
    return <FamousNinesThumbnail />;
  }

  if (topic === 'series-parallel') {
    return <SeriesParallelThumbnail />;
  }

  return <ConsistencyThumbnail />;
};
