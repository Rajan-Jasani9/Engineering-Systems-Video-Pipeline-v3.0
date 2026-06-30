import React from 'react';
import {Box, CheckCircle2, Compass, Gauge, GitBranch, Globe, HelpCircle, Layers3, Mail, Network, Route, Server, ShieldCheck, ShoppingCart, Smartphone, Store, Truck, UserCog, Zap} from 'lucide-react';
import type {LessonBeat} from '../../types';

type Props = {beat: LessonBeat; currentTime: number; frame: number; fps: number};
type IconType = React.ComponentType<{size?: number; strokeWidth?: number}>;

const beatNumber = (beat: LessonBeat) => Number(beat.id.replace('l47-', '')) || 0;

const panelStyle: React.CSSProperties = {
  border: '4px solid #ffffff',
  borderRadius: 8,
  background: 'rgba(0,0,0,0.88)',
  color: '#ffffff',
  boxShadow: '10px 10px 0 rgba(255,255,255,0.08)',
};

const Stage: React.FC<{title: string; subtitle: string; chapter: string; icon?: IconType; children: React.ReactNode}> = ({title, subtitle, chapter, icon: Icon = GitBranch, children}) => (
  <div style={{width: 'min(1500px, 100%)', height: 820, display: 'grid', gridTemplateRows: '58px 104px 1fr', gap: 18, color: '#ffffff'}}>
    <div style={{...panelStyle, display: 'grid', gridTemplateColumns: '160px 1fr 160px', alignItems: 'center', padding: '10px 28px', boxShadow: 'none', textTransform: 'uppercase'}}>
      <div style={{fontSize: 15, fontWeight: 950, opacity: 0.66}}>Chapter</div>
      <div style={{fontSize: 30, fontWeight: 950, lineHeight: 1, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden'}}>{chapter}</div>
      <div />
    </div>
    <div style={{...panelStyle, display: 'grid', gridTemplateColumns: '72px 1fr', alignItems: 'center', gap: 22, padding: '18px 28px', boxShadow: 'none'}}>
      <div style={{width: 58, height: 58, display: 'grid', placeItems: 'center', border: '3px solid #ffffff', borderRadius: 8, background: '#ffffff', color: '#000000'}}>
        <Icon size={34} strokeWidth={3} />
      </div>
      <div>
        <div style={{fontSize: title.length > 42 ? 34 : 42, fontWeight: 950, lineHeight: 0.98, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden'}}>{title}</div>
        <div style={{marginTop: 8, color: 'rgba(255,255,255,0.72)', fontSize: 20, fontWeight: 850, textTransform: 'uppercase'}}>{subtitle}</div>
      </div>
    </div>
    <div style={{minHeight: 0}}>{children}</div>
  </div>
);

const Card: React.FC<{children: React.ReactNode; active?: boolean; muted?: boolean; style?: React.CSSProperties}> = ({children, active, muted, style}) => (
  <div style={{...panelStyle, background: active ? '#ffffff' : 'rgba(0,0,0,0.88)', color: active ? '#000000' : '#ffffff', opacity: muted ? 0.38 : 1, padding: 24, ...style}}>
    {children}
  </div>
);

const Label = ({children, inverted}: {children: React.ReactNode; inverted?: boolean}) => (
  <span style={{display: 'inline-flex', border: '3px solid currentColor', borderRadius: 999, padding: '8px 14px', background: inverted ? '#ffffff' : 'transparent', color: inverted ? '#000000' : 'inherit', fontSize: 16, fontWeight: 950, textTransform: 'uppercase', whiteSpace: 'nowrap'}}>
    {children}
  </span>
);

const BigCard = ({icon: Icon, title, note, active}: {icon: IconType; title: string; note: string; active?: boolean}) => (
  <Card active={active} style={{display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 16, minHeight: 210, textAlign: 'center'}}>
    <Icon size={64} strokeWidth={3} />
    <div style={{fontSize: 36, fontWeight: 950, lineHeight: 1, textTransform: 'uppercase'}}>{title}</div>
    <div style={{fontSize: 20, fontWeight: 900, lineHeight: 1.08, textTransform: 'uppercase', opacity: 0.72}}>{note}</div>
  </Card>
);

const Canvas = ({children}: {children: React.ReactNode}) => (
  <div style={{position: 'relative', height: 610, overflow: 'hidden'}}>
    {children}
  </div>
);

const Wire = ({d, muted}: {d: string; muted?: boolean}) => (
  <path d={d} fill="none" stroke={muted ? 'rgba(255,255,255,0.32)' : '#ffffff'} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={muted ? '12 12' : undefined} />
);

const WireLayer = ({children}: {children: React.ReactNode}) => (
  <svg viewBox="0 0 1500 610" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
    {children}
  </svg>
);

const CanvasNode = ({
  x,
  y,
  w,
  h,
  icon: Icon,
  title,
  note,
  active,
  muted,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  icon: IconType;
  title: string;
  note?: string;
  active?: boolean;
  muted?: boolean;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      display: 'grid',
      alignContent: 'center',
      justifyItems: 'center',
      gap: 10,
      border: `4px solid ${muted ? 'rgba(255,255,255,0.34)' : '#ffffff'}`,
      borderRadius: 8,
      background: active ? '#ffffff' : '#050505',
      color: active ? '#000000' : '#ffffff',
      boxShadow: active ? '12px 12px 0 rgba(255,255,255,0.16)' : '8px 8px 0 rgba(255,255,255,0.06)',
      opacity: muted ? 0.52 : 1,
      textAlign: 'center',
      textTransform: 'uppercase',
      padding: 16,
    }}
  >
    <Icon size={46} strokeWidth={3} />
    <strong style={{fontSize: title.length > 22 ? 22 : title.length > 12 ? 25 : 30, fontWeight: 950, lineHeight: 1}}>{title}</strong>
    {note ? <span style={{fontSize: 16, fontWeight: 900, lineHeight: 1.05, opacity: 0.72}}>{note}</span> : null}
  </div>
);

const FloatingNote = ({children, x = 310, y = 18, w = 880}: {children: React.ReactNode; x?: number; y?: number; w?: number}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      minHeight: 62,
      display: 'grid',
      placeItems: 'center',
      border: '4px solid #ffffff',
      borderRadius: 8,
      background: '#ffffff',
      color: '#000000',
      fontSize: 30,
      fontWeight: 950,
      lineHeight: 1,
      textAlign: 'center',
      textTransform: 'uppercase',
      boxShadow: '10px 10px 0 rgba(255,255,255,0.12)',
      padding: '12px 22px',
    }}
  >
    {children}
  </div>
);

const ServiceGrid = () => (
  <Canvas>
    <WireLayer>
      <Wire d="M750 300 L250 154" />
      <Wire d="M750 300 L492 438" />
      <Wire d="M750 300 L1008 438" />
      <Wire d="M750 300 L1250 154" />
    </WireLayer>
    <FloatingNote>One product surface becomes four user journeys</FloatingNote>
    <CanvasNode x={610} y={220} w={280} h={170} icon={ShoppingCart} title="FoodDash" note="single product" active />
    <CanvasNode x={90} y={100} w={320} h={144} icon={Smartphone} title="Customer" note="main app" />
    <CanvasNode x={326} y={374} w={320} h={144} icon={Store} title="Restaurant" note="dashboard" />
    <CanvasNode x={854} y={374} w={320} h={144} icon={Truck} title="Driver" note="portal" />
    <CanvasNode x={1090} y={100} w={320} h={144} icon={UserCog} title="Admin" note="console" />
  </Canvas>
);

const RouteBoard = ({mode}: {mode: 'l4' | 'l7' | 'same'}) => {
  const paths = mode === 'l7'
    ? [['/restaurant', 'Restaurant service'], ['/driver', 'Driver platform'], ['/api/*', 'API cluster']]
    : [[':443', 'Server A'], [':443', 'Server B'], [':443', 'Server C']];

  return (
    <Canvas>
      <WireLayer>
        <Wire d="M350 300 C475 300 525 300 640 300" />
        <Wire d="M860 300 C990 160 1030 132 1128 132" muted={mode !== 'l7'} />
        <Wire d="M860 300 C990 300 1030 300 1128 300" />
        <Wire d="M860 300 C990 440 1030 468 1128 468" muted={mode === 'same'} />
      </WireLayer>
      <CanvasNode x={92} y={214} w={260} h={172} icon={Globe} title="fooddash.com" note={mode === 'same' ? 'one domain' : 'incoming request'} />
      <CanvasNode x={620} y={198} w={280} h={204} icon={GitBranch} title={mode === 'l7' ? 'Layer 7' : 'Layer 4'} note={mode === 'l7' ? 'reads request' : 'network only'} active />
      {paths.map(([path, dest], index) => (
        <React.Fragment key={`${path}-${dest}`}>
          <div style={{position: 'absolute', left: 932, top: [124, 294, 464][index], width: 170, fontSize: 28, fontWeight: 950, fontFamily: 'Courier New, monospace', color: '#ffffff'}}>
            {path}
          </div>
          <CanvasNode x={1130} y={[62, 232, 402][index]} w={280} h={132} icon={mode === 'l7' ? [Store, Truck, Server][index] : Server} title={dest} active={mode === 'l7' && index === 0} muted={mode === 'same' && index !== 1} />
        </React.Fragment>
      ))}
      <FloatingNote x={388} y={24} w={724}>{mode === 'l7' ? 'Application meaning chooses the service' : mode === 'same' ? 'Same domain is not enough information' : 'Network tuple chooses a backend server'}</FloatingNote>
    </Canvas>
  );
};

const Comparison = () => (
  <Card style={{padding: 18}}>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12}}>
      {['Question', 'Layer 4', 'Layer 7', 'Looks at', 'IP, port, TCP/UDP', 'URL, headers, cookies', 'Strength', 'Very fast', 'Very flexible', 'Best when', 'Same backend job', 'Routing by app intent'].map((text, index) => (
        <div key={`${text}-${index}`} style={{border: '3px solid #ffffff', borderRadius: 8, padding: '18px 14px', minHeight: 70, background: index < 3 ? '#ffffff' : 'transparent', color: index < 3 ? '#000000' : '#ffffff', fontSize: index < 3 ? 24 : 22, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase'}}>
          {text}
        </div>
      ))}
    </div>
  </Card>
);

const ResilienceStack = () => (
  <Canvas>
    <WireLayer>
      <Wire d="M180 306 L400 306 L620 306 L840 306 L1060 306 L1280 306" />
    </WireLayer>
    <FloatingNote>FoodDash keeps adding resilience layers</FloatingNote>
    {[
      {x: 90, title: 'Redundant servers', note: 'more capacity', icon: Server},
      {x: 342, title: 'Health checks', note: 'detect failure', icon: CheckCircle2},
      {x: 594, title: 'Auto failover', note: 'move traffic', icon: Route},
      {x: 846, title: 'Load balancing', note: 'spread requests', icon: GitBranch},
      {x: 1098, title: 'Smart routing', note: 'route by intent', icon: Mail},
    ].map((item, index) => <CanvasNode key={item.title} x={item.x} y={220} w={220} h={170} icon={item.icon} title={item.title} note={item.note} active={index === 4} />)}
  </Canvas>
);

const SeriesBridgeText = () => (
  <Canvas>
    <div style={{position: 'absolute', left: 230, right: 230, top: 94, display: 'grid', gap: 34}}>
      <div style={{fontSize: 64, fontWeight: 950, lineHeight: 0.98, textTransform: 'uppercase', color: '#ffffff'}}>
        Every episode builds on the last one.
      </div>
      <div style={{width: 760, height: 6, background: '#ffffff'}} />
      <div style={{display: 'grid', gap: 24, marginTop: 10}}>
        {[
          ['01', 'FoodDash is moving from fragile startup to production-scale system.'],
          ['02', 'Next constraint: make the load balancer understand just enough request context.'],
        ].map(([numberValue, text]) => (
          <div key={numberValue} style={{display: 'grid', gridTemplateColumns: '80px 1fr', alignItems: 'start', gap: 24}}>
            <div style={{fontSize: 34, fontWeight: 950, lineHeight: 1, color: '#ffffff', fontFamily: 'Courier New, monospace'}}>{numberValue}</div>
            <div style={{fontSize: 34, fontWeight: 900, lineHeight: 1.16, textTransform: 'uppercase', color: 'rgba(255,255,255,0.82)'}}>{text}</div>
          </div>
        ))}
      </div>
    </div>
  </Canvas>
);

const OsiCanvas = () => {
  const layers = ['L7', 'L6', 'L5', 'L4', 'L3', 'L2', 'L1'];
  const rowTop = 118;
  const rowHeight = 42;
  const rowGap = 10;
  const rowCenter = (index: number) => rowTop + index * (rowHeight + rowGap) + rowHeight / 2;
  const l7Y = rowCenter(0);
  const l4Y = rowCenter(3);

  return (
    <Canvas>
      <WireLayer>
        <Wire d={`M1020 ${l7Y} H834`} />
        <Wire d={`M666 ${l4Y} H480`} />
        <Wire d="M750 118 L750 492" muted />
      </WireLayer>
      <FloatingNote>The same balancer can reason at different layers</FloatingNote>
      <CanvasNode x={120} y={l4Y - 66} w={360} h={132} icon={Network} title="Layer 4" note="transport layer" />
      <div style={{position: 'absolute', left: 666, top: rowTop, width: 168, display: 'grid', gap: rowGap}}>
        {layers.map((label) => (
          <div key={label} style={{height: rowHeight, display: 'grid', placeItems: 'center', border: '3px solid rgba(255,255,255,0.62)', borderRadius: 6, background: label === 'L4' || label === 'L7' ? '#ffffff' : '#050505', color: label === 'L4' || label === 'L7' ? '#000000' : '#ffffff', fontSize: 20, fontWeight: 950}}>
            {label}
          </div>
        ))}
      </div>
      <CanvasNode x={1020} y={l7Y - 66} w={360} h={132} icon={Mail} title="Layer 7" note="application layer" />
    </Canvas>
  );
};

const progressForBeat = (beat: LessonBeat, currentTime: number) =>
  Math.max(0, Math.min(1, (currentTime - beat.start) / Math.max(beat.end - beat.start, 0.001)));

const NetworkSignalsCanvas = ({beat, currentTime, fast}: {beat: LessonBeat; currentTime: number; fast?: boolean}) => {
  const signalCards = [
    {title: 'IP address', note: 'source + destination'},
    {title: 'Port', note: ':443'},
    {title: 'TCP', note: 'connection'},
    {title: 'UDP', note: 'datagrams'},
  ];
  const beatIndex = beatNumber(beat);
  const revealCount = fast ? signalCards.length : beatIndex === 9 ? 0 : Math.min(signalCards.length, Math.floor(progressForBeat(beat, currentTime) * signalCards.length) + 1);

  return (
    <Canvas>
      <FloatingNote>{fast ? 'Less inspection keeps the path fast' : beatIndex === 9 ? 'Layer 4 works at the transport layer' : 'Layer 4 reads the network envelope'}</FloatingNote>
      <CanvasNode x={560} y={162} w={380} h={190} icon={Zap} title="Layer 4" note="transport decision" active={fast} />
      <div style={{position: 'absolute', left: 140, right: 140, top: 412, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22}}>
        {signalCards.map((item, index) => (
          index < revealCount ? (
            <Card key={item.title} active={fast} style={{minHeight: 128, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 8, textAlign: 'center', boxShadow: '8px 8px 0 rgba(255,255,255,0.08)'}}>
              <Network size={38} strokeWidth={3} />
              <div style={{fontSize: 28, fontWeight: 950, lineHeight: 1, textTransform: 'uppercase'}}>{item.title}</div>
              <div style={{fontSize: 15, fontWeight: 900, lineHeight: 1, textTransform: 'uppercase', opacity: 0.72}}>{item.note}</div>
            </Card>
          ) : (
            <div key={item.title} />
          )
        ))}
      </div>
    </Canvas>
  );
};

const CourierCanvas = () => (
  <Canvas>
    <WireLayer>
      <Wire d="M390 306 C520 306 560 306 684 306" />
      <Wire d="M816 306 C940 306 980 306 1110 306" muted />
    </WireLayer>
    <FloatingNote>Useful routing without opening the box</FloatingNote>
    <CanvasNode x={118} y={216} w={310} h={180} icon={Mail} title="Shipping label" note="source and destination" active />
    <CanvasNode x={596} y={216} w={310} h={180} icon={GitBranch} title="Sorter" note="route by label" />
    <CanvasNode x={1072} y={216} w={310} h={180} icon={Box} title="Closed box" note="contents unseen" />
  </Canvas>
);

const ApplicationSignalsCanvas = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const signalCards = [
    {title: 'URL', note: '/restaurant'},
    {title: 'Headers', note: 'metadata'},
    {title: 'Cookies', note: 'session'},
    {title: 'Host name', note: 'tenant'},
    {title: 'Method', note: 'GET / POST'},
  ];
  const revealCount = Math.min(signalCards.length, Math.floor(progressForBeat(beat, currentTime) * signalCards.length) + 1);

  return (
    <Canvas>
      <FloatingNote>Layer 7 can inspect the HTTP request</FloatingNote>
      <CanvasNode x={560} y={154} w={380} h={190} icon={Mail} title="Layer 7" note="application decision" active />
      <div style={{position: 'absolute', left: 90, right: 90, top: 410, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18}}>
        {signalCards.map((item, index) => (
          index < revealCount ? (
            <Card key={item.title} active style={{minHeight: 128, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 8, textAlign: 'center', boxShadow: '8px 8px 0 rgba(255,255,255,0.08)'}}>
              <Mail size={38} strokeWidth={3} />
              <div style={{fontSize: item.title.length > 8 ? 23 : 28, fontWeight: 950, lineHeight: 1, textTransform: 'uppercase'}}>{item.title}</div>
              <div style={{fontSize: 15, fontWeight: 900, lineHeight: 1, textTransform: 'uppercase', opacity: 0.72}}>{item.note}</div>
            </Card>
          ) : (
            <div key={item.title} />
          )
        ))}
      </div>
    </Canvas>
  );
};

const NextAzCanvas = ({question}: {question?: boolean}) => (
  <Canvas>
    <WireLayer>
      <Wire d="M330 300 C460 210 540 190 650 190" />
      <Wire d="M330 300 C460 390 540 410 650 410" />
      <Wire d="M850 190 C970 190 1040 210 1170 300" muted={question} />
      <Wire d="M850 410 C970 410 1040 390 1170 300" muted={question} />
      <path d="M590 96 H932 V510 H590 Z" fill="none" stroke="rgba(255,255,255,0.36)" strokeWidth={4} strokeDasharray="16 14" rx={10} />
    </WireLayer>
    <FloatingNote>{question ? 'A failed server is smaller than a failed location' : 'Next boundary: multi-AZ architecture'}</FloatingNote>
    <CanvasNode x={96} y={222} w={260} h={156} icon={Globe} title="Users" note="traffic enters" />
    <CanvasNode x={612} y={122} w={260} h={138} icon={Server} title="Server fails" note="reroute around it" active={!question} />
    <CanvasNode x={612} y={352} w={260} h={138} icon={Globe} title="AZ offline" note="location failure" active={question} />
    <CanvasNode x={1126} y={222} w={278} h={156} icon={Route} title="Next episode" note="multi-AZ routing" active />
  </Canvas>
);

const NextEpisodeBridge = () => (
  <Canvas>
    <div style={{position: 'absolute', left: 210, right: 210, top: 82, display: 'grid', gap: 30}}>
      <div style={{fontSize: 34, fontWeight: 950, textTransform: 'uppercase', color: 'rgba(255,255,255,0.66)'}}>
        Next episode
      </div>
      <div style={{fontSize: 78, fontWeight: 950, lineHeight: 0.94, textTransform: 'uppercase', color: '#ffffff'}}>
        Multi-AZ Architectures
      </div>
      <div style={{width: 820, height: 6, background: '#ffffff'}} />
      <div style={{fontSize: 36, fontWeight: 900, lineHeight: 1.12, textTransform: 'uppercase', color: 'rgba(255,255,255,0.84)', maxWidth: 980}}>
        FoodDash moves beyond one location and learns how systems survive availability-zone failures.
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 22}}>
        {[
          ['Single location', 'simple until the whole place fails'],
          ['Multiple AZs', 'route around location-level outages'],
        ].map(([title, body], index) => (
          <div key={title} style={{border: '4px solid #ffffff', borderRadius: 8, padding: 24, minHeight: 142, background: index === 1 ? '#ffffff' : '#050505', color: index === 1 ? '#000000' : '#ffffff', display: 'grid', alignContent: 'center', gap: 10}}>
            <div style={{fontSize: 30, fontWeight: 950, lineHeight: 1, textTransform: 'uppercase'}}>{title}</div>
            <div style={{fontSize: 20, fontWeight: 900, lineHeight: 1.12, textTransform: 'uppercase', opacity: 0.74}}>{body}</div>
          </div>
        ))}
      </div>
    </div>
  </Canvas>
);

const QuestionCanvas = () => (
  <Canvas>
    <WireLayer>
      <Wire d="M278 306 L620 306" />
      <Wire d="M880 306 L1222 182" muted />
      <Wire d="M880 306 L1222 306" />
      <Wire d="M880 306 L1222 430" muted />
    </WireLayer>
    <CanvasNode x={96} y={226} w={260} h={160} icon={Globe} title="Request" note="fooddash.com" />
    <CanvasNode x={604} y={198} w={292} h={216} icon={HelpCircle} title="Load balancer" note="which service?" active />
    <CanvasNode x={1160} y={116} w={260} h={124} icon={Smartphone} title="Customer" />
    <CanvasNode x={1160} y={252} w={260} h={124} icon={Store} title="Restaurant" />
    <CanvasNode x={1160} y={388} w={260} h={124} icon={Truck} title="Driver" />
  </Canvas>
);

const SmartBalancerPromptCanvas = () => (
  <Canvas>
    <WireLayer>
      <Wire d="M372 308 C520 308 570 308 676 308" />
      <Wire d="M824 308 C950 238 1010 210 1134 170" muted />
      <Wire d="M824 308 C950 308 1010 308 1134 308" muted />
      <Wire d="M824 308 C950 378 1010 406 1134 446" muted />
    </WireLayer>
    <FloatingNote>Now the front door needs more context</FloatingNote>
    <CanvasNode x={110} y={222} w={300} h={170} icon={Globe} title="fooddash.com" note="same domain" />
    <CanvasNode x={610} y={194} w={300} h={226} icon={HelpCircle} title="Smarter balancer?" note="what should it inspect?" active />
    <CanvasNode x={1106} y={104} w={270} h={126} icon={Smartphone} title="Customer" note="/" />
    <CanvasNode x={1106} y={244} w={270} h={126} icon={Store} title="Restaurant" note="/restaurant" />
    <CanvasNode x={1106} y={384} w={270} h={126} icon={Truck} title="Driver" note="/driver" />
  </Canvas>
);

const SameDomainUrlCanvas = () => (
  <Canvas>
    <FloatingNote>Same domain, different paths, different services</FloatingNote>
    <div style={{position: 'absolute', left: 178, right: 178, top: 162, display: 'grid', gap: 22}}>
      {[
        ['CUSTOMER', 'fooddash.com', 'main app'],
        ['RESTAURANT', 'fooddash.com/restaurant', 'restaurant dashboard'],
        ['DRIVER', 'fooddash.com/driver', 'driver portal'],
      ].map(([persona, url, service], index) => (
        <div key={persona} style={{display: 'grid', gridTemplateColumns: '230px 1fr 310px', alignItems: 'center', gap: 18}}>
          <Card style={{height: 86, display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 950, textTransform: 'uppercase', boxShadow: 'none'}}>
            {persona}
          </Card>
          <div style={{height: 86, display: 'grid', alignItems: 'center', border: '4px solid #ffffff', borderRadius: 8, padding: '0 28px', background: index === 0 ? '#ffffff' : '#050505', color: index === 0 ? '#000000' : '#ffffff', fontSize: 31, fontWeight: 950, fontFamily: 'Courier New, monospace'}}>
            {url}
          </div>
          <Card active={index > 0} style={{height: 86, display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 950, textAlign: 'center', textTransform: 'uppercase', boxShadow: 'none'}}>
            {service}
          </Card>
        </div>
      ))}
    </div>
  </Canvas>
);

const Layer4BlindSpotCanvas = () => (
  <Canvas>
    <WireLayer>
      <Wire d="M304 306 C430 306 510 306 628 306" />
      <Wire d="M872 306 C980 220 1040 188 1168 150" muted />
      <Wire d="M872 306 C982 306 1042 306 1168 306" muted />
      <Wire d="M872 306 C980 392 1040 424 1168 462" muted />
    </WireLayer>
    <FloatingNote>Layer 4 sees the envelope, not the route inside</FloatingNote>
    <CanvasNode x={94} y={224} w={270} h={164} icon={Mail} title="HTTP request" note="sealed contents" />
    <CanvasNode x={604} y={194} w={292} h={226} icon={Network} title="Layer 4" note="only IP + port" active />
    {([
      {mark: '?', label: 'Customer service', Icon: Smartphone, y: 94},
      {mark: '?', label: 'Restaurant service', Icon: Store, y: 250},
      {mark: '?', label: 'Driver service', Icon: Truck, y: 406},
    ] satisfies Array<{mark: string; label: string; Icon: IconType; y: number}>).map(({mark, label, Icon, y}) => (
      <div key={label} style={{position: 'absolute', left: 1112, top: y, width: 300, height: 122, display: 'grid', gridTemplateColumns: '70px 1fr', alignItems: 'center', gap: 12, border: '4px dashed rgba(255,255,255,0.62)', borderRadius: 8, padding: 16, background: '#050505', color: '#ffffff'}}>
        <div style={{fontSize: 54, fontWeight: 950, fontFamily: 'Courier New, monospace', textAlign: 'center'}}>{mark}</div>
        <div style={{display: 'grid', gap: 6}}>
          {React.createElement(Icon, {size: 34, strokeWidth: 3})}
          <strong style={{fontSize: 22, fontWeight: 950, lineHeight: 1, textTransform: 'uppercase'}}>{label}</strong>
        </div>
      </div>
    ))}
  </Canvas>
);

const L4Board = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const b = beatNumber(beat);
  if (b === 11) return <RouteBoard mode="same" />;
  if (b === 12) return <CourierCanvas />;

  return <NetworkSignalsCanvas beat={beat} currentTime={currentTime} fast={b === 13} />;
};

export const Layer4Layer7Visual: React.FC<Props> = ({beat, currentTime}) => {
  const b = beatNumber(beat);

  if (b === 1) {
    return <Stage title="Welcome" subtitle="Engineering Systems" chapter="Layer 4 vs Layer 7" icon={Layers3}><Card active style={{minHeight: 610, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 24, textAlign: 'center'}}><Layers3 size={88} strokeWidth={3} /><div style={{fontSize: 72, fontWeight: 950, lineHeight: 0.94, textTransform: 'uppercase'}}>Layer 4 vs Layer 7 Load Balancing</div><div style={{fontSize: 30, fontWeight: 900, textTransform: 'uppercase', opacity: 0.74}}>How smart should the load balancer be?</div><div style={{display: 'flex', gap: 14}}><Label inverted>network</Label><Label inverted>request</Label><Label inverted>routing</Label></div></Card></Stage>;
  }

  if (b <= 3) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="Previous Episode" icon={Gauge}><RouteBoard mode="l4" /><Card active style={{marginTop: 22, textAlign: 'center', fontSize: 32, fontWeight: 950, textTransform: 'uppercase'}}>The server choice is handled. The service choice is still open.</Card></Stage>;
  if (b <= 5) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="New Requirement" icon={ShoppingCart}><ServiceGrid /></Stage>;
  if (b === 6) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="New Requirement" icon={Server}><div style={{display: 'grid', gridTemplateColumns: '1fr 220px 1fr', gap: 22}}><BigCard icon={ShoppingCart} title="Product surfaces" note="four user journeys" /><Card active style={{display: 'grid', placeItems: 'center', fontSize: 54, fontWeight: 950}}>=&gt;</Card><BigCard icon={Server} title="Independent services" note="separate backends" active /></div></Stage>;
  if (b === 7) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="Routing Question" icon={HelpCircle}><QuestionCanvas /></Stage>;
  if (b === 8) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="OSI Framing" icon={Layers3}><OsiCanvas /></Stage>;
  if (b <= 13) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="Layer 4: Transport" icon={b === 12 ? Box : Zap}><L4Board beat={beat} currentTime={currentTime} /></Stage>;
  if (b <= 15) return <Stage title="Quick note" subtitle="Every episode builds on the last one" chapter="Context" icon={ShieldCheck}><SeriesBridgeText /></Stage>;
  if (b === 16) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="Why L4 Is Not Enough" icon={Route}><SmartBalancerPromptCanvas /></Stage>;
  if (b === 17) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="Why L4 Is Not Enough" icon={Route}><SameDomainUrlCanvas /></Stage>;
  if (b === 18) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="Why L4 Is Not Enough" icon={Route}><Layer4BlindSpotCanvas /></Stage>;
  if (b <= 22) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="Layer 7: Application" icon={Mail}>{b === 20 ? <ApplicationSignalsCanvas beat={beat} currentTime={currentTime} /> : <RouteBoard mode="l7" />}</Stage>;
  if (b <= 26) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="Trade-Off" icon={Compass}>{b === 24 || b === 25 ? <Comparison /> : <Card active style={{minHeight: 560, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 22, textAlign: 'center'}}><Compass size={84} strokeWidth={3} /><div style={{fontSize: 58, fontWeight: 950, lineHeight: 0.98, textTransform: 'uppercase'}}>{b === 23 ? 'Is Layer 7 always better?' : 'Choose the right solution for this problem.'}</div><Label inverted>{b === 23 ? 'not automatically' : 'engineering judgment'}</Label></Card>}</Stage>;
  if (b === 27) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="FoodDash Now" icon={ShieldCheck}><ResilienceStack /></Stage>;
  if (b === 28) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="Next: Multi-AZ" icon={Globe}><NextAzCanvas /></Stage>;
  if (b === 29) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="Next: Multi-AZ" icon={Globe}><NextAzCanvas question /></Stage>;
  if (b === 30) return <Stage title={beat.title} subtitle={beat.subtitle} chapter="Next Episode" icon={Globe}><NextEpisodeBridge /></Stage>;

  return null;
};
