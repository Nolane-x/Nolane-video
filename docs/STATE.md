# Project State

**Snapshot date:** 2026-11-26  
**Repository:** https://github.com/Nolane-x/Nolane-video  
**Default branch:** `main` (unchanged by this benchmark branch)  
**Working branch:** `m1/optics-benchmark`  
**Verified branch HEAD before this state update:** `3c2810c28d0fa7078acb739680b858406a401108`  
**Current phase:** M1 — comparable benchmark and architecture decision (in progress).  
**Architecture decision:** OPEN; no master runtime selected.

## 1. Project identity and scope

Nolane Explainer Engine (NEE) is a specialist, code-first production system for story-driven, narration-led 2D/2.5D educational explainer films, especially mathematics, physics, chemistry, engineering and technology. It is not a universal video generator or general-purpose editor.

Long-form ambition remains approximately 8–20 minutes, 16:9. The 60–120-second benchmark is an engineering proof, not a reduction in product ambition.

## 2. Foundation completed

The M0 foundation documents exist:
- `README.md`
- `AGENTS.md`
- `docs/PRODUCT_NORTH_STAR.md`
- `docs/ENGINE_ARCHITECTURE.md`
- `docs/REFERENCE_ENGINE_STUDY.md`
- `docs/ROADMAP.md`
- `docs/STATE.md`
- `docs/AI_HANDOFF.md`

The renderer-independent Film IR remains the proposed source of truth. Candidate frameworks remain adapters/references until M1 evidence supports a decision.

## 3. Verified repository roles and source constraints

- New engine: `Nolane-x/Nolane-video`.
- User Remotion fork: `Nolane-x/remotion`; upstream: `remotion-dev/remotion`.
- User Manim fork: `Nolane-x/manim`; upstream: `ManimCommunity/manim`.
- Prior workspace: `Nolane-x/video`; H2 prototype has not been copied because source provenance/reuse rights still need audit.
- Motion Canvas candidate: `motion-canvas/motion-canvas`.

Do not confuse `Nolane-video` with `Nolane-x/video`. Do not edit the user's Remotion or Manim forks as part of this task.

## 4. M1 benchmark created

Canonical film:
- Title: **The Spoon That Bends** / **Vì sao chiếc thìa trông như bị gãy trong nước?**
- Duration: 72 seconds, 1,728 frames.
- Format: 1920×1080, 24 fps, 16:9, sRGB.
- Six shots: hook, contradiction, optical reveal, refraction, apparent image, resolution.
- Vietnamese script and on-screen copy; audio cues are planned but no real voice/SFX/music audio is supplied yet.

Shared assets:
- `benchmarks/optics-spoon/shared/script.vi.md`
- `benchmarks/optics-spoon/shared/storyboard.json`
- `benchmarks/optics-spoon/shared/ART-DIRECTION.md`
- `benchmarks/optics-spoon/shared/RESEARCH.md`
- `benchmarks/optics-spoon/shared/diagram.json`
- `docs/M1_BENCHMARK_SPEC.md`
- `docs/M1_BENCHMARK_PLAN.md`

The canonical water-to-air geometry is checked by code: 40° in water, approximately 58.935° in air, both from the normal; the apparent point lies on the backward extension of the refracted ray.

## 5. Candidate implementation and evidence

### Remotion 4.0.547 — full-film candidate

Verified in run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169):
- TypeScript check and full render passed.
- ffprobe: H.264, 1920×1080, progressive, 24/1 fps, 72.000 seconds, 1,728 frames.
- Contact sheet and selected 1080p frames 1056 and 1248 reviewed. The water-region “NƯỚC” label is now clear of the bottom caption bar after source commit `e5e0259ca2c517858511dcaf11a70edb40f640ea`.

Artifact digest: `sha256:f829285a43711aed3a869bae9d93ede74d37c9561125a510ad2101e673d20b14`.

This remains a silent vector prototype, not a finished film. Character acting/prop contact is rudimentary and no real voice, synchronized transcript captions, SFX or music is included. Full findings: `benchmarks/optics-spoon/reports/VISUAL-QA.md`.

### Manim CE user fork — scientific segment only

Verified in run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169):
- Installed fork commit `18320e2f0feaf142b2c3a377068ddb44c82fb2a1`.
- Rendered S04–S05 at 1920×1080, 24 fps, 11.625 seconds; ffprobe passed.
- Contact sheet reviewed. Scientific geometry passes, but the first style version has a black background, serif default typography and sparse opening frames.

Artifact digest: `sha256:a2fcf0ddda1cb40eb27bfd877b93be0c2d725d2162fd08926e1765cd416c77e4`.

Source commit `0a09f2ef4925dcd55734d38a8f455c1a54c0a6b5` aligns the segment to the NEE palette, DejaVu Sans and a persistent water region. The latest candidate rerender is queued in [45851338555](https://github.com/Nolane-x/Nolane-video/actions/runs/45851338555); prior pending run 45850249595 was superseded before it started. Manim remains a specialist diagram adapter, not a full-film candidate.

### Motion Canvas 3.17.2 — full-film candidate

Verified:
- Pinned dependencies install.
- Vite/editor build and TypeScript check pass.
- Headless Chromium opens the official editor and invokes its core image-sequence renderer.
- Current exporter uses Motion Canvas core's image-sequence exporter plus independent FFmpeg; GPLv3 FFmpeg exporter is not included.

Verified:
- Motion Canvas 3.17.2 dependencies install, official editor builds/typechecks, and headless Chromium invokes the core image-sequence exporter.
- Renderer audit plugin works. Run [45840319216](https://github.com/Nolane-x/Nolane-video/actions/runs/45840319216) logged `RendererResult.Success`, `lastFrame: 1728`, and `RendererState.Initial`.

Still pending:
- That run exported 1,729 unique PNGs (0–1,728) because Motion Canvas converts seconds to frames with `ceil(seconds × fps)` and includes the endpoint.
- Commit `31fd2997dce941be05b089e8066928eebc0f7dd3` changed the final included sample timestamp to `71.95833333333333` s (frame 1,727 at 24 fps).
- Run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148) was cancelled before its render step completed. Current run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169) has Remotion and Manim jobs successful; Motion Canvas passed setup/build and remains in the render step. No candidate MP4/ffprobe has been accepted yet.
- The validator now checks the inclusive endpoint conversion. Validator run [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249) and regression-test run [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293) both passed.

## 6. Visual QA recorded

- Remotion artifact from [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169), digest `sha256:f829285a43711aed3a869bae9d93ede74d37c9561125a510ad2101e673d20b14`; contact sheet and selected 1080p frames 1056/1248 reviewed. “NƯỚC” label is clear of the caption.
- Manim artifact from [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169), digest `sha256:a2fcf0ddda1cb40eb27bfd877b93be0c2d725d2162fd08926e1765cd416c77e4`; scientific geometry reviewed; palette/font correction is in the latest pending candidate run [45851338555](https://github.com/Nolane-x/Nolane-video/actions/runs/45851338555).
- These are prototype-level checks, not final artistic approval. Full findings: `benchmarks/optics-spoon/reports/VISUAL-QA.md`. Evidence-ledger comparison (no ranking yet): `docs/M1_SCORECARD.md`. Animation/staging/performance review standard: `docs/ANIMATION_CRAFT_STANDARDS.md`.

## 7. Test and workflow facts

- `.github/workflows/validate-m1-benchmark.yml` exists.
- Latest successful validator: [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249), commit `d15705bdec39cc48cd7a802378adf8eb3fdcb6c3`.
- Latest successful unit/regression tests: [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293), commit `aba51bb249528a03448196326c255fcec334d797`. Tests assert that a 72.0-second inclusive endpoint would create an extra frame.
- `.github/workflows/m1-benchmark-candidates.yml` runs Remotion, Motion Canvas and Manim independently. Candidate run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169) passed Remotion and Manim but still has Motion Canvas rendering. Candidate rerender with Manim style change is pending in [45851338555](https://github.com/Nolane-x/Nolane-video/actions/runs/45851338555).
- A workflow's overall result can be failure while individual engine jobs succeed; report each job separately.
- All preview renders currently omit a real audio track.

## 8. Licensing and integration constraints

- Motion Canvas packages inspected are MIT-licensed; its optional FFmpeg exporter declares GPLv3 and remains excluded.
- Manim Community Edition is MIT-licensed; the user's fork is pinned by commit.
- Remotion's two-tier licensing model remains a product-adoption constraint; evaluation use does not decide redistribution/commercial embedding rights.
- H2 has not been copied; complete its provenance/license audit before considering reuse.

## 9. What remains open

- Finish Motion Canvas exact 1,728-frame render and ffprobe in run `45842364169`; next candidate validation is queued in `45851338555`.
- Review the Manim palette/font render in latest candidate run [45851338555](https://github.com/Nolane-x/Nolane-video/actions/runs/45851338555) when it starts and finishes.
- Inspect continuous movement/action/contact across the full 72-second film, not only contact sheets.
- Add real approved voice, synchronized transcript captions, SFX and music before claiming audio QA; do not synthesize or assume audio without an approved source.
- Complete H2 provenance/license audit.
- Complete the evidence-ledger scorecard after the pending Motion Canvas/Manim runs, then write a formal architecture decision using comparable evidence.
- Do not begin broad M2/M3 engine implementation until M1 is accepted.

## 10. Next concrete task

First inspect run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169). Require exactly 1,728 sequential PNGs (000000–001727), then H.264 1920×1080 / 24 fps / 72.000 s ffprobe and artifact upload. Then inspect candidate rerender [45851338555](https://github.com/Nolane-x/Nolane-video/actions/runs/45851338555), review the new Manim palette/font contact sheet, and update `VISUAL-QA.md`. Keep audio and continuous-motion review marked incomplete.
