# Architecture Diagram Styling Guidelines

Use these rules for architecture diagrams in Engineering Systems videos. The goal is a consistent high-contrast visual language that reads clearly in motion and still frames.

## Visual Language

- Use the black, white, and yellow line-art style as the default.
- Use accent yellow for the primary path, active traffic, emphasis, and warning states.
- Use green only for healthy, successful, or promoted states.
- Use blue only for secondary technical paths such as RPC, events, telemetry, or observability.
- Use red only for failures, severed paths, and urgent alerts.
- Keep panels nearly black and avoid CSS styling for SVG diagram internals.

## Canvas

- Default scene canvas: `1380 x 548` for embedded scene visuals.
- Full-frame previews may use `1920 x 1080`, but component proportions should stay the same.
- Use an 8px corner radius on the canvas background.
- Leave breathing room around the edge; do not place nodes closer than 48px to the canvas boundary.

## Nodes

- Default node size: `168 x 140`.
- Default node stroke: `3.2`.
- Default node corner radius: `9`.
- Use one icon, one short label, and optionally one monospace sublabel.
- Keep node labels under two lines. Prefer `API Gateway` over long implementation details.
- Use muted opacity for standby or inactive systems instead of changing the structure.

## Connectors

- Default connector stroke: `3.2`.
- Default arrowheads use `markerUnits="userSpaceOnUse"` so they do not scale into oversized triangles.
- Arrowheads should be small directional cues, not the dominant visual element.
- Arrowheads should match the connector tone.
- Use `DiagramNodeConnector` for all node-to-node links so arrowheads resolve to the target node border.
- Use raw `DiagramConnector` only for free-floating paths, callouts, or non-node shapes.
- Use dashed lines only for optional, degraded, cached, or background paths.
- Label only the connectors that add meaning. Avoid labeling every line.

## Layout

- Place primary request flow left to right.
- Place async/background work on a second row beneath the primary path.
- Place platform controls, monitoring, auth, and policy as a lower band.
- Keep connectors orthogonal or gently curved. Avoid sharp diagonal clutter when nodes are dense.
- Prefer 5 to 8 nodes in a single scene. Split larger systems across multiple beats.

## Typography

- Use Arial for labels and Courier New for machine/state sublabels.
- Use bold labels for scanability.
- Do not use decorative text effects.
- Keep text inside nodes stable and readable at 1080p.

## Implementation

- Import from `src/architecture-diagram-library`.
- Prefer `ArchitectureDiagramCanvas`, `ArchitectureNode`, `DiagramConnector`, and `DiagramBadge` over ad hoc SVG shapes.
- Shared sizing tokens live in `architectureDiagramStyleGuide` in `theme.ts`.
- Shared colors live in `architectureDiagramTheme` in `theme.ts`.
