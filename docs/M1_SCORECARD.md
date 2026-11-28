# M1 Candidate Scorecard — The Spoon That Bends

**Snapshot:** 2026-11-28 — latest technical candidate #149 and contract validation #41 (26 tests).  
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
| Latest green candidate run | [#149](https://github.com/Nolane-x/Nolane-video/actions/runs/46119630293) | [#149](https://github.com/Nolane-x/Nolane-video/actions/runs/46119630293) | [#149](https://github.com/Nolane-x/Nolane-video/actions/runs/46119630293) |
| Latest Actions artifact ZIP digest | `sha256:f7c665aac7b95af5b6288941fae925b7aab475adcca72fb70bcfc69a64fe95f5` | `sha256:819eb82fcd7cc5935f4818f9bcfddd6f8ae5bb2927db9b555dbfdb390a9261cb` | `sha256:baa71ca7068ee9caa7daaf29b9db43834c7535321113537ccb8db3c4aebe1f5c` |
| Latest MP4 SHA-256 | `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2` | `e78426c403b25c06cdabaa3310f5242ddb2b9977dec637025cef329e6d827ce8` | `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7` |
| Output metadata | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 11.624674 s, 279 frames |
| Technical result | PASS: typecheck, full render, H.264/24 fps/1,728-frame ffprobe gate and upload | PASS: official editor build, 1,728 unique sequential frames, H.264/24 fps/1,728-frame ffprobe gate, zero browser errors and upload | PASS: pinned fork install, H.264/24 fps/279-frame gate, ffprobe and upload |
| Visual review | Candidate #149 parity render is green; reviewed stills remain sampled, not a continuous 24-fps watch | Candidate #149 MP4 downloaded/ffprobed; contact sheet, native 1080p samples at 8.8/9.5/10.5/11.5 s and grip crops checked. Thumb base blends into palm; not a continuous 24-fps watch | Candidate #149 specialist diagram render and ffprobe passed; full creative review remains limited |
| Scientific geometry | PASS on reviewed diagram | PASS against shared diagram model | PASS on reviewed diagram |
| Character acting | S02 action beats follow the shared storyboard, but character remains a stylized vector blockout; anatomy, weight, acting and follow-through are not approved | Per-finger creases/palm crease/thenar pad now animate in prop-local space; pad contour is blended into palm. Still vector blocking with limited depth/volume, not organic anatomy or final acting | Not applicable to specialist role |
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
| Technical media export | PASS | All three candidate jobs green in run [#149](https://github.com/Nolane-x/Nolane-video/actions/runs/46119630293) |
| Visual readability | PASS at reviewed native frames; reduced/mobile-size check open | Remotion caption safe area, Motion Canvas angle labels and Manim font/palette fixed |
| Diagram choreography | NEEDS CREATIVE REVIEW | Remotion and Motion Canvas stage the main explanation sequence; continuous timing, holds, camera framing and comprehension review remain open |
| Acting, prop contact and continuity | PARTIAL / NOT APPROVED | Thumb-base contour now blends into palm; prop-local finger/palm cues and IK remain stable. Need palm compression, finger depth/occlusion, organic volume, wrist roll, shoulder/torso counterbalance, weight transfer, reaction and follow-through |
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
