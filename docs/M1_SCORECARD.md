# M1 Candidate Scorecard — The Spoon That Bends

**Snapshot:** 2026-11-27  
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
| Latest green candidate run | [45944799022](https://github.com/Nolane-x/Nolane-video/actions/runs/45944799022) | [45944799022](https://github.com/Nolane-x/Nolane-video/actions/runs/45944799022) | [45944799022](https://github.com/Nolane-x/Nolane-video/actions/runs/45944799022) |
| Latest artifact digest | `sha256:e5819c0d06ebcdd9eda332a0619a605b8957bc3c77bdccf7d4e55dea92f3f998` | `sha256:d8450a374bfce31820c1cdfd2bf5aadd324396cd58dcb1e80a731fd85755816b` | `sha256:cc5f53c5252d81399f3b640e4ac16053c0feb68152afb34dd64e035724c87889` |
| Latest MP4 SHA-256 | `1970da35a380c0fd08a8a04e74bc03d050d21bb389ecb0bdd483ab49f232bbda` | `8b6d7c9f388c5660b2594105ba0dcfa0e9a2ed1248262daea140048dbd40220d` | `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7` |
| Output metadata | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 11.624674 s, 279 frames |
| Technical result | PASS: typecheck, full render, ffprobe and upload | PASS: official editor build, exactly 1,728 unique sequential frames, renderer success, FFmpeg, ffprobe, upload and clean process exit | PASS: pinned fork install, render, ffprobe and upload |
| Visual review | Contact sheet and selected native frames reviewed; “NƯỚC” safe area fixed | Contact sheet and native frame reviewed; 40°/58.9° labels corrected clear of rays | Shared palette/font and native-resolution diagram reviewed |
| Scientific geometry | PASS on reviewed diagram | PASS against shared diagram model | PASS on reviewed diagram |
| Character acting | Not approved: vector blockout, weak hand/prop performance | Not approved: static arm stroke, no detailed hand/grip or acted lift/re-dip | Not applicable to specialist role |
| Diagram choreography | Needs work: causality and timing need full-speed review | Needs work: long holds and reveal order need a deliberate teaching pass | Legible reveal, but opening is sparse; VO timing not tested |
| Audio | Silent; no VO, transcript sync, SFX or music | Silent; no VO, transcript sync, SFX or music | No audio |
| License | Two-tier source-available license; eligible individuals/small companies may create commercial videos, but selling/licensing a Remotion derivative is restricted | MIT core; optional GPLv3 FFmpeg exporter excluded | MIT (Community Edition and pinned fork files) |

## Quality-gate ledger

| Gate | Status | Evidence / next action |
|---|---|---|
| Story and learning objective | PARTIAL PASS | Six-shot sequence renders; complete 24 fps comprehension review remains |
| Scientific correctness | PASS for reviewed geometry | Shared Snell/geometry validator and native-resolution diagrams pass |
| Deterministic frame output | PASS | Both full-film engines: exactly 1,728 frames; Manim segment: 279 frames |
| Technical media export | PASS | All three candidate jobs green in runs 45944266231 and 45944799022 |
| Visual readability | PASS at reviewed native frames; reduced/mobile-size check open | Remotion caption safe area, Motion Canvas angle labels and Manim font/palette fixed |
| Diagram choreography | NEEDS WORK | Stage interface → normal → physical rays → measured angles → backward extension → apparent point as distinct causal transformations; remove unmotivated static holds |
| Acting, prop contact and continuity | NOT APPROVED | Build Nia gaze, anticipation, articulated grip, hand/spoon coupling, reaction and follow-through; review key poses and 24 fps playback |
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

1. Full-speed 24 fps review of the complete Remotion and Motion Canvas films.
2. A real character/prop vertical slice with articulated hand, grip constraints, anticipation, action, reaction and follow-through.
3. A deliberately choreographed educational diagram reveal with purposeful holds.
4. Approved narration, synchronized captions, SFX and music, or a documented amendment to benchmark silent visuals only.
5. Repeated render and authoring/revision measurements; revisit ADR-0001 if the evidence changes.
