import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
  ArchitectureDiagramCanvas,
  ArchitectureIconGlyph,
  ArchitectureNode,
  DiagramBadge,
  DiagramNodeConnector,
  architectureDiagramTheme,
} from './architecture-diagram-library';

const Label = ({
  x,
  y,
  children,
  size = 24,
  fill = architectureDiagramTheme.stroke,
  anchor = 'middle',
  weight = 800,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: number;
}) => (
  <text x={x} y={y} fill={fill} fontFamily="Arial, sans-serif" fontSize={size} fontWeight={weight} textAnchor={anchor}>
    {children}
  </text>
);

export const ArchitectureDiagramLibraryPreview: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: architectureDiagramTheme.background}}>
    <ArchitectureDiagramCanvas width={1920} height={1080} aria-label="FoodDash production architecture diagram">
      <Label x={960} y={92} size={48} weight={900}>
        FoodDash Production Architecture
      </Label>
      <Label x={960} y={132} size={22} fill={architectureDiagramTheme.muted}>
        reusable nodes, connectors, badges, and line icons from the architecture diagram library
      </Label>

      <DiagramNodeConnector fromNode={{x: 164, y: 292}} toNode={{x: 522, y: 292}} active label="HTTPS" />
      <DiagramNodeConnector fromNode={{x: 522, y: 292}} toNode={{x: 878, y: 292}} active label="route" />
      <DiagramNodeConnector fromNode={{x: 878, y: 292}} toNode={{x: 1236, y: 292}} tone="info" label="RPC" />
      <DiagramNodeConnector fromNode={{x: 1236, y: 292}} toNode={{x: 1594, y: 292}} tone="success" label="write" />
      <DiagramNodeConnector fromNode={{x: 1236, y: 292}} toNode={{x: 1236, y: 635}} kind="elbow" fromSide="bottom" toSide="top" tone="accent" label="jobs" />
      <DiagramNodeConnector fromNode={{x: 1236, y: 635}} toNode={{x: 1594, y: 635}} tone="success" label="read" />
      <DiagramNodeConnector fromNode={{x: 878, y: 292}} toNode={{x: 872, y: 635}} kind="elbow" fromSide="bottom" toSide="top" tone="info" label="events" />
      <DiagramNodeConnector fromNode={{x: 872, y: 635}} toNode={{x: 1236, y: 635}} tone="accent" label="queue" />
      <DiagramNodeConnector
        fromNode={{x: 1236, y: 635}}
        toNode={{x: 960, y: 850, width: 1438, height: 180}}
        kind="elbow"
        fromSide="bottom"
        toSide="top"
        tone="warning"
        dashed
        opacity={0.38}
      />

      <ArchitectureNode x={164} y={292} label="Customers" icon="users" status="active" subLabel="mobile + web" />
      <ArchitectureNode x={522} y={292} label="Edge CDN" icon="globe" status="healthy" subLabel="global ingress" />
      <ArchitectureNode x={878} y={292} label="API Gateway" icon="apiGear" status="healthy" subLabel="auth + routing" />
      <ArchitectureNode x={1236} y={292} label="Order Service" icon="serverStack" status="healthy" subLabel="stateless pool" />
      <ArchitectureNode x={1594} y={292} label="Primary DB" icon="database" status="healthy" subLabel="orders" />

      <ArchitectureNode x={872} y={635} label="Event Stream" icon="queue" status="active" subLabel="append log" />
      <ArchitectureNode x={1236} y={635} label="Worker Pool" icon="gear" status="healthy" subLabel="async tasks" />
      <ArchitectureNode x={1594} y={635} label="Read Replica" icon="databaseSync" status="muted" subLabel="analytics" />

      <ArchitectureNode x={522} y={635} label="Cache Layer" icon="storage" status="warning" subLabel="hot menus" />
      <DiagramNodeConnector fromNode={{x: 878, y: 292}} toNode={{x: 522, y: 635}} kind="curve" tone="warning" dashed label="cache" />
      <DiagramNodeConnector fromNode={{x: 522, y: 635}} toNode={{x: 878, y: 292}} kind="curve" tone="warning" dashed arrow={false} />

      <g transform="translate(241 760)">
        <rect x="0" y="0" width="1438" height="180" rx="10" fill={architectureDiagramTheme.panel} stroke={architectureDiagramTheme.muted} strokeWidth="2.5" opacity="0.92" />
        <Label x={42} y={46} anchor="start" size={22} fill={architectureDiagramTheme.muted}>
          platform controls
        </Label>
        <ArchitectureIconGlyph name="shieldCheck" x={170} y={108} size={62} />
        <Label x={236} y={115} anchor="start" size={22}>
          WAF + auth policy
        </Label>
        <ArchitectureIconGlyph name="monitorMetrics" x={585} y={108} size={62} accent={architectureDiagramTheme.info} />
        <Label x={651} y={115} anchor="start" size={22}>
          health checks + SLOs
        </Label>
        <ArchitectureIconGlyph name="bell" x={1010} y={108} size={62} accent={architectureDiagramTheme.warning} />
        <Label x={1076} y={115} anchor="start" size={22}>
          on-call alerting
        </Label>
      </g>

      <DiagramBadge x={522} y={410} label="LOW LATENCY" tone="warning" width={160} />
      <DiagramBadge x={878} y={410} label="AUTHENTICATED" tone="info" width={180} />
      <DiagramBadge x={1236} y={410} label="AUTO-SCALE" tone="success" width={160} />
      <DiagramBadge x={1594} y={410} label="PRIMARY" tone="success" width={130} />
      <DiagramBadge x={1594} y={724} label="STANDBY" tone="muted" width={130} />
    </ArchitectureDiagramCanvas>
  </AbsoluteFill>
);
