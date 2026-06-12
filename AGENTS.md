# AGENTS.md

## Type Checking
- Run `npm run typecheck` (which runs `tsc --noEmit`) before and after any TypeScript changes.

## CSS
- The `hc2-*` CSS classes in `src/style.css` are for the SVG-based Health Checks video scenes.
- Only `.hc2-stage`, `.hc2-stage-label`, `.hc2-wire-svg`, and `.hc2-section-card` are used.
- All visual styling is done via inline SVG attributes (fill, stroke, etc.), not CSS.
