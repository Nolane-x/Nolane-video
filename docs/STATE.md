## -6. Latest verified state — 2026-11-27 (candidate #133 verified)

This snapshot supersedes older grip, actor and render status below.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Main:** `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no changes have been merged to main.
- **Working branch:** `m1/optics-benchmark`; latest code/test head before this state/test/doc refresh: `16a1c8982bf74b7401c160c5b340d1ce6e29c224`.
- **Latest candidate:** [run #133](https://github.com/Nolane-x/Nolane-video/actions/runs/46006606072), source commit `16a1c8982bf74b7401c160c5b340d1ce6e29c224`; Remotion, Motion Canvas and Manim all **success**.
  - Remotion: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. Artifact digest `sha256:fd1f4d7e210956e86d3829d2c80aee3948b9eb86f9cd6cb95d179a1994ba23aa`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
  - Motion Canvas: official editor rendered exactly 1,728/1,728 frames, zero browser errors; H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s. Artifact digest `sha256:a6c481f21017504181ecd55e445764540a60d3c96bdbac762785c51ac7b04c1c`; MP4 SHA-256 `9cfb358469bbf0d84a2ee656e9f1163db72b1df32fb2efc6fefd727d8a511c87`; contact-sheet SHA-256 `1523957d30eb91fdfa38d22a1aeca3b3738a0d95e4197d81c0493162ee8fd48c`.
  - Manim specialist segment: H.264, 1920×1080, nominal 24 fps, 279 frames, 11.624674 s. Artifact digest `sha256:0e2a721cf4624339391966080376c08e49f2904fabfe556e241ada3b0d66d236`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- **Latest repository contract CI:** [#33](https://github.com/Nolane-x/Nolane-video/actions/runs/46005131989) passed 24 tests and benchmark validation. This contract suite is being extended in the present documentation/test refresh to assert that grip geometry stays tied to the canonical spoon handle axis.
- **Latest candidate runtime gates:** IK runtime test, grip geometry runtime test, TypeScript build, 1,728-frame Motion Canvas render and MP4 probe all passed in #133.
- **Grip geometry architecture:**
  - `src/actors/rig-anchors.ts` defines canonical `SPOON_HANDLE_LOCAL_START` and `SPOON_HANDLE_LOCAL_END`; `src/props/spoon.tsx` uses these same constants for the physical shaft, eliminating duplicated handle endpoints.
  - `src/actors/grip-geometry.ts` projects the palm anchor onto the handle centreline, derives its along-axis/normal basis and generates four finger paths spaced along the shaft. Each path crosses the centreline; the thumb travels in the opposite direction to form a visible pinch.
  - `src/actors/nia-grip.tsx` renders the four wrapped finger strokes plus thumb path/end point and interpolates named `rest` / `brace` poses.
  - `scripts/test-grip-geometry.mjs` executes the TypeScript geometry and checks each finger crosses the centreline on the correct sides, finger stations stay separated, and the thumb approaches from the opposite side in both named poses.
- **Arm rig:** `src/actors/arm-ik.ts` solves a deterministic two-bone chain. Nia uses fixed segment lengths of 200 px / 615 px and re-solves the elbow in every tween callback; reachability and invalid-input guards remain enabled.
- **Selected-frame QA:** native 1920×1080 frames at 9.5 s, 10.5 s and 11.5 s from run #133 were inspected. Four finger bands are more clearly separated across the shaft and the thumb sits opposite the finger wrap. The grip remains visible during the selected lift/inspection/re-dip frames. This is selected-frame QA, not a complete 24 fps review or anatomical approval.
- **Architecture:** Motion Canvas 3.17.2 remains provisionally selected as the first 2D/2.5D scene adapter; Film IR remains renderer-independent; Manim remains specialist; Remotion remains full-film baseline pending license/distribution review.
- **Still incomplete:** full-speed review of both films; hand anatomy, believable thumb/finger wrapping, palm compression and wrist articulation; shoulder/torso weight transfer and acting; reaction/follow-through; causal diagram pacing and camera staging; mobile typography; approved Vietnamese VO, speech-aligned captions, SFX/music and audio QA; repeated authoring/preview/render measurements; H2 provenance/license audit.
- **Next task:** perform continuous 24 fps creative review, then improve hand anatomy and full-body acting from recorded defects. M1 is **not complete**; do not begin a broad Film IR/runtime package or claim creative approval while these acceptance gates remain open.

## -5. Latest verified state — 2026-11-27 (candidate #126 verified)

This snapshot supersedes older candidate-run, arm-rig and handoff status below.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Main:** `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no changes have been merged to main.
- **Working branch:** `m1/optics-benchmark`; latest code/test head: `0a0191a59d5aed329d5d750410a12c93669fe45b`. Main remains untouched.
- **Latest candidate:** [run #126](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070151), source commit `0a0191a59d5aed329d5d750410a12c93669fe45b`; Remotion, Motion Canvas and Manim all **success**.
  - Remotion: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. Artifact digest `sha256:82248b0b6958777431b609a629c62486d097f91cf793ab307498b855b06e338e`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
  - Motion Canvas: official editor rendered 1,728/1,728 frames, zero browser errors; H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s. Artifact digest `sha256:af245b9267272fb4c58601f86db1c6c7e96585e983831a5c923a94a3da3e6109`; MP4 SHA-256 `a1ef3bb538f9e3f822206bfb04561f2cf85ae40748373afa744ad4a17f414862`; contact-sheet SHA-256 `7ee611aadd064660ff47e8ba0fe2372c818c15544bb266f7096cb57553cf1cb8`.
  - Manim specialist segment: H.264, 1920×1080, nominal 24 fps, 279 frames, 11.624674 s. Artifact digest `sha256:d486c876a1423da6354c2c695d5f4a2b191b9bad12af474d055b7acbeee57b33`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- **Latest contract validation:** [run #31](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070299) passed **24 tests** and the benchmark validator.
- **Latest actor/IK implementation:**
  - `src/actors/arm-ik.ts`: pure law-of-cosines two-bone solver; finite-input validation, min/max reach checks, deterministic bend branch and explicit unreachable-target errors.
  - `src/actors/nia.tsx`: canonical segment lengths are upper arm 200 px and forearm 615 px. Named rest/lift/inspect wrist targets are used to solve the elbow. `toArmPose()` now runs a callback tween and re-solves the elbow on every rendered frame, instead of interpolating endpoint elbows.
  - `src/actors/rig-anchors.ts`: single source of truth for rest, −5° lift and +6° inspection wrist contacts.
  - `src/actors/nia-grip.tsx`: prop-attached palm/thumb plus four individual finger paths and named rest/brace grip poses.
  - `src/props/spoon.tsx`: spoon and grip share a parent transform; scene layer order keeps the hand in front of the forearm.
  - `scripts/test-arm-ik.mjs`: executes the actual TypeScript solver after transpilation, checks all three named poses, both elbow branches, unreachable/invalid input guards, and 101 interpolation samples for each of the three S02 transitions.
- **Render/visual evidence:** native 1920×1080 frames at 8.8 s, 9.8 s, 10.8 s and 11.8 s from run #126 were inspected. Selected frames show the elbow following the wrist, visible prop-attached fingers and contact through lift/inspection/re-dip. This is selected-frame QA, not a full-speed 24 fps watch of every S02 frame.
- **Architecture:** Motion Canvas 3.17.2 remains provisionally selected as the first 2D/2.5D scene adapter; Film IR remains renderer-independent; Manim remains specialist; Remotion remains full-film baseline pending license/distribution review.
- **Still incomplete:** full-speed review of both films; believable hand anatomy, thumb opposition and finger wrap; shoulder/torso weight transfer and acting; reaction/follow-through; causal diagram pacing and camera staging; mobile typography; approved Vietnamese VO, speech-aligned captions, SFX/music and audio QA; repeated authoring/preview/render measurements; H2 provenance/license audit.
- **Next task:** review the complete motion at 24 fps, record frame-accurate defects, then improve hand shape/contact and full-body acting. M1 is **not complete**. Do not begin a broad Film IR/runtime package or claim creative approval until the remaining gates are closed.

## -4. Latest verified state — 2026-11-27 (candidate #122 verified)

This snapshot supersedes older candidate-run, actor/grip and next-task references below.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Main:** `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no changes have been merged to main.
- **Working branch:** `m1/optics-benchmark`. Code/test head before this documentation refresh: `f4124f37505ede40db0fa8454390525ed08f23ea`. Engine implementation commit: `d4793bfc154b9311718e530215a2552525e740f1`.
- **Latest candidate:** [run #122](https://github.com/Nolane-x/Nolane-video/actions/runs/45997725029), source commit `d4793bfc154b9311718e530215a2552525e740f1`; Remotion, Motion Canvas and Manim all **success**.
  - Remotion: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. Artifact digest `sha256:6738609fc2b7601daed9caf972c743cb789d4a1d08bed521c1101992e17a5cec`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
  - Motion Canvas: official editor rendered 1,728/1,728 frames, zero browser errors; H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s. Artifact digest `sha256:a2dc668a3c14340ecb79e31ad12d9107c1d0cf90d330623dcf943cfd4f2bc2c8`; MP4 SHA-256 `c435cb1149b75f0bb8c4d88c2cde08cdaed3e351accb6040089df9634a86d069`.
  - Manim specialist segment: H.264, 1920×1080, nominal 24 fps, 279 frames, 11.624674 s. Artifact digest `sha256:ded403a68f387ec1de4198133a7a0847de7fb7535adc9a41fa21c1c0d1f68419`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- **Latest contract validation:** [run #29](https://github.com/Nolane-x/Nolane-video/actions/runs/45997963537) passed **23 tests** and the benchmark validator.
- **Actor/prop architecture now in source:**
  - `src/actors/nia-grip.tsx`: four separate finger paths (index, middle, ring, pinky), thumb, palm, and named `rest` / `brace` poses exposed by `toPose()`.
  - `src/actors/nia.tsx`: named shoulder/elbow/wrist arm poses `rest`, `lift`, `inspect`; `toArmPose()` owns joint interpolation.
  - `src/actors/rig-anchors.ts`: shared rotation-aware grip targets for rest, −5° lift and +6° inspection.
  - `src/props/spoon.tsx`: spoon and hand remain under one prop transform. Scene draw order places Nia's forearm behind the spoon-attached hand.
  - `src/scenes/spoon.tsx`: choreography calls semantic actor/hand poses instead of scattering finger and joint coordinates through the scene.
- **Selected-frame QA:** native 1920×1080 Motion Canvas frames at 9.0 s, 10.5 s and 11.5 s from run #122 were inspected. The palm/finger group is visible above the forearm and remains visually attached through the selected lift/inspection/re-dip states. This is selected-still evidence, **not** full-speed 24 fps motion approval.
- **Architecture:** Motion Canvas 3.17.2 remains provisionally selected as the first 2D/2.5D scene adapter; Film IR remains renderer-independent; Manim remains specialist; Remotion remains full-film baseline pending license/distribution review.
- **Still incomplete:** complete full-speed 24 fps review of both films; production-quality hand anatomy/contact and believable wrist/elbow/shoulder mechanics; weight transfer, reaction and follow-through; causal diagram pacing and camera staging; mobile typography; approved Vietnamese VO, transcript-synchronized captions, SFX/music and audio QA; repeated authoring/preview/render measurements; H2 provenance/license audit.
- **Next task:** review full motion and log frame-accurate issues, then improve anatomical contact/acting and diagram choreography based on evidence. M1 is **not complete**. Do not start a broad Film IR/runtime build or claim creative approval before the remaining gates are closed.

# Project State
## -3. Latest verified state — 2026-11-27 07:12 UTC

This section supersedes older candidate-run, component, actor and next-task status below.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE); do not confuse it with `Nolane-x/video`.
- **Main:** `19b53bd0bf785a8d58a91031678be717a8ae11d4`; work has not been merged to main.
- **Working branch:** `m1/optics-benchmark`; latest branch/test HEAD at this snapshot: `1b433b8c9eae6767e6a2d425a93347ba5b5ace73`. Candidate #116 rendered source commit `7daf94a6a0b06b86f2626bb448da6c8027d895b9`; validator #24 covers the current branch/test state.
- **Latest full candidate:** [run #116](https://github.com/Nolane-x/Nolane-video/actions/runs/45956296455), all Remotion, Motion Canvas and Manim jobs **success**.
  - Remotion: H.264, 1920×1080, yuv420p, 24/1 nominal+average fps, 72.000 s, exactly 1,728 frames. Artifact digest `sha256:b03965a3367b7785e9b4b1d59cd530981304092af7c9c1ea5ad059893a8c07d6`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
  - Motion Canvas: renderer finished; 1,728 export events, 1,728 unique/sequential PNGs, zero browser errors; H.264, 1920×1080, yuv420p, 24/1 nominal+average fps, 72.000 s, exactly 1,728 frames. Artifact digest `sha256:d67eb551a582cd52713f08ae9734d5461140dbac1334a8df11ca3ca012f7e5a9`; MP4 SHA-256 `4a12e4609d27e941202892b7ad10b6847f88ddfe878aac50e1119d6908b2fce3`.
  - Manim specialist segment: H.264, 1920×1080, 24 fps nominal, 279 frames, 11.624674 s. Average rate `857088/35711` (~24.00067), within the CI <0.01 fps tolerance. Artifact digest `sha256:bf396a8825f5c3ccf21af854084e13bad32d24f2707725e175b60c92c275247f`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- **Latest contract validation:** [#24](https://github.com/Nolane-x/Nolane-video/actions/runs/45956346788) passed 21 tests, including rotation-aware wrist/grip geometry, immutable anchor use, kitchen set boundaries, prop-attached grip, dashed virtual-ray construction and browser-renderer diagnostics.
- **Current reusable Motion Canvas modules:**
  - `src/actors/nia.tsx`: torso, neck, head/eyes/mouth, upper arm, forearm and elbow.
  - `src/actors/nia-grip.tsx`: palm, thumb, outlined index/middle finger, attached inside the spoon prop.
  - `src/actors/rig-anchors.ts`: immutable rest/lift/grip anchors and a shared 2D rotation transform; the wrist endpoint is derived for 0°, −5° and +6°.
  - `src/props/spoon.tsx`: spoon geometry, bowl and grip inside one prop transform.
  - `src/sets/kitchen.tsx`: reusable wall/table/glass/water/waterline/caption set.
  - `src/diagrams/refraction.tsx`: shared geometry-based refraction diagram; dashed virtual back-extension.
  - `src/scenes/spoon.tsx`: timeline/checkpoint orchestration, not a duplicate owner of all visual geometry.
- **S02 contact contract:** rest pose contact is (-356, 0); lift pose is calculated from the −5° rotated prop; inspection turn pose is calculated from +6°. The wrist endpoint in the scene follows these shared anchors before the prop re-dips. Selected 1920×1080 frames at 9.8 s, 10.8 s and 11.8 s from run #116 were inspected; the hand remains visually attached through lift/turn/re-dip. This is selected-frame QA, not a full-motion approval.
- **Architecture:** Motion Canvas 3.17.2 remains provisionally selected as the first 2D/2.5D scene adapter by ADR-0001. Film IR remains renderer-independent; Manim remains specialist; Remotion remains the full-film baseline/reference pending license/deployment review.
- **Still incomplete:** full-speed 24 fps watch of both full films with shot/frame findings; better finger articulation and hand silhouette/contact; richer weight transfer/reaction/follow-through; causal diagram pacing and camera staging; mobile typography check; approved Vietnamese VO, transcript-aligned captions, SFX/music and perceptual audio QA; repeated authoring/preview/render iteration measurements; H2 provenance/license review.
- **Next task:** conduct the complete creative review, record frame-accurate defects, then improve acting/contact and diagram pacing based on evidence. Do not claim M1 complete or start a broad Film IR/runtime package until remaining gates are closed. Do not weaken exact-frame, codec or browser-error tests.

## -2. Latest verified state — 2026-11-27 06:38 UTC

This note supersedes older candidate-run, branch-head and diagram implementation status elsewhere below.

- Exact repository: `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not `Nolane-x/video`.
- Default branch `main` remains at `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main has been made.
- Active branch: `m1/optics-benchmark`; latest documentation HEAD is `962e0fd2898e0958f38ff8e6cf8218b7ae90b464`. The latest diagram code is in `560303cb3738d150cbfb779844bfbc5768805893` and the latest test extension is in `75b28da9463e5b9894a9a21a5b3a282fa8c78b72`.
- Architecture remains: Motion Canvas 3.17.2 provisionally selected as first 2D/2.5D execution adapter; Film IR remains renderer-independent; Manim remains specialist; Remotion remains baseline/reference pending licensing/distribution review.
- Latest candidate run [#94](https://github.com/Nolane-x/Nolane-video/actions/runs/45952654166), source commit `29b33b50fee8d616bcfcb29ece939fb0a5430b96`: **all three jobs passed**.
  - Remotion: H.264, 1920×1080, yuv420p, 24/1 nominal+average fps, 72.000 s, exactly 1,728 frames. Artifact digest `sha256:1074b604e55f79fa95a553e732beb2cca40f696d59b5d26f44577439f031a510`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
  - Motion Canvas: renderer success, 1,728 export events, 1,728 unique sequential PNGs, zero browser errors; H.264, 1920×1080, 24/1 nominal+average fps, 72.000 s, exactly 1,728 frames. Artifact digest `sha256:92c3b5d3451520a6e7b7fc8bd6db0f7c51c772335b9692c4cadf24724693cbc8`; MP4 SHA-256 `4a12e4609d27e941202892b7ad10b6847f88ddfe878aac50e1119d6908b2fce3`.
  - Manim: H.264, 1920×1080, 24 fps nominal, 279 frames, 11.624674 s; artifact digest `sha256:faac7840db9a81a8827d9ff255698a89234239f0b55bcf2d607b25c2f132e245`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. Its average-rate timestamp variance remains within CI tolerance <0.01 fps.
- Latest contract workflow [#13](https://github.com/Nolane-x/Nolane-video/actions/runs/45952657476), head `75b28da9463e5b9894a9a21a5b3a282fa8c78b72`: **17 tests passed**, including reusable diagram component and dashed virtual-ray styling.
- Reusable scientific diagram is now in `benchmarks/optics-spoon/motion-canvas/src/diagrams/refraction.tsx` as `createRefractionDiagram(palette)`. It reads canonical `shared/diagram.json`, owns the interface/normal/rays/points/labels and coordinate mapping, and returns refs for the scene to choreograph. The scene no longer duplicates the diagram JSX or transform helpers.
- The backward extension of the outgoing ray uses `lineDash={[18, 14]}`, visually distinct from the solid physical incident and refracted rays. The run #94 contact sheet and the native 1920×1080 frame at 51 s were inspected: correct air/water orientation; solid yellow physical rays; white dashed backward construction; coral true point; mint apparent point.
- The reusable Nia actor from the previous vertical slice remains in `src/actors/nia.tsx` (torso, neck, head/eyes/mouth, upper arm, forearm and elbow); S02 has anticipation, lift, inspect/turn, re-dip and lean. Basic hand/prop coupling still needs articulated fingers and robust contact constraints.
- M1 is **not complete**. Remaining gates: watch both full films at 24 fps and record shot/frame-specific findings; improve Nia's hand/grip/contact, weight transfer, reaction and follow-through; review diagram causal pacing and camera; inspect labels at mobile size; obtain approved Vietnamese VO, synchronized captions, SFX/music and perform perceptual audio QA; measure repeated authoring/preview/render iteration; finish H2 source/license provenance before any reuse.
- Next step: use run #94 as the new technical baseline. Continue the Nia hand/finger/contact vertical slice and full-speed creative QA. Only after M1 acceptance should the first typed, renderer-independent Film IR slice begin. Do not weaken exact frame or codec checks.


## -1. Latest verified state — 2026-11-27 06:29 UTC

This section supersedes older snapshot dates, branch heads, candidate-run references and next-task statements below.

- **Exact repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` production workspace.
- **Default branch:** `main`, HEAD `19b53bd0bf785a8d58a91031678be717a8ae11d4`; this session has not merged work into `main`.
- **Working branch:** `m1/optics-benchmark`; code/QA changes are committed through `304db032c2ba4cefa269e795e2cbda7e06ac8d03`. Documentation refresh commits follow that code/test head.
- **Architecture:** ADR-0001 provisionally selects Motion Canvas 3.17.2 as the first 2D/2.5D scene adapter. Film IR remains renderer-independent; Manim remains specialist; Remotion remains the full-film baseline/reference pending licensing/deployment review.
- **Latest complete candidate run:** [#89](https://github.com/Nolane-x/Nolane-video/actions/runs/45951640411), source commit `776d219fa02bd5392b7ade94ad348fbe3d74a7dd`; all three jobs passed.
  - Remotion 4.0.547: H.264, 1920×1080, 24/1 fps, 72.000 s, exactly 1,728 frames; MP4 SHA-256 `1970da35a380c0fd08a8a04e74bc03d050d21bb389ecb0bdd483ab49f232bbda`.
  - Motion Canvas 3.17.2: official editor rendered exactly 1,728 sequential PNGs (000000–001727), 1,728 export events/unique frames, zero browser errors; H.264, 1920×1080, 24/1 fps, 72.000 s, 1,728 frames; MP4 SHA-256 `0016d083c11a3dc1615c8ae9e8dbc4a58af5a02bbcb5354e66f2b80583965616`.
  - Manim CE: H.264, 1920×1080, 24 fps nominal, 11.624674 s, exactly 279 frames. `avg_frame_rate=857088/35711` (~24.00067) is within the explicit <0.01 fps tolerance; `r_frame_rate=24/1`.
- **Latest contract CI:** [#12](https://github.com/Nolane-x/Nolane-video/actions/runs/45951654984) passed 16 tests. Coverage now includes storyboard/frame boundaries, all six runtime checkpoints, water-below-air mapping, interface/ray coordinate consistency, Snell geometry, reusable Nia rig structure, S02 acting beats and continuous apparent-spoon kink.
- **Geometry correction:** [run #83](https://github.com/Nolane-x/Nolane-video/actions/runs/45950491747) and selected 1080p frames confirm the water region below the interface, air above, and the horizontal interface aligned with rays and points.
- **First Nia actor vertical slice:** `benchmarks/optics-spoon/motion-canvas/src/actors/nia.tsx` exports a reusable rig with torso, neck, head, eyes, mouth, upper arm, forearm and elbow. S02 in `src/scenes/spoon.tsx` now stages anticipation, lift, inspection/turn, re-dip and a lean toward the waterline. The hand remains parented to the spoon prop for basic grip coupling. The apparent spoon lower segment is offset 14 px under a 22 px stroke, so it reads as one continuous kink.
- **Visual review:** run #89 contact sheet and selected native 1920×1080 frames at 9.7 s, 11.8 s, 12.2 s and 63.0 s were inspected. The selected frames show the lift/straight spoon, continuous apparent kink, Nia face/neck and final straight-spoon resolution. This is selected-frame QA, not full-film 24 fps approval.
- **Benchmark:** `The Spoon That Bends`, Vietnamese, 72 s, 1920×1080, 24 fps, 1,728 frames, half-open `[0,1728)`; shared Snell example 40° in water to ~58.9° in air, angles measured from the normal.
- **Still incomplete:** watch both full films at 24 fps and record shot/frame findings; hand/finger articulation and robust prop grip/contact; stronger acting and camera choreography; causal diagram pacing; reduced/mobile text review; approved real Vietnamese VO, transcript-synchronized captions, SFX/music and perceptual audio QA; repeated authoring/render iteration measurements; H2 provenance/license audit.
- **Next task:** continue M1 creative acceptance and improve the Nia/diagram vertical slice behind the Motion Canvas adapter. Do not build a broad Film IR/runtime package or claim final creative/audio acceptance until the listed gates are addressed. Do not weaken frame/metadata tests to obtain green CI.



## 0. Live verification override — 2026-11-27 05:34 UTC

This section supersedes older run numbers, branch-head references, and next-task statements elsewhere in this snapshot.

- Repository: `Nolane-x/Nolane-video` (not `Nolane-x/video`); default branch: `main`; active work branch: `m1/optics-benchmark`.
- Active branch HEAD: `bdb7fe239530af0624769f4167187f550bcc47c4` — `fix: align S03 cutaway hold to 240-frame shot`.
- Main HEAD: `19b53bd0bf785a8d58a91031678be717a8ae11d4`. There are two branches (`main`, `m1/optics-benchmark)); no open PRs, issues, or releases were returned at verification.
- The working tree is a 59-entry benchmark/research implementation: shared story/script/art direction/research, Remotion and Motion Canvas full-film candidates, a Manim scientific segment, Python validator/tests, CI workflows, visual reports, scorecard and ADR-0001. It is not yet the complete reusable Film IR engine.
- ADR-0001 provisionally selects Motion Canvas 3.17.2 as the first 2D/2.5D scene adapter; it does not select Motion Canvas as the Film IR, does not make it the only renderer, and does not constitute creative approval.
- Latest observed candidate CI: [run 45946419330 (#80)](https://github.com/Nolane-x/Nolane-video/actions/runs/45946419330), head `bdb7fe2`, overall **failure**. Remotion full-film job **passed**; Manim S04–S05 job **passed**; Motion Canvas full-film job **failed** at `S04-complete`.
- Motion Canvas diagnostics: job `140332141710`, artifact [m1-motion-canvas-diagnostics](https://github.com/Nolane-x/Nolane-video/actions/runs/45946419330/artifacts/15175275163). The checkpoint expected last included frame 1055 but observed frame 1056; renderer reported `Error`, `lastFrame: 0`, and exported zero PNG files. This is a scene-timing regression, not an environment setup or FFmpeg failure.
- The prior all-green candidate run [45945392423 (#70)](https://github.com/Nolane-x/Nolane-video/actions/runs/45945392423) passed all three jobs on commit `204659c2853230c6245abc9337064df9713e8984`. Thirteen commits have landed since that green baseline; the intervening Motion Canvas choreography/checkpoint changes introduced the current failure.
- The shared benchmark remains **The Spoon That Bends**, Vietnamese, 72.000 seconds, 1920×1080, 24 fps, exactly 1,728 frames (half-open `[0, 1728)`). The canonical Snell example is 40° in water to approximately 58.9346° in air, measured from the normal.
- Still not accepted: full-speed creative review, production-quality acting and hand/prop contact, mobile/reduced-size label review, real approved VO, transcript-synchronized captions, SFX/music, audio QA, repeatable authoring/render-time measurements, and H2 provenance/license audit.
- Do not start broad M2 runtime implementation yet. First align the Motion Canvas shot checkpoints without weakening the frame contract, rerun CI, then update the evidence reports and handoff from the resulting artifacts.


**Snapshot date:** 2026-11-27 (live verification override below)  
**Repository:** https://github.com/Nolane-x/Nolane-video  
**Default branch:** `main` (unchanged by this benchmark branch)  
**Working branch:** `m1/optics-benchmark`  
**Verified branch HEAD:** `bdb7fe239530af0624769f4167187f550bcc47c4`  
**Current phase:** M1 — comparable benchmark and architecture decision (in progress).  
**Architecture decision:** Motion Canvas provisionally selected as the first 2D scene-execution adapter by ADR-0001; Film IR remains renderer-independent.

## 1. Project identity and scope

Nolane Explainer Engine (NEE) is a specialist, code-first production system for story-driven, narration-led 2D/2.5D educational explainer films, especially mathematics, physics, chemistry, engineering and technology. It is not a universal video generator or general-purpose editor.

Long-form ambition remains approximately 8–20 minutes, 16:9. The 60–120-second benchmark is an engineering proof, not a reduction in product ambition.

## 2. Foundation completed

The M0 foundation documents exist:
- `README.md`
- `AGENTS.md`
- `docs/PRODUCT_NORTH_STAR.md`
- `docs/ENGINE_ARCHITECTURE.md`
- `docs/REFERENCE_ENGINE_STUDY.md`
- `docs/ROADMAP.md`
- `docs/STATE.md`
- `docs/AI_HANDOFF.md`

The renderer-independent Film IR remains the proposed source of truth. Candidate frameworks remain adapters/references until M1 evidence supports a decision.

## 3. Verified repository roles and source constraints

- New engine: `Nolane-x/Nolane-video`.
- User Remotion fork: `Nolane-x/remotion`; upstream: `remotion-dev/remotion`.
- User Manim fork: `Nolane-x/manim`; upstream: `ManimCommunity/manim`.
- Prior workspace: `Nolane-x/video`; H2 prototype has not been copied because source provenance/reuse rights still need audit.
- Motion Canvas candidate: `motion-canvas/motion-canvas`.

Do not confuse `Nolane-video` with `Nolane-x/video`. Do not edit the user's Remotion or Manim forks as part of this task.

## 4. M1 benchmark created

Canonical film:
- Title: **The Spoon That Bends** / **Vì sao chiếc thìa trông như bị gãy trong nước?**
- Duration: 72 seconds, 1,728 frames.
- Format: 1920×1080, 24 fps, 16:9, sRGB.
- Six shots: hook, contradiction, optical reveal, refraction, apparent image, resolution.
- Vietnamese script and on-screen copy; audio cues are planned but no real voice/SFX/music audio is supplied yet.

Shared assets:
- `benchmarks/optics-spoon/shared/script.vi.md`
- `benchmarks/optics-spoon/shared/storyboard.json`
- `benchmarks/optics-spoon/shared/ART-DIRECTION.md`
- `benchmarks/optics-spoon/shared/RESEARCH.md`
- `benchmarks/optics-spoon/shared/diagram.json`
- `docs/M1_BENCHMARK_SPEC.md`
- `docs/M1_BENCHMARK_PLAN.md`

The canonical water-to-air geometry is checked by code: 40° in water, approximately 58.935° in air, both from the normal; the apparent point lies on the backward extension of the refracted ray.

## 5. Candidate implementation and evidence

### Remotion 4.0.547 — full-film candidate

Verified in run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169):
- TypeScript check and full render passed.
- ffprobe: H.264, 1920×1080, progressive, 24/1 fps, 72.000 seconds, 1,728 frames.
- Contact sheet and selected 1080p frames 1056 and 1248 reviewed. The water-region “NƯỚC” label is now clear of the bottom caption bar after source commit `e5e0259ca2c517858511dcaf11a70edb40f640ea`.

Artifact digest: `sha256:f829285a43711aed3a869bae9d93ede74d37c9561125a510ad2101e673d20b14`.

This remains a silent vector prototype, not a finished film. Character acting/prop contact is rudimentary and no real voice, synchronized transcript captions, SFX or music is included. Full findings: `benchmarks/optics-spoon/reports/VISUAL-QA.md`.

### Manim CE user fork — scientific segment only

Verified in run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169):
- Installed fork commit `18320e2f0feaf142b2c3a377068ddb44c82fb2a1`.
- Rendered S04–S05 at 1920×1080, 24 fps, 11.625 seconds; ffprobe passed.
- Contact sheet reviewed. Scientific geometry passes, but the first style version has a black background, serif default typography and sparse opening frames.

Artifact digest: `sha256:a2fcf0ddda1cb40eb27bfd877b93be0c2d725d2162fd08926e1765cd416c77e4`.

Source commit `0a09f2ef4925dcd55734d38a8f455c1a54c0a6b5` aligns the segment to the NEE palette, DejaVu Sans and a persistent water region. The latest candidate rerender is queued in [45853726714](https://github.com/Nolane-x/Nolane-video/actions/runs/45853726714); it includes the Manim palette/font fix and Motion Canvas export-audit polling with CI progress logs. Earlier pending runs 45850249595, 45851338555, 45853159646 and 45853225131 were superseded before execution. Manim remains a specialist diagram adapter, not a full-film candidate.

### Motion Canvas 3.17.2 — full-film candidate

Verified:
- Pinned dependencies install.
- Vite/editor build and TypeScript check pass.
- Headless Chromium opens the official editor and invokes its core image-sequence renderer.
- Current exporter uses Motion Canvas core's image-sequence exporter plus independent FFmpeg; GPLv3 FFmpeg exporter is not included.

Verified:
- Motion Canvas 3.17.2 dependencies install, official editor builds/typechecks, and headless Chromium invokes the core image-sequence exporter.
- Renderer audit plugin works. Run [45840319216](https://github.com/Nolane-x/Nolane-video/actions/runs/45840319216) logged `RendererResult.Success`, `lastFrame: 1728`, and `RendererState.Initial`.

Still pending:
- That run exported 1,729 unique PNGs (0–1,728) because Motion Canvas converts seconds to frames with `ceil(seconds × fps)` and includes the endpoint.
- Commit `31fd2997dce941be05b089e8066928eebc0f7dd3` changed the final included sample timestamp to `71.95833333333333` s (frame 1,727 at 24 fps).
- Run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148) was cancelled before its render step completed. Current run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169) has Remotion and Manim jobs successful; Motion Canvas passed setup/build and remains in the render step. No candidate MP4/ffprobe has been accepted yet.
- The validator now checks the inclusive endpoint conversion. Validator run [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249) and regression-test run [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293) both passed.

## 6. Visual QA recorded

- Remotion artifact from [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169), digest `sha256:f829285a43711aed3a869bae9d93ede74d37c9561125a510ad2101e673d20b14`; contact sheet and selected 1080p frames 1056/1248 reviewed. “NƯỚC” label is clear of the caption. Additional temporal sample scan at 4 fps over the opening 18 s shows little Nia pose/gesture variation; a 2 fps scan of the diagram section shows long holds on near-static ray layouts while labels change.
- Manim artifact from [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169), digest `sha256:a2fcf0ddda1cb40eb27bfd877b93be0c2d725d2162fd08926e1765cd416c77e4`; scientific geometry reviewed; palette/font correction is in the latest pending candidate run [45851338555](https://github.com/Nolane-x/Nolane-video/actions/runs/45851338555).
- These are prototype-level and sampled-frame checks, not final artistic approval or full-speed playback review. Full findings: `benchmarks/optics-spoon/reports/VISUAL-QA.md`. Evidence-ledger comparison (no ranking yet): `docs/M1_SCORECARD.md`. Animation/staging/performance review standard: `docs/ANIMATION_CRAFT_STANDARDS.md`.

## 7. Test and workflow facts

- `.github/workflows/validate-m1-benchmark.yml` exists.
- Latest successful validator: [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249), commit `d15705bdec39cc48cd7a802378adf8eb3fdcb6c3`.
- Latest successful unit/regression tests: [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293), commit `aba51bb249528a03448196326c255fcec334d797`. Tests assert that a 72.0-second inclusive endpoint would create an extra frame.
- `.github/workflows/m1-benchmark-candidates.yml` runs Remotion, Motion Canvas and Manim independently. Candidate run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169) passed Remotion and Manim but still has Motion Canvas rendering. Candidate rerender with Manim style change and Motion Canvas export-audit polling is pending in [45853726714](https://github.com/Nolane-x/Nolane-video/actions/runs/45853726714).
- A workflow's overall result can be failure while individual engine jobs succeed; report each job separately.
- All preview renders currently omit a real audio track.

## 8. Licensing and integration constraints

- Motion Canvas packages inspected are MIT-licensed; its optional FFmpeg exporter declares GPLv3 and remains excluded.
- Manim Community Edition is MIT-licensed; the user's fork is pinned by commit.
- Remotion's two-tier licensing model remains a product-adoption constraint; evaluation use does not decide redistribution/commercial embedding rights.
- H2 has not been copied; complete its provenance/license audit before considering reuse.

## 9. What remains open

- Finish Motion Canvas exact 1,728-frame render and ffprobe in run `45842364169`; next candidate validation is queued in `45851338555`.
- Review the Manim palette/font render in latest candidate run [45853726714](https://github.com/Nolane-x/Nolane-video/actions/runs/45853726714) when it starts and finishes.
- Inspect full-speed 24 fps movement/action/contact across the full 72-second film. Initial 4 fps/2 fps scans already flag Nia's limited acting and long static diagram holds; the next art pass should choreograph these intentionally.
- Add real approved voice, synchronized transcript captions, SFX and music before claiming audio QA; do not synthesize or assume audio without an approved source.
- Complete H2 provenance/license audit.
- Complete the evidence-ledger scorecard after the pending Motion Canvas/Manim runs, then write a formal architecture decision using comparable evidence.
- Do not begin broad M2/M3 engine implementation until M1 is accepted.

## 10. Next concrete task

First inspect run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169). Require exactly 1,728 sequential PNGs (000000–001727), then H.264 1920×1080 / 24 fps / 72.000 s ffprobe and artifact upload. Then inspect candidate rerender [45853726714](https://github.com/Nolane-x/Nolane-video/actions/runs/45853726714), review the new Manim palette/font contact sheet, and update the visual report. Keep real audio and full-speed playback review marked incomplete.
