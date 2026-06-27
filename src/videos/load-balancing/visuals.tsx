import React from 'react';
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers3,
  LineChart,
  RefreshCw,
  Scale,
  Server,
  ShoppingCart,
  Smartphone,
  ThumbsUp,
  User,
  XCircle,
} from 'lucide-react';
import {Easing, Img, interpolate, staticFile} from 'remotion';
import type {LessonBeat} from '../../types';
import {
  ArchitectureNode,
  ArchitectureStage,
  BigNote,
  CardFrame,
  DatabaseNode,
  HtmlWire,
  ServiceNode,
} from '../the-famous-nines/visuals';

type LoadBalancingVisualProps = {
  beat: LessonBeat;
  currentTime: number;
  frame: number;
  fps: number;
};

type Point = {x: number; y: number};
type IconType = React.ComponentType<{size?: number; strokeWidth?: number}>;

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const beatNumber = (beat: LessonBeat) => Number(beat.id.replace('lb-', '')) || 0;
const localProgress = (beat: LessonBeat, currentTime: number) =>
  clamp((currentTime - beat.start) / Math.max(beat.end - beat.start, 0.001));
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const reveal = (progress: number, from = 0, to = 0.22) =>
  interpolate(progress, [from, to], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
const packetLoop = (currentTime: number, speed = 0.42, offset = 0) => (currentTime * speed + offset) % 1;

const pointOnPolyline = (points: Point[], progress: number): Point => {
  const segments = points.slice(1).map((to, index) => {
    const from = points[index];
    return {from, to, length: Math.hypot(to.x - from.x, to.y - from.y)};
  });
  const total = segments.reduce((sum, segment) => sum + segment.length, 0);
  let remaining = clamp(progress) * total;

  for (const segment of segments) {
    if (remaining <= segment.length) {
      const p = segment.length === 0 ? 0 : remaining / segment.length;
      return {
        x: segment.from.x + (segment.to.x - segment.from.x) * p,
        y: segment.from.y + (segment.to.y - segment.from.y) * p,
      };
    }
    remaining -= segment.length;
  }

  return points[points.length - 1];
};

const Token: React.FC<{
  points: Point[];
  progress: number;
  kind?: 'traffic' | 'health';
  label?: string;
  muted?: boolean;
}> = ({points, progress, kind = 'traffic', label, muted}) => {
  const point = pointOnPolyline(points, progress);
  const health = kind === 'health';

  return (
    <div
      style={{
        position: 'absolute',
        left: point.x - (health ? 8 : 11),
        top: point.y - (health ? 8 : 11),
        width: health ? 16 : 22,
        height: health ? 16 : 22,
        display: 'grid',
        placeItems: 'center',
        border: health ? '3px solid #ffffff' : '2px solid #000000',
        borderRadius: health ? 999 : 5,
        background: health ? '#050505' : '#ffffff',
        color: '#000000',
        opacity: muted ? 0.36 : 1,
        boxShadow: health ? '0 0 0 2px rgba(255,255,255,0.16)' : '0 0 0 2px #ffffff',
        zIndex: health ? 4 : 1,
        fontSize: 9,
        fontWeight: 950,
        lineHeight: 1,
      }}
    >
      {health ? null : label}
    </div>
  );
};

const LoadBar: React.FC<{
  x: number;
  y: number;
  w?: number;
  value: number;
  label: string;
  active?: boolean;
}> = ({x, y, w = 180, value, label, active}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, zIndex: 3}}>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6, color: '#ffffff', fontSize: 13, fontWeight: 950, textTransform: 'uppercase'}}>
      <span>{label}</span>
      <span>{Math.round(value)}</span>
    </div>
    <div style={{height: 18, border: `3px solid ${active ? '#ffffff' : 'rgba(255,255,255,0.42)'}`, borderRadius: 5, padding: 3, background: '#050505'}}>
      <div style={{width: `${clamp(value / 100) * 100}%`, height: '100%', borderRadius: 2, background: '#ffffff'}} />
    </div>
  </div>
);

const DoodleAtlasCell: React.FC<{
  cell: number;
  x: number;
  y: number;
  w: number;
  h: number;
  active?: boolean;
  muted?: boolean;
}> = ({cell, x, y, w, h, active, muted}) => {
  const column = cell % 3;
  const row = Math.floor(cell / 3);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        overflow: 'hidden',
        border: active ? '4px solid #ffffff' : '3px solid rgba(255,255,255,0.46)',
        borderRadius: 8,
        background: '#000000',
        boxShadow: active ? '12px 12px 0 rgba(255,255,255,0.12)' : '8px 8px 0 rgba(255,255,255,0.06)',
        opacity: muted ? 0.42 : 1,
        zIndex: 2,
      }}
    >
      <Img
        src={staticFile('images/load-balancing-doodle-atlas.png')}
        style={{
          position: 'absolute',
          left: `calc(${-column * 100}% - ${column * 4}px)`,
          top: `calc(${-row * 100}% - ${row * 4}px)`,
          width: 'calc(300% + 16px)',
          height: 'calc(300% + 16px)',
          maxWidth: 'none',
          objectFit: 'fill',
          filter: 'contrast(1.08)',
        }}
      />
    </div>
  );
};

const CapacityBlock: React.FC<{x: number; y: number; label?: string; muted?: boolean}> = ({x, y, label = '1× capacity', muted}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 124,
      padding: '8px 10px',
      border: '3px solid rgba(255,255,255,0.72)',
      borderRadius: 6,
      color: '#ffffff',
      background: '#050505',
      opacity: muted ? 0.35 : 1,
      textAlign: 'center',
      textTransform: 'uppercase',
      fontSize: 13,
      fontWeight: 950,
      zIndex: 3,
    }}
  >
    {label}
  </div>
);

const QueueMeter: React.FC<{x: number; y: number; depth: number; label?: string}> = ({x, y, depth, label = 'queue'}) => {
  const visible = Math.min(8, Math.max(0, Math.round(depth)));
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 132, zIndex: 3}}>
      <div style={{color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: 950, textTransform: 'uppercase', marginBottom: 7}}>{label}: {Math.round(depth)}</div>
      <div style={{display: 'flex', gap: 5, flexWrap: 'wrap'}}>
        {Array.from({length: visible}).map((_, index) => (
          <span key={index} style={{width: 20, height: 16, border: '2px solid #ffffff', borderRadius: 3, background: index < 2 ? '#ffffff' : '#050505'}} />
        ))}
      </div>
    </div>
  );
};

const MetricCard: React.FC<{x: number; y: number; label: string; value: string; icon?: IconType; active?: boolean; muted?: boolean}> = ({x, y, label, value, icon: Icon = Activity, active, muted}) => (
  <CardFrame x={x} y={y} w={210} h={108} active={active} muted={muted}>
    <Icon size={31} strokeWidth={3} />
    <strong style={{color: 'inherit', fontSize: 22, fontWeight: 950}}>{label}</strong>
    <span style={{color: 'inherit', fontSize: 16, fontWeight: 900, opacity: 0.72}}>{value}</span>
  </CardFrame>
);

const LoadBalancerNode: React.FC<{
  x?: number;
  y?: number;
  label?: string;
  sub?: string;
  active?: boolean;
  failed?: boolean;
  muted?: boolean;
  badge?: string;
}> = ({x = 342, y = 198, label = 'Load Balancer', sub = 'choose destination', active = true, failed, muted, badge}) => (
  <ArchitectureNode label={label} sub={sub} icon={GitBranch} x={x} y={y} w={204} h={132} active={active} failed={failed} muted={muted} badge={badge} />
);

const PhoneNode: React.FC<{status?: 'ready' | 'loading' | 'success' | 'failed'; x?: number; y?: number}> = ({status = 'ready', x = 42, y = 202}) => (
  <CardFrame x={x} y={y} w={154} h={132} active={status === 'success'} failed={status === 'failed'}>
    <Smartphone size={38} strokeWidth={3} />
    <strong style={{color: 'inherit', fontSize: 23, fontWeight: 950}}>FoodDash</strong>
    <span style={{color: 'inherit', fontSize: 15, fontWeight: 900, opacity: 0.72}}>
      {status === 'loading' ? 'loading…' : status === 'success' ? 'order confirmed' : status === 'failed' ? 'unavailable' : 'place order'}
    </span>
  </CardFrame>
);

const SERVER_Y = [82, 218, 354];
const serverPath = (index: number, lbX = 546): Point[] => [
  {x: lbX, y: 264},
  {x: 650, y: 264},
  {x: 650, y: SERVER_Y[index] + 52},
  {x: 760, y: SERVER_Y[index] + 52},
];

const ServerPool: React.FC<{
  labels?: boolean;
  failedIndex?: number;
  activeIndexes?: number[];
  loads?: number[];
  queues?: number[];
  showCapacity?: boolean;
  showLoad?: boolean;
  subs?: string[];
}> = ({labels = true, failedIndex = -1, activeIndexes = [0, 1, 2], loads = [0, 0, 0], queues = [0, 0, 0], showCapacity, showLoad, subs}) => (
  <>
    {SERVER_Y.map((y, index) => (
      <React.Fragment key={y}>
        <ServiceNode
          label={labels ? `Server ${String.fromCharCode(65 + index)}` : 'App Server'}
          sub={subs?.[index] ?? (index === failedIndex ? 'unhealthy' : activeIndexes.includes(index) ? 'healthy' : 'idle')}
          x={760}
          y={y}
          w={190}
          h={104}
          active={activeIndexes.includes(index) && index !== failedIndex}
          failed={index === failedIndex}
          muted={!activeIndexes.includes(index) && index !== failedIndex}
        />
        {showCapacity ? <CapacityBlock x={982} y={y + 4} muted={index === failedIndex} /> : null}
        {showLoad ? <LoadBar x={982} y={y + 48} w={170} value={loads[index]} label="load" active={activeIndexes.includes(index) && index !== failedIndex} /> : null}
        {queues[index] > 0 ? <QueueMeter x={1172} y={y + 12} depth={queues[index]} /> : null}
      </React.Fragment>
    ))}
  </>
);

const OpeningArchitecture = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const p = localProgress(beat, currentTime);
  const failover = n === 2 && p > 0.45;
  const appLoad = n === 3 ? 24 + p * 70 : 18;
  const userToApp: Point[] = [{x: 190, y: 266}, {x: 360, y: 266}];
  const appToPrimary: Point[] = [{x: 548, y: 266}, {x: 660, y: 266}, {x: 660, y: 170}, {x: 810, y: 170}];
  const appToStandby: Point[] = [{x: 548, y: 266}, {x: 660, y: 266}, {x: 660, y: 358}, {x: 810, y: 358}];
  const syncPath: Point[] = [{x: 1004, y: 170}, {x: 1060, y: 170}, {x: 1060, y: 358}, {x: 1004, y: 358}];

  return (
    <ArchitectureStage>
      <BigNote active={n === 3} x={248} y={-6} w={884}>
        {n === 1 ? 'One app server · resilient data tier' : n === 2 ? 'Database redundancy + health checks + failover' : 'The next challenge comes from success'}
      </BigNote>
      <HtmlWire points={userToApp} />
      <HtmlWire points={failover ? appToStandby : appToPrimary} />
      <HtmlWire points={syncPath} active={n !== 3} />
      <Token points={userToApp} progress={packetLoop(currentTime, n === 3 ? 0.82 : 0.36)} label="1" />
      {n === 3 ? <Token points={userToApp} progress={packetLoop(currentTime, 0.82, 0.34)} label="2" /> : null}
      <PhoneNode />
      <ServiceNode label="App Server" sub="single instance" x={360} y={202} w={188} h={128} active />
      <DatabaseNode label="Primary DB" sub={failover ? 'failed' : 'active'} x={810} y={112} w={194} h={116} active={!failover} failed={failover} />
      <DatabaseNode label="Standby DB" sub={failover ? 'promoted' : 'replicated'} x={810} y={300} w={194} h={116} active={failover || n === 2} />
      <ArchitectureNode label="Health + Failover" sub={failover ? 'promote standby' : 'monitor data'} icon={Activity} x={1130} y={202} w={196} h={128} active={n === 2} />
      {n === 2 ? <Token points={syncPath} progress={packetLoop(currentTime, 0.28)} kind="health" /> : null}
      <LoadBar x={366} y={350} w={176} value={appLoad} label="app load" active={n === 3} />
    </ArchitectureStage>
  );
};

const GrowthVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const p = localProgress(beat, currentTime);

  if (n <= 5) {
    return (
      <ArchitectureStage>
        <BigNote active x={238} y={-6} w={904}>{n === 4 ? 'FoodDash is growing—fast' : 'The startup dream becomes backend pressure'}</BigNote>
        {n === 4 ? (
          <>
            <DoodleAtlasCell cell={0} x={260} y={112} w={720} h={350} active />
            <MetricCard x={1022} y={156} label="App Opens" value={`${Math.round(120 + p * 2280)} / min`} icon={Smartphone} active />
            <QueueMeter x={1054} y={320} depth={2 + p * 8} label="incoming" />
          </>
        ) : (
          <>
            <DoodleAtlasCell cell={1} x={70} y={118} w={570} h={334} active />
            <DoodleAtlasCell cell={2} x={714} y={118} w={570} h={334} active />
            <div style={{position: 'absolute', left: 130, top: 430, color: '#ffffff', fontSize: 20, fontWeight: 950, textTransform: 'uppercase'}}>Restaurants buried in orders</div>
            <div style={{position: 'absolute', left: 804, top: 430, color: '#ffffff', fontSize: 20, fontWeight: 950, textTransform: 'uppercase'}}>Drivers accepting jobs</div>
          </>
        )}
      </ArchitectureStage>
    );
  }

  const load = n === 6 ? 65 + p * 35 : n === 7 ? 96 : 100;
  const queue = n === 6 ? 4 + p * 24 : n === 7 ? 28 : 34;
  const failed = n === 8 && p > 0.62;

  return (
    <ArchitectureStage>
      <BigNote active={n >= 7} x={252} y={-6} w={876}>
        {n === 6 ? 'Success disaster: every request hits one server' : n === 7 ? 'Saturation → queueing → latency' : 'Users experience the infrastructure failure'}
      </BigNote>
      <DoodleAtlasCell cell={3} x={66} y={112} w={620} h={350} active={!failed} />
      <LoadBar x={734} y={136} w={230} value={load} label="CPU %" active />
      <MetricCard x={734} y={190} label="Memory" value={`${Math.round(58 + p * 36)}%`} icon={Layers3} active={n >= 7} />
      <MetricCard x={1018} y={190} label="P95 Latency" value={n === 6 ? `${(0.4 + p * 3.8).toFixed(1)}s` : n === 7 ? '4.6s' : 'timeout'} icon={Clock} active={n >= 7} />
      <QueueMeter x={764} y={340} depth={queue} label="request queue" />
      <PhoneNode x={1072} y={330} status={n === 8 ? failed ? 'failed' : 'loading' : 'ready'} />
    </ArchitectureStage>
  );
};

const VerticalScalingVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const p = localProgress(beat, currentTime);
  const upgraded = n >= 10;
  const relief = n === 11;
  const wall = n >= 12;
  const load = relief ? 46 : wall ? 95 + p * 5 : 72 - (upgraded ? p * 22 : 0);
  const growth = n === 9
    ? interpolate(p, [0, 1], [0.72, 0.88], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : n === 10
      ? interpolate(p, [0, 0.82], [0.88, 1.08], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
      : 1.08;
  const wallPulse = wall ? Math.sin(currentTime * 8) * 0.008 : 0;
  const serverScale = growth + wallPulse;
  const serverWidth = 540 * serverScale;
  const serverHeight = 276 * serverScale;
  const serverX = 650 - serverWidth / 2;
  const serverY = 278 - serverHeight / 2;
  const coreCount = n === 10 ? Math.round(interpolate(p, [0.12, 0.76], [4, 16], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})) : upgraded ? 16 : 4;
  const memoryGb = n === 10 ? Math.round(interpolate(p, [0.12, 0.76], [16, 64], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})) : upgraded ? 64 : 16;

  return (
    <ArchitectureStage>
      <BigNote active={n >= 12} x={242} y={-6} w={896}>
        {n === 9 ? 'First instinct: buy a bigger server' : n === 10 ? 'Vertical scaling = grow one machine' : n === 11 ? 'It works—temporarily' : n === 12 ? 'One machine eventually hits a wall' : 'Rotate the scaling axis'}
      </BigNote>
      <div
        style={{
          position: 'absolute',
          left: serverX,
          top: serverY,
          width: serverWidth,
          height: serverHeight,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          padding: '22px 26px',
          border: `5px solid ${wall ? 'rgba(255,255,255,0.72)' : '#ffffff'}`,
          borderRadius: 10,
          background: '#050505',
          color: '#ffffff',
          boxShadow: `${14 * serverScale}px ${14 * serverScale}px 0 rgba(255,255,255,0.12)`,
          transform: wall ? `translateX(${Math.sin(currentTime * 18) * 2}px)` : 'none',
          transformOrigin: 'center',
          zIndex: 2,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <Server size={42} strokeWidth={3} />
            <div>
              <div style={{fontSize: 27, fontWeight: 950, textTransform: 'uppercase'}}>FoodDash App Server</div>
              <div style={{fontSize: 14, fontWeight: 900, opacity: 0.58, textTransform: 'uppercase'}}>Vertical scale · one machine</div>
            </div>
          </div>
          <span style={{padding: '7px 12px', border: '3px solid #ffffff', borderRadius: 999, fontSize: 14, fontWeight: 950, textTransform: 'uppercase'}}>{wall ? 'at limit' : upgraded ? 'upgraded' : 'current'}</span>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, flex: 1}}>
          {[
            ['CPU', `${coreCount} cores`],
            ['Memory', `${memoryGb} GB`],
            ['Instance', upgraded ? 'XL' : 'M'],
          ].map(([label, value]) => (
            <div key={label} style={{display: 'grid', placeItems: 'center', alignContent: 'center', gap: 8, border: '3px solid rgba(255,255,255,0.62)', borderRadius: 7, background: upgraded && !wall ? '#ffffff' : '#050505', color: upgraded && !wall ? '#000000' : '#ffffff'}}>
              <span style={{fontSize: 14, fontWeight: 950, textTransform: 'uppercase', opacity: 0.66}}>{label}</span>
              <strong style={{fontSize: 24, textTransform: 'uppercase'}}>{value}</strong>
            </div>
          ))}
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 950, textTransform: 'uppercase'}}>
          <span>{upgraded ? 'More compute installed' : 'Existing machine'}</span>
          <span>{Math.round(serverScale * 100)}% size</span>
        </div>
      </div>
      <MetricCard x={82} y={146} label="CPU" value={`${coreCount} cores`} icon={Cpu} active={upgraded} />
      <MetricCard x={82} y={292} label="Memory" value={`${memoryGb} GB`} icon={Layers3} active={upgraded} />
      <MetricCard x={1010} y={146} label="Capacity" value={wall ? 'maxed' : upgraded ? '4×' : '1×'} icon={Scale} active={upgraded && !wall} />
      <MetricCard x={1010} y={292} label="Cost" value={upgraded ? '$$$$' : '$'} icon={LineChart} active={n === 10} />
      <LoadBar x={472} y={448} w={356} value={load} label="active load" active />
      {wall ? <div style={{position: 'absolute', left: 320, top: 78, width: 660, borderTop: '7px solid #ffffff', color: '#ffffff', textAlign: 'center', paddingTop: 8, fontSize: 20, fontWeight: 950, textTransform: 'uppercase', zIndex: 4}}>physical limit</div> : null}
      {n === 13 ? (
        <div style={{position: 'absolute', left: 808, top: 100, color: '#ffffff', fontSize: 34, fontWeight: 950, textTransform: 'uppercase'}}>
          <span style={{opacity: 0.45}}>scale up</span><span style={{margin: '0 20px'}}>→</span><span>scale out</span>
        </div>
      ) : null}
    </ArchitectureStage>
  );
};

const HorizontalPivotVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const p = localProgress(beat, currentTime);
  const labels = n >= 15;
  const showCapacity = n >= 14 && n <= 19;
  const pausedPath: Point[] = [{x: 196, y: 264}, {x: 330, y: 264}];

  if (n === 20) {
    return (
      <ArchitectureStage>
        <BigNote active x={250} y={-6} w={880}>Three open lanes still need direction</BigNote>
        <CardFrame x={60} y={190} w={190} h={160} active>
          <User size={46} /><strong style={{fontSize: 28}}>Customers</strong><span style={{fontSize: 16, fontWeight: 900}}>confused queue</span>
        </CardFrame>
        {[0, 1, 2].map((index) => (
          <CardFrame key={index} x={430 + index * 286} y={176} w={220} h={190} muted={index !== Math.floor(p * 3)}>
            <ShoppingCart size={44} /><strong style={{fontSize: 30}}>Lane {index + 1}</strong><span style={{fontSize: 17, fontWeight: 900}}>open · empty</span>
          </CardFrame>
        ))}
        <BigNote x={438} y={402} w={650}>No dispatcher → unused lanes</BigNote>
      </ArchitectureStage>
    );
  }

  if (n === 14) {
    const poolReveal = reveal(p, 0.18, 0.5);

    return (
      <ArchitectureStage>
        <BigNote active x={226} y={-6} w={928}>Scale up changes size · scale out changes topology</BigNote>

        <div style={{position: 'absolute', left: 70, top: 112, color: '#ffffff', fontSize: 15, fontWeight: 950, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.58}}>Before · vertical scale</div>
        <CardFrame x={70} y={148} w={300} h={238}>
          <Server size={62} strokeWidth={2.6} />
          <strong style={{fontSize: 30}}>One machine</strong>
          <span style={{fontSize: 20, fontWeight: 950}}>Capacity C</span>
          <span style={{fontSize: 14, fontWeight: 900, opacity: 0.58}}>one failure domain · finite ceiling</span>
        </CardFrame>

        <div style={{position: 'absolute', left: 398, top: 196, width: 154, color: '#ffffff', textAlign: 'center', textTransform: 'uppercase', opacity: poolReveal}}>
          <div style={{fontSize: 15, fontWeight: 950, letterSpacing: 1.4, opacity: 0.64}}>Scale out</div>
          <div style={{fontSize: 92, fontWeight: 950, lineHeight: 0.82}}>{'\u2192'}</div>
          <div style={{fontSize: 14, fontWeight: 900, opacity: 0.58}}>add machines</div>
        </div>

        <div style={{position: 'absolute', left: 594, top: 112, color: '#ffffff', fontSize: 15, fontWeight: 950, letterSpacing: 1.5, textTransform: 'uppercase', opacity: poolReveal * 0.72}}>After · horizontal scale</div>
        {[0, 1, 2].map((index) => {
          const nodeReveal = reveal(p, 0.2 + index * 0.09, 0.46 + index * 0.09);
          return (
            <CardFrame
              key={index}
              x={594 + index * 224}
              y={148}
              w={190}
              h={238}
              active
              style={{opacity: nodeReveal, transform: `translateX(${(1 - nodeReveal) * 24}px) translateY(${(1 - nodeReveal) * 14}px)`}}
            >
              <Server size={48} strokeWidth={2.8} />
              <strong style={{fontSize: 25}}>Machine {index + 1}</strong>
              <span style={{fontSize: 20, fontWeight: 950}}>Capacity C</span>
              <span style={{padding: '5px 10px', border: '2px solid currentColor', borderRadius: 999, fontSize: 12, fontWeight: 950}}>independent</span>
            </CardFrame>
          );
        })}

        <div style={{position: 'absolute', left: 70, top: 424, width: 1196, height: 70, display: 'grid', gridTemplateColumns: '260px 1fr 250px', alignItems: 'center', border: '3px solid rgba(255,255,255,0.54)', borderRadius: 8, color: '#ffffff', textTransform: 'uppercase', opacity: poolReveal}}>
          <span style={{paddingLeft: 24, fontSize: 16, fontWeight: 900, opacity: 0.6}}>Provisioned capacity</span>
          <strong style={{fontSize: 28, textAlign: 'center'}}>C → C + C + C = 3C</strong>
          <span style={{paddingRight: 24, fontSize: 15, fontWeight: 900, textAlign: 'right', opacity: 0.6}}>Routing comes next</span>
        </div>
      </ArchitectureStage>
    );
  }

  if (n === 15) {
    const peerReveal = reveal(p, 0.12, 0.42);
    const capacityReveal = reveal(p, 0.44, 0.68);
    const pool = [
      {label: 'Server A', sub: 'new peer'},
      {label: 'Server B', sub: 'original'},
      {label: 'Server C', sub: 'new peer'},
    ];

    return (
      <ArchitectureStage>
        <BigNote active x={226} y={-6} w={928}>Scale out: keep B, add A and C</BigNote>

        <div style={{position: 'absolute', left: 58, top: 154, color: '#ffffff', fontSize: 15, fontWeight: 950, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.62}}>Before</div>
        <CardFrame x={58} y={184} w={220} h={188}>
          <Server size={48} />
          <strong style={{fontSize: 28}}>Server B</strong>
          <span style={{fontSize: 15, fontWeight: 950, opacity: 0.7}}>1 node · 1× capacity</span>
        </CardFrame>

        <div style={{position: 'absolute', left: 302, top: 224, width: 126, color: '#ffffff', textAlign: 'center', textTransform: 'uppercase'}}>
          <div style={{fontSize: 14, fontWeight: 950, letterSpacing: 1.2, opacity: 0.64}}>Scale out</div>
          <div style={{fontSize: 72, fontWeight: 950, lineHeight: 0.8}}>{'\u2192'}</div>
          <div style={{fontSize: 13, fontWeight: 900, opacity: 0.56}}>add peers</div>
        </div>

        <div style={{position: 'absolute', left: 464, top: 124, color: '#ffffff', fontSize: 15, fontWeight: 950, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.62}}>After · application pool</div>
        {pool.map((server, index) => {
          const isOriginal = index === 1;
          const entrance = isOriginal ? 1 : peerReveal;
          const direction = index === 0 ? -1 : 1;
          return (
            <CardFrame
              key={server.label}
              x={464 + index * 256}
              y={154}
              w={216}
              h={196}
              active
              style={{
                opacity: entrance,
                transform: `translateX(${(1 - entrance) * direction * 38}px) translateY(${(1 - entrance) * 16}px)`,
              }}
            >
              <span style={{position: 'absolute', top: 10, padding: '4px 9px', border: '2px solid currentColor', borderRadius: 999, fontSize: 12, fontWeight: 950}}>{server.sub}</span>
              <Server size={48} />
              <strong style={{fontSize: 27}}>{server.label}</strong>
              <span style={{fontSize: 15, fontWeight: 950, opacity: 0.66}}>1× capacity</span>
            </CardFrame>
          );
        })}

        <div style={{position: 'absolute', left: 464, top: 386, width: 728, height: 64, display: 'grid', placeItems: 'center', border: '3px solid rgba(255,255,255,0.62)', borderRadius: 8, color: '#ffffff', fontSize: 24, fontWeight: 950, textTransform: 'uppercase', opacity: capacityReveal, transform: `translateY(${(1 - capacityReveal) * 12}px)`}}>
          1 original + 2 peers = 3× capacity
        </div>
      </ArchitectureStage>
    );
  }

  if (n === 16) {
    const capacityReveal = reveal(p, 0.06, 0.34);
    const utilizationReveal = reveal(p, 0.34, 0.62);

    return (
      <ArchitectureStage>
        <BigNote active x={226} y={-6} w={928}>Provisioned capacity is not routed traffic</BigNote>

        <CardFrame
          x={62}
          y={122}
          w={520}
          h={316}
          active
          style={{justifyContent: 'flex-start', padding: '24px 26px', opacity: capacityReveal, transform: `translateY(${(1 - capacityReveal) * 18}px)`}}
        >
          <Layers3 size={38} />
          <strong style={{fontSize: 28}}>Available capacity</strong>
          <div style={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 8}}>
            {['A', 'B', 'C'].map((label, index) => (
              <div
                key={label}
                style={{padding: '16px 8px', border: '3px solid #000000', borderRadius: 6, background: '#050505', color: '#ffffff', opacity: reveal(p, 0.12 + index * 0.07, 0.44 + index * 0.07)}}
              >
                <Server size={30} />
                <div style={{marginTop: 8, fontSize: 20, fontWeight: 950}}>Server {label}</div>
                <div style={{marginTop: 4, fontSize: 13, fontWeight: 900, opacity: 0.72}}>1× ready</div>
              </div>
            ))}
          </div>
          <strong style={{marginTop: 10, fontSize: 25}}>Total: 3× ready</strong>
        </CardFrame>

        <div style={{position: 'absolute', left: 608, top: 222, width: 108, color: '#ffffff', fontSize: 92, fontWeight: 950, lineHeight: 1, textAlign: 'center', opacity: utilizationReveal}}>≠</div>

        <CardFrame
          x={740}
          y={122}
          w={520}
          h={316}
          style={{justifyContent: 'flex-start', padding: '24px 30px', opacity: utilizationReveal, transform: `translateY(${(1 - utilizationReveal) * 18}px)`}}
        >
          <Activity size={38} />
          <strong style={{fontSize: 28}}>Routed utilization</strong>
          <div style={{width: '100%', display: 'grid', gap: 12, marginTop: 10}}>
            {['A', 'B', 'C'].map((label) => (
              <div key={label} style={{display: 'grid', gridTemplateColumns: '34px 1fr 28px', alignItems: 'center', gap: 10, fontSize: 16, fontWeight: 950}}>
                <span>{label}</span>
                <span style={{height: 16, border: '3px solid rgba(255,255,255,0.62)', borderRadius: 4, background: '#050505'}} />
                <span>0</span>
              </div>
            ))}
          </div>
          <strong style={{marginTop: 10, fontSize: 25}}>Total: 0 routed</strong>
          <span style={{fontSize: 14, fontWeight: 900, opacity: 0.62}}>No routing policy configured yet</span>
        </CardFrame>

        <div style={{position: 'absolute', left: 332, top: 472, width: 716, color: '#ffffff', fontSize: 22, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase', opacity: utilizationReveal}}>
          Capacity exists · utilization stays at zero
        </div>
      </ArchitectureStage>
    );
  }

  if (n >= 17) {
    const activeQuestion = n === 18 ? Math.min(2, Math.floor(p * 3)) : -1;
    return (
      <ArchitectureStage>
        <BigNote active x={226} y={-6} w={928}>
          {n === 17 ? 'Request #001 has no destination' : n === 18 ? 'A? B? C? Who decides?' : 'Capacity is ready. Direction is missing.'}
        </BigNote>
        <PhoneNode x={62} y={196} />
        <Token points={[{x: 216, y: 262}, {x: 310, y: 262}]} progress={1} label="1" />
        <DoodleAtlasCell cell={5} x={328} y={104} w={730} h={368} active />
        <MetricCard x={1094} y={150} label="Capacity" value="3× ready" icon={Scale} active />
        <MetricCard x={1094} y={294} label="Destination" value="missing" icon={GitBranch} active={n >= 18} />
        <div style={{position: 'absolute', left: 470, top: 430, width: 450, display: 'flex', gap: 12}}>
          {['A?', 'B?', 'C?'].map((label, index) => (
            <span key={label} style={{flex: 1, padding: '10px', border: `3px solid ${index === activeQuestion ? '#ffffff' : 'rgba(255,255,255,0.36)'}`, borderRadius: 6, background: index === activeQuestion ? '#ffffff' : '#050505', color: index === activeQuestion ? '#000000' : '#ffffff', textAlign: 'center', fontSize: 20, fontWeight: 950}}>{label}</span>
          ))}
        </div>
      </ArchitectureStage>
    );
  }

  const deadEndX = 390;
  const deadEndPath: Point[] = [{x: 330, y: 264}, {x: deadEndX, y: 264}];
  const deadEndLabel = n === 14 ? 'no route' : n === 15 ? 'no route' : 'routed: 0';

  return (
    <ArchitectureStage>
      <BigNote active x={226} y={-6} w={928}>
        {n === 14 ? 'More capacity ≠ distributed traffic' : n === 15 ? 'Meet Server A, Server B, and Server C' : 'Total capacity: 3× · routed load: 0'}
      </BigNote>
      <HtmlWire points={pausedPath} active />
      <HtmlWire points={deadEndPath} active={false} />
      <Token points={pausedPath} progress={clamp(p * 1.5)} label="1" />
      <div style={{position: 'absolute', left: deadEndX - 14, top: 240, width: 28, height: 28, border: '3px solid rgba(255,255,255,0.72)', borderRadius: 999, display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,0.72)', fontSize: 18, fontWeight: 950, lineHeight: 1, zIndex: 2}}>×</div>
      <div style={{position: 'absolute', left: deadEndX - 40, top: 278, width: 80, color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase', zIndex: 2}}>{deadEndLabel}</div>
      <PhoneNode />
      <ServerPool labels={labels} showCapacity={showCapacity} showLoad={n === 16} loads={[0, 0, 0]} activeIndexes={n >= 15 ? [0, 1, 2] : []} />
      {n === 16 ? <MetricCard x={430} y={360} label="Routed Load" value="0" icon={Activity} active /> : null}
    </ArchitectureStage>
  );
};

const CanonicalArchitecture: React.FC<{
  currentTime: number;
  activeServer?: number;
  failedServer?: number;
  unresponsiveServer?: number;
  loads?: number[];
  queues?: number[];
  showCapacity?: boolean;
  showLoad?: boolean;
  showHealth?: boolean;
  lbFailed?: boolean;
  phoneStatus?: 'ready' | 'loading' | 'success' | 'failed';
  token?: boolean;
}> = ({currentTime, activeServer = 0, failedServer = -1, unresponsiveServer = failedServer, loads = [0, 0, 0], queues = [0, 0, 0], showCapacity, showLoad, showHealth, lbFailed, phoneStatus = 'ready', token = true}) => {
  const userPath: Point[] = [{x: 196, y: 264}, {x: 342, y: 264}];
  const eligible = [0, 1, 2].filter((index) => index !== failedServer);
  return (
    <>
      <HtmlWire points={userPath} active={!lbFailed} />
      {[0, 1, 2].map((index) => <HtmlWire key={index} points={serverPath(index)} active={!lbFailed && eligible.includes(index)} />)}
      {token && !lbFailed ? <Token points={[...userPath, ...serverPath(activeServer)]} progress={packetLoop(currentTime, 0.34)} label="" /> : null}
      <PhoneNode status={phoneStatus} />
      <LoadBalancerNode failed={lbFailed} active={!lbFailed} sub={showHealth ? 'routing + health' : 'choose destination'} />
      <ServerPool failedIndex={unresponsiveServer} activeIndexes={eligible} loads={loads} queues={queues} showCapacity={showCapacity} showLoad={showLoad} />
    </>
  );
};

const LoadBalancerVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const p = localProgress(beat, currentTime);

  if (n === 23) {
    const legacyPath: Point[] = [{x: 196, y: 264}, {x: 620, y: 264}, {x: 620, y: 270}, {x: 760, y: 270}];
    return (
      <ArchitectureStage>
        <BigNote active x={222} y={-6} w={936}>api.fooddash.com → legacy destination: Server B</BigNote>
        <HtmlWire points={legacyPath} />
        <Token points={legacyPath} progress={packetLoop(currentTime, 0.55)} label="300" />
        <PhoneNode />
        <ServerPool showCapacity showLoad loads={[0, 300, 0]} queues={[0, 200, 0]} failedIndex={p > 0.82 ? 1 : -1} activeIndexes={[0, 1, 2]} />
        <CardFrame x={340} y={198} w={250} h={132} active>
          <Globe size={38} /><strong style={{fontSize: 25}}>api.fooddash.com</strong><span style={{fontSize: 16, fontWeight: 900}}>points to B</span>
        </CardFrame>
      </ArchitectureStage>
    );
  }

  if (n === 24) {
    return (
      <ArchitectureStage>
        <BigNote active x={222} y={-6} w={936}>300 requests → 100 / 100 / 100</BigNote>
        <CanonicalArchitecture currentTime={currentTime} activeServer={Math.min(2, Math.floor(p * 3))} loads={[100, 100, 100]} showCapacity showLoad token={false} />
        {[0, 1, 2].map((index) => <Token key={index} points={serverPath(index)} progress={reveal(p, 0.18 + index * 0.08, 0.7)} label="100" />)}
      </ArchitectureStage>
    );
  }

  if (n === 25 || n === 26) {
    return (
      <ArchitectureStage>
        <BigNote active x={218} y={-6} w={944}>{n === 25 ? 'Horizontal scaling = add machines' : 'A server fleet needs a routing mechanism'}</BigNote>
        <DoodleAtlasCell cell={6} x={116} y={106} w={790} h={362} active />
        <MetricCard x={982} y={136} label="Capacity" value="3 machines" icon={Layers3} active />
        <MetricCard x={982} y={280} label="Routing" value={n === 25 ? 'load balancer' : 'required'} icon={GitBranch} active={n === 26} />
        <div style={{position: 'absolute', left: 1010, top: 420, width: 240, color: '#ffffff', fontSize: 20, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase'}}>Scale out, not up</div>
      </ArchitectureStage>
    );
  }

  if (n >= 27) {
    return (
      <ArchitectureStage>
        <BigNote active x={258} y={-6} w={864}>{n === 27 ? 'How does the traffic controller choose?' : 'Many policies · start with the simplest'}</BigNote>
        <LoadBalancerNode x={570} y={185} label="Load Balancer" sub="policy slot" active />
        <Token points={[{x: 330, y: 251}, {x: 570, y: 251}]} progress={1} label="101" />
        {[0, 1, 2].map((index) => (
          <CardFrame key={index} x={140 + index * 390} y={360} w={280} h={92} active={n === 28 && index === 1} muted={n === 28 && index !== 1}>
            <GitBranch size={28} /><strong style={{fontSize: 22}}>{n === 28 ? index === 1 ? 'Simplest policy' : 'Other policy' : `Server ${String.fromCharCode(65 + index)}?`}</strong>
          </CardFrame>
        ))}
      </ArchitectureStage>
    );
  }

  const genericOrder = [1, 0, 2];
  const active = n === 22 ? genericOrder[Math.min(2, Math.floor(p * 3))] : n === 21 ? 1 : n === 25 ? Math.floor(currentTime * 0.5) % 3 : 0;
  const loads = n === 22 ? genericOrder.map((_, index) => index <= Math.floor(p * 3) ? 32 : 0) : n >= 25 ? [34, 34, 34] : [0, 0, 0];

  return (
    <ArchitectureStage>
      <BigNote active={n === 21 || n === 26} x={218} y={-6} w={944}>
        {n === 21 ? 'The intelligent front door enters the picture' : n === 22 ? 'Intercept → choose → forward' : n === 25 ? 'Horizontal scaling = add machines' : 'A server fleet needs a routing mechanism'}
      </BigNote>
      <CanonicalArchitecture currentTime={currentTime} activeServer={active} loads={loads} showCapacity={n >= 25} showLoad={n >= 22} token={n !== 21 || p > 0.35} />
      {n === 21 ? <div style={{position: 'absolute', left: 330, top: 350, width: 230, textAlign: 'center', color: '#ffffff', fontSize: 18, fontWeight: 950, textTransform: 'uppercase'}}>intelligent front door</div> : null}
      {n === 26 ? <MetricCard x={1160} y={210} label="Fleet" value="needs routing" icon={GitBranch} active /> : null}
    </ArchitectureStage>
  );
};

const RoundRobinVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const p = localProgress(beat, currentTime);
  const requestIndex = n === 29 ? Math.min(2, Math.floor(p * 3)) : n === 30 ? 3 + Math.min(2, Math.floor(p * 3)) : 5;
  const active = requestIndex % 3;
  const counts = n === 29 ? [active >= 0 ? 1 : 0, active >= 1 ? 1 : 0, active >= 2 ? 1 : 0] : [2, 2, 2];
  return (
    <ArchitectureStage>
      <BigNote active x={240} y={-6} w={900}>{n === 29 ? 'Round robin: one request, one step' : n === 30 ? 'A → B → C → repeat' : 'Modern balancers add health state'}</BigNote>
      <CanonicalArchitecture currentTime={currentTime} activeServer={active} loads={counts.map((c) => c * 24)} showLoad showHealth={n === 31} />
      <CardFrame x={342} y={360} w={204} h={98} active>
        <RefreshCw size={30} /><strong style={{fontSize: 24}}>#{requestIndex + 1} → {String.fromCharCode(65 + active)}</strong>
      </CardFrame>
      <div style={{position: 'absolute', left: 744, top: 476, width: 430, display: 'flex', gap: 12}}>
        {['A', 'B', 'C'].map((label, index) => (
          <span key={label} style={{flex: 1, padding: '10px', border: `3px solid ${index === active ? '#ffffff' : 'rgba(255,255,255,0.3)'}`, borderRadius: 6, background: index === active ? '#ffffff' : '#050505', color: index === active ? '#000000' : '#ffffff', textAlign: 'center', fontSize: 20, fontWeight: 950}}>{label}</span>
        ))}
      </div>
    </ArchitectureStage>
  );
};

const HealthRoutingVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const p = localProgress(beat, currentTime);
  const crashed = n >= 34;
  const detected = n >= 35;
  const rerouted = n >= 36;
  const failedIndex = detected ? 1 : -1;
  const active = rerouted ? (Math.floor(currentTime * 0.55) % 2 === 0 ? 0 : 2) : 1;
  const healthPath = serverPath(1);

  if (n === 37 || n === 38) {
    const stages: Array<[string, string, IconType]> = [
      ['Detect', 'B unhealthy', Activity],
      ['Decide', 'eligible: A, C', GitBranch],
      ['Reroute', 'new traffic flows', RefreshCw],
    ];
    return (
      <ArchitectureStage>
        <BigNote active x={248} y={-6} w={884}>{n === 37 ? 'Detect → decide → reroute' : 'Intelligence first. Routing action second.'}</BigNote>
        <DoodleAtlasCell cell={7} x={72} y={108} w={650} h={356} active />
        {stages.map(([label, sub, Icon], index) => (
          <MetricCard key={label} x={804} y={108 + index * 122} label={label} value={sub} icon={Icon} active={index <= Math.floor(p * 3)} />
        ))}
      </ArchitectureStage>
    );
  }

  const note = n === 32 ? 'Install health checks in the load balancer' : n === 33 ? 'Health? Ready? Keep the eligible set fresh.' : n === 34 ? 'Server B crashes · balancer still has last-known state' : n === 35 ? 'Missed probe → timeout → B unhealthy' : n === 36 ? 'Remove B from rotation · route to A and C' : 'Automatic traffic rerouting creates resilience';
  const loads = rerouted ? [52, 0, 52] : [30, crashed ? 0 : 30, 30];

  return (
    <ArchitectureStage>
      <BigNote active={n >= 35} x={220} y={-6} w={940}>{note}</BigNote>
      <CanonicalArchitecture currentTime={currentTime} activeServer={active} failedServer={failedIndex} unresponsiveServer={crashed ? 1 : -1} loads={loads} showLoad showHealth phoneStatus={n >= 36 ? 'success' : 'ready'} />
      {n >= 32 && n <= 35 ? <Token points={healthPath} progress={n === 35 ? Math.min(1, p * 1.6) : packetLoop(currentTime, 0.24)} kind="health" muted={crashed} /> : null}
      <CardFrame x={1168} y={190} w={180} h={160} active={detected}>
        <Activity size={38} />
        <strong style={{fontSize: 22}}>Eligible</strong>
        <span style={{fontSize: 24, fontWeight: 950}}>{detected ? '{A, C}' : '{A, B, C}'}</span>
        <span style={{fontSize: 14, fontWeight: 900, opacity: 0.68}}>{n === 34 ? 'B ready · last known' : n === 35 && p < 0.5 ? 'waiting for timeout' : 'routing set'}</span>
      </CardFrame>
      {n === 35 ? <div style={{position: 'absolute', left: 655, top: 214, width: 94, height: 94, border: `${Math.max(2, p * 7)}px solid #ffffff`, borderRadius: 999, opacity: 0.8}} /> : null}
      {n === 39 ? <BigNote x={400} y={476} w={580} active>No human intervention</BigNote> : null}
    </ArchitectureStage>
  );
};

const LoadBalancerSpofVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const p = localProgress(beat, currentTime);
  const lbFailed = n >= 42 && n <= 44;
  const pair = n >= 45;
  const promoted = n === 47;

  if (!pair) {
    return (
      <ArchitectureStage>
        <BigNote active={n >= 43} x={220} y={-6} w={940}>
          {n === 40 ? 'All traffic · one front door' : n === 41 ? 'What if the load balancer fails?' : n === 42 ? 'Healthy servers ≠ reachable service' : n === 43 ? 'SPOF — single point of failure' : 'Load balancing is good. One load balancer is risky.'}
        </BigNote>
        <CanonicalArchitecture currentTime={currentTime} lbFailed={lbFailed} showCapacity showLoad loads={lbFailed ? [0, 0, 0] : [34, 34, 34]} phoneStatus={lbFailed ? 'failed' : 'ready'} token={!lbFailed} />
        {n === 41 ? <div style={{position: 'absolute', left: 310, top: 164, width: 270, height: 210, border: '5px solid #ffffff', borderRadius: 999, opacity: 0.74}} /> : null}
        {n === 43 ? <div style={{position: 'absolute', left: 300, top: 154, width: 286, height: 230, border: '5px dashed #ffffff', borderRadius: 8}} /> : null}
        {n === 44 ? (
          <>
            <HtmlWire points={[{x: 444, y: 330}, {x: 444, y: 372}]} active={false} />
            <CardFrame x={342} y={372} w={204} h={112} muted>
              <GitBranch size={34} />
              <strong style={{fontSize: 23}}>Backup LB</strong>
              <span style={{fontSize: 15, fontWeight: 900}}>not deployed</span>
            </CardFrame>
          </>
        ) : null}
      </ArchitectureStage>
    );
  }

  if (n === 45) {
    return (
      <ArchitectureStage>
        <BigNote active x={222} y={-6} w={936}>Duplicate the critical routing component</BigNote>
        <DoodleAtlasCell cell={8} x={170} y={106} w={760} h={366} active />
        <MetricCard x={986} y={138} label="Primary" value="failed" />
        <MetricCard x={986} y={286} label="Backup" value="takes over" active={p > 0.38} />
      </ArchitectureStage>
    );
  }

  const primaryY = 136;
  const backupY = 330;
  const inputToPrimary: Point[] = [{x: 196, y: 264}, {x: 286, y: 264}, {x: 286, y: primaryY + 62}, {x: 382, y: primaryY + 62}];
  const inputToBackup: Point[] = [{x: 196, y: 264}, {x: 286, y: 264}, {x: 286, y: backupY + 62}, {x: 382, y: backupY + 62}];
  const activePath = promoted ? inputToBackup : inputToPrimary;
  const activeOutputY = promoted ? backupY + 66 : primaryY + 66;
  return (
    <ArchitectureStage>
      <BigNote active x={222} y={-6} w={936}>{n === 45 ? 'Duplicate the critical routing component' : n === 46 ? 'Primary + synchronized standby' : 'Primary failed · backup promoted · traffic continues'}</BigNote>
      {!promoted ? <HtmlWire points={inputToPrimary} active /> : null}
      <HtmlWire points={inputToBackup} active={promoted || n >= 46} />
      <Token points={activePath} progress={packetLoop(currentTime, 0.38)} label="" />
      <PhoneNode status={promoted ? 'success' : 'ready'} />
      <LoadBalancerNode x={382} y={primaryY} label="Primary LB" sub={promoted ? 'failed' : 'active'} active={!promoted} failed={promoted} />
      <LoadBalancerNode x={382} y={backupY} label={promoted ? 'Active LB' : 'Backup LB'} sub={n === 45 ? 'copying' : promoted ? 'promoted' : 'synchronized'} active={promoted || n >= 46} muted={n === 45 && p < 0.55} />
      {n === 46 ? <HtmlWire points={[{x: 586, y: primaryY + 66}, {x: 650, y: primaryY + 66}, {x: 650, y: backupY + 66}, {x: 586, y: backupY + 66}]} active /> : null}
      <ServerPool showCapacity showLoad loads={[34, 34, 34]} />
      {[0, 1, 2].map((index) => (
        <HtmlWire
          key={index}
          points={[{x: 586, y: activeOutputY}, {x: 650, y: activeOutputY}, {x: 650, y: SERVER_Y[index] + 52}, {x: 760, y: SERVER_Y[index] + 52}]}
          active
        />
      ))}
    </ArchitectureStage>
  );
};

const RecapVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const p = localProgress(beat, currentTime);
  const activeIndex = n === 48 ? Math.floor(p * 2) : n === 49 ? 2 : n === 50 ? 4 : 4;
  const states: Array<[string, IconType]> = [
    ['One server', Server],
    ['Server pool', Layers3],
    ['Load balancer', GitBranch],
    ['Health-aware', Activity],
    ['Redundant LBs', RefreshCw],
  ];
  return (
    <ArchitectureStage>
      <BigNote active x={228} y={-6} w={924}>{n === 48 ? 'Architecture evolution' : n === 49 ? 'Capacity creates a routing requirement' : n === 50 ? 'Health intelligence + routing redundancy' : 'Scalable and resilient—but policy goes deeper'}</BigNote>
      <div style={{position: 'absolute', left: 54, right: 54, top: 166, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18}}>
        {states.map(([label, Icon], index) => (
          <CardFrame key={label} h={188} active={index <= activeIndex} muted={index > activeIndex}>
            <Icon size={44} /><strong style={{fontSize: 24}}>{label}</strong><span style={{fontSize: 15, fontWeight: 900}}>{index === 0 ? 'overloaded' : index === 1 ? 'capacity' : index === 2 ? 'direction' : index === 3 ? 'avoid failure' : 'front-door failover'}</span>
          </CardFrame>
        ))}
      </div>
      <div style={{position: 'absolute', left: 112, right: 112, top: 402, height: 16, border: '3px solid rgba(255,255,255,0.42)', borderRadius: 999, padding: 3}}>
        <div style={{width: `${(activeIndex + 1) * 20}%`, height: '100%', background: '#ffffff', borderRadius: 999}} />
      </div>
      {n === 51 ? <BigNote x={380} y={440} w={620}>How should the balancer choose?</BigNote> : null}
    </ArchitectureStage>
  );
};

const ClosingFrame = () => (
  <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 26, color: '#ffffff'}}>
    <div style={{width: 'min(950px, 50%)'}}>
      <h2 style={{margin: '0 0 58px', color: '#ffffff', fontSize: 78, fontWeight: 950, lineHeight: 0.94}}>Thanks for Watching!</h2>
      <p style={{margin: '0 0 16px', color: '#ffffff', fontSize: 38, fontWeight: 900, lineHeight: 1.24}}>Please like &amp; Subscribe to Engineering Systems</p>
      <p style={{margin: '0 0 16px', color: '#ffffff', fontSize: 38, fontWeight: 900, lineHeight: 1.24}}>(it motivates us to create more such content)</p>
      <p style={{margin: 0, color: '#ffffff', fontSize: 38, fontWeight: 900, lineHeight: 1.24}}>for more such System Design Deep Dives</p>
      <div style={{display: 'flex', alignItems: 'center', gap: 28, marginTop: 56}}>
        <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 16, minWidth: 360, height: 82, border: '3px solid rgba(255,255,255,0.22)', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: '#ffffff', fontSize: 34, fontWeight: 850}}>
          <Bell size={36} /> Subscribed
        </span>
        <span style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 86, height: 86, border: '3px solid #ffffff', borderRadius: 999, background: 'rgba(0,0,0,0.82)', color: '#ffffff'}}>
          <ThumbsUp size={36} />
        </span>
      </div>
    </div>
  </div>
);

const AdvancedVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const p = localProgress(beat, currentTime);
  if (n === 55 || (n === 54 && p > 0.58)) {
    return <ClosingFrame />;
  }

  const latency = ['90 ms', '180 ms', '1.8 s'];
  const load = n === 52 ? [28, 44, 94] : [34, 34, 34];
  return (
    <ArchitectureStage>
      <BigNote active x={230} y={-6} w={920}>{n === 52 ? 'Equal turns · unequal capacity and work' : n === 53 ? 'Equal is not always fair' : 'Next: advanced routing policy'}</BigNote>
      <LoadBalancerNode x={330} y={190} sub="round robin?" />
      <ServerPool loads={load} showLoad showCapacity subs={n === 52 ? ['16 CPU · fast', '4 CPU · normal', 'busy · complex query'] : latency} />
      {[0, 1, 2].map((index) => <HtmlWire key={index} points={serverPath(index, 534)} active={index !== 2 || n !== 52} />)}
      <div style={{position: 'absolute', left: 54, top: 174, width: 214, display: 'grid', gap: 14}}>
        {(n === 54 ? ['Capacity', 'Active load', 'Latency'] : ['10 requests', '10 requests', '10 requests']).map((label) => (
          <div key={label} style={{padding: '12px 14px', border: '3px solid rgba(255,255,255,0.56)', borderRadius: 6, color: '#ffffff', fontSize: 18, fontWeight: 950, textTransform: 'uppercase'}}>{label}</div>
        ))}
      </div>
    </ArchitectureStage>
  );
};

export const LoadBalancingVisual: React.FC<LoadBalancingVisualProps> = ({beat, currentTime}) => {
  const n = beatNumber(beat);

  if (n <= 3) return <OpeningArchitecture beat={beat} currentTime={currentTime} />;
  if (n <= 8) return <GrowthVisual beat={beat} currentTime={currentTime} />;
  if (n <= 13) return <VerticalScalingVisual beat={beat} currentTime={currentTime} />;
  if (n <= 20) return <HorizontalPivotVisual beat={beat} currentTime={currentTime} />;
  if (n <= 28) return <LoadBalancerVisual beat={beat} currentTime={currentTime} />;
  if (n <= 31) return <RoundRobinVisual beat={beat} currentTime={currentTime} />;
  if (n <= 39) return <HealthRoutingVisual beat={beat} currentTime={currentTime} />;
  if (n <= 47) return <LoadBalancerSpofVisual beat={beat} currentTime={currentTime} />;
  if (n <= 51) return <RecapVisual beat={beat} currentTime={currentTime} />;
  return <AdvancedVisual beat={beat} currentTime={currentTime} />;
};
