# M1 Candidate Status — The Spoon That Bends

**Snapshot:** 2026-11-27  
**Branch:** `m1/optics-benchmark`  
**Decision status:** OPEN — candidate evidence is now technically complete; creative/audio review and architecture decision remain open.

## Executive status

Run [45943879530](https://github.com/Nolane-x/Nolane-video/actions/runs/45943879530) completed successfully with all three candidate jobs passing. Remotion and Motion Canvas each produced the full silent 72-second film; Manim produced the specialist refraction segment. The shared validator and the frame-range regression tests also pass.

| Candidate | Technical result | Visual result | Remaining limitation |
|---|---|---|---|
| Remotion 4.0.547 | PASS — H.264, 1920×1080, 24 fps, 72.000 s, 1,728 frames | Six-shot sequence and science diagram reviewed; water-label caption safe area fixed | Character/prop acting is still a geometric blockout; no real audio |
| Motion Canvas 3.17.2 | PASS — H.264, 1920×1080, 24 fps, 72.000 s, 1,728 frames; full official editor export and ffprobe pass | Six-shot contact sheet/native frames reviewed; angle-label spacing correction pending in run 45944266231 | Character is a static geometric blockout; no believable hand/grip or prop-contact performance; no real audio |
| Manim CE fork | PASS — S04–S05 specialist segment, H.264, 1920×1080, 24 fps, 11.624674 s / 279 frames | Shared palette/font revision reviewed at native resolution; scientific construction is legible | Only a diagram segment; no character-led full-film role or audio sync |

No numeric ranking is approved and no master renderer is selected yet. A completed render proves export reliability, not final animation quality.

## Shared benchmark contract

- Film: **The Spoon That Bends / Vì sao chiếc thìa trông như bị gãy trong nước?**
- 72 seconds, 1920×1080, 24 fps, 1,728 output samples with indices 0–1,727.
- Six shots: hook, physical contradiction, optical reveal, refraction, apparent image, resolution.
- Canonical storyboard: `benchmarks/optics-spoon/shared/storyboard.json`.
- Canonical scientific geometry: `benchmarks/optics-spoon/shared/diagram.json`.
- Script, research ledger and art direction live in `benchmarks/optics-spoon/shared/`.
- The frame-range contract is half-open `[0, 1728)`. Motion Canvas maps time endpoints with `ceil(seconds × fps)`; its last included timestamp is therefore 71.95833333333333 s.

## Candidate evidence

### Remotion 4.0.547 — full-film candidate

- Successful job in [45943879530](https://github.com/Nolane-x/Nolane-video/actions/runs/45943879530).
- Artifact: `m1-remotion-candidate`, digest `sha256:18712527a3c4cb5ec10790c31dd3db296aa418774783588a8a8a98c263ab6903`.
- Output: H.264, 1920×1080 progressive, 24/1 fps, 72.000 s, 1,728 frames.
- The “NƯỚC” label safe-area fix from `e5e0259ca2c517858511dcaf11a70edb40f640ea` is present and was reviewed in the full-resolution output.
- This is a deterministic vector prototype. It does not yet show production-level character acting, articulated fingers/grip, convincing prop weight/contact or a real audio mix.
- Recheck Remotion's two-tier product license before considering commercial redistribution/embedding.

### Motion Canvas 3.17.2 — full-film candidate

- Successful job in [45943879530](https://github.com/Nolane-x/Nolane-video/actions/runs/45943879530).
- Artifact: `m1-motion-canvas-candidate`, digest `sha256:19c770d1cff47e1a11d7b6ffefacbb457004724542a5f052f5a01343b82c982d`.
- MP4 SHA-256: `2cda419f879a99a06b17453bc33232ecc43d4c3bedd648d2be77b5ad2ae18acd`.
- Output: H.264 High profile, 1920×1080, yuv420p, 24/1 fps, 1,728 frames, 72.000 s. The accompanying render report records 1,728/1,728 frames and zero browser errors.
- Renderer log: `RendererResult.Success`, `lastFrame: 1727`, `exportEvents=1728`, `uniqueFrames=1728`, `PNG files=1728/1728`.
- The script hang is fixed in commit `ad8fc14a848b02a61d7b76fb916ab4bfb0942e14`: the renderer launches Vite directly in a detached process group and waits for the process group to terminate, rather than killing only an `npm` wrapper and leaving Vite/esbuild orphaned.
- Visual correction to move 40°/58.9° labels away from ray lines is in commit `3a091f4fe5eec706014aadfb42f17679752ea733`; render confirmation is in [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231), currently in progress at the time of this report.
- Motion Canvas public packages inspected are MIT-licensed. Its optional FFmpeg exporter is GPLv3 and is not used; independent FFmpeg assembles the MP4 from PNGs.

### Manim Community Edition fork — specialist scientific segment

- Successful job in [45943879530](https://github.com/Nolane-x/Nolane-video/actions/runs/45943879530).
- Pinned fork commit: `18320e2f0feaf142b2c3a377068ddb44c82fb2a1`.
- Artifact: `m1-manim-refraction-segment`, digest `sha256:d33772298acaabfe6eeb1506758d625e888b267674bdf5155a3789af60859c63`.
- MP4 SHA-256: `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- Output: H.264, 1920×1080, 24/1 fps, 279 frames, 11.624674 s.
- The revised source uses the shared Deep Ink/Water Slate/Ray Gold palette, DejaVu Sans and a persistent water region. The final native-resolution frame, contact sheet, formula and ray construction have been reviewed.
- Manim remains a specialist diagram adapter, not a full-film candidate.

## Shared validation and regression coverage

- Validator run [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249) passed.
- Unit/regression run [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293) passed all 11 tests, including a regression that rejects a 72.0-second Motion Canvas inclusive endpoint because it would add frame 1,728.
- Candidate run [45943879530](https://github.com/Nolane-x/Nolane-video/actions/runs/45943879530) passed Remotion, Motion Canvas and Manim jobs.

## What remains incomplete

- Inspect run 45944266231 to approve/revise Motion Canvas angle-label safe-area correction.
- Watch complete moving output for both full-film candidates; the current report covers contact sheets and selected stills, not full continuous-motion creative approval.
- Upgrade character performance, hand anatomy, grip/contact coupling, anticipation, follow-through and motivated camera work.
- Add an approved real Vietnamese VO, transcript-aligned captions, SFX and music before audio QA. Current previews are silent.
- Complete H2 source provenance/license audit before any reuse.
- Complete the candidate scorecard and architecture decision with explicit quality gates and caveats. Do not infer final superiority from technical render success alone.

## Immediate next action

1. Inspect [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231); review the updated Motion Canvas contact sheet and 1080p frame for angle-label spacing.
2. Update `VISUAL-QA.md` and `M1_SCORECARD.md` from that artifact.
3. Perform continuous-motion review and write a provisional renderer/adapter ADR. Keep audio and final acting quality explicitly open.
