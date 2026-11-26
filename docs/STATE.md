# Project State

**Snapshot date:** 2026-11-26 21:15 +07:00  
**Repository:** https://github.com/Nolane-x/Nolane-video  
**Default branch:** `main` (unchanged by this benchmark branch)  
**Working branch:** `m1/optics-benchmark`  
**Verified branch HEAD before this state update:** `71691374f96b137f24fb8711609e338034a08d84`  
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

Verified in run [45835419773](https://github.com/Nolane-x/Nolane-video/actions/runs/45835419773):
- TypeScript typecheck passed.
- Full render passed.
- ffprobe passed: H.264, 1920×1080, 24/1 fps, 72.000 seconds, 1,728 frames.
- Contact sheet reviewed.

Artifact digest: `sha256:d952ac40773e0e67f504afaebe74aa6a3c7dd327833ec9d7d8865261e4b5f1f7`.

The output is a silent/audio-incomplete vector prototype, not a finished film. Visual quality and acting remain below the product target; review safe areas and captions again at full resolution.

### Manim CE user fork — scientific segment only

Verified in run [45835419773](https://github.com/Nolane-x/Nolane-video/actions/runs/45835419773):
- Installed pinned fork commit `18320e2f0feaf142b2c3a377068ddb44c82fb2a1`.
- Rendered S04–S05 at 1920×1080, 24 fps, 11.625 seconds.
- ffprobe and visual contact-sheet/final-frame review passed.

Artifact digest: `sha256:360165a33ae89e101b0aa055fdba88a99926ed943fed3f31f71b09bdfa4d4bbc`.

Manim is being evaluated as a math/diagram adapter, not as a full-film engine.

### Motion Canvas 3.17.2 — full-film candidate

Verified:
- Pinned dependencies install.
- Vite/editor build and TypeScript check pass.
- Headless Chromium opens the official editor and invokes its core image-sequence renderer.
- Current exporter uses Motion Canvas core's image-sequence exporter plus independent FFmpeg; GPLv3 FFmpeg exporter is not included.

Verified:
- Motion Canvas 3.17.2 installs, builds and typechecks; headless Chromium opens the official editor and invokes its core image-sequence exporter.
- The project renderer now has a valid audit plugin. Run [45840319216](https://github.com/Nolane-x/Nolane-video/actions/runs/45840319216) logs `RendererResult.Success`, `lastFrame: 1728`, and a return to `RendererState.Initial`.

Still pending:
- That run exported 1,729 unique PNGs (frames 0–1,728), because the range endpoint at exactly 72 seconds is inclusive. The renderer therefore works; the remaining issue is one extra boundary sample, not a premature stop or file loss.
- Commit `31fd2997dce941be05b089e8066928eebc0f7dd3` sets the final included sample timestamp to `71.95833333333333` s (frame 1,727 at 24 fps). Run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148) is validating the exact 1,728-frame output and ffprobe gate.
- No Motion Canvas MP4 has yet passed the exact-count/metadata acceptance gate.

## 6. Visual QA recorded

- Remotion full-film artifact from run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148), digest `sha256:0d893c6b19418e04fe31618766e0fbcc7d8712edfb42af4bd7852dbeabf032cc`; contact sheet and selected full-resolution frames inspected. A bottom caption overlaps the “NƯỚC” label; source fix commit `e5e0259ca2c517858511dcaf11a70edb40f640ea` is queued for re-render in [45842086637](https://github.com/Nolane-x/Nolane-video/actions/runs/45842086637).
- Manim scientific-segment artifact from run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148), digest `sha256:796002c68e32f584eb381a8753b14c01ba17b72c106593f7f729837bfb87d7c1`; its 1080p contact sheet was reviewed and its ray/normal/apparent-point layout fits the frame.
- These are prototype-level checks, not final artistic approval. Full findings: `benchmarks/optics-spoon/reports/VISUAL-QA.md`.

## 7. Test and workflow facts

- `.github/workflows/validate-m1-benchmark.yml` exists.
- Latest recorded successful validator run: [45831094427](https://github.com/Nolane-x/Nolane-video/actions/runs/45831094427), commit `191d6f6b4e63f63edcbaed76fac1bc9bb1d2c07a`.
- `.github/workflows/m1-benchmark-candidates.yml` runs Remotion, Motion Canvas and Manim independently.
- A workflow's overall result can be failure while individual engine jobs succeed; report each job separately.
- All preview renders currently omit a real audio track.

## 8. Licensing and integration constraints

- Motion Canvas packages inspected are MIT-licensed; its optional FFmpeg exporter declares GPLv3 and remains excluded.
- Manim Community Edition is MIT-licensed; the user's fork is pinned by commit.
- Remotion's two-tier licensing model remains a product-adoption constraint; evaluation use does not decide redistribution/commercial embedding rights.
- H2 has not been copied; complete its provenance/license audit before considering reuse.

## 9. What remains open

- Verify the half-open frame-range fix in run `45840831148`; if it passes, review the MP4/contact sheet and record the visual findings. Do not change the scene timeline.
- Rerun current validator tests after latest changes and before merging.
- Inspect latest Remotion/Manim artifacts and complete shot-by-shot visual review.
- Add real approved voice, captions and synchronized SFX before claiming audio QA.
- Complete H2 provenance/license audit.
- Score candidates with evidence; write the architecture decision.
- Do not begin broad M2/M3 engine implementation until M1 is accepted.

## 10. Next concrete task

Monitor run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148) for exactly 1,728 Motion Canvas frames and ffprobe. Then inspect the queued Remotion safe-area rerender [45842086637](https://github.com/Nolane-x/Nolane-video/actions/runs/45842086637) and update its visual review. Continuous-motion review, real audio and the candidate scorecard/ADR remain open.
