import React from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cloud,
  CreditCard,
  Database,
  GitBranch,
  Globe,
  LineChart,
  MessageSquare,
  PackageCheck,
  RefreshCw,
  Scale,
  Server,
  ShoppingCart,
  User,
  XCircle,
} from 'lucide-react';
import type {LessonBeat} from '../../types';

type FamousNinesVisualProps = {
  beat: LessonBeat;
  currentTime: number;
  frame: number;
  fps: number;
};

type IconComponent = React.ComponentType<{size?: number; strokeWidth?: number}>;
type Point = {x: number; y: number};

const W = 1380;
const H = 548;

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const beatNumber = (beat: LessonBeat) => Number(beat.id.replace('fn-', '')) || 0;
const localProgress = (beat: LessonBeat, currentTime: number) => clamp((currentTime - beat.start) / Math.max(beat.end - beat.start, 0.001));
const since = (currentTime: number, start: number, duration: number) => clamp((currentTime - start) / duration);
const pulse = (currentTime: number, speed = 1) => 0.5 + Math.sin(currentTime * Math.PI * 2 * speed) * 0.5;
const pointOnLine = (from: Point, to: Point, progress: number): Point => ({
  x: from.x + (to.x - from.x) * progress,
  y: from.y + (to.y - from.y) * progress,
});
const pointsToPath = (points: Point[]) => points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
const pointOnPolyline = (points: Point[], progress: number): Point => {
  const segments = points.slice(1).map((point, index) => {
    const from = points[index];
    const length = Math.hypot(point.x - from.x, point.y - from.y);
    return {from, to: point, length};
  });
  const total = segments.reduce((sum, segment) => sum + segment.length, 0);
  let distance = clamp(progress) * total;

  for (const segment of segments) {
    if (distance <= segment.length) {
      return pointOnLine(segment.from, segment.to, segment.length === 0 ? 0 : distance / segment.length);
    }
    distance -= segment.length;
  }

  return points[points.length - 1];
};

const boardStyle: React.CSSProperties = {
  position: 'relative',
  width: 'min(1480px, 100%)',
  height: 612,
  color: '#ffffff',
  overflow: 'visible',
};

const gridStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: 8,
  background:
    'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
  backgroundSize: '52px 52px',
  opacity: 0.75,
};

const labelStyle: React.CSSProperties = {
  position: 'absolute',
  left: 28,
  top: 0,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  color: 'rgba(255,255,255,0.58)',
  fontSize: 15,
  fontWeight: 950,
  textTransform: 'uppercase',
};

export const ArchitectureStage: React.FC<{label: string; children: React.ReactNode}> = ({label, children}) => (
  <div style={boardStyle}>
    <div style={gridStyle} />
    <div style={labelStyle}>
      <span>availability targets</span>
      <strong
        style={{
          border: '2px solid rgba(255,255,255,0.48)',
          borderRadius: 6,
          padding: '6px 10px',
          color: '#ffffff',
          background: 'rgba(255,255,255,0.08)',
        }}
      >
        {label}
      </strong>
    </div>
    <div style={{position: 'absolute', inset: '34px 20px 8px'}}>{children}</div>
  </div>
);

const CardFrame: React.FC<{
  children: React.ReactNode;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  active?: boolean;
  muted?: boolean;
  failed?: boolean;
  style?: React.CSSProperties;
}> = ({children, x, y, w, h, active = false, muted = false, failed = false, style}) => (
  <div
    style={{
      position: x === undefined || y === undefined ? 'relative' : 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      border: active ? '4px solid #ffffff' : '3px solid rgba(255,255,255,0.62)',
      borderRadius: 8,
      background: active ? '#ffffff' : 'rgba(0,0,0,0.84)',
      color: active ? '#000000' : '#ffffff',
      boxShadow: active ? '12px 12px 0 rgba(255,255,255,0.14)' : '8px 8px 0 rgba(255,255,255,0.08)',
      opacity: muted ? 0.42 : 1,
      textDecoration: failed ? 'line-through' : 'none',
      textTransform: 'uppercase',
      textAlign: 'center',
      transition: 'none',
      ...style,
    }}
  >
    {failed ? (
      <div
        style={{
          position: 'absolute',
          inset: 18,
          borderTop: '5px solid currentColor',
          transform: 'rotate(-18deg)',
          opacity: 0.9,
        }}
      />
    ) : null}
    {children}
  </div>
);

export const StatusBadge: React.FC<{label: string; tone?: 'ok' | 'warn' | 'fail'}> = ({label, tone = 'ok'}) => (
  <span
    style={{
      position: 'absolute',
      right: -12,
      top: -14,
      border: '3px solid currentColor',
      borderRadius: 999,
      background: tone === 'ok' ? '#ffffff' : '#000000',
      color: tone === 'ok' ? '#000000' : '#ffffff',
      padding: '6px 10px',
      fontSize: 14,
      fontWeight: 950,
      lineHeight: 1,
    }}
  >
    {label}
  </span>
);

export const ArchitectureNode: React.FC<{
  label: string;
  sub?: string;
  icon?: IconComponent;
  x: number;
  y: number;
  w?: number;
  h?: number;
  active?: boolean;
  muted?: boolean;
  failed?: boolean;
  badge?: string;
}> = ({label, sub, icon: Icon = Server, x, y, w = 170, h = 112, active, muted, failed, badge}) => (
  <CardFrame x={x} y={y} w={w} h={h} active={active} muted={muted} failed={failed}>
    {badge ? <StatusBadge label={badge} tone={failed ? 'fail' : active ? 'ok' : 'warn'} /> : null}
    <Icon size={34} strokeWidth={3} />
    <strong style={{color: 'inherit', fontSize: 22, fontWeight: 950, lineHeight: 1}}>{label}</strong>
    {sub ? <span style={{color: 'inherit', fontSize: 15, fontWeight: 900, opacity: 0.72}}>{sub}</span> : null}
  </CardFrame>
);

export const ServiceNode = ArchitectureNode;

export const DatabaseNode: React.FC<Omit<React.ComponentProps<typeof ArchitectureNode>, 'icon'>> = (props) => (
  <ArchitectureNode {...props} icon={Database} />
);

export const RegionGroup: React.FC<{
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  active?: boolean;
  children: React.ReactNode;
}> = ({label, x, y, w, h, active, children}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      border: active ? '4px solid rgba(255,255,255,0.88)' : '3px dashed rgba(255,255,255,0.34)',
      borderRadius: 8,
      background: active ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.18)',
    }}
  >
    <span
      style={{
        position: 'absolute',
        left: 14,
        top: -16,
        border: '2px solid rgba(255,255,255,0.5)',
        borderRadius: 6,
        background: '#050505',
        padding: '5px 9px',
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 950,
        textTransform: 'uppercase',
      }}
    >
      {label}
    </span>
    {children}
  </div>
);

export const Connector: React.FC<{from: Point; to: Point; via?: Point[]; active?: boolean; dashed?: boolean}> = ({from, to, via = [], active, dashed = true}) => {
  const points = [from, ...via, to];
  const previous = points[points.length - 2] ?? from;
  const angle = (Math.atan2(to.y - previous.y, to.x - previous.x) * 180) / Math.PI;

  return (
    <g>
      <path
        d={pointsToPath(points)}
        fill="none"
        stroke={active ? '#ffffff' : 'rgba(255,255,255,0.34)'}
        strokeWidth={active ? 5 : 3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashed ? '12 12' : undefined}
      />
      {active ? (
        <polygon
          points="0,0 -14,-7 -14,7"
          transform={`translate(${to.x} ${to.y}) rotate(${angle})`}
          fill="#ffffff"
          stroke="#000000"
          strokeWidth={2}
          strokeLinejoin="round"
        />
      ) : null}
    </g>
  );
};

export const Packet: React.FC<{from: Point; to: Point; via?: Point[]; progress: number; active?: boolean}> = ({from, to, via = [], progress, active = true}) => {
  const point = via.length > 0 ? pointOnPolyline([from, ...via, to], progress) : pointOnLine(from, to, progress);
  return <circle cx={point.x} cy={point.y} r={active ? 9 : 6} fill={active ? '#ffffff' : 'rgba(255,255,255,0.48)'} />;
};

const ConnectorLayer: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none'}}>
    <defs>
      <marker id="fn-arrow-active" markerWidth="10" markerHeight="10" refX="8.6" refY="5" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" />
      </marker>
    </defs>
    {children}
  </svg>
);

export const StepRail: React.FC<{items: string[]; activeIndex: number; x?: number; y?: number; w?: number}> = ({
  items,
  activeIndex,
  x = 56,
  y = 456,
  w = 1268,
}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 12}}>
    {items.map((item, index) => (
      <div
        key={item}
        style={{
          minHeight: 56,
          display: 'grid',
          placeItems: 'center',
          border: index <= activeIndex ? '3px solid #ffffff' : '2px dashed rgba(255,255,255,0.32)',
          borderRadius: 8,
          background: index === activeIndex ? '#ffffff' : 'rgba(0,0,0,0.78)',
          color: index === activeIndex ? '#000000' : '#ffffff',
          opacity: index <= activeIndex ? 1 : 0.5,
          padding: '8px 10px',
          fontSize: 18,
          fontWeight: 950,
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        {item}
      </div>
    ))}
  </div>
);

export const ChecklistRows: React.FC<{rows: Array<[string, string, IconComponent]>; activeIndex: number}> = ({rows, activeIndex}) => (
  <div style={{position: 'absolute', left: 180, right: 180, top: 66, display: 'grid', gap: 12}}>
    {rows.map(([title, detail, Icon], index) => (
      <div
        key={title}
        style={{
          display: 'grid',
          gridTemplateColumns: '62px 1fr 94px',
          alignItems: 'center',
          gap: 22,
          minHeight: 76,
          border: index === activeIndex ? '4px solid #ffffff' : '3px solid rgba(255,255,255,0.36)',
          borderRadius: 8,
          background: index === activeIndex ? '#ffffff' : 'rgba(0,0,0,0.78)',
          color: index === activeIndex ? '#000000' : '#ffffff',
          padding: '12px 20px',
          opacity: index <= activeIndex ? 1 : 0.48,
          textTransform: 'uppercase',
        }}
      >
        <Icon size={36} />
        <div>
          <strong style={{display: 'block', color: 'inherit', fontSize: 25, fontWeight: 950}}>{title}</strong>
          <span style={{color: 'inherit', fontSize: 16, fontWeight: 850, opacity: 0.72}}>{detail}</span>
        </div>
        {index <= activeIndex ? <CheckCircle2 size={36} /> : <Clock size={34} />}
      </div>
    ))}
  </div>
);

const BigNote: React.FC<{children: React.ReactNode; x?: number; y?: number; w?: number; active?: boolean}> = ({children, x = 270, y = 390, w = 840, active}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      border: active ? '4px solid #ffffff' : '3px solid rgba(255,255,255,0.46)',
      borderRadius: 8,
      background: active ? '#ffffff' : 'rgba(0,0,0,0.86)',
      color: active ? '#000000' : '#ffffff',
      boxShadow: active ? '12px 12px 0 rgba(255,255,255,0.14)' : 'none',
      padding: '18px 24px',
      fontSize: 28,
      fontWeight: 950,
      lineHeight: 1,
      textAlign: 'center',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

const HtmlWire: React.FC<{points: Point[]; active?: boolean}> = ({points, active = true}) => (
  <div style={{position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none'}}>
    {points.slice(1).map((point, index) => {
      const from = points[index];
      const horizontal = from.y === point.y;
      const left = horizontal ? Math.min(from.x, point.x) : from.x - (active ? 2.5 : 1.5);
      const top = horizontal ? from.y - (active ? 2.5 : 1.5) : Math.min(from.y, point.y);
      const width = horizontal ? Math.abs(point.x - from.x) : active ? 5 : 3;
      const height = horizontal ? active ? 5 : 3 : Math.abs(point.y - from.y);

      return (
        <div
          key={`${from.x}-${from.y}-${point.x}-${point.y}-${index}`}
          style={{
            position: 'absolute',
            left,
            top,
            width,
            height,
            borderRadius: 999,
            background: active ? '#ffffff' : 'rgba(255,255,255,0.24)',
          }}
        />
      );
    })}
  </div>
);

const HtmlPacket: React.FC<{points: Point[]; progress: number}> = ({points, progress}) => {
  const point = pointOnPolyline(points, progress);
  return (
    <div
      style={{
        position: 'absolute',
        left: point.x - 8,
        top: point.y - 8,
        width: 16,
        height: 16,
        borderRadius: 999,
        background: '#ffffff',
        boxShadow: '0 0 0 2px #000000',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

const FamousNinesIntroVisual = () => (
  <div style={boardStyle}>
    <div style={gridStyle} />
    <div
      style={{
        position: 'absolute',
        left: 150,
        top: 42,
        width: 1080,
        height: 396,
        border: '3px solid rgba(255,255,255,0.92)',
        borderRadius: 8,
        background: 'rgba(0,0,0,0.66)',
        boxShadow: '14px 14px 0 rgba(255,255,255,0.12)',
      }}
    />
    <div style={{position: 'absolute', left: 150, top: 98, width: 1080, textAlign: 'center', textTransform: 'uppercase'}}>
      <div style={{color: '#ffffff', fontSize: 18, fontWeight: 950}}>Engineering Systems</div>
      <div style={{marginTop: 10, color: 'rgba(255,255,255,0.78)', fontSize: 28, fontWeight: 950}}>The Famous Nines</div>
      <div style={{marginTop: 8, color: 'rgba(255,255,255,0.6)', fontSize: 16, fontWeight: 950}}>Availability Patterns #5</div>
    </div>
    <CardFrame x={250} y={232} w={238} h={136} active>
      <Activity size={38} strokeWidth={3} />
      <strong style={{fontSize: 25, fontWeight: 950, lineHeight: 0.95}}>Targets</strong>
      <span style={{fontSize: 14, fontWeight: 900, opacity: 0.72}}>measure uptime</span>
    </CardFrame>
    <div style={{position: 'absolute', left: 512, top: 288, width: 56, color: '#ffffff', fontSize: 25, fontWeight: 950, textAlign: 'center'}}>-&gt;</div>
    <CardFrame x={574} y={232} w={238} h={136} active>
      <LineChart size={38} strokeWidth={3} />
      <strong style={{fontSize: 25, fontWeight: 950, lineHeight: 0.95}}>Nines</strong>
      <span style={{fontSize: 14, fontWeight: 900, opacity: 0.72}}>99.999%</span>
    </CardFrame>
    <div style={{position: 'absolute', left: 836, top: 288, width: 56, color: '#ffffff', fontSize: 25, fontWeight: 950, textAlign: 'center'}}>-&gt;</div>
    <CardFrame x={898} y={232} w={238} h={136} active>
      <Clock size={38} strokeWidth={3} />
      <strong style={{fontSize: 25, fontWeight: 950, lineHeight: 0.95}}>Budget</strong>
      <span style={{fontSize: 14, fontWeight: 900, opacity: 0.72}}>days to minutes</span>
    </CardFrame>
  </div>
);

const StakeholderVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const exact = n >= 7;

  return (
    <ArchitectureStage label="stakeholder pressure">
      <CardFrame x={492} y={144} w={396} h={194} active>
        <Scale size={52} strokeWidth={3} />
        <strong style={{fontSize: 42, fontWeight: 950, lineHeight: 0.95}}>FoodDash CTO</strong>
        <span style={{fontSize: 20, fontWeight: 900}}>Own the reliability answer</span>
      </CardFrame>
      <CardFrame x={56} y={74} w={312} h={118} active={n >= 4} muted={n < 4}>
        <ShoppingCart size={34} />
        <strong style={{fontSize: 25}}>Customer</strong>
        <span style={{fontSize: 16, fontWeight: 900}}>Order whenever?</span>
      </CardFrame>
      <CardFrame x={58} y={322} w={330} h={126} active={n >= 5} muted={n < 5}>
        <PackageCheck size={36} />
        <strong style={{fontSize: 25}}>Restaurant</strong>
        <span style={{fontSize: 16, fontWeight: 900}}>Friday rush keeps flowing?</span>
      </CardFrame>
      <CardFrame x={996} y={78} w={322} h={124} active={n >= 6} muted={n < 6}>
        <LineChart size={36} />
        <strong style={{fontSize: 25}}>Investors</strong>
        <span style={{fontSize: 16, fontWeight: 900}}>Exactly how reliable?</span>
      </CardFrame>
      <CardFrame x={974} y={330} w={348} h={122} active={exact} muted={!exact}>
        {exact ? <CheckCircle2 size={38} /> : <XCircle size={38} />}
        <strong style={{fontSize: 28}}>{exact ? 'Exact Number' : 'Mostly Available'}</strong>
        <span style={{fontSize: 16, fontWeight: 900}}>{exact ? 'Availability target' : 'Not good enough'}</span>
      </CardFrame>
      <ConnectorLayer>
        <Connector from={{x: 368, y: 133}} to={{x: 492, y: 213}} active={n >= 4} />
        <Connector from={{x: 388, y: 385}} to={{x: 492, y: 262}} active={n >= 5} />
        <Connector from={{x: 996, y: 140}} to={{x: 888, y: 214}} active={n >= 6} />
        <Connector from={{x: 974, y: 390}} to={{x: 888, y: 274}} active={n >= 7} />
        {n >= 4 ? <Packet from={{x: 368, y: 133}} to={{x: 492, y: 213}} progress={(currentTime * 0.32) % 1} /> : null}
        {n >= 5 ? <Packet from={{x: 388, y: 385}} to={{x: 492, y: 262}} progress={(currentTime * 0.28 + 0.4) % 1} /> : null}
        {n >= 6 ? <Packet from={{x: 996, y: 140}} to={{x: 888, y: 214}} progress={(currentTime * 0.3 + 0.2) % 1} /> : null}
      </ConnectorLayer>
      <BigNote active x={300} y={472} w={780}>
        {n >= 8 ? 'How much downtime is actually acceptable?' : exact ? 'Reliability needs a number' : 'Three audiences, one reliability promise'}
      </BigNote>
    </ArchitectureStage>
  );
};

const FoodDashArchitecture = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const active = {
    lb: n >= 10,
    servers: n >= 10 || n >= 51,
    db: n >= 10,
    checks: n >= 10,
    target: n >= 11 && n < 51,
  };
  const traffic = (currentTime * 0.42) % 1;

  return (
    <ArchitectureStage label={n >= 51 ? 'next pattern bridge' : 'resilient architecture'}>
      <ConnectorLayer>
        <Connector from={{x: 194, y: 246}} to={{x: 290, y: 246}} active />
        <Connector from={{x: 470, y: 246}} to={{x: 562, y: 146}} active={active.servers} />
        <Connector from={{x: 470, y: 246}} to={{x: 562, y: 246}} active={active.servers} />
        <Connector from={{x: 470, y: 246}} to={{x: 562, y: 346}} active={active.servers} />
        <Connector from={{x: 748, y: 146}} to={{x: 884, y: 206}} active={active.db} />
        <Connector from={{x: 748, y: 246}} to={{x: 884, y: 254}} active={active.db} />
        <Connector from={{x: 748, y: 346}} to={{x: 884, y: 302}} active={active.db} />
        <Connector from={{x: 1074, y: 236}} to={{x: 1160, y: 184}} active={active.checks} />
        <Connector from={{x: 1074, y: 296}} to={{x: 1160, y: 358}} active={active.checks} />
        <Packet from={{x: 194, y: 246}} to={{x: 290, y: 246}} progress={traffic} />
        {n >= 52 ? <Packet from={{x: 470, y: 246}} to={{x: 562, y: 146}} progress={(traffic + 0.12) % 1} /> : null}
        {n >= 53 ? <Packet from={{x: 470, y: 246}} to={{x: 562, y: 246}} progress={(traffic + 0.48) % 1} /> : null}
        {n >= 54 ? <Packet from={{x: 470, y: 246}} to={{x: 562, y: 346}} progress={(traffic + 0.78) % 1} /> : null}
      </ConnectorLayer>
      <ArchitectureNode label="Users" sub="orders" icon={User} x={54} y={190} w={140} h={112} active />
      <ArchitectureNode label="Load Balancer" sub={n >= 52 ? 'distribution' : 'routing'} icon={GitBranch} x={290} y={174} w={180} h={144} active={n >= 52 || active.lb} />
      <ServiceNode label="Server A" sub="healthy" x={562} y={90} w={186} h={112} active={active.servers || n >= 53} />
      <ServiceNode label="Server B" sub={n >= 54 ? 'busy' : 'healthy'} x={562} y={190} w={186} h={112} active={active.servers || n >= 53} badge={n >= 54 ? 'watch' : undefined} />
      <ServiceNode label="Server C" sub={n >= 54 ? 'idle capacity' : 'healthy'} x={562} y={290} w={186} h={112} active={active.servers || n >= 53} />
      <DatabaseNode label="Primary DB" sub="replicated" x={884} y={170} w={190} h={118} active={active.db} />
      <DatabaseNode label="Replica DB" sub="ready" x={884} y={290} w={190} h={118} active={active.db} />
      <ArchitectureNode label="Health Checks" sub="detect" icon={Activity} x={1160} y={120} w={166} h={112} active={active.checks} />
      <ArchitectureNode label="Failover" sub="recover" icon={RefreshCw} x={1160} y={306} w={166} h={112} active={active.checks} />
      {n >= 51 ? (
        <BigNote active x={248} y={430} w={884}>
          {n >= 55 ? 'Next up: load balancing' : n >= 54 ? 'Spread load before one server melts down' : n >= 53 ? 'Choose the next healthy server' : 'Distribute traffic across healthy capacity'}
        </BigNote>
      ) : active.target ? (
        <BigNote active x={248} y={430} w={884}>
          Put a hard number on what reliability means
        </BigNote>
      ) : (
        <BigNote x={250} y={430} w={880}>
          {n >= 10 ? 'Redundancy + replication + health checks + failover' : 'Reorient around the FoodDash setup'}
        </BigNote>
      )}
    </ArchitectureStage>
  );
};

const nines = [
  {label: '99%', downtime: '3.6 days / yr', start: 95.62},
  {label: '99.9%', downtime: '8.7 hours / yr', start: 100.38},
  {label: '99.99%', downtime: '52 minutes / yr', start: 105.36},
  {label: '99.999%', downtime: '5 minutes / yr', start: 111.02},
];

const visibleNineIndex = (currentTime: number) => {
  let index = -1;
  nines.forEach((tier, i) => {
    if (currentTime >= tier.start) {
      index = i;
    }
  });
  return index;
};

const NinesLadderVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const activeIndex = Math.max(0, visibleNineIndex(currentTime));

  return (
    <ArchitectureStage label="the famous nines">
      <div style={{position: 'absolute', left: 70, right: 70, top: 70, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20}}>
        {nines.map((tier, index) => {
          const visible = n >= 18 || index <= activeIndex;
          const active = index === activeIndex || (n >= 18 && index === 3);
          return (
            <CardFrame key={tier.label} h={235} active={visible && active} muted={!visible}>
              <strong style={{fontSize: index === 3 ? 50 : 56, fontWeight: 950, lineHeight: 0.95}}>{tier.label}</strong>
              <span style={{fontSize: 22, fontWeight: 950}}>{visible || n >= 18 ? tier.downtime : 'hidden budget'}</span>
              <span style={{fontSize: 16, fontWeight: 900, opacity: 0.65}}>tier {index + 1}</span>
            </CardFrame>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 152, right: 152, top: 352}}>
        <div style={{height: 18, border: '3px solid rgba(255,255,255,0.72)', borderRadius: 999, overflow: 'hidden'}}>
          <div
            style={{
              width: `${[100, 32, 11, 3][Math.max(0, activeIndex)]}%`,
              height: '100%',
              background: '#ffffff',
            }}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 14, color: 'rgba(255,255,255,0.74)', fontSize: 20, fontWeight: 950, textTransform: 'uppercase'}}>
          <span>large downtime budget</span>
          <span>tiny downtime budget</span>
        </div>
      </div>
      <BigNote active={n >= 19} x={270} y={430} w={840}>
        {n >= 19 ? 'These close-looking numbers hide massive downtime differences' : n >= 13 ? 'Stacking nines means shrinking the failure budget' : 'Availability target = operational time percentage'}
      </BigNote>
    </ArchitectureStage>
  );
};

const DowntimeCollapseVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const activeIndex = n <= 21 ? 0 : n <= 23 ? 1 : n <= 24 ? 2 : 3;
  const values = [
    {label: '99%', unit: 'days', amount: '3.6', width: 100},
    {label: '99.9%', unit: 'hours', amount: '8.7', width: 28},
    {label: '99.99%', unit: 'minutes', amount: '52', width: 9},
    {label: '99.999%', unit: 'minutes', amount: '5', width: 2.5},
  ];

  return (
    <ArchitectureStage label="downtime budget collapse">
      <div style={{position: 'absolute', left: 92, right: 92, top: 62, display: 'grid', gap: 16}}>
        {values.map((item, index) => (
          <div key={item.label} style={{display: 'grid', gridTemplateColumns: '190px 1fr 220px', alignItems: 'center', gap: 22, opacity: index <= activeIndex ? 1 : 0.32}}>
            <CardFrame h={76} active={index === activeIndex} style={{minWidth: 0}}>
              <strong style={{fontSize: 30, fontWeight: 950}}>{item.label}</strong>
            </CardFrame>
            <div style={{height: 38, border: '3px solid rgba(255,255,255,0.42)', borderRadius: 8, padding: 5}}>
              <div style={{width: `${item.width}%`, height: '100%', background: '#ffffff', borderRadius: 4}} />
            </div>
            <CardFrame h={76} active={index === activeIndex}>
              <strong style={{fontSize: 27, fontWeight: 950}}>{item.amount} {item.unit}</strong>
            </CardFrame>
          </div>
        ))}
      </div>
      <BigNote active x={244} y={448} w={892}>
        {n >= 28 ? 'Days become hours, then minutes' : n >= 26 ? 'Every extra nine steepens the drop' : 'Translate the percentage into physical time'}
      </BigNote>
    </ArchitectureStage>
  );
};

const ComplexityVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const phase = n <= 32 ? 0 : n === 33 ? 1 : n === 34 ? 2 : n === 35 ? 3 : n === 36 ? 4 : n === 37 ? 5 : 6;
  const packet = (currentTime * 0.35) % 1;
  const toServerA = [{x: 532, y: 246}, {x: 532, y: 162}];
  const toServerB = [{x: 532, y: 246}, {x: 532, y: 272}];
  const toServerC = [{x: 532, y: 246}, {x: 532, y: 382}];
  const serverAToDb = [{x: 842, y: 162}, {x: 842, y: 250}];
  const serverBToDb = [{x: 842, y: 272}, {x: 842, y: 250}];
  const serverCToDb = [{x: 842, y: 382}, {x: 842, y: 250}];

  return (
    <ArchitectureStage label="cost of perfection">
      <HtmlWire points={[{x: 184, y: 246}, {x: 320, y: 246}]} />
      <HtmlWire points={[{x: 490, y: 246}, ...toServerA, {x: 600, y: 162}]} active={phase >= 1} />
      <HtmlWire points={[{x: 490, y: 246}, ...toServerB, {x: 600, y: 272}]} active={phase >= 1} />
      <HtmlWire points={[{x: 490, y: 246}, ...toServerC, {x: 600, y: 382}]} active={phase >= 1} />
      <HtmlWire points={[{x: 770, y: 162}, ...serverAToDb, {x: 910, y: 250}]} active={phase >= 2} />
      <HtmlWire points={[{x: 770, y: 272}, ...serverBToDb, {x: 910, y: 250}]} active={phase >= 2} />
      <HtmlWire points={[{x: 770, y: 382}, ...serverCToDb, {x: 910, y: 250}]} active={phase >= 2} />
      <HtmlWire points={[{x: 842, y: 382}, {x: 910, y: 382}]} active={phase >= 2} />
      <HtmlWire points={[{x: 1086, y: 250}, {x: 1138, y: 250}, {x: 1138, y: 160}, {x: 1178, y: 160}]} active={phase >= 3} />
      <HtmlWire points={[{x: 1086, y: 250}, {x: 1138, y: 250}, {x: 1138, y: 380}, {x: 1178, y: 380}]} active={phase >= 3} />
      <HtmlPacket points={[{x: 184, y: 246}, {x: 320, y: 246}]} progress={packet} />
      {phase >= 2 ? <HtmlPacket points={[{x: 490, y: 246}, ...toServerA, {x: 600, y: 162}]} progress={(packet + 0.25) % 1} /> : null}
      {phase >= 2 ? <HtmlPacket points={[{x: 490, y: 246}, ...toServerC, {x: 600, y: 382}]} progress={(packet + 0.65) % 1} /> : null}
      <ArchitectureNode label="Users" sub="demand" icon={User} x={52} y={190} w={132} h={112} active />
      <ArchitectureNode
        label={phase >= 2 ? 'Load Balancer' : 'Single Server'}
        sub={phase >= 2 ? 'manage traffic' : phase === 0 ? 'cheap' : 'not enough'}
        icon={phase >= 2 ? GitBranch : Server}
        x={310}
        y={182}
        w={180}
        h={128}
        active={phase === 0 || phase >= 2}
        muted={phase === 1}
      />
      <ServiceNode label="Server A" sub="redundant" x={590} y={110} w={180} h={104} active={phase >= 1} muted={phase < 1} />
      <ServiceNode label="Server B" sub="redundant" x={590} y={220} w={180} h={104} active={phase >= 1} muted={phase < 1} />
      <ServiceNode label="Server C" sub="redundant" x={590} y={330} w={180} h={104} active={phase >= 1} muted={phase < 1} />
      <DatabaseNode label="Replicated DB" sub="state copies" x={900} y={188} w={196} h={124} active={phase >= 2} muted={phase < 2} />
      <ArchitectureNode label="Failover" sub="automatic" icon={RefreshCw} x={900} y={330} w={196} h={104} active={phase >= 2} muted={phase < 2} />
      <RegionGroup label="zone a" x={1178} y={80} w={150} h={160} active={phase >= 3}>
        <Cloud size={46} style={{position: 'absolute', left: 50, top: 48, opacity: phase >= 3 ? 1 : 0.24}} />
      </RegionGroup>
      <RegionGroup label="region b" x={1178} y={300} w={150} h={160} active={phase >= 3}>
        <Globe size={48} style={{position: 'absolute', left: 50, top: 48, opacity: phase >= 3 ? 1 : 0.24}} />
      </RegionGroup>
      <StepRail
        items={['single', 'redundant', 'balancer', 'regions', 'monitor', 'ops']}
        activeIndex={Math.min(phase, 5)}
        y={462}
      />
      <BigNote active={phase >= 4} x={212} y={18} w={956}>
        {phase >= 5 ? 'Monitoring + automation + testing + ops' : phase >= 4 ? 'Availability is never free' : phase >= 3 ? 'The last nines cross zones and regions' : 'Watch complexity balloon as the target rises'}
      </BigNote>
    </ArchitectureStage>
  );
};

const BusinessTradeoffVisual = ({beat}: {beat: LessonBeat}) => {
  const n = beatNumber(beat);
  const activeLow = n >= 42 && n <= 43;
  const activeHigh = n >= 44 && n <= 45;

  return (
    <ArchitectureStage label="business trade-off">
      <div style={{position: 'absolute', left: 72, right: 72, top: 62, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28}}>
        <CardFrame h={346} active={activeLow} muted={n < 42}>
          <Clock size={50} />
          <strong style={{fontSize: 42, fontWeight: 950}}>Low Stakes</strong>
          <span style={{fontSize: 22, fontWeight: 900}}>Internal dashboard / wiki</span>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '86%', marginTop: 12}}>
            <CardFrame h={68} active={activeLow}>
              <strong style={{fontSize: 22}}>99%</strong>
            </CardFrame>
            <CardFrame h={68} failed={n >= 43} muted={n < 43}>
              <strong style={{fontSize: 18}}>Multi-region</strong>
            </CardFrame>
          </div>
        </CardFrame>
        <CardFrame h={346} active={activeHigh} muted={n < 44}>
          <CreditCard size={50} />
          <strong style={{fontSize: 42, fontWeight: 950}}>High Stakes</strong>
          <span style={{fontSize: 22, fontWeight: 900}}>Payments / emergency / core orders</span>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, width: '92%', marginTop: 12}}>
            <CardFrame h={70} active={activeHigh}>
              <strong style={{fontSize: 17}}>Revenue</strong>
            </CardFrame>
            <CardFrame h={70} active={activeHigh}>
              <strong style={{fontSize: 17}}>Safety</strong>
            </CardFrame>
            <CardFrame h={70} active={activeHigh}>
              <strong style={{fontSize: 17}}>Five nines</strong>
            </CardFrame>
          </div>
        </CardFrame>
      </div>
      <BigNote active={n >= 46} x={240} y={436} w={900}>
        {n >= 46 ? 'The right target is a business trade-off' : n >= 44 ? 'Critical workflows justify extreme reliability' : n >= 42 ? 'Do not overbuild low-stake systems' : 'Move from engineering math to business reality'}
      </BigNote>
    </ArchitectureStage>
  );
};

const RecapVisual = ({beat}: {beat: LessonBeat}) => {
  const n = beatNumber(beat);
  const activeIndex = n <= 47 ? 0 : n <= 48 ? 1 : n <= 49 ? 2 : 3;

  return (
    <ArchitectureStage label="recap">
      <ChecklistRows
        activeIndex={activeIndex}
        rows={[
          ['Availability targets', 'Measure operational time percentage', Activity],
          ['Extra nines', 'Shrink downtime from days to minutes', Clock],
          ['Cost and complexity', 'Grow sharply near perfect uptime', LineChart],
          ['Business reality', 'Choose the target the product justifies', Scale],
        ]}
      />
      <BigNote active x={260} y={446} w={860}>
        {n >= 50 ? 'Balance the engineering math with the business reality' : 'The nines convert reliability into an outage budget'}
      </BigNote>
    </ArchitectureStage>
  );
};

export const FamousNinesVisual: React.FC<FamousNinesVisualProps> = ({beat, currentTime}) => {
  const n = beatNumber(beat);

  if (n === 1) {
    return <FamousNinesIntroVisual />;
  }
  if (n <= 8) {
    return <StakeholderVisual beat={beat} currentTime={currentTime} />;
  }
  if (n <= 12 || n >= 51) {
    return <FoodDashArchitecture beat={beat} currentTime={currentTime} />;
  }
  if (n <= 19) {
    return <NinesLadderVisual beat={beat} currentTime={currentTime} />;
  }
  if (n <= 28) {
    return <DowntimeCollapseVisual beat={beat} currentTime={currentTime} />;
  }
  if (n <= 38) {
    return <ComplexityVisual beat={beat} currentTime={currentTime} />;
  }
  if (n <= 46) {
    return <BusinessTradeoffVisual beat={beat} />;
  }
  if (n <= 50) {
    return <RecapVisual beat={beat} />;
  }

  return <FoodDashArchitecture beat={beat} currentTime={currentTime} />;
};
