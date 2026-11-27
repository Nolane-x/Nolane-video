# M1 Candidate Status — The Spoon That Bends


## Live technical and vertical-slice update — 2026-11-27 06:29 UTC

This section supersedes the older run references below where they disagree.

- Latest candidate workflow: [run #89](https://github.com/Nolane-x/Nolane-video/actions/runs/45951640411), source commit `776d219fa02bd5392b7ade94ad348fbe3d74a7dd`. **All three jobs passed.**
- Remotion artifact `m1-remotion-candidate`: digest `sha256:a703a6af58513e18f7a771f3e00ac17dcc49a31d7d6f12b84910e4b429c26389`; H.264, 1920×1080, 24/1 fps, 72.000 s, 1,728 frames; MP4 SHA-256 `1970da35a380c0fd08a8a04e74bc03d050d21bb389ecb0bdd483ab49f232bbda`.
- Motion Canvas artifact `m1-motion-canvas-candidate`: digest `sha256:4da7c9e84a449dabbb09ac235e14e9819691ecbdb444ca2755d98258c9904a92`; renderer finished at frame 1,727, 1,728 export events, 1,728 unique PNGs and 1,728 sequential files; zero browser errors. H.264, 1920×1080, 24/1 fps, 72.000 s, 1,728 frames; MP4 SHA-256 `0016d083c11a3dc1615c8ae9e8dbc4a58af5a02bbcb5354e66f2b80583965616`.
- Manim artifact `m1-manim-refraction-segment`: digest `sha256:9a6fb300a693c886dbea7b4ab9e56444ef7ba67bac6fb4d163864325e0178386`; H.264, 1920×1080, 24 fps nominal, 11.624674 s, 279 frames; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. Its average rate is reported as `857088/35711` (~24.00067 fps) because of stream timestamps; CI requires `r_frame_rate=24/1`, 279 frames and average-rate tolerance <0.01 fps.
- Contract-validation workflow [#12](https://github.com/Nolane-x/Nolane-video/actions/runs/45951654984) passed **16 tests**, including geometry orientation, continuous kink, reusable Nia rig and S02 action beats.
- Reusable Nia rig source: `motion-canvas/src/actors/nia.tsx`. It exposes torso, neck, head, eyes, mouth, upper arm, forearm and elbow. S02 now sequences anticipation, lift, inspection, a slight turn, re-dip and lean toward the waterline; the hand remains parented to the spoon prop for basic grip coupling.
- Visual review of the run #89 contact sheet and selected native 1080p frames at 9.7 s, 11.8 s, 12.2 s and 63.0 s confirms the straight-spoon/lift state, continuous apparent kink, Nia's neck/mouth and final straight-spoon resolution. Run #83's selected science frames confirmed water below air and the single interface aligned with the rays.

**Acceptance boundary:** these are technical and selected-frame prototype passes, not full creative approval. Full-speed 24 fps review, fine hand/finger animation, robust grip/contact, causal diagram pacing, mobile-size checks and audio remain incomplete.

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
