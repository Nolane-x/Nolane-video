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

- Latest code/test commit: [`e6ce4a8`](https://github.com/Nolane-x/Nolane-video/commit/e6ce4a81659fe11bac54b450533863da36b79c6b), synchronizing progressive S05 captions between Motion Canvas and Remotion.
- Candidate [#171](https://github.com/Nolane-x/Nolane-video/actions/runs/46136144320): Remotion 4.0.547 and Motion Canvas 3.17.2 both passed H.264 1920×1080, 24 fps, 72.000 s, 1,728-frame full-film gates; Manim CE 0.22.1 passed its H.264 1920×1080, 279-frame / 11.624674 s specialist segment gate.
- Contract [#52](https://github.com/Nolane-x/Nolane-video/actions/runs/46136144238): 30 Python tests and the benchmark validator passed (`duration_frames=1728`).
- Candidate artifacts: Remotion `15259602611`; Motion Canvas `15259288248`; Manim `15260285182`. Motion Canvas diagnostics: `15259507806`. Candidate artifacts expire around 2026-12-28; diagnostics around 2026-12-12.
- **Visual review:** candidate #167 remains the latest visually reviewed render. Candidate #171 passed technical CI but has not yet been downloaded and visually reviewed. See [the visual QA report](reports/VISUAL-QA.md) and [candidate status](reports/ENGINE-CANDIDATE-STATUS.md).
- **Not complete:** uninterrupted 24-fps review of both full films, Nia's natural anatomy/acting, narration-led evaluation of S05's 13.85-second final hold, mobile typography, approved Vietnamese voice-over, transcript/audio synchronization, SFX/music and perceptual audio QA, repeatable authoring/revision-cost measurements, and H2 provenance/license review.
- Both full-film MP4s remain silent/video-only. Render success is not creative approval.

