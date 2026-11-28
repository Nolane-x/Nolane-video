# M1 Candidate Scorecard — The Spoon That Bends

**Snapshot:** 2026-11-28 — latest technical candidate #154 and contract validation #45 (28 tests).  
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
| Latest green candidate run | [#154](https://github.com/Nolane-x/Nolane-video/actions/runs/46124226688) | [#154](https://github.com/Nolane-x/Nolane-video/actions/runs/46124226688) | [#154](https://github.com/Nolane-x/Nolane-video/actions/runs/46124226688) |
| Latest Actions artifact ZIP digest | `sha256:57a13b2f0e8ab59aaaa78fd72bd2b59954603063ab3c2180e30d62cc80b19114` | `sha256:38bdc66d26f13b31de09f2496353f260d0c604d2eedf492c288694daf82fb10a` | `sha256:88b8a10939d2c93bce5cb55a45ec87449d29c9fbc25c0fe07d6e25455a34b91f` |
| Latest MP4 SHA-256 | `f6b1cf4ac28d7c43c9eec3940472eb1303c65ed9ada29ecc798000b810301a67` | `91d0f7bec60e21a1deac18a59efe9b6be87b1586739099d91f7d2977e05287dd` | `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7` |
| Output metadata | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 11.624674 s, 279 frames |
| Technical result | PASS: typecheck, full render, H.264/24 fps/1,728-frame ffprobe gate and upload | PASS: official editor build, 1,728 unique sequential frames, H.264/24 fps/1,728-frame ffprobe gate, zero browser errors and upload | PASS: pinned fork install, H.264/24 fps/279-frame gate, ffprobe and upload |
| Visual review | Candidate #154 parity render is green; sampled stills only, not a continuous 24-fps watch | Candidate #154 MP4 downloaded/ffprobed; S02 8–17 s and S06 62–71 s native samples checked. Bowl clears water/glass in both lift beats; S03 physical ray path appears before S04 angle geometry. Not a continuous 24-fps watch | Candidate #154 specialist diagram render and ffprobe passed; full creative review remains limited |
| Scientific geometry | PASS on reviewed diagram | PASS against shared diagram model | PASS on reviewed diagram |
| Character acting | S02 storyboard beats render; character remains a stylized vector blockout with anatomy, weight, acting and follow-through not approved | Per-finger/palm articulation remains prop-local; clear-out transform now moves the spoon bowl above/outside the glass while the wrist target follows the same prop transform. Still vector blocking; body counterbalance, organic hand depth and final acting are not approved | Not applicable to specialist role |
| Diagram choreography | NEEDS CREATIVE REVIEW | S03 now reveals incident/refracted rays before S04 adds angle geometry; S05 still has a long apparent-point/backward-ray hold and needs continuous pacing/camera/comprehension review |
| Audio | Silent; no VO, transcript sync, SFX or music | Silent; no VO, transcript sync, SFX or music | No audio |
| License | Two-tier source-available license; eligible individuals/small companies may create commercial videos, but selling/licensing a Remotion derivative is restricted | MIT core; optional GPLv3 FFmpeg exporter excluded | MIT (Community Edition and pinned fork files) |

## Quality-gate ledger

| Gate | Status | Evidence / next action |
|---|---|---|
| Cross-engine storyboard implementation parity | PASS (source/tests) | Remotion S02 action arc and S03–S05 causal reveal are implemented; deterministic runtime parity test passed before render. Continuous creative review still required |
| Story and learning objective | PARTIAL PASS | Six-shot sequence renders; complete 24 fps comprehension review remains |
| Scientific correctness | PASS for reviewed geometry | Shared Snell/geometry validator and native-resolution diagrams pass |
| Deterministic frame output | PASS | Both full-film engines: exactly 1,728 frames; Manim segment: 279 frames |
| Technical media export | PASS | All three candidate jobs green in run [#154](https://github.com/Nolane-x/Nolane-video/actions/runs/46124226688) |
| Visual readability | PASS at reviewed native frames; reduced/mobile-size check open | Remotion caption safe area, Motion Canvas angle labels and Manim font/palette fixed |
| Diagram choreography | NEEDS CREATIVE REVIEW | Remotion and Motion Canvas stage the main explanation sequence; continuous timing, holds, camera framing and comprehension review remain open |
| Acting, prop contact and continuity | PARTIAL / NOT APPROVED | S02/S06 clear-out transform is shared with wrist IK and sampled frames show bowl above/outside the glass. Need organic hand volume, palm compression, finger depth/occlusion, wrist roll, shoulder/torso counterbalance, weight transfer, gaze, reaction and follow-through |
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
