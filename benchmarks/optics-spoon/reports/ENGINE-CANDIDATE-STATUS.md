# M1 Candidate Status — The Spoon That Bends

**Snapshot:** 2026-11-26  
**Branch:** `m1/optics-benchmark`  
**Branch HEAD before this report update:** `0a09f2ef4925dcd55734d38a8f455c1a54c0a6b5`  
**Decision status:** OPEN — no master runtime selected.

## Executive status

M1 has one shared story, storyboard, art direction and scientific geometry with three executable candidates. The validator checks six-shot continuity, research-claim references, Snell's law, ray collinearity and Motion Canvas's inclusive time-to-frame conversion.

| Candidate | Verified result | Remaining limitation |
|---|---|---|
| Remotion 4.0.547 | Full silent H.264 film; 1920×1080, 24 fps, 72.000 s, 1,728 frames. Contact sheet and selected 1080p diagram frames reviewed. | Character is a vector blockout; no real VO/SFX/music or synchronized transcript captions; not final artistic quality. |
| Manim CE fork | S04–S05 scientific segment; 1920×1080, 24 fps, 11.625 s. Mathematical layout and contact sheet reviewed. | First reviewed style is inconsistent (black background, serif font, sparse opening); corrected palette/font render is pending. Manim remains a specialist adapter, not a full-film candidate. |
| Motion Canvas 3.17.2 | Editor/dependencies/build/typecheck pass; renderer lifecycle and frame export have been instrumented. Earlier full run returned `RendererResult.Success` at frame 1,728. | Exact 1,728-frame half-open render has not been validated yet. Current CI run is still rendering; no MP4/ffprobe artifact accepted. |

## Shared benchmark contract

- Film: **The Spoon That Bends / Vì sao chiếc thìa trông như bị gãy trong nước?**
- 72 seconds, 1920×1080, 24 fps, 1,728 frames.
- Six stable shots: hook, physical contradiction, optical reveal, refraction, apparent image, resolution.
- Shared storyboard: `benchmarks/optics-spoon/shared/storyboard.json`.
- Shared scientific geometry: `benchmarks/optics-spoon/shared/diagram.json`.
- Shared script, research ledger and style bible live in `benchmarks/optics-spoon/shared/`.
- `tools/validate_benchmark.py` and `tests/test_benchmark.py` enforce story continuity, scientific geometry and the Motion Canvas range boundary.

## Candidate evidence

### Remotion 4.0.547 — full-film candidate

- Pinned versions: Remotion/CLI 4.0.547, React 19.2.0, TypeScript 5.9.3.
- Successful full-film run: [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169).
- Artifact: `m1-remotion-candidate`, digest `sha256:f829285a43711aed3a869bae9d93ede74d37c9561125a510ad2101e673d20b14`.
- ffprobe verified H.264, 1920×1080, progressive, 24/1 fps, exactly 72.000 seconds and 1,728 frames.
- Contact sheet and selected full-resolution frames 1056 and 1248 reviewed. The water/air interface, normal, 40° and 58.9° labels, Snell formula and true/apparent points are legible. The caption-safe-area overlap was corrected by moving the “NƯỚC” label baseline from y=970 to y=820; the current artifact confirms it is no longer covered.
- Remaining: character acting is a simple vector blockout, with limited anticipation, hand/finger articulation, grip continuity and follow-through. The audio and transcript timing gates are not tested.

### Manim CE fork — specialist scientific segment

- Pinned dependency: `Nolane-x/manim` commit `18320e2f0feaf142b2c3a377068ddb44c82fb2a1`; requirements are isolated to the benchmark.
- Successful segment in run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169).
- Artifact: `m1-manim-refraction-segment`, digest `sha256:a2fcf0ddda1cb40eb27bfd877b93be0c2d725d2162fd08926e1765cd416c77e4`.
- Output: 1920×1080, 24 fps, 11.625 seconds; ray, normal, 40°/58.9° angles, backward extension and apparent point are mathematically consistent.
- Visual review found the first version's black background, serif default font and sparse opening inconsistent with the shared style bible.
- Source fix [0a09f2e](https://github.com/Nolane-x/Nolane-video/commit/0a09f2ef4925dcd55734d38a8f455c1a54c0a6b5) applies the shared Deep Ink/Water Slate/Ray Gold palette, DejaVu Sans and a persistent water region from frame zero. Rerender/visual verification is pending in [45849998362](https://github.com/Nolane-x/Nolane-video/actions/runs/45849998362).
- This is a diagram adapter candidate only; do not compare its 11.625-second scope with full-film candidates as though their roles were equal.

### Motion Canvas 3.17.2 — full-film candidate

- Pinned packages: Motion Canvas 3.17.2; Vite 5.4.19; Preact 10.19.2; Playwright 1.56.0; Node 22; Ubuntu 24.04.
- Official editor build and TypeScript check pass. Rendering uses the core MIT image-sequence exporter, then independent FFmpeg. The optional Motion Canvas FFmpeg exporter declares GPLv3 and is excluded.
- Earlier partial renders were caused by automation reading the editor button's `data-rendering` attribute and closing Chromium before the engine was finished. The runner now waits for the engine's `renderer.onFinished` event.
- Run [45840319216](https://github.com/Nolane-x/Nolane-video/actions/runs/45840319216) proved the official renderer can finish with `RendererResult.Success`, `lastFrame: 1728`, and 1,729 PNG exports (frames 0–1,728). The extra frame was the inclusive 72-second boundary.
- Commit `31fd2997dce941be05b089e8066928eebc0f7dd3` sets the final included sample timestamp to `71.95833333333333` s, frame 1,727 at 24 fps.
- Exact-count run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148) was cancelled while its Motion Canvas job remained in the render step. Current run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169) has Remotion and Manim jobs successful; Motion Canvas passed setup/build and was still in its render step as of this snapshot. It has not yet uploaded a candidate MP4.
- The shared validator now calls Motion Canvas's `ceil(seconds × fps)` endpoint conversion and rejects a metadata range that would generate an extra boundary frame. Validator run [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249) passed, and regression-test run [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293) passed.

## Licensing and reuse constraints

- Motion Canvas public packages inspected are MIT-licensed. Its optional GPLv3 FFmpeg exporter remains excluded.
- Manim Community Edition is MIT-licensed; the user fork is pinned for reproducibility.
- Remotion has a two-tier license model; evaluation render evidence does not decide redistribution/commercial embedding rights. Recheck exact terms before product adoption.
- H2 in `Nolane-x/video` has not been copied. Complete a source-provenance/license audit before any reuse.

## What is not complete

- Motion Canvas exact 1,728-frame render, MP4/ffprobe, contact-sheet and continuous-motion review.
- Manim palette/font rerender and review.
- Real Vietnamese narration, synchronized transcript captions, SFX and music; no audio QA has been performed.
- More convincing Nia acting, grip/contact continuity, anticipation and follow-through.
- Full candidate scorecard and written architecture decision.
- H2 provenance/license audit.
- No M2/M3 engine-wide implementation until M1 acceptance and the first runtime/adapter boundaries are decided.

## Immediate next action

1. Inspect run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169); determine whether Motion Canvas produces exactly 1,728 sequential PNGs and passes H.264 1920×1080 / 24 fps / 72.000 s ffprobe.
2. Inspect run [45849998362](https://github.com/Nolane-x/Nolane-video/actions/runs/45849998362); review the new Manim palette/font contact sheet and verify Python render success.
3. Record continuous-motion findings and then build the candidate scorecard. Keep audio incompleteness explicit; do not select a master backend before evidence is comparable.
