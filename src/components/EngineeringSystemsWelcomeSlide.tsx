import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Activity} from 'lucide-react';
import {ArchitectureStage, CardFrame, StepRail} from '../videos/the-famous-nines/visuals';

type IconComponent = React.ComponentType<{size?: number; strokeWidth?: number}>;

export type WelcomeDoodle = {
  label: string;
  icon?: IconComponent;
  x: number;
  y: number;
  w?: number;
  h?: number;
  delay?: number;
};

type EngineeringSystemsWelcomeSlideProps = {
  currentTime: number;
  heading?: string;
  seriesName: string;
  videoTitle: string;
  welcomeMessage: string;
  doodles?: WelcomeDoodle[];
  railItems?: [string, string, string];
  showHeadingBadge?: boolean;
  showSeriesBadge?: boolean;
};

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const reveal = (currentTime: number, start: number, duration = 0.55) =>
  interpolate(currentTime, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easeOut,
  });

const labelStyle: React.CSSProperties = {
  color: 'inherit',
  fontSize: 18,
  fontWeight: 950,
  lineHeight: 1,
  opacity: 0.72,
  textTransform: 'uppercase',
};

const DoodleCard: React.FC<{doodle: WelcomeDoodle; currentTime: number}> = ({doodle, currentTime}) => {
  const Icon = doodle.icon ?? Activity;
  const progress = reveal(currentTime, doodle.delay ?? 0.78, 0.42);

  return (
    <CardFrame
      x={doodle.x}
      y={doodle.y}
      w={doodle.w ?? 176}
      h={doodle.h ?? 84}
      active={progress > 0.72}
      muted={progress <= 0.72}
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * 14}px) scale(${0.94 + progress * 0.06})`,
      }}
    >
      <Icon size={28} strokeWidth={3} />
      <span style={{...labelStyle, fontSize: 14}}>{doodle.label}</span>
    </CardFrame>
  );
};

export const EngineeringSystemsWelcomeSlide: React.FC<EngineeringSystemsWelcomeSlideProps> = ({
  currentTime,
  heading = 'Engineering Systems',
  seriesName,
  videoTitle,
  welcomeMessage,
  doodles = [],
  railItems = ['welcome', 'topic', 'kickoff'],
  showHeadingBadge = true,
  showSeriesBadge = true,
}) => {
  const seriesIn = reveal(currentTime, 0.08, 0.45);
  const titleIn = reveal(currentTime, 0.32, 0.55);
  const messageIn = reveal(currentTime, 0.68, 0.5);
  const titleSize = videoTitle.length > 34 ? 50 : 56;

  return (
    <ArchitectureStage>
      {showHeadingBadge ? (
        <CardFrame x={78} y={22} w={330} h={64} active style={{opacity: seriesIn}}>
          <strong style={{color: 'inherit', fontSize: 24, fontWeight: 950, lineHeight: 0.95}}>{heading}</strong>
        </CardFrame>
      ) : null}
      {showSeriesBadge ? (
        <CardFrame x={956} y={22} w={346} h={64} active={seriesIn > 0.7} style={{opacity: seriesIn}}>
          <span style={{...labelStyle, fontSize: 16}}>{seriesName}</span>
        </CardFrame>
      ) : null}

      <CardFrame
        x={258}
        y={124}
        w={864}
        h={236}
        active
        style={{
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 20}px) scale(${0.955 + titleIn * 0.045})`,
        }}
      >
        <strong style={{color: 'inherit', fontSize: titleSize, fontWeight: 950, lineHeight: 0.9}}>{videoTitle}</strong>
        <span style={{...labelStyle, fontSize: 22}}>{welcomeMessage}</span>
      </CardFrame>

      <div
        style={{
          position: 'absolute',
          left: 402,
          top: 392,
          width: 576,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
          opacity: messageIn,
          transform: `translateY(${(1 - messageIn) * 12}px)`,
        }}
      >
        <div style={{height: 52, border: '4px solid #ffffff', borderRadius: 8, background: '#ffffff', color: '#000000', display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 950, textTransform: 'uppercase'}}>
          Welcome back
        </div>
        <div style={{height: 52, border: '3px solid rgba(255,255,255,0.78)', borderRadius: 8, background: 'rgba(0,0,0,0.84)', color: '#ffffff', display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 950, textTransform: 'uppercase'}}>
          Video kickoff
        </div>
      </div>

      {doodles.map((doodle) => (
        <DoodleCard key={`${doodle.label}-${doodle.x}-${doodle.y}`} doodle={doodle} currentTime={currentTime} />
      ))}

      <StepRail items={railItems} activeIndex={0} y={462} />
    </ArchitectureStage>
  );
};
