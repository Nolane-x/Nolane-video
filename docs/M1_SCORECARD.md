# M1 Candidate Scorecard — The Spoon That Bends

**Snapshot:** 2026-11-27 — latest technical candidate #134 and contract validation #34 (25 tests).  
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
| Latest green candidate run | [46007922641 (#134)](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922641) | [46007922641 (#134)](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922641) | [46007922641 (#134)](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922641) |
| Latest artifact digest | `sha256:eae41102226da187891482d0f67b2317635134f677e69f149b4d59ff3c1ed238` | `sha256:a97cef0a398ec82d351bf4c9cd47d46525e934fea35b82d0ff318e83ec230e89` | `sha256:296a568a8929ee2a60dd2e0bc7883ff5037f1145ae28f8cfef5a3291b0283140` |
| Latest MP4 SHA-256 | `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2` | `3906dc514affe8b91fe226e51a5c16b0a535869ddc5f3483359dab024b81ead4` | `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7` |
| Output metadata | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 11.624674 s, 279 frames |
| Technical result | PASS: typecheck, full render, H.264/24 fps/1,728-frame ffprobe gate and upload | PASS: official editor build, 1,728 unique sequential frames, H.264/24 fps/1,728-frame ffprobe gate, zero browser errors and upload | PASS: pinned fork install, H.264/24 fps/279-frame gate, ffprobe and upload |
| Visual review | Contact sheet and selected native frames reviewed; “NƯỚC” safe area fixed | Runs #83/#94 verified diagram orientation/dashed virtual ray; run #134 native 1080p frames at 9.5/10.5/11.5 s reviewed for four separated handle-axis finger wraps, opposing thumb and per-frame IK/prop continuity | Shared palette/font and native-resolution diagram reviewed |
| Scientific geometry | PASS on reviewed diagram | PASS against shared diagram model | PASS on reviewed diagram |
| Character acting | Not approved: vector blockout, weak hand/prop performance | Four finger paths derive from the canonical spoon-shaft axis at separated stations, with the thumb wrapping from the opposite side. Two-bone IK recalculates the elbow every frame. Run #134 selected frames show clearer grip through lift/inspect/re-dip. Still stylized vector anatomy, not production-level acting | Not applicable to specialist role |
| Diagram choreography | Needs work: causality and timing need full-speed review | Reusable refraction diagram extracted; backward extension is now dashed and geometry remains shared. Still needs a causal pacing/hold review at full speed | Legible reveal, but opening is sparse; VO timing not tested |
| Audio | Silent; no VO, transcript sync, SFX or music | Silent; no VO, transcript sync, SFX or music | No audio |
| License | Two-tier source-available license; eligible individuals/small companies may create commercial videos, but selling/licensing a Remotion derivative is restricted | MIT core; optional GPLv3 FFmpeg exporter excluded | MIT (Community Edition and pinned fork files) |

## Quality-gate ledger

| Gate | Status | Evidence / next action |
|---|---|---|
| Story and learning objective | PARTIAL PASS | Six-shot sequence renders; complete 24 fps comprehension review remains |
| Scientific correctness | PASS for reviewed geometry | Shared Snell/geometry validator and native-resolution diagrams pass |
| Deterministic frame output | PASS | Both full-film engines: exactly 1,728 frames; Manim segment: 279 frames |
| Technical media export | PASS | All three candidate jobs green in run [46007922641 (#134)](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922641) |
| Visual readability | PASS at reviewed native frames; reduced/mobile-size check open | Remotion caption safe area, Motion Canvas angle labels and Manim font/palette fixed |
| Diagram choreography | NEEDS WORK | Stage interface → normal → physical rays → measured angles → backward extension → apparent point as distinct causal transformations; remove unmotivated static holds |
| Acting, prop contact and continuity | PARTIAL / NOT APPROVED | Handle-axis-derived four-finger paths and opposing thumb now form a clearer cross-section grip; per-frame IK keeps arm lengths fixed. Selected #133 frames confirm contact visually. Still need full 24 fps review, anatomical joints, palm compression, wrist roll, shoulder/torso counterbalance, reaction and follow-through |
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
