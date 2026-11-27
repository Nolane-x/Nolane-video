## Latest all-green arm articulation candidate — 2026-11-27 (candidate #140)

This section supersedes the earlier candidate #137 technical snapshot.

- Code/test source commit: `a8cbe2242ade6c00a09d11517f02a9f3c2d8b2b6`.
- Candidate workflow [#140](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464282): **Remotion, Motion Canvas and Manim all succeeded**.
- Contract validation [#36](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464489): **26 tests passed** and benchmark validation passed.
- Remotion: H.264, 1920×1080, yuv420p, nominal/average 24/1 fps, 72.000 s, 1,728 frames. MP4 SHA-256 `f6b1cf4ac28d7c43c9eec3940472eb1303c65ed9ada29ecc798000b810301a67`. Artifact id `15204821586`; ZIP digest `sha256:2fe1d309307b9c0fd5e3b2e8f6c90b38890845950ed8cdfe594dee7a6b28ba5f`.
- Motion Canvas 3.17.2: official editor rendered 1,728/1,728 frames; zero browser errors; H.264, 1920×1080, yuv420p, nominal/average 24/1 fps, 72.000 s. MP4 SHA-256 `b4637a336e3206a36975e769b2067802afeaa114d1aad90e63d928685e89260a`. Artifact id `15204537011`; ZIP digest `sha256:3b23ed29cb53a4e94c1e9466d7ad4ed12dea7309acee49fa9c4621d4e260e098`.
- Manim specialist segment: H.264, 1920×1080, yuv420p, nominal 24 fps, 279 frames, 11.624674 s; average stream rate `857088/35711` (~24.00067 fps), within the workflow's <0.01 fps tolerance. MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. Artifact id `15204886417`; ZIP digest `sha256:857d15c11361985c33af811570292232e0aad62fb8c92551b7ba76d40d0f4ddc`.
- **Nia arm visual slice:** outlined upper-arm/forearm contours and shoulder/elbow/wrist joint circles are rendered in the Motion Canvas actor. The same IK points drive lines, outlines and joint positions every frame; fixed 200/615 px segment lengths and grip anchors are preserved. Contract coverage checks the visual controls and S01/S03/S06 visibility wiring.
- The #140 contact sheet, 4-fps S02 strip and selected native frames at 8.8/9.5/10.5/11.5 s were inspected. The arm now reads as an articulated graphic shape through lift/inspection/re-dip, but still lacks organic anatomy and nuanced acting.
- Both full-film MP4s remain silent/video-only. There is no approved VO, SFX/music or synchronized caption track.

**Acceptance boundary:** #140 confirms the arm contour/joint slice compiles, passes contract/IK/grip tests and renders at exact media settings. M1 remains open for continuous 24-fps review, hand anatomy/depth, shoulder/torso counterbalance, acting, diagram pacing, mobile typography, approved audio/captions, iteration-cost measurements and H2 provenance/license audit.

## Latest all-green parity candidate — 2026-11-27 (candidate #137)

This section supersedes older candidate references for the latest technical render set.

- Code/test source commit: `9e639c2df7e80141fda25cdd8f1718070f2b9d99`.
- Candidate workflow [#137](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488421): **Remotion, Motion Canvas and Manim all succeeded**.
- Contract validation [#35](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488347): **26 tests passed** and benchmark validation passed.
- Remotion: H.264, 1920×1080, yuv420p, nominal and average 24/1 fps, 72.000 s, exactly 1,728 frames. MP4 SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`. Actions artifact id `15203563873`; ZIP digest `sha256:5566755d3a98961fcc61f094a152076eb747ecc1ee6bf7277b12ed88e8b1c136`.
- Motion Canvas 3.17.2: official editor completed 1,728/1,728 frames; zero browser errors; H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s. MP4 SHA-256 `3906dc514affe8b91fe226e51a5c16b0a535869ddc5f3483359dab024b81ead4`. Actions artifact id `15203143475`; ZIP digest `sha256:058b10938d2d206bf67dbf34735cd975520caa14c33707eb417c17bf717b95fe`.
- Manim specialist segment: H.264, 1920×1080, yuv420p, nominal 24 fps, 279 frames, 11.624674 s. Average stream rate `857088/35711` (~24.00067 fps), within the workflow's <0.01 fps tolerance. MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. Actions artifact id `15202838965`; ZIP digest `sha256:8ba8edce850e3e45aa935a752eb12e02839b8d5e1cdb2aaeb0641f981aeff1e4`.
- Remotion S02 parity is now implemented in `remotion/src/benchmark-motion.ts`: deterministic anticipation, lift, 6° inspection turn, re-dip and reaction within `[192,432)`. The hand and lifted spoon share the same vertical movement.
- The Remotion explanation sequence shows interface/physical rays during S03, then normal, measurements and Snell formula during S04, followed by the dashed backward construction and apparent point during S05. `test-parity.mjs` validates the sequence before render.
- Both full-film MP4s are silent/video-only. Contact sheets, 4-fps S02 samples and selected native frames were reviewed; continuous 24-fps creative review has not yet been completed.

**Acceptance boundary:** candidate #137 closes the known source-level Remotion storyboard parity gap and confirms all technical render gates still pass. M1 remains open for uninterrupted creative review, actor anatomy/acting, diagram pacing, mobile typography, approved audio/captions, iteration-cost measurements and H2 provenance/license audit.

# M1 Candidate Status — The Spoon That Bends

## Latest integrated set/prop/rotation candidate — 2026-11-27 07:12 UTC

This section supersedes all older run references below where they disagree.

- Candidate workflow [#116](https://github.com/Nolane-x/Nolane-video/actions/runs/45956296455), source commit `7daf94a6a0b06b86f2626bb448da6c8027d895b9`: **all three jobs passed**.
- Remotion full-film candidate: H.264, 1920×1080, yuv420p, 24/1 nominal+average, 72.000 s, 1,728 frames. Artifact digest `sha256:b03965a3367b7785e9b4b1d59cd530981304092af7c9c1ea5ad059893a8c07d6`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
- Motion Canvas 3.17.2: renderer finished; 1,728 export events, 1,728 unique sequential PNGs, zero browser errors; H.264, 1920×1080, yuv420p, 24/1 nominal+average, 72.000 s, 1,728 frames. Artifact digest `sha256:d67eb551a582cd52713f08ae9734d5461140dbac1334a8df11ca3ca012f7e5a9`; MP4 SHA-256 `4a12e4609d27e941202892b7ad10b6847f88ddfe878aac50e1119d6908b2fce3`.
- Manim CE specialist segment: H.264, 1920×1080, nominal 24 fps, 279 frames, 11.624674 s; average rate `857088/35711` (~24.00067), within <0.01 fps tolerance. Artifact digest `sha256:bf396a8825f5c3ccf21af854084e13bad32d24f2707725e175b60c92c275247f`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- Contract workflow [#24](https://github.com/Nolane-x/Nolane-video/actions/runs/45956346788) passed **21 tests**, including rotation-aware wrist/grip geometry, immutable anchor use and reusable kitchen/prop/diagram module boundaries.
- Scene modules: `src/actors/nia.tsx`, `src/actors/nia-grip.tsx`, `src/actors/rig-anchors.ts`, `src/props/spoon.tsx`, `src/sets/kitchen.tsx`, `src/diagrams/refraction.tsx`, and orchestrator `src/scenes/spoon.tsx`.
- The wrist anchor is computed from the same local grip point and prop transform: rest 0°, lift −5°, inspection turn +6°. S02 updates the forearm endpoint during the +6° turn, then returns it with the prop to rest before re-dip.
- Native frames at 9.8 s, 10.8 s and 11.8 s from run #116 were inspected at 1920×1080. They show contact at lift, a wrist endpoint that remains on the rotated handle, and contact retained on re-dip. This is selected-pose validation, not full-speed acting approval.

**Acceptance boundary:** run #116 proves a green technical export and a working rotation-aware first prop/hand slice. M1 remains open for full-speed 24 fps review, production-quality fingers/hand acting, diagram pacing, mobile typography, approved audio and revision-cost evidence.

## Latest verified component-render update — 2026-11-27 06:38 UTC

This section supersedes older candidate-run references and is the latest technical snapshot.

- Candidate workflow [#94](https://github.com/Nolane-x/Nolane-video/actions/runs/45952654166), source commit `29b33b50fee8d616bcfcb29ece939fb0a5430b96`: **all three jobs passed**.
- Remotion 4.0.547: H.264, 1920×1080, yuv420p, 24/1 nominal and average FPS, 72.000 s, 1,728 frames. Artifact `m1-remotion-candidate` digest `sha256:1074b604e55f79fa95a553e732beb2cca40f696d59b5d26f44577439f031a510`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
- Motion Canvas 3.17.2: editor renderer success, 1,728 export events, 1,728 unique PNGs, 1,728 sequential files; H.264, 1920×1080, yuv420p, 24/1 nominal and average FPS, 72.000 s, 1,728 frames, zero browser errors. Artifact `m1-motion-canvas-candidate` digest `sha256:92c3b5d3451520a6e7b7fc8bd6db0f7c51c772335b9692c4cadf24724693cbc8`; MP4 SHA-256 `4a12e4609d27e941202892b7ad10b6847f88ddfe878aac50e1119d6908b2fce3`.
- Manim CE specialist segment: H.264, 1920×1080, 24 fps nominal, 279 frames, 11.624674 s. Artifact digest `sha256:faac7840db9a81a8827d9ff255698a89234239f0b55bcf2d607b25c2f132e245`; final MP4 SHA-256 remains `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. The known average-rate timestamp tolerance remains <0.01 fps.
- Contract workflow [#13](https://github.com/Nolane-x/Nolane-video/actions/runs/45952657476) passed **17 tests**. New coverage verifies the reusable diagram component and dashed backward ray.
- New reusable module: `benchmarks/optics-spoon/motion-canvas/src/diagrams/refraction.tsx`, created by `createRefractionDiagram(palette)`. It consumes canonical `shared/diagram.json`, owns all diagram refs/labels/points and coordinate conversion, and returns a view plus the refs the scene animates. The scene no longer duplicates diagram JSX or diagram coordinate transforms.
- The virtual image back-extension now uses Motion Canvas `lineDash={[18, 14]}`, visually distinguishing a geometric construction from the two solid physical light-ray segments.
- The run #94 contact sheet and native 1920×1080 frame at 51 s were inspected: water below the interface, air above; incident and outgoing physical rays solid yellow; backward virtual extension white and dashed; true point coral; apparent point mint. MP4 probe and render report were inspected directly.

**Acceptance boundary:** run #94 validates the extracted component, renderer type/build, deterministic 1,728-frame render and technical media. It is still prototype-level, not final creative approval. Full-speed review, Nia hand/finger contact, diagram pacing, mobile typography, audio and human approval remain open.


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
