import React from 'react';
import {
  ArchitectureMap,
  BrowserMockup,
  ComparisonMatrix,
  FlowDiagram,
  MetricChart,
  PhoneMockup,
  TimelineStrip,
  VisualCardGrid,
} from './VisualLibrary';
import {getLayoutCatalogEntry, layoutCatalog, type LayoutCatalogEntry, type LayoutFamily, type LayoutKind} from './layoutCatalog';

type VisualLayoutPresetProps = {
  kind: LayoutKind;
  title?: string;
  subtitle?: string;
};

type PresetCopy = {
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
  tertiary: string;
};

const familyCopy: Record<LayoutFamily, Omit<PresetCopy, 'title' | 'subtitle'>> = {
  'boards-cards': {
    primary: 'Principle',
    secondary: 'Decision',
    tertiary: 'Outcome',
  },
  timelines: {
    primary: 'Start',
    secondary: 'Shift',
    tertiary: 'Recover',
  },
  architecture: {
    primary: 'Client',
    secondary: 'Service',
    tertiary: 'Data',
  },
  'mobile-app-views': {
    primary: 'User state',
    secondary: 'Visible result',
    tertiary: 'Trust signal',
  },
  'browser-ui-layouts': {
    primary: 'Status',
    secondary: 'Metrics',
    tertiary: 'Action',
  },
  'graphs-metrics': {
    primary: 'Baseline',
    secondary: 'Pressure',
    tertiary: 'Limit',
  },
  'process-flowcharts': {
    primary: 'Input',
    secondary: 'Decision',
    tertiary: 'Result',
  },
  'real-world-analogies': {
    primary: 'Analogy',
    secondary: 'System mapping',
    tertiary: 'Lesson',
  },
  'teaching-slides': {
    primary: 'Question',
    secondary: 'Correction',
    tertiary: 'Takeaway',
  },
};

const getCopy = (entry: LayoutCatalogEntry, title?: string, subtitle?: string): PresetCopy => ({
  title: title ?? entry.label,
  subtitle: subtitle ?? entry.bestFor,
  ...familyCopy[entry.family],
});

const cardVariant = (kind: LayoutKind): 'hero' | 'split' | 'triple' | 'checklist' | 'summary' => {
  if (kind === 'hero-card' || kind === 'quiz-card' || kind === 'rule-of-thumb' || kind === 'common-mistake' || kind === 'interview-question' || kind === 'next-episode') {
    return 'hero';
  }

  if (kind === 'split-card' || kind === 'myth-vs-reality') {
    return 'split';
  }

  if (kind === 'checklist-board') {
    return 'checklist';
  }

  if (kind === 'summary-board' || kind === 'key-takeaways') {
    return 'summary';
  }

  return 'triple';
};

const matrixLabels = (kind: LayoutKind): {columns: string[]; rows: Array<{label: string; cells: string[]; emphasis?: boolean}>} => {
  if (kind === 'pros-cons') {
    return {
      columns: ['Pros', 'Cons'],
      rows: [
        {label: 'Option A', cells: ['fast path', 'extra risk'], emphasis: true},
        {label: 'Option B', cells: ['simple model', 'higher cost']},
      ],
    };
  }

  if (kind === 'feature-matrix') {
    return {
      columns: ['Correctness', 'Latency', 'Cost'],
      rows: [
        {label: 'Checkout', cells: ['strong', 'medium', 'higher'], emphasis: true},
        {label: 'Reviews', cells: ['eventual', 'low', 'lower']},
        {label: 'Analytics', cells: ['approx', 'low', 'lowest']},
      ],
    };
  }

  return {
    columns: ['Reliability', 'Complexity', 'Fit'],
    rows: [
      {label: 'Choice A', cells: ['high', 'medium', 'critical path'], emphasis: true},
      {label: 'Choice B', cells: ['medium', 'low', 'best effort']},
      {label: 'Choice C', cells: ['highest', 'high', 'global scale']},
    ],
  };
};

const timelineItems = (kind: LayoutKind, copy: PresetCopy) => {
  if (kind === 'incident-timeline') {
    return [
      {title: 'Alert', detail: 'signal fires', status: 'past' as const},
      {title: 'Impact', detail: 'users affected', status: 'active' as const},
      {title: 'Mitigate', detail: 'route around', status: 'future' as const},
      {title: 'Resolve', detail: 'system stable', status: 'future' as const},
    ];
  }

  if (kind === 'retry-timeline') {
    return [
      {title: 'Try', detail: 'request fails', status: 'past' as const},
      {title: 'Wait', detail: 'backoff delay', status: 'active' as const},
      {title: 'Retry', detail: 'new attempt', status: 'future' as const},
      {title: 'Stop', detail: 'cap attempts', status: 'future' as const},
    ];
  }

  return [
    {title: copy.primary, detail: 'initial state', status: 'past' as const},
    {title: copy.secondary, detail: 'system changes', status: 'active' as const},
    {title: copy.tertiary, detail: 'final result', status: 'future' as const},
  ];
};

const flowMode = (kind: LayoutKind): 'linear' | 'loop' | 'branching' => {
  if (kind === 'retry-loop') {
    return 'loop';
  }

  if (kind === 'decision-tree' || kind === 'branching-flow') {
    return 'branching';
  }

  return 'linear';
};

const chartVariant = (kind: LayoutKind): 'line' | 'bar' | 'area' => {
  if (kind === 'bar-chart' || kind === 'cost-graph') {
    return 'bar';
  }

  if (kind === 'area-chart' || kind === 'queue-growth') {
    return 'area';
  }

  return 'line';
};

const chartPoints = (kind: LayoutKind): number[] => {
  if (kind === 'error-rate') {
    return [2, 2, 3, 28, 44, 18, 5, 2];
  }

  if (kind === 'availability-curve') {
    return [99, 99, 98, 76, 92, 98, 99, 99];
  }

  if (kind === 'queue-growth') {
    return [4, 8, 18, 33, 51, 73, 92, 110];
  }

  if (kind === 'latency-curve') {
    return [8, 9, 11, 16, 28, 45, 70, 112];
  }

  return [8, 14, 24, 22, 34, 44, 40, 58];
};

const renderPresetBody = (entry: LayoutCatalogEntry, copy: PresetCopy) => {
  switch (entry.primitive) {
    case 'VisualCardGrid':
      return (
        <VisualCardGrid
          variant={cardVariant(entry.kind as LayoutKind)}
          items={[
            {title: copy.primary, body: entry.exampleUse, meta: '01', emphasis: true},
            {title: copy.secondary, body: copy.subtitle, meta: '02'},
            {title: copy.tertiary, body: 'Use this when the concept needs a compact teaching board.', meta: '03'},
          ]}
        />
      );
    case 'ComparisonMatrix': {
      const matrix = matrixLabels(entry.kind as LayoutKind);
      return <ComparisonMatrix columns={matrix.columns} rows={matrix.rows} />;
    }
    case 'TimelineStrip':
      return <TimelineStrip items={timelineItems(entry.kind as LayoutKind, copy)} />;
    case 'FlowDiagram':
      return (
        <FlowDiagram
          mode={flowMode(entry.kind as LayoutKind)}
          nodes={[
            {id: 'input', label: copy.primary, detail: 'request arrives'},
            {id: 'decision', label: copy.secondary, detail: 'system evaluates', emphasis: true},
            {id: 'result', label: copy.tertiary, detail: 'output is visible'},
          ]}
        />
      );
    case 'ArchitectureMap':
      return (
        <ArchitectureMap
          centerLabel={copy.title}
          nodes={[
            {id: 'client', label: 'Client', detail: 'entry point', role: 'client'},
            {id: 'api', label: 'API', detail: 'routes request', role: 'service', emphasis: true},
            {id: 'queue', label: 'Queue', detail: 'buffers work', role: 'network'},
            {id: 'db', label: 'Database', detail: 'stores state', role: 'data'},
            {id: 'worker', label: 'Worker', detail: 'processes jobs', role: 'service'},
          ]}
        />
      );
    case 'PhoneMockup':
      return (
        <div className={entry.kind === 'two-phones' || entry.kind === 'before-after-phone' ? 'vl-preset-pair' : 'vl-preset-single'}>
          <PhoneMockup title={copy.title} rows={['Open app', copy.primary, copy.secondary, copy.tertiary]} status="User-visible state" />
          {entry.kind === 'two-phones' || entry.kind === 'before-after-phone' ? <PhoneMockup title="Second State" rows={['Same flow', 'Different view', 'Updated result']} status="Compare" /> : null}
        </div>
      );
    case 'BrowserMockup':
      return (
        <BrowserMockup
          title={copy.title}
          panels={[
            {label: copy.primary, value: 'Healthy', emphasis: true},
            {label: copy.secondary, value: '12 ms'},
            {label: copy.tertiary, value: 'Open'},
            {label: 'Errors', value: '0.2%'},
            {label: 'Queue', value: '184'},
            {label: 'Owner', value: 'SRE'},
          ]}
        />
      );
    case 'MetricChart':
      return <MetricChart title={copy.title} points={chartPoints(entry.kind as LayoutKind)} variant={chartVariant(entry.kind as LayoutKind)} />;
  }
};

export const VisualLayoutPreset: React.FC<VisualLayoutPresetProps> = ({kind, title, subtitle}) => {
  const entry = getLayoutCatalogEntry(kind);

  if (!entry) {
    return null;
  }

  const copy = getCopy(entry, title, subtitle);

  return (
    <div className="vl-preset">
      <div className="vl-preset-header">
        <span>{entry.kind}</span>
        <h3>{copy.title}</h3>
        <p>{copy.subtitle}</p>
      </div>
      <div className="vl-preset-body">{renderPresetBody(entry, copy)}</div>
    </div>
  );
};

export const VisualLayoutFamilyGallery: React.FC<{family: LayoutFamily}> = ({family}) => (
  <div className="vl-gallery">
    {layoutCatalog
      .filter((entry) => entry.family === family)
      .map((entry) => (
        <VisualLayoutPreset key={entry.kind} kind={entry.kind} />
      ))}
  </div>
);
