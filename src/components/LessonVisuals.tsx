import React from 'react';
import {Activity, AlertTriangle, Bell, BookOpen, CheckCircle2, Clock, Cloud, Code2, CreditCard, Database, GitBranch, Globe, Heart, KeyRound, Layers3, LineChart, LockKeyhole, Mail, MessageSquare, PackageCheck, Pencil, PencilRuler, Radio, RefreshCw, Scale, Search, Server, ShieldAlert, ShoppingCart, Smartphone, Sparkles, ThumbsUp, User, UserCheck, Wrench, XCircle, Zap} from 'lucide-react';
import {interpolate, spring} from 'remotion';
import type {LessonBeat} from '../types';
import {FamousNinesVisual} from '../videos/the-famous-nines/visuals';
import {SeriesParallelAvailabilityVisual} from '../videos/series-vs-parallel-availability/visuals';
import {LoadBalancingVisual} from '../videos/load-balancing/visuals';
import {LoadBalancingAlgorithmsVisual} from '../videos/load-balancing-algorithms/visuals';
import {Layer4Layer7Visual} from '../videos/layer-4-vs-layer-7-load-balancing/visuals';

type LessonVisualsProps = {
  beat: LessonBeat;
  currentTime: number;
  frame: number;
  fps: number;
};

const examples = [
  {label: 'Inventory', model: 'Strong', icon: PackageCheck},
  {label: 'Reviews', model: 'Eventual', icon: MessageSquare},
  {label: 'Profile', model: 'Read your writes', icon: UserCheck},
  {label: 'Comments', model: 'Causal', icon: GitBranch},
  {label: 'Analytics', model: 'Weak / eventual', icon: LineChart},
];

const agenda = [
  'Bust the one-size myth',
  'Walk through e-commerce',
  'Choose with a framework',
  'Place models on a spectrum',
  'Set up availability patterns',
];

const models = ['Strong', 'Causal', 'Read-your-writes', 'Eventual', 'Weak'];

const visualIndex = {
  inventory: 0,
  'inventory-rule': 0,
  reviews: 1,
  'review-choice': 1,
  profile: 2,
  'profile-trust': 2,
  comments: 3,
  'comments-order': 3,
  analytics: 4,
  'analytics-staleness': 4,
};

const Card: React.FC<{children: React.ReactNode; className?: string; style?: React.CSSProperties}> = ({children, className = '', style}) => (
  <div className={`lesson-card ${className}`} style={style}>{children}</div>
);

const BeatHeader: React.FC<{beat: LessonBeat}> = ({beat}) => (
  <div className="lesson-header">
    <div>
      <span className="lesson-kicker">Professor board</span>
      <h1>{beat.title}</h1>
    </div>
    <p>{beat.subtitle}</p>
  </div>
);

const MythVisual = () => (
  <div className="myth-grid">
    <Card className="choice-card wrong">
      <XCircle size={54} />
      <span>One system</span>
      <strong>One model</strong>
    </Card>
    <div className="chalk-arrow">vs</div>
    <Card className="choice-card right">
      <CheckCircle2 size={54} />
      <span>One system</span>
      <strong>Many contracts</strong>
    </Card>
  </div>
);

const IntroVisual = () => (
  <div className="intro-board">
    <Card>
      <BookOpen size={72} />
      <h2>Consistency In Practice</h2>
      <p>How real engineering systems choose guarantees feature by feature.</p>
    </Card>
  </div>
);

const PracticalShiftVisual = () => (
  <div className="shift-board">
    <Card>
      <PencilRuler size={62} />
      <h2>Theory</h2>
      <p>Definitions, guarantees, ordering models.</p>
    </Card>
    <div className="chalk-arrow">=&gt;</div>
    <Card className="inverted-card">
      <Sparkles size={62} />
      <h2>Practice</h2>
      <p>Where each model belongs in production.</p>
    </Card>
  </div>
);

const OpeningQuestionVisual = () => (
  <div className="question-board">
    <Card>
      <h2>Big production system?</h2>
      <div className="question-options">
        <span>Strong?</span>
        <span>Eventual?</span>
      </div>
      <p>The useful answer is not binary.</p>
    </Card>
  </div>
);

const MosaicVisual = () => (
  <div className="mosaic-board">
    {['Inventory', 'Reviews', 'Profile', 'Comments', 'Analytics', 'Payments'].map((label, index) => (
      <div key={label} className={index % 2 === 0 ? 'mosaic-tile bright' : 'mosaic-tile'}>
        <Layers3 size={34} />
        <strong>{label}</strong>
        <span>own guarantee</span>
      </div>
    ))}
  </div>
);

const MosaicContractsVisual = () => (
  <div className="contract-board">
    {examples.slice(0, 4).map(({label, model, icon: Icon}) => (
      <div key={label} className="contract-row">
        <Icon size={40} />
        <strong>{label}</strong>
        <span>{model}</span>
      </div>
    ))}
  </div>
);

const VocabularyVisual = () => (
  <div className="vocab-board">
    {models.slice(0, 4).map((model, index) => (
      <Card key={model} className={index === 0 ? 'vocab-card strong' : 'vocab-card'}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <h2>{model}</h2>
      </Card>
    ))}
  </div>
);

const VocabularySpectrumVisual = () => (
  <div className="mini-spectrum-board">
    {models.map((model, index) => (
      <div key={model} className={index === 0 || index === models.length - 1 ? 'mini-spectrum-card edge' : 'mini-spectrum-card'}>
        <span>{model}</span>
      </div>
    ))}
  </div>
);

const AgendaVisual = ({currentTime}: {currentTime: number}) => {
  const active = Math.min(agenda.length - 1, Math.max(0, Math.floor(((currentTime - 73.38) / (92.42 - 73.38)) * agenda.length)));

  return (
    <div className="agenda-board">
      {agenda.map((item, index) => (
        <div key={item} className={index <= active ? 'agenda-item active' : 'agenda-item'}>
          <span>{index + 1}</span>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

const AgendaExamplesVisual = () => (
  <div className="agenda-examples-board">
    {examples.map(({label, model, icon: Icon}) => (
      <Card key={label} className="agenda-example-card">
        <Icon size={36} />
        <h2>{label}</h2>
        <p>{model}</p>
      </Card>
    ))}
  </div>
);

const PrincipleVisual = () => (
  <div className="principle-layout">
    <Card>
      <Scale size={54} />
      <h2>Feature</h2>
      <p>Risk, money, trust, ordering, freshness.</p>
    </Card>
    <div className="principle-equals">=&gt;</div>
    <Card>
      <ShieldAlert size={54} />
      <h2>Guarantee</h2>
      <p>Only as strong as the feature actually needs.</p>
    </Card>
  </div>
);

const PrincipleScopeVisual = () => (
  <div className="scope-board">
    {['Feature boundary', 'Failure mode', 'Consistency contract'].map((item, index) => (
      <div key={item} className={index === 2 ? 'scope-item active' : 'scope-item'}>
        <span>{index + 1}</span>
        <strong>{item}</strong>
      </div>
    ))}
  </div>
);

const FeatureContrastVisual = () => (
  <div className="feature-contrast">
    <Card className="contrast-card critical">
      <LockKeyhole size={54} />
      <h2>Transaction</h2>
      <p>Money moves. Correctness is mandatory.</p>
      <strong>strong</strong>
    </Card>
    <Card className="contrast-card relaxed">
      <CheckCircle2 size={54} />
      <h2>Like button</h2>
      <p>A tiny delay is acceptable.</p>
      <strong>eventual</strong>
    </Card>
  </div>
);

const LikeButtonExampleVisual = () => (
  <div className="like-example-board">
    <div className="like-example-copy">
      <div className="like-icon-lockup">
        <ThumbsUp size={64} />
        <span>Like button</span>
      </div>
      <h2>Eventual is enough</h2>
      <p>A short delay before everyone sees the new count does not break the product.</p>
      <div className="like-action-row">
        <span>
          <ThumbsUp size={34} />
          1,204
        </span>
        <strong>eventual</strong>
      </div>
    </div>
  </div>
);

const CommerceMap = ({activeKey}: {activeKey?: keyof typeof visualIndex}) => {
  const active = activeKey ? visualIndex[activeKey] : -1;

  return (
    <div className="commerce-map">
      <div className="shop-node">
        <ShoppingCart size={58} />
        <strong>E-commerce</strong>
      </div>
      {examples.map(({label, model, icon: Icon}, index) => (
        <div key={label} className={index === active ? 'service-node active' : 'service-node'}>
          <Icon size={38} />
          <span>{label}</span>
          <small>{model}</small>
        </div>
      ))}
      <svg className="commerce-lines" viewBox="0 0 1200 420">
        <path d="M600 210 L205 80 M600 210 L1010 80 M600 210 L190 330 M600 210 L1000 330 M600 210 L600 372" />
      </svg>
    </div>
  );
};

const ExampleVisual = ({kind}: {kind: keyof typeof visualIndex}) => {
  const rows = {
    inventory: ['Stock must be exact', 'Start with the invariant', 'Inventory service'],
    'inventory-rule': ['Oversell risk', 'Money lost', 'Strong consistency'],
    reviews: ['New review appears later', 'User impact is low', 'Delay is acceptable'],
    'review-choice': ['Stale review ok', 'Keep site fast', 'Eventual consistency'],
    profile: ['User saved address', 'Must see it now', 'Self-read guarantee'],
    'profile-trust': ['Did save work?', 'Trust depends on feedback', 'Read-your-writes'],
    comments: ['Reply after parent', 'Ordering matters', 'Cause and effect'],
    'comments-order': ['No global ordering needed', 'Keep thread logical', 'Causal consistency'],
    analytics: ['10,002 vs 10,005', 'Tiny impact', 'Approximation is fine'],
    'analytics-staleness': ['Precision not critical', 'Speed wins', 'Weak / eventual'],
  }[kind];

  return (
    <div className="example-layout">
      <CommerceMap activeKey={kind} />
      <Card className="pros-table">
        <div className="table-row heading">
          <span>Question</span>
          <span>Answer</span>
        </div>
        <div className="table-row">
          <span>Worst stale-data outcome</span>
          <strong>{rows[0]}</strong>
        </div>
        <div className="table-row">
          <span>Business impact</span>
          <strong>{rows[1]}</strong>
        </div>
        <div className="table-row">
          <span>Model</span>
          <strong>{rows[2]}</strong>
        </div>
      </Card>
    </div>
  );
};

const TradeoffVisual = () => (
  <div className="tradeoff-board">
    <Card>
      <LockKeyhole size={58} />
      <h2>Correctness</h2>
      <p>More coordination</p>
    </Card>
    <div className="cost-meter">
      <span>coordination cost</span>
      <div />
    </div>
    <Card>
      <Clock size={58} />
      <h2>Latency</h2>
      <p>More waiting</p>
    </Card>
    <Card>
      <Globe size={58} />
      <h2>Availability</h2>
      <p>More failure pressure</p>
    </Card>
  </div>
);

const CoordinationPressureVisual = () => (
  <div className="pressure-board">
    {[
      ['1', 'Replica agrees', 'coordination'],
      ['2', 'User waits', 'latency'],
      ['3', 'Node fails', 'availability pressure'],
    ].map(([number, title, label]) => (
      <Card key={number} className="pressure-card">
        <span>{number}</span>
        <h2>{title}</h2>
        <p>{label}</p>
      </Card>
    ))}
  </div>
);

const StockRuleVisual = () => (
  <div className="stock-rule-board">
    <Card>
      <h2>Stock = 2</h2>
      <div className="stock-buyers">
        <span>Buyer A</span>
        <span>Buyer B</span>
        <span className="blocked">Buyer C</span>
      </div>
      <p>Only two successful purchases. End of story.</p>
    </Card>
  </div>
);

const InventoryRaceVisual = () => (
  <div className="inventory-race-board">
    {['Buyer A succeeds', 'Buyer B succeeds', 'Buyer C rejected'].map((item, index) => (
      <div key={item} className={index === 2 ? 'race-lane blocked' : 'race-lane'}>
        {index === 2 ? <XCircle size={42} /> : <CheckCircle2 size={42} />}
        <strong>{item}</strong>
      </div>
    ))}
  </div>
);

const ReviewLagVisual = () => (
  <div className="lag-board">
    <Card>
      <h2>Review Posted</h2>
      <div className="lag-line">
        <span>now</span>
        <strong>visible globally</strong>
        <span>+ seconds</span>
      </div>
      <p>Availability and speed matter more than instant fanout.</p>
    </Card>
  </div>
);

const ProfileTrustVisual = () => (
  <div className="trust-board">
    <Card>
      <UserCheck size={60} />
      <h2>Saved Address</h2>
      <p>Show the writer their own update immediately.</p>
    </Card>
  </div>
);

const CausalOrderVisual = () => (
  <div className="causal-board">
    <Card>
      <div className="comment-thread">
        <span>Parent comment</span>
        <span className="reply">Reply depends on parent</span>
        <span className="reply second">Nested reply</span>
      </div>
    </Card>
  </div>
);

const AnalyticsStalenessVisual = () => (
  <div className="analytics-board">
    <Card>
      <h2>10,002</h2>
      <p>Displayed active users</p>
    </Card>
    <div className="chalk-arrow">~</div>
    <Card className="inverted-card">
      <h2>10,005</h2>
      <p>Actual active users</p>
    </Card>
  </div>
);

const AnalyticsImpactVisual = () => (
  <div className="analytics-impact-board">
    <Card>
      <LineChart size={58} />
      <h2>10,002</h2>
      <p>same decision</p>
    </Card>
    <div className="chalk-arrow">=</div>
    <Card>
      <LineChart size={58} />
      <h2>10,005</h2>
      <p>same decision</p>
    </Card>
  </div>
);

const AnalyticsSpeedVisual = () => (
  <div className="speed-board">
    <Card className="inverted-card">
      <Clock size={62} />
      <h2>Responsive</h2>
      <p>Fresh enough to act.</p>
    </Card>
    <Card>
      <Database size={62} />
      <h2>Approximate</h2>
      <p>No global lock needed.</p>
    </Card>
  </div>
);

const FrameworkVisual = ({currentTime}: {currentTime: number}) => {
  const active = Math.min(2, Math.max(0, Math.floor(((currentTime - 264) / (294.28 - 264)) * 3)));
  const steps = [
    ['1', 'Assess risk', 'What breaks if data is stale?'],
    ['2', 'Business impact', 'Money, security, trust, UX?'],
    ['3', 'Choose sufficient', 'Do not overpay for guarantees.'],
  ];

  return (
    <div className="framework-steps">
      {steps.map(([number, title, detail], index) => (
        <Card key={number} className={index <= active ? 'step-card active' : 'step-card'}>
          <span>{number}</span>
          <h2>{title}</h2>
          <p>{detail}</p>
        </Card>
      ))}
    </div>
  );
};

const SingleStepVisual = ({step}: {step: 0 | 1 | 2}) => {
  const steps = [
    ['1', 'Assess risk', 'What breaks if the data is stale?'],
    ['2', 'Business impact', 'Money, security, trust, user experience.'],
    ['3', 'Choose sufficient', 'Use the least expensive guarantee that works.'],
  ];
  const [number, title, detail] = steps[step];

  return (
    <div className="single-step-board">
      <Card className="step-card active">
        <span>{number}</span>
        <h2>{title}</h2>
        <p>{detail}</p>
      </Card>
    </div>
  );
};

const SufficientStepVisual = () => (
  <div className="sufficient-board">
    <Card>
      <Scale size={64} />
      <h2>Sufficient</h2>
      <p>Protect the product without buying extra coordination.</p>
    </Card>
  </div>
);

const SpectrumVisual = ({currentTime, emphasis = 0}: {currentTime: number; emphasis?: number}) => {
  const progress = Math.max(0, Math.min(1, (currentTime - 294.28) / (326.87 - 294.28)));

  return (
    <div className="spectrum-board">
      <div className="spectrum-axis">
        <span>max correctness</span>
        <span>max availability</span>
      </div>
      <div className="spectrum-line">
        <div className="spectrum-progress" style={{width: `${progress * 100}%`}} />
        {models.map((model, index) => (
          <div
            key={model}
            className={index === emphasis ? 'spectrum-point active' : 'spectrum-point'}
            style={{left: `${(index / (models.length - 1)) * 100}%`}}
          >
            <span />
            <strong>{model}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

const SpectrumCoordinationVisual = () => (
  <div className="coordination-spectrum-board">
    {['agreement', 'latency', 'certainty'].map((item, index) => (
      <div key={item} className={index === 2 ? 'coordination-chip active' : 'coordination-chip'}>
        <strong>{item}</strong>
      </div>
    ))}
  </div>
);

const FinalLessonVisual = () => (
  <div className="final-lesson-board">
    <Card>
      <h2>Consistency is a design decision</h2>
      <div className="decision-pills">
        <span>Risk</span>
        <span>Business needs</span>
        <span>User experience</span>
      </div>
    </Card>
  </div>
);

const DecisionChecklistVisual = () => (
  <div className="decision-checklist-board">
    {[
      ['Risk', 'What breaks if data is stale?'],
      ['Impact', 'Does it touch money, trust, or safety?'],
      ['Guarantee', 'Pick the sufficient model.'],
    ].map(([title, detail]) => (
      <div key={title} className="checklist-row">
        <CheckCircle2 size={42} />
        <div>
          <strong>{title}</strong>
          <p>{detail}</p>
        </div>
      </div>
    ))}
  </div>
);

const NextSeriesVisual = () => (
  <div className="next-series-board">
    <Card>
      <Server size={60} />
      <h2>Availability Patterns</h2>
      <p>Failures, recovery, resilience, and systems that stay up.</p>
    </Card>
    <Database className="next-icon one" size={74} />
    <Globe className="next-icon two" size={84} />
  </div>
);

const TradeoffRecapVisual = () => (
  <div className="recap-board">
    <Card>
      <h2>Consistency</h2>
      <p>Correctness and ordering</p>
    </Card>
    <div className="chalk-arrow">+</div>
    <Card className="inverted-card">
      <h2>Availability</h2>
      <p>Surviving failures</p>
    </Card>
  </div>
);

const AvailabilityBridgeVisual = () => (
  <div className="availability-bridge-board">
    <Card>
      <CheckCircle2 size={54} />
      <h2>Correct</h2>
    </Card>
    <div className="chalk-arrow">=&gt;</div>
    <Card className="inverted-card">
      <Globe size={54} />
      <h2>Available</h2>
    </Card>
  </div>
);

const AvailabilityPreviewVisual = () => (
  <div className="availability-board">
    {['failover', 'retries', 'replication', 'resilience'].map((item) => (
      <Card key={item} className="availability-card">
        <Server size={42} />
        <h2>{item}</h2>
      </Card>
    ))}
  </div>
);

const FailurePreviewVisual = () => (
  <div className="failure-preview-board">
    {['detect', 'reroute', 'retry', 'recover'].map((item, index) => (
      <div key={item} className={index === 1 ? 'failure-step active' : 'failure-step'}>
        <Server size={38} />
        <strong>{item}</strong>
      </div>
    ))}
  </div>
);

const availabilityRoadmap = [
  'Consistency vs availability',
  'Define reachability',
  'Cost of downtime',
  'Failure is expected',
  'Availability patterns',
  'Single points of failure',
];

const availabilityPatterns: {title: string; detail: string; icon: React.ComponentType<{size?: number}>}[] = [
  {title: 'Redundancy', detail: 'multiple servers', icon: Server},
  {title: 'Replication', detail: 'copy critical state', icon: Database},
  {title: 'Failover', detail: 'reroute traffic', icon: GitBranch},
  {title: 'Load balancing', detail: 'spread requests', icon: Globe},
  {title: 'Recovery', detail: 'come back automatically', icon: CheckCircle2},
  {title: 'Isolation', detail: 'contain failures', icon: ShieldAlert},
];

const spofAgenda = [
  'Availability equation',
  'Defining SPOFs',
  'FoodDash outage',
  'Hidden chains',
  'Operational failures',
  'High availability steps',
];

const SpofVideoIntroVisual = () => (
  <div className="spof-intro-hero">
    <div className="spof-path-mark">
      <span>Engineering Systems</span>
      <strong>Availability Patterns / Single Point of Failures</strong>
    </div>
    <div className="spof-title-lockup">
      <Server size={82} />
      <h2>Single Point of Failures</h2>
      <p>Finding the one component that can take the whole product offline.</p>
    </div>
  </div>
);

const SpofRecapVisual = () => (
  <div className="spof-recap-board">
    {[
      ['Uptime matters', 'users can reach the service'],
      ['Nines become minutes', 'downtime has a real budget'],
      ['Business keeps running', 'availability protects trust'],
    ].map(([headline, body], index) => (
      <Card key={headline} className={index === 1 ? 'inverted-card' : ''}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <h2>{headline}</h2>
        <p>{body}</p>
      </Card>
    ))}
  </div>
);

const SpofStartAvailabilityVisual = () => (
  <div className="spof-start-board">
    <div className="spof-start-line">
      <span>recap</span>
      <strong>let's get started</strong>
      <span>availability</span>
    </div>
    <div className="spof-pulse-node">
      <Globe size={72} />
    </div>
  </div>
);

const SpofAgendaVisual = ({currentTime}: {currentTime: number}) => {
  const active = [31.15, 32.47, 35.33, 37.31, 38.97, 41.97].reduce((count, start) => (currentTime >= start ? count + 1 : count), 0) - 1;

  return (
    <div className="spof-agenda-timeline">
      {spofAgenda.map((item, index) => (
        <div key={item} className={index <= active ? 'spof-timeline-item active' : 'spof-timeline-item'}>
          <span>{index + 1}</span>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

const SpofSectionHeadingVisual = ({beat}: {beat: LessonBeat}) => (
  <div className="spof-section-card">
    <span>Section</span>
    <h2>{beat.title}</h2>
    <p>{beat.subtitle}</p>
  </div>
);

const SpofAvailabilityQuestionVisual = ({currentTime}: {currentTime: number}) => {
  const doodles = [
    {label: 'uptime nines', className: 'top-left', visible: currentTime >= 52.49},
    {label: 'business running', className: 'top-right', visible: currentTime >= 57.67},
    {label: 'dead in the water', className: 'bottom-left danger', visible: currentTime >= 58.93},
    {label: 'major outages', className: 'bottom-right danger', visible: currentTime >= 71.63},
  ];

  return (
    <div className="spof-question-cloud">
      <Card className="spof-question-card">
        <h2>Why do systems go down?</h2>
      </Card>
      {doodles.map((doodle) => (
        <div key={doodle.label} className={doodle.visible ? `spof-doodle ${doodle.className} visible` : `spof-doodle ${doodle.className}`}>
          <span>{doodle.label}</span>
        </div>
      ))}
    </div>
  );
};

const SpofNetworkDefinitionVisual = ({currentTime}: {currentTime: number}) => {
  const active =
    currentTime >= 101.87 ? 2 :
    currentTime >= 100.51 ? 1 :
    currentTime >= 99.45 ? 0 :
    -1;
  const nodes = [
    {label: 'Web server', className: 'top-left'},
    {label: 'Load balancer', className: 'top-right'},
    {label: 'Network switch', className: 'bottom-left'},
    {label: 'Cloud region', className: 'bottom-right'},
  ];

  return (
    <div className="spof-network-board">
      <svg className="spof-network-lines" viewBox="0 0 1200 540">
        <path d="M600 270 L220 95 M600 270 L980 95 M600 270 L220 445 M600 270 L980 445" />
      </svg>
      <div className="spof-center-node">
        <ShieldAlert size={58} />
        <strong>{currentTime >= 111.73 ? 'SPOF' : 'Center'}</strong>
        <small>{currentTime >= 111.73 ? 'single point of failure' : 'one critical component'}</small>
      </div>
      {nodes.map((node, index) => (
        <div key={node.label} className={index === active ? `spof-network-node ${node.className} active` : `spof-network-node ${node.className}`}>
          <Server size={34} />
          <span>{node.label}</span>
        </div>
      ))}
      <div className={currentTime >= 115.55 ? 'spof-definition-note visible' : 'spof-definition-note'}>
        Any component whose failure causes the entire system to become unavailable.
      </div>
    </div>
  );
};

const SpofGreenRedVisual = ({currentTime}: {currentTime: number}) => {
  const failed = currentTime >= 123.25;

  return (
    <div className={failed ? 'spof-fail-state failed' : 'spof-fail-state'}>
      <div className="spof-health-node">
        {failed ? <XCircle size={88} /> : <CheckCircle2 size={88} />}
        <strong>{failed ? 'dead' : 'healthy'}</strong>
      </div>
      <div className="spof-health-copy">
        <h2>If this thing dies...</h2>
        <p>everything dies</p>
      </div>
    </div>
  );
};

const SpofHomeAppliancesVisual = ({currentTime}: {currentTime: number}) => {
  const tripped = currentTime >= 135.55;
  const appliances = [
    {label: 'Lights', failAt: 137.07},
    {label: 'Fan', failAt: 138.21},
    {label: 'Router', failAt: 139.09},
    {label: 'Fridge', failAt: 140.37},
  ];

  return (
    <div className={tripped ? 'spof-home-board tripped' : 'spof-home-board'}>
      <div className="spof-breaker">
        <ShieldAlert size={52} />
        <strong>Main breaker</strong>
        <span>SPOF</span>
      </div>
      <svg className="spof-home-lines" viewBox="0 0 1200 460">
        <path d="M600 210 L210 85 M600 210 L990 85 M600 210 L210 380 M600 210 L990 380" />
      </svg>
      {appliances.map((item, index) => (
        <div key={item.label} className={currentTime >= item.failAt ? `spof-appliance appliance-${index + 1} failed` : `spof-appliance appliance-${index + 1}`}>
          <Server size={34} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const SpofOrderProcessVisual = ({currentTime}: {currentTime: number}) => {
  const active = currentTime >= 179.09 ? 2 : currentTime >= 173.75 ? 1 : currentTime >= 168.71 ? 0 : -1;
  const steps = ['Customers place orders', 'Restaurants prepare meals', 'Partners accept deliveries'];

  return (
    <div className="spof-order-board">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className={index <= active ? 'spof-order-step active' : 'spof-order-step'}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
          {index < steps.length - 1 ? <div className={index < active ? 'spof-order-arrow active' : 'spof-order-arrow'}>=&gt;</div> : null}
        </React.Fragment>
      ))}
    </div>
  );
};

const WarningBadge = ({visible}: {visible: boolean}) => (
  <span className={visible ? 'spof-warning-badge visible' : 'spof-warning-badge'}>
    <AlertTriangle size={24} />
  </span>
);

const SpofBrokenDatabaseVisual = ({currentTime}: {currentTime: number}) => {
  const dbBroken = currentTime >= 188.85;
  const loginFailed = currentTime >= 194.67;
  const ordersZero = currentTime >= 198.0;
  const paymentFailed = currentTime >= 200.4;
  const serversHealthy = currentTime >= 203.77;
  const mobileResponsive = currentTime >= 207.43;
  const down = currentTime >= 212.85;
  const converging = currentTime >= 213.2;
  const spofReveal = currentTime >= 217.6;

  return (
    <div className={down ? 'spof-scenario-board down' : 'spof-scenario-board'}>
      <svg className="spof-fooddash-lines" viewBox="0 0 1320 560">
        <path className={down ? 'dim' : ''} d="M130 230 H300 H470" />
        <path className={down ? 'dim' : ''} d="M470 210 H650" />
        <path className={down ? 'dim' : ''} d="M470 260 H650" />
        <path className={down ? 'dim' : ''} d="M890 225 H1068" />
        <path className={down ? 'dim' : ''} d="M890 275 H1068" />
        <path className={converging ? 'dependency active' : 'dependency'} d="M240 378 C440 334 710 296 950 220" />
        <path className={converging ? 'dependency active' : 'dependency'} d="M410 378 C560 350 770 310 950 238" />
        <path className={converging ? 'dependency active' : 'dependency'} d="M580 378 C690 350 820 318 950 256" />
        <path className={converging ? 'dependency active' : 'dependency'} d="M750 378 C840 330 900 292 950 274" />
      </svg>

      <div className={down ? 'spof-service-node user-app dimmed' : 'spof-service-node user-app'}>
        <Smartphone size={44} />
        <strong>User App</strong>
        <span>{mobileResponsive ? 'responsive' : 'healthy'}</span>
      </div>

      <div className={down ? 'spof-service-node load-balancer dimmed' : 'spof-service-node load-balancer'}>
        <GitBranch size={42} />
        <strong>Load Balancer</strong>
        <span>healthy</span>
      </div>

      <div className={serversHealthy ? 'spof-web-tier zoomed' : down ? 'spof-web-tier dimmed' : 'spof-web-tier'}>
        <div className="spof-web-server">
          <Server size={36} />
          <strong>Web 1</strong>
          <span>Healthy</span>
          <div className="spof-cpu-bars"><i /><i /><i /></div>
        </div>
        <div className="spof-web-server">
          <Server size={36} />
          <strong>Web 2</strong>
          <span>Healthy</span>
          <div className="spof-cpu-bars"><i /><i /><i /></div>
        </div>
      </div>

      <div className={dbBroken ? 'spof-database-node broken' : 'spof-database-node'}>
        {dbBroken ? <XCircle size={62} /> : <Database size={54} />}
        <strong>Database</strong>
        <span>{dbBroken ? 'crashed' : 'healthy'}</span>
        <div className={dbBroken ? 'spof-db-failure-pulse visible' : 'spof-db-failure-pulse'} />
        <div className={spofReveal ? 'spof-spof-label visible' : 'spof-spof-label'}>Single Point of Failure</div>
      </div>

      <div className={loginFailed ? 'spof-failure-card login visible' : 'spof-failure-card login'}>
        <XCircle size={28} />
        <strong>Login Failed</strong>
      </div>

      <div className={ordersZero ? 'spof-order-metric visible' : 'spof-order-metric'}>
        <ShoppingCart size={28} />
        <strong>Orders/min</strong>
        <span><b>120</b> =&gt; <b>0</b></span>
      </div>

      <div className={paymentFailed ? 'spof-failure-card payment visible' : 'spof-failure-card payment'}>
        <XCircle size={28} />
        <strong>Payment Failed</strong>
      </div>

      <div className={mobileResponsive ? 'spof-mobile-screen visible' : 'spof-mobile-screen'}>
        <div className="spof-phone-frame">
          <span />
          <span />
          <span />
          <small>Unable to fetch data</small>
        </div>
      </div>

      {['Login', 'Orders', 'Payments', 'Search'].map((label, index) => (
        <div key={label} className={converging ? `spof-request-chip chip-${index + 1} visible` : `spof-request-chip chip-${index + 1}`}>
          {label}
        </div>
      ))}

      <div className={down ? 'spof-platform-dead visible' : 'spof-platform-dead'}>Platform effectively dead</div>
    </div>
  );
};

const SpofHiddenComparisonVisual = ({currentTime}: {currentTime: number}) => {
  const rightActive = currentTime >= 252.39;
  const dbSpoF = currentTime >= 266.81;

  return (
    <div className="spof-compare-board">
      <div className="spof-arch-panel">
        <h3>Obvious SPOF</h3>
        <div className="spof-arch-graph single">
          <svg className="spof-arch-lines" viewBox="0 0 520 300">
            <path d="M95 150 H250 H405" />
          </svg>
          <div className="spof-graph-node client">
            <Smartphone size={34} />
            <strong>Client</strong>
          </div>
          <div className={currentTime >= 244.21 ? 'spof-graph-node server active' : 'spof-graph-node server'}>
            <Server size={38} />
            <strong>One Server</strong>
            <WarningBadge visible={currentTime >= 244.21} />
          </div>
          <div className={currentTime >= 244.21 ? 'spof-graph-node database active' : 'spof-graph-node database'}>
            <Database size={38} />
            <strong>One DB</strong>
            <WarningBadge visible={currentTime >= 244.21} />
          </div>
          <div className={currentTime >= 249.37 ? 'spof-outage-chip visible' : 'spof-outage-chip'}>Either fails = outage</div>
        </div>
      </div>
      <div className={rightActive ? 'spof-arch-panel active' : 'spof-arch-panel'}>
        <h3>Looks Redundant</h3>
        <div className="spof-arch-graph redundant">
          <svg className="spof-arch-lines" viewBox="0 0 520 300">
            <path d="M86 150 C155 70 205 70 260 105" />
            <path d="M86 150 C155 230 205 230 260 195" />
            <path d="M320 105 C380 105 400 130 430 150" />
            <path d="M320 195 C380 195 400 170 430 150" />
          </svg>
          <div className="spof-graph-node client">
            <Smartphone size={34} />
            <strong>Clients</strong>
          </div>
          <div className={rightActive ? 'spof-graph-node app app-a active' : 'spof-graph-node app app-a'}>
            <Server size={34} />
            <strong>App A</strong>
          </div>
          <div className={rightActive ? 'spof-graph-node app app-b active' : 'spof-graph-node app app-b'}>
            <Server size={34} />
            <strong>App B</strong>
          </div>
          <div className={dbSpoF ? 'spof-graph-node database shared spof' : 'spof-graph-node database shared'}>
            <Database size={38} />
            <strong>Shared DB</strong>
            <WarningBadge visible={dbSpoF} />
          </div>
          <div className={dbSpoF ? 'spof-shared-label visible' : 'spof-shared-label'}>Still one fatal dependency</div>
        </div>
        <p>{dbSpoF ? 'Database is still the SPOF' : 'Two web servers, one shared dependency'}</p>
      </div>
    </div>
  );
};

const SpofFailureChainVisual = ({currentTime}: {currentTime: number}) => {
  const rows = [
    ['frontend fails', 'UI breaks', 288.71, Smartphone],
    ['backend fails', 'logic fails', 291.15, Server],
    ['database fails', 'txns stop', 293.89, Database],
    ['payment fails', 'user blocked', 300.09, CreditCard],
    ['email fails', 'msg delivery fails', 304.59, Mail],
  ] as const;

  return (
    <div className="spof-chain-board">
      {rows.map(([left, right, at, Icon]) => (
        <div key={left} className={currentTime >= at ? 'spof-chain-row active' : 'spof-chain-row'}>
          <Icon size={38} />
          <strong>{left}</strong>
          <span>=&gt;</span>
          <p>{right}</p>
        </div>
      ))}
    </div>
  );
};

const SpofDisappearQuestionVisual = ({currentTime}: {currentTime: number}) => (
  <div className="spof-disappear-board">
    <div className="spof-heuristic-graph">
      <svg className="spof-heuristic-lines" viewBox="0 0 1100 470">
        <path d="M145 235 H335" />
        <path className={currentTime >= 323.91 ? 'broken' : ''} d="M455 235 H650" />
        <path className={currentTime >= 323.91 ? 'broken' : ''} d="M770 235 H955" />
        <path className={currentTime >= 323.91 ? 'broken' : ''} d="M710 295 V390" />
      </svg>
      <div className="spof-heuristic-node client">
        <Smartphone size={38} />
        <strong>Client</strong>
      </div>
      <div className={currentTime >= 320.81 ? 'spof-heuristic-node selected' : 'spof-heuristic-node'}>
        <Server size={42} />
        <strong>Component</strong>
        <small>{currentTime >= 323.91 ? 'disappears' : 'inspect this'}</small>
      </div>
      <div className={currentTime >= 323.91 ? 'spof-heuristic-node dependent broken' : 'spof-heuristic-node dependent'}>
        <Database size={42} />
        <strong>Database</strong>
      </div>
      <div className={currentTime >= 323.91 ? 'spof-heuristic-node api broken' : 'spof-heuristic-node api'}>
        <CreditCard size={42} />
        <strong>Payments</strong>
      </div>
      <div className={currentTime >= 323.91 ? 'spof-heuristic-node queue broken' : 'spof-heuristic-node queue'}>
        <GitBranch size={42} />
        <strong>Jobs</strong>
      </div>
      <div className={currentTime >= 323.91 ? 'spof-heuristic-question active' : 'spof-heuristic-question'}>
        What if this component suddenly disappears?
      </div>
      <div className={currentTime >= 325.2 ? 'spof-heuristic-result visible' : 'spof-heuristic-result'}>
        Trace the blast radius
      </div>
    </div>
  </div>
);

const SpofFoodDashScanVisual = ({currentTime}: {currentTime: number}) => {
  const active = currentTime >= 333.45 ? 2 : currentTime >= 331.29 ? 1 : currentTime >= 329.65 ? 0 : -1;
  const nodes = [
    ['Server', Server],
    ['Network switch', GitBranch],
    ['Cloud region', Cloud],
  ] as const;

  return (
    <div className="spof-scan-architecture">
      {nodes.map(([label, Icon], index) => (
        <div key={label} className={index === active ? 'spof-scan-node active' : 'spof-scan-node'}>
          <Icon size={48} />
          <strong>{label}</strong>
          <WarningBadge visible={index === active} />
        </div>
      ))}
      <svg className="spof-scan-lines" viewBox="0 0 1100 360">
        <path d="M170 180 C330 70 470 70 550 180 C630 290 770 290 930 180" />
      </svg>
      <div className={currentTime >= 336.87 ? 'spof-scan-result visible' : 'spof-scan-result'}>Hidden SPOF identified</div>
    </div>
  );
};

const SpofCentralQuoteVisual = ({currentTime}: {currentTime: number}) => (
  <div className="spof-central-quote-board">
    <Card>
      <h2>{currentTime >= 365.01 ? 'Eliminating dependency on any single component, process, or person' : 'SPOFs are not always technical'}</h2>
      <p>{currentTime >= 347.53 && currentTime < 365.01 ? 'Servers, networks, databases... and organizational bottlenecks.' : 'Good engineering is infrastructure plus process design.'}</p>
    </Card>
  </div>
);

const SpofHumanCloudVisual = ({currentTime}: {currentTime: number}) => {
  const items = [
    ['One engineer understands deployment pipeline', 376.21],
    ['One individual has prod DB recovery credentials', 385.71],
    ['Unavailable or in flight = business cannot recover', 392.15],
  ];

  return (
    <div className="spof-human-cloud-board">
      <div className="spof-cloud-sketch">
        <div className="spof-cloud-band edge">Edge</div>
        <div className="spof-cloud-band app">App tier</div>
        <div className="spof-cloud-band data">Data + async</div>
        <div className="spof-cloud-band ops">Ops</div>
        <svg className="spof-cloud-lines" viewBox="0 0 620 470">
          <path className="request" d="M70 70 H175 H310 H485" />
          <path className="request" d="M485 70 V150" />
          <path className="request" d="M485 150 C390 138 335 138 270 175" />
          <path className="request" d="M485 150 C390 202 335 202 270 225" />
          <path className="data" d="M270 175 H110" />
          <path className="data" d="M270 225 C330 255 380 255 455 245" />
          <path className="async" d="M270 225 V330 H455" />
          <path className="async" d="M455 330 H555 V250" />
          <path className="replica" d="M455 245 V372" />
          <path className="telemetry" d="M270 175 C350 120 430 112 535 112" />
          <path className="telemetry" d="M455 330 C486 376 510 388 535 418" />
        </svg>
        {[
          ['Users', 'users'],
          ['DNS / CDN', 'cdn'],
          ['WAF', 'waf'],
          ['API Gateway', 'gateway'],
          ['Load Balancer', 'global-lb'],
          ['App A', 'app-a'],
          ['App B', 'app-b'],
          ['Cache', 'cache'],
          ['Primary DB', 'primary-db'],
          ['Replica DB', 'replica-db'],
          ['Queue', 'queue'],
          ['Workers', 'workers'],
          ['Backups', 'backups'],
          ['Metrics', 'metrics'],
          ['Alerts', 'alerts'],
        ].map(([label, className]) => (
          <span key={label} className={`spof-cloud-node ${className}`}>{label}</span>
        ))}
        <div className="spof-cloud-caption request">Request path</div>
        <div className="spof-cloud-caption support">Support systems</div>
      </div>
      <div className="spof-human-list">
        {items.map(([label, at], index) => (
          <div key={label} className={currentTime >= Number(at) ? `spof-human-item item-${index + 1} active` : `spof-human-item item-${index + 1}`}>
            <User size={34} />
            <strong>{label}</strong>
          </div>
        ))}
        <div className={currentTime >= 399.03 ? 'spof-human-final visible' : 'spof-human-final'}>Massive operational SPOF</div>
      </div>
    </div>
  );
};

const SpofTechHumanVisual = ({currentTime}: {currentTime: number}) => {
  const warnTech = currentTime >= 412.25;
  const warnHuman = currentTime >= 413.45;
  return (
    <div className="spof-simple-system">
      <div className="spof-simple-node">
        <Server size={48} />
        <strong>Server</strong>
        <WarningBadge visible={warnTech} />
      </div>
      <div className="spof-simple-node">
        <Database size={48} />
        <strong>Database</strong>
        <WarningBadge visible={warnTech} />
      </div>
      <div className="spof-simple-node">
        <User size={48} />
        <strong>Engineer</strong>
        <WarningBadge visible={warnHuman} />
      </div>
    </div>
  );
};

const SpofFirstStepVisual = () => (
  <div className="spof-checklist-board">
    {['Find SPOFs', 'Document Risks', 'Remove Vulnerabilities'].map((item, index) => (
      <div key={item} className={index === 0 ? 'spof-check-row active' : 'spof-check-row'}>
        <CheckCircle2 size={38} />
        <strong>{item}</strong>
        <span>{index < 2 ? 'done' : 'pending'}</span>
      </div>
    ))}
  </div>
);

const SpofCanvasVisual = ({filled, warnings = false}: {filled?: boolean; warnings?: boolean}) => (
  <div className="spof-canvas-board">
    <Pencil className="spof-pencil" size={58} />
    <div className="spof-canvas">
      {filled ? (
        <>
          <div className="spof-canvas-node lb">Load Balancer</div>
          <div className="spof-canvas-node app-a">App A</div>
          <div className="spof-canvas-node app-b">App B</div>
          <div className="spof-canvas-node db">Replicated DB</div>
        </>
      ) : null}
      {warnings ? ['Database', 'Engineer', 'Single Server'].map((item, index) => (
        <div key={item} className={`spof-hidden-warning warning-${index + 1}`}>
          <AlertTriangle size={28} />
          {item}
        </div>
      )) : null}
    </div>
  </div>
);

const SpofOwnWallsVisual = () => (
  <div className="spof-own-walls-box">
    <h2>Within Your Own Walls</h2>
    <div className="spof-simple-system mini">
      <div className="spof-simple-node"><Server size={38} /><strong>Server</strong></div>
      <div className="spof-simple-node"><Database size={38} /><strong>Database</strong></div>
      <div className="spof-simple-node"><User size={38} /><strong>Engineer</strong></div>
    </div>
  </div>
);

const SpofFailurePathsVisual = ({currentTime}: {currentTime: number}) => (
  <div className="spof-paths-board">
    <h2>Every SPOF = Another Failure Path</h2>
    {[430.27, 431.4, 432.5, 433.4].map((at, index) => (
      <AlertTriangle key={at} className={currentTime >= at ? `spof-path-marker marker-${index + 1} visible` : `spof-path-marker marker-${index + 1}`} size={46} />
    ))}
  </div>
);

const SpofFragilityMeterVisual = ({currentTime}: {currentTime: number}) => (
  <div className="spof-meter-board">
    <div className="spof-meter">
      <span>Stable</span>
      <div className="spof-meter-track">
        <div className="spof-meter-fill" style={{width: `${currentTime >= 437.0 ? 86 : currentTime >= 435.8 ? 58 : 28}%`}} />
      </div>
      <span>Fragile</span>
    </div>
    <p>More unmitigated dependencies = more fragility</p>
  </div>
);

const SpofMinimizeDependenciesVisual = () => (
  <div className="spof-modern-board">
    <div className="spof-modern-node crossed"><Server size={42} /><span>Single server</span></div>
    <div className="spof-modern-node"><Server size={42} /><span>App A</span></div>
    <div className="spof-modern-node"><Server size={42} /><span>App B</span></div>
    <div className="spof-modern-node"><Database size={42} /><span>Replicated DB</span></div>
    <h2>Design to Minimize Dependencies</h2>
  </div>
);

const SpofScanCardsVisual = ({currentTime}: {currentTime: number}) => {
  const active = currentTime >= 448.4 ? 3 : currentTime >= 446.8 ? 2 : currentTime >= 445.2 ? 1 : 0;
  const cards = [
    ['Infrastructure', Server],
    ['Software', Code2],
    ['Vendors', CreditCard],
    ['Processes', Wrench],
  ] as const;

  return (
    <div className="spof-card-scan-board">
      {cards.map(([label, Icon], index) => (
        <div key={label} className={index === active ? 'spof-scan-card active' : 'spof-scan-card'}>
          <Icon size={44} />
          <strong>{label}</strong>
          {index === active ? <Search className="spof-card-magnifier" size={42} /> : null}
        </div>
      ))}
    </div>
  );
};

const SpofCompleteChecklistVisual = () => (
  <div className="spof-checklist-board complete">
    {['Find SPOFs', 'Assess Risk', 'Remove Dependencies'].map((item) => (
      <div key={item} className="spof-check-row active">
        <CheckCircle2 size={38} />
        <strong>{item}</strong>
        <span>done</span>
      </div>
    ))}
  </div>
);

const SpofLearnedTitleVisual = () => (
  <div className="spof-learned-title">
    <h2>What Did We Learn?</h2>
  </div>
);

const SpofSummaryTakedownVisual = () => (
  <div className="spof-summary-board">
    <div className="spof-summary-flow"><Server size={58} /><span>=&gt;</span><XCircle size={58} /></div>
    <h2>A SPOF can take down everything.</h2>
  </div>
);

const SpofSummaryEverywhereVisual = ({currentTime}: {currentTime: number}) => {
  const items = [
    ['Server', Server, 459.07],
    ['Code', Code2, 461.29],
    ['Third-party API', CreditCard, 462.7],
    ['Engineer', User, 464.2],
  ] as const;
  return (
    <div className="spof-everywhere-board">
      {items.map(([label, Icon, at]) => (
        <div key={label} className={currentTime >= at ? 'spof-everywhere-card visible' : 'spof-everywhere-card'}>
          <Icon size={46} />
          <strong>{label}</strong>
        </div>
      ))}
      <h2>SPOFs hide everywhere.</h2>
    </div>
  );
};

const SpofSummaryMinimizeVisual = () => (
  <div className="spof-modern-board summary">
    <div className="spof-modern-node crossed"><Database size={42} /><span>Single DB</span></div>
    <div className="spof-modern-node"><Database size={42} /><span>Replica A</span></div>
    <div className="spof-modern-node"><Database size={42} /><span>Replica B</span></div>
    <h2>Minimize Critical Dependencies.</h2>
  </div>
);

const SpofSummaryFoundationVisual = () => (
  <div className="spof-foundation-board">
    <div className="spof-foundation-top">High Availability</div>
    <div className="spof-foundation-base">Identify SPOFs</div>
  </div>
);

const SpofTimelineVisual = ({next = false}: {next?: boolean}) => (
  <div className="spof-series-timeline">
    {['Availability', 'SPOF', 'Redundancy'].map((item, index) => (
      <div key={item} className={(next && index === 2) || (!next && index === 1) ? 'spof-series-step active' : index < 2 ? 'spof-series-step complete' : 'spof-series-step'}>
        <span>{index + 1}</span>
        <strong>{item}</strong>
      </div>
    ))}
    {next ? <h2>Next Episode: Redundancy</h2> : null}
  </div>
);

const SpofRedundancyPreviewVisual = () => (
  <div className="spof-redundancy-preview-board">
    <div className="spof-modern-node crossed"><Server size={48} /><span>Single server</span></div>
    <div className="spof-arrow-label">Failure Prevention =&gt; Redundancy</div>
    <div className="spof-server-pair large"><Server size={54} /><Server size={54} /></div>
  </div>
);

const SpofSubscribeVisual = () => (
  <div className="closing-board">
    <div className="closing-copy">
      <h2>Engineering Systems</h2>
      <p>Subscribe for the availability pattern series</p>
      <div className="closing-actions">
        <span className="subscribe-pill"><Bell size={36} />Subscribed</span>
        <span className="like-pill"><ThumbsUp size={36} /></span>
      </div>
    </div>
  </div>
);

const SpofFinalQuestionVisual = () => (
  <div className="spof-final-question-board">
    <div className="spof-final-architecture">
      <svg className="spof-final-lines" viewBox="0 0 1180 430">
        <path d="M90 210 H250 H425" />
        <path d="M425 210 C520 105 650 105 760 155" />
        <path d="M425 210 C520 315 650 315 760 265" />
        <path className="hidden" d="M760 155 L930 210 L760 265" />
        <path className="hidden" d="M930 210 H1085" />
      </svg>
      <div className="spof-final-node client"><Smartphone size={36} /><strong>Users</strong></div>
      <div className="spof-final-node gateway"><Globe size={36} /><strong>Gateway</strong></div>
      <div className="spof-final-node app-a"><Server size={38} /><strong>App A</strong></div>
      <div className="spof-final-node app-b"><Server size={38} /><strong>App B</strong></div>
      <div className="spof-final-node hidden">
        <Database size={44} />
        <strong>Hidden dependency</strong>
        <AlertTriangle size={34} />
      </div>
      <div className="spof-final-node downstream"><CreditCard size={36} /><strong>Business flow</strong></div>
    </div>
    <div className="spof-final-question-copy">
      <h2>What is the one hidden component your architecture relies on?</h2>
      <p>Find it before it becomes the outage.</p>
    </div>
  </div>
);

const AvailabilityIntroVisual = () => (
  <div className="intro-board">
    <Card>
      <Server size={72} />
      <h2>Availability Patterns</h2>
      <p>Why some systems never sleep, even when parts fail.</p>
    </Card>
  </div>
);

const AvailabilitySeriesShiftVisual = () => (
  <div className="shift-board">
    <Card>
      <Database size={62} />
      <h2>Consistency</h2>
      <p>Are users seeing the right data?</p>
    </Card>
    <div className="chalk-arrow">=&gt;</div>
    <Card className="inverted-card">
      <Globe size={62} />
      <h2>Availability</h2>
      <p>Can users reach the system?</p>
    </Card>
  </div>
);

const AvailabilityPillarVisual = () => (
  <div className="pillar-board">
    <Card>
      <Globe size={62} />
      <h2>Real World</h2>
      <p>Traffic spikes, machines fail, networks split.</p>
    </Card>
    <Card className="inverted-card">
      <ShieldAlert size={62} />
      <h2>Still Serving</h2>
      <p>The product keeps responding.</p>
    </Card>
  </div>
);

const AvailabilityRoadmapVisual = ({currentTime}: {currentTime: number}) => {
  const active = Math.min(
    availabilityRoadmap.length - 1,
    Math.max(0, Math.floor(((currentTime - 34.98) / (51.86 - 34.98)) * availabilityRoadmap.length)),
  );

  return (
    <div className="agenda-board availability-roadmap-board">
      {availabilityRoadmap.map((item, index) => (
        <div key={item} className={index <= active ? 'agenda-item active' : 'agenda-item'}>
          <span>{index + 1}</span>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

const ConsistencyVsAvailabilityVisual = () => (
  <div className="availability-compare-board">
    <Card>
      <Database size={58} />
      <h2>Consistency</h2>
      <p>Correct data</p>
    </Card>
    <div className="chalk-arrow">vs</div>
    <Card className="inverted-card">
      <Globe size={58} />
      <h2>Availability</h2>
      <p>Reachable service</p>
    </Card>
  </div>
);

const ConsistencySideVisual = () => (
  <div className="replica-board">
    {['Replica A', 'Replica B', 'Replica C'].map((label) => (
      <Card key={label} className="replica-card">
        <Database size={46} />
        <h2>{label}</h2>
        <p>same value</p>
      </Card>
    ))}
    <div className="replica-sync-line">perfectly synchronized</div>
  </div>
);

const AvailabilityCatchVisual = () => (
  <div className="catch-board">
    <Card>
      <Database size={58} />
      <h2>Perfectly Correct</h2>
      <p>Every replica agrees.</p>
    </Card>
    <div className="chalk-arrow">but</div>
    <Card className="danger-card">
      <XCircle size={58} />
      <h2>Unreachable</h2>
      <p>Users cannot get to it.</p>
    </Card>
  </div>
);

const AvailabilityDefinitionVisual = () => (
  <div className="definition-board">
    <Card className="inverted-card">
      <h2>Availability</h2>
      <p>System successfully responds to user requests.</p>
    </Card>
    <div className="definition-formula">
      <span>request</span>
      <strong>=&gt;</strong>
      <span>useful response</span>
    </div>
  </div>
);

const RequestResponseVisual = () => (
  <div className="request-board">
    <Card>
      <UserCheck size={52} />
      <h2>User</h2>
      <p>sends request</p>
    </Card>
    <div className="request-line">
      <span>request</span>
      <strong>response</strong>
    </div>
    <Card className="inverted-card">
      <Server size={52} />
      <h2>System</h2>
      <p>responds correctly</p>
    </Card>
  </div>
);

const TimeoutUnavailableVisual = () => (
  <div className="request-board">
    <Card>
      <UserCheck size={52} />
      <h2>User</h2>
      <p>waits</p>
    </Card>
    <div className="request-line broken">
      <span>timeout</span>
      <strong>error</strong>
    </div>
    <Card className="danger-card">
      <XCircle size={52} />
      <h2>Unavailable</h2>
      <p>no useful response</p>
    </Card>
  </div>
);

const AvailabilityAtScaleVisual = () => (
  <div className="scale-measure-board">
    <Card>
      <LineChart size={58} />
      <h2>Millions</h2>
      <p>of requests over time</p>
    </Card>
    <Card className="inverted-card">
      <h2>99.9%</h2>
      <p>availability target</p>
    </Card>
  </div>
);

const NinesVisual = ({currentTime}: {currentTime: number}) => {
  const rows = [
    ['99%', 'days'],
    ['99.9%', 'hours'],
    ['99.99%', 'minutes'],
    ['99.999%', 'few minutes'],
  ];
  const active = currentTime < 131.34 ? 0 : currentTime < 137.54 ? 1 : currentTime < 142.58 ? 2 : 3;

  return (
    <div className="nines-board">
      {rows.map(([target, budget], index) => (
        <div key={target} className={index === active ? 'nine-row active' : 'nine-row'}>
          <strong>{target}</strong>
          <span>{budget}</span>
        </div>
      ))}
    </div>
  );
};

const FoodDashMapVisual = () => (
  <div className="fooddash-board">
    <div className="shop-node">
      <ShoppingCart size={58} />
      <strong>FoodDash</strong>
    </div>
    {['Users', 'Restaurants', 'Drivers', 'Payments'].map((label, index) => (
      <div key={label} className={index === 0 ? 'food-node active' : 'food-node'}>
        <Server size={34} />
        <span>{label}</span>
      </div>
    ))}
    <svg className="commerce-lines" viewBox="0 0 1200 420">
      <path d="M600 210 L205 80 M600 210 L1010 80 M600 210 L190 330 M600 210 L1000 330" />
    </svg>
  </div>
);

const FoodDashRushVisual = () => (
  <div className="rush-board">
    <Card className="inverted-card">
      <Clock size={58} />
      <h2>8pm</h2>
      <p>dinner rush</p>
    </Card>
    <Card>
      <LineChart size={58} />
      <h2>Peak Traffic</h2>
      <p>requests climb at the worst possible time</p>
    </Card>
  </div>
);

const FoodDashJourneyVisual = () => (
  <div className="journey-board">
    {['Open app', 'Browse', 'Cart', 'Place order'].map((item, index) => (
      <div key={item} className={index === 3 ? 'journey-step active' : 'journey-step'}>
        <span>{index + 1}</span>
        <strong>{item}</strong>
      </div>
    ))}
  </div>
);

const OutageBlastVisual = () => (
  <div className="outage-board">
    <Card className="danger-card">
      <Server size={62} />
      <h2>Server Fails</h2>
      <p>critical path goes dark</p>
    </Card>
    <div className="blast-rings">
      <span />
      <span />
      <span />
    </div>
  </div>
);

const ServiceUnavailableVisual = () => (
  <div className="service-unavailable-board">
    <Card className="danger-card">
      <XCircle size={70} />
      <h2>Service Unavailable</h2>
      <p>10 minutes at peak traffic</p>
    </Card>
  </div>
);

const OutageImpactVisual = () => (
  <div className="impact-board">
    {['Customers leave', 'Kitchens idle', 'Drivers wait'].map((item) => (
      <div key={item} className="impact-row">
        <XCircle size={42} />
        <strong>{item}</strong>
      </div>
    ))}
  </div>
);

const BusinessConcernVisual = () => (
  <div className="business-board">
    <Card>
      <LineChart size={58} />
      <h2>Revenue</h2>
      <p>falls in real time</p>
    </Card>
    <Card className="inverted-card">
      <ShieldAlert size={58} />
      <h2>Trust</h2>
      <p>breaks quickly</p>
    </Card>
  </div>
);

const DowntimeCostVisual = () => (
  <div className="cost-board">
    <Card>
      <Clock size={62} />
      <h2>10 minutes</h2>
      <p>at the wrong time</p>
    </Card>
    <div className="chalk-arrow">=&gt;</div>
    <Card className="danger-card">
      <h2>Millions</h2>
      <p>in business impact</p>
    </Card>
  </div>
);

const FailureQuestionVisual = () => (
  <div className="question-board">
    <Card>
      <h2>100% availability?</h2>
      <div className="question-options">
        <span>guaranteed?</span>
        <span>forever?</span>
      </div>
      <p>The answer decides the architecture.</p>
    </Card>
  </div>
);

const RealityBreaksVisual = () => (
  <div className="reality-board">
    <Card>
      <Globe size={62} />
      <h2>Physical Reality</h2>
      <p>systems run on real machines, networks, and power</p>
    </Card>
    <div className="chalk-arrow">breaks</div>
  </div>
);

const FailureListVisual = ({currentTime}: {currentTime: number}) => {
  const first = currentTime < 259.6;
  const items = first
    ? ['Hardware fails', 'Drives crash', 'Cables cut', 'Power outage']
    : ['Region outage', 'Software bug', 'Bad deploy', 'Human mistake'];

  return (
    <div className="failure-list-board">
      {items.map((item, index) => (
        <div key={item} className={index === 0 ? 'failure-chip active' : 'failure-chip'}>
          <XCircle size={34} />
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  );
};

const FailureExpectedVisual = () => (
  <div className="expected-board">
    <Card className="danger-card">
      <h2>Prevent Every Failure?</h2>
      <p>not a realistic design goal</p>
    </Card>
    <div className="chalk-arrow">=&gt;</div>
    <Card className="inverted-card">
      <h2>Expect Failure</h2>
      <p>and keep serving</p>
    </Card>
  </div>
);

const AvailabilityMindsetVisual = () => (
  <div className="mindset-board">
    <Card className="inverted-card">
      <h2>Keep Working</h2>
      <p>when failures occur</p>
    </Card>
  </div>
);

const PatternsToolkitVisual = () => (
  <div className="toolkit-board">
    {availabilityPatterns.slice(0, 4).map(({title, detail, icon: Icon}) => (
      <Card key={title} className="toolkit-card">
        <Icon size={42} />
        <h2>{title}</h2>
        <p>{detail}</p>
      </Card>
    ))}
  </div>
);

const PatternsPurposeVisual = () => (
  <div className="patterns-purpose-board">
    <Card>
      <Server size={58} />
      <h2>Part Fails</h2>
      <p>local damage</p>
    </Card>
    <div className="chalk-arrow">but</div>
    <Card className="inverted-card">
      <Globe size={58} />
      <h2>System Serves</h2>
      <p>users still get responses</p>
    </Card>
  </div>
);

const RedundancyPatternVisual = () => (
  <div className="redundancy-board">
    {['Server A', 'Server B', 'Server C'].map((item, index) => (
      <Card key={item} className={index === 0 ? 'server-card failing' : 'server-card active'}>
        {index === 0 ? <XCircle size={46} /> : <CheckCircle2 size={46} />}
        <h2>{item}</h2>
        <p>{index === 0 ? 'failed' : 'serving'}</p>
      </Card>
    ))}
  </div>
);

const PatternGridVisual = () => (
  <div className="toolkit-board">
    {availabilityPatterns.slice(1, 5).map(({title, detail, icon: Icon}) => (
      <Card key={title} className="toolkit-card">
        <Icon size={42} />
        <h2>{title}</h2>
        <p>{detail}</p>
      </Card>
    ))}
  </div>
);

const FailureIsolationVisual = () => (
  <div className="isolation-board">
    {['Search', 'Payments', 'Reviews', 'Orders'].map((item, index) => (
      <div key={item} className={index === 2 ? 'isolation-service failed' : 'isolation-service'}>
        {index === 2 ? <XCircle size={36} /> : <CheckCircle2 size={36} />}
        <strong>{item}</strong>
      </div>
    ))}
  </div>
);

const SpofIntroVisual = () => (
  <div className="spof-intro-board">
    <Card>
      <ShieldAlert size={60} />
      <h2>How does it break?</h2>
      <p>Trace the component that can stop everything.</p>
    </Card>
  </div>
);

const SingleServerVisual = () => (
  <div className="single-server-board">
    <div className="single-server-core">
      <Server size={78} />
      <strong>One massive server</strong>
    </div>
    {['Users', 'Orders', 'Payments', 'Restaurants'].map((item) => (
      <span key={item}>{item}</span>
    ))}
  </div>
);

const CrashOfflineVisual = () => (
  <div className="single-server-board crashed">
    <div className="single-server-core">
      <XCircle size={84} />
      <strong>server crashed</strong>
    </div>
    {['Users', 'Orders', 'Payments', 'Restaurants'].map((item) => (
      <span key={item}>{item}</span>
    ))}
  </div>
);

const SpofDefinitionVisual = () => (
  <div className="definition-board">
    <Card className="danger-card">
      <h2>Single Point Of Failure</h2>
      <p>One component fails, the entire system goes down.</p>
    </Card>
  </div>
);

const RemoveSpofVisual = () => (
  <div className="redundancy-board">
    {['Server A', 'Server B', 'Server C'].map((item) => (
      <Card key={item} className="server-card active">
        <Server size={46} />
        <h2>{item}</h2>
        <p>shared load</p>
      </Card>
    ))}
  </div>
);

const CatastropheGoalVisual = () => (
  <div className="expected-board">
    <Card className="danger-card">
      <h2>Failure</h2>
      <p>will happen</p>
    </Card>
    <div className="chalk-arrow">!=</div>
    <Card className="inverted-card">
      <h2>Catastrophe</h2>
      <p>must be avoided</p>
    </Card>
  </div>
);

const UserNeverNoticesVisual = () => (
  <div className="user-impact-board">
    <Card className="inverted-card">
      <ShoppingCart size={58} />
      <h2>Order Placed</h2>
      <p>server failed, user flow survived</p>
    </Card>
  </div>
);

const RecapAvailabilityVisual = ({currentTime}: {currentTime: number}) => {
  const items = ['Reachability', 'Downtime cost', 'Failure reality', 'Patterns', 'SPOFs'];
  const active = Math.min(items.length - 1, Math.max(0, Math.floor(((currentTime - 380.48) / (396.04 - 380.48)) * items.length)));

  return (
    <div className="decision-checklist-board">
      {items.map((item, index) => (
        <div key={item} className={index <= active ? 'checklist-row active' : 'checklist-row'}>
          <CheckCircle2 size={42} />
          <div>
            <strong>{item}</strong>
            <p>{index === 0 ? 'users can reach the system' : 'part of availability engineering'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const NextSpofVisual = () => (
  <div className="next-series-board">
    <Card>
      <ShieldAlert size={60} />
      <h2>Next Deep Dive</h2>
      <p>Single points of failure, the first thing to remove.</p>
    </Card>
    <Server className="next-icon one" size={74} />
    <XCircle className="next-icon two" size={84} />
  </div>
);

const FinalQuestionVisual = () => (
  <div className="final-lesson-board">
    <Card>
      <h2>If the system failed now...</h2>
      <div className="decision-pills">
        <span>Who notices?</span>
        <span>What breaks?</span>
        <span>How fast?</span>
      </div>
    </Card>
  </div>
);

const ClosingVisual = () => (
  <div className="closing-board">
    <div className="closing-copy">
      <h2>Thanks for Watching!</h2>
      <p>Please like &amp; Subscribe to Engineering Systems</p>
      <p>(it motivates us to create more such content)</p>
      <p>for more such System Design Deep Dives</p>
      <div className="closing-actions">
        <span className="subscribe-pill">
          <Bell size={36} />
          Subscribed
        </span>
        <span className="like-pill">
          <ThumbsUp size={36} />
        </span>
      </div>
    </div>
  </div>
);

const rrAgenda = ['FoodDash Outage', 'Redundancy & Replication', 'Active-Passive', 'Active-Active', 'Availability Trade-Off'];

const RRSectionVisual = ({beat}: {beat: LessonBeat}) => (
  <div className="spof-section-card rr-section-card">
    <span>Availability Patterns</span>
    <h2>{beat.title}</h2>
    <p>{beat.subtitle}</p>
  </div>
);

const RRDatabaseNode = ({label, state = 'ok'}: {label: string; state?: 'ok' | 'fail' | 'empty' | 'idle' | 'active'}) => (
  <div className={`rr-db-node ${state}`}>
    {state === 'fail' ? <XCircle size={44} /> : state === 'empty' ? <AlertTriangle size={44} /> : <Database size={44} />}
    <strong>{label}</strong>
  </div>
);

const RRFlowNode = ({label, icon: Icon = Server, state = 'ok'}: {label: string; icon?: React.ComponentType<{size?: number}>; state?: 'ok' | 'fail' | 'idle' | 'active'}) => (
  <div className={`rr-flow-node ${state}`}>
    {state === 'fail' ? <XCircle size={38} /> : <Icon size={38} />}
    <strong>{label}</strong>
  </div>
);

const RRIntroVisual = () => (
  <div className="rr-hero">
    <div className="rr-path">
      <span>Availability Patterns</span>
      <strong>Availability -&gt; SPOF -&gt; Redundancy &amp; Replication</strong>
    </div>
    <Database size={92} />
    <h2>Redundancy &amp; Replication</h2>
    <p>Removing the single box without losing the business data inside it.</p>
  </div>
);

const RRRecapVisual = () => (
  <div className="rr-recap-grid">
    <RRFlowNode label="Mobile App" icon={Smartphone} />
    <RRFlowNode label="Web Servers" icon={Server} />
    <RRFlowNode label="Database" icon={Database} state="fail" />
    <div className="rr-wide-note danger">One database failed. The whole platform went down.</div>
  </div>
);

const RRQuestionVisual = () => (
  <div className="spof-question-cloud">
    <Card className="spof-question-card"><h2>Once we find a SPOF, how do we remove it?</h2></Card>
    {['Amazon', 'Netflix', 'Uber', 'Google', 'Servers failing', 'Users still online'].map((item, index) => (
      <div key={item} className={`spof-doodle visible ${index > 3 ? 'danger' : ''} ${['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-left', 'bottom-right'][index]}`}>
        {item}
      </div>
    ))}
  </div>
);

const RRFailureGuaranteedVisual = () => (
  <div className="rr-failure-board">
    <RRFlowNode label="Server" icon={Server} state="fail" />
    <RRFlowNode label="Database" icon={Database} state="fail" />
    <RRFlowNode label="Network" icon={Globe} state="fail" />
    <div className="rr-wide-note">Users still expect service.</div>
    <Card className="danger-card rr-quote"><h2>Failure is not a possibility.</h2><p>It is guaranteed.</p></Card>
  </div>
);

const RRBigTechFailureVisual = ({currentTime}: {currentTime: number}) => {
  const logos = [
    {label: 'Amazon', at: 39.8},
    {label: 'Netflix', at: 40.6},
    {label: 'Uber', at: 41.4},
    {label: 'Google', at: 42.1},
  ];
  const failures = [
    ['Server', Server, 45.5],
    ['Database', Database, 46.2],
    ['Network', Globe, 47.0],
  ] as const;

  return (
    <div className="rr-big-tech-board">
      <div className="rr-logo-cloud">
        {logos.map(({label, at}, index) => (
          <div key={label} className={currentTime >= at ? `rr-logo-pop visible logo-${index + 1}` : `rr-logo-pop logo-${index + 1}`}>
            {label}
          </div>
        ))}
      </div>
      <Card className="rr-big-tech-question">
        <h2>How do they handle failures?</h2>
        <p>Millions of users stay online while components break.</p>
      </Card>
      <div className="rr-failure-strip">
        {failures.map(([label, Icon, at]) => (
          <div key={label} className={currentTime >= at ? 'rr-failure-pill failed' : 'rr-failure-pill'}>
            {currentTime >= at ? <XCircle size={30} /> : <Icon size={30} />}
            <strong>{label}</strong>
          </div>
        ))}
      </div>
      <div className="rr-traffic-dots">
        {Array.from({length: 18}).map((_, index) => <span key={index} />)}
      </div>
    </div>
  );
};

const RRAgendaVisual = ({currentTime}: {currentTime: number}) => {
  const roadmapStarts = [64.4, 67.04, 70.1, 72.94, 75.24];
  let active = 0;
  roadmapStarts.forEach((start, index) => {
    if (currentTime >= start) {
      active = index;
    }
  });

  return (
    <div className="spof-agenda-timeline">
      {rrAgenda.map((item, index) => (
        <div key={item} className={index <= active ? 'spof-timeline-item active' : 'spof-timeline-item'}>
          <span>{index + 1}</span>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

const RRFoodDashFlowVisual = ({failed = false}: {failed?: boolean}) => (
  <div className="rr-flow-board">
    <RRFlowNode label="Customer App" icon={Smartphone} />
    <div className="rr-arrow">-&gt;</div>
    <RRFlowNode label="Web Server" icon={Server} />
    <div className="rr-arrow">-&gt;</div>
    <RRDatabaseNode label="Database" state={failed ? 'fail' : 'ok'} />
    <div className="rr-arrow">-&gt;</div>
    <div className="rr-service-stack">
      {['Restaurant', 'Payment', 'Delivery'].map((item) => <RRFlowNode key={item} label={item} icon={item === 'Payment' ? CreditCard : Globe} state={failed ? 'fail' : 'ok'} />)}
    </div>
    <div className={`rr-wide-note ${failed ? 'danger' : ''}`}>{failed ? 'Orders fail. Payments fail. Login fails. Restaurant updates stop.' : 'Orders | Payments | Login | Restaurant Updates'}</div>
  </div>
);

const RRPostmortemVisual = () => (
  <div className="rr-whiteboard">
    <div className="rr-engineers"><User /><User /><User /></div>
    <Card><h2>Root Cause: Single Database</h2><p>What if we just had another database?</p></Card>
  </div>
);

const RRRedundancyVisual = ({currentTime}: {currentTime: number}) => {
  const duplicate = currentTime >= 127.08;
  const failOne = currentTime >= 130.08;
  const survivingTraffic = currentTime >= 131.46;
  const components = [
    {label: 'DB A', icon: Database, className: 'primary'},
    {label: 'DB B', icon: Database, className: 'backup'},
    {label: 'API 1', icon: Server, className: 'api-one'},
    {label: 'API 2', icon: Server, className: 'api-two'},
    {label: 'Storage', icon: PackageCheck, className: 'storage'},
  ];

  return (
    <div className={`rr-redundancy-field ${duplicate ? 'expanded' : ''} ${failOne ? 'failed-one' : ''} ${survivingTraffic ? 'surviving' : ''}`}>
      <div className="rr-user-burst">
        {Array.from({length: 14}).map((_, index) => <span key={index} />)}
      </div>
      <div className="rr-redundancy-core">
        <Database size={62} />
        <strong>{duplicate ? 'Component Set' : 'One Component'}</strong>
        <span>{duplicate ? 'extra pieces online' : 'fragile by itself'}</span>
      </div>
      <div className="rr-redundancy-ring">
        {components.map(({label, icon: Icon, className}) => (
          <div key={label} className={`rr-redundant-node ${className}`}>
            {failOne && className === 'primary' ? <XCircle size={36} /> : <Icon size={38} />}
            <strong>{label}</strong>
          </div>
        ))}
      </div>
      <div className="rr-survival-lines">
        <span className="line-a" />
        <span className="line-b" />
        <span className="line-c" />
      </div>
      <div className="rr-redundancy-result">
        {survivingTraffic ? 'One piece failed. The system stayed up.' : duplicate ? 'Extra components create room to survive.' : 'One box has nowhere to fail safely.'}
      </div>
    </div>
  );
};

const RRDependencyVisual = () => (
  <div className="rr-before-after">
    <Card><h2>Before</h2><p>System -&gt; One Server</p></Card>
    <Card className="inverted-card"><h2>After</h2><p>System -&gt; Server A / Server B / Server C</p></Card>
  </div>
);

const RRReplicationVisual = () => (
  <div className="rr-replication-board">
    <RRDatabaseNode label="DB A" />
    <div className="rr-record-stream">{['Orders', 'Menus', 'Payments', 'Deliveries'].map((x) => <span key={x}>{x}</span>)}</div>
    <RRDatabaseNode label="DB B" />
  </div>
);

const RRComparisonVisual = ({currentTime}: {currentTime: number}) => {
  const hardwareActive = currentTime >= 191.76;
  const replicationActive = currentTime >= 195.6;
  const readyActive = currentTime >= 198.86;

  return (
    <div className={`rr-hardware-data-board ${hardwareActive ? 'hardware-on' : ''} ${replicationActive ? 'data-on' : ''} ${readyActive ? 'ready-on' : ''}`}>
      <div className="rr-hd-column hardware">
        <div className="rr-hd-title">
          <Server size={34} />
          <strong>Redundancy</strong>
          <span>additional hardware</span>
        </div>
        <div className="rr-hd-machine-grid">
          {['Machine A', 'Machine B', 'Machine C'].map((label, index) => (
            <div key={label} className={`rr-hd-machine machine-${index + 1}`}>
              <Server size={42} />
              <strong>{label}</strong>
              <span>empty capacity</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rr-hd-bridge">
        <div className="rr-hd-plus">+</div>
        <div className="rr-hd-arrow">data fills the spare systems</div>
      </div>

      <div className="rr-hd-column data">
        <div className="rr-hd-title">
          <Database size={34} />
          <strong>Replication</strong>
          <span>actual information</span>
        </div>
        <div className="rr-hd-data-flow">
          <div className="rr-hd-source">
            <Database size={50} />
            <strong>Primary Data</strong>
          </div>
          {['Orders', 'Menus', 'Payments'].map((label, index) => (
            <div key={label} className={`rr-hd-record record-${index + 1}`}>{label}</div>
          ))}
          <div className="rr-hd-target">
            <PackageCheck size={50} />
            <strong>Ready Copy</strong>
          </div>
        </div>
      </div>

      <div className="rr-hd-result">
        {readyActive ? 'Hardware has the information it needs to take over.' : replicationActive ? 'Replication gives the machines useful state.' : 'Redundancy gives us somewhere to run.'}
      </div>
    </div>
  );
};

const RRBusVisual = () => (
  <div className="rr-bus">
    <div className="rr-bus-body">
      {Array.from({length: 8}).map((_, index) => <span key={index} className={index < 5 ? 'filled' : ''}>{index < 5 ? 'data' : 'seat'}</span>)}
    </div>
    <div className="rr-wide-note">Redundancy creates seats. Replication fills them.</div>
  </div>
);

const RRArchitectureVisual = ({failed = false}: {failed?: boolean}) => (
  <div className="rr-arch-board">
    <RRFlowNode label="App" icon={Smartphone} />
    <div className="rr-arrow">-&gt;</div>
    <RRDatabaseNode label="Primary DB" state={failed ? 'fail' : 'active'} />
    <div className="rr-arrow">replicates</div>
    <RRDatabaseNode label="Secondary DB" state="active" />
    <div className="rr-chip-row">{['Orders', 'Payment records', 'Restaurant info'].map((x) => <span key={x}>{x}</span>)}</div>
  </div>
);

const RRActivePassiveVisual = ({mode = 'normal'}: {mode?: 'normal' | 'steps' | 'fail' | 'idle'}) => (
  <div className="rr-arch-board">
    <RRFlowNode label="Traffic" icon={Globe} />
    <div className="rr-arrow">{mode === 'fail' ? '-X-' : '->'}</div>
    <RRDatabaseNode label="Active DB" state={mode === 'fail' ? 'fail' : 'active'} />
    <div className="rr-arrow">{mode === 'fail' ? 'reroute' : 'sync'}</div>
    <RRDatabaseNode label={mode === 'fail' ? 'New Active' : 'Passive DB'} state={mode === 'idle' ? 'idle' : 'active'} />
    <div className="rr-chip-row">
      {(mode === 'steps' ? ['Active database serves users', 'Passive database stays synced', 'Passive is promoted after failure'] : mode === 'idle' ? ['Idle Infrastructure', 'Capacity mostly waits', 'Still costs money'] : ['Active handles traffic', 'Passive stays synced', 'Clear primary. Clear backup.']).map((x) => <span key={x}>{x}</span>)}
    </div>
  </div>
);

const RRActiveActiveVisual = ({mode = 'normal'}: {mode?: 'normal' | 'capacity' | 'fail' | 'benefits'}) => (
  <div className="rr-arch-board active-active">
    <RRFlowNode label="Users" icon={User} />
    <div className="rr-arrow split">=&gt;</div>
    <RRDatabaseNode label={mode === 'capacity' ? 'DB A: Requests 148' : 'DB A'} state={mode === 'fail' ? 'fail' : 'active'} />
    <RRDatabaseNode label={mode === 'capacity' ? 'DB B: Requests 151' : 'DB B'} state="active" />
    <div className="rr-chip-row">
      {(mode === 'benefits' ? ['Better utilization', 'Higher availability', 'Higher scalability'] : mode === 'fail' ? ['No promotion needed', 'DB B absorbs load'] : ['Both systems serve production traffic', 'Both contribute compute capacity']).map((x) => <span key={x}>{x}</span>)}
    </div>
  </div>
);

const RRTradeoffVisual = ({complex = false}: {complex?: boolean}) => (
  <div className="rr-before-after">
    <Card><h2>Active-Passive</h2><p>Simple failover<br />Easier sync<br />Idle backup</p></Card>
    <Card className="inverted-card"><h2>Active-Active</h2><p>Better utilization<br />More scalable<br />Harder synchronization</p></Card>
    {complex ? <div className="rr-wide-note danger">More availability creates more engineering complexity.</div> : null}
  </div>
);

const RRConflictVisual = () => (
  <div className="rr-conflict-board">
    <RRDatabaseNode label="DB A" state="active" />
    <div className="rr-conflict-note">User A writes Order #101</div>
    <RRDatabaseNode label="DB B" state="active" />
    <div className="rr-conflict-note">User B updates Order #101</div>
    <div className="rr-wide-note danger">Conflict Detected</div>
  </div>
);

const RRNoFreeLunchVisual = () => (
  <div className="rr-free-lunch">
    <Card className="inverted-card"><h2>There is no free lunch in system design.</h2></Card>
    {['Uptime', 'Cost', 'Complexity', 'Scale'].map((x) => <span key={x}>{x}</span>)}
  </div>
);

const RRDecisionVisual = () => (
  <div className="rr-before-after">
    <Card><h2>Internal Business App</h2><p>Active-Passive<br />Low complexity</p></Card>
    <Card className="inverted-card"><h2>Large Consumer Platform</h2><p>Active-Active<br />High scale</p></Card>
  </div>
);

const RRFoundationVisual = ({currentTime}: {currentTime: number}) => {
  const principles = [
    {label: 'Redundancy', at: 438.34, detail: 'extra paths'},
    {label: 'Replication', at: 438.94, detail: 'copied data'},
    {label: 'Active-Passive', at: 439.5, detail: 'simple failover'},
    {label: 'Active-Active', at: 440.04, detail: 'scale + uptime'},
  ];
  const activeCount = principles.filter((item) => currentTime >= item.at).length;

  return (
    <div className="rr-foundation-board">
      <div className="rr-foundation-system">
        <div className="rr-foundation-core">
          <Server size={42} />
          <strong>FoodDash</strong>
          <span>{currentTime >= 440.9 ? 'highly available' : 'availability foundation'}</span>
        </div>
        <div className="rr-foundation-pulse one" />
        <div className="rr-foundation-pulse two" />
        <div className="rr-foundation-pulse three" />
      </div>
      <div className="rr-foundation-layers">
        {principles.map((item, index) => (
          <div key={item.label} className={`rr-foundation-layer ${index < activeCount ? 'active' : ''}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item.label}</strong>
            <em>{item.detail}</em>
          </div>
        ))}
      </div>
      <div className={`rr-foundation-cap ${currentTime >= 440.9 ? 'active' : ''}`}>
        Highly Available Engineering Systems
      </div>
    </div>
  );
};

const RRHealthVisual = () => (
  <div className="rr-health">
    {[
      ['Server A', 'ok'],
      ['Server B', 'fail'],
      ['Server C', 'ok'],
    ].map(([label, state]) => <RRFlowNode key={label} label={label} icon={Server} state={state as 'ok' | 'fail'} />)}
  </div>
);

const RREngineeringIntroVisual = () => (
  <div className="rr-hero rr-engineering-intro">
    <div className="rr-path">
      <span>Engineering Systems</span>
      <strong>Availability Patterns</strong>
    </div>
    <div className="rr-mini-diagram">
      <RRFlowNode label="Server" icon={Server} />
      <div className="rr-arrow">-&gt;</div>
      <RRFlowNode label="Database" icon={Database} />
      <div className="rr-arrow">-&gt;</div>
      <RRFlowNode label="Traffic" icon={Globe} />
    </div>
  </div>
);

const RRFoodDashAppOutageVisual = ({currentTime}: {currentTime: number}) => {
  const progress = Math.max(0, Math.min(1, (currentTime - 15) / 9));
  const statuses = [
    {label: 'Orders', icon: ShoppingCart, failed: progress > 0.34},
    {label: 'Payments', icon: CreditCard, failed: progress > 0.52},
    {label: 'Login', icon: User, failed: progress > 0.68},
  ];

  return (
    <div className="rr-app-outage">
      <div className="rr-phone">
        <div className="rr-phone-speaker" />
        <div className="rr-phone-top">
          <strong>FoodDash</strong>
          <span className={progress > 0.25 ? 'warn' : ''}>{progress > 0.25 ? 'degraded' : 'online'}</span>
        </div>
        <div className="rr-food-grid">
          {['Burger', 'Noodles', 'Pizza', 'Biryani'].map((item) => (
            <div key={item} className={progress > 0.72 ? 'food-card dim' : 'food-card'}>
              <ShoppingCart size={24} />
              <strong>{item}</strong>
              <small>{progress > 0.72 ? 'unavailable' : 'available'}</small>
            </div>
          ))}
        </div>
        <div className="rr-app-status-list">
          {statuses.map(({label, icon: Icon, failed}) => (
            <div key={label} className={failed ? 'app-status failed' : 'app-status'}>
              {failed ? <XCircle size={28} /> : <Icon size={28} />}
              <strong>{label}</strong>
              <span>{failed ? 'failed' : 'ready'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={progress > 0.22 ? 'rr-app-db failed' : 'rr-app-db'}>
        {progress > 0.22 ? <XCircle size={52} /> : <Database size={52} />}
        <strong>Single Database</strong>
        <span>{progress > 0.22 ? 'crashed' : 'serving data'}</span>
      </div>
      <div className="rr-app-lines">
        <span className={progress > 0.3 ? 'broken' : ''} />
        <span className={progress > 0.5 ? 'broken' : ''} />
        <span className={progress > 0.68 ? 'broken' : ''} />
      </div>
    </div>
  );
};

const RRFoodDashMiniVisual = ({mode = 'recap'}: {mode?: 'recap' | 'outage' | 'spof' | 'question' | 'mixed' | 'dependency' | 'blast' | 'replicated' | 'survival' | 'missing' | 'detect' | 'redirect'}) => {
  const dbState = mode === 'recap' || mode === 'spof' || mode === 'outage' || mode === 'blast' || mode === 'question' || mode === 'survival' || mode === 'missing' || mode === 'detect' || mode === 'redirect' ? 'fail' : 'ok';
  const hasSecondary = ['replicated', 'survival', 'missing', 'detect', 'redirect'].includes(mode);
  const services = mode === 'dependency' ? ['Orders', 'Payments', 'Login', 'Restaurant Updates'] : mode === 'mixed' ? ['App ok', 'Web ok', 'Payment ok', 'Database failed'] : ['Orders', 'Payments', 'Login'];

  return (
    <div className={`rr-fooddash-mini ${mode}`}>
      <div className="rr-fooddash-row">
        <RRFlowNode label="Mobile App" icon={Smartphone} />
        <div className="rr-arrow">-&gt;</div>
        <RRFlowNode label="Web Servers" icon={Server} />
        <div className="rr-arrow">-&gt;</div>
        <div className="rr-db-with-log">
          {mode === 'recap' ? (
            <div className="rr-warning-log">
              <AlertTriangle size={24} />
              <strong>Warning Log</strong>
              <span>db timeout spike</span>
            </div>
          ) : null}
          <RRDatabaseNode label="Database" state={dbState as 'ok' | 'fail'} />
        </div>
        {hasSecondary ? (
          <>
            <div className="rr-arrow">sync</div>
            <RRDatabaseNode label="Backup DB" state={mode === 'redirect' ? 'idle' : 'active'} />
          </>
        ) : null}
      </div>
      <div className="rr-chip-row compact">
        {services.map((item, index) => (
          <span key={item} className={(mode === 'outage' || mode === 'blast') && index > -1 ? 'bad' : ''}>{item}</span>
        ))}
      </div>
      {mode === 'spof' ? <div className="rr-wide-note danger">Classic SPOF</div> : null}
      {mode === 'question' ? <div className="rr-wide-note">How do we remove it?</div> : null}
      {mode === 'blast' ? <div className="rr-wide-note danger">Blast Radius: Total</div> : null}
      {mode === 'survival' ? <div className="rr-wide-note">A copy exists. The business survives.</div> : null}
      {mode === 'missing' ? <div className="rr-wide-note danger">But one piece is missing...</div> : null}
      {mode === 'detect' ? <div className="rr-wide-note danger">How does the system know it failed?</div> : null}
      {mode === 'redirect' ? <div className="rr-wide-note">Who redirects traffic?</div> : null}
    </div>
  );
};

const RRFoodDashComponentCheckVisual = ({currentTime}: {currentTime: number}) => {
  const rootCauseVisible = currentTime >= 85.16;
  const notEverythingVisible = currentTime >= 88.12;
  const components = [
    {label: 'App', icon: Smartphone, state: 'ok'},
    {label: 'Web Servers', icon: Server, state: 'ok'},
    {label: 'Payment Service', icon: CreditCard, state: 'ok'},
    {label: 'Database', icon: Database, state: 'fail'},
  ];

  return (
    <div className="rr-investigation-board">
      <div className="rr-investigation-cloud">
        {components.map(({label, icon: Icon, state}, index) => (
          <div key={label} className={`rr-check-tile ${state} ${currentTime >= 88.1 + index * 0.32 ? 'visible' : ''}`}>
            {state === 'fail' ? <XCircle size={42} /> : <CheckCircle2 size={42} />}
            <Icon size={44} />
            <strong>{label}</strong>
          </div>
        ))}
      </div>
      <div className={`rr-investigation-note ${rootCauseVisible ? 'visible' : ''}`}>
        <Search size={42} />
        <strong>Root cause check</strong>
        <span>Think back to the outage</span>
      </div>
      <div className={`rr-cloud-fire-note ${notEverythingVisible ? 'visible' : ''}`}>Not every cloud component caught fire</div>
    </div>
  );
};

const RRDependencyFanInVisual = ({currentTime}: {currentTime: number}) => {
  const dependencies = [
    {label: 'Orders', time: 98.48, icon: ShoppingCart},
    {label: 'Payments', time: 99.52, icon: CreditCard},
    {label: 'Login Requests', time: 100.32, icon: User},
    {label: 'Restaurant Updates', time: 101.98, icon: Globe},
  ];

  return (
    <div className="rr-dependency-fanin">
      <div className="rr-dependency-grid">
        {dependencies.map(({label, time, icon: Icon}, index) => (
          <div key={label} className={`rr-dependency-source source-${index + 1} ${currentTime >= time ? 'active' : ''}`}>
            <Icon size={42} />
            <strong>{label}</strong>
          </div>
        ))}
      </div>
      <div className={currentTime >= 95.42 ? 'rr-single-db spotlight' : 'rr-single-db'}>
        <Database size={58} />
        <strong>One Database Server</strong>
        <span>{currentTime >= 96.04 ? 'failed' : 'fragile dependency'}</span>
      </div>
      <div className="rr-fanin-lines">
        {dependencies.map(({label, time}, index) => (
          <span key={label} className={`line-${index + 1} ${currentTime >= time ? 'active' : ''}`} />
        ))}
      </div>
      <div className={`rr-dependency-warning ${currentTime >= 103.36 ? 'visible' : ''}`}>Everything depended on one specific box</div>
    </div>
  );
};

const RRBlastRadiusRippleVisual = ({currentTime}: {currentTime: number}) => {
  const totalVisible = currentTime >= 108.12;
  return (
    <div className="rr-blast-ripple-board">
      <div className="rr-ripple-core">
        <span className="rr-ripple one" />
        <span className="rr-ripple two" />
        <span className="rr-ripple three" />
        <div className="rr-single-db failed">
          <XCircle size={58} />
          <strong>Database Failed</strong>
        </div>
      </div>
      {['Orders', 'Payments', 'Login', 'Restaurant Updates'].map((item, index) => (
        <div key={item} className={`rr-blast-service blast-${index + 1} ${currentTime >= 105.56 + index * 0.55 ? 'failed' : ''}`}>{item}</div>
      ))}
      <div className={`rr-blast-total ${totalVisible ? 'visible' : ''}`}>Blast Radius: Total</div>
    </div>
  );
};

const RRConceptCardsVisual = () => (
  <div className="rr-before-after rr-concepts">
    <Card><Server size={54} /><h2>Redundancy</h2><p>extra components</p></Card>
    <div className="rr-arrow">+</div>
    <Card className="inverted-card"><Database size={54} /><h2>Replication</h2><p>moving data copies</p></Card>
  </div>
);

const RRExamplesVisual = ({currentTime}: {currentTime: number}) => {
  const phase = currentTime < 136.74 ? 'databases' : currentTime < 140.6 ? 'fleet' : currentTime < 142.16 ? 'storage' : 'network';
  const phaseStart = {
    databases: 134.76,
    fleet: 136.74,
    storage: 140.6,
    network: 142.16,
  }[phase];
  const elapsed = Math.max(0, currentTime - phaseStart);

  return (
    <div className={`rr-example-stage ${phase}`}>
      <div className="rr-example-label">
        <strong>{phase === 'databases' ? 'Two Databases' : phase === 'fleet' ? 'Server Fleet' : phase === 'storage' ? 'Redundant Storage' : 'Alternate Network Path'}</strong>
        <span>{phase === 'databases' ? 'one becomes two' : phase === 'fleet' ? 'one server becomes many' : phase === 'storage' ? 'one file becomes copies' : 'traffic gets another route'}</span>
      </div>

      {phase === 'databases' ? (
        <div className="rr-db-shell-demo">
          {[0, 0.28].map((delay, index) => (
            <div key={index} className={`rr-demo-db ${elapsed >= delay ? 'visible' : ''}`}>
              <Database size={62} />
              <strong>DB {index === 0 ? 'A' : 'B'}</strong>
            </div>
          ))}
          <div className={`rr-demo-caption ${elapsed >= 0.56 ? 'visible' : ''}`}>A second shell appears before failure happens.</div>
        </div>
      ) : null}

      {phase === 'fleet' ? (
        <div className="rr-fleet-demo">
          {[0, 0.22, 0.44, 0.66].map((delay, index) => (
            <div key={index} className={`rr-demo-server server-${index + 1} ${elapsed >= delay ? 'visible' : ''}`}>
              <Server size={44} />
              <strong>API {index + 1}</strong>
            </div>
          ))}
          <div className={`rr-fleet-lines ${elapsed >= 0.92 ? 'visible' : ''}`}>
            <span className="fleet-line-1" />
            <span className="fleet-line-2" />
            <span className="fleet-line-3" />
          </div>
          <div className={`rr-demo-caption ${elapsed >= 1.12 ? 'visible' : ''}`}>Requests can spread across the fleet.</div>
        </div>
      ) : null}

      {phase === 'storage' ? (
        <div className="rr-storage-demo">
          <div className="rr-file-source"><PackageCheck size={54} /><strong>Menu File</strong></div>
          {[0.12, 0.28, 0.44].map((delay, index) => (
            <div key={index} className={`rr-file-copy copy-${index + 1} ${elapsed >= delay ? 'visible' : ''}`}>
              <BookOpen size={34} />
              <span>copy</span>
            </div>
          ))}
          {[0.5, 0.7, 0.9].map((delay, index) => (
            <div key={index} className={`rr-storage-db store-${index + 1} ${elapsed >= delay ? 'visible' : ''}`}>
              <Database size={44} />
              <strong>Store {index + 1}</strong>
            </div>
          ))}
        </div>
      ) : null}

      {phase === 'network' ? (
        <div className="rr-network-demo">
          <div className="rr-network-node source"><Globe size={44} /><strong>Traffic</strong></div>
          <div className="rr-network-node main fail"><XCircle size={44} /><strong>Main Path</strong></div>
          <div className={`rr-network-node alt ${elapsed >= 0.5 ? 'visible' : ''}`}><GitBranch size={44} /><strong>Alt Path</strong></div>
          <div className="rr-network-node target"><Server size={44} /><strong>Service</strong></div>
          <div className="rr-network-line main-line" />
          <div className={`rr-network-line alt-line ${elapsed >= 0.5 ? 'visible' : ''}`} />
          <div className={`rr-network-packet ${elapsed >= 0.85 ? 'visible' : ''}`} />
          <div className={`rr-demo-caption ${elapsed >= 1.08 ? 'visible' : ''}`}>When one road breaks, traffic has another road.</div>
        </div>
      ) : null}

      <div className="rr-example-strip">
        {[
          ['2 Databases', 'databases'],
          ['Server Fleet', 'fleet'],
          ['Storage', 'storage'],
          ['Network Path', 'network'],
        ].map(([label, key]) => (
          <div key={key} className={phase === key ? 'active' : ''}>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RRDependencyPathsVisual = () => (
  <div className="rr-paths-board">
    <Card className="danger-card"><h2>One Machine</h2><p>single red path</p></Card>
    <div className="rr-arrow">snaps</div>
    <div className="rr-path-list">
      {['Server A', 'Server B', 'Server C'].map((item) => <RRFlowNode key={item} label={item} icon={Server} />)}
    </div>
  </div>
);

const RRHardwareTrapVisual = ({currentTime}: {currentTime: number}) => {
  const warning = currentTime >= 153.56;
  const notSolved = currentTime >= 155.38;

  return (
    <div className={`rr-trap-board ${warning ? 'warning' : ''} ${notSolved ? 'not-solved' : ''}`}>
      <div className="rr-trap-shelf">
        <div className="rr-trap-box primary">
          <Database size={54} />
          <strong>Primary DB</strong>
        </div>
        <div className="rr-trap-plus">+</div>
        <div className="rr-trap-box shiny">
          <Sparkles size={54} />
          <strong>New DB</strong>
        </div>
      </div>
      <div className="rr-trap-claim">Looks like redundancy solved it...</div>
      <div className="rr-trap-warning">
        <AlertTriangle size={42} />
        <strong>Trap</strong>
        <span>Infrastructure is not recovery by itself</span>
      </div>
    </div>
  );
};

const RRShinyBackupVisual = ({currentTime}: {currentTime: number}) => {
  const secondVisible = currentTime >= 159.74;
  const shiny = currentTime >= 161.18;
  return (
    <div className={`rr-shiny-db-board ${secondVisible ? 'second-visible' : ''} ${shiny ? 'shiny' : ''}`}>
      <div className="rr-shiny-db primary">
        <Database size={62} />
        <strong>Database 1</strong>
        <span>known data</span>
        <div className="rr-data-tokens">
          {['orders', 'menus', 'deliveries'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
      <div className="rr-shiny-arrow">deploys</div>
      <div className="rr-shiny-db secondary">
        <Database size={62} />
        <strong>Database 2</strong>
        <span>{shiny ? 'shiny machine' : 'new machine'}</span>
        <div className="rr-shine-lines"><span /><span /><span /></div>
      </div>
      <div className="rr-shiny-note">Two database machines. But what is inside the second one?</div>
    </div>
  );
};

const RREmptyBackupMysteryVisual = ({currentTime}: {currentTime: number}) => {
  const checks = [
    {label: 'Customer orders', at: 164.92},
    {label: 'Restaurant menus', at: 168.76},
    {label: 'Active deliveries', at: 170.84},
  ];

  return (
    <div className="rr-empty-mystery-board">
      <div className="rr-empty-vault">
        <Database size={70} />
        <strong>Backup DB</strong>
        <span>open inventory</span>
      </div>
      <div className="rr-empty-inspection">
        {checks.map(({label, at}, index) => (
          <div key={label} className={`rr-empty-check check-${index + 1} ${currentTime >= at ? 'visible' : ''}`}>
            <XCircle size={34} />
            <strong>No {label}</strong>
          </div>
        ))}
      </div>
      <div className={`rr-empty-shell-reveal ${currentTime >= 173.16 ? 'visible' : ''}`}>Nothing useful inside</div>
    </div>
  );
};

const RREmptyFailoverVisual = ({currentTime}: {currentTime: number}) => {
  const primaryFails = currentTime >= 175.56;
  const backupHit = currentTime >= 176.7;
  const emptyShell = currentTime >= 179.16;

  return (
    <div className={`rr-empty-failover ${primaryFails ? 'primary-fails' : ''} ${backupHit ? 'backup-hit' : ''} ${emptyShell ? 'empty-shell' : ''}`}>
      <div className="rr-user-request">
        <ShoppingCart size={42} />
        <strong>Order Request</strong>
      </div>
      <div className="rr-failover-db primary">
        {primaryFails ? <XCircle size={60} /> : <Database size={60} />}
        <strong>Primary</strong>
      </div>
      <div className="rr-failover-db backup">
        <Database size={60} />
        <strong>Backup</strong>
        <span>empty</span>
      </div>
      <div className="rr-failover-route main" />
      <div className="rr-failover-route backup-route" />
      <div className="rr-empty-response">
        <AlertTriangle size={36} />
        <strong>Empty shell</strong>
        <span>No data. No recovery.</span>
      </div>
    </div>
  );
};

const RRReplicationRevealVisual = ({currentTime}: {currentTime: number}) => {
  const titleVisible = currentTime >= 183.28;
  const syncing = currentTime >= 184.52;
  const complete = currentTime >= 188.08;
  const records = [
    {label: 'Orders', at: 184.8},
    {label: 'Menus', at: 185.5},
    {label: 'Payments', at: 186.2},
    {label: 'Deliveries', at: 187.0},
  ];

  return (
    <div className={`rr-replication-reveal ${titleVisible ? 'title-visible' : ''} ${syncing ? 'syncing' : ''} ${complete ? 'complete' : ''}`}>
      <div className="rr-reveal-word">Replication</div>
      <div className="rr-reveal-db primary">
        <Database size={62} />
        <strong>DB A</strong>
      </div>
      <div className="rr-reveal-stream">
        {records.map(({label, at}, index) => <span key={label} className={currentTime >= at ? `visible record-${index + 1}` : `record-${index + 1}`}>{label}</span>)}
      </div>
      <div className="rr-reveal-db secondary">
        <Database size={62} />
        <strong>DB B</strong>
      </div>
      <div className="rr-reveal-note">{complete ? 'Copies are synchronized across systems.' : syncing ? 'Data starts moving.' : 'The missing concept appears.'}</div>
    </div>
  );
};

const RREmptyBackupVisual = ({mode = 'empty'}: {mode?: 'empty' | 'missing' | 'fail'}) => (
  <div className="rr-empty-board">
    <RRDatabaseNode label="Primary DB" state={mode === 'fail' ? 'fail' : 'active'} />
    <div className="rr-record-stream">
      {(mode === 'missing' ? ['No Orders', 'No Menus', 'No Deliveries'] : ['Orders', 'Menus', 'Payments']).map((item) => <span key={item} className={mode === 'missing' ? 'bad' : ''}>{item}</span>)}
    </div>
    <RRDatabaseNode label="Backup DB" state={mode === 'empty' || mode === 'missing' ? 'empty' : 'idle'} />
    {mode === 'fail' ? <div className="rr-wide-note danger">No data. No recovery.</div> : null}
  </div>
);

const RRReplicatedDataVisual = ({both = false}: {both?: boolean}) => (
  <div className="rr-replication-board rr-replicated-data">
    <RRDatabaseNode label="Primary DB" />
    <div className="rr-record-stream">
      {['Orders', 'Menus', 'Payments', 'Deliveries'].map((x) => <span key={x}>{x}</span>)}
    </div>
    <RRDatabaseNode label={both ? 'Secondary DB: Filled' : 'Secondary DB'} />
  </div>
);

const RRActivePassiveDetailedVisual = ({mode = 'setup'}: {mode?: 'setup' | 'traffic' | 'sync' | 'fail' | 'promote' | 'redirect' | 'simple' | 'idle' | 'waste' | 'wake'}) => {
  const activeState = mode === 'fail' || mode === 'promote' || mode === 'redirect' ? 'fail' : 'active';
  const passiveLabel = mode === 'promote' || mode === 'redirect' || mode === 'wake' ? 'New Active' : 'Passive DB';
  const passiveState = mode === 'idle' || mode === 'waste' ? 'idle' : 'active';
  const chips = {
    setup: ['One active', 'One standby', 'Ready'],
    traffic: ['Users', 'Restaurants', 'Drivers'],
    sync: ['Orders sync', 'Menus sync', 'Payments sync'],
    fail: ['1 Failure', 'Traffic stopped'],
    promote: ['Passive -> Active', 'Green again'],
    redirect: ['Traffic redirected', 'Requests resume'],
    simple: ['Clear primary', 'Clear backup', 'Check'],
    idle: ['Clock ticking', 'Cost rising'],
    waste: ['Active requests: 912', 'Passive requests: 0'],
    wake: ['Standby wakes up', 'Alternative path'],
  }[mode];

  return (
    <div className="rr-arch-board rr-ap-detailed">
      <RRFlowNode label={mode === 'waste' ? 'Traffic Counter' : 'Traffic'} icon={Globe} />
      <div className="rr-arrow">{mode === 'redirect' ? 'reroute' : '->'}</div>
      <RRDatabaseNode label="Active DB" state={activeState as 'fail' | 'active'} />
      <div className="rr-arrow">{mode === 'fail' ? 'stops' : 'sync'}</div>
      <RRDatabaseNode label={passiveLabel} state={passiveState as 'idle' | 'active'} />
      <div className="rr-chip-row compact">{chips.map((x) => <span key={x}>{x}</span>)}</div>
    </div>
  );
};

const RRSpareTireVisual = ({currentTime}: {currentTime: number}) => {
  const showTire = currentTime >= 309.82;
  const showTrunk = currentTime >= 310.54;
  const showHalf = currentTime >= 311.18;
  const showCost = currentTime >= 308.18;

  return (
    <div className="rr-spare-redesign">
      <div className={`rr-spare-receipt ${showCost ? 'active' : ''}`}>
        <CreditCard size={42} />
        <strong>Full price</strong>
        <span>standby capacity</span>
        <div className="rr-spare-price">$ $ $</div>
      </div>
      <div className={`rr-spare-trunk ${showTrunk ? 'active' : ''}`}>
        <div className="rr-trunk-lid">car trunk</div>
        <div className={`rr-spare-wheel ${showTire ? 'active' : ''}`}>
          <span>spare</span>
        </div>
        <div className={`rr-trunk-space ${showHalf ? 'active' : ''}`}>
          half the trunk is occupied
        </div>
      </div>
      <div className={`rr-spare-lesson ${showHalf ? 'active' : ''}`}>
        <Clock size={42} />
        <strong>Useful during failure</strong>
        <span>idle the rest of the time</span>
      </div>
    </div>
  );
};

const RRRecapActivePassiveVisual = ({currentTime}: {currentTime: number}) => {
  const step =
    currentTime >= 433.14 ? 3 :
    currentTime >= 432.42 ? 2 :
    currentTime >= 431.02 ? 1 :
    0;

  return (
    <div className="rr-recap-failover">
      <div className="rr-recap-column traffic">
        <Globe size={40} />
        <strong>Traffic</strong>
        <span>requests</span>
      </div>
      <div className={`rr-recap-path primary ${step >= 1 ? 'active' : ''}`}>primary route</div>
      <div className={`rr-recap-column primary ${step >= 2 ? 'failed' : ''}`}>
        {step >= 2 ? <XCircle size={40} /> : <Database size={40} />}
        <strong>Active DB</strong>
        <span>{step >= 2 ? 'failed' : 'serving'}</span>
      </div>
      <div className={`rr-recap-path failover ${step >= 3 ? 'active' : ''}`}>failover route</div>
      <div className={`rr-recap-column backup ${step >= 3 ? 'promoted' : ''}`}>
        <Database size={40} />
        <strong>{step >= 3 ? 'New Active' : 'Passive DB'}</strong>
        <span>{step >= 3 ? 'serving now' : 'synced standby'}</span>
      </div>
      <div className={`rr-recap-verdict ${step >= 3 ? 'active' : ''}`}>Straightforward failover</div>
    </div>
  );
};

const RRActiveActiveDetailedVisual = ({mode = 'both'}: {mode?: 'both' | 'split' | 'fail' | 'absorb' | 'benefits' | 'scale'}) => {
  if (mode === 'benefits') {
    return (
      <div className="rr-chip-grid rr-benefits">
        {[
          ['Better Utilization', LineChart],
          ['Higher Availability', ShieldAlert],
          ['More Scalability', GitBranch],
        ].map(([label, Icon]) => <Card key={label as string}>{React.createElement(Icon as React.ComponentType<{size?: number}>, {size: 48})}<h2>{label as string}</h2></Card>)}
      </div>
    );
  }

  return (
    <div className="rr-arch-board active-active rr-aa-detailed">
      <RRFlowNode label={mode === 'scale' ? 'Millions of Users' : 'Users'} icon={User} />
      <div className="rr-arrow split">{mode === 'absorb' ? 'reroute' : 'split'}</div>
      <RRDatabaseNode label={mode === 'split' ? 'DB A: 148' : 'DB A'} state={mode === 'fail' || mode === 'absorb' ? 'fail' : 'active'} />
      <RRDatabaseNode label={mode === 'split' || mode === 'absorb' ? 'DB B: 301' : 'DB B'} state="active" />
      <div className="rr-chip-row compact">
        {(mode === 'fail' ? ['One fails', 'One continues'] : mode === 'absorb' ? ['Load meter rises', 'Still green'] : mode === 'scale' ? ['High scale', 'Both active'] : ['Both active', 'Both serve traffic']).map((x) => <span key={x}>{x}</span>)}
      </div>
    </div>
  );
};

const RRTradeoffTableVisual = ({mode}: {mode: 'compare' | 'passive' | 'active'}) => {
  const rows = [
    {label: 'Failover Model', passive: 'Primary -> Backup', active: 'Both already serving', show: 'compare'},
    {label: 'Operational Simplicity', passive: 'Simple failover', active: 'More moving parts', show: 'passive'},
    {label: 'Sync Burden', passive: 'Fewer sync headaches', active: 'Massive sync complexity', show: 'passive'},
    {label: 'Resource Utilization', passive: 'Idle backup capacity', active: 'Fantastic utilization', show: 'active'},
    {label: 'Scalability', passive: 'Limited by active node', active: 'Much higher scalability', show: 'active'},
  ];

  return (
    <div className={`rr-tradeoff-table-board ${mode}`}>
      <div className="rr-table-caption">{mode === 'compare' ? 'Direct comparison' : mode === 'passive' ? 'Active-Passive advantages' : 'Active-Active trade-off'}</div>
      <div className="rr-tradeoff-table">
        <div className="rr-table-head blank">Trade-off</div>
        <div className="rr-table-head passive">Active-Passive</div>
        <div className="rr-table-head active">Active-Active</div>
        {rows.map((row, index) => (
          <React.Fragment key={row.label}>
            <div className={`rr-table-cell label row-${index + 1} ${row.show}`}>{row.label}</div>
            <div className={`rr-table-cell passive-value row-${index + 1} ${row.show}`}>{row.passive}</div>
            <div className={`rr-table-cell active-value row-${index + 1} ${row.show}`}>{row.active}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="rr-table-verdict">
        {mode === 'compare' ? 'Same goal. Different costs.' : mode === 'passive' ? 'Simple failover. Fewer sync headaches.' : 'Higher scale. Harder synchronization.'}
      </div>
    </div>
  );
};

const RRTradeoffScaleVisual = ({mode = 'section'}: {mode?: 'section' | 'compare' | 'passive' | 'active' | 'coordination' | 'free'}) => {
  if (mode === 'free') {
    return (
      <div className="rr-free-lunch rr-balance-board">
        <Card className="inverted-card"><h2>No free lunch</h2><p>Resilience and engineering effort rise together.</p></Card>
        <span>Resilience</span><span>Engineering Effort</span><span>Cost</span><span>Scale</span>
      </div>
    );
  }

  if (mode === 'coordination') {
    return (
      <div className="rr-conflict-board coordination">
        <RRDatabaseNode label="DB A" state="active" />
        <RRDatabaseNode label="DB B" state="active" />
        <div className="rr-chip-row compact">{['Sync', 'Conflict Resolution', 'Coordination', 'Consistency'].map((x) => <span key={x}>{x}</span>)}</div>
      </div>
    );
  }

  if (mode === 'compare' || mode === 'passive' || mode === 'active') {
    return <RRTradeoffTableVisual mode={mode} />;
  }

  return (
    <div className="rr-before-after rr-compare-two">
      <Card><h2>Active-Passive</h2><p>simple failover</p></Card>
      <Card className="inverted-card"><h2>Active-Active</h2><p>better utilization</p></Card>
      <div className="rr-wide-note">Complexity vs Uptime</div>
    </div>
  );
};

const RRConflictDetailedVisual = () => (
  <div className="rr-conflict-board">
    <RRDatabaseNode label="DB A" state="active" />
    <div className="rr-conflict-note">User A writes Order #42</div>
    <RRDatabaseNode label="DB B" state="active" />
    <div className="rr-conflict-note">User B updates Order #42</div>
    <div className="rr-wide-note danger">Conflicts can happen</div>
  </div>
);

const RRContextDecisionVisual = ({mode, currentTime}: {mode: 'internal' | 'consumer' | 'factors'; currentTime?: number}) => {
  if (mode === 'factors') {
    const time = currentTime ?? 0;
    const factors = [
      {label: 'Business Requirements', short: 'uptime target', at: 414.34, choice: 'SLA decides shape', icon: Scale},
      {label: 'Team Expertise', short: 'operational skill', at: 415.2, choice: 'run what you can debug', icon: Wrench},
      {label: 'Budget', short: 'capacity cost', at: 417.44, choice: 'pay for complexity wisely', icon: CreditCard},
    ];
    const activeIndex = factors.reduce((latest, factor, index) => time >= factor.at ? index : latest, -1);

    return (
      <div className="rr-context-dashboard">
        <div className="rr-context-system">
          <div className="rr-context-node users"><User size={34} /><strong>Users</strong></div>
          <div className="rr-context-node app"><Server size={34} /><strong>App</strong></div>
          <div className={`rr-context-node db-a ${activeIndex >= 0 ? 'active' : ''}`}><Database size={34} /><strong>DB A</strong></div>
          <div className={`rr-context-node db-b ${activeIndex >= 1 ? 'active' : ''}`}><Database size={34} /><strong>DB B</strong></div>
          <div className={`rr-context-line line-1 ${activeIndex >= 0 ? 'active' : ''}`} />
          <div className={`rr-context-line line-2 ${activeIndex >= 1 ? 'active' : ''}`} />
          <div className={`rr-context-line line-3 ${activeIndex >= 2 ? 'active' : ''}`} />
          <div className="rr-context-architecture">{activeIndex < 1 ? 'Active-Passive candidate' : activeIndex < 2 ? 'Active-Active possible' : 'Context decides final design'}</div>
        </div>
        <div className="rr-context-factors">
          {factors.map(({label, short, at, choice, icon: Icon}, index) => (
            <div key={label} className={`rr-context-factor ${time >= at ? 'active' : ''}`}>
              <Icon size={34} />
              <strong>{label}</strong>
              <span>{short}</span>
              <em>{choice}</em>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return mode === 'internal' ? <RRActivePassiveDetailedVisual mode="simple" /> : <RRActiveActiveDetailedVisual mode="scale" />;
};

const RRDetectionVisual = ({mode}: {mode: 'cards' | 'health' | 'subscribe'}) => {
  if (mode === 'cards') {
    return (
      <div className="rr-chip-grid rr-detection-cards">
        {['Redundancy', 'Replication', 'Detection'].map((x, index) => <Card key={x} className={index === 2 ? 'inverted-card' : ''}><h2>{x}</h2></Card>)}
      </div>
    );
  }

  if (mode === 'subscribe') {
    return (
      <div className="spof-agenda-timeline rr-subscribe-timeline">
        {['Availability', 'SPOF', 'Redundancy', 'Failover & Health Checks'].map((item, index) => (
          <div key={item} className={index === 3 ? 'spof-timeline-item active' : 'spof-timeline-item'}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    );
  }

  return <RRHealthVisual />;
};

const RRDetectionBridgeVisual = ({currentTime}: {currentTime: number}) => {
  const built = currentTime >= 448.3;
  const missing = currentTime >= 452.16;
  const failed = currentTime >= 454.72;
  const asking = currentTime >= 457.04;
  const redirect = currentTime >= 458.26;
  const detected = currentTime >= 461.78;

  return (
    <div className="rr-detection-bridge">
      <div className="rr-bridge-system">
        <div className="rr-bridge-users"><User size={36} /><strong>Users</strong></div>
        <div className="rr-bridge-app"><Smartphone size={36} /><strong>FoodDash</strong></div>
        <div className={`rr-bridge-node primary ${failed ? 'failed' : ''}`}>
          {failed ? <XCircle size={34} /> : <Database size={34} />}
          <strong>Primary</strong>
          <span>{failed ? 'silent failure' : 'live traffic'}</span>
        </div>
        <div className={`rr-bridge-node secondary ${built ? 'ready' : ''}`}>
          <Database size={34} />
          <strong>Backup</strong>
          <span>{built ? 'replicated copy' : 'waiting'}</span>
        </div>
        <div className={`rr-bridge-line live ${failed ? 'broken' : ''}`} />
        <div className={`rr-bridge-line backup ${redirect ? 'active' : ''}`} />
        <div className={`rr-bridge-monitor ${missing ? 'visible' : ''} ${detected ? 'detected' : ''}`}>
          <Search size={34} />
          <strong>{detected ? 'Detection' : 'Missing piece'}</strong>
          <span>{detected ? 'health check catches it' : 'who notices?'}</span>
        </div>
      </div>
      <div className="rr-bridge-status">
        <div className={built ? 'active' : ''}><CheckCircle2 size={28} /> Redundant</div>
        <div className={built ? 'active' : ''}><CheckCircle2 size={28} /> Replicated</div>
        <div className={detected ? 'active detection' : missing ? 'missing' : ''}>
          {detected ? <CheckCircle2 size={28} /> : <AlertTriangle size={28} />}
          {detected ? 'Automatic detection' : 'Detection missing'}
        </div>
      </div>
      <div className="rr-bridge-question">
        {detected ? 'Automatic detection is the missing piece.' : redirect ? 'How does traffic redirect in milliseconds?' : asking ? 'How does the system know it failed?' : 'Solving one problem reveals another.'}
      </div>
    </div>
  );
};

/* ─── Health Checks & Failover Visual Components ───
 *  Uses existing CSS classes (rr-*, spof-*) for visual consistency.
 *  Larger scale matching RR visuals. No fragile absolute positioning.
 */

/* Reusable wrapper so all HC content sits at a consistent z-index layer */
const HCContentWrap: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div className="lesson-body" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, flex: 1, padding: '10px 0', ...style}}>
    {children}
  </div>
);

/* Large architecture node matching RRFlowNode scale */
const HCArchNode = ({label, icon: Icon = Server, state = 'ok', sub}: {label: string; icon?: React.ComponentType<{size?: number}>; state?: 'ok' | 'fail' | 'idle' | 'active' | 'promoted'; sub?: string}) => (
  <div className="rr-flow-node" style={{opacity: state === 'idle' ? 0.45 : 1, borderColor: state === 'fail' ? 'rgba(255,60,60,0.8)' : state === 'promoted' ? 'rgba(60,255,60,0.8)' : undefined}}>
    {state === 'fail' ? <XCircle size={46} /> : <Icon size={46} />}
    <strong>{label}</strong>
    {sub ? <span style={{fontSize: 12, opacity: 0.55, textTransform: 'uppercase'}}>{sub}</span> : null}
  </div>
);

/* Large database node */
const HCDbNode = ({label, state = 'ok', sub}: {label: string; state?: 'ok' | 'fail' | 'idle' | 'active' | 'promoted'; sub?: string}) => (
  <div className="rr-db-node" style={{opacity: state === 'idle' ? 0.45 : 1, borderColor: state === 'fail' ? 'rgba(255,60,60,0.8)' : state === 'promoted' ? 'rgba(60,255,60,0.8)' : undefined}}>
    {state === 'fail' ? <XCircle size={56} /> : <Database size={56} />}
    <strong>{label}</strong>
    {sub ? <span style={{fontSize: 13, opacity: 0.55, textTransform: 'uppercase'}}>{sub}</span> : null}
  </div>
);

const HCSectionVisual = ({beat}: {beat: LessonBeat}) => (
  <div className="spof-section-card rr-section-card">
    <span>Health Checks &amp; Failover</span>
    <h2>{beat.title}</h2>
    <p>{beat.subtitle}</p>
  </div>
);

const HCIntroVisual = () => (
  <div className="rr-hero rr-engineering-intro">
    <div className="rr-path">
      <span>Engineering Systems</span>
      <strong>Availability Patterns #4</strong>
    </div>
    <div className="rr-mini-diagram">
      <HCArchNode label="Health Checks" icon={Activity} />
      <div className="rr-arrow">&gt;</div>
      <HCArchNode label="Failover" icon={RefreshCw} />
      <div className="rr-arrow">&gt;</div>
      <HCArchNode label="Auto Recovery" icon={CheckCircle2} />
    </div>
  </div>
);

/* ─── hc-02 / hc-03: Primary + Secondary with blind spot ─── */
const HCSetupVisual = ({currentTime}: {currentTime: number}) => {
  const t = currentTime - 8;
  const showSecondary = currentTime >= 11;
  const blindSpot = currentTime >= 20;

  return (
    <HCContentWrap>
      <div style={{display: 'flex', alignItems: 'center', gap: 40}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: currentTime >= 8 ? 1 : 0.3}}>
          <Smartphone size={48} />
          <strong style={{fontSize: 18}}>FoodDash</strong>
        </div>
        <div className="rr-arrow">&rarr;</div>
        <HCDbNode label="Primary DB" state={blindSpot ? 'fail' : 'active'} sub={blindSpot ? 'unmonitored' : 'live traffic'} />
        {currentTime >= 9.5 ? <div className="rr-arrow" style={{fontSize: 14}}>replicates</div> : null}
        <HCDbNode label="Secondary DB" state="active" sub={showSecondary ? 'synced copy' : ''} />
      </div>
      <div style={{display: 'flex', gap: 32, marginTop: 8}}>
        {[
          {label: 'Redundant', ok: true},
          {label: 'Replicated', ok: showSecondary},
          {label: 'Detection', ok: false, alert: blindSpot},
        ].map(item => (
          <div key={item.label} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px', border: '1px solid', borderColor: item.ok ? 'rgba(60,255,60,0.4)' : item.alert ? 'rgba(255,200,60,0.5)' : 'rgba(255,255,255,0.15)', borderRadius: 6, opacity: item.ok || item.alert ? 1 : 0.3}}>
            {item.ok ? <CheckCircle2 size={24} /> : item.alert ? <AlertTriangle size={24} /> : <span style={{width: 24, height: 24, borderRadius: 12, border: '2px solid rgba(255,255,255,0.2)'}} />}
            <strong style={{fontSize: 16}}>{item.label}</strong>
          </div>
        ))}
      </div>
      {blindSpot ? (
        <div className="rr-wide-note danger" style={{border: '2px solid rgba(255,200,60,0.6)'}}>
          <Search size={24} style={{marginRight: 10, verticalAlign: 'middle'}} />
          Blind spot: redundancy without detection is expensive hardware, not recovery.
        </div>
      ) : null}
    </HCContentWrap>
  );
};

/* ─── hc-04 / hc-05: The million-dollar question ─── */
const HCQuestionVisual = ({currentTime}: {currentTime: number}) => {
  const detail = currentTime >= 40;
  return (
    <HCContentWrap>
      <Card className="spof-question-card" style={{maxWidth: '85%', padding: '36px 56px'}}>
        <h2 style={{fontSize: 34}}>How does the system know the primary failed?</h2>
      </Card>
      {detail ? (
        <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '14px 28px', border: '2px solid rgba(255,200,60,0.55)', borderRadius: 8}}>
          <AlertTriangle size={34} />
          <div>
            <strong style={{fontSize: 22}}>The backup is useless without detection</strong>
            <p style={{fontSize: 16, opacity: 0.65, margin: 0}}>Nobody knows when to switch over</p>
          </div>
        </div>
      ) : null}
    </HCContentWrap>
  );
};

/* ─── hc-06: Health check definition ─── */
const HCConceptVisual = () => (
  <HCContentWrap>
    <Card className="inverted-card" style={{textAlign: 'center', padding: '36px 60px'}}>
      <Activity size={80} />
      <h2 style={{fontSize: 40}}>Health Checks</h2>
      <p style={{fontSize: 24, opacity: 0.8}}>An automated digital pulse</p>
    </Card>
    <div style={{display: 'flex', flexDirection: 'column', gap: 14, minWidth: 420}}>
      {[
        'Continuously asks: are you alive?',
        'Tiny background requests',
        'No user impact whatsoever',
      ].map((item, i) => (
        <div key={item} className="checklist-row active" style={{animationDelay: `${i * 0.3}s`}}>
          <CheckCircle2 size={32} />
          <strong style={{fontSize: 20}}>{item}</strong>
        </div>
      ))}
    </div>
  </HCContentWrap>
);

/* ─── hc-07 / hc-08 / hc-09: Ping / pong / crash ─── */
const HCPingVisual = ({currentTime}: {currentTime: number}) => {
  const phase = Math.floor((currentTime * 2) % 4);
  const alive = currentTime < 84;
  const labeled = currentTime >= 64;

  return (
    <HCContentWrap style={{gap: 28}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 50}}>
        <div className="rr-flow-node" style={{padding: '14px 18px'}}>
          <Activity size={52} />
          <strong>Health Checker</strong>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minWidth: 80}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 6, opacity: phase === 0 || phase === 1 ? 1 : 0.25, transition: 'opacity 0.15s'}}>
            <span style={{fontWeight: 700, fontSize: 20, color: alive ? 'rgba(255,255,255,0.8)' : 'rgba(255,60,60,0.8)'}}>{alive ? 'ping' : 'check'}</span>
            <span style={{fontSize: 16, opacity: 0.5}}>{'>>'}</span>
          </div>
          <div style={{width: 2, height: 36, background: alive ? (phase < 2 ? 'rgba(255,255,255,0.15)' : 'rgba(60,255,60,0.5)') : 'rgba(255,60,60,0.5)', transition: 'background 0.2s'}} />
          <div style={{display: 'flex', alignItems: 'center', gap: 6, opacity: phase === 2 || phase === 3 ? 1 : 0.25, transition: 'opacity 0.15s'}}>
            <span style={{fontSize: 16, opacity: 0.5}}>{'<<'}</span>
            <span style={{fontWeight: 700, fontSize: 20, color: alive ? 'rgba(60,255,60,0.9)' : 'rgba(255,60,60,0.9)'}}>{alive ? 'pong' : 'SILENCE'}</span>
          </div>
        </div>

        <div className="rr-db-node" style={{borderColor: alive ? 'rgba(60,255,60,0.7)' : 'rgba(255,60,60,0.7)'}}>
          {alive ? <Database size={56} /> : <XCircle size={56} />}
          <strong>Primary DB</strong>
          <span style={{fontSize: 13, opacity: 0.6, textTransform: 'uppercase'}}>{alive ? 'healthy response' : 'no response'}</span>
        </div>
      </div>

      {labeled ? (
        alive ? (
          <div className="rr-wide-note">Every few seconds. Ping. Response. Ping. Response. Users never notice.</div>
        ) : (
          <div className="rr-wide-note danger">Total silence. The health check has evidence of failure.</div>
        )
      ) : null}
    </HCContentWrap>
  );
};

/* ─── hc-10 / hc-11: Three failed checks → confirmed ─── */
const HCFailDetectionVisual = ({currentTime}: {currentTime: number}) => {
  const steps = [
    {label: 'Check #1', time: 88},
    {label: 'Check #2', time: 94},
    {label: 'Check #3', time: 100},
    {label: 'Confirmed', time: 106},
  ];
  const n = steps.filter(s => currentTime >= s.time).length;

  return (
    <HCContentWrap style={{gap: 28}}>
      <div className="rr-arch-board" style={{gap: 24}}>
        <HCDbNode label="Primary DB" state={currentTime >= 84 ? 'fail' : 'ok'} sub="health checks fail" />
        <div className="rr-arrow" style={{fontSize: 15}}>monitoring</div>
        <HCDbNode label="Backup DB" state="idle" sub="waiting for activation" />
      </div>
      <div style={{display: 'flex', gap: 16}}>
        {steps.map((s, i) => (
          <div key={s.label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            padding: '14px 22px',
            border: '2px solid',
            borderColor: i < n ? (i === 3 ? 'rgba(255,60,60,0.8)' : 'rgba(255,60,60,0.5)') : 'rgba(255,255,255,0.15)',
            borderRadius: 10,
            opacity: i < n ? 1 : 0.3,
            background: i < n ? 'rgba(255,60,60,0.06)' : 'transparent',
            transition: 'all 0.3s',
          }}>
            {i === 3 ? <XCircle size={40} /> : <span style={{fontSize: 30, fontWeight: 900, lineHeight: 1}}>!</span>}
            <strong style={{fontSize: 16}}>{s.label}</strong>
            <span style={{fontSize: 13, opacity: 0.6}}>{i < n ? (i === 3 ? 'HARD EVIDENCE' : 'no response') : 'waiting'}</span>
          </div>
        ))}
      </div>
      {n >= 4 ? (
        <div className="rr-wide-note danger">Hard evidence: primary is undeniably down. Time for failover.</div>
      ) : null}
    </HCContentWrap>
  );
};

/* ─── hc-12 / hc-13 / hc-14: Failover sequence + automated comparison ─── */
const HCFailoverVisual = ({currentTime}: {currentTime: number}) => {
  const step = currentTime < 118 ? 0 : currentTime < 125 ? 1 : currentTime < 131 ? 2 : currentTime < 138 ? 3 : 4;
  const steps = [
    {id: 'detect', label: 'Detect', icon: Search, detail: 'silence confirmed'},
    {id: 'promote', label: 'Promote', icon: ShieldAlert, detail: 'backup → primary'},
    {id: 'redirect', label: 'Redirect', icon: Globe, detail: 'traffic rerouted'},
    {id: 'reconnect', label: 'Reconnect', icon: RefreshCw, detail: 'servers resume'},
  ];

  return (
    <HCContentWrap style={{gap: 20}}>
      <div className="rr-arch-board" style={{gap: 24}}>
        <HCDbNode label={step >= 2 ? 'Old Primary' : 'Primary DB'} state={step >= 1 ? 'fail' : 'ok'} sub={step >= 1 ? 'failed' : 'serving'} />
        <div className="rr-arrow" style={{fontSize: 14}}>{step >= 3 ? 'reroute' : 'sync'}</div>
        <HCDbNode label={step >= 2 ? 'New Primary' : 'Secondary DB'} state={step >= 2 ? 'promoted' : 'idle'} sub={step >= 2 ? 'promoted' : 'standby'} />
      </div>
      <div style={{display: 'flex', gap: 12}}>
        {steps.map(s => (
          <div key={s.id} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            padding: '12px 18px', minWidth: 130,
            border: '2px solid',
            borderColor: step >= 2 ? 'rgba(60,255,60,0.4)' : step >= 1 ? 'rgba(255,200,60,0.4)' : 'rgba(255,255,255,0.1)',
            borderRadius: 8,
            opacity: step >= 1 ? 1 : 0.25,
            background: step >= 2 ? 'rgba(60,255,60,0.04)' : step >= 1 ? 'rgba(255,200,60,0.04)' : 'transparent',
            transition: 'all 0.3s',
          }}>
            {React.createElement(s.icon, {size: 32})}
            <strong style={{fontSize: 15, textTransform: 'uppercase'}}>{s.label}</strong>
            <span style={{fontSize: 12, opacity: 0.55}}>{s.detail}</span>
          </div>
        ))}
      </div>

      {/* Merge hc-14 into the same component: automated vs manual comparison */}
      {step >= 4 ? (
        <div style={{display: 'flex', gap: 24, marginTop: 4, width: '100%', justifyContent: 'center'}}>
          <Card className="danger-card" style={{flex: '0 1 280px', padding: '16px 20px'}}>
            <XCircle size={36} />
            <h2 style={{fontSize: 24, margin: '6px 0'}}>Manual</h2>
            {['Wake up engineer', 'Log into server', 'Type config by hand'].map(m => (
              <div key={m} style={{display: 'flex', alignItems: 'center', gap: 8, opacity: 0.7, fontSize: 15}}>
                <span style={{color: 'rgba(255,60,60,0.7)'}}>&times;</span> {m}
              </div>
            ))}
          </Card>
          <div className="chalk-arrow" style={{alignSelf: 'center'}}>vs</div>
          <Card className="inverted-card" style={{flex: '0 1 280px', padding: '16px 20px'}}>
            <CheckCircle2 size={36} />
            <h2 style={{fontSize: 24, margin: '6px 0'}}>Automatic</h2>
            {['System detects failure', 'Seamless failover', 'Zero human intervention'].map(m => (
              <div key={m} className="checklist-row active" style={{fontSize: 15, gap: 8}}>
                <CheckCircle2 size={18} /> {m}
              </div>
            ))}
          </Card>
        </div>
      ) : null}
    </HCContentWrap>
  );
};

/* ─── hc-15: Real-world imperfections ─── */
const HCRealWorldVisual = ({currentTime}: {currentTime: number}) => {
  const showCauses = currentTime >= 155;
  const showQ = currentTime >= 160;
  const causes = [
    {label: 'Heavy Query', icon: Zap, time: 155},
    {label: 'Lost Packet', icon: Radio, time: 160},
    {label: 'Temp Spike', icon: Activity, time: 165},
  ];

  return (
    <HCContentWrap>
      <HCDbNode label="Primary DB" state={showCauses ? 'fail' : 'ok'} sub={showCauses ? 'temporarily choked' : 'humming along'} />
      <div style={{display: 'flex', gap: 14}}>
        {causes.map(c => (
          <div key={c.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 20px',
            border: '2px solid',
            borderColor: currentTime >= c.time ? 'rgba(255,200,60,0.5)' : 'rgba(255,255,255,0.12)',
            borderRadius: 8,
            opacity: currentTime >= c.time ? 1 : 0.25,
            background: currentTime >= c.time ? 'rgba(255,200,60,0.05)' : 'transparent',
            transition: 'all 0.3s',
          }}>
            {React.createElement(c.icon, {size: 28})}
            <strong style={{fontSize: 17}}>{c.label}</strong>
          </div>
        ))}
      </div>
      {showQ ? (
        <Card className="spof-question-card">
          <h2 style={{fontSize: 26}}>What if a health check fails but the database is fine?</h2>
        </Card>
      ) : null}
    </HCContentWrap>
  );
};

/* ─── hc-16: False positives ─── */
const HCFalsePositiveVisual = () => (
  <HCContentWrap>
    <div style={{display: 'flex', alignItems: 'center', gap: 36}}>
      <Card className="danger-card" style={{textAlign: 'center', padding: '20px 30px'}}>
        <XCircle size={60} />
        <h2 style={{fontSize: 28}}>1 Missed Check</h2>
        <p style={{fontSize: 20, opacity: 0.7}}>immediate failover?</p>
      </Card>
      <div className="chalk-arrow" style={{fontSize: 30}} />
      <Card className="inverted-card" style={{textAlign: 'center', padding: '20px 30px', border: '3px solid rgba(255,200,60,0.8)'}}>
        <AlertTriangle size={60} />
        <h2 style={{fontSize: 28, color: 'rgba(255,200,60,0.9)'}}>False Positive</h2>
        <p style={{fontSize: 20}}>platform becomes unstable</p>
      </Card>
    </div>
    <div className="rr-wide-note danger" style={{border: '2px solid rgba(255,60,60,0.7)'}}>
      Never, ever trust a single failed check in production.
    </div>
  </HCContentWrap>
);

/* ─── hc-17 / hc-18 / hc-19: Thresholds ─── */
const HCThresholdVisual = ({currentTime}: {currentTime: number}) => {
  const active = Math.min(3, Math.max(0, Math.floor((currentTime - 188) / 4) + 1));
  const done = currentTime >= 200;

  return (
    <HCContentWrap>
      <div className="rr-arch-board" style={{gap: 24}}>
        <HCDbNode label="Component" state={active >= 1 && !done ? 'fail' : 'ok'} sub={done ? 'stable' : active >= 1 ? 'failing' : 'healthy'} />
        <div className="rr-arrow">check</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 18px',
              border: '2px solid',
              borderColor: i < active ? 'rgba(255,60,60,0.6)' : 'rgba(255,255,255,0.12)',
              borderRadius: 8,
              opacity: i < active ? 1 : 0.3,
              background: i < active ? 'rgba(255,60,60,0.06)' : 'transparent',
              transition: 'all 0.3s',
            }}>
              {i < active ? <XCircle size={24} /> : <span style={{width: 24, height: 24, borderRadius: 12, border: '2px solid rgba(255,255,255,0.2)'}} />}
              <strong style={{fontSize: 18, minWidth: 60}}>t + {i * 5}s</strong>
              <span style={{fontSize: 14, opacity: 0.65}}>{i < active ? 'FAIL' : 'waiting'}</span>
            </div>
          ))}
        </div>
      </div>
      {active >= 3 ? (
        <div className="rr-wide-note danger" style={{border: '2px solid rgba(255,60,60,0.7)'}}>
          <XCircle size={24} style={{marginRight: 10, verticalAlign: 'middle'}} />
          Three consecutive failures → component declared dead
        </div>
      ) : done ? (
        <div className="rr-wide-note">Thresholds filter noise without delaying genuine recovery.</div>
      ) : (
        <div className="rr-wide-note">Require multiple failures before taking action.</div>
      )}
    </HCContentWrap>
  );
};

/* ─── hc-20: Pattern everywhere ─── */
const HCPatternEverywhereVisual = ({currentTime}: {currentTime: number}) => {
  const systems = [
    {label: 'Databases', icon: Database, time: 220},
    {label: 'Load Balancers', icon: Globe, time: 224},
    {label: 'API Gateways', icon: Server, time: 227},
    {label: 'Queues', icon: GitBranch, time: 230},
  ];
  const n = systems.filter(s => currentTime >= s.time).length;

  return (
    <HCContentWrap>
      <div className="rr-arch-board" style={{gap: 28}}>
        {systems.map((s, i) => (
          <div key={s.label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            opacity: i < n ? 1 : 0.2,
            transition: 'opacity 0.3s',
          }}>
            <div className="rr-flow-node" style={{padding: '14px'}}>
              {React.createElement(s.icon, {size: 48})}
            </div>
            <strong style={{fontSize: 17}}>{s.label}</strong>
          </div>
        ))}
      </div>
      {n >= 4 ? (
        <div className="rr-wide-note">Health checks are a universal primitive in every modern system.</div>
      ) : (
        <div className="rr-wide-note">This pattern is not just for databases ...</div>
      )}
    </HCContentWrap>
  );
};

/* ─── hc-21 / hc-22 / hc-23 / hc-24: Server cluster + LB ─── */
const HCServerClusterVisual = ({currentTime}: {currentTime: number}) => {
  const crashed = currentTime >= 257;
  const removed = currentTime >= 265;
  const servers = [
    {id: 1, label: 'S1', sub: 'healthy'},
    {id: 2, label: 'S2', sub: 'healthy'},
    {id: 3, label: 'S3', sub: crashed ? (removed ? 'removed' : 'crashed') : 'healthy'},
    {id: 4, label: 'S4', sub: 'healthy'},
  ];

  return (
    <HCContentWrap style={{gap: 20}}>
      <div className="rr-arch-board" style={{gap: 28}}>
        <div className="rr-flow-node" style={{flexDirection: 'column', padding: '14px 20px'}}>
          <Globe size={52} />
          <strong>Load Balancer</strong>
          <span style={{fontSize: 12, opacity: 0.5}}>health checks &darr;</span>
        </div>
        <div style={{display: 'flex', gap: 14}}>
          {servers.map(s => {
            const isBad = s.sub === 'removed' || s.sub === 'crashed';
            return (
              <div key={s.id} className="rr-flow-node" style={{
                opacity: isBad && removed ? 0.3 : 1,
                borderColor: isBad && removed ? 'rgba(255,60,60,0.6)' : isBad && crashed ? 'rgba(255,200,60,0.5)' : undefined,
                background: isBad && removed ? 'rgba(255,60,60,0.06)' : undefined,
                transition: 'all 0.3s',
              }}>
                {isBad && removed ? <XCircle size={42} /> : s.sub === 'crashed' ? <AlertTriangle size={42} /> : <Server size={42} />}
                <strong>{s.label}</strong>
                <span style={{fontSize: 12, opacity: 0.55}}>{s.sub}</span>
              </div>
            );
          })}
        </div>
      </div>
      {removed ? (
        <div className="rr-wide-note" style={{border: '2px solid rgba(255,200,60,0.5)'}}>
          <AlertTriangle size={22} style={{marginRight: 8, verticalAlign: 'middle'}} />
          Server 3 removed from rotation. New orders routed to S1, S2, S4.
        </div>
      ) : crashed ? (
        <div className="rr-wide-note danger">Server 3 crashes. Load balancer detects silence.</div>
      ) : (
        <div className="rr-wide-note">All servers healthy. Load balancer continuously monitors each one.</div>
      )}
    </HCContentWrap>
  );
};

/* ─── hc-25 / hc-26: Auto-recovery / re-join ─── */
const HCAutoRecoveryVisual = ({currentTime}: {currentTime: number}) => {
  const redirect = currentTime >= 270;
  const rebooting = currentTime >= 280;
  const rejoin = currentTime >= 290;

  const servers = [
    {id: 1, label: 'S1', sub: 'serving', alive: true},
    {id: 2, label: 'S2', sub: 'serving', alive: true},
    {id: 3, label: 'S3', sub: rejoin ? 'serving' : rebooting ? 'rebooting' : 'removed', alive: rejoin},
    {id: 4, label: 'S4', sub: 'serving', alive: true},
  ];

  return (
    <HCContentWrap style={{gap: 20}}>
      <div className="rr-arch-board" style={{gap: 28}}>
        <div className="rr-flow-node" style={{flexDirection: 'column', padding: '14px 20px'}}>
          <Globe size={52} />
          <strong>Load Balancer</strong>
        </div>
        <div style={{display: 'flex', gap: 14}}>
          {servers.map(s => (
            <div key={s.id} className="rr-flow-node" style={{
              opacity: s.alive ? 1 : 0.35,
              borderColor: rejoin && s.id === 3 ? 'rgba(60,255,60,0.6)' : !s.alive && s.id === 3 ? 'rgba(255,200,60,0.5)' : undefined,
              background: rejoin && s.id === 3 ? 'rgba(60,255,60,0.06)' : undefined,
              transition: 'all 0.3s',
            }}>
              {s.id === 3 && !s.alive ? <RefreshCw size={42} /> : <Server size={42} />}
              <strong>{s.label}</strong>
              <span style={{fontSize: 12, opacity: 0.55}}>{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
      {rejoin ? (
        <div className="rr-wide-note" style={{border: '2px solid rgba(60,255,60,0.5)'}}>
          <CheckCircle2 size={22} style={{marginRight: 8, verticalAlign: 'middle'}} />
          S3 passes health checks again. Automatically re-added to rotation.
        </div>
      ) : rebooting ? (
        <div className="rr-wide-note" style={{border: '2px solid rgba(60,255,60,0.4)'}}>
          <RefreshCw size={22} style={{marginRight: 8, verticalAlign: 'middle'}} />
          S3 reboots. Health checks resume successfully.
        </div>
      ) : redirect ? (
        <div className="rr-wide-note">Customers order food, completely oblivious that a server died.</div>
      ) : null}
    </HCContentWrap>
  );
};

/* ─── hc-27 / hc-28: Test mantra ─── */
const HCTestMantraVisual = () => (
  <HCContentWrap style={{gap: 28}}>
    <Card className="inverted-card" style={{textAlign: 'center', padding: '36px 56px', maxWidth: '80%'}}>
      <ShieldAlert size={72} />
      <h2 style={{fontSize: 38}}>Never assume failover works.</h2>
      <p style={{fontSize: 30, fontWeight: 900, color: 'rgba(255,200,60,0.9)', margin: '8px 0 0'}}>Test it.</p>
    </Card>
    <div className="rr-chip-row" style={{gap: 14}}>
      {['Shut down servers', 'Simulate outages', 'Validate recovery'].map(item => (
        <span key={item} style={{padding: '10px 20px', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 8, fontSize: 18, fontWeight: 700, textTransform: 'uppercase'}}>{item}</span>
      ))}
    </div>
    <div className="rr-wide-note" style={{border: '2px solid rgba(255,200,60,0.5)'}}>
      <AlertTriangle size={22} style={{marginRight: 10, verticalAlign: 'middle'}} />
      The worst time to discover broken failover is during a production outage at 2 AM.
    </div>
  </HCContentWrap>
);

/* ─── hc-29 / hc-30: Summary checklist ─── */
const HCSummaryVisual = ({currentTime}: {currentTime: number}) => {
  const items = [
    {label: 'Redundancy', icon: Database, sub: 'backup infrastructure', time: 328},
    {label: 'Replication', icon: RefreshCw, sub: 'synchronized copies', time: 332},
    {label: 'Health Checks', icon: Activity, sub: 'continuous monitoring', time: 336},
    {label: 'Failover', icon: Globe, sub: 'automated traffic redirect', time: 340},
    {label: 'Testing', icon: ShieldAlert, sub: 'validated recovery', time: 344},
  ];
  const n = items.filter(x => currentTime >= x.time).length;

  return (
    <HCContentWrap>
      <h2 style={{fontSize: 32, letterSpacing: 1, margin: 0}}>The Complete System</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8, minWidth: 500}}>
        {items.map((x, i) => (
          <div key={x.label} className="checklist-row" style={{
            opacity: i < n ? 1 : 0.25,
            padding: '12px 20px',
            border: i < n ? '1px solid rgba(255,255,255,0.08)' : 'none',
            borderRadius: 8,
            transition: 'all 0.3s',
          }}>
            {React.createElement(x.icon, {size: 36})}
            <div>
              <strong style={{fontSize: 22}}>{x.label}</strong>
              <p style={{fontSize: 16, margin: 0, opacity: 0.6}}>{x.sub}</p>
            </div>
          </div>
        ))}
      </div>
      {n >= 5 ? (
        <div className="rr-wide-note" style={{border: '2px solid rgba(60,255,60,0.5)'}}>
          <CheckCircle2 size={24} style={{marginRight: 10, verticalAlign: 'middle'}} />
          Together they let us survive massive failures with zero downtime.
        </div>
      ) : null}
    </HCContentWrap>
  );
};

/* ─── hc-31 / hc-32: Downtime question + nines ─── */
const HCNinesVisual = ({currentTime}: {currentTime: number}) => {
  const showQ = currentTime >= 342;
  const showTable = currentTime >= 358;
  const tiers = [
    {nines: '99.9%', downtime: '~8.7 hrs/yr', label: 'standard'},
    {nines: '99.99%', downtime: '~52 min/yr', label: 'enhanced'},
    {nines: '99.999%', downtime: '~5 min/yr', label: 'mission critical'},
  ];

  return (
    <HCContentWrap>
      {showQ ? (
        <Card className="spof-question-card" style={{maxWidth: '80%', padding: '24px 40px'}}>
          <h2 style={{fontSize: 30}}>How much downtime is actually acceptable?</h2>
        </Card>
      ) : null}
      {showTable ? (
        <div style={{display: 'flex', gap: 18}}>
          {tiers.map((t, i) => (
            <div key={t.nines} style={{
              padding: '18px 28px',
              border: '3px solid',
              borderColor: i === 2 ? 'rgba(60,255,60,0.6)' : i === 1 ? 'rgba(255,200,60,0.5)' : 'rgba(255,255,255,0.25)',
              borderRadius: 10,
              textAlign: 'center',
              background: i === 2 ? 'rgba(60,255,60,0.04)' : i === 1 ? 'rgba(255,200,60,0.04)' : 'rgba(255,255,255,0.02)',
            }}>
              <strong style={{fontSize: 40, letterSpacing: 3}}>{t.nines}</strong>
              <div style={{fontSize: 18, opacity: 0.7, marginTop: 8}}>{t.downtime}</div>
              <span style={{fontSize: 14, opacity: 0.5, textTransform: 'uppercase'}}>{t.label}</span>
            </div>
          ))}
        </div>
      ) : null}
      <div className="rr-wide-note">Availability targets define the architecture you need to build.</div>
    </HCContentWrap>
  );
};

/* ─── hc-33: Next video teaser ─── */
const HCNextVideoVisual = () => (
  <HCContentWrap>
    <Card style={{textAlign: 'center', padding: '28px 48px'}}>
      <BookOpen size={64} />
      <h2 style={{fontSize: 30}}>Next Explainer</h2>
      <p style={{fontSize: 22, opacity: 0.8}}>Availability Targets &amp; The Famous Nines</p>
    </Card>
    <div className="rr-chip-row" style={{gap: 14}}>
      {['SLA Math', 'Uptime Budget', 'Cost vs Nines'].map(item => (
        <span key={item} style={{padding: '8px 20px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 8, fontSize: 17, fontWeight: 700}}>{item}</span>
      ))}
    </div>
  </HCContentWrap>
);

/* ─── hc-34: Subscribe / series timeline ─── */
const HCSubscribeVisual = () => (
  <HCContentWrap>
    <div className="spof-agenda-timeline" style={{flexDirection: 'row', gap: 10}}>
      {['Availability', 'SPOF', 'Redundancy', 'Health Checks', 'Targets'].map((item, i) => (
        <div key={item} className="spof-timeline-item active" style={{opacity: i < 4 ? 1 : 0.4, padding: '8px 14px'}}>
          <span>{i + 1}</span>
          <p>{item}</p>
        </div>
      ))}
    </div>
    <Card className="inverted-card" style={{textAlign: 'center', padding: '24px 48px'}}>
      <Bell size={48} />
      <h2 style={{fontSize: 26}}>Subscribe to Engineering Systems</h2>
      <p style={{fontSize: 18, opacity: 0.7}}>Don't miss the next availability pattern</p>
    </Card>
  </HCContentWrap>
);

const hcBeatNumber = (beat: LessonBeat) => Number(beat.id.match(/^hc-(\d+)/)?.[1] ?? 0);

const hcProgress = (beat: LessonBeat, currentTime: number) =>
  Math.max(0, Math.min(1, (currentTime - beat.start) / Math.max(beat.end - beat.start, 0.001)));

const HCBeatStage: React.FC<{beat: LessonBeat; label: string; children: React.ReactNode}> = ({children}) => (
  <HCContentWrap style={{gap: 18, padding: '0'}}>
    <div className="hc2-stage">
      {children}
    </div>
  </HCContentWrap>
);

const HCPanel: React.FC<{children: React.ReactNode; emphasis?: boolean; muted?: boolean; style?: React.CSSProperties}> = ({
  children,
  emphasis = false,
  muted = false,
  style,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      minWidth: 214,
      minHeight: 142,
      padding: '24px 26px',
      border: '4px solid rgba(255,255,255,0.9)',
      borderRadius: 8,
      background: emphasis ? '#ffffff' : 'rgba(0,0,0,0.84)',
      color: emphasis ? '#000000' : '#ffffff',
      boxShadow: emphasis ? '13px 13px 0 rgba(255,255,255,0.18)' : '10px 10px 0 rgba(255,255,255,0.1)',
      opacity: muted ? 0.38 : 1,
      textAlign: 'center',
      textTransform: 'uppercase',
      transform: emphasis ? 'scale(1.04)' : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);

const HCNode = ({
  label,
  sub,
  icon: Icon,
  emphasis,
  muted,
  failed,
  style,
}: {
  label: string;
  sub?: string;
  icon: React.ComponentType<{size?: number}>;
  emphasis?: boolean;
  muted?: boolean;
  failed?: boolean;
  style?: React.CSSProperties;
}) => (
  <HCPanel emphasis={emphasis} muted={muted} style={{width: 236, minHeight: 158, borderStyle: failed ? 'double' : 'solid', ...style}}>
    {failed ? <XCircle size={58} /> : <Icon size={58} />}
    <strong style={{fontSize: 28, lineHeight: 1}}>{label}</strong>
    {sub ? <span style={{fontSize: 15, fontWeight: 900, opacity: emphasis ? 0.68 : 0.62}}>{sub}</span> : null}
  </HCPanel>
);

const HCArrow = ({label = '->', muted = false}: {label?: string; muted?: boolean}) => (
  <div
    style={{
      width: label.length > 4 ? 132 : 96,
      height: 58,
      position: 'relative',
      display: 'grid',
      placeItems: 'center',
      color: '#ffffff',
      fontSize: label.length > 4 ? 15 : 0,
      fontWeight: 950,
      opacity: muted ? 0.28 : 0.78,
      textAlign: 'center',
      textTransform: 'uppercase',
    }}
  >
    <svg viewBox="0 0 132 58" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}>
      <defs>
        <marker id={`hc-inline-arrow-${label.replace(/[^a-z0-9]/gi, '') || 'plain'}`} markerWidth="13" markerHeight="13" refX="11" refY="6.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M1 2 L12 6.5 L1 11 Z" fill="rgba(255,255,255,0.9)" />
        </marker>
      </defs>
      <path
        d={label.length > 4 ? 'M4 42 H124' : 'M4 29 H124'}
        fill="none"
        stroke="rgba(255,255,255,0.74)"
        strokeWidth="5"
        strokeLinecap="round"
        markerEnd={`url(#hc-inline-arrow-${label.replace(/[^a-z0-9]/gi, '') || 'plain'})`}
      />
    </svg>
    {label.length > 4 ? (
      <span style={{position: 'absolute', left: -12, right: -12, top: 2, zIndex: 1, padding: '2px 4px', textShadow: '0 3px 12px #000000'}}>
        {label}
      </span>
    ) : null}
  </div>
);

const HCBigNote = ({children, emphasis = false}: {children: React.ReactNode; emphasis?: boolean}) => (
  <div
    style={{
      width: 'min(1040px, 92%)',
      minHeight: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '3px solid rgba(255,255,255,0.76)',
      borderRadius: 8,
      background: emphasis ? '#ffffff' : 'rgba(0,0,0,0.72)',
      color: emphasis ? '#000000' : '#ffffff',
      padding: '16px 28px',
      fontSize: 25,
      fontWeight: 950,
      lineHeight: 1.05,
      textAlign: 'center',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

const HCFlowRow = ({children}: {children: React.ReactNode}) => (
  <div style={{position: 'absolute', inset: '74px 34px 86px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0}}>
    {children}
  </div>
);

const HCArchitectureBeat = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = hcBeatNumber(beat);
  const progress = hcProgress(beat, currentTime);
  const failed = n === 5 || n === 6;
  const showSecondary = n >= 3;
  const showBlindSpot = n === 4 || n === 6;

  if (n === 1) {
    return (
      <HCBeatStage beat={beat} label="availability pattern">
        <HCFlowRow>
          <HCNode label="Health Checks" sub="detect" icon={Activity} emphasis />
          <HCArrow />
          <HCNode label="Failover" sub="reroute" icon={RefreshCw} />
          <HCArrow />
          <HCNode label="Recovery" sub="resume" icon={CheckCircle2} />
        </HCFlowRow>
        <div style={{position: 'absolute', left: 56, bottom: 42, fontSize: 26, fontWeight: 950, textTransform: 'uppercase'}}>
          Engineering Systems / FoodDash
        </div>
      </HCBeatStage>
    );
  }

  return (
    <HCBeatStage beat={beat} label={failed ? 'failure setup' : 'database setup'}>
      <HCFlowRow>
        <HCNode label="FoodDash" sub="live app" icon={Smartphone} emphasis={n === 2} />
        <HCArrow label={failed ? 'traffic?' : 'traffic'} muted={failed} />
        <HCNode label="Primary DB" sub={failed ? 'crashed' : 'live traffic'} icon={Database} failed={failed} emphasis={!failed && n >= 3} />
        {showSecondary ? <HCArrow label={failed ? 'standby' : 'replicate'} /> : null}
        {showSecondary ? <HCNode label="Secondary DB" sub={failed ? 'synced copy' : 'replicated'} icon={Database} emphasis={failed} /> : null}
      </HCFlowRow>
      <div style={{position: 'absolute', left: 108, right: 108, bottom: 34, display: 'flex', justifyContent: 'center', gap: 16}}>
        {[
          ['Redundant', n >= 2],
          ['Replicated', showSecondary],
          ['Detected', !showBlindSpot && failed],
        ].map(([label, active]) => (
          <span
            key={String(label)}
            style={{
              border: '2px solid rgba(255,255,255,0.74)',
              borderRadius: 8,
              background: active ? '#ffffff' : 'rgba(0,0,0,0.78)',
              color: active ? '#000000' : '#ffffff',
              opacity: active || showBlindSpot ? 1 : 0.28,
              padding: '10px 18px',
              fontSize: 18,
              fontWeight: 950,
              textTransform: 'uppercase',
            }}
          >
            {label}
          </span>
        ))}
      </div>
      {showBlindSpot ? (
        <div style={{position: 'absolute', left: 390, top: 92 + progress * 10}}>
          <HCBigNote emphasis>Blind spot: who knows when to switch?</HCBigNote>
        </div>
      ) : null}
    </HCBeatStage>
  );
};

const hcCubicPoint = (
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
) => {
  const u = 1 - t;
  const x = u ** 3 * p0[0] + 3 * u ** 2 * t * p1[0] + 3 * u * t ** 2 * p2[0] + t ** 3 * p3[0];
  const y = u ** 3 * p0[1] + 3 * u ** 2 * t * p1[1] + 3 * u * t ** 2 * p2[1] + t ** 3 * p3[1];

  return {x, y};
};

const HCPulseBeat = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = hcBeatNumber(beat);
  const progress = hcProgress(beat, currentTime);
  const failed = n >= 11;
  const checks = n === 12 ? Math.max(1, Math.min(3, Math.ceil(progress * 3))) : n >= 13 ? 3 : 0;
  const isUserView = n === 10;
  const loopDuration = failed ? 1.8 : 2.2;
  const loop = ((currentTime - beat.start) % loopDuration) / loopDuration;
  const pingProgress = Math.min(1, loop / 0.48);
  const responseProgress = Math.max(0, Math.min(1, (loop - 0.52) / 0.4));
  const pingStart: [number, number] = [535, 252];
  const pingEnd: [number, number] = [845, 252];
  const responseStart: [number, number] = [845, 326];
  const responseEnd: [number, number] = [535, 326];
  const pingPoint = hcCubicPoint(pingProgress, pingStart, [625, 220], [755, 220], pingEnd);
  const responsePoint = hcCubicPoint(responseProgress, responseStart, [755, 370], [625, 370], responseEnd);
  const pingOpacity = loop < 0.52 ? (failed ? 0.8 - pingProgress * 0.45 : 1) : 0;
  const responseOpacity = !failed && loop >= 0.52 && loop < 0.96 ? 1 : 0;
  const pulse = failed ? 1 : 1 + Math.sin(loop * Math.PI * 2) * 0.018;
  const dbPulse = failed ? 1 : 1 + Math.sin((loop + 0.22) * Math.PI * 2) * 0.012;

  return (
    <HCBeatStage beat={beat} label={failed ? 'failure detection' : 'health check loop'}>
      <svg className="hc2-wire-svg" viewBox="0 0 1380 548">
        <defs>
          <marker id={`hc-arrow-tip-${beat.id}`} markerWidth="18" markerHeight="18" refX="16" refY="9" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M2 3 L16 9 L2 15 Z" fill="rgba(255,255,255,0.92)" />
          </marker>
          <marker id={`hc-arrow-tip-muted-${beat.id}`} markerWidth="16" markerHeight="16" refX="14" refY="8" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M2 3 L14 8 L2 13 Z" fill="rgba(255,255,255,0.56)" />
          </marker>
        </defs>
        <path
          d={`M${pingStart[0]} ${pingStart[1]} C625 220 755 220 ${pingEnd[0]} ${pingEnd[1]}`}
          fill="none"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={failed ? '14 20' : '0'}
          markerEnd={`url(#hc-arrow-tip-${beat.id})`}
        />
        <path
          d={`M${responseStart[0]} ${responseStart[1]} C755 370 625 370 ${responseEnd[0]} ${responseEnd[1]}`}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={failed ? '10 18' : '0'}
          markerEnd={`url(#hc-arrow-tip-muted-${beat.id})`}
        />
        <circle
          cx={pingPoint.x}
          cy={pingPoint.y}
          r="10"
          fill="#ffffff"
          opacity={pingOpacity}
        />
        <circle
          cx={pingPoint.x}
          cy={pingPoint.y}
          r="20"
          fill="none"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="3"
          opacity={pingOpacity * 0.75}
        />
        <circle
          cx={responsePoint.x}
          cy={responsePoint.y}
          r="9"
          fill="#ffffff"
          opacity={responseOpacity}
        />
        <circle
          cx={responsePoint.x}
          cy={responsePoint.y}
          r="18"
          fill="none"
          stroke="rgba(255,255,255,0.32)"
          strokeWidth="3"
          opacity={responseOpacity * 0.7}
        />
      </svg>
      <HCFlowRow>
        <HCNode
          label={isUserView ? 'Customers' : 'Checker'}
          sub={isUserView ? 'ordering lunch' : 'tiny request'}
          icon={isUserView ? ShoppingCart : Activity}
          emphasis={!failed}
          style={{transform: `scale(${pulse})`}}
        />
        <div style={{display: 'grid', gap: 46, minWidth: 250, justifyItems: 'center'}}>
          <span style={{fontSize: 28, fontWeight: 950, textTransform: 'uppercase', textShadow: '0 4px 18px #000000', opacity: pingOpacity > 0 ? 1 : 0.48}}>
            {failed ? 'check' : 'ping'}
          </span>
          <span style={{fontSize: 22, fontWeight: 950, opacity: failed ? 0.38 : responseOpacity > 0 ? 0.9 : 0.48, textTransform: 'uppercase', textShadow: '0 4px 18px #000000'}}>
            {failed ? 'silence' : 'response'}
          </span>
        </div>
        <HCNode label="Primary DB" sub={failed ? 'silent' : 'healthy'} icon={Database} failed={failed} emphasis={n === 9} style={{transform: `scale(${dbPulse})`}} />
      </HCFlowRow>
      {checks ? (
        <div style={{position: 'absolute', left: 450, right: 450, bottom: 44, display: 'flex', justifyContent: 'center', gap: 18}}>
          {[0, 1, 2].map((index) => (
            <HCPanel key={index} emphasis={index < checks} style={{minWidth: 126, minHeight: 82, padding: '12px 16px'}}>
              <strong style={{fontSize: 24}}>{index < checks ? 'MISS' : 'WAIT'}</strong>
              <span style={{fontSize: 13, fontWeight: 950}}>check {index + 1}</span>
            </HCPanel>
          ))}
        </div>
      ) : (
        <div style={{position: 'absolute', left: 210, right: 210, bottom: 46}}>
          <HCBigNote emphasis={n === 13}>
            {n === 13 ? 'Hard evidence: primary is down' : isUserView ? 'Monitoring stays invisible to users' : 'Every expected response proves life'}
          </HCBigNote>
        </div>
      )}
    </HCBeatStage>
  );
};

const HCFailoverBeat = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = hcBeatNumber(beat);
  const step = Math.max(0, Math.min(4, n - 15));
  const progress = hcProgress(beat, currentTime);
  const steps = [
    ['Detect', Search],
    ['Promote', ShieldAlert],
    ['Redirect', Globe],
    ['Reconnect', RefreshCw],
  ] as const;

  if (n === 14) {
    return (
      <HCBeatStage beat={beat} label="failover definition">
        <HCFlowRow>
          <HCNode label="Broken" sub="old path" icon={XCircle} failed />
          <HCArrow label="move traffic" />
          <HCNode label="Healthy" sub="new path" icon={CheckCircle2} emphasis />
        </HCFlowRow>
      </HCBeatStage>
    );
  }

  return (
    <HCBeatStage beat={beat} label="automated failover">
      <HCFlowRow>
        <HCNode label={step >= 2 ? 'Old Primary' : 'Primary DB'} sub={step >= 1 ? 'failed' : 'serving'} icon={Database} failed={step >= 1} muted={step >= 3} />
        <HCArrow label={step >= 3 ? 'traffic' : step >= 2 ? 'promote' : 'sync'} />
        <HCNode label={step >= 2 ? 'New Primary' : 'Backup DB'} sub={step >= 2 ? 'active' : 'standby'} icon={Database} emphasis={step >= 2} />
        {step >= 4 ? <HCArrow label="reconnect" /> : null}
        {step >= 4 ? <HCNode label="App Servers" sub="running" icon={Server} emphasis /> : null}
      </HCFlowRow>
      <div style={{position: 'absolute', left: 116, right: 116, bottom: 34, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16}}>
        {steps.map(([label, Icon], index) => (
          <HCPanel key={label} emphasis={index < step || (index === 0 && progress > 0.25)} muted={index > step} style={{minWidth: 0, minHeight: 96, padding: 14}}>
            <Icon size={30} />
            <strong style={{fontSize: 20}}>{label}</strong>
          </HCPanel>
        ))}
      </div>
    </HCBeatStage>
  );
};

const HCNoHumanBeat = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = hcBeatNumber(beat);
  const rows =
    n === 21
      ? ['No on-call wakeup', 'No manual login', 'No emergency config']
      : n === 22
        ? ['System spotted the problem', 'System rerouted traffic', 'System recovered alone']
        : ['The important part', 'Manual rescue did not happen'];
  const activeIndex =
    n === 21
      ? currentTime < 142.176
        ? 0
        : currentTime < 144.529
          ? 1
          : 2
      : n === 22
        ? Math.min(rows.length - 1, Math.floor(hcProgress(beat, currentTime) * rows.length))
        : rows.length - 1;

  return (
    <HCBeatStage beat={beat} label="automation">
      <div style={{position: 'absolute', inset: '82px 120px 58px', display: 'grid', gridTemplateColumns: n === 21 ? '1fr 1fr' : '1fr', gap: 26, alignItems: 'center'}}>
        {n === 21 ? (
          <HCPanel muted style={{minHeight: 298}}>
            <XCircle size={66} />
            <strong style={{fontSize: 34}}>Manual Rescue</strong>
            <span style={{fontSize: 18, fontWeight: 900}}>slow, risky, late</span>
          </HCPanel>
        ) : null}
        <div style={{display: 'grid', gap: 16}}>
          {rows.map((row, index) => (
            <HCPanel
              key={row}
              emphasis={index === activeIndex}
              muted={n === 21 && index !== activeIndex}
              style={{minHeight: 88, alignItems: 'flex-start', padding: '18px 30px'}}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                {n === 21 ? <XCircle size={32} /> : <CheckCircle2 size={32} />}
                <strong style={{fontSize: 26}}>{row}</strong>
              </div>
            </HCPanel>
          ))}
        </div>
      </div>
    </HCBeatStage>
  );
};

const HCThresholdBeat = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = hcBeatNumber(beat);
  const progress = hcProgress(beat, currentTime);
  const missCount = n === 28 ? Math.max(1, Math.min(3, Math.ceil(progress * 3))) : n >= 29 ? 3 : n >= 26 ? 1 : 0;
  const messyItems = [
    ['Heavy Query', Zap],
    ['Lost Packet', Radio],
    ['Temp Spike', Activity],
  ] as const;

  if (n === 23) {
    return (
      <HCBeatStage beat={beat} label="real world">
        <div style={{position: 'absolute', inset: '110px 100px 70px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, alignItems: 'center'}}>
          {messyItems.map(([label, Icon], index) => (
            <HCPanel key={label} emphasis={progress > index / 3} style={{minHeight: 228}}>
              <Icon size={62} />
              <strong style={{fontSize: 30}}>{label}</strong>
              <span style={{fontSize: 16, fontWeight: 900}}>temporary noise</span>
            </HCPanel>
          ))}
        </div>
      </HCBeatStage>
    );
  }

  if (n === 24 || n === 25) {
    return (
      <HCBeatStage beat={beat} label="false positive">
        <HCFlowRow>
          <HCNode label="One Miss" sub="not proof" icon={AlertTriangle} />
          <HCArrow label="panic?" />
          <HCNode label={n === 24 ? 'Mass Failover' : 'False Positive'} sub={n === 24 ? 'unstable' : 'wrong call'} icon={XCircle} failed emphasis={n === 25} />
        </HCFlowRow>
      </HCBeatStage>
    );
  }

  return (
    <HCBeatStage beat={beat} label="threshold rule">
      <div style={{position: 'absolute', inset: '104px 100px 100px', display: 'grid', gridTemplateColumns: '260px 1fr 260px', gap: 24, alignItems: 'center'}}>
        <HCNode label="Component" sub={n >= 29 ? 'declared dead' : 'under review'} icon={Server} failed={n >= 29} emphasis={n === 30} />
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}}>
          {['t0', 't+5s', 't+10s'].map((label, index) => (
            <HCPanel key={label} emphasis={index < missCount} muted={index >= missCount} style={{minHeight: 168, minWidth: 0}}>
              <strong style={{fontSize: 30}}>{label}</strong>
              <span style={{fontSize: 20, fontWeight: 950}}>{index < missCount ? 'FAIL' : 'WAIT'}</span>
            </HCPanel>
          ))}
        </div>
        <HCNode label={n >= 29 ? 'Decision' : 'Threshold'} sub={n >= 29 ? 'confirmed' : 'multiple misses'} icon={n >= 29 ? XCircle : Clock} emphasis={n >= 29} />
      </div>
      <div style={{position: 'absolute', left: 230, right: 230, bottom: 42}}>
        <HCBigNote emphasis={n === 30}>{n === 30 ? 'Catch fast. Avoid chaos.' : 'Require repeated failed checks before action.'}</HCBigNote>
      </div>
    </HCBeatStage>
  );
};

const HCClusterBeat = ({beat}: {beat: LessonBeat}) => {
  const n = hcBeatNumber(beat);
  const serverFailed = n >= 36 && n <= 39;
  const removed = n >= 37 && n <= 39;
  const rejoin = n === 41;
  const reboot = n === 40;
  const serving = n >= 38 && n <= 39;

  return (
    <HCBeatStage beat={beat} label={n <= 32 ? 'pattern transfer' : 'load balancer cluster'}>
      <HCFlowRow>
        {n <= 32 ? (
          <>
            <HCNode label="Database" sub="same pattern" icon={Database} emphasis={n === 31} />
            <HCArrow />
            <HCNode label="Load Balancer" sub="up stack" icon={Globe} emphasis={n === 32} />
            <HCArrow />
            <HCNode label="App Servers" sub="backend layer" icon={Server} />
          </>
        ) : (
          <>
            <HCNode label="Load Balancer" sub={n >= 34 ? 'checking' : 'routes'} icon={Globe} emphasis />
            <HCArrow label={serving ? 'orders' : 'checks'} />
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 150px)', gap: 14}}>
              {[1, 2, 3, 4].map((id) => {
                const isThree = id === 3;
                const isBad = isThree && serverFailed && !rejoin && !reboot;
                return (
                  <HCPanel
                    key={id}
                    emphasis={(n === 35 && !isBad) || (isThree && rejoin)}
                    muted={isThree && removed && !rejoin}
                    style={{minWidth: 0, minHeight: 148, padding: 16, borderStyle: isBad ? 'double' : 'solid'}}
                  >
                    {isBad ? <XCircle size={40} /> : reboot && isThree ? <RefreshCw size={40} /> : <Server size={40} />}
                    <strong style={{fontSize: 25}}>S{id}</strong>
                    <span style={{fontSize: 13, fontWeight: 950}}>
                      {isThree && isBad ? 'removed' : isThree && reboot ? 'rebooting' : 'healthy'}
                    </span>
                  </HCPanel>
                );
              })}
            </div>
          </>
        )}
      </HCFlowRow>
      {n >= 37 ? (
        <div style={{position: 'absolute', left: 220, right: 220, bottom: 40}}>
          <HCBigNote emphasis={n === 41}>
            {n === 41 ? 'Successful checks add server 3 back to rotation' : n === 39 ? 'Customers keep ordering through healthy paths' : 'Server 3 is isolated from new traffic'}
          </HCBigNote>
        </div>
      ) : null}
    </HCBeatStage>
  );
};

const HCTestAndSummaryBeat = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = hcBeatNumber(beat);
  const progress = hcProgress(beat, currentTime);

  if (n <= 45) {
    const rows =
      n === 42
        ? ['Never assume failover works', 'Test it']
        : n === 43
          ? ['Controlled environment', 'Intentional shutdown', 'Observe recovery']
          : n === 44
            ? ['Simulate outage', 'Validate automation', 'Fix before incident']
            : ['2 AM outage', 'Worst time to learn', 'Test recovery first'];

    return (
      <HCBeatStage beat={beat} label="recovery testing">
        <div style={{position: 'absolute', inset: '96px 170px 70px', display: 'grid', gap: 18}}>
          {rows.map((row, index) => (
            <HCPanel key={row} emphasis={index <= Math.floor(progress * rows.length)} style={{minHeight: 88, alignItems: 'flex-start'}}>
              <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
                {n === 45 ? <AlertTriangle size={34} /> : <CheckCircle2 size={34} />}
                <strong style={{fontSize: 30}}>{row}</strong>
              </div>
            </HCPanel>
          ))}
        </div>
      </HCBeatStage>
    );
  }

  const items = [
    ['Redundancy', Database, n >= 47],
    ['Replication', RefreshCw, n >= 47],
    ['Health Checks', Activity, n >= 48],
    ['Failover', Globe, n >= 48],
    ['Testing', ShieldAlert, n >= 49],
  ] as const;

  return (
    <HCBeatStage beat={beat} label="summary stack">
      <div style={{position: 'absolute', inset: '92px 88px 80px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, alignItems: 'center'}}>
        {items.map(([label, Icon, active]) => (
          <HCPanel key={label} emphasis={active || n === 50} muted={!active && n !== 46 && n !== 50} style={{minWidth: 0, minHeight: 230, padding: 18}}>
            <Icon size={52} />
            <strong style={{fontSize: 24}}>{label}</strong>
          </HCPanel>
        ))}
      </div>
      <div style={{position: 'absolute', left: 218, right: 218, bottom: 38}}>
        <HCBigNote emphasis={n === 50}>{n === 50 ? 'Coordinated layers survive failure with near-zero downtime' : 'Each layer has a job in the recovery system'}</HCBigNote>
      </div>
    </HCBeatStage>
  );
};

const HCNinesBeat = ({beat}: {beat: LessonBeat}) => {
  const n = hcBeatNumber(beat);
  const tiers = [
    ['99.9%', '~8.7 hrs / yr'],
    ['99.99%', '~52 min / yr'],
    ['99.999%', '~5 min / yr'],
  ];

  if (n === 55) {
    return (
      <HCBeatStage beat={beat} label="next explainer">
        <HCFlowRow>
          <HCNode label="Availability Targets" sub="next" icon={BookOpen} emphasis />
          <HCArrow />
          <HCNode label="The Nines" sub="SLA math" icon={LineChart} />
        </HCFlowRow>
      </HCBeatStage>
    );
  }

  return (
    <HCBeatStage beat={beat} label="availability targets">
      <div style={{position: 'absolute', inset: '96px 110px 82px', display: n >= 54 ? 'grid' : 'flex', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center', justifyContent: 'center', gap: 22}}>
        {n >= 54
          ? tiers.map(([nine, downtime], index) => (
              <HCPanel key={nine} emphasis={index === 0 || n > 54} style={{minHeight: 228}}>
                <strong style={{fontSize: 48}}>{nine}</strong>
                <span style={{fontSize: 22, fontWeight: 950}}>{downtime}</span>
              </HCPanel>
            ))
          : (
              <HCPanel emphasis style={{width: 780, minHeight: 260}}>
                <Clock size={76} />
                <strong style={{fontSize: 42}}>{n === 51 ? 'One Question Remains' : n === 52 ? 'Acceptable Downtime?' : 'Measure Availability'}</strong>
                <span style={{fontSize: 22, fontWeight: 900}}>{n === 51 ? 'Recovery needs a target' : n === 52 ? 'How much can FoodDash tolerate?' : 'Business tolerance becomes an engineering number'}</span>
              </HCPanel>
            )}
      </div>
    </HCBeatStage>
  );
};

const HCScreenVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = hcBeatNumber(beat);

  if (n <= 6) {
    return <HCArchitectureBeat beat={beat} currentTime={currentTime} />;
  }
  if (n <= 13) {
    return <HCPulseBeat beat={beat} currentTime={currentTime} />;
  }
  if (n <= 19) {
    return <HCFailoverBeat beat={beat} currentTime={currentTime} />;
  }
  if (n <= 22) {
    return <HCNoHumanBeat beat={beat} currentTime={currentTime} />;
  }
  if (n <= 30) {
    return <HCThresholdBeat beat={beat} currentTime={currentTime} />;
  }
  if (n <= 41) {
    return <HCClusterBeat beat={beat} />;
  }
  if (n <= 50) {
    return <HCTestAndSummaryBeat beat={beat} currentTime={currentTime} />;
  }
  if (n <= 55) {
    return <HCNinesBeat beat={beat} />;
  }

  return <HCSectionVisual beat={beat} />;
};

const RRScreenVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  switch (beat.id) {
    case 'rr-01':
      return <RREngineeringIntroVisual />;
    case 'rr-02':
      return <RRFoodDashMiniVisual mode="recap" />;
    case 'rr-03':
      return <RRFoodDashAppOutageVisual currentTime={currentTime} />;
    case 'rr-04':
      return <RRFoodDashMiniVisual mode="spof" />;
    case 'rr-05':
      return <RRFoodDashMiniVisual mode="question" />;
    case 'rr-06':
      return <RRBigTechFailureVisual currentTime={currentTime} />;
    case 'rr-06b':
      return <RRFailureGuaranteedVisual />;
    case 'rr-07':
      return <RRConceptCardsVisual />;
    case 'rr-08':
      return <RRAgendaVisual currentTime={currentTime} />;
    case 'rr-08b':
      return <RRAgendaVisual currentTime={currentTime} />;
    case 'rr-09':
    case 'rr-14':
    case 'rr-29':
    case 'rr-41':
    case 'rr-47':
      return <RRSectionVisual beat={beat} />;
    case 'rr-10':
      return <RRFoodDashComponentCheckVisual currentTime={currentTime} />;
    case 'rr-11':
    case 'rr-11b':
      return <RRDependencyFanInVisual currentTime={currentTime} />;
    case 'rr-12':
      return <RRBlastRadiusRippleVisual currentTime={currentTime} />;
    case 'rr-13':
      return <RRPostmortemVisual />;
    case 'rr-15':
      return <RRRedundancyVisual currentTime={currentTime} />;
    case 'rr-16':
      return <RRExamplesVisual currentTime={currentTime} />;
    case 'rr-17':
      return <RRDependencyPathsVisual />;
    case 'rr-18':
      return <RRHardwareTrapVisual currentTime={currentTime} />;
    case 'rr-19':
      return <RRShinyBackupVisual currentTime={currentTime} />;
    case 'rr-20':
      return <RREmptyBackupMysteryVisual currentTime={currentTime} />;
    case 'rr-21':
      return <RREmptyFailoverVisual currentTime={currentTime} />;
    case 'rr-22':
      return <RRReplicationRevealVisual currentTime={currentTime} />;
    case 'rr-23':
      return <RRComparisonVisual currentTime={currentTime} />;
    case 'rr-24':
      return <RRConceptCardsVisual />;
    case 'rr-25':
      return <RRBusVisual />;
    case 'rr-26':
      return <RRArchitectureVisual />;
    case 'rr-27':
      return <RRReplicatedDataVisual both />;
    case 'rr-28':
      return <RRFoodDashMiniVisual mode="survival" />;
    case 'rr-30':
      return <RRActivePassiveDetailedVisual mode="setup" />;
    case 'rr-31':
      return <RRActivePassiveDetailedVisual mode="traffic" />;
    case 'rr-32':
      return <RRActivePassiveDetailedVisual mode="sync" />;
    case 'rr-33':
      return <RRActivePassiveDetailedVisual mode="fail" />;
    case 'rr-34':
      return <RRActivePassiveDetailedVisual mode="promote" />;
    case 'rr-35':
      return <RRActivePassiveDetailedVisual mode="redirect" />;
    case 'rr-36':
      return <RRActivePassiveDetailedVisual mode="simple" />;
    case 'rr-37':
      return <RRActivePassiveDetailedVisual mode="idle" />;
    case 'rr-38':
      return <RRActivePassiveDetailedVisual mode="waste" />;
    case 'rr-39':
      return <RRSpareTireVisual currentTime={currentTime} />;
    case 'rr-40':
      return <RRActivePassiveDetailedVisual mode="wake" />;
    case 'rr-42':
      return <RRActiveActiveDetailedVisual mode="both" />;
    case 'rr-43':
      return <RRActiveActiveDetailedVisual mode="split" />;
    case 'rr-44':
      return <RRActiveActiveDetailedVisual mode="fail" />;
    case 'rr-45':
      return <RRActiveActiveDetailedVisual mode="absorb" />;
    case 'rr-46':
      return <RRActiveActiveDetailedVisual mode="benefits" />;
    case 'rr-48':
      return <RRTradeoffScaleVisual mode="compare" />;
    case 'rr-49':
      return <RRTradeoffScaleVisual mode="passive" />;
    case 'rr-50':
      return <RRTradeoffScaleVisual mode="active" />;
    case 'rr-51':
      return <RRConflictDetailedVisual />;
    case 'rr-52':
      return <RRTradeoffScaleVisual mode="coordination" />;
    case 'rr-53':
      return <RRTradeoffScaleVisual mode="free" />;
    case 'rr-54':
      return <RRContextDecisionVisual mode="internal" />;
    case 'rr-55':
      return <RRContextDecisionVisual mode="consumer" />;
    case 'rr-56':
      return <RRContextDecisionVisual mode="factors" currentTime={currentTime} />;
    case 'rr-57':
      return <RRAgendaVisual currentTime={79.5} />;
    case 'rr-58':
      return <RRFoodDashMiniVisual mode="blast" />;
    case 'rr-59':
      return <RRDependencyPathsVisual />;
    case 'rr-60':
      return <RRReplicatedDataVisual both />;
    case 'rr-61':
      return <RRRecapActivePassiveVisual currentTime={currentTime} />;
    case 'rr-62':
      return <RRActiveActiveDetailedVisual mode="split" />;
    case 'rr-63':
      return <RRFoundationVisual currentTime={currentTime} />;
    case 'rr-64':
      return <RRDetectionBridgeVisual currentTime={currentTime} />;
  }
  return <RRSectionVisual beat={beat} />;
};

const renderVisual = (beat: LessonBeat, currentTime: number, frame: number, fps: number) => {
  switch (beat.kind) {
    case 'intro':
      return <IntroVisual />;
    case 'practical-shift':
      return <PracticalShiftVisual />;
    case 'opening-question':
      return <OpeningQuestionVisual />;
    case 'myth':
      return <MythVisual />;
    case 'mosaic':
      return <MosaicVisual />;
    case 'mosaic-contracts':
      return <MosaicContractsVisual />;
    case 'vocabulary':
      return <VocabularyVisual />;
    case 'vocabulary-spectrum':
      return <VocabularySpectrumVisual />;
    case 'agenda':
      return <AgendaVisual currentTime={currentTime} />;
    case 'agenda-examples':
      return <AgendaExamplesVisual />;
    case 'principle':
      return <PrincipleVisual />;
    case 'principle-scope':
      return <PrincipleScopeVisual />;
    case 'feature-contrast':
      return <FeatureContrastVisual />;
    case 'like-button-example':
      return <LikeButtonExampleVisual />;
    case 'commerce-map':
      return <CommerceMap />;
    case 'inventory':
      return <ExampleVisual kind={beat.kind} />;
    case 'inventory-rule':
      return <StockRuleVisual />;
    case 'inventory-race':
      return <InventoryRaceVisual />;
    case 'reviews':
      return <ExampleVisual kind={beat.kind} />;
    case 'review-choice':
      return <ReviewLagVisual />;
    case 'profile':
      return <ExampleVisual kind={beat.kind} />;
    case 'profile-trust':
      return <ProfileTrustVisual />;
    case 'comments':
      return <ExampleVisual kind={beat.kind} />;
    case 'comments-order':
      return <CausalOrderVisual />;
    case 'analytics':
      return <ExampleVisual kind={beat.kind} />;
    case 'analytics-impact':
      return <AnalyticsImpactVisual />;
    case 'analytics-staleness':
      return <AnalyticsStalenessVisual />;
    case 'analytics-speed':
      return <AnalyticsSpeedVisual />;
    case 'tradeoff':
      return <TradeoffVisual />;
    case 'coordination-cost':
      return <TradeoffVisual />;
    case 'coordination-pressure':
      return <CoordinationPressureVisual />;
    case 'decision-framework':
      return <FrameworkVisual currentTime={currentTime} />;
    case 'risk-step':
      return <SingleStepVisual step={0} />;
    case 'business-step':
      return <SingleStepVisual step={1} />;
    case 'choose-step':
      return <SingleStepVisual step={2} />;
    case 'sufficient-step':
      return <SufficientStepVisual />;
    case 'spectrum':
    case 'spectrum-strong':
      return <SpectrumVisual currentTime={currentTime} emphasis={0} />;
    case 'spectrum-coordination':
      return <SpectrumCoordinationVisual />;
    case 'spectrum-middle':
      return <SpectrumVisual currentTime={currentTime} emphasis={2} />;
    case 'spectrum-weak':
      return <SpectrumVisual currentTime={currentTime} emphasis={4} />;
    case 'final-lesson':
      return <FinalLessonVisual />;
    case 'decision-checklist':
      return <DecisionChecklistVisual />;
    case 'tradeoff-recap':
      return <TradeoffRecapVisual />;
    case 'availability-bridge':
      return <AvailabilityBridgeVisual />;
    case 'next-series':
      return <NextSeriesVisual />;
    case 'availability-preview':
      return <AvailabilityPreviewVisual />;
    case 'failure-preview':
      return <FailurePreviewVisual />;
    case 'spof-video-intro':
      return <SpofVideoIntroVisual />;
    case 'spof-recap':
      return <SpofRecapVisual />;
    case 'spof-start-availability':
      return <SpofStartAvailabilityVisual />;
    case 'spof-agenda':
      return <SpofAgendaVisual currentTime={currentTime} />;
    case 'spof-section-heading':
      return <SpofSectionHeadingVisual beat={beat} />;
    case 'spof-availability-question':
      return <SpofAvailabilityQuestionVisual currentTime={currentTime} />;
    case 'spof-network-definition':
      return <SpofNetworkDefinitionVisual currentTime={currentTime} />;
    case 'spof-green-red':
      return <SpofGreenRedVisual currentTime={currentTime} />;
    case 'spof-home-appliances':
      return <SpofHomeAppliancesVisual currentTime={currentTime} />;
    case 'spof-order-process':
      return <SpofOrderProcessVisual currentTime={currentTime} />;
    case 'spof-broken-database':
      return <SpofBrokenDatabaseVisual currentTime={currentTime} />;
    case 'spof-hidden-comparison':
      return <SpofHiddenComparisonVisual currentTime={currentTime} />;
    case 'spof-failure-chain':
      return <SpofFailureChainVisual currentTime={currentTime} />;
    case 'spof-disappear-question':
      return <SpofDisappearQuestionVisual currentTime={currentTime} />;
    case 'spof-fooddash-scan':
      return <SpofFoodDashScanVisual currentTime={currentTime} />;
    case 'spof-central-quote':
      return <SpofCentralQuoteVisual currentTime={currentTime} />;
    case 'spof-human-cloud':
      return <SpofHumanCloudVisual currentTime={currentTime} />;
    case 'spof-tech-human':
      return <SpofTechHumanVisual currentTime={currentTime} />;
    case 'spof-first-step':
      return <SpofFirstStepVisual />;
    case 'spof-blank-canvas':
      return <SpofCanvasVisual />;
    case 'spof-fault-tolerant-canvas':
      return <SpofCanvasVisual filled />;
    case 'spof-vulnerability-zoom':
      return <SpofCanvasVisual filled warnings />;
    case 'spof-own-walls':
      return <SpofOwnWallsVisual />;
    case 'spof-failure-paths':
      return <SpofFailurePathsVisual currentTime={currentTime} />;
    case 'spof-fragility-meter':
      return <SpofFragilityMeterVisual currentTime={currentTime} />;
    case 'spof-minimize-dependencies':
      return <SpofMinimizeDependenciesVisual />;
    case 'spof-scan-cards':
      return <SpofScanCardsVisual currentTime={currentTime} />;
    case 'spof-complete-checklist':
      return <SpofCompleteChecklistVisual />;
    case 'spof-learned-title':
      return <SpofLearnedTitleVisual />;
    case 'spof-summary-takedown':
      return <SpofSummaryTakedownVisual />;
    case 'spof-summary-everywhere':
      return <SpofSummaryEverywhereVisual currentTime={currentTime} />;
    case 'spof-summary-minimize':
      return <SpofSummaryMinimizeVisual />;
    case 'spof-summary-foundation':
      return <SpofSummaryFoundationVisual />;
    case 'spof-timeline-complete':
      return <SpofTimelineVisual />;
    case 'spof-next-redundancy':
      return <SpofTimelineVisual next />;
    case 'spof-redundancy-preview':
      return <SpofRedundancyPreviewVisual />;
    case 'spof-subscribe':
      return <SpofSubscribeVisual />;
    case 'spof-final-question':
      return <SpofFinalQuestionVisual />;
    case 'hc-screen':
      return <HCScreenVisual beat={beat} currentTime={currentTime} />;
    case 'rr-screen':
      return <RRScreenVisual beat={beat} currentTime={currentTime} />;
    case 'fn-screen':
      return <FamousNinesVisual beat={beat} currentTime={currentTime} frame={frame} fps={fps} />;
    case 'sap-screen':
      return <SeriesParallelAvailabilityVisual beat={beat} currentTime={currentTime} frame={frame} fps={fps} />;
    case 'lb-screen':
      return <LoadBalancingVisual beat={beat} currentTime={currentTime} frame={frame} fps={fps} />;
    case 'lba-screen':
      return <LoadBalancingAlgorithmsVisual beat={beat} currentTime={currentTime} frame={frame} fps={fps} />;
    case 'l47-screen':
      return <Layer4Layer7Visual beat={beat} currentTime={currentTime} frame={frame} fps={fps} />;
    case 'availability-intro':
      return <AvailabilityIntroVisual />;
    case 'availability-series-shift':
      return <AvailabilitySeriesShiftVisual />;
    case 'availability-pillar':
      return <AvailabilityPillarVisual />;
    case 'availability-roadmap':
      return <AvailabilityRoadmapVisual currentTime={currentTime} />;
    case 'consistency-vs-availability':
      return <ConsistencyVsAvailabilityVisual />;
    case 'consistency-side':
      return <ConsistencySideVisual />;
    case 'availability-catch':
      return <AvailabilityCatchVisual />;
    case 'availability-side':
      return <AvailabilityDefinitionVisual />;
    case 'availability-definition':
      return <AvailabilityDefinitionVisual />;
    case 'request-response':
      return <RequestResponseVisual />;
    case 'timeout-unavailable':
      return <TimeoutUnavailableVisual />;
    case 'availability-at-scale':
      return <AvailabilityAtScaleVisual />;
    case 'nines-table':
    case 'nines-shrink':
      return <NinesVisual currentTime={currentTime} />;
    case 'fooddash-map':
      return <FoodDashMapVisual />;
    case 'fooddash-rush':
      return <FoodDashRushVisual />;
    case 'fooddash-journey':
      return <FoodDashJourneyVisual />;
    case 'outage-blast':
      return <OutageBlastVisual />;
    case 'service-unavailable':
      return <ServiceUnavailableVisual />;
    case 'outage-impact':
      return <OutageImpactVisual />;
    case 'business-concern':
      return <BusinessConcernVisual />;
    case 'downtime-cost':
      return <DowntimeCostVisual />;
    case 'failure-question':
      return <FailureQuestionVisual />;
    case 'reality-breaks':
      return <RealityBreaksVisual />;
    case 'failure-list':
      return <FailureListVisual currentTime={currentTime} />;
    case 'failure-expected':
      return <FailureExpectedVisual />;
    case 'availability-mindset':
      return <AvailabilityMindsetVisual />;
    case 'patterns-toolkit':
      return <PatternsToolkitVisual />;
    case 'patterns-purpose':
      return <PatternsPurposeVisual />;
    case 'redundancy-pattern':
      return <RedundancyPatternVisual />;
    case 'pattern-grid':
      return <PatternGridVisual />;
    case 'failure-isolation':
      return <FailureIsolationVisual />;
    case 'spof-intro':
      return <SpofIntroVisual />;
    case 'single-server':
      return <SingleServerVisual />;
    case 'crash-offline':
      return <CrashOfflineVisual />;
    case 'spof-definition':
      return <SpofDefinitionVisual />;
    case 'remove-spof':
      return <RemoveSpofVisual />;
    case 'catastrophe-goal':
      return <CatastropheGoalVisual />;
    case 'user-never-notices':
      return <UserNeverNoticesVisual />;
    case 'recap-availability':
      return <RecapAvailabilityVisual currentTime={currentTime} />;
    case 'next-spof':
      return <NextSpofVisual />;
    case 'final-question':
      return <FinalQuestionVisual />;
    case 'closing':
      return <ClosingVisual />;
  }
};

export const LessonVisuals: React.FC<LessonVisualsProps> = ({beat, currentTime, frame, fps}) => {
  const keepSceneStable = beat.kind === 'hc-screen' || beat.kind === 'fn-screen' || beat.kind === 'sap-screen' || beat.kind === 'lb-screen' || beat.kind === 'lba-screen' || beat.kind === 'l47-screen';
  const showTakeaway = beat.id !== 'fn-01';
  const suppressChrome =
    beat.kind === 'lba-screen' ||
    beat.kind === 'l47-screen' ||
    beat.id === 'lb-55' ||
    (beat.id === 'lb-54' && currentTime >= 440.99) ||
    beat.id === 'lba-55' ||
    beat.id === 'lba-56';
  const localFrame = Math.max(0, frame - Math.round(beat.start * fps));
  const entrance = spring({
    frame: localFrame,
    fps,
    from: 0,
    to: 1,
    config: {damping: 18, stiffness: 130, mass: 0.8},
  });
  const opacity = keepSceneStable
    ? 1
    : interpolate(localFrame, [0, 8, 18], [0, 0.7, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const yOffset = 20;
  const startScale = 0.985;
  const transform = keepSceneStable ? 'none' : `translateY(${(1 - entrance) * yOffset}px) scale(${startScale + entrance * (1 - startScale)})`;

  return (
    <section
      className={`lesson-visuals lesson-kind-${beat.kind}`}
      style={{
        opacity,
        transform,
      }}
    >
      {!suppressChrome ? <BeatHeader beat={beat} /> : null}
      <div className="lesson-body">{renderVisual(beat, currentTime, frame, fps)}</div>
      {showTakeaway && !suppressChrome ? (
        <div className="takeaway-strip">
          <strong>{beat.takeaway}</strong>
        </div>
      ) : null}
    </section>
  );
};
