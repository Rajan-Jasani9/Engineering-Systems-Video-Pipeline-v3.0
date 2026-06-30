import React from 'react';
import {
  Clock,
  Cpu,
  Dice5,
  GitBranch,
  Hash,
  HelpCircle,
  Layers3,
  LineChart,
  Mail,
  RefreshCw,
  Scale,
  Smartphone,
  Users,
} from 'lucide-react';
import {Easing, interpolate} from 'remotion';
import type {LessonBeat} from '../../types';

type LoadBalancingAlgorithmsVisualProps = {
  beat: LessonBeat;
  currentTime: number;
  frame: number;
  fps: number;
};

type IconType = React.ComponentType<{size?: number; strokeWidth?: number}>;

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const beatNumber = (beat: LessonBeat) => Number(beat.id.replace('lba-', '')) || 0;
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const rangeProgress = (currentTime: number, start: number, end: number) =>
  clamp((currentTime - start) / Math.max(end - start, 0.001));
const smooth = (progress: number, from = 0, to = 1) =>
  interpolate(progress, [from, to], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const panelStyle: React.CSSProperties = {
  border: '4px solid #ffffff',
  borderRadius: 8,
  background: 'rgba(0,0,0,0.88)',
  color: '#ffffff',
  boxShadow: '12px 12px 0 rgba(255,255,255,0.1)',
};

const Stage: React.FC<{title: string; subtitle: string; chapter: string; icon?: IconType; children: React.ReactNode}> = ({
  title,
  subtitle,
  chapter,
  icon: Icon = GitBranch,
  children,
}) => (
  <div
    style={{
      position: 'relative',
      width: 'min(1500px, 100%)',
      height: 742,
      display: 'grid',
      gridTemplateRows: '58px 104px 1fr',
      gap: 18,
      color: '#ffffff',
    }}
  >
    <div
      style={{
        ...panelStyle,
        display: 'grid',
        gridTemplateColumns: '160px minmax(0, 1fr) 160px',
        alignItems: 'center',
        padding: '10px 28px',
        boxShadow: 'none',
        textTransform: 'uppercase',
      }}
    >
      <div style={{fontSize: 15, fontWeight: 950, opacity: 0.66}}>Chapter</div>
      <div style={{fontSize: 30, fontWeight: 950, lineHeight: 1, overflow: 'hidden', textAlign: 'center', whiteSpace: 'nowrap'}}>
        {chapter}
      </div>
      <div />
    </div>
    <div
      style={{
        ...panelStyle,
        display: 'grid',
        gridTemplateColumns: '72px minmax(0, 1fr)',
        alignItems: 'center',
        gap: 22,
        padding: '18px 28px',
        boxShadow: 'none',
      }}
    >
      <div
        style={{
          width: 58,
          height: 58,
          display: 'grid',
          placeItems: 'center',
          border: '3px solid #ffffff',
          borderRadius: 8,
          background: '#ffffff',
          color: '#000000',
        }}
      >
        <Icon size={34} strokeWidth={3} />
      </div>
      <div>
        <div
          style={{
            fontSize: title.length > 46 ? 34 : 42,
            fontWeight: 950,
            lineHeight: 0.98,
            overflow: 'hidden',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </div>
        <div style={{marginTop: 8, color: 'rgba(255,255,255,0.72)', fontSize: 20, fontWeight: 850, textTransform: 'uppercase'}}>
          {subtitle}
        </div>
      </div>
    </div>
    <div style={{minHeight: 0}}>{children}</div>
  </div>
);

const Card: React.FC<{
  children: React.ReactNode;
  active?: boolean;
  muted?: boolean;
  inverted?: boolean;
  style?: React.CSSProperties;
}> = ({children, active, muted, inverted, style}) => (
  <div
    style={{
      ...panelStyle,
      background: inverted || active ? '#ffffff' : 'rgba(0,0,0,0.88)',
      color: inverted || active ? '#000000' : '#ffffff',
      opacity: muted ? 0.38 : 1,
      padding: 24,
      boxShadow: active ? '14px 14px 0 rgba(255,255,255,0.16)' : '8px 8px 0 rgba(255,255,255,0.07)',
      ...style,
    }}
  >
    {children}
  </div>
);

const Label: React.FC<{children: React.ReactNode; inverted?: boolean}> = ({children, inverted}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '3px solid currentColor',
      borderRadius: 999,
      padding: '8px 14px',
      background: inverted ? '#ffffff' : 'transparent',
      color: inverted ? '#000000' : 'inherit',
      fontSize: 16,
      fontWeight: 950,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const BigNumber: React.FC<{value: string; label: string; active?: boolean}> = ({value, label, active}) => (
  <Card active={active} style={{display: 'grid', alignContent: 'center', gap: 12, minHeight: 156, textAlign: 'center'}}>
    <div style={{fontSize: 64, fontWeight: 950, lineHeight: 0.92, fontFamily: 'Courier New, monospace'}}>{value}</div>
    <div style={{fontSize: 20, fontWeight: 950, lineHeight: 1.02, textTransform: 'uppercase', opacity: active ? 0.82 : 0.72}}>{label}</div>
  </Card>
);

const ConceptGrid: React.FC<{
  items: Array<{title: string; note: string; active?: boolean; value?: string; muted?: boolean}>;
  columns?: number;
  minHeight?: number;
}> = ({items, columns = 3, minHeight = 158}) => (
  <div style={{display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: 18}}>
    {items.map((item) => (
      <Card key={item.title} active={item.active} muted={item.muted} style={{minHeight, display: 'grid', alignContent: 'center', gap: 10}}>
        <div style={{fontSize: item.value ? 24 : 30, fontWeight: 950, lineHeight: 1.02, textTransform: 'uppercase'}}>{item.title}</div>
        {item.value ? <div style={{fontSize: 54, fontWeight: 950, lineHeight: 0.9, fontFamily: 'Courier New, monospace'}}>{item.value}</div> : null}
        <div style={{fontSize: 18, fontWeight: 900, lineHeight: 1.08, textTransform: 'uppercase', opacity: 0.72}}>{item.note}</div>
      </Card>
    ))}
  </div>
);

const MetricGrid: React.FC<{
  rows: Array<{server: string; value: string; label: string; active?: boolean; muted?: boolean}>;
}> = ({rows}) => (
  <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 22}}>
    {rows.map((row) => (
      <Card key={row.server} active={row.active} muted={row.muted} style={{minHeight: 220, display: 'grid', alignContent: 'center', gap: 14}}>
        <div style={{fontSize: 28, fontWeight: 950, textTransform: 'uppercase'}}>{row.server}</div>
        <div style={{fontSize: 76, fontWeight: 950, lineHeight: 0.86, fontFamily: 'Courier New, monospace'}}>{row.value}</div>
        <div style={{fontSize: 21, fontWeight: 900, textTransform: 'uppercase', opacity: 0.72}}>{row.label}</div>
      </Card>
    ))}
  </div>
);

const SequenceStrip: React.FC<{items: string[]; activeCount: number; title: string}> = ({items, activeCount, title}) => (
  <Card style={{display: 'grid', gap: 18}}>
    <div style={{fontSize: 20, fontWeight: 950, textTransform: 'uppercase', opacity: 0.72}}>{title}</div>
    <div style={{display: 'grid', gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`, gap: 12}}>
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          style={{
            height: 74,
            display: 'grid',
            placeItems: 'center',
            border: '4px solid #ffffff',
            borderRadius: 8,
            background: index < activeCount ? '#ffffff' : '#050505',
            color: index < activeCount ? '#000000' : '#ffffff',
            fontSize: 34,
            fontWeight: 950,
            fontFamily: 'Courier New, monospace',
          }}
        >
          {index < activeCount ? item : ''}
        </div>
      ))}
    </div>
  </Card>
);

const RouteBoard: React.FC<{
  policy: string;
  destination?: 'A' | 'B' | 'C';
  note: string;
  values?: Array<{server: string; value: string; label: string; active?: boolean}>;
}> = ({policy, destination, note, values}) => (
  <div style={{display: 'grid', gridTemplateColumns: '310px 300px 1fr', gap: 24, alignItems: 'stretch'}}>
    <Card style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 14, textAlign: 'center'}}>
      <Smartphone size={48} strokeWidth={3} />
      <div style={{fontSize: 34, fontWeight: 950}}>FoodDash</div>
      <Label>api.fooddash.com</Label>
    </Card>
    <Card active style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 14, textAlign: 'center'}}>
      <GitBranch size={52} strokeWidth={3} />
      <div style={{fontSize: 28, fontWeight: 950, textTransform: 'uppercase'}}>Load Balancer</div>
      <Label>{policy}</Label>
      {destination ? <div style={{fontSize: 54, fontWeight: 950, fontFamily: 'Courier New, monospace'}}>NEXT -&gt; {destination}</div> : null}
    </Card>
    <div style={{display: 'grid', gap: 14}}>
      {(values ?? [
        {server: 'Server A', value: '1x', label: 'capacity', active: destination === 'A'},
        {server: 'Server B', value: '1x', label: 'capacity', active: destination === 'B'},
        {server: 'Server C', value: '1x', label: 'capacity', active: destination === 'C'},
      ]).map((row) => (
        <Card key={row.server} active={row.active} style={{display: 'grid', gridTemplateColumns: '1.3fr 1fr 1.1fr', alignItems: 'center', gap: 16, minHeight: 118}}>
          <div style={{fontSize: 28, fontWeight: 950, textTransform: 'uppercase'}}>{row.server}</div>
          <div style={{fontSize: 48, fontWeight: 950, fontFamily: 'Courier New, monospace', textAlign: 'center'}}>{row.value}</div>
          <div style={{fontSize: 18, fontWeight: 900, textTransform: 'uppercase', opacity: 0.74}}>{row.label}</div>
        </Card>
      ))}
    </div>
    <div style={{gridColumn: '1 / -1'}}>
      <Card inverted style={{textAlign: 'center', fontSize: 28, fontWeight: 950, textTransform: 'uppercase', boxShadow: 'none'}}>
        {note}
      </Card>
    </div>
  </div>
);

const WelcomeVisual = () => (
  <Stage title="Welcome" subtitle="Engineering Systems" chapter="Load Balancing Algorithms" icon={GitBranch}>
    <Card
      active
      style={{
        minHeight: 520,
        display: 'grid',
        alignContent: 'center',
        justifyItems: 'center',
        gap: 28,
        padding: 56,
        textAlign: 'center',
      }}
    >
      <GitBranch size={84} strokeWidth={3} />
      <div style={{display: 'grid', gap: 14}}>
        <div style={{fontSize: 74, fontWeight: 950, lineHeight: 0.94, textTransform: 'uppercase'}}>Load Balancing Algorithms</div>
        <div style={{fontSize: 30, fontWeight: 900, lineHeight: 1.08, textTransform: 'uppercase', opacity: 0.76}}>
          How the load balancer chooses the next server
        </div>
      </div>
      <div style={{display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center'}}>
        {['Capacity', 'Active work', 'Latency', 'Consistency'].map((label) => (
          <Label key={label} inverted>{label}</Label>
        ))}
      </div>
    </Card>
  </Stage>
);

const MonitoringReviewVisual = () => (
  <Stage title="Monitoring review" subtitle="A few weeks later, the dashboard stops feeling normal" chapter="Problem: Uneven Work" icon={LineChart}>
    <div style={{display: 'grid', gridTemplateColumns: '0.95fr 1.25fr', gap: 26}}>
      <Card style={{minHeight: 430, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 20, textAlign: 'center'}}>
        <Users size={76} strokeWidth={3} />
        <div style={{fontSize: 40, fontWeight: 950, textTransform: 'uppercase'}}>FoodDash engineers</div>
        <Label>Monitoring review</Label>
      </Card>
      <Card active style={{display: 'grid', gap: 18, alignContent: 'center'}}>
        {[
          ['Requests', 'distributed'],
          ['Servers', 'online'],
          ['Dashboard', 'strange'],
        ].map(([label, value], index) => (
          <div
            key={label}
            style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr',
              alignItems: 'center',
              gap: 20,
              border: '3px solid currentColor',
              borderRadius: 8,
              padding: '18px 20px',
              background: index === 2 ? '#000000' : 'transparent',
              color: index === 2 ? '#ffffff' : 'inherit',
              textTransform: 'uppercase',
            }}
          >
            <div style={{fontSize: 24, fontWeight: 950}}>{label}</div>
            <div style={{fontSize: 34, fontWeight: 950, textAlign: 'right'}}>{value}</div>
          </div>
        ))}
      </Card>
    </div>
  </Stage>
);

const CpuAnomalyVisual = () => (
  <Stage title="CPU anomaly appears" subtitle="Server A and B are hot before anyone talks algorithms" chapter="Problem: Uneven Work" icon={LineChart}>
    <div style={{display: 'grid', gap: 26}}>
      <MetricGrid
        rows={[
          {server: 'Server A', value: '80%', label: 'CPU utilization', active: true},
          {server: 'Server B', value: '60%', label: 'CPU utilization', active: true},
          {server: 'Server C', value: '--', label: 'not checked yet', muted: true},
        ]}
      />
      <Card inverted style={{display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 18}}>
        <div style={{fontSize: 34, fontWeight: 950, textTransform: 'uppercase'}}>The system is balanced by request count, not by effort.</div>
        <Cpu size={48} strokeWidth={3} />
      </Card>
    </div>
  </Stage>
);

const ServerCOutlierVisual = () => (
  <Stage title="Server C is living a different life" subtitle="Same pool, wildly different utilization" chapter="Problem: Uneven Work" icon={Cpu}>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26}}>
      <Card style={{display: 'grid', gap: 22, alignContent: 'center'}}>
        {[
          ['Server A', '80%', 'working hard'],
          ['Server B', '60%', 'not far behind'],
        ].map(([server, value, note]) => (
          <div key={server} style={{display: 'grid', gridTemplateColumns: '1fr 140px', alignItems: 'center', gap: 18, border: '3px solid #ffffff', borderRadius: 8, padding: 20}}>
            <div>
              <div style={{fontSize: 30, fontWeight: 950, textTransform: 'uppercase'}}>{server}</div>
              <div style={{marginTop: 6, fontSize: 18, fontWeight: 900, textTransform: 'uppercase', opacity: 0.7}}>{note}</div>
            </div>
            <div style={{fontSize: 50, fontWeight: 950, fontFamily: 'Courier New, monospace', textAlign: 'right'}}>{value}</div>
          </div>
        ))}
      </Card>
      <Card active style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 18, textAlign: 'center'}}>
        <div style={{fontSize: 42, fontWeight: 950, textTransform: 'uppercase'}}>Server C</div>
        <div style={{fontSize: 118, fontWeight: 950, lineHeight: 0.82, fontFamily: 'Courier New, monospace'}}>15%</div>
        <Label inverted>barely used</Label>
      </Card>
    </div>
  </Stage>
);

const DistributedButUnequalVisual = () => (
  <Stage title="The architecture is present" subtitle="Three servers, one balancer, traffic still flowing" chapter="Problem: Uneven Work" icon={GitBranch}>
    <RouteBoard
      policy="Installed"
      note="The load balancer exists. The missing piece is the decision rule inside it."
      values={[
        {server: 'Server A', value: '80%', label: 'CPU'},
        {server: 'Server B', value: '60%', label: 'CPU'},
        {server: 'Server C', value: '15%', label: 'CPU'},
      ]}
    />
  </Stage>
);

const OverloadedQuestionVisual = () => (
  <Stage title="Why is this happening?" subtitle="Some servers sweat while another barely moves" chapter="Problem: Uneven Work" icon={HelpCircle}>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 220px 1fr', gap: 24, alignItems: 'stretch'}}>
      <Card active style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 16, textAlign: 'center'}}>
        <div style={{fontSize: 46, fontWeight: 950, textTransform: 'uppercase'}}>Overloaded</div>
        <div style={{fontSize: 70, fontWeight: 950, fontFamily: 'Courier New, monospace'}}>A + B</div>
      </Card>
      <Card style={{display: 'grid', placeItems: 'center', boxShadow: 'none'}}>
        <HelpCircle size={104} strokeWidth={3} />
      </Card>
      <Card style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 16, textAlign: 'center'}}>
        <div style={{fontSize: 46, fontWeight: 950, textTransform: 'uppercase'}}>Idle</div>
        <div style={{fontSize: 70, fontWeight: 950, fontFamily: 'Courier New, monospace'}}>C</div>
      </Card>
    </div>
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      The balancer needs a policy, not just a place in the diagram.
    </Card>
  </Stage>
);

const HalfStoryVisual = () => (
  <Stage title="Only half the story" subtitle="Installing the balancer is not the same as choosing wisely" chapter="Policy: Which Server?" icon={Scale}>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26}}>
      <Card style={{minHeight: 430, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 18, textAlign: 'center'}}>
        <GitBranch size={76} strokeWidth={3} />
        <div style={{fontSize: 42, fontWeight: 950, textTransform: 'uppercase'}}>Front door</div>
        <Label>load balancer installed</Label>
      </Card>
      <Card active style={{minHeight: 430, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 18, textAlign: 'center'}}>
        <HelpCircle size={76} strokeWidth={3} />
        <div style={{fontSize: 42, fontWeight: 950, textTransform: 'uppercase'}}>Decision rule</div>
        <Label inverted>where should traffic go?</Label>
      </Card>
    </div>
  </Stage>
);

const RequestQueueVisual = ({currentTime}: {currentTime: number}) => {
  const p = rangeProgress(currentTime, 63.55, 70.75);
  const visible = Math.min(10, Math.floor(p * 12));
  return (
    <Stage title="Every request stops here" subtitle="Thousands of FoodDash requests hit the balancer first" chapter="Policy: Which Server?" icon={Smartphone}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 340px', gap: 26}}>
        <Card style={{display: 'grid', alignContent: 'center', gap: 18}}>
          <div style={{fontSize: 30, fontWeight: 950, textTransform: 'uppercase'}}>Incoming request stream</div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 14}}>
            {Array.from({length: 10}, (_, index) => (
              <div
                key={index}
                style={{
                  height: 72,
                  display: 'grid',
                  placeItems: 'center',
                  border: '4px solid #ffffff',
                  borderRadius: 8,
                  background: index < visible ? '#ffffff' : '#050505',
                  color: index < visible ? '#000000' : '#ffffff',
                  fontSize: 24,
                  fontWeight: 950,
                  fontFamily: 'Courier New, monospace',
                }}
              >
                {index < visible ? `R${index + 1}` : ''}
              </div>
            ))}
          </div>
        </Card>
        <Card active style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 20, textAlign: 'center'}}>
          <GitBranch size={84} strokeWidth={3} />
          <div style={{fontSize: 42, fontWeight: 950, textTransform: 'uppercase'}}>Load balancer</div>
          <Label inverted>first stop</Label>
        </Card>
      </div>
    </Stage>
  );
};

const BalancerDilemmaVisual = () => (
  <Stage title="The balancer has to choose" subtitle="For every request, one server must be picked" chapter="Policy: Which Server?" icon={HelpCircle}>
    <div style={{display: 'grid', gridTemplateColumns: '360px 1fr', gap: 26}}>
      <Card active style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 18, textAlign: 'center'}}>
        <GitBranch size={78} strokeWidth={3} />
        <div style={{fontSize: 38, fontWeight: 950, textTransform: 'uppercase'}}>Incoming request</div>
        <div style={{fontSize: 70, fontWeight: 950}}>?</div>
      </Card>
      <div style={{display: 'grid', gap: 18}}>
        {['Server A', 'Server B', 'Server C'].map((server) => (
          <Card key={server} style={{display: 'grid', gridTemplateColumns: '1fr 90px', alignItems: 'center', minHeight: 126}}>
            <div style={{fontSize: 34, fontWeight: 950, textTransform: 'uppercase'}}>{server}</div>
            <div style={{fontSize: 52, fontWeight: 950, textAlign: 'center'}}>?</div>
          </Card>
        ))}
      </div>
    </div>
  </Stage>
);

const DecisionGoalsVisual = () => (
  <Stage title="Different goals, different answers" subtitle="The narration is about trade-offs before algorithm names" chapter="Policy: Which Server?" icon={Layers3}>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18}}>
      {[
        ['Simplicity', 'easy to reason about'],
        ['Capacity', 'stronger servers do more'],
        ['Active work', 'avoid busy servers'],
        ['Latency', 'prefer fast responses'],
        ['Overhead', 'minimal tracking'],
        ['Stickiness', 'same user, same server'],
      ].map(([goal, note], index) => (
        <Card key={goal} active={index === 0} style={{minHeight: 158, display: 'grid', alignContent: 'center', gap: 10}}>
          <div style={{fontSize: 30, fontWeight: 950, textTransform: 'uppercase'}}>{goal}</div>
          <div style={{fontSize: 18, fontWeight: 900, lineHeight: 1.08, textTransform: 'uppercase', opacity: 0.72}}>{note}</div>
        </Card>
      ))}
    </div>
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 30, fontWeight: 950, textTransform: 'uppercase'}}>
      The simplest approach comes first: Round Robin.
    </Card>
  </Stage>
);

const DashboardVisual = ({currentTime}: {currentTime: number}) => {
  const p = rangeProgress(currentTime, 14.57, 54.47);
  const a = Math.round(interpolate(p, [0.05, 0.5], [0, 80], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const b = Math.round(interpolate(p, [0.15, 0.58], [0, 60], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const c = Math.round(interpolate(p, [0.48, 0.82], [0, 15], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const rows = [
    {server: 'Server A', value: `${a}%`, label: 'CPU utilization', active: true},
    {server: 'Server B', value: `${b}%`, label: 'CPU utilization'},
    {server: 'Server C', value: `${c}%`, label: 'CPU utilization', muted: c < 12},
  ];
  return (
    <Stage
      title="Dashboard anomaly"
      subtitle="Traffic is distributed, but work is not equal"
      chapter="Problem: Uneven Work"
      icon={LineChart}
    >
      <div style={{display: 'grid', gap: 26}}>
        <MetricGrid rows={rows} />
        <Card inverted style={{display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 18}}>
          <div style={{fontSize: 34, fontWeight: 950, textTransform: 'uppercase'}}>Why are A and B hot while C is idle?</div>
          <HelpCircle size={48} strokeWidth={3} />
        </Card>
      </div>
    </Stage>
  );
};

const IntroVisual = ({currentTime}: {currentTime: number}) => {
  const p = rangeProgress(currentTime, 0.01, 13.17);
  return (
    <Stage
      title="Load Balancing Algorithms"
      subtitle="The architecture works. The policy still matters."
      chapter="Setup: Working Load Balancer"
      icon={GitBranch}
    >
      <div style={{display: 'grid', gap: 24}}>
        <RouteBoard
          policy="Round Robin"
          destination={p > 0.45 ? 'B' : undefined}
          note="Last episode built the front door. This episode opens the decision inside it."
        />
      </div>
    </Stage>
  );
};

const PolicyQuestionVisual = ({currentTime}: {currentTime: number}) => {
  const p = rangeProgress(currentTime, 55.29, 90.35);
  const cards = [
    ['Round Robin', 'simplicity'],
    ['Weighted RR', 'unequal hardware'],
    ['Least Connections', 'active work'],
    ['Least Response Time', 'performance'],
    ['Random', 'low overhead'],
    ['Hash-Based', 'consistency'],
  ];
  return (
    <Stage
      title="Which server should handle this request?"
      subtitle="There is no single correct answer"
      chapter="Policy: Which Server?"
      icon={HelpCircle}
    >
      <div style={{display: 'grid', gap: 22}}>
        <Card active style={{display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 24, minHeight: 160}}>
          <div style={{fontSize: 28, fontWeight: 950, textTransform: 'uppercase'}}>Incoming request</div>
          <div style={{fontSize: 58, fontWeight: 950}}>-&gt;</div>
          <div style={{fontSize: 34, fontWeight: 950, textTransform: 'uppercase'}}>Load balancer policy</div>
        </Card>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18}}>
          {cards.map(([name, goal], index) => (
            <Card key={name} active={p > 0.18 + index * 0.08} style={{minHeight: 132, display: 'grid', alignContent: 'center', gap: 8}}>
              <div style={{fontSize: 25, fontWeight: 950, textTransform: 'uppercase'}}>{name}</div>
              <div style={{fontSize: 18, fontWeight: 850, textTransform: 'uppercase', opacity: 0.72}}>{goal}</div>
            </Card>
          ))}
        </div>
      </div>
    </Stage>
  );
};

const RoundRobinFirstRequestsVisual = () => (
  <Stage title="Round Robin begins" subtitle="The first request goes to A, then B, then C" chapter="Algorithm 1: Round Robin" icon={RefreshCw}>
    <div style={{display: 'grid', gap: 24}}>
      <SequenceStrip title="First assignments" items={['A', 'B', 'C']} activeCount={3} />
      <ConceptGrid
        items={[
          {title: 'Request 1', value: 'A', note: 'first server', active: true},
          {title: 'Request 2', value: 'B', note: 'next server', active: true},
          {title: 'Request 3', value: 'C', note: 'third server', active: true},
        ]}
      />
    </div>
  </Stage>
);

const EqualShareVisual = () => (
  <Stage title="Equal share, no drama" subtitle="Each server gets the same number of incoming requests" chapter="Algorithm 1: Round Robin" icon={RefreshCw}>
    <MetricGrid
      rows={[
        {server: 'Server A', value: '3', label: 'requests'},
        {server: 'Server B', value: '3', label: 'requests'},
        {server: 'Server C', value: '3', label: 'requests'},
      ]}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      Simple, predictable, and easy to explain.
    </Card>
  </Stage>
);

const RoundRobinGoodEnoughVisual = () => (
  <Stage title="Good enough for many systems" subtitle="No complicated calculations or monitoring required" chapter="Algorithm 1: Round Robin" icon={RefreshCw}>
    <ConceptGrid
      items={[
        {title: 'No counters', note: 'does not inspect active work'},
        {title: 'No probes', note: 'does not measure response time'},
        {title: 'Fixed order', note: 'A, B, C, repeat', active: true},
      ]}
      minHeight={220}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      That simplicity is the feature, until the assumptions break.
    </Card>
  </Stage>
);

const AssumptionBreakVisual = () => (
  <Stage title="The assumption breaks" subtitle="Production rarely gives every server the same shape" chapter="Round Robin Assumption" icon={Cpu}>
    <ConceptGrid
      items={[
        {title: 'Hardware', note: 'not always equal', value: 'CPU'},
        {title: 'Memory', note: 'not always equal', value: 'RAM'},
        {title: 'Performance', note: 'not always equal', value: 'RT'},
      ]}
      minHeight={220}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      Equal turns stop making sense when capacity is unequal.
    </Card>
  </Stage>
);

const EqualTrafficQuestionVisual = () => (
  <Stage title="Should traffic still be equal?" subtitle="Server A can do twice the work now" chapter="Algorithm 2: Weighted RR" icon={Scale}>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 260px 1fr', gap: 24}}>
      <Card active style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 14, textAlign: 'center'}}>
        <div style={{fontSize: 42, fontWeight: 950, textTransform: 'uppercase'}}>Server A</div>
        <div style={{fontSize: 92, fontWeight: 950, fontFamily: 'Courier New, monospace'}}>2x</div>
        <Label inverted>upgraded</Label>
      </Card>
      <Card style={{display: 'grid', placeItems: 'center', boxShadow: 'none'}}>
        <HelpCircle size={104} strokeWidth={3} />
      </Card>
      <Card style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 14, textAlign: 'center'}}>
        <div style={{fontSize: 36, fontWeight: 950, textTransform: 'uppercase'}}>Same traffic?</div>
        <div style={{fontSize: 92, fontWeight: 950}}>?</div>
      </Card>
    </div>
  </Stage>
);

const WeightAssignmentVisual = () => (
  <Stage title="Assign weights" subtitle="Capacity becomes part of the routing decision" chapter="Algorithm 2: Weighted RR" icon={Scale}>
    <MetricGrid
      rows={[
        {server: 'Server A', value: '2', label: 'weight', active: true},
        {server: 'Server B', value: '1', label: 'weight'},
        {server: 'Server C', value: '1', label: 'weight'},
      ]}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      Stronger servers get more turns in the cycle.
    </Card>
  </Stage>
);

const WeightedResultVisual = () => (
  <Stage title="Capacity-matched distribution" subtitle="The stronger server carries more of the workload" chapter="Algorithm 2: Weighted RR" icon={Scale}>
    <ConceptGrid
      items={[
        {title: 'Server A', value: '50%', note: 'more capacity', active: true},
        {title: 'Server B', value: '25%', note: 'smaller share'},
        {title: 'Server C', value: '25%', note: 'smaller share'},
      ]}
      minHeight={220}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      The distribution now reflects the actual infrastructure.
    </Card>
  </Stage>
);

const SameCountDifferentWorkVisual = () => (
  <Stage title="Same count, different work" subtitle="Two servers can receive equal requests and do unequal effort" chapter="Workload Shape" icon={Clock}>
    <ConceptGrid
      items={[
        {title: 'Menu read', value: '80ms', note: 'short request'},
        {title: 'Checkout', value: '600ms', note: 'medium request'},
        {title: 'Live tracking', value: '25s', note: 'long request', active: true},
      ]}
      minHeight={220}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      Request count alone cannot explain active workload.
    </Card>
  </Stage>
);

const ActiveConnectionsSnapshotVisual = () => (
  <Stage title="Active users right now" subtitle="The balancer looks at current work, not old arrivals" chapter="Algorithm 3: Least Connections" icon={Users}>
    <MetricGrid
      rows={[
        {server: 'Server A', value: '200', label: 'active users', active: true},
        {server: 'Server B', value: '30', label: 'active users'},
        {server: 'Server C', value: '20', label: 'active users'},
      ]}
    />
  </Stage>
);

const LeastConnectionsPrincipleVisual = () => (
  <Stage title="Look at current load" subtitle="Least Connections ignores history and checks active work" chapter="Algorithm 3: Least Connections" icon={Users}>
    <ConceptGrid
      items={[
        {title: 'History', note: 'how many arrived before', muted: true},
        {title: 'Active now', note: 'how many are still connected', active: true},
        {title: 'Next choice', note: 'pick the smallest count'},
      ]}
      minHeight={220}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      The decision is based on work still happening right now.
    </Card>
  </Stage>
);

const LeastConnectionsChoiceVisual = () => (
  <Stage title="The choice becomes obvious" subtitle="Server C has the fewest active connections" chapter="Algorithm 3: Least Connections" icon={Users}>
    <RouteBoard
      policy="Least Connections"
      destination="C"
      note="Server A is already busy enough. The next request goes to Server C."
      values={[
        {server: 'Server A', value: '200', label: 'active connections'},
        {server: 'Server B', value: '30', label: 'active connections'},
        {server: 'Server C', value: '20', label: 'active connections', active: true},
      ]}
    />
  </Stage>
);

const ConnectionsBetterForLifetimesVisual = () => (
  <Stage title="Better for long-lived requests" subtitle="Different request lifetimes need a live workload signal" chapter="Algorithm 3: Least Connections" icon={Users}>
    <ConceptGrid
      items={[
        {title: 'Short requests', note: 'finish quickly'},
        {title: 'Long requests', note: 'stay connected', active: true},
        {title: 'Live count', note: 'captures the difference'},
      ]}
      minHeight={220}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      This is why Least Connections often beats Round Robin for uneven lifetimes.
    </Card>
  </Stage>
);

const ServerCSlowCauseVisual = () => (
  <Stage title="Something is wrong with C" subtitle="Same connections, much worse response time" chapter="Performance Signal" icon={Clock}>
    <ConceptGrid
      items={[
        {title: 'Overloaded', note: 'possible cause'},
        {title: 'Hardware issue', note: 'possible cause'},
        {title: 'Slow dependency', note: 'possible cause', active: true},
      ]}
      minHeight={220}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      Whatever the cause, users feel the impact.
    </Card>
  </Stage>
);

const LeastResponsePrincipleVisual = () => (
  <Stage title="Use actual performance" subtitle="Response time can be a stronger health signal" chapter="Algorithm 4: Least Response Time" icon={Clock}>
    <ConceptGrid
      items={[
        {title: 'Request count', note: 'too shallow', muted: true},
        {title: 'Connection count', note: 'useful but incomplete'},
        {title: 'Response time', note: 'measures what users feel', active: true},
      ]}
      minHeight={220}
    />
  </Stage>
);

const ResponseTimeHealthVisual = () => (
  <Stage title="Response time is a health signal" subtitle="Modern systems treat latency as evidence, not decoration" chapter="Algorithm 4: Least Response Time" icon={Clock}>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 170px 1fr 170px 1fr', gap: 18, alignItems: 'stretch'}}>
      <Card active style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 14, minHeight: 250, textAlign: 'center'}}>
        <Clock size={68} strokeWidth={3} />
        <div style={{fontSize: 36, fontWeight: 950, textTransform: 'uppercase'}}>Response time</div>
        <Label inverted>observable signal</Label>
      </Card>
      <Card style={{display: 'grid', placeItems: 'center', boxShadow: 'none', fontSize: 62, fontWeight: 950}}>-&gt;</Card>
      <Card style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 14, minHeight: 250, textAlign: 'center'}}>
        <LineChart size={68} strokeWidth={3} />
        <div style={{fontSize: 36, fontWeight: 950, textTransform: 'uppercase'}}>Backend health</div>
        <Label>strong indicator</Label>
      </Card>
      <Card style={{display: 'grid', placeItems: 'center', boxShadow: 'none', fontSize: 62, fontWeight: 950}}>-&gt;</Card>
      <Card style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 14, minHeight: 250, textAlign: 'center'}}>
        <GitBranch size={68} strokeWidth={3} />
        <div style={{fontSize: 36, fontWeight: 950, textTransform: 'uppercase'}}>Routing choice</div>
        <Label>prefer fast paths</Label>
      </Card>
    </div>
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      The metric matters because it predicts what the user will feel next.
    </Card>
  </Stage>
);

const RandomSoundsBadVisual = () => (
  <Stage title="Random sounds ridiculous" subtitle="It feels wrong before the math has a chance" chapter="Algorithm 5: Random" icon={Dice5}>
    <div style={{display: 'grid', gridTemplateColumns: '360px 1fr', gap: 26}}>
      <Card active style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 18, textAlign: 'center'}}>
        <Dice5 size={94} strokeWidth={3} />
        <div style={{fontSize: 44, fontWeight: 950, textTransform: 'uppercase'}}>Pick one?</div>
      </Card>
      <ConceptGrid
        columns={1}
        minHeight={126}
        items={[
          {title: 'No tracking', note: 'no server state'},
          {title: 'No calculations', note: 'no score to compute'},
          {title: 'No monitoring', note: 'no health signal used'},
        ]}
      />
    </div>
  </Stage>
);

const RandomNoStateVisual = () => (
  <Stage title="Pure randomness" subtitle="Every request rolls the dice" chapter="Algorithm 5: Random" icon={Dice5}>
    <ConceptGrid
      items={[
        {title: 'Request 1', value: 'B', note: 'random pick'},
        {title: 'Request 2', value: 'A', note: 'random pick'},
        {title: 'Request 3', value: 'C', note: 'random pick'},
      ]}
      minHeight={220}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      The surprise is that this often works better than expected.
    </Card>
  </Stage>
);

const RandomOverheadVisual = () => (
  <Stage title="Low overhead wins sometimes" subtitle="Random spreads traffic without keeping much state" chapter="Algorithm 5: Random" icon={Dice5}>
    <ConceptGrid
      items={[
        {title: 'Tracking', value: '0', note: 'minimal state', active: true},
        {title: 'CPU cost', value: 'low', note: 'tiny decision overhead'},
        {title: 'Traffic', value: 'even', note: 'with enough volume'},
      ]}
      minHeight={220}
    />
  </Stage>
);

const CustomerJourneyVisual = () => (
  <Stage title="One customer, many requests" subtitle="Browsing, cart, history, and checkout should feel continuous" chapter="Algorithm 6: Hash-Based" icon={Smartphone}>
    <ConceptGrid
      items={[
        {title: 'Browse', note: 'restaurants'},
        {title: 'Cart', note: 'add items'},
        {title: 'Checkout', note: 'place order', active: true},
      ]}
      minHeight={220}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
      It can help if the same user keeps reaching the same backend.
    </Card>
  </Stage>
);

const SameServerQuestionVisual = () => (
  <Stage title="Should these requests stay together?" subtitle="One customer journey can cross many API calls" chapter="Algorithm 6: Hash-Based" icon={HelpCircle}>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 190px 1fr', gap: 22, alignItems: 'stretch'}}>
      <Card style={{display: 'grid', alignContent: 'center', gap: 16}}>
        {['Browse restaurants', 'Add to cart', 'Order history', 'Place order'].map((step) => (
          <div key={step} style={{border: '3px solid #ffffff', borderRadius: 8, padding: '14px 18px', fontSize: 22, fontWeight: 950, textTransform: 'uppercase'}}>
            {step}
          </div>
        ))}
      </Card>
      <Card style={{display: 'grid', placeItems: 'center', boxShadow: 'none', fontSize: 64, fontWeight: 950}}>-&gt;</Card>
      <Card active style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 18, textAlign: 'center'}}>
        <div style={{fontSize: 42, fontWeight: 950, textTransform: 'uppercase'}}>Same server?</div>
        <div style={{fontSize: 80, fontWeight: 950}}>?</div>
        <Label inverted>useful for continuity</Label>
      </Card>
    </div>
  </Stage>
);

const HashKeyVisual = () => (
  <Stage title="Choose a stable key" subtitle="The balancer hashes something unique about the request" chapter="Algorithm 6: Hash-Based" icon={Hash}>
    <ConceptGrid
      items={[
        {title: 'User ID', note: 'stable identity', active: true},
        {title: 'Session ID', note: 'stable session'},
        {title: 'IP address', note: 'network-based key'},
      ]}
      minHeight={220}
    />
  </Stage>
);

const StickyBenefitsVisual = () => (
  <Stage title="Same user, same server" subtitle="Sticky routing creates cache efficiency and less repeated work" chapter="Algorithm 6: Hash-Based" icon={Hash}>
    <RouteBoard
      policy="Hash key"
      destination="B"
      note="User #4271 keeps landing on Server B, making the system more predictable overall."
      values={[
        {server: 'Server A', value: '-', label: 'not selected'},
        {server: 'Server B', value: '#4271', label: 'sticky user', active: true},
        {server: 'Server C', value: '-', label: 'not selected'},
      ]}
    />
  </Stage>
);

const HashBenefitsVisual = () => (
  <Stage title="Predictability has benefits" subtitle="Stickiness can improve cache efficiency and reduce repeated work" chapter="Algorithm 6: Hash-Based" icon={Hash}>
    <ConceptGrid
      items={[
        {title: 'Cache', note: 'warmer backend memory'},
        {title: 'Repeated work', note: 'less duplication'},
        {title: 'Predictability', note: 'stable routing shape'},
      ]}
      minHeight={220}
    />
  </Stage>
);

const WrongQuestionVisual = () => (
  <Stage title="Which algorithm is best?" subtitle="That is the wrong question" chapter="Decision Framework" icon={HelpCircle}>
    <Card active style={{minHeight: 430, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 22, textAlign: 'center'}}>
      <HelpCircle size={94} strokeWidth={3} />
      <div style={{fontSize: 62, fontWeight: 950, lineHeight: 0.96, textTransform: 'uppercase'}}>The best algorithm depends on the system</div>
    </Card>
  </Stage>
);

const TradeoffsVisual = () => (
  <Stage title="There are only trade-offs" subtitle="Universal answers are rare in engineering systems" chapter="Decision Framework" icon={Layers3}>
    <ConceptGrid
      items={[
        {title: 'Simple', note: 'easy to operate'},
        {title: 'Accurate', note: 'better signal'},
        {title: 'Cheap', note: 'lower overhead'},
      ]}
      minHeight={220}
    />
    <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 36, fontWeight: 950, textTransform: 'uppercase'}}>
      Pick the trade-off your product actually needs.
    </Card>
  </Stage>
);

const MetricsBoundaryVisual = () => (
  <Stage title="Beyond traffic metrics" subtitle="The next question is whether the balancer can inspect the request itself" chapter="Next: L4 vs L7" icon={Mail}>
    <ConceptGrid
      items={[
        {title: 'Servers', note: 'capacity and health'},
        {title: 'Traffic', note: 'counts and connections'},
        {title: 'Request', note: 'URL, route, headers, cookies', active: true},
      ]}
      minHeight={220}
    />
  </Stage>
);

const SmartBalancerQuestionVisual = () => (
  <Stage title="How smart should it be?" subtitle="The bridge into Layer 4 versus Layer 7 load balancing" chapter="Next: L4 vs L7" icon={Mail}>
    <Card active style={{minHeight: 430, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 22, textAlign: 'center'}}>
      <GitBranch size={90} strokeWidth={3} />
      <div style={{fontSize: 60, fontWeight: 950, lineHeight: 0.96, textTransform: 'uppercase'}}>Should the balancer understand the request?</div>
      <Label inverted>Next episode: Layer 4 vs Layer 7</Label>
    </Card>
  </Stage>
);

const RoundRobinVisual = () => (
  <Stage
    title="Round Robin"
    subtitle="A simple fixed cycle: A, B, C, repeat"
    chapter="Algorithm 1: Round Robin"
    icon={RefreshCw}
  >
    <div style={{display: 'grid', gap: 24}}>
      <SequenceStrip title="Request assignment history" items={['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C']} activeCount={9} />
      <MetricGrid
        rows={[
          {server: 'Server A', value: '3', label: 'requests'},
          {server: 'Server B', value: '3', label: 'requests'},
          {server: 'Server C', value: '3', label: 'requests'},
        ]}
      />
    </div>
  </Stage>
);

const HiddenAssumptionVisual = () => (
  <Stage
    title="The hidden assumption"
    subtitle="Round Robin works best when the backend pool is homogeneous"
    chapter="Round Robin Assumption"
    icon={Cpu}
  >
    <div style={{display: 'grid', gap: 24}}>
      <MetricGrid
        rows={[
          {server: 'Server A', value: '1x', label: 'same CPU / memory'},
          {server: 'Server B', value: '1x', label: 'same CPU / memory'},
          {server: 'Server C', value: '1x', label: 'same CPU / memory'},
        ]}
      />
      <Card inverted style={{fontSize: 34, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase'}}>
        Production environments ignore neat assumptions.
      </Card>
    </div>
  </Stage>
);

const WeightedSetupVisual = ({currentTime}: {currentTime: number}) => {
  const p = rangeProgress(currentTime, 135.33, 151.69);
  return (
    <Stage
      title="Weighted Round Robin"
      subtitle="When capacity is unequal, equal turns are not fair"
      chapter="Algorithm 2: Weighted RR"
      icon={Scale}
    >
      <div style={{display: 'grid', gap: 24}}>
        <MetricGrid
          rows={[
            {server: 'Server A', value: p > 0.35 ? '2x' : '1x', label: 'capacity', active: true},
            {server: 'Server B', value: '1x', label: 'capacity'},
            {server: 'Server C', value: '1x', label: 'capacity'},
          ]}
        />
        <Card inverted style={{fontSize: 34, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase'}}>
          A should receive more traffic because A can do more work.
        </Card>
      </div>
    </Stage>
  );
};

const WeightedPatternVisual = () => (
  <Stage
    title="Weighted pattern"
    subtitle="A gets two turns, B and C get one each"
    chapter="Algorithm 2: Weighted RR"
    icon={Scale}
  >
    <div style={{display: 'grid', gap: 24}}>
      <SequenceStrip title="Weighted request assignment" items={['A', 'A', 'B', 'C', 'A', 'A', 'B', 'C']} activeCount={8} />
      <MetricGrid
        rows={[
          {server: 'Server A', value: '2', label: 'weight', active: true},
          {server: 'Server B', value: '1', label: 'weight'},
          {server: 'Server C', value: '1', label: 'weight'},
        ]}
      />
    </div>
  </Stage>
);

const LifetimesVisual = ({currentTime}: {currentTime: number}) => {
  const p = rangeProgress(currentTime, 177.87, 188.75);
  const widths = [
    interpolate(p, [0.05, 0.5], [18, 34], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    interpolate(p, [0.15, 0.65], [18, 58], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    interpolate(p, [0.25, 0.85], [18, 92], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  ];
  return (
    <Stage
      title="Not all requests are equal"
      subtitle="Equal request count can still mean unequal work"
      chapter="Workload Shape"
      icon={Clock}
    >
      <Card style={{display: 'grid', gap: 28, minHeight: 410}}>
        {['Fast menu read', 'Normal checkout', 'Long driver stream'].map((label, index) => (
          <div key={label} style={{display: 'grid', gridTemplateColumns: '260px 1fr 120px', gap: 18, alignItems: 'center'}}>
            <div style={{fontSize: 24, fontWeight: 950, textTransform: 'uppercase'}}>{label}</div>
            <div style={{height: 42, border: '4px solid #ffffff', borderRadius: 8, padding: 4}}>
              <div style={{width: `${widths[index]}%`, height: '100%', borderRadius: 4, background: '#ffffff'}} />
            </div>
            <div style={{fontSize: 25, fontWeight: 950, fontFamily: 'Courier New, monospace'}}>{['80 ms', '600 ms', '25 s'][index]}</div>
          </div>
        ))}
      </Card>
      <Card inverted style={{marginTop: 22, textAlign: 'center', fontSize: 30, fontWeight: 950, textTransform: 'uppercase'}}>
        Counting arrivals is not the same as measuring active work.
      </Card>
    </Stage>
  );
};

const ConnectionsVisual = ({currentTime}: {currentTime: number}) => {
  const p = rangeProgress(currentTime, 189.83, 238.77);
  const routeToC = p > 0.45;
  return (
    <Stage
      title="Least Connections"
      subtitle="Route to the server doing the least active work"
      chapter="Algorithm 3: Least Connections"
      icon={Users}
    >
      <RouteBoard
        policy="Least Connections"
        destination={routeToC ? 'C' : undefined}
        note="Server A is already busy enough. Server C has the fewest active connections."
        values={[
          {server: 'Server A', value: '200', label: 'active connections'},
          {server: 'Server B', value: p > 0.2 ? '30' : '--', label: 'active connections'},
          {server: 'Server C', value: p > 0.35 ? '20' : '--', label: 'active connections', active: routeToC},
        ]}
      />
    </Stage>
  );
};

const BlindSpotVisual = () => (
  <Stage
    title="Connection count blind spot"
    subtitle="Same count does not always mean same health"
    chapter="Connection Blind Spot"
    icon={HelpCircle}
  >
    <div style={{display: 'grid', gap: 24}}>
      <MetricGrid
        rows={[
          {server: 'Server A', value: '~100', label: 'connections'},
          {server: 'Server B', value: '~100', label: 'connections'},
          {server: 'Server C', value: '~100', label: 'connections'},
        ]}
      />
      <Card inverted style={{fontSize: 34, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase'}}>
        Equal connection count can hide very different latency.
      </Card>
    </div>
  </Stage>
);

const LatencyVisual = () => (
  <Stage
    title="Latency per server"
    subtitle="Same connection count, very different response times"
    chapter="Performance Signal"
    icon={Clock}
  >
    <MetricGrid
      rows={[
        {server: 'Server A', value: '50 ms', label: 'response time'},
        {server: 'Server B', value: '40 ms', label: 'response time', active: true},
        {server: 'Server C', value: '300 ms', label: 'response time'},
      ]}
    />
    <Card inverted style={{marginTop: 24, fontSize: 34, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase'}}>
      Server C has the same connection count, but it is clearly slow.
    </Card>
  </Stage>
);

const LeastResponseTimeVisual = ({currentTime}: {currentTime: number}) => {
  const p = rangeProgress(currentTime, 264.19, 293.61);
  return (
    <Stage
      title="Least Response Time"
      subtitle="Favor the backend responding fastest right now"
      chapter="Algorithm 4: Least Response Time"
      icon={Clock}
    >
      <RouteBoard
        policy="Least Response Time"
        destination={p > 0.34 ? 'B' : undefined}
        note="Users do not feel connection counts. They feel how quickly the menu loads."
        values={[
          {server: 'Server A', value: '50 ms', label: 'response time'},
          {server: 'Server B', value: '40 ms', label: 'response time', active: true},
          {server: 'Server C', value: '300 ms', label: 'response time'},
        ]}
      />
    </Stage>
  );
};

const UserLatencyVisual = () => (
  <Stage
    title="User-visible latency"
    subtitle="The metric only matters because the product feels slow"
    chapter="User Impact"
    icon={Smartphone}
  >
    <div style={{display: 'grid', gridTemplateColumns: '430px 1fr', gap: 28}}>
      <Card active style={{minHeight: 430, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 20, textAlign: 'center'}}>
        <Smartphone size={68} strokeWidth={3} />
        <div style={{fontSize: 46, fontWeight: 950}}>FoodDash</div>
        <Label>Menu loaded fast</Label>
      </Card>
      <Card style={{display: 'grid', alignContent: 'center', gap: 26}}>
        <BigNumber value="40 ms" label="selected response time" active />
        <BigNumber value="300 ms" label="avoided slow path" />
      </Card>
    </div>
  </Stage>
);

const RandomVisual = ({currentTime}: {currentTime: number}) => {
  const p = rangeProgress(currentTime, 302.71, 339.91);
  const counts = [
    Math.min(3, Math.floor(p * 10)),
    Math.min(3, Math.floor(Math.max(0, p - 0.1) * 10)),
    Math.min(3, Math.floor(Math.max(0, p - 0.2) * 10)),
  ];
  return (
    <Stage
      title="Random Selection"
      subtitle="No tracking, no calculations, almost no overhead"
      chapter="Algorithm 5: Random"
      icon={Dice5}
    >
      <div style={{display: 'grid', gridTemplateColumns: '360px 1fr', gap: 26}}>
        <Card active style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 20, textAlign: 'center'}}>
          <Dice5 size={78} strokeWidth={3} />
          <div style={{fontSize: 42, fontWeight: 950, textTransform: 'uppercase'}}>Pick one</div>
          <Label>No per-server state</Label>
        </Card>
        <Card style={{display: 'grid', alignContent: 'center', gap: 22}}>
          {['Server A', 'Server B', 'Server C'].map((server, index) => (
            <div key={server} style={{display: 'grid', gridTemplateColumns: '150px 1fr 80px', alignItems: 'center', gap: 16}}>
              <div style={{fontSize: 22, fontWeight: 950, textTransform: 'uppercase'}}>{server}</div>
              <div style={{height: 42, border: '4px solid #ffffff', borderRadius: 8, padding: 4}}>
                <div style={{width: `${counts[index] * 30}%`, height: '100%', borderRadius: 4, background: '#ffffff'}} />
              </div>
              <div style={{fontSize: 34, fontWeight: 950, fontFamily: 'Courier New, monospace'}}>{counts[index]}</div>
            </div>
          ))}
        </Card>
      </div>
      <Card inverted style={{marginTop: 24, textAlign: 'center', fontSize: 30, fontWeight: 950, textTransform: 'uppercase'}}>
        With enough traffic, randomness naturally spreads requests.
      </Card>
    </Stage>
  );
};

const HashVisual = ({currentTime}: {currentTime: number}) => {
  const p = rangeProgress(currentTime, 341.57, 379.51);
  return (
    <Stage
      title="Hash-Based Routing"
      subtitle="Use a stable key so the same user lands on the same server"
      chapter="Algorithm 6: Hash-Based"
      icon={Hash}
    >
      <div style={{display: 'grid', gap: 22}}>
        <RouteBoard
          policy="Hash key"
          destination={p > 0.2 ? 'B' : undefined}
          note="User #4271 keeps landing on Server B, improving cache efficiency and reducing repeated work."
          values={[
            {server: 'Server A', value: p > 0.58 ? '#8810' : '-', label: 'sticky user'},
            {server: 'Server B', value: '#4271', label: 'sticky user', active: true},
            {server: 'Server C', value: '-', label: 'sticky user'},
          ]}
        />
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16}}>
          {['User ID', 'Session ID', 'IP Address'].map((key) => (
            <Card key={key} style={{textAlign: 'center', fontSize: 24, fontWeight: 950, textTransform: 'uppercase', boxShadow: 'none'}}>
              {key}
            </Card>
          ))}
        </div>
      </div>
    </Stage>
  );
};

const ComparisonVisual = () => {
  const rows = [
    ['Round Robin', 'simplicity'],
    ['Weighted RR', 'unequal hardware'],
    ['Least Connections', 'workload distribution'],
    ['Least Response Time', 'performance'],
    ['Random', 'low overhead'],
    ['Hash-Based', 'consistency'],
  ];
  return (
    <Stage
      title="Which algorithm is best?"
      subtitle="That is the wrong question"
      chapter="Decision Framework"
      icon={Layers3}
    >
      <Card style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 18}}>
        {rows.map(([algorithm, goal], index) => (
          <div
            key={algorithm}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.25fr',
              alignItems: 'center',
              gap: 14,
              border: '3px solid #ffffff',
              borderRadius: 8,
              padding: '14px 18px',
              background: '#ffffff',
              color: '#000000',
              minHeight: 66,
              textTransform: 'uppercase',
            }}
          >
            <div style={{fontSize: 21, fontWeight: 950}}>{algorithm}</div>
            <div style={{fontSize: 21, fontWeight: 900, textAlign: 'center'}}>{goal}</div>
          </div>
        ))}
      </Card>
      <Card inverted style={{marginTop: 22, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>
        There are very few universal solutions. There are only trade-offs.
      </Card>
    </Stage>
  );
};

const RequestEnvelopeVisual = ({currentTime}: {currentTime: number}) => {
  const p = rangeProgress(currentTime, 405.37, 434.47);
  const fields = [
    ['URL', '/orders/123', 0.1],
    ['Route', 'POST /checkout', 0.25],
    ['Headers', 'user-agent, accept', 0.4],
    ['Cookies', 'session=abc', 0.55],
  ];
  return (
    <Stage
      title="Looking inside the request"
      subtitle="The bridge to Layer 4 versus Layer 7 load balancing"
      chapter="Next: L4 vs L7"
      icon={Mail}
    >
      <div style={{display: 'grid', gridTemplateColumns: '1fr 440px', gap: 28}}>
        <Card active style={{display: 'grid', gap: 18}}>
          <div style={{fontSize: 30, fontWeight: 950, textTransform: 'uppercase'}}>Request envelope</div>
          {fields.map(([label, value, threshold]) => (
            <div
              key={label}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: 14,
                border: '3px solid currentColor',
                borderRadius: 8,
                padding: '14px 16px',
                opacity: p > Number(threshold) ? 1 : 0.18,
                fontFamily: 'Courier New, monospace',
              }}
            >
              <div style={{fontSize: 25, fontWeight: 950}}>{label}</div>
              <div style={{fontSize: 25, fontWeight: 950}}>{value}</div>
            </div>
          ))}
        </Card>
        <Card style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 24, textAlign: 'center'}}>
          <GitBranch size={68} strokeWidth={3} />
          <div style={{fontSize: 34, fontWeight: 950, textTransform: 'uppercase'}}>How smart should the balancer be?</div>
          <Label inverted>Next: Layer 4 vs Layer 7</Label>
        </Card>
      </div>
    </Stage>
  );
};

export const LoadBalancingAlgorithmsVisual: React.FC<LoadBalancingAlgorithmsVisualProps> = ({beat, currentTime}) => {
  const n = beatNumber(beat);
  if (n === 1) return <WelcomeVisual />;
  if (n <= 2) return <IntroVisual currentTime={currentTime} />;
  if (n === 3) return <MonitoringReviewVisual />;
  if (n === 4) return <CpuAnomalyVisual />;
  if (n === 5) return <ServerCOutlierVisual />;
  if (n === 6) return <DistributedButUnequalVisual />;
  if (n === 7) return <OverloadedQuestionVisual />;
  if (n === 8) return <HalfStoryVisual />;
  if (n === 9) return <HalfStoryVisual />;
  if (n === 10) return <RequestQueueVisual currentTime={currentTime} />;
  if (n === 11) return <BalancerDilemmaVisual />;
  if (n === 12) return <DecisionGoalsVisual />;
  if (n === 13) return <RoundRobinFirstRequestsVisual />;
  if (n === 14) return <RoundRobinVisual />;
  if (n === 15) return <EqualShareVisual />;
  if (n === 16) return <RoundRobinGoodEnoughVisual />;
  if (n === 17) return <HiddenAssumptionVisual />;
  if (n === 18) return <AssumptionBreakVisual />;
  if (n === 19) return <WeightedSetupVisual currentTime={currentTime} />;
  if (n === 20) return <EqualTrafficQuestionVisual />;
  if (n === 21) return <WeightAssignmentVisual />;
  if (n === 22) return <WeightedPatternVisual />;
  if (n === 23) return <WeightedResultVisual />;
  if (n === 24) return <LifetimesVisual currentTime={currentTime} />;
  if (n === 25) return <SameCountDifferentWorkVisual />;
  if (n === 26) return <ActiveConnectionsSnapshotVisual />;
  if (n <= 28) return <ConnectionsVisual currentTime={currentTime} />;
  if (n === 29) return <LeastConnectionsPrincipleVisual />;
  if (n === 30) return <LeastConnectionsChoiceVisual />;
  if (n === 31) return <LeastConnectionsChoiceVisual />;
  if (n === 32) return <ConnectionsBetterForLifetimesVisual />;
  if (n === 33) return <BlindSpotVisual />;
  if (n === 34) return <LatencyVisual />;
  if (n === 35) return <LatencyVisual />;
  if (n === 36) return <ServerCSlowCauseVisual />;
  if (n === 37) return <LeastResponsePrincipleVisual />;
  if (n === 38) return <LeastResponseTimeVisual currentTime={currentTime} />;
  if (n === 39) return <ResponseTimeHealthVisual />;
  if (n === 40) return <UserLatencyVisual />;
  if (n === 41) return <RandomSoundsBadVisual />;
  if (n === 42) return <RandomNoStateVisual />;
  if (n === 43) return <RandomVisual currentTime={currentTime} />;
  if (n === 44) return <RandomOverheadVisual />;
  if (n === 45) return <CustomerJourneyVisual />;
  if (n === 46) return <SameServerQuestionVisual />;
  if (n === 47) return <HashKeyVisual />;
  if (n === 48) return <StickyBenefitsVisual />;
  if (n === 49) return <WrongQuestionVisual />;
  if (n === 50) return <ComparisonVisual />;
  if (n === 51) return <ComparisonVisual />;
  if (n === 52) return <TradeoffsVisual />;
  if (n === 53) return <MetricsBoundaryVisual />;
  if (n === 54) return <RequestEnvelopeVisual currentTime={currentTime} />;
  return <SmartBalancerQuestionVisual />;
};
