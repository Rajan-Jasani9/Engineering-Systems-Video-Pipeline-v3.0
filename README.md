# Engineering Systems Kinetic Video

Automated Remotion pipeline for a black-and-white professor-style explainer. The video is driven by an accurate word-by-word SRT plus a timed lesson plan, so visuals change with the meaning of the transcript instead of only reading captions.

## Project Structure

```text
public/audio/consistency-in-practice.mp3  Source narration audio
scripts/extract-words.mjs                 Converts slide JSON or SRT into word timings
src/videos/index.ts                       Registry of all renderable videos
src/videos/<slug>/words.json              Per-video word timing JSON
src/videos/<slug>/lessonPlan.ts           Per-video timed teaching slide flow
src/index.tsx                             Remotion root registration entry
src/Root.tsx                              Multi-composition registration and dynamic duration
src/MainVideo.tsx                         Audio, background, diagram, and chunk orchestration
src/utils/chunker.ts                      4-6 word phrase chunking with gap/length boundaries
src/components/WordChunk.tsx              Active phrase layout and entrance spring
src/components/Word.tsx                   Karaoke states and active word pop animation
src/components/DoodleBackground.tsx       Monochrome system-design doodle layer
src/style.css                             Black-and-white visual system
VISUAL_GUIDE.md                           Series-wide production guide for future videos
VISUAL_LAYOUT_CATALOG.md                  Reusable future layout names and primitives
VIDEO_STYLE_PROMPT.md                     Visual prompt for generated diagrams/assets
ARCHITECTURE_DIAGRAM_GUIDELINES.md        Reference-frame rules for architecture diagrams
```

## Commands

```bash
npm run extract:words -- path/to/transcript.srt src/videos/<slug>/words.json
npm run dev
npm run typecheck
npm run check:pacing
npm run render
npm run render:consistency
npm run render:consistency:gpu
```

Each video is registered in `src/videos/index.ts` and gets its own Remotion composition ID. The current composition is `ConsistencyInPractice`, rendered by default to `out/videos/consistency-in-practice.mp4`. Older rendered MP4s stay wherever they already exist unless the same output path is reused.

To add another video:

1. Read `VISUAL_GUIDE.md` so the video keeps the same series language.
2. Read `ARCHITECTURE_DIAGRAM_GUIDELINES.md` before creating system architecture scenes.
3. Use `VISUAL_LAYOUT_CATALOG.md` to pick reusable future layout kinds when a generic layout fits.
4. Create `src/videos/<new-topic-slug>/lessonPlan.ts`.
5. Generate `src/videos/<new-topic-slug>/words.json` with `npm run extract:words -- <input.srt> src/videos/<new-topic-slug>/words.json`.
6. Add the video to `src/videos/index.ts` with a unique `id`, `slug`, audio path, words, and lesson plan.
7. Add a render script in `package.json`, for example `render:availability`.

## Scene Pacing Rule

Primary rule: change the visual whenever the explanation introduces a new idea.

Secondary rule: never leave the screen visually unchanged for more than 8-12 seconds. The pacing checker warns for scenes above 8 seconds and fails for scenes above 12 seconds.

For a typical 7-8 minute video with about 900-1100 words, plan for 8-12 major concepts and roughly 40-70 visual scenes. Prefer splitting a long concept into two related visuals over holding the same board while the narration keeps moving.

## Inputs

The extractor accepts either:

- a JSON object with a `words` array containing `{text,start,end}` values in seconds
- the provided slide JSON format with `slides[].bindings[].tokens[]`
- a plain SRT file, using cue timing directly; the current pipeline uses the word-by-word `Consistency in Practice (2).srt`

Studio preview can stutter if the machine is overloaded. The render path now only mounts the active transcript chunk and keeps the doodle background static/faint to reduce preview workload.
