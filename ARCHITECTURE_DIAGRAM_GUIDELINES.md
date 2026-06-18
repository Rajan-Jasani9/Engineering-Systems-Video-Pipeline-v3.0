# Architecture Diagram Guidelines

Use these rules for architecture diagrams in future Engineering Systems videos. The reference style is the Famous Nines "Expensive Improvements" frame: monochrome system-map cards, hard orthogonal wires, a top callout, and a bottom progression rail.

## Scene Frame

- Build diagrams inside a `1380 x 548` stage so they fit the standard lesson body.
- Use a dark grid background with faint system doodles behind it.
- Do not render tiny scene/category tags such as `availability targets`, `stakeholder pressure`, or `cost of perfection`; the main title, top note, and bottom rail should carry that context.
- Put the main message in a white or black `BigNote` near the top of the stage, usually around `y = 18`.
- Put progression/state chips in a bottom `StepRail`, usually around `y = 462`.

## Cards And Nodes

- Use rectangular cards with an `8px` radius, not large rounded pills.
- Active cards use white fill, black text, a `4px` white border, and an offset white shadow.
- Inactive cards use near-black fill, muted white border, and reduced opacity.
- Keep cards short: one icon, one strong uppercase label, and one optional small uppercase sublabel.
- Prefer 5 to 8 meaningful nodes per scene. Split crowded systems across beats.
- Use lucide icons when the diagram is built in React.

## Wires And Motion

- Draw wires behind cards.
- Use orthogonal horizontal/vertical segments for architecture paths. Avoid diagonal connector clutter.
- Use a `5px` white active wire and a `3px` muted wire.
- Decide per beat whether wires are static or animated.
- Keep wires static for relationship diagrams, stakeholder maps, ownership diagrams, dependency maps, stable topology, and business trade-off boards.
- Use a small white packet dot with a black outline only when the beat is about moving traffic, request routing, replication, retry, failover, or work moving between components.
- If traffic is animated, animate only the active explanation path. Do not animate every wire at once.
- Keep arrows optional. Direction can come from layout, labels, or moving packets when packets are useful.

## Layout

- Primary request flow moves left to right: users, routing, compute, state, operations or regions.
- Put redundant servers in a vertical stack.
- Put replicated state and failover controls to the right of compute.
- Put regions or zones at the far right.
- Put business/decision comparisons in two region groups with internal mini-architecture flows.

## Implementation Rules

- Prefer the local Famous Nines primitives for this style: `ArchitectureStage`, `CardFrame`, `ArchitectureNode`, `HtmlWire`, `HtmlPacket`, `RegionGroup`, `BigNote`, and `StepRail`.
- Keep visual styling inline in React or inline SVG attributes. Do not add new CSS classes for one-off diagram internals.
- If using the reusable `src/architecture-diagram-library`, match these same layout rules and tokens.
- Run `npm run typecheck` before and after TypeScript changes.

## Quick Checklist

- Stage is `1380 x 548`.
- No tiny scene/category label is visible.
- Top note and bottom rail are present.
- Cards use the monochrome active/inactive treatment.
- Wires are orthogonal and behind nodes.
- Edge motion is intentionally chosen. Static diagrams should not contain packet dots or pulses.
- Text stays inside cards at 1080p.
- The active beat changes a visual state, rail chip, packet path, or highlighted node.
