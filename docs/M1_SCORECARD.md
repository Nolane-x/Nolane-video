# M1 Candidate Scorecard — The Spoon That Bends

**Snapshot:** 2026-11-27  
**Status:** technical comparison complete; creative/audio acceptance still open. No overall numeric score is assigned.  
**Architecture decision:** Motion Canvas is the provisional first 2D scene runtime under [ADR-0001](adr/ADR-0001-motion-canvas-first-2d-runtime.md). This is an implementation choice, not a claim of final artistic superiority.

## Benchmark contract

- 72.000-second target film.
- 1920×1080, 24 fps, exactly 1,728 frames (indices 0–1,727).
- Shared Vietnamese script, six-shot schedule, art direction and canonical refraction geometry.
- Remotion and Motion Canvas are full-film candidates; Manim is an S04–S05 scientific diagram adapter.

## Evidence-backed comparison

| Dimension | Remotion 4.0.547 | Motion Canvas 3.17.2 | Manim CE fork |
|---|---|---|---|
| Intended role | Full-film baseline/possible adapter | First 2D/2.5D scene runtime (provisional) | Specialist diagram adapter |
| Latest all-green run | [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231) | [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231) | [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231) |
| Artifact digest | `sha256:4ebbeecc977c377910eed47949d4eb5271f22f6cb90aeecbeff94f9000e6cc7e` | `sha256:daa9b3a5501a001d1f34af7b19bd6000cbaf3d8d831db30d79beefbe809a9a2d` | `sha256:b70d75224e904f4d04719f6f7388bb973cbd239016b8a2f265f024f09a097c36` |
| Output metadata | H.264, 1920×1080, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames | H.264, 1920×1080, 24 fps, 11.624674 s, 279 frames |
| Technical result | PASS: typecheck, full render, ffprobe and upload | PASS: official editor build, 1,728 unique sequential frames, renderer success, FFmpeg, ffprobe, upload and clean process exit | PASS: pinned fork install, render, ffprobe and upload |
| Visual review | Contact sheet and selected native frames reviewed; “NƯỚC” safe area fixed | Contact sheet and native frame reviewed; 40°/58.9° labels repositioned clear of rays | Palette/font and native-resolution diagram reviewed |
| Scientific geometry | PASS on reviewed diagram | PASS against shared diagram model | PASS on reviewed diagram |
| Character acting | Not approved: vector blockout, weak hand/prop performance | Not approved: static arm stroke, no detailed hand/grip or acted lift/re-dip | Not applicable to specialist role |
| Diagram choreography | Needs work; review sequence/timing at full speed | Needs work; current long holds and reveal order need a deliberate teaching pass | Legible reveal but opening is sparse; VO timing not tested |
| Audio | Silent; no VO, transcript sync, SFX or music | Silent; no VO, transcript sync, SFX or music | No audio |
| License | Two-tier source-available license; individual/small eligible use is allowed, but product/redistribution restrictions need review | MIT core; optional GPLv3 FFmpeg exporter excluded | MIT (Community Edition and pinned fork license files) |

## Quality-gate ledger

| Gate | Status | Evidence / next action |
|---|---|---|
| Story and learning objective | PARTIAL PASS | Six-shot sequence renders; do a full-speed comprehension review |
| Scientific correctness | PASS for reviewed geometry | Shared Snell/geometry validator and 1080p diagrams pass |
| Deterministic frame output | PASS | Both full-film engines: exactly 1,728 frames; Manim segment also passes |
| Technical media export | PASS | All three candidate jobs green in run 45944266231; Motion Canvas passes ffprobe and exits cleanly |
| Visual readability | PASS at reviewed native frames; reduced-size check still open | Remotion safe area and Motion Canvas angle labels fixed; recheck mobile/reduced scale |
| Diagram choreography | NEEDS WORK | Stage interface → normal → rays → measured angles → backward extension → apparent point as distinct causal transformations; avoid long static holds |
| Acting, prop contact and continuity | NOT APPROVED | Build Nia's articulated hand/grip, anticipation, lift/re-dip, reaction and follow-through; inspect key poses and 24 fps playback |
| Camera and editing | PARTIAL | Current camera/transition work is basic; use motivated moves and match continuity |
| Audio/narration/captions | NOT TESTED | Add approved real VO, transcript-aligned captions, SFX and music before audio acceptance |
| Reproducibility and revision cost | PARTIAL | CI and pinned versions work; repeated timing and authoring/revision study remain |
| Licensing/reuse | PARTIAL | MC/Manim suitable under inspected MIT licenses; Remotion requires use-case/entity review; H2 provenance audit open |

## Performance and measurement caveat

Do not rank the engines by one CI render duration. The candidate runs execute on separate jobs and Manim renders only an 11.6-second specialist segment, while Remotion/Motion Canvas render the full film. A fair performance study needs repeated runs on equivalent runner classes and should report scene-authoring time, preview latency, render time, revision time and artifact determinism separately.

## Architecture decision

[ADR-0001](adr/ADR-0001-motion-canvas-first-2d-runtime.md) provisionally selects Motion Canvas as the first 2D scene-execution adapter because it completed the same full-film technical gate as Remotion, uses an MIT-licensed core, and fits the generator/choreography approach. This decision preserves a renderer-independent Film IR. Manim remains a specialist math/diagram adapter; Remotion remains a baseline/possible adapter pending product-license review.

This is not a quality ranking. The prototypes do not yet meet NEE's desired acting, prop-contact, cinematic camera, audio or final-art-direction bar.

## Next required evidence

1. Full-speed 24 fps review of the complete Remotion and Motion Canvas films.
2. A real character/prop vertical slice with articulated hand, grip constraints, anticipation, action, reaction and follow-through.
3. A deliberately choreographed educational diagram reveal with no long unmotivated holds.
4. Approved narration, synchronized captions, SFX and music, or a documented silent-visual-only benchmark amendment.
5. Repeated render and authoring/revision measurements; then revisit ADR-0001 if evidence contradicts the provisional decision.
