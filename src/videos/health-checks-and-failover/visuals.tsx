import React from 'react';
import {interpolate} from 'remotion';
import type {LessonBeat} from '../../types';

const C = {
  bg: '#0D1B2A',
  cyan: '#00C2FF',
  green: '#00E676',
  red: '#FF4D4D',
  gold: '#FFD600',
  text: '#FFFFFF',
  muted: '#BFC8D6',
  panel: '#10243A',
  panel2: '#152E49',
};

type SceneProps = {
  beat: LessonBeat;
  currentTime: number;
};

type NodeState = 'healthy' | 'dead' | 'muted' | 'promoted';

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const fadeIn = (time: number, at: number, duration = 0.35) => clamp01((time - at) / duration);

const pulse = (time: number, offset = 0) => {
  const cycle = ((time + offset) % 1.2) / 1.2;
  return 0.55 + Math.sin(cycle * Math.PI * 2) * 0.25 + 0.2;
};

const Label = ({x, y, children, fill = C.text, size = 24, anchor = 'middle', weight = 800}: {
  x: number;
  y: number;
  children: React.ReactNode;
  fill?: string;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  weight?: number;
}) => (
  <text x={x} y={y} fill={fill} fontSize={size} fontWeight={weight} textAnchor={anchor} letterSpacing={0}>
    {children}
  </text>
);

const MonoLabel = ({x, y, children, fill = C.muted, size = 18, anchor = 'middle'}: {
  x: number;
  y: number;
  children: React.ReactNode;
  fill?: string;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
}) => (
  <text x={x} y={y} fill={fill} fontFamily="Courier New, monospace" fontSize={size} fontWeight={700} textAnchor={anchor}>
    {children}
  </text>
);

const Badge = ({x, y, label, fill = C.cyan, width = 150}: {x: number; y: number; label: string; fill?: string; width?: number}) => (
  <g>
    <rect x={x - width / 2} y={y - 17} width={width} height={34} rx={17} fill={`${fill}22`} stroke={fill} strokeWidth={2} />
    <Label x={x} y={y + 7} fill={fill} size={17}>{label}</Label>
  </g>
);

const ServerBox = ({x, y, label, state = 'healthy', sub}: {x: number; y: number; label: string; state?: NodeState; sub?: string}) => {
  const isDead = state === 'dead';
  const isMuted = state === 'muted';
  const stroke = isDead ? C.red : isMuted ? '#526579' : C.cyan;
  const dot = isDead ? C.red : isMuted ? '#526579' : C.green;
  const opacity = isDead ? 0.58 : isMuted ? 0.62 : 1;

  return (
    <g opacity={opacity}>
      <rect x={x - 70} y={y - 44} width={140} height={88} rx={10} fill={C.panel} stroke={stroke} strokeWidth={4} />
      <circle cx={x - 47} cy={y - 22} r={8} fill={dot} />
      <rect x={x - 26} y={y - 22} width={52} height={7} rx={3.5} fill={isDead ? C.red : C.muted} opacity={0.9} />
      <rect x={x - 30} y={y - 5} width={60} height={7} rx={3.5} fill={isDead ? C.red : C.muted} opacity={0.7} />
      <rect x={x - 22} y={y + 12} width={44} height={7} rx={3.5} fill={isDead ? C.red : C.muted} opacity={0.55} />
      {isDead ? <Label x={x + 44} y={y - 14} fill={C.red} size={30}>X</Label> : null}
      <Label x={x} y={y + 67} size={18} fill={isDead ? C.red : C.text}>{label}</Label>
      {sub ? <MonoLabel x={x} y={y + 91} size={15} fill={isDead ? C.red : C.muted}>{sub}</MonoLabel> : null}
    </g>
  );
};

const DbCylinder = ({x, y, label, state = 'healthy', role}: {x: number; y: number; label: string; state?: NodeState; role?: string}) => {
  const isDead = state === 'dead';
  const isMuted = state === 'muted';
  const isPromoted = state === 'promoted';
  const stroke = isDead ? C.red : isPromoted ? C.gold : isMuted ? '#526579' : C.cyan;
  const fill = isDead ? '#301C26' : isMuted ? '#152438' : '#10243A';
  const labelFill = isDead ? C.red : isPromoted ? C.gold : C.text;

  return (
    <g opacity={isMuted ? 0.68 : isDead ? 0.6 : 1}>
      <ellipse cx={x} cy={y - 45} rx={58} ry={18} fill={fill} stroke={stroke} strokeWidth={4} />
      <path d={`M ${x - 58} ${y - 45} L ${x - 58} ${y + 42} Q ${x} ${y + 67} ${x + 58} ${y + 42} L ${x + 58} ${y - 45}`} fill={fill} stroke={stroke} strokeWidth={4} />
      <ellipse cx={x} cy={y + 42} rx={58} ry={18} fill="none" stroke={stroke} strokeWidth={4} />
      <path d={`M ${x - 36} ${y - 8} H ${x + 36} M ${x - 32} ${y + 13} H ${x + 32}`} stroke={isDead ? C.red : C.muted} strokeWidth={6} strokeLinecap="round" />
      {isDead ? <Label x={x} y={y + 8} fill={C.red} size={44}>X</Label> : null}
      {isPromoted ? <Label x={x + 72} y={y - 54} fill={C.gold} size={24}>NEW</Label> : null}
      {role ? <Badge x={x} y={y - 82} label={role} fill={stroke} width={118} /> : null}
      <Label x={x} y={y + 92} fill={labelFill} size={20}>{label}</Label>
    </g>
  );
};

const UserIcon = ({x, y, count = 1, waiting = false}: {x: number; y: number; count?: number; waiting?: boolean}) => (
  <g>
    {Array.from({length: count}).map((_, index) => {
      const dx = (index % 4) * 34;
      const dy = Math.floor(index / 4) * 40;
      return (
        <g key={index} transform={`translate(${x + dx}, ${y + dy})`} opacity={waiting ? 0.82 : 1}>
          <circle cx={0} cy={-18} r={13} fill={waiting ? C.gold : C.muted} />
          <path d="M -18 22 C -14 -5 14 -5 18 22 Z" fill={waiting ? `${C.gold}AA` : `${C.muted}AA`} />
          <rect x={17} y={-9} width={15} height={28} rx={4} fill={C.panel2} stroke={waiting ? C.gold : C.cyan} strokeWidth={2} />
        </g>
      );
    })}
    <Label x={x + Math.min(count, 4) * 17 - 17} y={y + 86} fill={waiting ? C.gold : C.muted} size={17}>USERS</Label>
  </g>
);

const Engineer = ({x, y, asleep = false}: {x: number; y: number; asleep?: boolean}) => (
  <g opacity={asleep ? 0.65 : 1}>
    <circle cx={x} cy={y - 42} r={22} fill={asleep ? '#596577' : C.muted} />
    <path d={`M ${x - 34} ${y + 26} C ${x - 25} ${y - 20} ${x + 25} ${y - 20} ${x + 34} ${y + 26} Z`} fill={asleep ? '#596577' : `${C.muted}CC`} />
    <rect x={x - 52} y={y + 28} width={104} height={38} rx={6} fill={C.panel2} stroke={asleep ? '#596577' : C.cyan} strokeWidth={3} />
    <MonoLabel x={x} y={y + 53} fill={asleep ? '#8390A1' : C.cyan} size={15}>{asleep ? 'AWAY' : 'ON CALL'}</MonoLabel>
    {asleep ? <MonoLabel x={x + 46} y={y - 70} fill={C.gold} size={22}>Z Z</MonoLabel> : null}
  </g>
);

const Connector = ({x1, y1, x2, y2, active = false, severed = false}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  severed?: boolean;
}) => {
  if (severed) {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    return (
      <g>
        <line x1={x1} y1={y1} x2={mx - 24} y2={my - 8} stroke={C.red} strokeWidth={4} strokeLinecap="round" />
        <line x1={mx + 24} y1={my + 8} x2={x2} y2={y2} stroke={C.red} strokeWidth={4} strokeLinecap="round" />
        <Label x={mx} y={my + 10} fill={C.red} size={32}>X</Label>
      </g>
    );
  }

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.muted} strokeWidth={2.5} opacity={0.7} />
      {active ? <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.cyan} strokeWidth={4} strokeDasharray="18 14" strokeLinecap="round" opacity={0.86} /> : null}
    </g>
  );
};

const TrafficArrow = ({d, color = C.cyan, opacity = 1}: {d: string; color?: string; opacity?: number}) => (
  <path d={d} fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#hc2Arrow)" opacity={opacity} />
);

const HealthPulse = ({x1, y1, x2, y2, progress, failed = false}: {x1: number; y1: number; x2: number; y2: number; progress: number; failed?: boolean}) => {
  const p = failed ? Math.min(progress, 0.62) : progress;
  const x = x1 + (x2 - x1) * p;
  const y = y1 + (y2 - y1) * p;

  return (
    <g opacity={progress < 0.98 || !failed ? 1 : 0}>
      <circle cx={x} cy={y} r={12} fill={failed ? C.red : C.cyan} />
      <circle cx={x} cy={y} r={22} fill="none" stroke={failed ? C.red : C.green} strokeWidth={3} opacity={0.45} />
    </g>
  );
};

const CounterDots = ({x, y, active = 0, size = 34}: {x: number; y: number; active?: number; size?: number}) => (
  <g>
    {[0, 1, 2].map((index) => {
      const filled = index < active;
      return (
        <g key={index}>
          <circle cx={x + index * (size + 12)} cy={y} r={size / 2} fill={filled ? C.red : '#2A2A4A'} stroke={filled && active === 3 ? C.gold : C.muted} strokeWidth={3} />
          <Label x={x + index * (size + 12)} y={y + 7} size={18} fill={C.text}>{index + 1}</Label>
        </g>
      );
    })}
  </g>
);

const LoadBalancer = ({x, y}: {x: number; y: number}) => (
  <g>
    <polygon points={`${x},${y - 78} ${x + 88},${y - 34} ${x + 88},${y + 34} ${x},${y + 78} ${x - 88},${y + 34} ${x - 88},${y - 34}`} fill={C.panel} stroke={C.cyan} strokeWidth={5} />
    <polygon points={`${x},${y - 100} ${x + 113},${y - 44} ${x + 113},${y + 44} ${x},${y + 100} ${x - 113},${y + 44} ${x - 113},${y - 44}`} fill="none" stroke={C.cyan} strokeWidth={2} strokeDasharray="16 12" opacity={0.6} />
    <Label x={x} y={y - 6} size={25}>LOAD</Label>
    <Label x={x} y={y + 26} size={25}>BALANCER</Label>
  </g>
);

const BaseStage = ({beat, children}: {beat: LessonBeat; children: React.ReactNode}) => (
  <div className="hc2-stage">
    <div className="hc2-stage-label">
      <span>FOODDASH MONITOR</span>
      <strong>{beat.id.replace('hc-', '').replaceAll('-', ' ')}</strong>
    </div>
    <svg className="hc2-wire-svg" viewBox="0 0 1380 548" role="img" aria-label={beat.title}>
      <defs>
        <marker id="hc2Arrow" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto">
          <path d="M 1 1 L 13 7 L 1 13 Z" fill={C.cyan} />
        </marker>
        <filter id="hc2Glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x={0} y={0} width={1380} height={548} fill={C.bg} rx={8} />
      {children}
    </svg>
  </div>
);

const SectionCard = ({beat, section, title, subtitle}: {beat: LessonBeat; section: string; title: string; subtitle: string}) => (
  <BaseStage beat={beat}>
    <foreignObject x={0} y={0} width={1380} height={548}>
      <div className="hc2-section-card">
        <span>{section}</span>
        <h2>{title}</h2>
        <span>{subtitle}</span>
      </div>
    </foreignObject>
  </BaseStage>
);

const Architecture = ({failed = false, stuck = false}: {failed?: boolean; stuck?: boolean}) => (
  <g>
    <UserIcon x={70} y={235} count={stuck ? 4 : 1} waiting={stuck} />
    <ServerBox x={330} y={248} label="API" state={failed ? 'muted' : 'healthy'} />
    <ServerBox x={545} y={248} label="WORKER" state={failed ? 'muted' : 'healthy'} />
    <DbCylinder x={815} y={250} label="PRIMARY DB" state={failed ? 'dead' : 'healthy'} role="PRIMARY" />
    <DbCylinder x={1095} y={250} label="REPLICA DB" state="healthy" role="REPLICA" />
    <Connector x1={164} y1={248} x2={260} y2={248} active={!failed} />
    <Connector x1={400} y1={248} x2={475} y2={248} active={!failed} />
    <Connector x1={615} y1={248} x2={757} y2={248} active={!failed} severed={failed} />
    <Connector x1={873} y1={300} x2={1037} y2={300} active />
    <TrafficArrow d={failed ? 'M 152 213 C 300 165 525 165 735 210' : 'M 152 213 C 300 180 535 180 760 220'} color={failed ? C.red : C.cyan} opacity={failed ? 0.45 : 1} />
    {stuck ? <Engineer x={1210} y={360} asleep /> : null}
  </g>
);

const IntroScene = ({beat, currentTime}: SceneProps) => {
  const t = currentTime - beat.start;

  return (
    <BaseStage beat={beat}>
      <g opacity={Math.max(0.82, fadeIn(t, 0))}>
        <Label x={690} y={205} size={66} fill={C.text}>ENGINEERING SYSTEMS</Label>
        <Badge x={690} y={255} label="AVAILABILITY PATTERNS PT.2" width={330} />
        <Label x={690} y={342} size={46} fill={C.cyan}>FoodDash</Label>
        <MonoLabel x={690} y={382}>Our case study system</MonoLabel>
        <rect x={1120} y={54} width={112} height={42} rx={21} fill={`${C.cyan}22`} stroke={C.cyan} strokeWidth={2} />
        <Label x={1176} y={82} size={18} fill={C.cyan}>EP.2</Label>
      </g>
    </BaseStage>
  );
};

const RecapScene = ({beat}: SceneProps) => (
  <BaseStage beat={beat}>
    <Label x={690} y={72} size={28} fill={C.muted}>WHAT WE BUILT IN PART 1</Label>
    <Architecture />
    <Badge x={1095} y={417} label="REPLICA READY" fill={C.green} width={190} />
    <Label x={690} y={492} fill={C.green} size={34}>Redundancy: Check. Replication: Check.</Label>
  </BaseStage>
);

const GapScene = ({beat, currentTime}: SceneProps) => {
  const t = currentTime - beat.start;
  const showCallout = t > 6 && t < 12;

  return (
    <BaseStage beat={beat}>
      <Architecture failed stuck />
      <rect x={542} y={74} width={296} height={52} rx={8} fill={`${C.gold}18`} stroke={C.gold} strokeWidth={2} />
      <Label x={690} y={109} fill={C.gold} size={24}>GAP: NO ONE KNOWS TO SWITCH</Label>
      <Badge x={1095} y={138} label="READY BUT IDLE" fill={C.green} width={205} />
      {showCallout ? (
        <g>
          <rect x={360} y={158} width={660} height={170} rx={12} fill="rgba(13,27,42,0.92)" stroke={C.red} strokeWidth={4} />
          <Label x={690} y={226} size={48}>THE BACKUP WAS READY.</Label>
          <Label x={690} y={281} size={36} fill={C.red}>NOTHING USED IT.</Label>
        </g>
      ) : null}
    </BaseStage>
  );
};

const HumanSlowScene = ({beat, currentTime}: SceneProps) => {
  const t = currentTime - beat.start;
  const users = t > 10 ? 12 : 4;

  return (
    <BaseStage beat={beat}>
      <UserIcon x={92} y={178} count={users} waiting />
      <Engineer x={650} y={260} asleep={t < 10} />
      <g transform="translate(1020 110)">
        <rect x={-150} y={0} width={300} height={210} rx={10} fill={C.panel} stroke={C.red} strokeWidth={4} />
        <Label x={0} y={52} fill={C.red} size={30}>ALERT RINGING</Label>
        <MonoLabel x={0} y={92}>03:47 AM</MonoLabel>
        <MonoLabel x={0} y={130}>{t < 10 ? 'waiting for human...' : 'VPN... login... runbook...'}</MonoLabel>
        <rect x={-110} y={160} width={220} height={18} rx={9} fill="#26394F" />
        <rect x={-110} y={160} width={interpolate(t, [0, 16], [35, 190], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} height={18} rx={9} fill={C.red} />
      </g>
      <Label x={690} y={490} size={56}>HUMANS ARE TOO SLOW</Label>
      <MonoLabel x={690} y={524} fill={C.cyan} size={22}>machines need to detect and route</MonoLabel>
    </BaseStage>
  );
};

const HealthCoreScene = ({beat, currentTime}: SceneProps) => {
  const t = currentTime - beat.start;
  const p = ((t % 1.2) / 1.2);

  return (
    <BaseStage beat={beat}>
      <ServerBox x={990} y={252} label="FOODDASH API" />
      <ServerBox x={370} y={252} label="MONITOR" sub="every 1.2s" />
      <Connector x1={440} y1={252} x2={920} y2={252} active />
      <HealthPulse x1={450} y1={252} x2={910} y2={252} progress={p} />
      <circle cx={690} cy={252} r={92} fill="none" stroke={C.cyan} strokeWidth={3} strokeDasharray="42 22" opacity={pulse(t)} />
      <Label x={690} y={106} size={42}>HEALTH CHECK = CONTINUOUS AUTOMATED TEST</Label>
      <MonoLabel x={690} y={148} fill={C.cyan}>Is it alive and useful?</MonoLabel>
      <CounterDots x={625} y={412} active={3} />
      <MonoLabel x={690} y={474} fill={C.green}>1 pass / 2 pass / 3 pass / loop continues</MonoLabel>
    </BaseStage>
  );
};

const ShallowScene = ({beat}: SceneProps) => (
  <BaseStage beat={beat}>
    <g transform="translate(210 80)">
      <rect x={0} y={0} width={420} height={360} rx={12} fill={C.panel} stroke={C.green} strokeWidth={4} />
      <Label x={210} y={80} fill={C.green} size={48}>200 OK</Label>
      <ServerBox x={210} y={188} label="API EXTERIOR" />
      <Badge x={210} y={310} label="WEB PROCESS RUNNING" fill={C.green} width={260} />
    </g>
    <g transform="translate(750 80)">
      <rect x={0} y={0} width={420} height={360} rx={12} fill={C.panel} stroke={C.red} strokeWidth={4} />
      <Label x={210} y={58} fill={C.red} size={34}>BEHIND THE SCENES</Label>
      <MonoLabel x={70} y={122} anchor="start" fill={C.green}>web process: RUNNING</MonoLabel>
      <MonoLabel x={70} y={174} anchor="start" fill={C.red}>db connection: FAILED</MonoLabel>
      <MonoLabel x={70} y={226} anchor="start" fill={C.red}>redis cache: TIMEOUT</MonoLabel>
      <DbCylinder x={318} y={252} label="DB" state="dead" />
    </g>
    <Label x={690} y={496} fill={C.gold} size={36}>Technically alive. Practically useless.</Label>
  </BaseStage>
);

const PyramidScene = ({beat, currentTime}: SceneProps) => {
  const t = currentTime - beat.start;
  const active = t > 17 ? 3 : t > 13 ? 2 : t > 9 ? 1 : 0;
  const layers = [
    {label: 'PROCESS HEALTH', sub: 'process running / port open', y: 355, width: 610, color: C.cyan},
    {label: 'APPLICATION HEALTH', sub: 'config / DB / cache reachable', y: 255, width: 455, color: '#35D3FF'},
    {label: 'BUSINESS HEALTH', sub: 'order placed / fee calculated', y: 155, width: 300, color: C.gold},
  ];

  return (
    <BaseStage beat={beat}>
      <Label x={690} y={78} size={42}>THE HEALTH CHECK PYRAMID</Label>
      {layers.map((layer, index) => {
        const on = active > index;
        return (
          <g key={layer.label} opacity={on ? 1 : 0.32}>
            <polygon
              points={`${690 - layer.width / 2},${layer.y + 72} ${690 + layer.width / 2},${layer.y + 72} ${690 + layer.width / 2 - 78},${layer.y} ${690 - layer.width / 2 + 78},${layer.y}`}
              fill={on ? `${layer.color}24` : 'transparent'}
              stroke={on ? layer.color : C.muted}
              strokeWidth={4}
            />
            <Label x={690} y={layer.y + 37} fill={on ? layer.color : C.muted} size={24}>{layer.label}</Label>
            <MonoLabel x={690} y={layer.y + 61} fill={on ? C.text : C.muted}>{layer.sub}</MonoLabel>
          </g>
        );
      })}
      <Badge x={240} y={185} label="Layer 1: machine" width={210} />
      <Badge x={240} y={285} label="Layer 2: dependencies" width={250} />
      <Badge x={240} y={385} label="Layer 3: user outcome" fill={C.gold} width={270} />
      <Label x={1080} y={248} fill={C.green} size={30}>USER GETS PIZZA</Label>
      <TrafficArrow d="M 930 285 C 1000 250 1065 250 1138 285" color={C.green} />
      <UserIcon x={1160} y={285} />
    </BaseStage>
  );
};

const HealthCompareScene = ({beat}: SceneProps) => (
  <BaseStage beat={beat}>
    <rect x={140} y={130} width={480} height={280} rx={12} fill={C.panel} stroke={C.red} strokeWidth={4} />
    <ServerBox x={380} y={228} label="MACHINE ON" />
    <Label x={380} y={356} fill={C.red} size={27}>USER CANNOT ORDER</Label>
    <Label x={690} y={294} fill={C.gold} size={74}>!=</Label>
    <rect x={760} y={130} width={480} height={280} rx={12} fill={C.panel} stroke={C.green} strokeWidth={4} />
    <Label x={1000} y={212} fill={C.green} size={34}>ALL 3 LAYERS PASS</Label>
    <UserIcon x={936} y={268} />
    <Label x={1000} y={356} fill={C.green} size={27}>USER COMPLETES ORDER</Label>
  </BaseStage>
);

const FailoverScene = ({beat, currentTime}: SceneProps) => {
  const id = beat.id;
  const activeDots = id === 'hc-failover-detect' ? 3 : id === 'hc-failover-promote' || id === 'hc-failover-redirect' ? 3 : 0;
  const primaryState: NodeState = activeDots ? 'dead' : 'healthy';
  const replicaState: NodeState = id === 'hc-failover-promote' || id === 'hc-failover-redirect' ? 'promoted' : 'muted';
  const redirect = id === 'hc-failover-redirect';
  const p = ((currentTime - beat.start) % 1.2) / 1.2;

  return (
    <BaseStage beat={beat}>
      <ServerBox x={340} y={235} label="API SERVER" />
      <ServerBox x={690} y={92} label="HEALTH MONITOR" sub="threshold = 3" />
      <DbCylinder x={620} y={295} label="PRIMARY DB" state={primaryState} role="PRIMARY" />
      <DbCylinder x={940} y={295} label={replicaState === 'promoted' ? 'NEW PRIMARY' : 'REPLICA DB'} state={replicaState} role={replicaState === 'promoted' ? 'PRIMARY' : 'REPLICA'} />
      <Connector x1={410} y1={235} x2={562} y2={280} active={!redirect && !activeDots} severed={primaryState === 'dead' && !redirect} />
      <Connector x1={410} y1={235} x2={882} y2={280} active={redirect} />
      <Connector x1={690} y1={136} x2={620} y2={215} active={!activeDots} />
      <HealthPulse x1={690} y1={136} x2={620} y2={215} progress={p} failed={activeDots > 0} />
      <CounterDots x={596} y={464} active={activeDots} size={40} />
      <Label x={690} y={524} fill={activeDots === 3 ? C.gold : C.muted} size={24}>{activeDots === 3 ? '3 CONSECUTIVE FAILURES DETECTED' : 'WAITING FOR FAILED CHECKS'}</Label>
      <g transform="translate(1010 430)">
        <Badge x={0} y={0} label="STEP 1" fill={activeDots ? C.red : C.muted} width={105} />
        <Badge x={125} y={0} label="STEP 2" fill={replicaState === 'promoted' ? C.gold : C.muted} width={105} />
        <Badge x={250} y={0} label="STEP 3" fill={redirect ? C.green : C.muted} width={105} />
      </g>
      {redirect ? <TrafficArrow d="M 208 205 C 390 115 735 115 930 225" color={C.green} /> : <TrafficArrow d="M 208 205 C 340 180 480 190 610 225" color={primaryState === 'dead' ? C.red : C.cyan} opacity={primaryState === 'dead' ? 0.35 : 1} />}
    </BaseStage>
  );
};

const ThresholdScene = ({beat}: SceneProps) => (
  <BaseStage beat={beat}>
    <Label x={690} y={80} size={42}>RECOVERY SPEED VS FALSE POSITIVES</Label>
    <rect x={145} y={150} width={430} height={260} rx={12} fill={C.panel} stroke={C.red} strokeWidth={4} />
    <Label x={360} y={205} fill={C.red} size={34}>LOW THRESHOLD</Label>
    <MonoLabel x={360} y={250}>fast detection</MonoLabel>
    <MonoLabel x={360} y={292} fill={C.red}>high false alarm risk</MonoLabel>
    <MonoLabel x={360} y={334} fill={C.red}>{'50ms pause -> failover'}</MonoLabel>
    <rect x={805} y={150} width={430} height={260} rx={12} fill={C.panel} stroke={C.gold} strokeWidth={4} />
    <Label x={1020} y={205} fill={C.gold} size={34}>HIGH THRESHOLD</Label>
    <MonoLabel x={1020} y={250}>stable and calm</MonoLabel>
    <MonoLabel x={1020} y={292} fill={C.gold}>users wait longer</MonoLabel>
    <MonoLabel x={1020} y={334} fill={C.gold}>4 minutes elapsed</MonoLabel>
    <line x1={475} y1={462} x2={905} y2={462} stroke={C.muted} strokeWidth={8} strokeLinecap="round" />
    <polygon points="690,418 724,462 656,462" fill={C.gold} />
    <Label x={690} y={512} fill={C.gold} size={28}>Tune the threshold, do not guess.</Label>
  </BaseStage>
);

const ThresholdThreeScene = ({beat, currentTime}: SceneProps) => {
  const t = currentTime - beat.start;
  const active = t > 10 ? 3 : t > 7 ? 2 : t > 4 ? 1 : 0;

  return (
    <BaseStage beat={beat}>
      <Label x={690} y={92} size={42}>PRODUCTION STANDARD</Label>
      <Label x={690} y={166} size={96} fill={C.gold}>3</Label>
      <Label x={690} y={216} size={30}>CONSECUTIVE FAILED HEALTH CHECKS</Label>
      <CounterDots x={603} y={310} active={active} size={58} />
      <ServerBox x={690} y={425} label={active === 3 ? 'DECLARED DEAD' : 'OBSERVING'} state={active === 3 ? 'dead' : 'healthy'} />
      <MonoLabel x={690} y={526} fill={C.muted}>Not 1: too eager. Not 10: too slow. 3: sweet spot.</MonoLabel>
    </BaseStage>
  );
};

const LoadBalancerScene = ({beat, currentTime}: SceneProps) => {
  const id = beat.id;
  const global = id === 'hc-lb-global';
  const t = currentTime - beat.start;
  const failedIndex = id === 'hc-lb-pool' || t > 16 ? 3 : -1;
  const servers = Array.from({length: 10}).map((_, index) => ({
    x: 425 + (index % 5) * 150,
    y: 240 + Math.floor(index / 5) * 120,
    state: index === failedIndex ? 'dead' as NodeState : 'healthy' as NodeState,
  }));

  if (global) {
    return (
      <BaseStage beat={beat}>
        <Label x={690} y={70} size={40}>SAME PRINCIPLE. DIFFERENT SCALE.</Label>
        <rect x={120} y={140} width={500} height={300} rx={12} fill={C.panel} stroke={C.cyan} strokeWidth={3} />
        <LoadBalancer x={370} y={250} />
        <ServerBox x={230} y={365} label="srv-A" />
        <ServerBox x={510} y={365} label="srv-B" />
        <Label x={370} y={420} fill={C.green} size={24}>LOCAL FAILOVER</Label>
        <rect x={760} y={140} width={500} height={300} rx={12} fill={C.panel} stroke={C.green} strokeWidth={3} />
        <path d="M 845 320 C 930 210 1065 215 1180 292" fill="none" stroke={C.muted} strokeWidth={3} strokeDasharray="10 10" />
        <circle cx={890} cy={300} r={30} fill={C.red} opacity={0.85} />
        <Label x={890} y={307} size={20}>X</Label>
        <Label x={890} y={360} fill={C.red} size={20}>MUMBAI DOWN</Label>
        <circle cx={1160} cy={286} r={34} fill={C.green} filter="url(#hc2Glow)" />
        <Label x={1160} y={293} size={18} fill={C.bg}>SG</Label>
        <TrafficArrow d="M 835 220 C 950 155 1075 185 1148 260" color={C.green} />
        <Label x={1010} y={420} fill={C.green} size={24}>REGIONAL FAILOVER</Label>
      </BaseStage>
    );
  }

  return (
    <BaseStage beat={beat}>
      <LoadBalancer x={690} y={116} />
      <UserIcon x={102} y={100} count={3} />
      <TrafficArrow d="M 190 118 C 330 76 465 78 582 104" />
      {servers.map((server, index) => (
        <React.Fragment key={index}>
          <Connector x1={690} y1={194} x2={server.x} y2={server.y - 44} active={server.state !== 'dead'} severed={server.state === 'dead'} />
          <ServerBox x={server.x} y={server.y} label={`srv-${String(index + 1).padStart(2, '0')}`} state={server.state} sub={server.state === 'dead' ? 'removed' : 'healthy'} />
        </React.Fragment>
      ))}
      <Label x={690} y={506} fill={failedIndex >= 0 ? C.gold : C.cyan} size={28}>
        {failedIndex >= 0 ? 'srv-04 yanked from rotation; 9 healthy servers active' : 'Ping backend servers, route only to healthy nodes'}
      </Label>
    </BaseStage>
  );
};

const ChaosScene = ({beat}: SceneProps) => {
  const outage = beat.id === 'hc-chaos-outage';
  const drills = beat.id === 'hc-chaos-drills';

  return (
    <BaseStage beat={beat}>
      {outage ? (
        <>
          <Label x={690} y={82} size={42} fill={C.red}>THE WORST MOMENT</Label>
          <rect x={240} y={130} width={900} height={300} rx={12} fill={C.panel} stroke={C.red} strokeWidth={4} />
          <MonoLabel x={312} y={190} anchor="start" fill={C.green}>02:47:00 dashboard: nominal</MonoLabel>
          <MonoLabel x={312} y={245} anchor="start" fill={C.red}>02:47:12 cascading alerts</MonoLabel>
          <MonoLabel x={312} y={300} anchor="start" fill={C.red}>FAILOVER EXECUTING... 43%</MonoLabel>
          <MonoLabel x={312} y={355} anchor="start" fill={C.red}>ERROR: failover script not tested</MonoLabel>
          <Engineer x={1020} y={310} />
        </>
      ) : drills ? (
        <>
          <Label x={690} y={74} size={42}>CHAOS DRILLS PROVE RECOVERY</Label>
          {['FORCE SHUTDOWN', 'kill -9 PID', 'SEVER NETWORK'].map((label, index) => (
            <g key={label} transform={`translate(${260 + index * 330} 210)`}>
              <rect x={-125} y={-82} width={250} height={205} rx={12} fill={C.panel} stroke={index === 2 ? C.red : C.cyan} strokeWidth={4} />
              <Label x={0} y={-24} fill={index === 2 ? C.red : C.cyan} size={28}>{label}</Label>
              <ServerBox x={0} y={58} label={index === 1 ? 'PROCESS' : 'SERVER'} state={index === 2 ? 'dead' : 'muted'} />
            </g>
          ))}
          <Label x={690} y={490} fill={C.green} size={30}>PROVEN BEFORE CUSTOMERS FEEL IMPACT</Label>
        </>
      ) : (
        <>
          <Label x={690} y={88} size={42} fill={C.gold}>THE GOLDEN RULE</Label>
          <circle cx={690} cy={265} r={116} fill={`${C.gold}22`} stroke={C.gold} strokeWidth={5} filter="url(#hc2Glow)" />
          <Label x={690} y={250} size={34} fill={C.gold}>TEST</Label>
          <Label x={690} y={292} size={34} fill={C.gold}>FAILOVER</Label>
          <MonoLabel x={690} y={424} fill={C.text} size={24}>before the real outage finds the broken step</MonoLabel>
        </>
      )}
    </BaseStage>
  );
};

const RecapBoardScene = ({beat, currentTime}: SceneProps) => {
  const t = currentTime - beat.start;
  const rows = [
    ['1', 'Health Checks', 'Detect real failure, not just server alive-ness', C.cyan],
    ['2', 'Failover', 'Auto-redirect traffic in three steps', C.green],
    ['3', 'Threshold = 3', 'Balance speed against false positives', C.gold],
    ['4', 'Load Balancers', 'Detect, remove, and restore', '#5FA8FF'],
    ['5', 'Chaos Test', 'Prove it before users feel it', '#FF9F43'],
  ];

  return (
    <BaseStage beat={beat}>
      <Label x={690} y={72} size={42}>TL;DR - THE FULL PICTURE</Label>
      {rows.map(([number, title, detail, color], index) => {
        const on = t > 5 + index * 4;
        return (
          <g key={title} opacity={on ? 1 : 0.34}>
            <rect x={190} y={118 + index * 76} width={1000} height={58} rx={8} fill={C.panel} stroke={on ? color : C.muted} strokeWidth={3} />
            <rect x={190} y={118 + index * 76} width={12} height={58} rx={6} fill={color} />
            <Label x={238} y={156 + index * 76} fill={color} size={24}>{number}</Label>
            <Label x={390} y={156 + index * 76} anchor="start" fill={C.text} size={24}>{title}</Label>
            <MonoLabel x={620} y={157 + index * 76} anchor="start" fill={C.muted} size={17}>{detail}</MonoLabel>
            {on ? <Badge x={1130} y={147 + index * 76} label="PASS" fill={C.green} width={92} /> : null}
          </g>
        );
      })}
    </BaseStage>
  );
};

const FinalScene = ({beat}: SceneProps) => {
  const next = beat.id === 'hc-next-question';
  const outro = beat.id === 'hc-outro';

  if (next) {
    return (
      <BaseStage beat={beat}>
        <Label x={690} y={142} size={54}>HOW MUCH DOWNTIME IS ACCEPTABLE?</Label>
        <MonoLabel x={690} y={196} fill={C.muted} size={24}>Availability targets, uptime percentages, and the famous nines</MonoLabel>
        {['99.9%', '99.99%', '99.999%'].map((n, index) => (
          <g key={n} transform={`translate(${360 + index * 330} 320)`}>
            <rect x={-120} y={-76} width={240} height={150} rx={12} fill={C.panel} stroke={C.cyan} strokeWidth={4} />
            <Label x={0} y={-10} fill={C.cyan} size={42}>{n}</Label>
            <MonoLabel x={0} y={36}>{index + 3} nines</MonoLabel>
          </g>
        ))}
      </BaseStage>
    );
  }

  if (outro) {
    return (
      <BaseStage beat={beat}>
        <Architecture />
        <rect x={476} y={54} width={428} height={90} rx={12} fill={`${C.red}DD`} />
        <Label x={690} y={112} size={36}>SUBSCRIBE</Label>
        <Label x={690} y={496} fill={C.green} size={30}>FoodDash: healthy, routed, monitored</Label>
      </BaseStage>
    );
  }

  return (
    <BaseStage beat={beat}>
      <Label x={690} y={100} size={52}>TRUE AVAILABILITY</Label>
      <MonoLabel x={690} y={148} size={23}>is not backup servers sitting idle</MonoLabel>
      {['Detection', 'Routing', 'Replication', 'Recovery'].map((label, index) => {
        const x = 360 + index * 220;
        const y = index % 2 === 0 ? 275 : 315;
        return (
          <g key={label}>
            <circle cx={x} cy={y} r={70} fill={`${C.cyan}22`} stroke={index === 3 ? C.green : C.cyan} strokeWidth={4} />
            <path d={`M ${x - 44} ${y} H ${x + 44} M ${x} ${y - 44} V ${y + 44}`} stroke={index === 3 ? C.green : C.cyan} strokeWidth={8} strokeLinecap="round" opacity={0.72} />
            <Label x={x} y={y + 112} size={22} fill={index === 3 ? C.green : C.text}>{label}</Label>
          </g>
        );
      })}
      <Label x={690} y={494} fill={C.green} size={30}>THEN you have true availability.</Label>
    </BaseStage>
  );
};

export const HCScreenVisual: React.FC<SceneProps> = ({beat, currentTime}) => {
  switch (beat.id) {
    case 'hc-intro-logo':
      return <IntroScene beat={beat} currentTime={currentTime} />;
    case 'hc-intro-architecture':
      return <RecapScene beat={beat} currentTime={currentTime} />;
    case 'hc-gap-backup':
      return <GapScene beat={beat} currentTime={currentTime} />;
    case 'hc-gap-human':
      return <HumanSlowScene beat={beat} currentTime={currentTime} />;
    case 'hc-section-health':
      return <SectionCard beat={beat} section="SECTION 1" title="Health Checks" subtitle="Detecting Failures" />;
    case 'hc-health-core':
      return <HealthCoreScene beat={beat} currentTime={currentTime} />;
    case 'hc-health-shallow':
      return <ShallowScene beat={beat} currentTime={currentTime} />;
    case 'hc-health-pyramid':
      return <PyramidScene beat={beat} currentTime={currentTime} />;
    case 'hc-health-compare':
      return <HealthCompareScene beat={beat} currentTime={currentTime} />;
    case 'hc-section-failover':
      return <SectionCard beat={beat} section="SECTION 2" title="Failover" subtitle="Automatic Traffic Redirection" />;
    case 'hc-failover-setup':
    case 'hc-failover-detect':
    case 'hc-failover-promote':
    case 'hc-failover-redirect':
      return <FailoverScene beat={beat} currentTime={currentTime} />;
    case 'hc-threshold-tradeoff':
      return <ThresholdScene beat={beat} currentTime={currentTime} />;
    case 'hc-threshold-three':
      return <ThresholdThreeScene beat={beat} currentTime={currentTime} />;
    case 'hc-section-loadbalancer':
      return <SectionCard beat={beat} section="SECTION 3" title="Load Balancers" subtitle="Recovery Orchestrators" />;
    case 'hc-lb-workflow':
    case 'hc-lb-pool':
    case 'hc-lb-global':
      return <LoadBalancerScene beat={beat} currentTime={currentTime} />;
    case 'hc-section-chaos':
    case 'hc-chaos-outage':
    case 'hc-chaos-drills':
      return <ChaosScene beat={beat} currentTime={currentTime} />;
    case 'hc-recap-board':
      return <RecapBoardScene beat={beat} currentTime={currentTime} />;
    case 'hc-final-takeaway':
    case 'hc-next-question':
    case 'hc-outro':
      return <FinalScene beat={beat} currentTime={currentTime} />;
    default:
      return <IntroScene beat={beat} currentTime={currentTime} />;
  }
};
