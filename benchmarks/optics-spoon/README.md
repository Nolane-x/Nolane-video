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

**M1 is still in candidate comparison; no master renderer has been selected.**

- Remotion: verified 1920×1080, 24 fps, 72.000 s, 1,728-frame silent MP4 in [run 45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169). Its visual review confirms the “NƯỚC” label is clear of the caption safe area.
- Manim: verified S04–S05 scientific segment, 1920×1080, 24 fps, 11.625 s in the same run. A source update now aligns its palette/font with this style guide; its rerender is in the latest queued candidate workflow.
- Motion Canvas: dependencies, editor build and typecheck pass. Its renderer previously completed but exported one inclusive boundary frame too many; `project.meta` now targets the final included frame timestamp. The exact 1,728-frame MP4/ffprobe gate is still pending in [run 45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169).

The frame-range validator and 11 unit/regression tests pass in [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249) and [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293). No real narration/SFX/music audio has been added. See [the visual QA report](reports/VISUAL-QA.md), [candidate status](reports/ENGINE-CANDIDATE-STATUS.md) and [the evidence scorecard](../../docs/M1_SCORECARD.md).
