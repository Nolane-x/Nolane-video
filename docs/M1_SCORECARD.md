# M1 Candidate Scorecard — The Spoon That Bends

**Snapshot:** 2026-11-27 — latest technical candidate #126 and contract validation #31.  
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
| Latest green candidate run | [46003070151 (#126)](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070151) | [46003070151 (#126)](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070151) | [46003070151 (#126)](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070151) |
| Latest artifact digest | `sha256:82248b0b6958777431b609a629c62486d097f91cf793ab307498b855b06e338e` | `sha256:af245b9267272fb4c58601f86db1c6c7e96585e983831a5c923a94a3da3e6109` | `sha256:d486c876a1423da6354c2c695d5f4a2b191b9bad12af474d055b7acbeee57b33` |
| Latest MP4 SHA-256 | `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2` | `a1ef3bb538f9e3f822206bfb04561f2cf85ae40748373afa744ad4a17f414862` | `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7` |
| Output metadata | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 11.624674 s, 279 frames |
| Technical result | PASS: typecheck, full render, H.264/24 fps/1,728-frame ffprobe gate and upload | PASS: official editor build, 1,728 unique sequential frames, H.264/24 fps/1,728-frame ffprobe gate, zero browser errors and upload | PASS: pinned fork install, H.264/24 fps/279-frame gate, ffprobe and upload |
| Visual review | Contact sheet and selected native frames reviewed; “NƯỚC” safe area fixed | Runs #83/#94 verified diagram orientation/dashed virtual ray; run #126 native 1080p frames at 8.8/9.8/10.8/11.8 s reviewed for four-finger grip, per-frame IK elbow tracking and prop continuity | Shared palette/font and native-resolution diagram reviewed |
| Scientific geometry | PASS on reviewed diagram | PASS against shared diagram model | PASS on reviewed diagram |
| Character acting | Not approved: vector blockout, weak hand/prop performance | Reusable four-finger prop grip plus two-bone IK now recalculates elbow position every animation frame; segment lengths are fixed at 200/615 px and wrist targets follow rotated prop anchors. Selected run #126 frames show contact through lift/inspect/re-dip. Still stylized vector blockout, not production anatomy or acting | Not applicable to specialist role |
| Diagram choreography | Needs work: causality and timing need full-speed review | Reusable refraction diagram extracted; backward extension is now dashed and geometry remains shared. Still needs a causal pacing/hold review at full speed | Legible reveal, but opening is sparse; VO timing not tested |
| Audio | Silent; no VO, transcript sync, SFX or music | Silent; no VO, transcript sync, SFX or music | No audio |
| License | Two-tier source-available license; eligible individuals/small companies may create commercial videos, but selling/licensing a Remotion derivative is restricted | MIT core; optional GPLv3 FFmpeg exporter excluded | MIT (Community Edition and pinned fork files) |

## Quality-gate ledger

| Gate | Status | Evidence / next action |
|---|---|---|
| Story and learning objective | PARTIAL PASS | Six-shot sequence renders; complete 24 fps comprehension review remains |
| Scientific correctness | PASS for reviewed geometry | Shared Snell/geometry validator and native-resolution diagrams pass |
| Deterministic frame output | PASS | Both full-film engines: exactly 1,728 frames; Manim segment: 279 frames |
| Technical media export | PASS | All three candidate jobs green in run [46003070151 (#126)](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070151) |
| Visual readability | PASS at reviewed native frames; reduced/mobile-size check open | Remotion caption safe area, Motion Canvas angle labels and Manim font/palette fixed |
| Diagram choreography | NEEDS WORK | Stage interface → normal → physical rays → measured angles → backward extension → apparent point as distinct causal transformations; remove unmotivated static holds |
| Acting, prop contact and continuity | PARTIAL / NOT APPROVED | Four-finger prop grip and per-frame two-bone IK now preserve segment lengths while wrist targets move. Selected #126 frames show contact through lift/inspect/re-dip. Still need full 24 fps review, thumb opposition, finger wrap/palm compression, wrist roll, shoulder/torso weight transfer, reaction and follow-through |
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
2. Upgrade Nia beyond the first grip slice with remaining fingers, palm/wrist quality, hand-to-handle pressure, weight transfer, reaction and follow-through; inspect all S02 frames.
3. Re-choreograph the diagram as a causal sequence with purposeful holds and motivated camera moves.
4. Approved narration, transcript-synchronized captions, SFX and music, or a documented amendment to benchmark silent visuals only.
5. Reduced/mobile-size typography review and repeated render/authoring/revision measurements; revisit ADR-0001 if evidence changes.
