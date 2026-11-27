# M1 Candidate Status — The Spoon That Bends

**Snapshot:** 2026-11-27  
**Branch:** `m1/optics-benchmark`  
**Decision status:** provisional first 2D runtime selected by [ADR-0001](../../docs/adr/ADR-0001-motion-canvas-first-2d-runtime.md); creative/audio acceptance remains open.

## Executive status

Candidate run [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231) completed successfully with all three jobs green. Remotion and Motion Canvas each produced the full silent 72-second film; Manim produced the specialist refraction segment. Motion Canvas's exact 1,728-frame range, MP4 metadata, process cleanup and angle-label adjustment all passed.

| Candidate | Technical result | Visual result | Remaining limitation |
|---|---|---|---|
| Remotion 4.0.547 | PASS — H.264, 1920×1080, 24 fps, 72.000 s, 1,728 frames | Six-shot sequence and science diagram reviewed; water-label caption safe area fixed | Character/prop acting is a vector blockout; silent; proprietary two-tier license needs product review |
| Motion Canvas 3.17.2 | PASS — official editor export, 1,728 sequential frames, FFmpeg, ffprobe and candidate upload | Contact sheet/native frames reviewed; angle labels corrected away from ray paths | Character/arm is a blockout with no articulated grip; diagram still has long static holds; silent |
| Manim CE fork | PASS — S04–S05 specialist segment, H.264, 1920×1080, 24 fps, 11.624674 s / 279 frames | Shared palette/font and scientific construction reviewed | Specialist diagram only; opening timing needs VO context |

No numeric quality ranking is claimed. A technical render pass is not final creative approval.

## Shared benchmark contract

- Film: **The Spoon That Bends / Vì sao chiếc thìa trông như bị gãy trong nước?**
- 72 seconds, 1920×1080, 24 fps, 1,728 output samples with indices 0–1,727.
- Six shots: hook, physical contradiction, optical reveal, refraction, apparent image, resolution.
- Canonical storyboard: `benchmarks/optics-spoon/shared/storyboard.json`.
- Canonical scientific geometry: `benchmarks/optics-spoon/shared/diagram.json`.
- The frame-range contract is half-open `[0, 1728)`. Motion Canvas maps its inclusive time endpoint with `ceil(seconds × fps)`; the last included timestamp is 71.95833333333333 s.

## Candidate evidence

### Remotion 4.0.547 — full-film baseline

- Successful job in [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231).
- Artifact: `m1-remotion-candidate`, digest `sha256:4ebbeecc977c377910eed47949d4eb5271f22f6cb90aeecbeff94f9000e6cc7e`.
- Output: H.264, 1920×1080 progressive, 24/1 fps, 72.000 s, 1,728 frames.
- The “NƯỚC” caption-safe-area fix from commit `e5e0259ca2c517858511dcaf11a70edb40f640ea` is present and visually verified.
- The prototype still lacks production-level character acting, articulated fingers/grip, convincing prop weight/contact and a real audio mix.
- Upstream/fork license source inspected at `Nolane-x/remotion` commit `6951a4f4f72fa0e397ea91586aef1386bf2585bb`: `LICENSE.md` is a two-tier source-available license (blob SHA `b0ad889f2b3eaee020de507ca6e98f1f1b664c9d`). Eligible individuals and small companies can create videos/images, including commercial output; the Free License prohibits selling, renting, licensing, relicensing or sublicensing a Remotion derivative. Verify the intended legal entity and NEE distribution model before embedding/redistributing Remotion-derived software.

### Motion Canvas 3.17.2 — first 2D runtime (provisional)

- Successful job in [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231).
- Artifact: `m1-motion-canvas-candidate`, digest `sha256:daa9b3a5501a001d1f34af7b19bd6000cbaf3d8d831db30d79beefbe809a9a2d`.
- MP4 SHA-256: `8b6d7c9f388c5660b2594105ba0dcfa0e9a2ed1248262daea140048dbd40220d`.
- Contact-sheet SHA-256: `d88fc57c6d7452a5e720cecc7afca84ee167ddb2c74f3157bdd7d84df4070a03`.
- Output: H.264, 1920×1080, yuv420p, 24/1 fps, 1,728 frames, 72.000 s. Render report records zero browser errors.
- Renderer log: `RendererResult.Success`, `lastFrame: 1727`, `exportEvents=1728`, `uniqueFrames=1728`, `PNG files=1728/1728`.
- Process lifecycle fix: commit `ad8fc14a848b02a61d7b76fb916ab4bfb0942e14` starts Vite directly in a detached process group and awaits group termination, so Actions no longer hangs after MP4 creation.
- Angle-label layout correction: commit `3a091f4fe5eec706014aadfb42f17679752ea733` moved 40°/58.9° and “Pháp tuyến” away from ray lines; run 45944266231 confirms the new output.
- Exact upstream v3.17.2 `LICENSE` is MIT (blob SHA `b30f04e173f68773714b7d9e2652caecbeec53f9`). Optional Motion Canvas FFmpeg exporter is GPLv3 and remains excluded; the benchmark uses the core image-sequence exporter plus independent FFmpeg.
- The current renderer is not itself a character rig. NEE still needs its own actor, hand/grip/contact and acting systems.

### Manim Community Edition fork — specialist scientific adapter

- Successful job in [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231).
- Pinned fork commit: `18320e2f0feaf142b2c3a377068ddb44c82fb2a1`.
- Artifact: `m1-manim-refraction-segment`, digest `sha256:b70d75224e904f4d04719f6f7388bb973cbd239016b8a2f265f024f09a097c36`.
- MP4 SHA-256: `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- Output: H.264, 1920×1080, 24/1 fps, 279 frames, 11.624674 s.
- The revised source uses the shared Deep Ink/Water Slate/Ray Gold palette, DejaVu Sans and persistent water region; the final native-resolution frame and contact sheet were reviewed.
- Both `LICENSE.community` and base `LICENSE` at the pinned fork commit are MIT. Manim remains a specialist math/diagram adapter, not a full-film candidate.

## Shared validation and architecture decision

- Validator run [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249) passed.
- Unit/regression run [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293) passed all 11 tests, including rejection of a 72.0-second inclusive Motion Canvas endpoint.
- Candidate run [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231) passed Remotion, Motion Canvas and Manim.
- [ADR-0001](../../docs/adr/ADR-0001-motion-canvas-first-2d-runtime.md) provisionally selects Motion Canvas as the first 2D scene-execution adapter, preserves Film IR independence, assigns Manim a specialist role and keeps Remotion as a reference/possible adapter pending licensing review.

## What remains incomplete

- Full-speed 24 fps playback review for both full-film outputs.
- More convincing Nia acting, a real hand/grip, prop contact coupling, anticipation, reaction and follow-through.
- More deliberate diagram choreography: interface → normal → physical rays → measured angles → backward extension → apparent point, with purposeful holds rather than long static layouts.
- Motivated camera moves and stronger shot-to-shot continuity.
- Approved Vietnamese narration, transcript-aligned captions, SFX and music; current outputs are silent.
- Reduced/mobile-size type check and repeated performance/authoring-cost measurements.
- H2 source provenance/license audit before any reuse.

## Next task

Build the first NEE-owned character/diagram vertical slice on Motion Canvas behind the renderer-independent Film IR boundary. Start with one convincing Nia–spoon interaction (gaze, anticipation, grip, lift, contact/release and settle), then choreograph the Snell diagram causally. Keep the full benchmark passing as a regression fixture and do not claim audio approval until a real approved track is synchronized.
