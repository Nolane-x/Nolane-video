# M1 Candidate Scorecard — The Spoon That Bends

**Snapshot:** 2026-11-28 — candidate #185 and contract #55 (30 tests); paired native-frame S06 review completed.  
**Status:** all candidate #185 renderer jobs and contract #55 are green. S06 action timing is aligned and sampled between full-film outputs, but cross-engine character/set styling, final fade, continuous 24-fps review and creative/audio acceptance remain open. No overall numeric score is assigned.  
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
| Latest green candidate run | [#185](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076477) | [#185](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076477) | [#185](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076477) |
| Latest Actions artifact ZIP digest | `sha256:39dfe3a6945e8930bfde3d38b717812f5bf90846d22ba91f2d30d73eec4c4af7` | `sha256:a6d077ca39523b548a02c1b77ddc0f04ad307900a1f8e99323bbc171b31416fb` | `sha256:495ee1ea1c47b0d8539436d669eb7dd3357f18d84378745a25b567a0bad2426c` |
| Latest MP4 SHA-256 | `288118afaa584bc75aca61e6375a54f6c481a17d1f87f33cf6befbfef915be87` | `8ec191e235ab28ca36477be47f9cef568a7175f0d26c50fef6ace0ba55c95882` | Not included in candidate ZIP |
| Output metadata | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 11.624674 s, 279 frames |
| Technical result | PASS: typecheck, full render, H.264/24 fps/1,728-frame ffprobe gate and upload | PASS: official editor build, 1,728 unique sequential frames, H.264/24 fps/1,728-frame ffprobe gate, zero browser errors and upload | PASS: pinned fork install, H.264/24 fps/279-frame gate, ffprobe and upload |
| Visual review | #185 contact sheet and selected native S06 frames 1464–1727 sampled; no continuous 24-fps review | #185 contact sheet and same S06 frames sampled; no continuous 24-fps review | #185 specialist segment technically validated; no full creative review claimed |
| Scientific geometry | PASS on reviewed diagram | PASS against shared diagram model | PASS on reviewed diagram |
| Character acting | Remotion Nia is still a stylized vector blockout; anatomy, weight, acting and follow-through not approved | S06 submerged → lift → inspect → settle action now matches Remotion's sampled beat timing; fingers/palm remain graphic. Nia and kitchen styling still differ visibly between renderers; organic hand depth and final acting not approved | Not applicable to specialist role |
| Diagram choreography | NEEDS CREATIVE REVIEW | S03/S04 physical-ray/angle order is staged; S05 reveals backward extension, then true-position label, then apparent point/label/caption. The 13.85 s final hold needs VO-led continuous pacing/camera/comprehension review |
| Audio | Silent; no VO, transcript sync, SFX or music | Silent; no VO, transcript sync, SFX or music | No audio |
| License | Two-tier source-available license; eligible individuals/small companies may create commercial videos, but selling/licensing a Remotion derivative is restricted | MIT core; optional GPLv3 FFmpeg exporter excluded | MIT (Community Edition and pinned fork files) |

## Quality-gate ledger

| Gate | Status | Evidence / next action |
|---|---|---|
| Cross-engine storyboard implementation parity | PARTIAL PASS (timing/action tests + sampled S06) | Remotion and Motion Canvas S06 clear-out actions align at authored brace/lift/inspect/settle windows; #185 and #55 pass. Renderer-space spoon angles differ by design; Nia/set styling and final fade still diverge. Continuous review required |
| Story and learning objective | PARTIAL PASS | Six-shot sequence renders; complete 24 fps comprehension review remains |
| Scientific correctness | PASS for reviewed geometry | Shared Snell/geometry validator and native-resolution diagrams pass |
| Deterministic frame output | PASS | Both full-film engines: exactly 1,728 frames; Manim segment: 279 frames |
| Technical media export | PASS | All three candidate jobs green in [#185](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076477); [contract #55](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076436) passed 30 tests |
| Visual readability | PASS at reviewed native frames; reduced/mobile-size check open | Remotion caption safe area, Motion Canvas angle labels and Manim font/palette fixed |
| Diagram choreography | NEEDS CREATIVE REVIEW | S03/S04 causal ray order and S05's dashed-extension → true-position label → apparent-point reveal are implemented and sampled; the 13.85 s S05 hold, camera framing and learning comprehension still need narration-led continuous review |
| Acting, prop contact and continuity | PARTIAL / NOT APPROVED | S06 action is coupled to wrist/arm, torso, head and gaze, with sampled hand/prop association. Natural palm/finger volume, depth/occlusion, organic wrist roll, weight transfer, character acting and renderer-to-renderer character consistency remain open |
| Camera and editing | PARTIAL — Remotion now has deterministic 2.5% S01/S06 push-ins with S03 reset; sampled frames show no obvious crop loss, but continuous review remains open | Motion Canvas has the matching camera beat; inspect both films continuously and at mobile size |
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
