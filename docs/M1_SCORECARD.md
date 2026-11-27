# M1 Candidate Scorecard — The Spoon That Bends

**Snapshot:** 2026-11-27 — latest technical candidate #140 and contract validation #36 (26 tests).  
**Status:** candidate technical comparison complete; creative/audio acceptance still open. No overall numeric score is assigned.  
**Architecture decision:** Motion Canvas is provisionally selected as the first 2D scene adapter under [ADR-0001](adr/ADR-0001-motion-canvas-first-2d-runtime.md).

## Benchmark contract

- 72.000-second target film.
- 1920×1080, 24 fps, 1,728 frames (indices 0–1,727).
- Same Vietnamese script, six-shot schedule, art direction and canonical refraction geometry.
- Remotion and Motion Canvas are full-film candidates; Manim is an S04–S05 scientific-diagram adapter.

## Evidence-backed comparison

| Dimension | Remotion 4.0.547 | Motion Canvas 3.17.2 | Manim CE fork |
|---|---|---|---|
| Intended role | Full-film baseline / possible adapter | First 2D/2.5D scene runtime (provisional) | Specialist diagram adapter |
| Latest green candidate run | [#140](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464282) | [#140](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464282) | [#140](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464282) |
| Latest Actions artifact ZIP digest | `sha256:2fe1d309307b9c0fd5e3b2e8f6c90b38890845950ed8cdfe594dee7a6b28ba5f` | `sha256:3b23ed29cb53a4e94c1e9466d7ad4ed12dea7309acee49fa9c4621d4e260e098` | `sha256:857d15c11361985c33af811570292232e0aad62fb8c92551b7ba76d40d0f4ddc` |
| Latest MP4 SHA-256 | `f6b1cf4ac28d7c43c9eec3940472eb1303c65ed9ada29ecc798000b810301a67` | `b4637a336e3206a36975e769b2067802afeaa114d1aad90e63d928685e89260a` | `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7` |
| Output metadata | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 11.624674 s, 279 frames |
| Technical result | PASS: typecheck, full render, H.264/24 fps/1,728-frame ffprobe gate and upload | PASS: official editor build, 1,728 unique sequential frames, H.264/24 fps/1,728-frame ffprobe gate, zero browser errors and upload | PASS: pinned fork install, H.264/24 fps/279-frame gate, ffprobe and upload |
| Visual review | Candidate #140 contact sheet and selected S02/diagram frames checked; S02 parity states remain present. Not a continuous 24-fps watch | Candidate #140 arm contour/joints inspected in contact sheet, 4-fps S02 strip and native frames at 8.8/9.5/10.5/11.5 s; joint silhouette is clearer but remains stylized. Not a continuous 24-fps watch | Candidate #140 specialist diagram render and ffprobe passed |
| Scientific geometry | PASS on reviewed diagram | PASS against shared diagram model | PASS on reviewed diagram |
| Character acting | S02 action beats follow the shared storyboard, but character remains a stylized vector blockout; hand/arm anatomy, weight, acting and follow-through are not approved | Outlined upper/forearm plus animated shoulder, elbow and wrist joints now follow the IK chain; clearer silhouette at sampled frames. Still stylized vector blocking, not organic anatomy or final acting | Not applicable to specialist role |
| Diagram choreography | NEEDS CREATIVE REVIEW | Remotion and Motion Canvas stage the main explanation sequence; continuous timing, holds, camera framing and comprehension review remain open |
| Audio | Silent; no VO, transcript sync, SFX or music | Silent; no VO, transcript sync, SFX or music | No audio |
| License | Two-tier source-available license; eligible individuals/small companies may create commercial videos, but selling/licensing a Remotion derivative is restricted | MIT core; optional GPLv3 FFmpeg exporter excluded | MIT (Community Edition and pinned fork files) |

## Quality-gate ledger

| Gate | Status | Evidence / next action |
|---|---|---|
| Cross-engine storyboard implementation parity | PASS (source/tests) | Remotion S02 action arc and S03–S05 causal reveal are implemented; deterministic runtime parity test passed before render. Continuous creative review still required |
| Story and learning objective | PARTIAL PASS | Six-shot sequence renders; complete 24 fps comprehension review remains |
| Scientific correctness | PASS for reviewed geometry | Shared Snell/geometry validator and native-resolution diagrams pass |
| Deterministic frame output | PASS | Both full-film engines: exactly 1,728 frames; Manim segment: 279 frames |
| Technical media export | PASS | All three candidate jobs green in run [#140](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464282) |
| Visual readability | PASS at reviewed native frames; reduced/mobile-size check open | Remotion caption safe area, Motion Canvas angle labels and Manim font/palette fixed |
| Diagram choreography | NEEDS CREATIVE REVIEW | Remotion and Motion Canvas stage the main explanation sequence; continuous timing, holds, camera framing and comprehension review remain open |
| Acting, prop contact and continuity | PARTIAL / NOT APPROVED | Grip paths and per-frame IK remain stable; arm contour/joints improve silhouette. Need anatomical joints/depth, palm compression, thumb base, wrist roll, shoulder/torso counterbalance, reaction and follow-through |
| Camera and editing | PARTIAL | Current movement/transitions are basic; use motivated framing and preserve spatial continuity |
| Audio/narration/captions | NOT TESTED | Add approved real VO, transcript alignment, SFX and music before audio acceptance |
| Reproducibility and revision cost | PARTIAL | Pinned versions and repeatable CI exist; controlled timing and authoring/revision measurements remain |
| Licensing/reuse | PARTIAL | Motion Canvas/Manim core suitable under inspected MIT licenses; review Remotion distribution model; H2 provenance audit open |

## Performance and measurement caveat

No performance ranking is made from one-off CI jobs. Runner timings were not collected under equivalent, repeated conditions, and Manim renders only an 11.6-second specialist segment. A fair performance study needs repeated runs on equivalent runner classes and must report scene-authoring time, preview latency, render time, revision time, output determinism and dependency friction separately.

## Architecture decision

[ADR-0001](adr/ADR-0001-motion-canvas-first-2d-runtime.md) provisionally selects Motion Canvas as the first 2D scene-execution adapter because it completed the same full-film technical gate as Remotion, has an MIT-licensed core and fits generator-driven choreography. Film IR remains renderer-independent. Manim remains a specialist math/diagram adapter; Remotion remains a baseline/possible adapter pending product-license review.

This is not an artistic ranking. Both full-film candidates remain below NEE's target acting, prop-contact, camera and audio quality.

## Next required evidence

1. Full-speed 24 fps review of the complete Remotion and Motion Canvas films with shot/frame-specific findings; selected stills are not a substitute.
2. Upgrade Nia beyond the first grip slice with anatomical finger joints/depth, palm/wrist quality, hand-to-handle pressure, shoulder/torso weight transfer, reaction and follow-through; inspect all S02 frames.
3. Review the now-staged diagram continuously; refine causal pacing, purposeful holds and motivated camera moves where the 24-fps review identifies defects.
4. Approved narration, transcript-synchronized captions, SFX and music, or a documented amendment to benchmark silent visuals only.
5. Reduced/mobile-size typography review and repeated render/authoring/revision measurements; revisit ADR-0001 if evidence changes.
