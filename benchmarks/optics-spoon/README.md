# The Spoon That Bends — M1 Benchmark

This is the canonical 72-second NEE benchmark film used to compare educational-animation runtimes.

## Start here

1. docs/M1_BENCHMARK_SPEC.md — scope, scientific facts, fairness protocol and scorecard.
2. shared/script.vi.md — narration script and cue plan.
3. shared/storyboard.json — stable shot IDs and exact frame ranges.
4. shared/ART-DIRECTION.md — original visual identity, character rules and motion grammar.
5. shared/RESEARCH.md — scientific claims and source links.

## Benchmark candidates

- remotion/ — full-scene deterministic React/Remotion implementation.
- motion-canvas/ — full-scene 2D generator/scene-graph implementation.
- manim/ — the mathematical ray-diagram segment only.
- H2 is not copied here. See the M1 specification for provenance and reuse restrictions.

## Fixed delivery target

- 1920×1080
- 24 fps
- 72 seconds
- 1,728 frames
- Vietnamese narration and visible labels
- sRGB
- H.264 MP4 for final comparison, plus source/project and QA artifacts

## Status

**M1 remains in technical benchmark comparison; creative acceptance is not complete.** Motion Canvas is the provisional first 2D scene adapter under `docs/adr/ADR-0001-motion-canvas-first-2d-runtime.md`; Remotion remains a baseline/reference and Manim remains a specialist scientific-diagram renderer. This is not a final artistic ranking or a production-ready master-engine declaration.

- Latest code commit: [`0425437`](https://github.com/Nolane-x/Nolane-video/commit/042543767e68b2003b1218ece001185203202286), matching Remotion camera push-ins with Motion Canvas (S01 push-in, S03 reset, S06 final push-in).
- Candidate [#175](https://github.com/Nolane-x/Nolane-video/actions/runs/46142711137): Remotion 4.0.547 and Motion Canvas 3.17.2 passed H.264 1920×1080, 24 fps, 72.000 s, 1,728-frame full-film gates; Manim CE 0.22.1 passed its H.264 1920×1080, 279-frame / 11.624674 s specialist segment gate.
- Contract [#53](https://github.com/Nolane-x/Nolane-video/actions/runs/46142711123): 30 Python tests and the benchmark validator passed (`duration_frames=1728`).
- Remotion artifact `15262995737`, MP4 SHA-256 `775152a8a1f6e5f0cd8c4745c9522db95a907e828204c158e11cad03bd074f4e`; Motion Canvas artifact `15263075327`, MP4 SHA-256 `8ec191e235ab28ca36477be47f9cef568a7175f0d26c50fef6ace0ba55c95882`; Manim artifact `15261894499`, MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- **Visual review:** #175 contact sheets and selected native frames around S01, S03 reset, S06 and S05 were inspected. This remains sampled review, not uninterrupted 24-fps approval or final creative approval.
- **Not complete:** full-film continuous playback review, natural Nia anatomy/acting, S05's 13.85-second hold reviewed against approved VO, mobile typography, approved Vietnamese voice-over, transcript/audio synchronization, SFX/music and audio QA, repeated authoring/revision-cost measurements, and H2 provenance/license review.
- Both full-film MP4s remain silent/video-only. Render success is not creative approval.

