import React from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
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
  Zap,
} from 'lucide-react';
import {Easing, Img, interpolate, staticFile} from 'remotion';
import {EngineeringSystemsWelcomeSlide} from '../../components/EngineeringSystemsWelcomeSlide';
import type {LessonBeat} from '../../types';
import {
  ArchitectureNode,
  ArchitectureStage,
  BigNote,
  CardFrame,
  DatabaseNode,
  HtmlPacket,
  HtmlWire,
  ServiceNode,
  StepRail,
} from '../the-famous-nines/visuals';

type SeriesParallelVisualProps = {
  beat: LessonBeat;
  currentTime: number;
  frame: number;
  fps: number;
};

type IconComponent = React.ComponentType<{size?: number; strokeWidth?: number}>;
type Point = {x: number; y: number};

const beatNumber = (beat: LessonBeat) => Number(beat.id.replace('sap-', '')) || 0;

const packetProgress = (currentTime: number, speed = 0.44, offset = 0) => (currentTime * speed + offset) % 1;
const yellow = '#ffd400';
const easeInOut = Easing.bezier(0.16, 1, 0.3, 1);
const revealProgress = (currentTime: number, start: number, duration = 0.7) =>
  interpolate(currentTime, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeInOut,
  });
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

const titleText: React.CSSProperties = {
  color: 'inherit',
  fontSize: 28,
  fontWeight: 950,
  lineHeight: 0.98,
};

const subText: React.CSSProperties = {
  color: 'inherit',
  fontSize: 16,
  fontWeight: 900,
  lineHeight: 1,
  opacity: 0.72,
};

const smallText: React.CSSProperties = {
  color: 'inherit',
  fontSize: 14,
  fontWeight: 900,
  lineHeight: 1,
  opacity: 0.68,
};

const MetricCard: React.FC<{
  label: string;
  value: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  active?: boolean;
  muted?: boolean;
  icon?: IconComponent;
}> = ({label, value, x, y, w = 210, h = 116, active, muted, icon: Icon = Activity}) => (
  <CardFrame x={x} y={y} w={w} h={h} active={active} muted={muted}>
    <Icon size={34} strokeWidth={3} />
    <strong style={titleText}>{label}</strong>
    <span style={subText}>{value}</span>
  </CardFrame>
);

const FormulaBlock: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  formula: string;
  result: string;
  active?: boolean;
  muted?: boolean;
}> = ({x, y, w, h = 122, formula, result, active, muted}) => (
  <CardFrame x={x} y={y} w={w} h={h} active={active} muted={muted}>
    <strong style={{color: 'inherit', fontSize: 36, fontWeight: 950, lineHeight: 0.95}}>{formula}</strong>
    <span style={{color: 'inherit', fontSize: 20, fontWeight: 950, opacity: 0.76}}>{result}</span>
  </CardFrame>
);

const MiniLabel: React.FC<{x: number; y: number; children: React.ReactNode; active?: boolean}> = ({x, y, children, active}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      zIndex: 3,
      border: active ? '3px solid #ffffff' : '2px solid rgba(255,255,255,0.46)',
      borderRadius: 8,
      background: active ? '#ffffff' : 'rgba(0,0,0,0.82)',
      color: active ? '#000000' : '#ffffff',
      padding: '10px 14px',
      fontSize: 18,
      fontWeight: 950,
      lineHeight: 1,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

const YellowWarning: React.FC<{visible?: boolean; label?: string}> = ({visible = true, label = 'risk'}) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        right: -14,
        top: -14,
        zIndex: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        border: `3px solid ${yellow}`,
        borderRadius: 8,
        background: '#050505',
        color: yellow,
        padding: '6px 8px',
        fontSize: 13,
        fontWeight: 950,
        lineHeight: 1,
        textTransform: 'uppercase',
        boxShadow: '7px 7px 0 rgba(255, 212, 0, 0.16)',
      }}
    >
      <AlertTriangle size={18} strokeWidth={3} />
      <span>{label}</span>
    </div>
  );
};

const AnimatedComponentCard: React.FC<{
  label: string;
  sub: string;
  icon: IconComponent;
  x: number;
  y: number;
  w?: number;
  h?: number;
  progress: number;
  active?: boolean;
  warn?: boolean;
}> = ({label, sub, icon: Icon, x, y, w = 164, h = 116, progress, active, warn}) => {
  if (progress <= 0.01) {
    return null;
  }

  return (
    <CardFrame
      x={x}
      y={y}
      w={w}
      h={h}
      active={active}
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * 22}px) scale(${0.88 + progress * 0.12})`,
      }}
    >
      <YellowWarning visible={warn} />
      <Icon size={34} strokeWidth={3} />
      <strong style={{color: 'inherit', fontSize: 22, fontWeight: 950, lineHeight: 0.96}}>{label}</strong>
      <span style={subText}>{sub}</span>
    </CardFrame>
  );
};

const IntroNode: React.FC<{
  label: string;
  sub: string;
  icon: IconComponent;
  x: number;
  y: number;
  w: number;
  h: number;
  progress: number;
  active?: boolean;
}> = ({label, sub, icon: Icon, x, y, w, h, progress, active}) => (
  <CardFrame
    x={x}
    y={y}
    w={w}
    h={h}
    active={active}
    style={{
      opacity: progress,
      transform: `translateY(${(1 - progress) * 18}px) scale(${0.94 + progress * 0.06})`,
    }}
  >
    <Icon size={34} strokeWidth={3} />
    <strong style={{color: 'inherit', fontSize: 25, fontWeight: 950, lineHeight: 0.95}}>{label}</strong>
    <span style={subText}>{sub}</span>
  </CardFrame>
);

const IntroVisual = ({currentTime}: {currentTime: number}) => {
  const seriesIn = revealProgress(currentTime, 0.18, 0.48);
  const parallelIn = revealProgress(currentTime, 0.86, 0.52);
  const insightIn = revealProgress(currentTime, 1.62, 0.56);
  const seriesReady = seriesIn > 0.18;
  const parallelReady = parallelIn > 0.18;
  const insightReady = insightIn > 0.2;

  return (
    <ArchitectureStage>
      <BigNote active x={174} y={18} w={1032}>
        Same parts. Different connection shape. Different uptime.
      </BigNote>

      <div style={{position: 'absolute', left: 686, top: 94, width: 4, height: 322, background: 'rgba(255,255,255,0.34)', borderRadius: 4}} />

      <CardFrame x={54} y={96} w={548} h={72} active style={{opacity: seriesIn}}>
        <strong style={{color: 'inherit', fontSize: 34, fontWeight: 950, lineHeight: 0.95}}>Series Chain = AND</strong>
        <span style={subText}>every required hop must work</span>
      </CardFrame>
      <CardFrame x={778} y={96} w={548} h={72} active style={{opacity: parallelIn}}>
        <strong style={{color: 'inherit', fontSize: 34, fontWeight: 950, lineHeight: 0.95}}>Parallel Paths = OR</strong>
        <span style={subText}>one healthy route can succeed</span>
      </CardFrame>

      {seriesReady ? (
        <>
          <HtmlWire points={[{x: 184, y: 256}, {x: 260, y: 256}]} active />
          <HtmlWire points={[{x: 420, y: 256}, {x: 504, y: 256}]} active />
        </>
      ) : null}
      {insightReady ? <HtmlWire points={[{x: 664, y: 256}, {x: 664, y: 344}, {x: 472, y: 344}]} active /> : null}
      {parallelReady ? (
        <>
          <HtmlWire points={[{x: 916, y: 278}, {x: 982, y: 278}, {x: 982, y: 228}, {x: 1052, y: 228}]} active />
          <HtmlWire points={[{x: 916, y: 278}, {x: 982, y: 278}, {x: 982, y: 356}, {x: 1052, y: 356}]} active />
          <HtmlWire points={[{x: 1216, y: 228}, {x: 1240, y: 228}, {x: 1240, y: 302}]} active />
          <HtmlWire points={[{x: 1216, y: 356}, {x: 1240, y: 356}, {x: 1240, y: 302}]} active />
        </>
      ) : null}

      <IntroNode label="Customer" sub="request" icon={ShoppingCart} x={34} y={198} w={150} h={116} progress={seriesIn} active />
      <IntroNode label="API" sub="required" icon={Server} x={260} y={198} w={160} h={116} progress={seriesIn} active />
      <IntroNode label="Database" sub="required" icon={Database} x={504} y={198} w={160} h={116} progress={seriesIn} active />
      <CardFrame x={210} y={332} w={262} h={86} active={insightIn > 0.2} style={{opacity: insightIn}}>
        <strong style={{color: 'inherit', fontSize: 30, fontWeight: 950, lineHeight: 0.95}}>One weak link</strong>
        <span style={subText}>breaks the chain</span>
      </CardFrame>

      <IntroNode label="Gateway" sub="choose path" icon={GitBranch} x={760} y={220} w={156} h={116} progress={parallelIn} active />
      <IntroNode label="DB A" sub="path 1" icon={Database} x={1052} y={176} w={164} h={104} progress={parallelIn} active />
      <IntroNode label="DB B" sub="path 2" icon={Database} x={1052} y={304} w={164} h={104} progress={parallelIn} active />
      <CardFrame x={1240} y={244} w={118} h={116} active={insightReady} style={{opacity: insightIn}}>
        <PackageCheck size={34} strokeWidth={3} />
        <strong style={{color: 'inherit', fontSize: 22, fontWeight: 950, lineHeight: 0.95}}>Success</strong>
        <span style={smallText}>one route</span>
      </CardFrame>

      <StepRail items={['series chain', 'parallel paths', 'availability math']} activeIndex={insightIn > 0.5 ? 2 : parallelIn > 0.5 ? 1 : 0} y={462} />
    </ArchitectureStage>
  );
};

const FoundationVisual = ({beat}: {beat: LessonBeat}) => {
  const n = beatNumber(beat);
  const activeIndex = n === 2 ? 0 : n === 3 ? 2 : 3;
  const cards: Array<[string, string, IconComponent]> = [
    ['SPOF Removed', 'single failure isolated', XCircle],
    ['Failover Added', 'traffic can move', RefreshCw],
    ['Famous Nines', 'target is concrete', LineChart],
    ['Math Trap', 'system target unknown', AlertTriangle],
  ];

  return (
    <ArchitectureStage>
      <BigNote active={n >= 4} x={214} y={18} w={952}>
        {n >= 4 ? 'A stronger architecture can still hide an availability math trap' : n === 3 ? 'Targets and recovery are already on the board' : 'FoodDash is more resilient than before'}
      </BigNote>
      <div style={{position: 'absolute', left: 90, right: 90, top: 116, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18}}>
        {cards.map(([label, sub, Icon], index) => (
          <CardFrame key={label} h={210} active={index <= activeIndex} muted={index > activeIndex}>
            <Icon size={48} strokeWidth={3} />
            <strong style={{color: 'inherit', fontSize: 28, fontWeight: 950, lineHeight: 0.96}}>{label}</strong>
            <span style={subText}>{sub}</span>
          </CardFrame>
        ))}
      </div>
      <StepRail items={['SPOF', 'failover', 'nines', 'new question']} activeIndex={activeIndex} y={462} />
    </ArchitectureStage>
  );
};

const QuestionTrapVisual = ({beat}: {beat: LessonBeat}) => {
  const n = beatNumber(beat);
  const wrong = n >= 7;

  return (
    <ArchitectureStage>
      <BigNote active={wrong} x={240} y={18} w={900}>
        {wrong ? 'Reasonable assumption. Wrong system math.' : n === 6 ? 'If every component is 99.9%, is FoodDash 99.9%?' : 'The obvious question sounds harmless'}
      </BigNote>
      <ArchitectureNode label="Junior Engineer" sub="team meeting" icon={User} x={80} y={158} w={226} h={154} active={!wrong} />
      <HtmlWire points={[{x: 306, y: 235}, {x: 456, y: 235}]} active />
      <CardFrame x={456} y={124} w={468} h={238} active={!wrong}>
        <Scale size={54} strokeWidth={3} />
        <strong style={{color: 'inherit', fontSize: 42, fontWeight: 950, lineHeight: 0.92}}>99.9% + 99.9%</strong>
        <span style={{color: 'inherit', fontSize: 23, fontWeight: 950}}>whole system = 99.9%?</span>
      </CardFrame>
      <HtmlWire points={[{x: 924, y: 235}, {x: 1058, y: 235}]} active />
      <CardFrame x={1058} y={154} w={240} h={178} active={wrong} muted={!wrong} failed={wrong}>
        {wrong ? <XCircle size={52} /> : <CheckCircle2 size={52} />}
        <strong style={{color: 'inherit', fontSize: 32, fontWeight: 950}}>{wrong ? 'Wrong' : 'Seems right'}</strong>
        <span style={subText}>{wrong ? 'shape matters' : 'everyone nods'}</span>
      </CardFrame>
      <StepRail items={['question', 'assumption', 'nods', 'wrong']} activeIndex={wrong ? 3 : n === 6 ? 1 : 0} y={462} />
    </ArchitectureStage>
  );
};

const SimpleSeriesVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const path: Point[] = [
    {x: 188, y: 246},
    {x: 354, y: 246},
    {x: 548, y: 246},
    {x: 742, y: 246},
    {x: 944, y: 246},
    {x: 1132, y: 246},
  ];
  const progress = packetProgress(currentTime, 0.36);
  const showPacket = n >= 9;
  const showTargets = n >= 10;
  const andProgress = revealProgress(currentTime, 68.9, 0.55);
  const showAnd = andProgress > 0.01;

  return (
    <ArchitectureStage>
      <BigNote active={showAnd} x={230} y={18} w={920}>
        {showAnd ? 'The request needs API and database healthy at the same time' : n >= 10 ? 'Two good components do not guarantee the whole path' : 'A stripped-down FoodDash request path'}
      </BigNote>
      <HtmlWire points={path} active />
      {showPacket ? <HtmlPacket points={path} progress={progress} /> : null}
      <ArchitectureNode label="Customer" sub="opens app" icon={ShoppingCart} x={42} y={190} w={146} h={112} active />
      <ServiceNode label="API" sub={showTargets ? '99.9%' : 'server'} x={354} y={188} w={170} h={116} active />
      <DatabaseNode label="Database" sub={showTargets ? '99.9%' : 'menus'} x={742} y={188} w={184} h={116} active />
      <ArchitectureNode label="Menu" sub="visible" icon={PackageCheck} x={1132} y={190} w={166} h={112} active={n >= 9} />
      {showAnd ? (
        <CardFrame
          x={552}
          y={166}
          w={150}
          h={158}
          active
          style={{
            opacity: andProgress,
            transform: `translateY(${(1 - andProgress) * 18}px) scale(${0.84 + andProgress * 0.16})`,
          }}
        >
          <strong style={{color: 'inherit', fontSize: 48, fontWeight: 950}}>AND</strong>
          <span style={subText}>both required</span>
        </CardFrame>
      ) : null}
      {showTargets ? (
        <>
          <MetricCard label="API" value="0.999" x={354} y={330} w={170} h={86} active={showAnd} icon={Server} />
          <MetricCard label="DB" value="0.999" x={742} y={330} w={184} h={86} active={showAnd} icon={Database} />
        </>
      ) : null}
      <StepRail items={['app opens', 'API', 'database', 'menu']} activeIndex={n >= 12 ? 3 : n >= 10 ? 2 : n >= 9 ? 1 : 0} y={462} />
    </ArchitectureStage>
  );
};

const FailureCasesVisual = ({beat}: {beat: LessonBeat}) => {
  const n = beatNumber(beat);
  const dbDown = n === 13;
  const apiDown = n === 14;
  const bothPain = n >= 15;

  return (
    <ArchitectureStage>
      <BigNote active x={230} y={18} w={920}>
        {bothPain ? 'The failed piece changes. The user experience does not.' : dbDown ? 'API healthy, database down: request fails' : 'Database healthy, API down: request fails'}
      </BigNote>
      <HtmlWire points={[{x: 202, y: 250}, {x: 356, y: 250}, {x: 560, y: 250}, {x: 758, y: 250}, {x: 956, y: 250}, {x: 1134, y: 250}]} active={!bothPain} />
      <ArchitectureNode label="Customer" sub="wants food" icon={ShoppingCart} x={54} y={192} w={148} h={116} active={!bothPain} />
      <ServiceNode label="API" sub={apiDown ? 'crashed' : 'healthy'} x={356} y={188} w={174} h={122} active={!apiDown} failed={apiDown || bothPain} muted={bothPain} />
      <CardFrame x={574} y={204} w={124} h={86} active={!bothPain}>
        <strong style={{color: 'inherit', fontSize: 26, fontWeight: 950}}>AND</strong>
      </CardFrame>
      <DatabaseNode label="Database" sub={dbDown ? 'down' : 'healthy'} x={758} y={188} w={190} h={122} active={!dbDown} failed={dbDown || bothPain} muted={bothPain} />
      <CardFrame x={1088} y={160} w={230} h={178} active={bothPain} failed={!bothPain}>
        <XCircle size={54} />
        <strong style={{color: 'inherit', fontSize: 32, fontWeight: 950}}>Cannot Order</strong>
        <span style={subText}>same outcome</span>
      </CardFrame>
      <StepRail items={['API ok / DB down', 'DB ok / API down', 'same failure']} activeIndex={bothPain ? 2 : apiDown ? 1 : 0} y={462} />
    </ArchitectureStage>
  );
};

const SeriesRuleVisual = ({beat}: {beat: LessonBeat}) => {
  const n = beatNumber(beat);
  const weak = n >= 17;
  const nodes = [
    {label: 'Load', sub: 'required', icon: GitBranch, x: 82},
    {label: 'API', sub: 'required', icon: Server, x: 320},
    {label: 'DB', sub: weak ? 'weak link' : 'required', icon: Database, x: 558},
    {label: 'Payment', sub: 'required', icon: CreditCard, x: 796},
    {label: 'Menu', sub: 'success', icon: PackageCheck, x: 1034},
  ];

  return (
    <ArchitectureStage>
      <BigNote active={weak} x={230} y={18} w={920}>
        {weak ? 'One weak link breaks the entire chain' : 'Series system: every required component must work'}
      </BigNote>
      {nodes.slice(0, -1).map((node, index) => (
        <HtmlWire key={node.label} points={[{x: node.x + 174, y: 240}, {x: nodes[index + 1].x, y: 240}]} active={!(weak && index >= 2)} />
      ))}
      {nodes.map(({label, sub, icon: Icon, x}, index) => (
        <ArchitectureNode key={label} label={label} sub={sub} icon={Icon} x={x} y={176} w={174} h={128} active={!weak || index < 2} failed={weak && index === 2} muted={weak && index > 2} />
      ))}
      <FormulaBlock x={390} y={336} w={600} formula="request succeeds only if all links succeed" result="availability chain = link 1 x link 2 x link 3..." active={weak} />
      <StepRail items={['all links', 'required', 'weak link', 'request fails']} activeIndex={weak ? 3 : 1} y={462} />
    </ArchitectureStage>
  );
};

const GrowingChainVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const grow = revealProgress(currentTime, 115.75, 5.6);
  const lbProgress = revealProgress(currentTime, 116.62, 0.55);
  const paymentProgress = revealProgress(currentTime, 119.35, 0.55);
  const notifyProgress = revealProgress(currentTime, 120.48, 0.55);
  const riskProgress = revealProgress(currentTime, 126.31, 0.85);
  const scary = riskProgress > 0.05;
  const showAll = notifyProgress > 0.7;
  const y = 190;
  const customerX = mix(248, 42, grow);
  const apiX = mix(518, 486, grow);
  const dbX = mix(748, 672, grow);
  const successX = mix(1008, 1222, grow);
  const loadX = 300;
  const paymentX = 858;
  const notifyX = 1044;
  const centerY = y + 58;
  const directCustomerToApi = lbProgress < 0.35;
  const directDbToSuccess = paymentProgress < 0.35;
  const paymentToSuccess = paymentProgress >= 0.35 && notifyProgress < 0.35;

  return (
    <ArchitectureStage>
      <BigNote active={scary} x={226} y={18} w={928}>
        {scary ? 'Every added component creates another failure opportunity' : showAll ? 'The request path expands as FoodDash grows' : 'Start compact: customer, API, database, success'}
      </BigNote>
      {directCustomerToApi ? (
        <HtmlWire points={[{x: customerX + 150, y: centerY}, {x: apiX, y: centerY}]} active />
      ) : (
        <>
          <HtmlWire points={[{x: customerX + 150, y: centerY}, {x: loadX, y: centerY}]} active />
          <HtmlWire points={[{x: loadX + 164, y: centerY}, {x: apiX, y: centerY}]} active />
        </>
      )}
      <HtmlWire points={[{x: apiX + 164, y: centerY}, {x: dbX, y: centerY}]} active />
      {directDbToSuccess ? (
        <HtmlWire points={[{x: dbX + 164, y: centerY}, {x: successX, y: centerY}]} active />
      ) : paymentToSuccess ? (
        <>
          <HtmlWire points={[{x: dbX + 164, y: centerY}, {x: paymentX, y: centerY}]} active />
          <HtmlWire points={[{x: paymentX + 164, y: centerY}, {x: successX, y: centerY}]} active />
        </>
      ) : (
        <>
          <HtmlWire points={[{x: dbX + 164, y: centerY}, {x: paymentX, y: centerY}]} active />
          <HtmlWire points={[{x: paymentX + 164, y: centerY}, {x: notifyX, y: centerY}]} active />
          <HtmlWire points={[{x: notifyX + 164, y: centerY}, {x: successX, y: centerY}]} active />
        </>
      )}
      {showAll ? (
        <HtmlPacket
          points={[
            {x: customerX + 150, y: centerY},
            {x: loadX, y: centerY},
            {x: apiX, y: centerY},
            {x: dbX, y: centerY},
            {x: paymentX, y: centerY},
            {x: notifyX, y: centerY},
            {x: successX, y: centerY},
          ]}
          progress={packetProgress(currentTime, 0.28)}
        />
      ) : null}
      <AnimatedComponentCard label="Customer" sub="order" icon={ShoppingCart} x={customerX} y={y} w={150} h={116} progress={1} active warn={false} />
      <AnimatedComponentCard label="Load Balancer" sub={scary ? 'failure slot' : 'route'} icon={GitBranch} x={loadX} y={y} progress={lbProgress} active warn={scary} />
      <AnimatedComponentCard label="API Service" sub={scary ? 'failure slot' : 'app logic'} icon={Server} x={apiX} y={y} progress={1} active warn={scary} />
      <AnimatedComponentCard label="Database" sub={scary ? 'failure slot' : 'state'} icon={Database} x={dbX} y={y} progress={1} active warn={scary} />
      <AnimatedComponentCard label="Payment" sub={scary ? 'failure slot' : 'money'} icon={CreditCard} x={paymentX} y={y} progress={paymentProgress} active warn={scary} />
      <AnimatedComponentCard label="Notify" sub={scary ? 'failure slot' : 'message'} icon={MessageSquare} x={notifyX} y={y} progress={notifyProgress} active warn={scary} />
      <AnimatedComponentCard label="Success" sub="food order" icon={PackageCheck} x={successX} y={y} w={134} h={116} progress={1} active={!scary} warn={false} />
      {scary ? <FormulaBlock x={330} y={320} w={720} h={106} formula="longer path = more required hops" result="capability grows, but the must-work chain grows too" active /> : null}
      <StepRail items={['simple path', 'five services', 'risk slots']} activeIndex={scary ? 2 : showAll ? 1 : 0} y={462} />
    </ArchitectureStage>
  );
};

const MultiplicationVisual = ({beat}: {beat: LessonBeat}) => {
  const n = beatNumber(beat);
  const activeIndex = n === 21 ? 0 : n === 22 ? 1 : 2;
  const rows = [
    ['1 component', '99.900%', 98],
    ['2 in series', '99.800%', 82],
    ['5 in series', '99.501%', 58],
  ];

  return (
    <ArchitectureStage>
      <BigNote active x={214} y={18} w={952}>
        {n === 21 ? 'More product capability can still lower availability' : n === 22 ? 'Availability multiplication exposes the drop' : 'Each dependency chips away at the whole path'}
      </BigNote>
      <FormulaBlock x={82} y={116} w={344} h={154} formula="0.999 x 0.999" result="99.8001% for two required parts" active={n >= 22} />
      <FormulaBlock x={518} y={116} w={344} h={154} formula="0.999^5" result="99.501% for five required parts" active={n >= 22} />
      <CardFrame x={954} y={116} w={344} h={154} active={n >= 23}>
        <LineChart size={48} />
        <strong style={{color: 'inherit', fontSize: 32, fontWeight: 950}}>Lower Than Any Part</strong>
        <span style={subText}>not dramatic, but real</span>
      </CardFrame>
      <div style={{position: 'absolute', left: 150, right: 150, top: 308, display: 'grid', gap: 13}}>
        {rows.map(([label, value, width], index) => (
          <div key={label} style={{display: 'grid', gridTemplateColumns: '210px 1fr 150px', alignItems: 'center', gap: 18, opacity: index <= activeIndex ? 1 : 0.34}}>
            <strong style={{color: '#ffffff', fontSize: 24, fontWeight: 950, textTransform: 'uppercase'}}>{label}</strong>
            <div style={{height: 28, border: '3px solid rgba(255,255,255,0.46)', borderRadius: 8, padding: 4}}>
              <div style={{width: `${width}%`, height: '100%', background: '#ffffff', borderRadius: 4}} />
            </div>
            <strong style={{color: '#ffffff', fontSize: 24, fontWeight: 950, textAlign: 'right'}}>{value}</strong>
          </div>
        ))}
      </div>
      <StepRail items={['capability', 'multiply', 'availability drops']} activeIndex={activeIndex} y={462} />
    </ArchitectureStage>
  );
};

const DependencyRiskVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const riskProgress = revealProgress(currentTime, 166.3, 0.7);
  const showRisk = n >= 26 || riskProgress > 0.05;
  const activeIndex = n >= 27 ? 3 : showRisk ? 2 : n === 25 ? 1 : 0;
  const dependencies: Array<[string, string, IconComponent, number]> = [
    ['Search', 'discovery', Activity, 88],
    ['Orders', 'checkout', ShoppingCart, 182],
    ['Payments', 'money path', CreditCard, 276],
    ['Messages', 'notifications', MessageSquare, 370],
  ];

  return (
    <ArchitectureStage>
      <BigNote active={n >= 26} x={222} y={18} w={936}>
        {n >= 27 ? 'The fix is to create alternative paths' : n >= 26 ? 'Do not let availability move in the wrong direction' : n === 25 ? 'Every dependency adds capability and risk' : 'Modern applications are collections of services'}
      </BigNote>
      <CardFrame x={70} y={198} w={210} h={150} active>
        <ShoppingCart size={52} />
        <strong style={{color: 'inherit', fontSize: 32, fontWeight: 950}}>FoodDash</strong>
        <span style={subText}>product workflow</span>
      </CardFrame>
      {dependencies.map(([label, sub, Icon, y]) => (
        <React.Fragment key={label}>
          <HtmlWire points={[{x: 280, y: 273}, {x: 318, y: 273}, {x: 318, y: y + 42}, {x: 354, y: y + 42}]} active />
          <CardFrame x={354} y={y} w={194} h={84} active={n >= 24}>
            <YellowWarning visible={showRisk} />
            <Icon size={28} strokeWidth={3} />
            <strong style={{color: 'inherit', fontSize: 22, fontWeight: 950}}>{label}</strong>
            <span style={subText}>{sub}</span>
          </CardFrame>
        </React.Fragment>
      ))}
      <CardFrame x={628} y={116} w={284} h={138} active={n >= 25}>
        <CheckCircle2 size={44} />
        <strong style={{color: 'inherit', fontSize: 30, fontWeight: 950}}>Capability</strong>
        <span style={subText}>features, money, speed</span>
      </CardFrame>
      <CardFrame x={628} y={292} w={284} h={138} active={showRisk} muted={!showRisk}>
        <AlertTriangle size={46} color={showRisk ? yellow : undefined} />
        <strong style={{color: 'inherit', fontSize: 30, fontWeight: 950}}>Risk</strong>
        <span style={subText}>more required hops</span>
      </CardFrame>
      {n >= 27 ? (
        <>
          <HtmlWire points={[{x: 912, y: 254}, {x: 986, y: 254}, {x: 986, y: 176}, {x: 1060, y: 176}]} active />
          <HtmlWire points={[{x: 912, y: 254}, {x: 986, y: 254}, {x: 986, y: 336}, {x: 1060, y: 336}]} active />
          <CardFrame x={1060} y={126} w={210} h={100} active>
            <RefreshCw size={34} />
            <strong style={{color: 'inherit', fontSize: 24, fontWeight: 950}}>Path A</strong>
          </CardFrame>
          <CardFrame x={1060} y={286} w={210} h={100} active>
            <RefreshCw size={34} />
            <strong style={{color: 'inherit', fontSize: 24, fontWeight: 950}}>Path B</strong>
          </CardFrame>
        </>
      ) : (
        <CardFrame x={1000} y={166} w={260} h={196} active={n >= 26} muted={n < 26}>
          <LineChart size={50} />
          <strong style={{color: 'inherit', fontSize: 30, fontWeight: 950}}>Availability</strong>
          <span style={{color: showRisk ? yellow : 'inherit', fontSize: 34, fontWeight: 950}}>wrong direction</span>
        </CardFrame>
      )}
      <StepRail items={['service mesh', 'capability', 'risk', 'parallel fix']} activeIndex={activeIndex} y={462} />
    </ArchitectureStage>
  );
};

const ParallelDatabaseVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const dbAFailed = n >= 30;
  const rule = n >= 31;
  const userToServer: Point[] = [{x: 182, y: 244}, {x: 336, y: 244}];
  const serverToA: Point[] = [{x: 512, y: 244}, {x: 620, y: 244}, {x: 620, y: 166}, {x: 760, y: 166}];
  const serverToB: Point[] = [{x: 512, y: 244}, {x: 620, y: 244}, {x: 620, y: 320}, {x: 760, y: 320}];
  const requestToA: Point[] = [{x: 182, y: 244}, {x: 512, y: 244}, {x: 620, y: 244}, {x: 620, y: 166}, {x: 760, y: 166}];
  const requestToB: Point[] = [{x: 182, y: 244}, {x: 512, y: 244}, {x: 620, y: 244}, {x: 620, y: 320}, {x: 760, y: 320}];
  const replication: Point[] = [{x: 940, y: 166}, {x: 1000, y: 166}, {x: 1000, y: 320}, {x: 940, y: 320}];

  return (
    <ArchitectureStage>
      <BigNote active={n >= 29} x={214} y={18} w={952}>
        {rule ? 'Series needs every component. Parallel needs one healthy path.' : dbAFailed ? 'Database A fails, Database B takes over' : n >= 29 ? 'The request no longer depends on one database' : 'Primary database plus replica database'}
      </BigNote>
      <HtmlWire points={userToServer} active />
      <HtmlWire points={serverToA} active={!dbAFailed} />
      <HtmlWire points={serverToB} active={dbAFailed || n >= 29} />
      <HtmlWire points={replication} active={n >= 28 && !rule} />
      {n >= 28 ? <HtmlPacket points={dbAFailed ? requestToB : requestToA} progress={packetProgress(currentTime, 0.42)} /> : null}
      <ArchitectureNode label="User" sub="request" icon={ShoppingCart} x={42} y={188} w={140} h={112} active />
      <ServiceNode label="Server" sub="route query" x={336} y={182} w={176} h={124} active />
      <DatabaseNode label="DB A" sub={dbAFailed ? 'failed' : 'primary'} x={760} y={108} w={180} h={116} active={!dbAFailed} failed={dbAFailed} />
      <DatabaseNode label="DB B" sub={dbAFailed ? 'takes over' : 'replica'} x={760} y={262} w={180} h={116} active={n >= 29 || dbAFailed} />
      <CardFrame x={1092} y={186} w={220} h={144} active={rule || dbAFailed}>
        {rule ? <Scale size={46} /> : <RefreshCw size={46} />}
        <strong style={{color: 'inherit', fontSize: 30, fontWeight: 950}}>{rule ? 'OR' : 'Recover'}</strong>
        <span style={subText}>{rule ? 'one path works' : 'alternate path'}</span>
      </CardFrame>
      <StepRail items={['replica', 'not one DB', 'failover', 'OR rule']} activeIndex={rule ? 3 : dbAFailed ? 2 : n >= 29 ? 1 : 0} y={462} />
    </ArchitectureStage>
  );
};

const BridgeVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const parallel = n >= 33;

  return (
    <ArchitectureStage>
      <BigNote active x={240} y={18} w={900}>
        {parallel ? 'Two bridges means the destination stays reachable' : 'One bridge means one collapse blocks the route'}
      </BigNote>
      <div style={{position: 'absolute', left: 54, top: 104, width: 1272, height: 334, border: '3px solid rgba(255,255,255,0.72)', borderRadius: 8, overflow: 'hidden', zIndex: 1}}>
        <Img
          src={staticFile('images/series-parallel-river-bridges.png')}
          style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
        />
        <div
          style={{
            position: 'absolute',
            left: parallel ? 0 : '50%',
            top: 0,
            width: '50%',
            height: '100%',
            background: 'rgba(0,0,0,0.58)',
          }}
        />
        <div style={{position: 'absolute', left: '50%', top: 0, bottom: 0, width: 3, background: 'rgba(255,255,255,0.68)'}} />
      </div>
      <MiniLabel x={158} y={126} active={!parallel}>Series: one bridge</MiniLabel>
      <MiniLabel x={846} y={126} active={parallel}>Parallel: two bridges</MiniLabel>
      {parallel ? <HtmlPacket points={[{x: 742, y: 318}, {x: 1030, y: 318}, {x: 1220, y: 318}]} progress={packetProgress(currentTime, 0.36)} /> : null}
      <CardFrame x={154} y={364} w={398} h={74} active={!parallel}>
        <strong style={{color: 'inherit', fontSize: 23, fontWeight: 950}}>single route collapses: stuck</strong>
      </CardFrame>
      <CardFrame x={806} y={364} w={420} h={74} active={parallel} muted={!parallel}>
        <strong style={{color: 'inherit', fontSize: 23, fontWeight: 950}}>alternate route still reaches destination</strong>
      </CardFrame>
      <StepRail items={parallel ? ['route a closed', 'route b open', 'destination reached'] : ['one route', 'route breaks', 'stuck']} activeIndex={parallel ? 2 : 1} y={462} />
    </ArchitectureStage>
  );
};

const ParallelPurposeVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const activeIndex = n === 34 ? 0 : n === 35 ? 1 : 2;
  const userToRouter: Point[] = [{x: 200, y: 270}, {x: 304, y: 270}];
  const topPath: Point[] = [{x: 484, y: 270}, {x: 520, y: 270}, {x: 520, y: 174}, {x: 604, y: 174}];
  const bottomPath: Point[] = [{x: 484, y: 270}, {x: 520, y: 270}, {x: 520, y: 366}, {x: 604, y: 366}];
  const topToSuccess: Point[] = [{x: 860, y: 174}, {x: 986, y: 174}, {x: 986, y: 270}, {x: 1124, y: 270}];
  const bottomToSuccess: Point[] = [{x: 860, y: 366}, {x: 986, y: 366}, {x: 986, y: 270}, {x: 1124, y: 270}];

  return (
    <ArchitectureStage>
      <BigNote active={n >= 36} x={210} y={18} w={960}>
        {n >= 36 ? 'Reduce must-work components. Increase ways a request can succeed.' : n >= 35 ? 'Alternative networks and regions buy independent success paths' : 'Replication and redundancy create parallel paths'}
      </BigNote>
      <HtmlWire points={userToRouter} active />
      <HtmlWire points={topPath} active />
      <HtmlWire points={topToSuccess} active />
      <HtmlWire points={bottomPath} active={n >= 35} />
      <HtmlWire points={bottomToSuccess} active={n >= 35} />
      {n >= 35 ? <HtmlPacket points={[...bottomPath, ...bottomToSuccess]} progress={packetProgress(currentTime, 0.34)} /> : null}
      <ArchitectureNode label="Users" sub="global demand" icon={User} x={52} y={214} w={148} h={112} active />
      <ArchitectureNode label="Gateway" sub="choose route" icon={GitBranch} x={304} y={204} w={180} h={132} active />
      <CardFrame x={604} y={112} w={256} h={124} active>
        {n >= 35 ? <Globe size={42} /> : <Server size={42} />}
        <strong style={{color: 'inherit', fontSize: 28, fontWeight: 950}}>{n >= 35 ? 'Region A' : 'Redundant Servers'}</strong>
        <span style={subText}>{n >= 35 ? 'route 1' : 'parallel compute'}</span>
      </CardFrame>
      <CardFrame x={604} y={304} w={256} h={124} active={n >= 35} muted={n < 35}>
        {n >= 35 ? <Globe size={42} /> : <Database size={42} />}
        <strong style={{color: 'inherit', fontSize: 28, fontWeight: 950}}>{n >= 35 ? 'Region B' : 'Replicated DB'}</strong>
        <span style={subText}>{n >= 35 ? 'route 2' : 'parallel state'}</span>
      </CardFrame>
      <CardFrame x={1124} y={208} w={210} h={124} active={n >= 36}>
        <Zap size={42} />
        <strong style={{color: 'inherit', fontSize: 28, fontWeight: 950}}>More Ways</strong>
        <span style={subText}>to succeed</span>
      </CardFrame>
      <StepRail items={['past patterns', 'alternate routes', 'design goal']} activeIndex={activeIndex} y={462} />
    </ArchitectureStage>
  );
};

const RecapComparisonVisual = ({beat}: {beat: LessonBeat}) => {
  const n = beatNumber(beat);
  const activeSeries = n === 37;
  const activeParallel = n >= 38;
  const transform = n >= 39;

  return (
    <ArchitectureStage>
      <BigNote active={transform} x={226} y={18} w={928}>
        {transform ? 'Redundancy transforms fragile chains into available parallel systems' : activeParallel ? 'Parallel: only one healthy path needs to work' : 'Series: every component must be healthy'}
      </BigNote>
      <div style={{position: 'absolute', left: 84, right: 84, top: 112, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28}}>
        <CardFrame h={292} active={activeSeries} muted={activeParallel && !transform}>
          <GitBranch size={54} />
          <strong style={{color: 'inherit', fontSize: 40, fontWeight: 950}}>Series</strong>
          <span style={{color: 'inherit', fontSize: 24, fontWeight: 950}}>API x DB x Payment</span>
          <span style={subText}>every component must work</span>
          <span style={smallText}>overall availability decreases</span>
        </CardFrame>
        <CardFrame h={292} active={activeParallel || transform} muted={!activeParallel}>
          <RefreshCw size={54} />
          <strong style={{color: 'inherit', fontSize: 40, fontWeight: 950}}>Parallel</strong>
          <span style={{color: 'inherit', fontSize: 24, fontWeight: 950}}>DB A or DB B</span>
          <span style={subText}>one healthy path can work</span>
          <span style={smallText}>recovery odds improve</span>
        </CardFrame>
      </div>
      <MiniLabel x={570} y={244} active={transform}>
        {transform ? 'redundancy changes the shape' : 'compare the formulas'}
      </MiniLabel>
      <StepRail items={['series', 'parallel', 'transform']} activeIndex={transform ? 2 : activeParallel ? 1 : 0} y={462} />
    </ArchitectureStage>
  );
};

const LoadBalancingBridgeVisual = ({beat, currentTime}: {beat: LessonBeat; currentTime: number}) => {
  const n = beatNumber(beat);
  const choose = n >= 41;
  const overload = n >= 42;
  const servers = [
    {label: 'Server A', y: 94, load: overload ? 'overloaded' : 'healthy'},
    {label: 'Server B', y: 186, load: 'healthy'},
    {label: 'Server C', y: 278, load: 'idle'},
    {label: 'Server D', y: 370, load: 'idle'},
  ];
  const basePath: Point[] = [{x: 196, y: 250}, {x: 360, y: 250}];
  const toServer = (y: number): Point[] => [{x: 540, y: 250}, {x: 630, y: 250}, {x: 630, y: y + 42}, {x: 766, y: y + 42}];

  return (
    <ArchitectureStage>
      <BigNote active x={210} y={18} w={960}>
        {overload ? 'Next up: load balancing keeps parallel servers useful' : choose ? 'Which healthy server handles the next request?' : 'Parallel capacity creates a routing decision'}
      </BigNote>
      <HtmlWire points={basePath} active />
      {servers.map((server, index) => (
        <HtmlWire key={server.label} points={toServer(server.y)} active={!overload || index !== 0} />
      ))}
      <HtmlPacket points={basePath} progress={packetProgress(currentTime, 0.44)} />
      {choose ? <HtmlPacket points={toServer(overload ? servers[1].y : servers[0].y)} progress={packetProgress(currentTime, 0.42, 0.24)} /> : null}
      {overload ? <HtmlPacket points={toServer(servers[2].y)} progress={packetProgress(currentTime, 0.42, 0.56)} /> : null}
      <ArchitectureNode label="Users" sub="orders" icon={User} x={58} y={194} w={138} h={112} active />
      <ArchitectureNode label="Load Balancer" sub={choose ? 'choose next' : 'routing point'} icon={GitBranch} x={360} y={184} w={180} h={132} active />
      {servers.map((server, index) => (
        <ServiceNode
          key={server.label}
          label={server.label}
          sub={server.load}
          x={766}
          y={server.y}
          w={184}
          h={82}
          active={index !== 0 || !overload}
          muted={n === 40 && index > 1}
        />
      ))}
      <CardFrame x={1062} y={168} w={236} h={176} active={overload}>
        <Scale size={50} />
        <strong style={{color: 'inherit', fontSize: 31, fontWeight: 950}}>Balance</strong>
        <span style={subText}>avoid idle capacity</span>
      </CardFrame>
      <StepRail items={['parallel servers', 'next request', 'avoid overload', 'load balancing']} activeIndex={overload ? 3 : choose ? 1 : 0} y={462} />
    </ArchitectureStage>
  );
};

export const SeriesParallelAvailabilityVisual: React.FC<SeriesParallelVisualProps> = ({beat, currentTime}) => {
  const n = beatNumber(beat);

  if (beat.id === 'sap-00') {
    return (
      <EngineeringSystemsWelcomeSlide
        currentTime={currentTime - beat.start}
        seriesName="Availability Patterns #6"
        videoTitle="Series vs Parallel Availability"
        welcomeMessage="Welcome back. Today, dependency shape changes uptime math."
        showHeadingBadge={false}
        showSeriesBadge={false}
        doodles={[
          {label: 'series', icon: GitBranch, x: 72, y: 148, w: 160, h: 76, delay: 0.66},
          {label: 'parallel', icon: RefreshCw, x: 72, y: 292, w: 160, h: 76, delay: 0.78},
          {label: 'state', icon: Database, x: 1148, y: 148, w: 160, h: 76, delay: 0.9},
          {label: 'routing', icon: Server, x: 1148, y: 292, w: 160, h: 76, delay: 1.02},
        ]}
        railItems={['welcome', 'dependency shape', 'availability math']}
      />
    );
  }
  if (n === 1) {
    return <IntroVisual currentTime={currentTime - beat.start} />;
  }
  if (n <= 4) {
    return <FoundationVisual beat={beat} />;
  }
  if (n <= 7) {
    return <QuestionTrapVisual beat={beat} />;
  }
  if (n <= 12) {
    return <SimpleSeriesVisual beat={beat} currentTime={currentTime} />;
  }
  if (n <= 15) {
    return <FailureCasesVisual beat={beat} />;
  }
  if (n <= 17) {
    return <SeriesRuleVisual beat={beat} />;
  }
  if (n <= 20) {
    return <GrowingChainVisual beat={beat} currentTime={currentTime} />;
  }
  if (n <= 23) {
    return <MultiplicationVisual beat={beat} />;
  }
  if (n <= 27) {
    return <DependencyRiskVisual beat={beat} currentTime={currentTime} />;
  }
  if (n <= 31) {
    return <ParallelDatabaseVisual beat={beat} currentTime={currentTime} />;
  }
  if (n <= 33) {
    return <BridgeVisual beat={beat} currentTime={currentTime} />;
  }
  if (n <= 36) {
    return <ParallelPurposeVisual beat={beat} currentTime={currentTime} />;
  }
  if (n <= 39) {
    return <RecapComparisonVisual beat={beat} />;
  }

  return <LoadBalancingBridgeVisual beat={beat} currentTime={currentTime} />;
};
