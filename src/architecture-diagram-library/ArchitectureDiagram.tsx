import React from 'react';
import {ArchitectureIconGlyph, type ArchitectureIconName} from './ArchitectureIcons';
import {architectureDiagramStyleGuide, architectureDiagramTheme, toneToColor, type ArchitectureDiagramTone} from './theme';

export type ArchitectureDiagramCanvasProps = Omit<React.SVGProps<SVGSVGElement>, 'children'> & {
  width?: number;
  height?: number;
  background?: string;
  children: React.ReactNode;
};

export const architectureDiagramArrowMarkerId = 'architectureDiagramArrow';

export const architectureDiagramArrowMarkerIds: Record<ArchitectureDiagramTone, string> = {
  default: `${architectureDiagramArrowMarkerId}Default`,
  accent: `${architectureDiagramArrowMarkerId}Accent`,
  success: `${architectureDiagramArrowMarkerId}Success`,
  warning: `${architectureDiagramArrowMarkerId}Warning`,
  danger: `${architectureDiagramArrowMarkerId}Danger`,
  muted: `${architectureDiagramArrowMarkerId}Muted`,
  info: `${architectureDiagramArrowMarkerId}Info`,
};

const ArchitectureDiagramMarkers = () => (
  <>
    {(Object.keys(architectureDiagramArrowMarkerIds) as ArchitectureDiagramTone[]).map((tone) => (
      <marker
        key={tone}
        id={architectureDiagramArrowMarkerIds[tone]}
        markerWidth={architectureDiagramStyleGuide.connector.arrowMarkerWidth}
        markerHeight={architectureDiagramStyleGuide.connector.arrowMarkerHeight}
        refX={architectureDiagramStyleGuide.connector.arrowRefX}
        refY={architectureDiagramStyleGuide.connector.arrowRefY}
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path d={architectureDiagramStyleGuide.connector.arrowPath} fill={toneToColor(tone, architectureDiagramTheme.stroke)} />
      </marker>
    ))}
  </>
);

export const ArchitectureDiagramCanvas: React.FC<ArchitectureDiagramCanvasProps> = ({
  width = architectureDiagramStyleGuide.canvas.defaultWidth,
  height = architectureDiagramStyleGuide.canvas.defaultHeight,
  background = architectureDiagramTheme.background,
  children,
  style,
  ...svgProps
}) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
    role="img"
    style={{display: 'block', overflow: 'visible', ...style}}
    {...svgProps}
  >
    <defs>
      <ArchitectureDiagramMarkers />
    </defs>
    <rect x="0" y="0" width={width} height={height} rx={architectureDiagramStyleGuide.canvas.cornerRadius} fill={background} />
    {children}
  </svg>
);

export type DiagramConnectorProps = {
  from: {x: number; y: number};
  to: {x: number; y: number};
  kind?: 'straight' | 'curve' | 'elbow';
  tone?: ArchitectureDiagramTone;
  dashed?: boolean;
  active?: boolean;
  arrow?: boolean;
  label?: string;
  markerId?: string;
  strokeWidth?: number;
  opacity?: number;
};

export type DiagramPoint = {
  x: number;
  y: number;
};

export type DiagramNodeBounds = {
  x: number;
  y: number;
  width?: number;
  height?: number;
};

export type DiagramAnchorSide = 'auto' | 'top' | 'right' | 'bottom' | 'left' | 'center';

const connectorPath = (from: DiagramConnectorProps['from'], to: DiagramConnectorProps['to'], kind: NonNullable<DiagramConnectorProps['kind']>): string => {
  if (kind === 'curve') {
    const dx = Math.abs(to.x - from.x) * 0.46;
    return `M ${from.x} ${from.y} C ${from.x + dx} ${from.y} ${to.x - dx} ${to.y} ${to.x} ${to.y}`;
  }

  if (kind === 'elbow') {
    const midX = from.x + (to.x - from.x) / 2;
    return `M ${from.x} ${from.y} H ${midX} V ${to.y} H ${to.x}`;
  }

  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
};

export const DiagramConnector: React.FC<DiagramConnectorProps> = ({
  from,
  to,
  kind = 'straight',
  tone = 'muted',
  dashed = false,
  active = false,
  arrow = true,
  label,
  markerId,
  strokeWidth = architectureDiagramStyleGuide.connector.strokeWidth,
  opacity = 1,
}) => {
  const connectorTone = active ? 'accent' : tone;
  const color = toneToColor(connectorTone, architectureDiagramTheme.muted);
  const resolvedMarkerId = markerId ?? architectureDiagramArrowMarkerIds[connectorTone];
  const path = connectorPath(from, to, kind);
  const midX = from.x + (to.x - from.x) / 2;
  const midY = from.y + (to.y - from.y) / 2;

  return (
    <g opacity={opacity}>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashed ? architectureDiagramStyleGuide.connector.dashArray : undefined}
        markerEnd={arrow ? `url(#${resolvedMarkerId})` : undefined}
      />
      {label ? (
        <g>
          <rect
            x={midX - architectureDiagramStyleGuide.connector.labelWidth / 2}
            y={midY - 19}
            width={architectureDiagramStyleGuide.connector.labelWidth}
            height={architectureDiagramStyleGuide.connector.labelHeight}
            rx={architectureDiagramStyleGuide.connector.labelRadius}
            fill={architectureDiagramTheme.background}
            stroke={color}
            strokeWidth="2"
          />
          <text
            x={midX}
            y={midY + 2}
            fill={color}
            fontFamily={architectureDiagramStyleGuide.typography.family}
            fontSize={architectureDiagramStyleGuide.typography.connectorLabelSize}
            fontWeight="800"
            textAnchor="middle"
          >
            {label}
          </text>
        </g>
      ) : null}
    </g>
  );
};

const concreteAutoSides = (fromNode: Required<DiagramNodeBounds>, toNode: Required<DiagramNodeBounds>): {fromSide: Exclude<DiagramAnchorSide, 'auto'>; toSide: Exclude<DiagramAnchorSide, 'auto'>} => {
  const dx = toNode.x - fromNode.x;
  const dy = toNode.y - fromNode.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0 ? {fromSide: 'right', toSide: 'left'} : {fromSide: 'left', toSide: 'right'};
  }

  return dy >= 0 ? {fromSide: 'bottom', toSide: 'top'} : {fromSide: 'top', toSide: 'bottom'};
};

export const resolveDiagramNodeBounds = (node: DiagramNodeBounds): Required<DiagramNodeBounds> => ({
  x: node.x,
  y: node.y,
  width: node.width ?? architectureDiagramStyleGuide.node.width,
  height: node.height ?? architectureDiagramStyleGuide.node.height,
});

export const getDiagramNodeAnchorPoint = (
  node: DiagramNodeBounds,
  side: Exclude<DiagramAnchorSide, 'auto'>,
  offset = 0,
  gap = 0,
): DiagramPoint => {
  const bounds = resolveDiagramNodeBounds(node);

  if (side === 'right') {
    return {x: bounds.x + bounds.width / 2 + gap, y: bounds.y + offset};
  }

  if (side === 'left') {
    return {x: bounds.x - bounds.width / 2 - gap, y: bounds.y + offset};
  }

  if (side === 'top') {
    return {x: bounds.x + offset, y: bounds.y - bounds.height / 2 - gap};
  }

  if (side === 'bottom') {
    return {x: bounds.x + offset, y: bounds.y + bounds.height / 2 + gap};
  }

  return {x: bounds.x, y: bounds.y};
};

export type DiagramNodeConnectorProps = Omit<DiagramConnectorProps, 'from' | 'to'> & {
  fromNode: DiagramNodeBounds;
  toNode: DiagramNodeBounds;
  fromSide?: DiagramAnchorSide;
  toSide?: DiagramAnchorSide;
  fromOffset?: number;
  toOffset?: number;
  gap?: number;
};

export const getDiagramNodeConnectorPoints = ({
  fromNode,
  toNode,
  fromSide = 'auto',
  toSide = 'auto',
  fromOffset = 0,
  toOffset = 0,
  gap = 0,
}: Pick<DiagramNodeConnectorProps, 'fromNode' | 'toNode' | 'fromSide' | 'toSide' | 'fromOffset' | 'toOffset' | 'gap'>): {
  from: DiagramPoint;
  to: DiagramPoint;
  fromSide: Exclude<DiagramAnchorSide, 'auto'>;
  toSide: Exclude<DiagramAnchorSide, 'auto'>;
} => {
  const resolvedFromNode = resolveDiagramNodeBounds(fromNode);
  const resolvedToNode = resolveDiagramNodeBounds(toNode);
  const autoSides = concreteAutoSides(resolvedFromNode, resolvedToNode);
  const resolvedFromSide = fromSide === 'auto' ? autoSides.fromSide : fromSide;
  const resolvedToSide = toSide === 'auto' ? autoSides.toSide : toSide;

  return {
    from: getDiagramNodeAnchorPoint(resolvedFromNode, resolvedFromSide, fromOffset, gap),
    to: getDiagramNodeAnchorPoint(resolvedToNode, resolvedToSide, toOffset, gap),
    fromSide: resolvedFromSide,
    toSide: resolvedToSide,
  };
};

export const DiagramNodeConnector: React.FC<DiagramNodeConnectorProps> = ({
  fromNode,
  toNode,
  fromSide = 'auto',
  toSide = 'auto',
  fromOffset = 0,
  toOffset = 0,
  gap = 0,
  ...connectorProps
}) => {
  const {from, to} = getDiagramNodeConnectorPoints({fromNode, toNode, fromSide, toSide, fromOffset, toOffset, gap});

  return <DiagramConnector from={from} to={to} {...connectorProps} />;
};

export type ArchitectureNodeStatus = 'neutral' | 'active' | 'healthy' | 'warning' | 'critical' | 'muted';

export type ArchitectureNodeProps = {
  x: number;
  y: number;
  label: string;
  icon: ArchitectureIconName;
  subLabel?: string;
  width?: number;
  height?: number;
  iconSize?: number;
  status?: ArchitectureNodeStatus;
  stroke?: string;
  accent?: string;
  fill?: string;
};

const statusTone = (status: ArchitectureNodeStatus): ArchitectureDiagramTone => {
  if (status === 'active') {
    return 'accent';
  }

  if (status === 'healthy') {
    return 'success';
  }

  if (status === 'warning') {
    return 'warning';
  }

  if (status === 'critical') {
    return 'danger';
  }

  if (status === 'muted') {
    return 'muted';
  }

  return 'default';
};

const splitLabel = (label: string): string[] => {
  if (label.length <= 16 || !label.includes(' ')) {
    return [label];
  }

  const words = label.split(' ');
  const lines: string[] = [];
  let current = '';

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 16 && lines.length < 1) {
      lines.push(current);
      current = word;
      return;
    }

    current = next;
  });

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 2);
};

export const ArchitectureNode: React.FC<ArchitectureNodeProps> = ({
  x,
  y,
  label,
  icon,
  subLabel,
  width = architectureDiagramStyleGuide.node.width,
  height = architectureDiagramStyleGuide.node.height,
  iconSize = architectureDiagramStyleGuide.node.iconSize,
  status = 'neutral',
  stroke,
  accent = architectureDiagramTheme.accent,
  fill = architectureDiagramTheme.panel,
}) => {
  const tone = statusTone(status);
  const border = stroke ?? toneToColor(tone, architectureDiagramTheme.stroke);
  const opacity = status === 'muted' ? 0.58 : 1;
  const labelLines = splitLabel(label);

  return (
    <g transform={`translate(${x - width / 2} ${y - height / 2})`} opacity={opacity}>
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx={architectureDiagramStyleGuide.node.cornerRadius}
        fill={fill}
        stroke={border}
        strokeWidth={architectureDiagramStyleGuide.node.strokeWidth}
      />
      <ArchitectureIconGlyph name={icon} x={width / 2} y={42} size={iconSize} stroke={architectureDiagramTheme.stroke} accent={accent} />
      {labelLines.map((line, index) => (
        <text
          key={line}
          x={width / 2}
          y={92 + index * 20}
          fill={architectureDiagramTheme.stroke}
          fontFamily={architectureDiagramStyleGuide.typography.family}
          fontSize={architectureDiagramStyleGuide.typography.nodeLabelSize}
          fontWeight="800"
          textAnchor="middle"
        >
          {line}
        </text>
      ))}
      {subLabel ? (
        <text
          x={width / 2}
          y={height - 15}
          fill={architectureDiagramTheme.muted}
          fontFamily={architectureDiagramStyleGuide.typography.monoFamily}
          fontSize={architectureDiagramStyleGuide.typography.nodeSubLabelSize}
          fontWeight="700"
          textAnchor="middle"
        >
          {subLabel}
        </text>
      ) : null}
    </g>
  );
};

export type DiagramBadgeProps = {
  x: number;
  y: number;
  label: string;
  tone?: ArchitectureDiagramTone;
  width?: number;
};

export const DiagramBadge: React.FC<DiagramBadgeProps> = ({x, y, label, tone = 'accent', width = 148}) => {
  const color = toneToColor(tone);

  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - 17}
        width={width}
        height={architectureDiagramStyleGuide.badge.height}
        rx={architectureDiagramStyleGuide.badge.radius}
        fill={`${color}20`}
        stroke={color}
        strokeWidth={architectureDiagramStyleGuide.badge.strokeWidth}
      />
      <text
        x={x}
        y={y + 6}
        fill={color}
        fontFamily={architectureDiagramStyleGuide.typography.family}
        fontSize={architectureDiagramStyleGuide.typography.badgeLabelSize}
        fontWeight="800"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
};

export type ArchitectureFlowExampleProps = {
  title?: string;
};

export const ArchitectureFlowExample: React.FC<ArchitectureFlowExampleProps> = ({title = 'Reusable architecture diagram components'}) => (
  <ArchitectureDiagramCanvas aria-label={title}>
    <text x="690" y="64" fill={architectureDiagramTheme.stroke} fontFamily="Arial, sans-serif" fontSize="34" fontWeight="900" textAnchor="middle">
      {title}
    </text>
    <DiagramNodeConnector fromNode={{x: 150, y: 274}} toNode={{x: 514, y: 274}} active label="HTTPS" />
    <DiagramNodeConnector fromNode={{x: 514, y: 274}} toNode={{x: 874, y: 274}} active label="API" />
    <DiagramNodeConnector fromNode={{x: 874, y: 274}} toNode={{x: 1234, y: 274}} tone="success" label="replicate" />
    <ArchitectureNode x={150} y={274} label="Users" icon="users" status="active" />
    <ArchitectureNode x={514} y={274} label="Web API" icon="apiGear" status="healthy" />
    <ArchitectureNode x={874} y={274} label="Primary DB" icon="database" status="healthy" />
    <ArchitectureNode x={1234} y={274} label="Replica DB" icon="databaseSync" status="muted" />
    <DiagramBadge x={874} y={404} label="PRIMARY" tone="success" width={130} />
    <DiagramBadge x={1234} y={404} label="STANDBY" tone="muted" width={130} />
  </ArchitectureDiagramCanvas>
);
