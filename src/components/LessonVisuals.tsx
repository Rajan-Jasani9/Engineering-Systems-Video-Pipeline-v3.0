import React from 'react';
import {AlertTriangle, Bell, BookOpen, CheckCircle2, Clock, Cloud, Code2, CreditCard, Database, GitBranch, Globe, KeyRound, Layers3, LineChart, LockKeyhole, Mail, MessageSquare, PackageCheck, Pencil, PencilRuler, Scale, Search, Server, ShieldAlert, ShoppingCart, Smartphone, Sparkles, ThumbsUp, User, UserCheck, Wrench, XCircle} from 'lucide-react';
import {interpolate, spring} from 'remotion';
import {HCScreenVisual} from '../videos/health-checks-and-failover/visuals';
import type {LessonBeat} from '../types';

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

const Card: React.FC<{children: React.ReactNode; className?: string}> = ({children, className = ''}) => (
  <div className={`lesson-card ${className}`}>{children}</div>
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

const renderVisual = (beat: LessonBeat, currentTime: number) => {
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
    case 'rr-screen':
      return <RRScreenVisual beat={beat} currentTime={currentTime} />;
    case 'hc-screen':
      return <HCScreenVisual beat={beat} currentTime={currentTime} />;
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
  const localFrame = Math.max(0, frame - Math.round(beat.start * fps));
  const isHealthChecksScreen = beat.kind === 'hc-screen';
  const entrance = spring({
    frame: localFrame,
    fps,
    from: 0,
    to: 1,
    config: {damping: 18, stiffness: 130, mass: 0.8},
  });
  const opacity = interpolate(localFrame, isHealthChecksScreen ? [0, 6, 12] : [0, 8, 18], isHealthChecksScreen ? [0.72, 0.94, 1] : [0, 0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const yOffset = isHealthChecksScreen ? 8 : 20;
  const startScale = isHealthChecksScreen ? 0.996 : 0.985;

  return (
    <section
      className={`lesson-visuals lesson-kind-${beat.kind}`}
      style={{
        opacity,
        transform: `translateY(${(1 - entrance) * yOffset}px) scale(${startScale + entrance * (1 - startScale)})`,
      }}
    >
      <BeatHeader beat={beat} />
      <div className="lesson-body">{renderVisual(beat, currentTime)}</div>
      <div className="takeaway-strip">
        <strong>{beat.takeaway}</strong>
      </div>
    </section>
  );
};
