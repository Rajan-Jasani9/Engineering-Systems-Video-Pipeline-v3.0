import React from 'react';
import {Bell, BookOpen, CheckCircle2, Clock, Database, GitBranch, Globe, Layers3, LineChart, LockKeyhole, MessageSquare, PackageCheck, PencilRuler, Scale, Server, ShieldAlert, ShoppingCart, Sparkles, ThumbsUp, UserCheck, XCircle} from 'lucide-react';
import {interpolate, spring} from 'remotion';
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
  const entrance = spring({
    frame: localFrame,
    fps,
    from: 0,
    to: 1,
    config: {damping: 18, stiffness: 130, mass: 0.8},
  });
  const opacity = interpolate(localFrame, [0, 8, 18], [0, 0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <section
      className={`lesson-visuals lesson-kind-${beat.kind}`}
      style={{
        opacity,
        transform: `translateY(${(1 - entrance) * 20}px) scale(${0.985 + entrance * 0.015})`,
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
