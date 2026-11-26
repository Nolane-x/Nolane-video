# AI Session Handoff

**Updated:** 2026-11-26  
**Repository:** https://github.com/Nolane-x/Nolane-video  
**Default branch:** `main`  
**Working branch:** `m1/optics-benchmark`  
**Verified HEAD before this handoff update:** `914c9b35c88d65b8c7c5a3cb2c5c6172954d4151`  
**Current milestone:** M1 — comparable benchmark and architecture decision, still in progress.  
**Do not merge or select a master renderer yet.**

## Read first

Read in this order:
1. `README.md`
2. `AGENTS.md`
3. `docs/PRODUCT_NORTH_STAR.md`
4. `docs/ENGINE_ARCHITECTURE.md`
5. `docs/REFERENCE_ENGINE_STUDY.md`
6. `docs/ROADMAP.md`
7. `docs/STATE.md`
8. `docs/AI_HANDOFF.md`
9. `docs/M1_BENCHMARK_SPEC.md`
10. `docs/M1_BENCHMARK_PLAN.md`
11. `benchmarks/optics-spoon/reports/ENGINE-CANDIDATE-STATUS.md`
12. `benchmarks/optics-spoon/reports/VISUAL-QA.md`

Then fetch the live `m1/optics-benchmark` HEAD and inspect the latest Actions runs. The handoff is a snapshot, not a substitute for live verification.

## Product identity — do not change

NEE is a specialist code-first system for story-driven, narration-led 2D/2.5D educational explainer films. Target domains are mathematics, physics, chemistry, engineering and technology. Long-form target is roughly 8–20 minutes, primarily 16:9.

This is not a universal video generator or general editor. Do not broaden into vlogs, podcasts, ads, UGC, music videos, gaming, sports or arbitrary live-action workflows.

## Architecture principles

- Build a specialist film compiler, not a prompt wrapper.
- A typed, versioned, renderer-independent Film IR is the proposed source of truth.
- AI agents may author research, story, script, style bible, storyboard, acting cues and QA records; deterministic runtime validates and executes them.
- Renderers are replaceable adapters. Avoid multiple competing master timelines.
- Native semantic educational objects and readable acting are required: poses, gesture, gaze, anticipation, contact, follow-through and recovery.
- Use integer frames and rational FPS. Align real audio using sample-aware timing.
- A successful render does not equal artistic approval; inspect moving scenes and audio.
- Do not adopt a framework just because it is familiar or has many features.

## Current branch contents

Shared benchmark:
- `benchmarks/optics-spoon/shared/script.vi.md`
- `benchmarks/optics-spoon/shared/storyboard.json`
- `benchmarks/optics-spoon/shared/ART-DIRECTION.md`
- `benchmarks/optics-spoon/shared/RESEARCH.md`
- `benchmarks/optics-spoon/shared/diagram.json`

Validation:
- `tools/validate_benchmark.py`
- `tests/test_benchmark.py`
- `.github/workflows/validate-m1-benchmark.yml`

Candidates:
- `benchmarks/optics-spoon/remotion/` — full film.
- `benchmarks/optics-spoon/motion-canvas/` — full-film editor/image-sequence candidate.
- `benchmarks/optics-spoon/manim/` — S04–S05 scientific segment.
- `.github/workflows/m1-benchmark-candidates.yml` — separate jobs for each candidate.

## Evidence already verified

### Remotion 4.0.547

Successful full-film run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169):
- H.264;
- 1920×1080;
- 24 fps;
- 72.000 seconds;
- exactly 1,728 frames.

Artifact digest: `sha256:f829285a43711aed3a869bae9d93ede74d37c9561125a510ad2101e673d20b14`.

The contact sheet and 1080p frames 1056/1248 were reviewed. The “NƯỚC” label is now outside the caption safe area. Remaining limitation: the character and props are vector blockouts; no real Vietnamese VO, synchronized transcript captions, SFX or music is present. Review does not constitute final artistic approval. Full findings are in `benchmarks/optics-spoon/reports/VISUAL-QA.md`.

### Manim CE fork

Successful scientific-segment run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169):
- fork `Nolane-x/manim` pinned at `18320e2f0feaf142b2c3a377068ddb44c82fb2a1`;
- S04–S05 only;
- 1920×1080, 24 fps, 11.625 seconds;
- ffprobe passed.

Artifact digest: `sha256:a2fcf0ddda1cb40eb27bfd877b93be0c2d725d2162fd08926e1765cd416c77e4`.

The diagram geometry passed review, but the original style had a black background, serif text and empty-looking opening. Source commit `0a09f2ef4925dcd55734d38a8f455c1a54c0a6b5` changes it to the shared palette, DejaVu Sans and a persistent water region. The rerender is in latest pending candidate run [45850249595](https://github.com/Nolane-x/Nolane-video/actions/runs/45850249595). Manim remains a specialist scientific-visualization adapter, not a full-film candidate.

### Motion Canvas 3.17.2

Run [45840319216](https://github.com/Nolane-x/Nolane-video/actions/runs/45840319216) proves the renderer can complete with `RendererResult.Success`, `lastFrame: 1728`; the exporter emitted 1,729 frames (0–1,728) because the time endpoint is inclusive. Earlier short renders were caused by Playwright inferring completion from the UI's `data-rendering` attribute. The script now waits for the actual engine `renderer.onFinished` event.

Commit `31fd2997dce941be05b089e8066928eebc0f7dd3` sets `project.meta` range end to `71.95833333333333` seconds, the final included timestamp for frame 1,727 at 24 fps. The 72-second output still requires exactly 1,728 samples (000000–001727).

Run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148) was cancelled before its Motion Canvas render completed. Current run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169) has Remotion and Manim jobs successful; Motion Canvas setup/build passed but its render step is still running. No MP4/ffprobe has been accepted yet.

The shared validator now checks Motion Canvas's `ceil(seconds × fps)` inclusive-end conversion. Validator run [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249) and regression-test run [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293) both passed. A new candidate rerun [45850249595](https://github.com/Nolane-x/Nolane-video/actions/runs/45850249595) is pending with the Manim palette/font update.

## Important implementation findings

- Motion Canvas 3.17.2 public packages are MIT-licensed.
- Its core image-sequence exporter is the intended exporter for this benchmark.
- Do not add Motion Canvas's optional FFmpeg exporter; its package declares GPLv3. Use independent FFmpeg after PNG sequence creation.
- Motion Canvas editor UI stores expandable state by project name. The Vite entry is `src/project.ts`, so storage namespace is `project-*`.
- Headless UI uses `prefers-reduced-motion: reduce` to choose its immediate `ReducedCollapse`. This changes editor UI mounting only, not authored scene motion.
- Project meta pins 1920×1080, 24 fps, sRGB and the core image-sequence exporter. Its `range` end is the final included frame timestamp `71.95833333333333` s so the render interval contains exactly 1,728 samples.
- Remotion's two-tier license needs a separate product-adoption review before redistribution/commercial embedding.
- H2 in `Nolane-x/video` has not been copied. Audit provenance/license before reuse.

## Exact workflows / commands

Remotion job:
- Node 22.
- `npm install --no-audit --no-fund`
- `npm run typecheck`
- `npm run render`
- ffprobe checks width, height, 24 fps and 72-second duration.

Motion Canvas job:
- Ubuntu 24.04, Node 22, FFmpeg and Playwright Chromium.
- `npm install --no-audit --no-fund`
- `npx playwright install --with-deps chromium`
- `npm run build`
- `npm run render` — launches Vite/editor, uses the official editor's Render button, waits for `renderer.onFinished` (not a UI data attribute), checks the sequential six-digit PNGs, then FFmpeg encodes MP4/contact sheet.
- Required acceptance is exactly 1,728 frames (000000–001727); do not lower the threshold.

Manim job:
- Python 3.12, ffmpeg, Cairo/Pango.
- `pip install -r requirements.txt`
- `manim -qh -r 1920,1080 --fps 24 --media_dir out refraction_segment.py RefractionSegment`
- ffprobe and contact-sheet validation.

Validator:
- `python -m unittest discover -s tests -v`
- `python tools/validate_benchmark.py`
- Latest successful validator: [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249), commit `d15705bdec39cc48cd7a802378adf8eb3fdcb6c3`.
- Latest successful unit/regression tests: [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293), commit `aba51bb249528a03448196326c255fcec334d797`. Regression coverage proves that a 72.0-second inclusive endpoint would add frame 1,728.

## Still incomplete

- Motion Canvas exact 1,728-frame render, MP4/ffprobe, contact sheet and continuous-motion review.
- Manim palette/font rerender and visual approval in run `45850249595`.
- Continuous-motion and action/contact review across the complete film; current checks are contact sheets and selected still frames.
- Audio: no real Vietnamese voice, synchronized transcript captions, SFX or music.
- H2 provenance/license audit.
- Metric-backed candidate scorecard and formal architecture decision.
- No broad Film IR/runtime build before M1 acceptance.

## Immediate next actions

1. Inspect [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169). Require exactly 1,728 PNGs numbered 000000–001727; then verify H.264, 1920×1080, 24 fps, 72.000 seconds and artifact upload.
2. Inspect latest pending candidate run [45850249595](https://github.com/Nolane-x/Nolane-video/actions/runs/45850249595); confirm Manim palette/font render and review its contact sheet.
3. Update `VISUAL-QA.md`, `ENGINE-CANDIDATE-STATUS.md`, `STATE.md` and this handoff with fresh results. Then perform continuous-motion review and create the scorecard/architecture decision.

Keep audio incomplete until a real approved VO/SFX/music source is provided and synchronized. Do not choose a master runtime from incomplete evidence.

## End-of-session rule

Before ending a session, update both `docs/STATE.md` and `docs/AI_HANDOFF.md` with the live branch/commit, exact evidence, unverified items, blocker and one next task. Never mark a build, render, test or review as passed without fresh logs/artifacts.
