# Architecture Diagram Library

Reusable inline-SVG components for architecture visuals in Remotion videos.

Everything in this folder is self-contained and does not depend on `src/style.css`. The default visual language matches the black, white, and yellow reference: high-contrast line icons, simple panels, badges, and connectors.

For consistent scene design, follow [STYLE_GUIDELINES.md](./STYLE_GUIDELINES.md). The code-level defaults live in `architectureDiagramStyleGuide` from `theme.ts`.

## Import

```tsx
import {
  ArchitectureDiagramCanvas,
  ArchitectureIcon,
  ArchitectureIconGallery,
  ArchitectureNode,
  DiagramNodeConnector,
} from '../../architecture-diagram-library';
```

## Standalone icon

```tsx
<ArchitectureIcon name="serverStack" size={96} showBackground />
```

## Icon inside a video scene SVG

```tsx
<ArchitectureDiagramCanvas aria-label="API to database flow">
  <ArchitectureNode x={160} y={260} label="Users" icon="users" status="active" />
  <ArchitectureNode x={610} y={260} label="API" icon="apiGear" status="healthy" />
  <DiagramNodeConnector fromNode={{x: 160, y: 260}} toNode={{x: 610, y: 260}} active label="request" />
</ArchitectureDiagramCanvas>
```

Use `DiagramNodeConnector` for node-to-node links. It calculates the source and target edge points from node center, size, side, and optional offset, so arrowheads land on the node border instead of requiring manual endpoint math.

## Preview all icons

```tsx
<ArchitectureIconGallery showLabels />
```

## Available icons

`users`, `graph`, `serverStack`, `database`, `cloud`, `shieldCheck`, `growthChart`, `clock`, `globe`, `networkTree`, `hexCluster`, `browserCode`, `gear`, `laptopCode`, `phoneCode`, `apiGear`, `braces`, `puzzle`, `tag`, `search`, `document`, `checklist`, `folder`, `calendar`, `bell`, `warning`, `databaseSync`, `databaseFlow`, `cloudUpload`, `downloadTray`, `storage`, `firewall`, `key`, `lock`, `flowSteps`, `queue`, `gitBranch`, `codeLoop`, `infinityLoop`, `cube`, `rocket`, `target`, `sortArrows`, `gauge`, `scales`, `eye`, `bug`, `wrench`, `screwdriver`, `codeBubble`, `terminal`, `heartbeat`, `monitorMetrics`, `alertGauge`, `cloudWarning`, `serverFire`, `power`, `plug`, `brokenLink`, `umbrella`, `teamOps`, `handshake`, `brain`, `lightbulb`, `graduationCap`, `book`, `chartWindow`, `trophy`, `mountainFlag`, `paperPlane`, `compass`, `signpost`, `mapPin`, `binoculars`, `telescope`, `puzzleFit`, `crown`, `star`.
