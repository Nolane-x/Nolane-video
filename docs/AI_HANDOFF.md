# AI Session Handoff

**Updated:** 2026-11-26 21:15 +07:00  
**Repository:** https://github.com/Nolane-x/Nolane-video  
**Default branch:** `main`  
**Working branch:** `m1/optics-benchmark`  
**Verified HEAD before this handoff update:** `71691374f96b137f24fb8711609e338034a08d84`  
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

Run [45835419773](https://github.com/Nolane-x/Nolane-video/actions/runs/45835419773) has a successful Remotion job. It typechecked, rendered and passed ffprobe:
- H.264;
- 1920×1080;
- 24 fps;
- 72.000 seconds;
- 1,728 frames.

Artifact digest: `sha256:d952ac40773e0e67f504afaebe74aa6a3c7dd327833ec9d7d8865261e4b5f1f7`.

Contact sheet has been reviewed. The six shots are present, but the output is a vector prototype and has no narration/SFX/music audio. Continue visual polish and do not claim final-film quality.

### Manim CE fork

Run [45835419773](https://github.com/Nolane-x/Nolane-video/actions/runs/45835419773) has a successful Manim job:
- fork `Nolane-x/manim` pinned at `18320e2f0feaf142b2c3a377068ddb44c82fb2a1`;
- S04–S05 only;
- 1920×1080, 24 fps, 11.625 seconds;
- ffprobe and contact-sheet/final-frame review passed.

Artifact digest: `sha256:360165a33ae89e101b0aa055fdba88a99926ed943fed3f31f71b09bdfa4d4bbc`.

Keep Manim in its specialist math/diagram role unless evidence says otherwise.

### Motion Canvas 3.17.2

Motion Canvas renderer completion is now confirmed. Run [45840319216](https://github.com/Nolane-x/Nolane-video/actions/runs/45840319216) reports `RendererResult.Success`, `lastFrame: 1728`, and 1,729 unique PNG exports (frames 0–1,728). The earlier partial counts came from the automation prematurely inferring completion from the UI's `data-rendering` attribute; the script now waits for `renderer.onFinished`.

The remaining off-by-one was the inclusive 72-second range endpoint. Commit `31fd2997dce941be05b089e8066928eebc0f7dd3` sets `project.meta` range end to `71.95833333333333` seconds, so 24 fps produces exactly frames 0–1,727 (1,728 images) while the MP4 remains 72.000 seconds.

No Motion Canvas MP4 has passed the exact-count/ffprobe gate yet. **Immediate task:** inspect run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148). Require exactly 1,728 sequential PNGs, then H.264 1920×1080, 24 fps and 72 seconds. Review the contact sheet and moving sequence before scoring. Audio has not been added.

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
- Latest recorded successful validation workflow run: [45831094427](https://github.com/Nolane-x/Nolane-video/actions/runs/45831094427), commit `191d6f6b4e63f63edcbaed76fac1bc9bb1d2c07a`. Rerun current validator before merging.

## Still incomplete

- Full Motion Canvas render and visual review.
- Current full Remotion visual review after the most recent label adjustment.
- Audio: no real Vietnamese voice, caption alignment, SFX or music mix.
- H2 provenance/license audit.
- Comparable scorecard and formal architecture decision.
- No broad Film IR/runtime build before M1 acceptance.

## End-of-session rule

Before ending a session, update both `docs/STATE.md` and `docs/AI_HANDOFF.md` with the live branch/commit, exact evidence, unverified items, blocker and one next task. Never mark a build, render, test or review as passed without fresh logs/artifacts.
