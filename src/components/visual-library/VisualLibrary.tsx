import React from 'react';
import {CheckCircle2, Circle, Database, Globe, Server, Smartphone} from 'lucide-react';

const classNames = (...values: Array<string | false | undefined>): string => values.filter(Boolean).join(' ');

export type VisualCardItem = {
  title: string;
  body?: string;
  meta?: string;
  emphasis?: boolean;
};

export type VisualCardGridProps = {
  items: VisualCardItem[];
  variant?: 'hero' | 'split' | 'triple' | 'checklist' | 'summary';
};

export const VisualCardGrid: React.FC<VisualCardGridProps> = ({items, variant = 'triple'}) => (
  <div className={classNames('vl-card-grid', `vl-card-grid-${variant}`)}>
    {items.map((item) => (
      <div key={`${item.title}-${item.meta ?? ''}`} className={classNames('vl-card', item.emphasis && 'vl-card-emphasis')}>
        {item.meta ? <span className="vl-meta">{item.meta}</span> : null}
        <h3>{item.title}</h3>
        {item.body ? <p>{item.body}</p> : null}
      </div>
    ))}
  </div>
);

export type ComparisonMatrixProps = {
  columns: string[];
  rows: Array<{
    label: string;
    cells: string[];
    emphasis?: boolean;
  }>;
};

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({columns, rows}) => (
  <div className="vl-matrix" style={{gridTemplateColumns: `minmax(220px, 0.9fr) repeat(${columns.length}, minmax(0, 1fr))`}}>
    <div className="vl-matrix-cell vl-matrix-head">Option</div>
    {columns.map((column) => (
      <div key={column} className="vl-matrix-cell vl-matrix-head">
        {column}
      </div>
    ))}
    {rows.map((row) => (
      <React.Fragment key={row.label}>
        <div className={classNames('vl-matrix-cell', 'vl-matrix-row-label', row.emphasis && 'vl-matrix-emphasis')}>{row.label}</div>
        {row.cells.map((cell, index) => (
          <div key={`${row.label}-${columns[index] ?? index}`} className={classNames('vl-matrix-cell', row.emphasis && 'vl-matrix-emphasis')}>
            {cell}
          </div>
        ))}
      </React.Fragment>
    ))}
  </div>
);

export type TimelineItem = {
  title: string;
  detail?: string;
  status?: 'past' | 'active' | 'future';
};

export type TimelineStripProps = {
  items: TimelineItem[];
};

export const TimelineStrip: React.FC<TimelineStripProps> = ({items}) => (
  <div className="vl-timeline">
    <div className="vl-timeline-line" />
    {items.map((item, index) => (
      <div key={`${item.title}-${index}`} className={classNames('vl-timeline-step', `vl-timeline-${item.status ?? 'future'}`)}>
        <span>{index + 1}</span>
        <strong>{item.title}</strong>
        {item.detail ? <p>{item.detail}</p> : null}
      </div>
    ))}
  </div>
);

export type FlowNode = {
  id: string;
  label: string;
  detail?: string;
  emphasis?: boolean;
};

export type FlowDiagramProps = {
  nodes: FlowNode[];
  mode?: 'linear' | 'loop' | 'branching';
};

export const FlowDiagram: React.FC<FlowDiagramProps> = ({nodes, mode = 'linear'}) => (
  <div className={classNames('vl-flow', `vl-flow-${mode}`)}>
    {nodes.map((node, index) => (
      <React.Fragment key={node.id}>
        <div className={classNames('vl-flow-node', node.emphasis && 'vl-flow-node-emphasis')}>
          <Circle size={28} />
          <strong>{node.label}</strong>
          {node.detail ? <p>{node.detail}</p> : null}
        </div>
        {index < nodes.length - 1 ? <div className="vl-flow-arrow">=&gt;</div> : null}
      </React.Fragment>
    ))}
  </div>
);

export type ArchitectureNode = {
  id: string;
  label: string;
  detail?: string;
  role?: 'client' | 'service' | 'data' | 'network';
  emphasis?: boolean;
};

export type ArchitectureMapProps = {
  nodes: ArchitectureNode[];
  centerLabel?: string;
};

const architectureIcon = (role: ArchitectureNode['role']) => {
  if (role === 'data') {
    return Database;
  }

  if (role === 'network' || role === 'client') {
    return Globe;
  }

  return Server;
};

export const ArchitectureMap: React.FC<ArchitectureMapProps> = ({nodes, centerLabel = 'System'}) => (
  <div className="vl-architecture">
    <div className="vl-architecture-center">
      <Server size={48} />
      <strong>{centerLabel}</strong>
    </div>
    {nodes.map((node, index) => {
      const Icon = architectureIcon(node.role);
      return (
        <div key={node.id} className={classNames('vl-architecture-node', `vl-architecture-node-${index + 1}`, node.emphasis && 'vl-architecture-node-emphasis')}>
          <Icon size={32} />
          <strong>{node.label}</strong>
          {node.detail ? <p>{node.detail}</p> : null}
        </div>
      );
    })}
    <svg className="vl-architecture-lines" viewBox="0 0 1200 460" aria-hidden="true">
      <path d="M600 230 L175 90 M600 230 L1025 90 M600 230 L180 370 M600 230 L1020 370 M600 230 L600 430" />
    </svg>
  </div>
);

export type PhoneMockupProps = {
  title: string;
  rows: string[];
  status?: string;
};

export const PhoneMockup: React.FC<PhoneMockupProps> = ({title, rows, status}) => (
  <div className="vl-phone">
    <div className="vl-phone-speaker" />
    <div className="vl-phone-header">
      <Smartphone size={28} />
      <strong>{title}</strong>
    </div>
    <div className="vl-phone-body">
      {rows.map((row) => (
        <span key={row}>{row}</span>
      ))}
    </div>
    {status ? <div className="vl-phone-status">{status}</div> : null}
  </div>
);

export type BrowserMockupProps = {
  title: string;
  panels: Array<{
    label: string;
    value?: string;
    emphasis?: boolean;
  }>;
};

export const BrowserMockup: React.FC<BrowserMockupProps> = ({title, panels}) => (
  <div className="vl-browser">
    <div className="vl-browser-top">
      <span />
      <span />
      <span />
      <strong>{title}</strong>
    </div>
    <div className="vl-browser-grid">
      {panels.map((panel) => (
        <div key={panel.label} className={classNames('vl-browser-panel', panel.emphasis && 'vl-browser-panel-emphasis')}>
          <strong>{panel.value ?? panel.label}</strong>
          {panel.value ? <p>{panel.label}</p> : null}
        </div>
      ))}
    </div>
  </div>
);

export type MetricChartProps = {
  title: string;
  points: number[];
  variant?: 'line' | 'bar' | 'area';
};

const toPolyline = (points: number[], width: number, height: number): string => {
  const max = Math.max(...points, 1);
  const step = points.length > 1 ? width / (points.length - 1) : width;

  return points
    .map((point, index) => {
      const x = index * step;
      const y = height - (point / max) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
};

export const MetricChart: React.FC<MetricChartProps> = ({title, points, variant = 'line'}) => {
  const width = 640;
  const height = 260;
  const polyline = toPolyline(points, width, height);

  return (
    <div className={classNames('vl-chart', `vl-chart-${variant}`)}>
      <h3>{title}</h3>
      <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
        <path className="vl-chart-gridline" d={`M0 ${height * 0.25} H${width} M0 ${height * 0.5} H${width} M0 ${height * 0.75} H${width}`} />
        {variant === 'bar'
          ? points.map((point, index) => {
              const max = Math.max(...points, 1);
              const barWidth = width / points.length - 16;
              const barHeight = (point / max) * height;
              return <rect key={`${point}-${index}`} x={index * (width / points.length) + 8} y={height - barHeight} width={barWidth} height={barHeight} />;
            })
          : null}
        {variant === 'area' ? <polygon points={`0,${height} ${polyline} ${width},${height}`} /> : null}
        {variant !== 'bar' ? <polyline points={polyline} /> : null}
      </svg>
    </div>
  );
};

export const VisualLibraryCheck: React.FC = () => (
  <div className="vl-check">
    <CheckCircle2 size={32} />
    <span>Visual library ready</span>
  </div>
);
