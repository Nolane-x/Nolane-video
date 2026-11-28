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

- Latest source commit: [`0d7e2d2`](https://github.com/Nolane-x/Nolane-video/commit/0d7e2d2256c4581fafd6eff9052b021b0d326d84), adding deterministic Remotion S06 submerged → lift → inspect → settle action with wrist/arm and Nia reaction coupled to the prop.
- Candidate [#185](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076477): Remotion 4.0.547, Motion Canvas 3.17.2 and Manim CE 0.22.1 all passed their render/export jobs. Both full-film engines output H.264 1920×1080, 24 fps, 72.000 s, 1,728 frames; Manim passed its H.264 1920×1080, 279-frame / 11.624674 s specialist segment gate.
- Contract [#55](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076436): 30 Python tests and benchmark validator passed (`duration_frames=1728`).
- Remotion artifact `15269760385`, MP4 SHA-256 `288118afaa584bc75aca61e6375a54f6c481a17d1f87f33cf6befbfef915be87`; Motion Canvas artifact `15269635145`, MP4 SHA-256 `8ec191e235ab28ca36477be47f9cef568a7175f0d26c50fef6ace0ba55c95882`; Manim artifact `15268529534`.
- **Visual review:** #185 contact sheets and paired S06 native frames at 1464, 1493, 1499, 1509, 1519, 1537, 1540, 1546, 1570 and 1727 were inspected. The submerged → lift → inspection → settle sequence appears in the expected order. This remains sampled review, not continuous 24-fps approval or final creative approval. Nia and kitchen styling still differ visibly between renderers; final fade differs and remains open.
- **Not complete:** full-film continuous playback review, renderer-consistent Nia design and kitchen/set composition, final fade alignment, natural Nia anatomy/acting, S05's 13.85-second hold reviewed against approved VO, mobile typography, approved Vietnamese voice-over, transcript/audio synchronization, SFX/music and audio QA, repeated authoring/revision-cost measurements, and H2 provenance/license review.
- Both full-film MP4s remain silent/video-only. Render success is not creative approval.
