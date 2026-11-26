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

M1 candidate renders are in progress. Remotion has a verified silent 72-second technical render; Manim has a reviewed scientific segment. Motion Canvas now completes its renderer loop but needed a half-open range correction to avoid one extra boundary frame; run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148) is validating 1,728 frames and the MP4 metadata. No real narration/SFX/music audio has been added, and M1 has no selected master backend yet.
