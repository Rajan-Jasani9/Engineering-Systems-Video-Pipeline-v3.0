export type WordTiming = {
  i: number;
  text: string;
  start: number;
  end: number;
};

export type TimedWordChunk = {
  id: string;
  index: number;
  words: WordTiming[];
  start: number;
  end: number;
  charLength: number;
};

export type MainVideoProps = {
  audioSrc: string;
  words: WordTiming[];
  lessonPlan: LessonBeat[];
  title: string;
  subtitle: string;
};

export type VisualKind =
  | 'intro'
  | 'practical-shift'
  | 'opening-question'
  | 'myth'
  | 'mosaic'
  | 'mosaic-contracts'
  | 'vocabulary'
  | 'vocabulary-spectrum'
  | 'agenda'
  | 'agenda-examples'
  | 'principle'
  | 'principle-scope'
  | 'feature-contrast'
  | 'like-button-example'
  | 'commerce-map'
  | 'inventory'
  | 'inventory-rule'
  | 'inventory-race'
  | 'reviews'
  | 'review-choice'
  | 'profile'
  | 'profile-trust'
  | 'comments'
  | 'comments-order'
  | 'analytics'
  | 'analytics-impact'
  | 'analytics-staleness'
  | 'analytics-speed'
  | 'tradeoff'
  | 'coordination-cost'
  | 'coordination-pressure'
  | 'decision-framework'
  | 'risk-step'
  | 'business-step'
  | 'choose-step'
  | 'sufficient-step'
  | 'spectrum'
  | 'spectrum-strong'
  | 'spectrum-coordination'
  | 'spectrum-middle'
  | 'spectrum-weak'
  | 'final-lesson'
  | 'decision-checklist'
  | 'tradeoff-recap'
  | 'availability-bridge'
  | 'next-series'
  | 'availability-preview'
  | 'failure-preview'
  | 'availability-intro'
  | 'availability-series-shift'
  | 'availability-pillar'
  | 'availability-roadmap'
  | 'consistency-vs-availability'
  | 'consistency-side'
  | 'availability-catch'
  | 'availability-side'
  | 'availability-definition'
  | 'request-response'
  | 'timeout-unavailable'
  | 'availability-at-scale'
  | 'nines-table'
  | 'nines-shrink'
  | 'fooddash-map'
  | 'fooddash-rush'
  | 'fooddash-journey'
  | 'outage-blast'
  | 'service-unavailable'
  | 'outage-impact'
  | 'business-concern'
  | 'downtime-cost'
  | 'failure-question'
  | 'reality-breaks'
  | 'failure-list'
  | 'failure-expected'
  | 'availability-mindset'
  | 'patterns-toolkit'
  | 'patterns-purpose'
  | 'redundancy-pattern'
  | 'pattern-grid'
  | 'failure-isolation'
  | 'spof-intro'
  | 'single-server'
  | 'crash-offline'
  | 'spof-definition'
  | 'remove-spof'
  | 'catastrophe-goal'
  | 'user-never-notices'
  | 'recap-availability'
  | 'next-spof'
  | 'final-question'
  | 'closing';

export type LessonBeat = {
  id: string;
  kind: VisualKind;
  start: number;
  end: number;
  title: string;
  subtitle: string;
  takeaway: string;
};

export type VideoDefinition = MainVideoProps & {
  id: string;
  slug: string;
};
