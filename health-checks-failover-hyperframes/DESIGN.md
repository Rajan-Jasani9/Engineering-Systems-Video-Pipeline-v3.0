# Health Checks & Failover - Design System

## Style Prompt

Create a premium animated system-design whiteboard on a matte black engineering surface. The viewer should feel a FoodDash outage unfold in one connected incident world: live users, app/API tier, primary database, replica database, load balancer, probes, alerts, regional routing, and recovery drills. Motion is deterministic and precise: packets flow, probes scan, failing paths snap into dashed gray, promoted nodes invert, counters accumulate tension, and the camera gently pushes or reframes as the narration advances.

## Colors

- Canvas: `#050505`
- Panel black: `#0b0b0b`
- Primary white: `#f4f4f4`
- Ink white: `rgba(255,255,255,0.88)`
- Muted line: `rgba(255,255,255,0.68)`
- Faint grid: `rgba(255,255,255,0.08)`
- Disabled state: `rgba(255,255,255,0.16)`
- Caption gray: `rgba(255,255,255,0.58)`

Only black, white, and translucent grays are allowed. No hue accents, gradients, stock imagery, colored status indicators, or decorative blobs.

## Typography

- Display voice: `Archivo Black`, fallback `Arial Black`, sans-serif.
- Technical/data voice: `JetBrains Mono`, fallback `Consolas`, monospace.
- Text is mostly uppercase in diagrams and labels.
- Use tabular numbers for timers, counters, and uptime values.
- No negative letter spacing. Keep labels readable at video resolution.

## Layout

- 1920 x 1080 landscape.
- Main visual safe area: top `70px`, sides `96px`, bottom `230px`.
- Captions are bottom center in the bottom `170px` and must never cover critical state.
- Each major sequence has one dominant visual idea, but system nodes can persist across sections.
- Cards are used only for concrete UI panels, incident logs, and repeated nodes. No nested cards.

## Motion

- Use GSAP timelines only. No random or time-based motion.
- Primary transition: restrained focus-push/crossfade between major sequences.
- Packets move continuously with finite repeats calculated from the project duration.
- Failed links dim, dash, and desaturate by opacity only.
- Promotions invert from black node to white node.
- Camera movement is gentle: 2-6% scale, 40-140px pans, short reveal holds.

## What NOT To Do

- Do not build title/subtitle/card/arrow/card slide stacks.
- Do not reset the entire architecture every few seconds.
- Do not use blue, green, red, purple, beige, gradients, or decorative blob backgrounds.
- Do not explain only with labels; every major spoken idea must change system state.
- Do not put important diagrams in the caption zone.
