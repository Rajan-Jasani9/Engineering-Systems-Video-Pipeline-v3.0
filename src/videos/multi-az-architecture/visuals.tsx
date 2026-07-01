import React from 'react';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Cloud,
  Database,
  GitBranch,
  Globe,
  Network,
  Route,
  Server,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  XCircle,
  Zap,
} from 'lucide-react';
import type {LessonBeat} from '../../types';

type Props = {beat: LessonBeat; currentTime: number; frame: number; fps: number};
type IconType = React.ComponentType<{size?: number; strokeWidth?: number; style?: React.CSSProperties}>;
type Point = {x: number; y: number};
type Camera = {x: number; y: number; scale: number};
type ServerKey = 'A' | 'B' | 'C';

const W = 1500;
const H = 820;
const BODY_TOP = 148;
const BODY_H = 642;
const WORLD_W = 1700;
const WORLD_H = 650;

const beatNumber = (beat: LessonBeat) => Number.parseInt(beat.id.replace('maz-', ''), 10) || 0;
const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
const span = (time: number, start: number, end: number) => smooth(clamp((time - start) / Math.max(end - start, 0.001)));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;
const mixCamera = (from: Camera, to: Camera, amount: number): Camera => ({
  x: lerp(from.x, to.x, amount),
  y: lerp(from.y, to.y, amount),
  scale: lerp(from.scale, to.scale, amount),
});

const cameraFromKeys = (time: number, keys: Array<{time: number; camera: Camera}>): Camera => {
  if (time <= keys[0].time) return keys[0].camera;
  for (let index = 1; index < keys.length; index += 1) {
    const previous = keys[index - 1];
    const next = keys[index];
    if (time <= next.time) {
      return mixCamera(previous.camera, next.camera, span(time, previous.time, next.time));
    }
  }
  return keys[keys.length - 1].camera;
};

const fitTitle = (text: string, base: number, min: number) => {
  if (text.length > 46) return min;
  if (text.length > 36) return Math.max(min, base - 7);
  if (text.length > 28) return Math.max(min, base - 4);
  return base;
};

const panel: React.CSSProperties = {
  border: '3px solid #fff',
  borderRadius: 8,
  background: 'rgba(0,0,0,0.9)',
  color: '#fff',
  boxShadow: '8px 8px 0 rgba(255,255,255,0.08)',
};

const Blueprint = ({opacity = 0.08}: {opacity?: number}) => (
  <div style={{position: 'absolute', inset: 0, opacity, pointerEvents: 'none'}}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)',
        backgroundSize: '52px 52px',
      }}
    />
    <svg viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
      <path d="M40 230 C250 120 310 340 520 250 S820 70 1000 250 S1250 450 1460 250" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="12 14" />
      <path d="M120 650 C330 520 520 710 730 560 S1040 410 1260 570 S1390 670 1500 600" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="10 18" />
      <rect x="1010" y="186" width="260" height="130" rx="8" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="10 10" />
      <rect x="92" y="452" width="190" height="130" rx="8" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="10 10" />
      <text x="1320" y="230" fill="#fff" fontSize="18" fontWeight="850">IDEMPOTENT</text>
      <text x="220" y="602" fill="#fff" fontSize="18" fontWeight="850">RETRY</text>
      <text x="516" y="548" fill="#fff" fontSize="18" fontWeight="850">WORKER</text>
      <text x="84" y="656" fill="#fff" fontSize="18" fontWeight="850">CACHE</text>
    </svg>
  </div>
);

const Shell = ({
  beat,
  icon: Icon,
  children,
  faintBlueprint = 0.07,
}: {
  beat: LessonBeat;
  chapter: string;
  icon: IconType;
  children: React.ReactNode;
  faintBlueprint?: number;
}) => (
  <div style={{position: 'relative', width: W, height: H, color: '#fff', overflow: 'hidden'}}>
    <Blueprint opacity={faintBlueprint} />
    <div style={{position: 'absolute', left: 58, right: 58, top: 44, height: 60, display: 'grid', gridTemplateColumns: '54px 1fr', gap: 16, alignItems: 'center'}}>
      <div style={{width: 54, height: 54, borderRadius: 8, background: '#fff', color: '#000', display: 'grid', placeItems: 'center'}}>
        <Icon size={31} strokeWidth={3} />
      </div>
      <div style={{minWidth: 0}}>
        <div style={{fontSize: fitTitle(beat.title, 35, 25), fontWeight: 930, lineHeight: 0.95, textTransform: 'uppercase', overflowWrap: 'break-word'}}>{beat.title}</div>
        <div style={{marginTop: 5, fontSize: fitTitle(beat.subtitle, 17, 13), fontWeight: 780, lineHeight: 1.05, opacity: 0.68, textTransform: 'uppercase', overflowWrap: 'break-word'}}>{beat.subtitle}</div>
      </div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: BODY_TOP, height: BODY_H}}>{children}</div>
  </div>
);

const CameraFrame = ({camera, children}: {camera: Camera; children: React.ReactNode}) => (
  <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: WORLD_W,
        height: WORLD_H,
        transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`,
        transformOrigin: '0 0',
      }}
    >
      {children}
    </div>
  </div>
);

const Node = ({
  x,
  y,
  w = 168,
  h = 104,
  icon: Icon,
  title,
  note,
  active,
  muted,
  failed,
  opacity = 1,
  scale = 1,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  icon: IconType;
  title: string;
  note?: string;
  active?: boolean;
  muted?: boolean;
  failed?: boolean;
  opacity?: number;
  scale?: number;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      border: `3px ${failed ? 'dashed' : 'solid'} ${failed || muted ? 'rgba(255,255,255,0.48)' : '#fff'}`,
      borderRadius: 8,
      background: active ? '#fff' : '#050505',
      color: active ? '#000' : '#fff',
      display: 'grid',
      gridTemplateRows: note ? '30px auto 16px' : '34px auto',
      alignItems: 'center',
      justifyItems: 'center',
      gap: 4,
      padding: 12,
      opacity: muted ? Math.min(opacity, 0.45) : opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      textAlign: 'center',
      textTransform: 'uppercase',
      boxShadow: active ? '8px 8px 0 rgba(255,255,255,0.13)' : '6px 6px 0 rgba(255,255,255,0.06)',
      zIndex: 8,
    }}
  >
    <Icon size={30} strokeWidth={3} />
    <strong style={{fontSize: title.length > 16 ? 18 : 23, fontWeight: 850, lineHeight: 0.98}}>{title}</strong>
    {note ? <span style={{fontSize: 11, fontWeight: 760, lineHeight: 1, opacity: 0.72}}>{note}</span> : null}
    {failed ? <div style={{position: 'absolute', left: 12, right: 12, top: '50%', height: 3, background: '#fff', transform: 'rotate(-13deg)', opacity: 0.9}} /> : null}
  </div>
);

const Boundary = ({
  x,
  y,
  w,
  h,
  label,
  dashed,
  outage,
  opacity = 1,
  progress = 1,
  labelX = 16,
  labelY = -18,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  dashed?: boolean;
  outage?: boolean;
  opacity?: number;
  progress?: number;
  labelX?: number;
  labelY?: number;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      opacity,
      transform: `scale(${0.985 + 0.015 * progress})`,
      transformOrigin: 'center',
      border: `3px ${dashed || outage ? 'dashed' : 'solid'} ${outage ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.92)'}`,
      borderRadius: 10,
      background: outage ? 'rgba(0,0,0,0.58)' : 'rgba(0,0,0,0.24)',
      zIndex: 1,
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: labelX,
        top: labelY,
        padding: '6px 11px',
        border: '2px solid rgba(255,255,255,0.82)',
        borderRadius: 6,
        background: '#050505',
        color: '#fff',
        fontSize: 13,
        fontWeight: 760,
        lineHeight: 1,
        textTransform: 'uppercase',
        boxShadow: '0 0 0 4px rgba(0,0,0,0.78)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </div>
  </div>
);

const Segment = ({x, y, w, h, progress = 1, muted}: {x: number; y: number; w: number; h: number; progress?: number; muted?: boolean}) => {
  const horizontal = w >= h;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: horizontal ? Math.max(0, w * clamp(progress)) : w,
        height: horizontal ? h : Math.max(0, h * clamp(progress)),
        borderRadius: 99,
        background: '#fff',
        opacity: muted ? 0.28 : 0.92,
        zIndex: 4,
      }}
    />
  );
};

const Ortho = ({from, to, progress = 1, muted}: {from: Point; to: Point; progress?: number; muted?: boolean}) => {
  const midX = Math.round((from.x + to.x) / 2);
  const p1 = clamp(progress * 3);
  const p2 = clamp(progress * 3 - 1);
  const p3 = clamp(progress * 3 - 2);
  return (
    <>
      <Segment x={Math.min(from.x, midX)} y={from.y - 2} w={Math.abs(midX - from.x)} h={5} progress={p1} muted={muted} />
      <Segment x={midX - 2} y={Math.min(from.y, to.y)} w={5} h={Math.abs(to.y - from.y)} progress={p2} muted={muted} />
      <Segment x={Math.min(midX, to.x)} y={to.y - 2} w={Math.abs(to.x - midX)} h={5} progress={p3} muted={muted} />
    </>
  );
};

const pathPosition = (points: Point[], amount: number): Point => {
  const lengths = points.slice(1).map((point, index) => {
    const from = points[index];
    return {from, to: point, length: Math.hypot(point.x - from.x, point.y - from.y)};
  });
  const total = lengths.reduce((sum, segment) => sum + segment.length, 0) || 1;
  let remaining = clamp(amount) * total;
  for (const segment of lengths) {
    if (remaining <= segment.length) {
      const p = segment.length === 0 ? 0 : remaining / segment.length;
      return {x: lerp(segment.from.x, segment.to.x, p), y: lerp(segment.from.y, segment.to.y, p)};
    }
    remaining -= segment.length;
  }
  return points[points.length - 1];
};

const Packet = ({points, currentTime, start, duration = 1.45, hollow, muted}: {points: Point[]; currentTime: number; start: number; duration?: number; hollow?: boolean; muted?: boolean}) => {
  const p = (currentTime - start) / duration;
  if (p < 0 || p > 1) return null;
  const position = pathPosition(points, p);
  return (
    <div
      style={{
        position: 'absolute',
        left: position.x - 8,
        top: position.y - 8,
        width: 16,
        height: 16,
        border: '3px solid #fff',
        borderRadius: hollow ? 999 : 5,
        background: hollow ? '#050505' : '#fff',
        opacity: muted ? 0.36 : 1,
        boxShadow: '0 0 0 3px #000',
        zIndex: 12,
      }}
    />
  );
};

const Badge = ({x, y, children, active, muted, w}: {x: number; y: number; children: React.ReactNode; active?: boolean; muted?: boolean; w?: number}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      maxWidth: w ? undefined : 360,
      border: '3px solid #fff',
      borderRadius: 8,
      background: active ? '#fff' : '#050505',
      color: active ? '#000' : '#fff',
      padding: '10px 13px',
      fontSize: 14,
      fontWeight: 780,
      lineHeight: 1.05,
      opacity: muted ? 0.5 : 1,
      textAlign: 'center',
      textTransform: 'uppercase',
      zIndex: 20,
    }}
  >
    {children}
  </div>
);

const RulePanel = ({children, x = 1038, y = 70, w = 340, active}: {children: React.ReactNode; x?: number; y?: number; w?: number; active?: boolean}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      ...panel,
      background: active ? '#fff' : 'rgba(0,0,0,0.9)',
      color: active ? '#000' : '#fff',
      padding: 20,
      textTransform: 'uppercase',
      zIndex: 30,
    }}
  >
    {children}
  </div>
);

const Incident = ({x, y, text = 'ZONE OUTAGE', sub = 'Downtime in this AZ'}: {x: number; y: number; text?: string; sub?: string}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 238,
      border: '4px solid #fff',
      borderRadius: 8,
      background: '#fff',
      color: '#000',
      padding: '13px 16px',
      display: 'grid',
      gridTemplateColumns: '35px 1fr',
      gap: 10,
      alignItems: 'center',
      boxShadow: '9px 9px 0 rgba(255,255,255,0.14)',
      zIndex: 25,
    }}
  >
    <AlertTriangle size={31} strokeWidth={3} />
    <div>
      <div style={{fontSize: 20, fontWeight: 850, lineHeight: 0.95, textTransform: 'uppercase'}}>{text}</div>
      <div style={{marginTop: 4, fontSize: 10, fontWeight: 760, lineHeight: 1, opacity: 0.72, textTransform: 'uppercase'}}>{sub}</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: -13, height: 8, border: '2px solid #fff', background: 'repeating-linear-gradient(90deg, #fff 0 12px, #000 12px 22px)'}} />
  </div>
);

const CapacityBars = ({x, y, level, label}: {x: number; y: number; level: number; label?: string}) => (
  <div style={{position: 'absolute', left: x, top: y, display: 'grid', gap: 6, justifyItems: 'center', zIndex: 18}}>
    <div style={{display: 'flex', gap: 5, alignItems: 'end'}}>
      {[0, 1, 2, 3].map((bar) => (
        <div
          key={bar}
          style={{
            width: 9,
            height: 13 + bar * 8,
            border: '2px solid #fff',
            borderRadius: 4,
            background: bar < level ? '#fff' : '#050505',
            opacity: bar < level ? 1 : 0.52,
          }}
        />
      ))}
    </div>
    {label ? <div style={{fontSize: 10, fontWeight: 820, textTransform: 'uppercase', opacity: 0.72}}>{label}</div> : null}
  </div>
);

const Rail = ({x, y, outage}: {x: number; y: number; outage?: boolean}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 116, display: 'grid', gap: 8, opacity: outage ? 0.45 : 0.78, zIndex: 9}}>
    {['Power', 'Network', 'Cooling'].map((item) => (
      <div key={item} style={{border: `2px ${outage ? 'dashed' : 'solid'} rgba(255,255,255,0.8)`, borderRadius: 6, background: '#050505', padding: '8px 6px', fontSize: 11, fontWeight: 760, lineHeight: 1, textAlign: 'center', textTransform: 'uppercase'}}>
        {item}
      </div>
    ))}
  </div>
);

const singlePositions: Record<ServerKey, {x: number; y: number}> = {
  A: {x: 895, y: 135},
  B: {x: 895, y: 280},
  C: {x: 895, y: 425},
};

const multiPositions: Record<ServerKey, {x: number; y: number}> = {
  A: {x: 622, y: 292},
  B: {x: 922, y: 292},
  C: {x: 1222, y: 292},
};

const zonePositions: Record<ServerKey, {x: number; y: number; w: number; h: number; label: string}> = {
  A: {x: 574, y: 138, w: 248, h: 410, label: 'Availability Zone A'},
  B: {x: 874, y: 138, w: 248, h: 410, label: 'Availability Zone B'},
  C: {x: 1174, y: 138, w: 248, h: 410, label: 'Availability Zone C'},
};

const getServerMorph = (key: ServerKey, time: number) => {
  if (time < 257.8) return 0;
  if (time >= 273.1) return 1;
  if (key === 'A') return span(time, 263.4, 266.1);
  if (key === 'B') return span(time, 267.1, 269.8);
  return span(time, 269.2, 272.2);
};

const cameraKeys = (time: number): Camera => cameraFromKeys(time, [
  {time: 0, camera: {x: 0, y: 0, scale: 0.92}},
  {time: 3.6, camera: {x: 0, y: 0, scale: 0.92}},
  {time: 4.5, camera: {x: -30, y: -8, scale: 0.96}},
  {time: 16.7, camera: {x: -30, y: -8, scale: 0.96}},
  {time: 18.0, camera: {x: -42, y: -20, scale: 0.98}},
  {time: 22.8, camera: {x: -42, y: -20, scale: 0.98}},
  {time: 23.6, camera: {x: -50, y: -24, scale: 1}},
  {time: 38.67, camera: {x: -50, y: -24, scale: 1}},
  {time: 40.0, camera: {x: 0, y: 0, scale: 0.92}},
  {time: 112.93, camera: {x: 0, y: 0, scale: 0.92}},
  {time: 179.8, camera: {x: 0, y: 0, scale: 0.92}},
  {time: 181.1, camera: {x: -40, y: -20, scale: 0.98}},
  {time: 208.23, camera: {x: -40, y: -20, scale: 0.98}},
  {time: 209.2, camera: {x: -28, y: -18, scale: 0.96}},
  {time: 256.6, camera: {x: -28, y: -18, scale: 0.96}},
  {time: 258.1, camera: {x: -30, y: -5, scale: 0.94}},
  {time: 273.1, camera: {x: -30, y: -5, scale: 0.94}},
  {time: 276.15, camera: {x: -104, y: -18, scale: 0.88}},
  {time: 300.45, camera: {x: -104, y: -18, scale: 0.88}},
  {time: 301.4, camera: {x: -245, y: -26, scale: 0.99}},
  {time: 315.01, camera: {x: -245, y: -26, scale: 0.99}},
  {time: 316.2, camera: {x: -104, y: -18, scale: 0.88}},
  {time: 351.95, camera: {x: -104, y: -18, scale: 0.88}},
  {time: 353.1, camera: {x: -80, y: -18, scale: 0.92}},
  {time: 365.51, camera: {x: -80, y: -18, scale: 0.92}},
  {time: 376.97, camera: {x: -104, y: -18, scale: 0.88}},
  {time: 403.73, camera: {x: -104, y: -18, scale: 0.88}},
  {time: 405.0, camera: {x: 0, y: 0, scale: 0.82}},
]);

const connectorPath = (from: Point, to: Point) => [
  from,
  {x: (from.x + to.x) / 2, y: from.y},
  {x: (from.x + to.x) / 2, y: to.y},
  to,
];

const trafficEvents: Array<{time: number; key: ServerKey}> = [
  {time: 4.2, key: 'A'},
  {time: 5.05, key: 'B'},
  {time: 5.9, key: 'C'},
  {time: 9.0, key: 'B'},
  {time: 10.0, key: 'C'},
  {time: 119.4, key: 'A'},
  {time: 121.1, key: 'B'},
  {time: 122.8, key: 'C'},
  {time: 127.1, key: 'A'},
  {time: 128.5, key: 'B'},
  {time: 129.9, key: 'C'},
  {time: 134.7, key: 'A'},
  {time: 135.85, key: 'B'},
  {time: 137.0, key: 'C'},
  {time: 138.15, key: 'A'},
  {time: 139.3, key: 'B'},
  {time: 140.45, key: 'C'},
  {time: 141.6, key: 'A'},
  {time: 142.75, key: 'B'},
  {time: 143.9, key: 'C'},
  {time: 145.05, key: 'B'},
  {time: 158.9, key: 'B'},
  {time: 160.6, key: 'C'},
  {time: 162.0, key: 'B'},
  {time: 163.15, key: 'C'},
  {time: 164.3, key: 'B'},
  {time: 165.45, key: 'C'},
  {time: 166.6, key: 'B'},
  {time: 168.6, key: 'A'},
  {time: 170.2, key: 'C'},
  {time: 171.35, key: 'A'},
  {time: 172.5, key: 'C'},
  {time: 286.3, key: 'A'},
  {time: 293.4, key: 'B'},
  {time: 297.1, key: 'C'},
  {time: 316.2, key: 'B'},
  {time: 318.0, key: 'C'},
  {time: 321.2, key: 'B'},
  {time: 323.0, key: 'C'},
  {time: 328.8, key: 'B'},
  {time: 330.4, key: 'C'},
  {time: 334.2, key: 'B'},
  {time: 335.9, key: 'C'},
  {time: 342.5, key: 'A'},
  {time: 344.0, key: 'B'},
  {time: 345.5, key: 'C'},
];

const probeEvents: Array<{time: number; key: ServerKey}> = [
  {time: 215.1, key: 'A'},
  {time: 215.7, key: 'B'},
  {time: 216.3, key: 'C'},
  {time: 310.2, key: 'A'},
  {time: 311.0, key: 'B'},
  {time: 311.8, key: 'C'},
];

const incidentPlacement = ({
  isMulti,
  isDependency,
}: {
  isMulti: boolean;
  isDependency: boolean;
}) => {
  if (isDependency) return {x: 604, y: 180, text: 'DEPENDENCY LOST', sub: 'Database lives in Zone A'};
  if (isMulti) return {x: 604, y: 180, text: 'ZONE OUTAGE', sub: 'Downtime in Zone A'};
  return {x: 1016, y: 178, text: 'ZONE OUTAGE', sub: 'Downtime in this AZ'};
};

const ArchitectureWorld = ({currentTime, focus = 'normal'}: {currentTime: number; focus?: 'normal' | 'ghost' | 'dependency' | 'summary'}) => {
  const isHook = currentTime < 38.67;
  const isRecall = currentTime >= 112.93 && currentTime < 157.09;
  const isSingle = currentTime >= 157.09 && currentTime < 208.23;
  const isFailure = (currentTime >= 23.01 && currentTime < 38.67) || (currentTime >= 208.23 && currentTime < 250.51);
  const isRedesign = currentTime >= 250.51 && currentTime < 284.51;
  const isMulti = currentTime >= 276.15 || focus === 'dependency' || focus === 'summary';
  const isDependency = focus === 'dependency';
  const ghost = focus === 'ghost';
  const opacity = ghost ? 0.13 : 1;
  const showBoundary = (currentTime >= 16.89 && currentTime < 38.67) || currentTime >= 180.47 || isDependency;
  const showSingleBoundary = showBoundary && !isMulti && !isRedesign;
  const multiOpacity = isDependency || currentTime >= 273.1 ? 1 : currentTime >= 257.8 ? span(currentTime, 257.8, 260.2) : 0;
  const singleOpacity = showSingleBoundary ? span(currentTime, 16.89, 18.5) : isRedesign ? 1 - span(currentTime, 257.8, 260.2) : 0;
  const azAOutage = isFailure || (currentTime >= 300.45 && currentTime < 341.49) || (isDependency && currentTime >= 351.95 && currentTime < 371.71);
  const allServersOut = isFailure && currentTime < 250.51;
  const serverAFailed = (currentTime >= 7.59 && currentTime < 13.35) || (currentTime >= 157.09 && currentTime < 167.25) || azAOutage;
  const serverBOverloaded = currentTime >= 167.25 && currentTime < 173.99;
  const showRegion = showBoundary || isMulti || isDependency;
  const lineBuild = currentTime < 7.59 ? span(currentTime, 0.6, 3.4) : 1;
  const user = {x: 86, y: 296, w: 156, h: 112};
  const lb = {x: 330, y: 296, w: 158, h: 112};
  const lbPoint = {x: lb.x + lb.w, y: lb.y + lb.h / 2};
  const userPoint = {x: user.x + user.w, y: user.y + user.h / 2};
  const db = {x: 624, y: 444, w: 162, h: 84};

  const servers = (['A', 'B', 'C'] as ServerKey[]).map((key) => {
    const m = isDependency || currentTime >= 276.15 ? 1 : getServerMorph(key, currentTime);
    const x = lerp(singlePositions[key].x, multiPositions[key].x, m);
    const y = lerp(singlePositions[key].y, multiPositions[key].y, m);
    const failed = allServersOut || (key === 'A' && serverAFailed);
    return {key, x, y, failed, m};
  });

  const healthyKeys = servers.filter((server) => !server.failed).map((server) => server.key);
  const camera = ghost ? {x: 15, y: 15, scale: 0.78} : cameraKeys(currentTime);
  const trafficAllowed = !allServersOut && currentTime < 208.23 || currentTime >= 276.15 || isRecall || isSingle || isHook || isDependency;

  return (
    <CameraFrame camera={camera}>
      <div style={{position: 'absolute', inset: 0, opacity}}>
        {showRegion ? <Boundary x={536} y={72} w={940} h={536} label="Mumbai Region" opacity={ghost ? 0.16 : 0.92} /> : null}
        {singleOpacity > 0.02 ? (
          <>
            <Boundary x={744} y={108} w={548} h={480} label="Availability Zone A" dashed outage={azAOutage} opacity={ghost ? 0.14 : singleOpacity} labelX={284} />
            <Rail x={1318} y={186} outage={azAOutage} />
          </>
        ) : null}
        {multiOpacity > 0.02
          ? (['A', 'B', 'C'] as ServerKey[]).map((key) => {
              const zone = zonePositions[key];
              const outage = key === 'A' && azAOutage;
              return <Boundary key={key} x={zone.x} y={zone.y} w={zone.w} h={zone.h} label={zone.label} dashed outage={outage} opacity={ghost ? 0.13 : multiOpacity} labelX={22} />;
            })
          : null}

        {(azAOutage || allServersOut) && !ghost ? (() => {
          const placement = incidentPlacement({isMulti, isDependency});
          return <Incident x={placement.x} y={placement.y} text={placement.text} sub={placement.sub} />;
        })() : null}

        <Ortho from={userPoint} to={{x: lb.x, y: lb.y + lb.h / 2}} progress={lineBuild} muted={ghost} />
        {servers.map((server) => {
          const target = {x: server.x, y: server.y + 52};
          const progress = server.failed ? 0.18 : lineBuild;
          return <Ortho key={`line-${server.key}`} from={lbPoint} to={target} progress={progress} muted={server.failed || ghost} />;
        })}

        {isDependency ? (
          <>
            <Node x={db.x} y={db.y} w={db.w} h={db.h} icon={Database} title="Database" note="Zone A only" active={!azAOutage} failed={azAOutage} muted={azAOutage} />
            {servers.map((server) => (
              <Ortho key={`data-${server.key}`} from={{x: server.x + 84, y: server.y + 104}} to={{x: db.x + db.w / 2, y: db.y}} progress={azAOutage ? 0.2 : 1} muted={azAOutage || ghost} />
            ))}
            {currentTime >= 358.81 && currentTime < 365.51 ? <Packet points={connectorPath({x: multiPositions.B.x + 84, y: multiPositions.B.y + 104}, {x: db.x + db.w / 2, y: db.y})} currentTime={currentTime} start={359.3} duration={1.6} muted /> : null}
          </>
        ) : null}

        <Node x={user.x} y={user.y} w={user.w} h={user.h} icon={ShoppingCart} title="Users" note="orders" active opacity={ghost ? 0.28 : 1} scale={currentTime < 3.73 ? 0.94 + 0.06 * span(currentTime, 0.2, 1.2) : 1} />
        <Node x={lb.x} y={lb.y} w={lb.w} h={lb.h} icon={GitBranch} title="Load Balancer" note={currentTime >= 214.67 && currentTime < 315.01 ? 'health checks' : 'front door'} active opacity={ghost ? 0.28 : 1} />
        {servers.map((server) => {
          const note = server.failed ? 'unhealthy' : server.key === 'B' && serverBOverloaded ? 'higher load' : isMulti ? `Zone ${server.key}` : `Server ${server.key}`;
          return <Node key={server.key} x={server.x} y={server.y} icon={Server} title={`Server ${server.key}`} note={note} active={!server.failed && !(server.key === 'B' && serverBOverloaded)} failed={server.failed} muted={server.failed || ghost} opacity={ghost ? 0.24 : 1} />;
        })}

        {!ghost && trafficAllowed
          ? trafficEvents.map((event) => {
              if (!healthyKeys.includes(event.key)) return null;
              const targetServer = servers.find((server) => server.key === event.key);
              if (!targetServer) return null;
              const target = {x: targetServer.x, y: targetServer.y + 52};
              return <Packet key={`${event.time}-${event.key}`} points={[userPoint, {x: lb.x, y: lb.y + lb.h / 2}, lbPoint, ...connectorPath(lbPoint, target).slice(1)]} currentTime={currentTime} start={event.time} />;
            })
          : null}

        {!ghost
          ? probeEvents.map((event) => {
              const targetServer = servers.find((server) => server.key === event.key);
              if (!targetServer) return null;
              const target = {x: targetServer.x, y: targetServer.y + 52};
              const failed = targetServer.failed;
              return <Packet key={`probe-${event.time}-${event.key}`} points={connectorPath(lbPoint, target)} currentTime={currentTime} start={event.time} duration={1.2} hollow muted={failed} />;
            })
          : null}

        {currentTime >= 321.97 && currentTime < 341.49 && !ghost ? (
          <>
            <CapacityBars x={multiPositions.B.x + 58} y={multiPositions.B.y + 124} level={4} label="higher" />
            <CapacityBars x={multiPositions.C.x + 58} y={multiPositions.C.y + 124} level={4} label="higher" />
          </>
        ) : null}
      </div>
    </CameraFrame>
  );
};

const OpeningHook = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const b = beatNumber(beat);
  return (
    <Shell beat={beat} chapter="Opening Hook" icon={AlertTriangle}>
      <ArchitectureWorld currentTime={currentTime} />
      {b <= 2 ? (
        <RulePanel x={1004} y={62} w={350}>
          <div style={{fontSize: 26, fontWeight: 900, lineHeight: 0.98}}>Build once</div>
          <div style={{marginTop: 10, fontSize: 16, fontWeight: 760, lineHeight: 1.15, opacity: 0.74}}>Users enter through one load balancer, then requests fan out to three app servers.</div>
        </RulePanel>
      ) : null}
      {b === 5 ? <Badge x={838} y={552} active>Hidden shared location</Badge> : null}
      {b >= 6 ? (
        <RulePanel x={94} y={430} w={384} active>
          <div style={{fontSize: 25, fontWeight: 900, lineHeight: 1}}>Three servers can still fail together</div>
          <div style={{marginTop: 12, fontSize: 15, fontWeight: 760, lineHeight: 1.18}}>The failure boundary is the location, not the machine.</div>
        </RulePanel>
      ) : null}
    </Shell>
  );
};

const WelcomeScene = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const build = span(currentTime, 38.67, 39.35);
  const b = beatNumber(beat);
  const cards = [
    'What is an Availability Zone?',
    'Why three servers may still fail',
    'How Multi-AZ keeps FoodDash running',
  ];
  return (
    <Shell beat={beat} chapter="Lesson Setup" icon={Cloud} faintBlueprint={0.035}>
      <ArchitectureWorld currentTime={180.8} focus="ghost" />
      <div style={{position: 'absolute', left: 222, right: 222, top: 78, textAlign: 'center', transform: `translateY(${(1 - build) * 18}px) scale(${0.98 + build * 0.02})`, opacity: build}}>
        <div style={{display: 'inline-grid', placeItems: 'center', minWidth: 640, minHeight: 54, borderRadius: 8, background: '#fff', color: '#000', boxShadow: '9px 9px 0 rgba(255,255,255,0.12)', fontSize: 22, fontWeight: 900, textTransform: 'uppercase'}}>Engineering Systems</div>
        <div style={{marginTop: 28, fontSize: 70, fontWeight: 950, lineHeight: 0.9, textTransform: 'uppercase'}}>Multi-AZ<br />Architecture</div>
        <div style={{marginTop: 14, fontSize: 24, fontWeight: 850, textTransform: 'uppercase', opacity: 0.72}}>Surviving location-level failures</div>
      </div>
      <div style={{position: 'absolute', left: 146, right: 146, bottom: 54, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22}}>
        {cards.map((card, index) => {
          const visible = span(currentTime, 39.75 + index * 0.32, 40.55 + index * 0.32);
          return (
            <div key={card} style={{...panel, minHeight: 106, padding: 18, display: 'grid', alignContent: 'center', gap: 8, opacity: visible, transform: `translateY(${(1 - visible) * 14}px)`}}>
              <div style={{fontSize: 16, fontWeight: 850, opacity: 0.56}}>0{index + 1}</div>
              <div style={{fontSize: 23, fontWeight: 900, lineHeight: 1, textTransform: 'uppercase'}}>{card}</div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
};

const InfraLane = ({icon: Icon, label, active}: {icon: IconType; label: string; active: boolean}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '30px 1fr',
      alignItems: 'center',
      gap: 10,
      border: '2px solid rgba(255,255,255,0.7)',
      borderRadius: 6,
      background: active ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)',
      padding: '7px 9px',
      opacity: active ? 1 : 0.24,
    }}
  >
    <div style={{width: 28, height: 28, borderRadius: 5, background: active ? '#fff' : '#050505', color: active ? '#000' : '#fff', display: 'grid', placeItems: 'center'}}>
      <Icon size={18} strokeWidth={3} />
    </div>
    <div style={{fontSize: 13, fontWeight: 780, lineHeight: 1, textTransform: 'uppercase'}}>{label}</div>
  </div>
);

const DataCenterBay = ({count, active}: {count: 1 | 2; active: boolean}) => (
  <div style={{display: 'grid', gridTemplateColumns: count === 1 ? '1fr' : '1fr 1fr', gap: 9, opacity: active ? 1 : 0.22}}>
    {Array.from({length: count}).map((_, index) => (
      <div
        key={index}
        style={{
          minHeight: 64,
          border: '2px solid rgba(255,255,255,0.82)',
          borderRadius: 7,
          background: active ? '#fff' : '#050505',
          color: active ? '#000' : '#fff',
          display: 'grid',
          alignContent: 'center',
          justifyItems: 'center',
          gap: 5,
          textTransform: 'uppercase',
        }}
      >
        <Building2 size={22} strokeWidth={3} />
        <div style={{fontSize: 12, fontWeight: 820, lineHeight: 1}}>DC {index + 1}</div>
      </div>
    ))}
  </div>
);

const AzInfrastructureCell = ({
  az,
  showInfra,
  showDc,
  isolate,
  dataCenters,
}: {
  az: ServerKey;
  showInfra: boolean;
  showDc: boolean;
  isolate: boolean;
  dataCenters: 1 | 2;
}) => (
  <div
    style={{
      position: 'relative',
      height: 366,
      border: '3px dashed #fff',
      borderRadius: 10,
      padding: 17,
      background: isolate ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.25)',
      boxShadow: isolate ? 'inset 0 0 0 2px rgba(255,255,255,0.08)' : 'none',
    }}
  >
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10}}>
      <div style={{fontSize: 26, fontWeight: 850, lineHeight: 1, textTransform: 'uppercase'}}>AZ {az}</div>
      {isolate ? <div style={{fontSize: 10, fontWeight: 820, lineHeight: 1, border: '2px solid #fff', borderRadius: 999, padding: '5px 8px', background: '#fff', color: '#000', textTransform: 'uppercase'}}>isolated</div> : null}
    </div>
    <div style={{height: 1, background: 'rgba(255,255,255,0.34)', margin: '16px 0 13px'}} />
    <div style={{display: 'grid', gridTemplateColumns: '1fr 8px', gap: 12, alignItems: 'stretch'}}>
      <div style={{display: 'grid', gap: 9}}>
        <InfraLane icon={Zap} label="Independent power" active={showInfra} />
        <InfraLane icon={Network} label="Network fabric" active={showInfra} />
        <InfraLane icon={Snowflake} label="Cooling loop" active={showInfra} />
      </div>
      <div style={{borderRadius: 999, border: '2px solid rgba(255,255,255,0.6)', background: showInfra ? 'repeating-linear-gradient(180deg, #fff 0 7px, #050505 7px 14px)' : '#050505', opacity: showInfra ? 0.82 : 0.18}} />
    </div>
    <div style={{marginTop: 14}}>
      <div style={{fontSize: 11, fontWeight: 760, opacity: showDc ? 0.66 : 0.18, textTransform: 'uppercase', marginBottom: 7}}>Physical data centers</div>
      <DataCenterBay count={dataCenters} active={showDc} />
    </div>
  </div>
);

const CloudScene = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const b = beatNumber(beat);
  const regions = [
    {label: 'Mumbai', x: 188, y: 146, active: true},
    {label: 'Singapore', x: 596, y: 146, active: b >= 13},
    {label: 'Northern Virginia', x: 1004, y: 146, active: b >= 13},
  ];
  const showAz = b >= 14;
  const showInfra = b >= 15;
  const showDc = b >= 16;
  return (
    <Shell beat={beat} chapter="Cloud Concept" icon={Cloud}>
      <CameraFrame camera={{x: 0, y: 0, scale: 1}}>
        <div style={{position: 'absolute', width: 1450, height: 620}}>
          {regions.map((region, index) => {
            const big = showAz && index === 0;
            const sideRegion = showAz && index > 0;
            if (sideRegion) return null;
            const left = big ? 112 : region.x;
            const top = big ? 28 : region.y;
            const width = big ? 1268 : 318;
            const height = big ? 542 : 194;
            return (
              <div key={region.label} style={{position: 'absolute', left, top, width, height, ...panel, padding: 22, opacity: region.active ? 1 : 0.28}}>
                <Cloud size={36} strokeWidth={3} />
                <div style={{marginTop: 10, fontSize: big ? 32 : 26, fontWeight: 850, lineHeight: 1, textTransform: 'uppercase'}}>{region.label} Region</div>
                {big ? (
                  <div style={{position: 'absolute', left: 34, right: 34, top: 118, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24}}>
                    {(['A', 'B', 'C'] as ServerKey[]).map((key, azIndex) => (
                      <AzInfrastructureCell key={key} az={key} showInfra={showInfra} showDc={showDc} isolate={b >= 17} dataCenters={azIndex === 1 ? 1 : 2} />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          {b === 17 ? (
            <div style={{position: 'absolute', left: 318, top: 574, width: 864, minHeight: 54, border: '3px solid #fff', borderRadius: 8, background: '#fff', color: '#000', display: 'grid', gridTemplateColumns: '180px 1fr', alignItems: 'center', gap: 18, padding: '10px 18px', textTransform: 'uppercase', boxShadow: '8px 8px 0 rgba(255,255,255,0.1)', zIndex: 30}}>
              <div style={{fontSize: 28, fontWeight: 900, lineHeight: 1}}>Isolation</div>
              <div style={{fontSize: 13, fontWeight: 760, lineHeight: 1.18}}>Each AZ owns its own infrastructure stack, so one location failure is less likely to pull down another.</div>
            </div>
          ) : null}
        </div>
      </CameraFrame>
    </Shell>
  );
};

const RecallScene = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const b = beatNumber(beat);
  return (
    <Shell beat={beat} chapter="FoodDash Recall" icon={GitBranch}>
      <ArchitectureWorld currentTime={currentTime} />
      {b === 21 ? (
        <div style={{position: 'absolute', left: 1006, top: 188, width: 420, ...panel, padding: 22, display: 'grid', gap: 14, textTransform: 'uppercase'}}>
          <div style={{fontSize: 23, fontWeight: 880, lineHeight: 1}}>Routing memory</div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
            <div style={{border: '2px solid #fff', borderRadius: 6, background: '#fff', color: '#000', padding: '11px 12px', fontSize: 14, fontWeight: 820, lineHeight: 1, textAlign: 'center'}}>Algorithms</div>
            <div style={{border: '2px solid rgba(255,255,255,0.78)', borderRadius: 6, padding: '11px 12px', fontSize: 14, fontWeight: 760, lineHeight: 1, textAlign: 'center'}}>L4 / L7</div>
          </div>
          <div style={{fontSize: 14, fontWeight: 720, lineHeight: 1.18, opacity: 0.68}}>The balancer can choose targets. Now we inspect where those targets live.</div>
        </div>
      ) : null}
      {b === 22 ? (
        <RulePanel x={1138} y={336} w={326}>
          <div style={{fontSize: 25, fontWeight: 900, lineHeight: 1}}>Built in earlier episodes</div>
          <div style={{marginTop: 10, fontSize: 14, fontWeight: 760, lineHeight: 1.15, opacity: 0.72}}>Load balancing, algorithms, and layer-aware routing are already in place.</div>
        </RulePanel>
      ) : null}
    </Shell>
  );
};

const SingleAzScene = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const b = beatNumber(beat);
  return (
    <Shell beat={beat} chapter="Single-AZ Limit" icon={Network}>
      <ArchitectureWorld currentTime={currentTime} />
      {b <= 24 ? (
        <RulePanel x={1026} y={80} w={332}>
          <div style={{fontSize: 24, fontWeight: 900, lineHeight: 1}}>Server-level redundancy</div>
          <div style={{marginTop: 12, fontSize: 15, fontWeight: 760, lineHeight: 1.18, opacity: 0.75}}>A crash or overload can be absorbed by other machines.</div>
        </RulePanel>
      ) : null}
      {b >= 26 ? <Badge x={875} y={552} active={b === 28}>Single-AZ Architecture</Badge> : null}
    </Shell>
  );
};

const FailureScene = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const b = beatNumber(beat);
  return (
    <Shell beat={beat} chapter="Single-AZ Failure" icon={AlertTriangle}>
      <ArchitectureWorld currentTime={currentTime} />
      {b >= 30 ? (
        <RulePanel x={82} y={426} w={430} active>
          <div style={{fontSize: 28, fontWeight: 900, lineHeight: 0.98}}>Load balancer OK</div>
          <div style={{marginTop: 10, fontSize: 18, fontWeight: 850, lineHeight: 1.08}}>Zero healthy backends</div>
        </RulePanel>
      ) : null}
      {b >= 32 ? (
        <RulePanel x={56} y={120} w={392}>
          <div style={{fontSize: 22, fontWeight: 900, lineHeight: 1}}>Redundancy only helps across independent failure boundaries.</div>
        </RulePanel>
      ) : null}
    </Shell>
  );
};

const RedesignScene = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const b = beatNumber(beat);
  return (
    <Shell beat={beat} chapter="Redesign" icon={ShieldCheck}>
      <ArchitectureWorld currentTime={currentTime} />
      {b <= 33 ? (
        <RulePanel x={92} y={420} w={410}>
          <div style={{fontSize: 24, fontWeight: 900, lineHeight: 1}}>Same Mumbai region</div>
          <div style={{marginTop: 10, fontSize: 16, fontWeight: 760, lineHeight: 1.16, opacity: 0.75}}>The redesign changes placement inside the region.</div>
        </RulePanel>
      ) : null}
      {b >= 34 && b <= 35 ? <Badge x={632} y={560} active>Servers move into separate AZ boundaries</Badge> : null}
      {b >= 36 ? <Badge x={656} y={560} active>Multi-AZ Architecture</Badge> : null}
    </Shell>
  );
};

const MultiAzOperationScene = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const b = beatNumber(beat);
  return (
    <Shell beat={beat} chapter="Multi-AZ Operation" icon={Route}>
      <ArchitectureWorld currentTime={currentTime} />
      {b <= 38 ? (
        <RulePanel x={980} y={74} w={338}>
          <div style={{fontSize: 25, fontWeight: 900, lineHeight: 1}}>Normal operation</div>
          <div style={{marginTop: 10, fontSize: 15, fontWeight: 760, lineHeight: 1.15, opacity: 0.74}}>Requests can land in Zone A, Zone B, or Zone C.</div>
        </RulePanel>
      ) : null}
      {b >= 40 ? <Badge x={248} y={555} active>Rotation: {b >= 41 ? 'Zone B / Zone C' : 'checking backends'}</Badge> : null}
      {b >= 42 ? (
        <RulePanel x={990} y={422} w={350} active>
          <div style={{fontSize: 26, fontWeight: 900, lineHeight: 1}}>Degraded, not down</div>
          <div style={{marginTop: 10, fontSize: 15, fontWeight: 760, lineHeight: 1.15}}>Capacity is lower, but the service continues.</div>
        </RulePanel>
      ) : null}
    </Shell>
  );
};

const DependencyExamplesBoard = ({currentTime}: {currentTime: number}) => {
  const examples: Array<{title: string; icon: IconType; start: number}> = [
    {title: 'Database', icon: Database, start: 365.65},
    {title: 'Cache', icon: Zap, start: 366.8},
    {title: 'Message Broker', icon: Network, start: 368.1},
    {title: 'Queue', icon: GitBranch, start: 369.25},
    {title: 'Storage', icon: Database, start: 370.25},
  ];

  return (
    <>
      <ArchitectureWorld currentTime={376} focus="ghost" />
      <div style={{position: 'absolute', left: 76, right: 76, top: 112, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18}}>
        {examples.map((item) => {
          const enter = span(currentTime, item.start, item.start + 0.45);
          const active = currentTime >= item.start;
          return (
            <div
              key={item.title}
              style={{
                ...panel,
                minHeight: 146,
                padding: 18,
                display: 'grid',
                alignContent: 'center',
                justifyItems: 'center',
                gap: 10,
                textAlign: 'center',
                opacity: active ? 0.5 + enter * 0.5 : 0.14,
                transform: `translateY(${(1 - enter) * 18}px) scale(${0.95 + enter * 0.05})`,
                textTransform: 'uppercase',
              }}
            >
              {React.createElement(item.icon, {size: 38, strokeWidth: 3})}
              <div style={{fontSize: item.title.length > 12 ? 21 : 27, fontWeight: 880, lineHeight: 1}}>{item.title}</div>
              <div style={{fontSize: 12, fontWeight: 740, lineHeight: 1, opacity: 0.62}}>Critical path</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 326, right: 326, top: 338, border: '3px solid #fff', borderRadius: 8, background: '#fff', color: '#000', padding: '16px 20px', display: 'grid', gridTemplateColumns: '190px 1fr', gap: 16, alignItems: 'center', textTransform: 'uppercase', boxShadow: '8px 8px 0 rgba(255,255,255,0.1)'}}>
        <div style={{fontSize: 25, fontWeight: 900, lineHeight: 1}}>Same rule</div>
        <div style={{fontSize: 14, fontWeight: 760, lineHeight: 1.15}}>Every required dependency has its own failure boundary.</div>
      </div>
    </>
  );
};

const CompletePathBridge = () => (
  <>
    <ArchitectureWorld currentTime={376} focus="ghost" />
    <div style={{position: 'absolute', left: 238, right: 238, top: 136, ...panel, padding: 26, minHeight: 236, display: 'grid', alignContent: 'center', gap: 20, textTransform: 'uppercase'}}>
      <div style={{fontSize: 36, fontWeight: 900, lineHeight: 0.96}}>Availability is end to end</div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12}}>
        {['User request', 'App server', 'External dependencies', 'Response'].map((label) => (
          <div key={label} style={{border: '2px solid #fff', borderRadius: 7, background: '#050505', color: '#fff', padding: '14px 10px', minHeight: 70, display: 'grid', placeItems: 'center', fontSize: label.length > 16 ? 12 : 14, fontWeight: 820, lineHeight: 1, textAlign: 'center'}}>
            {label}
          </div>
        ))}
      </div>
      <div style={{fontSize: 15, fontWeight: 760, opacity: 0.68}}>The system is only available if the whole request path can work.</div>
    </div>
  </>
);

const DependencyScene = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const b = beatNumber(beat);
  const requirementItems: Array<{title: string; sub: string; icon: IconType; detail: string}> = [
    {title: 'App servers', sub: 'distributed', icon: Server, detail: 'Compute must span AZ boundaries'},
    {title: 'Data', sub: 'replicated', icon: Database, detail: 'State must exist outside one zone'},
    {title: 'Dependencies', sub: 'fail over', icon: Network, detail: 'Cache, broker, and storage need recovery paths'},
    {title: 'Health checks', sub: 'full path', icon: CheckCircle2, detail: 'Healthy means the complete request can work'},
  ];
  const requirementStarts = [376.97, 380.05, 383.2, 386.77];
  const activeIndex = b >= 52 ? 3 : Math.max(0, requirementStarts.reduce((latest, start, index) => (currentTime >= start ? index : latest), -1));
  return (
    <Shell beat={beat} chapter="Complete Request Path" icon={Database}>
      {b <= 47 ? (
        <>
          <ArchitectureWorld currentTime={currentTime} focus="dependency" />
          <RulePanel x={934} y={424} w={394} active={b >= 47}>
            <div style={{fontSize: 25, fontWeight: 900, lineHeight: 1}}>{b >= 47 ? 'Compute is alive. Data path is broken.' : 'One database can still be one AZ.'}</div>
          </RulePanel>
        </>
      ) : b === 48 ? (
        <DependencyExamplesBoard currentTime={currentTime} />
      ) : b === 49 ? (
        <CompletePathBridge />
      ) : (
        <>
          <ArchitectureWorld currentTime={376} focus="ghost" />
          <div style={{position: 'absolute', left: 166, right: 166, top: 82, height: 214}}>
            {requirementItems.map((item, index) => {
              const isActive = index === activeIndex;
              const itemStart = requirementStarts[index];
              const entered = index < activeIndex || b >= 52 ? 1 : isActive ? span(currentTime, itemStart, itemStart + 0.5) : 0;
              const morph = b >= 52 || index < activeIndex ? 1 : isActive ? span(currentTime, itemStart + 1.65, itemStart + 2.65) : 0;
              const x = lerp(288, 12 + index * 292, morph);
              const y = lerp(0, 224, morph);
              const width = lerp(640, 264, morph);
              const height = lerp(178, 112, morph);
              const dimmed = index < activeIndex || (isActive && morph > 0.7);
              if (entered <= 0) return null;
              return (
                <div
                  key={item.title}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    width,
                    height,
                    border: '3px solid #fff',
                    borderRadius: 8,
                    background: morph > 0.55 ? '#fff' : '#050505',
                    color: morph > 0.55 ? '#000' : '#fff',
                    padding: morph > 0.55 ? 15 : 22,
                    display: 'grid',
                    gridTemplateColumns: morph > 0.55 ? '34px 1fr' : '70px 1fr',
                    gap: morph > 0.55 ? 10 : 18,
                    alignItems: 'center',
                    opacity: dimmed ? 0.82 : entered,
                    textTransform: 'uppercase',
                    boxShadow: morph > 0.55 ? '7px 7px 0 rgba(255,255,255,0.1)' : '10px 10px 0 rgba(255,255,255,0.1)',
                    zIndex: isActive ? 22 : 14,
                  }}
                >
                  <div style={{width: morph > 0.55 ? 32 : 62, height: morph > 0.55 ? 32 : 62, borderRadius: 8, background: morph > 0.55 ? '#000' : '#fff', color: morph > 0.55 ? '#fff' : '#000', display: 'grid', placeItems: 'center'}}>
                    {React.createElement(item.icon, {size: morph > 0.55 ? 21 : 36, strokeWidth: 3})}
                  </div>
                  <div>
                    <div style={{fontSize: morph > 0.55 ? 20 : 34, fontWeight: 900, lineHeight: 0.96}}>{item.title}</div>
                    <div style={{marginTop: morph > 0.55 ? 4 : 12, fontSize: morph > 0.55 ? 12 : 17, fontWeight: 760, lineHeight: 1.12, opacity: 0.68}}>{morph > 0.55 ? item.sub : item.detail}</div>
                    {morph <= 0.55 && index === 2 ? (
                      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 18}}>
                        {['DB', 'Cache', 'Broker', 'Storage'].map((label) => (
                          <div key={label} style={{border: '2px solid rgba(255,255,255,0.72)', borderRadius: 6, padding: '8px 6px', fontSize: 12, fontWeight: 760, textAlign: 'center'}}>{label}</div>
                        ))}
                      </div>
                    ) : null}
                    {morph <= 0.55 && index === 0 ? (
                      <div style={{display: 'flex', gap: 10, marginTop: 18}}>
                        {['AZ A', 'AZ B', 'AZ C'].map((label) => (
                          <div key={label} style={{border: '2px dashed rgba(255,255,255,0.78)', borderRadius: 6, padding: '8px 12px', fontSize: 12, fontWeight: 760}}>{label}</div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          {b >= 52 ? <Badge x={496} y={514} active w={510}>Survive one AZ without losing the complete service</Badge> : null}
        </>
      )}
    </Shell>
  );
};

const SummaryScene = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const b = beatNumber(beat);
  const regional = b >= 55;
  return (
    <Shell beat={beat} chapter="Summary" icon={Globe}>
      {!regional ? (
        <>
          <ArchitectureWorld currentTime={403.8} focus="ghost" />
          <div style={{position: 'absolute', left: 108, right: 108, top: 82, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26}}>
            {[
              ['Multiple servers / one AZ', 'Protects server failure', 'Does not protect AZ failure', XCircle],
              ['Multiple AZs / one region', 'Protects location failure', 'Still one region', CheckCircle2],
            ].map(([title, good, risk, Icon]) => (
              <div key={title as string} style={{...panel, minHeight: 360, padding: 24}}>
                <div style={{fontSize: 31, fontWeight: 900, lineHeight: 1, textTransform: 'uppercase'}}>{title as string}</div>
                <div style={{display: 'grid', gap: 18, marginTop: 36}}>
                  <div style={{display: 'grid', gridTemplateColumns: '38px 1fr', gap: 12, alignItems: 'center', fontSize: 23, fontWeight: 850, lineHeight: 1, textTransform: 'uppercase'}}><CheckCircle2 size={32} strokeWidth={3} />{good as string}</div>
                  <div style={{display: 'grid', gridTemplateColumns: '38px 1fr', gap: 12, alignItems: 'center', fontSize: 23, fontWeight: 850, lineHeight: 1, textTransform: 'uppercase', opacity: 0.72}}>{React.createElement(Icon as IconType, {size: 32, strokeWidth: 3})}{risk as string}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={{position: 'absolute', left: 112, right: 112, top: 106, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24}}>
            {['Mumbai Region', 'Singapore Region', 'Northern Virginia Region'].map((region, index) => (
              <div key={region} style={{...panel, minHeight: 196, padding: 22, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 14, textAlign: 'center', opacity: b === 55 && index > 0 ? 0.35 : 1}}>
                <Globe size={48} strokeWidth={3} />
                <div style={{fontSize: 29, fontWeight: 900, lineHeight: 1, textTransform: 'uppercase'}}>{region}</div>
                <div style={{fontSize: 14, fontWeight: 780, opacity: 0.68, textTransform: 'uppercase'}}>{index === 0 ? 'current home' : 'next option'}</div>
              </div>
            ))}
          </div>
          <div style={{position: 'absolute', left: 178, right: 178, top: 370, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18}}>
            {['What if Mumbai fails?', 'Can Singapore serve traffic?', 'How do users route globally?'].map((question, index) => {
              const active = index <= Math.max(0, b - 55);
              return (
                <div key={question} style={{border: '3px solid #fff', borderRadius: 8, background: active ? '#fff' : '#050505', color: active ? '#000' : '#fff', minHeight: 108, padding: 16, display: 'grid', placeItems: 'center', fontSize: 21, fontWeight: 850, lineHeight: 1.05, textAlign: 'center', textTransform: 'uppercase'}}>
                  {question}
                </div>
              );
            })}
          </div>
        </>
      )}
    </Shell>
  );
};

export const MultiAzVisual: React.FC<Props> = ({beat, currentTime}) => {
  const b = beatNumber(beat);

  if (b <= 7) return <OpeningHook beat={beat} currentTime={currentTime} />;
  if (b <= 11) return <WelcomeScene beat={beat} currentTime={currentTime} />;
  if (b <= 17) return <CloudScene beat={beat} currentTime={currentTime} />;
  if (b <= 22) return <RecallScene beat={beat} currentTime={currentTime} />;
  if (b <= 28) return <SingleAzScene beat={beat} currentTime={currentTime} />;
  if (b <= 32) return <FailureScene beat={beat} currentTime={currentTime} />;
  if (b <= 36) return <RedesignScene beat={beat} currentTime={currentTime} />;
  if (b <= 44) return <MultiAzOperationScene beat={beat} currentTime={currentTime} />;
  if (b <= 52) return <DependencyScene beat={beat} currentTime={currentTime} />;
  return <SummaryScene beat={beat} currentTime={currentTime} />;
};
