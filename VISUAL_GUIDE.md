# Engineering Systems Visual Guide

Read this before creating any new video in this project. The goal is for every topic to feel like part of the same Engineering Systems series, even when the lesson plan, examples, and diagrams change.

## Core Identity

The series is a black-and-white engineering whiteboard explainer. It should feel like a senior engineer is teaching system design on a dark chalkboard with animated diagrams, bold cards, and karaoke captions.

Do not make a new visual theme per video. Reuse the shared renderer, CSS language, captions, background, card system, icon strategy, and closing style unless the user explicitly asks for a series-wide redesign.

## Non-Negotiables

- Use a strict monochrome palette: black, white, and translucent grays only.
- Avoid color accents, gradients, beige themes, purple/blue themes, and decorative blobs.
- Use `lucide-react` icons for system objects and UI-like symbols.
- Keep cards at `8px` border radius or less.
- Keep typography bold, uppercase, and high-contrast.
- Do not leave any visual scene unchanged for more than 12 seconds.
- Prefer changing visuals at every new idea, even if the narration is still in the same section.
- Keep the live word captions unless a specific scene intentionally suppresses them, such as the closing slide.

## Project Structure For New Videos

Each video gets its own folder:

```text
src/videos/<topic-slug>/
  lessonPlan.ts
  words.json
```

Register each video in:

```text
src/videos/index.ts
```

The shared visual system lives in:

```text
src/components/LessonVisuals.tsx
src/components/DoodleBackground.tsx
src/components/WordChunk.tsx
src/components/Word.tsx
src/style.css
```

When adding topic-specific visuals, add new `VisualKind` values in `src/types.ts`, new render cases in `LessonVisuals.tsx`, and scoped CSS classes in `src/style.css`.

## Layout System

Canvas:

- Remotion composition is `1920x1080`.
- Main lesson layer uses `padding: 78px 96px 180px`.
- Captions sit in the lower content layer and need clear space.
- Avoid placing important visual content in the bottom 120px because captions can overlap it.

Header:

- Centered at top.
- Title: big uppercase, usually `60px`, very heavy weight.
- Subtitle: centered, around `25px`, high contrast but slightly dimmer.
- Keep title/subtitle short. If the idea is complex, put the detail in the visual or takeaway.

Body:

- Centered by default.
- Use grids, cards, diagrams, rows, timelines, and spectrum boards.
- Keep the main visual dense enough to teach, but not so detailed that it competes with captions.

Takeaway strip:

- Bottom strip above captions.
- One strong sentence.
- It should reinforce the beat, not introduce another idea.

## Intro Pattern

Start with a simple title card using the existing `intro` visual style:

- Big course/channel identity or topic title.
- One compact subtitle.
- One sentence describing the practical value.
- Use a single white-outlined or white-filled card with a relevant lucide icon.

Good intro shape:

```text
Engineering Systems
<Topic Name>
Practical system design decisions from real production constraints.
```

Avoid a marketing hero, stock image, or decorative landing-page composition.

## Main Scene Patterns

Use these recurring visual types across videos:

- Two-choice contrast: wrong framing vs useful framing.
- Feature map: central product/system with service nodes around it.
- Decision table: question, business impact, chosen model/pattern.
- Timeline: now, later, retry, failover, visible globally.
- Race diagram: multiple users/requests competing for a resource.
- Spectrum: correctness to availability, latency to throughput, consistency to cost.
- Checklist: 3-step or 4-step decision model.
- Comparison matrix: subtle table for trade-offs, pros/cons, option scoring, or constraint comparison.
- System flow: API, queue, worker, database, cache, region.
- Failure path: detect, reroute, retry, recover.
- Recap bridge: current topic connected to the next topic.

When a beat lasts too long, split it into a companion scene:

- First scene introduces the concept.
- Second scene shows the consequence, example, or decision rule.

Reusable comparison matrix:

- Use when the lesson needs a compact comparison across multiple dimensions.
- It can be a trade-off table, pros/cons table, decision matrix, or lightweight scoring grid.
- Keep it subtle: thin white grid lines, black background, one highlighted row or column, and short cell labels.
- Avoid filling every cell with full sentences. Prefer terse labels like `fast`, `costly`, `simple`, `risky`, `strong`, or `best for reads`.
- Good fits: sync vs async, cache vs database, single region vs multi-region, redundancy vs replication vs failover, or pros/cons of a design choice.
- Do not use it by default. Use it only when comparison is clearer than a diagram, flow, or checklist.

## Pacing Rule

Primary rule: change the visual whenever the explanation introduces a new idea.

Secondary rule: never leave the screen visually unchanged for more than 8-12 seconds.

For a 7-8 minute video with about 900-1100 words:

- Major concepts: 8-12
- Visual scenes: 40-70

Run:

```bash
npm run check:pacing
```

The checker warns above `8s` and fails above `12s`.

## Typography

Use the existing CSS style:

- Font: `Inter, ui-sans-serif, system-ui`.
- Most text is uppercase.
- Font weight is usually `800-950`.
- No negative letter spacing.
- Title text should be large only in headers or large teaching cards.
- Compact cards should use smaller headings, usually `30-48px`.

Common sizes:

- Header title: `60px`
- Header subtitle: `25px`
- Large card heading: `62-78px`
- Normal card heading: `38-48px`
- Card body: `22-30px`
- Captions: `clamp(22px, 1.9vw, 34px)`

## Card Language

Default cards:

- Black fill: `rgba(0, 0, 0, 0.82)`
- White border: `3-4px`
- Border radius: `8px`
- Offset shadow: white at low opacity

Inverted cards:

- White fill.
- Black text.
- Use for emphasis, active states, selected choices, or key contrast.

Do not nest cards inside cards. Do not use floating page-section cards. Cards are for individual visual objects, choices, rows, modals, and teaching units.

## Background

Use `DoodleBackground` as the persistent visual foundation:

- Matte black radial/linear background.
- Faint grid.
- Dashed hand-drawn paths.
- Doodle boxes.
- Low-opacity lucide-style system labels.

Existing background labels include:

```text
API, DB, REGION, SAGA, CACHE, QUEUE, FANOUT, WORKER, IDEMPOTENT, RETRY
```

For a new topic, you may update or add background labels only if they are broadly useful across the series. Keep them faint and supportive, never primary.

## Icon Strategy

Use `lucide-react` icons. Prefer existing system-oriented icons:

```text
Server, Database, Cloud, Globe, GitBranch, Workflow, Boxes,
Cpu, ShieldCheck, RefreshCw, MessageSquare, ShoppingCart,
PackageCheck, LineChart, Clock, LockKeyhole, UserCheck,
CheckCircle2, XCircle, Scale, Layers3
```

Pick icons semantically:

- `Server`: services, APIs, backend nodes.
- `Database`: state, storage, durability.
- `Workflow` or `GitBranch`: flows, ordering, branching, sagas.
- `Globe` or `Cloud`: regions, global systems, availability.
- `Clock`: latency, delay, freshness.
- `ShieldCheck` or `LockKeyhole`: correctness, safety, guarantees.
- `CheckCircle2` and `XCircle`: success/failure, accept/reject.

Do not hand-draw SVG icons when lucide has a good match.

## Karaoke Caption Strategy

Captions are part of the visual brand:

- Chunk captions into short 4-6 word phrases.
- Unspoken words are gray.
- Spoken words are white.
- Active word is inverted: black text on a white sticker.
- Captions live near the bottom center.

Do not cover the caption area with important visuals. If a scene needs the bottom area, suppress captions only for a deliberate special case.

Closing slides suppress captions so the outro CTA remains clean.

## Outro Pattern

Use the black-theme closing. It should not become a separate white slide.

Layout:

- Same black doodle background.
- Content vertically centered.
- Content anchored to the left half.
- Right half remains open visual breathing room.

Text:

```text
Thanks for Watching!

Please like & Subscribe to Engineering Systems
(it motivates us to create more such content)
for more such System Design Deep Dives
```

Controls:

- Subscribe pill with bell icon.
- Like circle with thumbs-up icon.
- Monochrome only.

## Generated Images And Assets

Most scenes should be built with React, CSS, lucide icons, SVG paths, and simple data-driven layouts. Generate bitmap images only when the subject benefits from a specific illustration, texture, object, screenshot-like mockup, or diagram that would take too long to build in code.

If image generation is used:

- Keep it monochrome.
- Use a blackboard/whiteboard engineering-sketch look.
- Avoid realistic stock photos.
- Avoid colorful illustrations.
- Avoid dark blurred atmospheric images.
- Make generated assets support the diagram, not replace the teaching visual.

Use `VIDEO_STYLE_PROMPT.md` as the base image-generation prompt.

## Lesson Plan Authoring

Each `LessonBeat` should have:

- `id`: stable slug.
- `kind`: visual component type.
- `start` and `end`: seconds aligned to transcript/audio.
- `title`: short header.
- `subtitle`: what the viewer should understand now.
- `takeaway`: bottom-strip reinforcement.

Beat design:

- One beat equals one visual idea.
- If a beat explains setup and consequence, split it.
- If a beat explains rule and example, split it.
- If a beat explains problem and solution, split it.

## QA Checklist

Before finishing a new video:

```bash
npm run typecheck
npm run check:pacing
```

Render representative stills:

- Intro.
- One early concept scene.
- One dense diagram scene.
- One table/checklist scene.
- One scene near the end.
- Closing.

Visually check:

- No text clipping.
- No captions covering critical visuals.
- No scene above 12 seconds.
- No white outro unless explicitly requested.
- Icons are recognizable.
- Right/left visual balance feels intentional.
- The video still looks like the existing Engineering Systems series.
