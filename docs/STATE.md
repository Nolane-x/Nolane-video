## -18. Latest repository verification — 2026-11-28 (candidate #171 / contract #52)

This snapshot supersedes the candidate #167 **technical** status below. Candidate #171 passed all current CI render jobs, but it has **not** yet received a new visual review. Candidate #167 remains the latest visually reviewed candidate; do not equate a green render with creative acceptance.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Implementation branch:** `m1/optics-benchmark`. Latest code/test commit: [`e6ce4a8`](https://github.com/Nolane-x/Nolane-video/commit/e6ce4a81659fe11bac54b450533863da36b79c6b), `fix(m1): synchronize progressive S05 captions across engines`.
- **Branch split:** `main` remains at foundation/docs commit `19b53bd0bf785a8d58a91031678be717a8ae11d4`; implementation is not merged to main. This verification updated documentation only; no engine code was changed.
- **Latest technical candidate:** [workflow #171](https://github.com/Nolane-x/Nolane-video/actions/runs/46136144320), run ID `46136144320`, completed successfully on the code commit above. All three jobs passed:
  - Remotion 4.0.547 full-film candidate: H.264, 1920×1080, 24/1 fps, 72.000 s, 1,728 frames; typecheck, parity check, render, ffprobe and artifact upload passed.
  - Motion Canvas 3.17.2 full-film candidate: official editor build, arm IK and grip runtime tests, 1,728-frame render, H.264 1920×1080, 24/1 fps, 72.000 s, ffprobe and artifact upload passed; job log records zero render/browser errors.
  - Manim CE 0.22.1 scientific segment: H.264 1920×1080, 279 frames, 11.624674 s; ffprobe and artifact upload passed.
- **Latest contract validation:** [workflow #52](https://github.com/Nolane-x/Nolane-video/actions/runs/46136144238), run ID `46136144238`, completed successfully. Log confirms `Ran 30 tests`, `OK`, `BENCHMARK VALIDATION PASSED`, `duration_frames=1728`.
- **Latest source change:** S05 progressive caption text is now synchronized between Motion Canvas and Remotion. At the shared frame boundaries: frame 1056 introduces the dashed backward-extension explanation; frame 1099 introduces the true-position explanation; frame 1117 introduces the apparent-image explanation. The visual reveal remains dashed extension → true-position label → apparent point/label; S05 remains 17 seconds.
- **Files changed by code commit e6ce4a8:** Motion Canvas `src/scenes/spoon.tsx`; Remotion `src/benchmark-motion.ts`, `src/OpticsSpoon.tsx`, `scripts/test-parity.mjs`; Python contract `tests/test_benchmark.py`. No product architecture or renderer decision changed in this commit.
- **Candidate artifacts from run #171:** Remotion `m1-remotion-candidate` artifact `15259602611`; Motion Canvas `m1-motion-canvas-candidate` artifact `15259288248`; Manim `m1-manim-refraction-segment` artifact `15260285182`. The Motion Canvas diagnostics artifact is `15259507806`. Candidate artifacts were listed and their workflow logs were inspected; the MP4s were not downloaded or visually reviewed in this session. Candidate artifact retention ends around 2026-12-28; the diagnostics artifact expires around 2026-12-12. Preserve them before expiry if their source frames/reports are needed.
- **Visual QA boundary:** `benchmarks/optics-spoon/reports/VISUAL-QA.md` still correctly records candidate #167 as the latest reviewed candidate. Candidate #171 is technically green but visually unreviewed; do not update the reviewed-candidate claim until the actual videos/contact sheets are inspected.
- **Audio truth:** both 72-second full-film MP4s are still silent/video-only. No approved Vietnamese VO, transcript-aligned captions/audio track, SFX or music has been added. Caption text rendered in the image is not a substitute for a synchronized subtitle/audio deliverable.
- **Project phase:** M1 — benchmark and architecture decision, still in progress. Motion Canvas remains the provisional first 2D scene adapter under ADR-0001; Remotion remains baseline/reference pending license/product review; Manim remains the specialist math/diagram adapter. Film IR remains renderer-independent and is not yet implemented as a production compiler.

### Exact next work

1. Download the #171 Remotion and Motion Canvas candidate artifacts (and Manim segment as relevant), inspect the latest contact sheets and actual MP4s, compare the S05 caption transitions at frames 1055/1056, 1098/1099 and 1116/1117, and record any defects with shot/timecode evidence.
2. Watch both full 72-second films continuously at 24 fps. Selected stills/contact sheets are not a substitute. Review comprehension, camera, transitions, typography, Nia's acting and physical contact.
3. Review S05's 13.85-second final hold against an approved narration track before changing its duration. Do not guess whether the hold is acceptable without VO/context.
4. Improve the actor only from observed defects: palm volume, finger depth/occlusion, thumb opposition, wrist roll, gaze, weight transfer, reaction and follow-through. The current hand/body is still stylized vector construction, not naturalistic anatomy.
5. Complete reduced/mobile typography review, approved Vietnamese VO, transcript/audio alignment, SFX/music and perceptual audio QA; measure authoring, preview, render and revision costs under equivalent repeated conditions.
6. Finish the H2 source/provenance/license audit before reuse from the separate `Nolane-x/video` workspace. Keep external assets/code license-compliant.
7. Keep M1 open until the creative/audio/performance gates are evidenced. Do not begin broad M2/M3 Film IR or engine-wide implementation prematurely.

### What this verification did not do

- Did not download or watch candidate #171 MP4s, run a local build, or inspect a local working tree/uncommitted changes.
- Did not change animation source, renderer dependencies, benchmark design, or branch topology.
- Did not merge `m1/optics-benchmark` into `main`.
- Did not approve the benchmark film or claim a production-ready engine.

---

## -17. Latest verified state — 2026-11-28 (candidate #167; per-finger grip profiles refined)

This snapshot supersedes candidate #165 below. Candidate #167 is a green technical render plus selected-frame/crop inspection; M1 creative/audio acceptance remains open.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Working branch:** `m1/optics-benchmark`; latest code/test commit [`f488eb4`](https://github.com/Nolane-x/Nolane-video/commit/f488eb4765273767bfb973c7c244ce2908cfdd4c). Main remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- **Candidate:** [#167](https://github.com/Nolane-x/Nolane-video/actions/runs/46134635408) completed **success** for Remotion, Motion Canvas and Manim.
- **Contract:** [#50](https://github.com/Nolane-x/Nolane-video/actions/runs/46134635396) completed **success** with 30 Python tests and benchmark validator. Motion Canvas arm IK/grip runtime tests, build/typecheck, 1,728-frame render and ffprobe all passed.

### Candidate #167 outputs (downloaded and checked)

- **Remotion 4.0.547:** H.264 1920×1080 yuv420p, 24/1 fps, 72.000 s, 1,728 frames. MP4 SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`; artifact id `15259127403`; ZIP digest `sha256:dea254938ce5d49ab128a03e1bb14611c2cfe830a5d48fc2a9ac1cecfbb1920f`.
- **Motion Canvas 3.17.2:** H.264 1920×1080 yuv420p, 24/1 fps, 72.000 s, 1,728 frames; official editor rendered 1,728/1,728 with zero browser errors. MP4 SHA-256 `497461e2d73aebfcbe18ec11429ff2db7480d93ba00de31d17711f148c32f517`; artifact id `15259560675`; ZIP digest `sha256:200f20dcb5bbf0bf1a597b4eb6c24ec44ec08c0bec3c295886d7701f5da22751`.
- **Manim CE specialist segment:** H.264 1920×1080 yuv420p, 24/1 fps, 279 frames, 11.624674 s; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`; artifact id `15259770495`; ZIP digest `sha256:944114f001fb01ad5117950d849abd765dbd83e3e143c867360ff060ab83acc9`.
- Both full-film MP4s remain video-only/silent; no audio stream has been added.

### Nia grip — distinct finger curvature and brace compression

- `grip-geometry.ts` changes `wrapFinger` to accept separate start, middle and end radii. Index, middle, ring and pinky now use different wrap profiles instead of identical curves translated along the handle.
- The `brace` pose draws the four finger contacts slightly closer together (along-axis centres remain at least 14 px apart) and narrows the across-axis wrap for each finger compared with `rest`. The thumb remains on the opposite side of the handle; the physical handle axis and grip anchor are unchanged.
- Runtime `test-grip-geometry.mjs` now asserts four unique curvature profiles in both poses, positive-side approach, centreline crossing, negative-side wrap, minimum finger spacing and a smaller brace span for each finger.
- Python contract #50 protects the distinct profile parameters and shared prop-local geometry; candidate #167 passed the runtime grip test, arm IK test, editor build and full render.
- Native 1080p crops around 10.55–11.2 s were compared with #165. The difference is deliberately small: the digits have slightly differentiated wrap/taper and a tighter brace, but the hand still reads as a stylized vector construction rather than realistic anatomy. Palm volume, depth/occlusion and acting remain open.

### Nia torso/shoulder counterbalance retained

- Rest/lift/inspect body poses still move torso and neck with the shoulder target. Lift torso `[512,188]`/2.5°, neck `[512,35]`, shoulder `[431,94]`; inspect is the smaller 1.5° pose; rest returns to neutral.
- `toArmPose` interpolates shoulder and wrist together, re-solving the elbow every frame; bone lengths remain 200/615 px. S02 uses lift/inspect/rest; S06 lift/inspect/lifted settle.
- This is a modest counterbalance and connection fix, not naturalistic full-body acting.

### Refraction/prop choreography retained

- S03 reveals incident ray/true point, then refracted ray/observer point; S04 adds normal, angle labels and Snell formula.
- S05 reveals dashed backward extension → coral `Vị trí thật` → pause → green apparent point/`Vị trí biểu kiến` and caption. Total stays 17 s, with a 13.85 s final hold that needs narration-led review.
- S02/S06 use the −50° clear-out spoon pose and −44° inspection angle; bowl clears water/glass while the wrist remains within two-bone IK reach.

### Still incomplete

- Watch both 72-second films continuously at 24 fps and record shot/timecode-specific findings.
- Judge S05's 13.85-second hold against approved Vietnamese VO and continuous playback.
- Improve Nia's natural palm volume, finger depth/occlusion, thumb opposition, wrist roll, gaze, weight transfer and follow-through. Current hand/body remains vector stylized.
- Review reduced/mobile typography; obtain approved Vietnamese VO/captions, add SFX/music and complete audio QA.
- Measure authoring/preview/render/revision costs on equivalent runners; complete H2 source/license provenance before any reuse from `Nolane-x/video`.
- **Do not mark M1 complete or begin broad Film IR/M2 yet.** Motion Canvas stays provisional first 2D adapter; Remotion baseline/reference; Manim specialist.

---

## -16. Latest verified state — 2026-11-28 (candidate #164; Nia torso/shoulder counterbalance verified)

This snapshot supersedes candidate #158 below. Candidate #164 is a green technical render plus selected-frame inspection; M1 creative/audio acceptance remains open.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Branch:** `m1/optics-benchmark`; body/arm scene implementation commit [`6469b4e`](https://github.com/Nolane-x/Nolane-video/commit/6469b4ec61251eba21dc75bd88c813ae1615de23); follow-up test-lock commit [`60fd883`](https://github.com/Nolane-x/Nolane-video/commit/60fd88377d6de49362b0a15be92e766b1e2cd714). Main remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- **Candidate:** [#164](https://github.com/Nolane-x/Nolane-video/actions/runs/46131553339) completed **success** for Remotion, Motion Canvas and Manim.
- **Contract:** [#49](https://github.com/Nolane-x/Nolane-video/actions/runs/46131553392) completed **success** with 30 Python tests and benchmark validator. Candidate #164 also passed the final Motion Canvas IK/grip runtime scripts, TypeScript build/typecheck, official editor render, ffprobe and artifact upload.

### Candidate #164 outputs (downloaded and checked)

- **Remotion 4.0.547:** H.264 1920×1080 yuv420p, 24/1 fps, 72.000 s, 1,728 frames. MP4 SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`; artifact id `15257439850`; ZIP digest `sha256:05c633bdb8be792353664263c3007883f046597d0610b5720ed30e5b9201806f`.
- **Motion Canvas 3.17.2:** H.264 1920×1080 yuv420p, 24/1 fps, 72.000 s, 1,728 frames; official editor rendered 1,728/1,728 with zero browser errors. MP4 SHA-256 `950d5ae0a95f2ddbb263878aa6161a1196f31088d60b9165e58d8e47559f74c7`; artifact id `15257706889`; ZIP digest `sha256:6116a5420e413d8f442268d00bc26091236da389cd6e998ce17795602442309b`.
- **Manim CE specialist segment:** H.264 1920×1080 yuv420p, nominal 24 fps, 279 frames, 11.624674 s; average rate `857088/35711` (~24.00067 fps). MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`; artifact id `15258560497`; ZIP digest `sha256:377ac5e6136d45887b62da818daf730f078a1c517cec0e1b44eb687d589b2f8d`.
- Both full-film MP4s are video-only/silent; no audio stream is present.

### Nia torso/shoulder counterbalance

- Added shared `NIA_BODY_POSES` in `rig-anchors.ts`:
  - Rest: torso `[505,185]`, rotation 0°, neck `[505,32]`, shoulder `[420,95]`.
  - Lift: torso `[512,188]`, rotation 2.5°, neck `[512,35]`, shoulder `[431,94]`.
  - Inspect: torso `[511,187]`, rotation 1.5°, neck `[511,34]`, shoulder `[428,95]`.
- `nia.tsx` adds `toBodyPose`, which animates torso position/rotation and neck position. `toArmPose` now interpolates both the shoulder and wrist from their current values and runs `solveTwoBoneIK` each rendered frame, preserving the 200 px upper-arm and 615 px forearm lengths.
- S02 uses lift → inspect → rest/re-dip body poses. S06 uses lift → inspect → lifted settle. Torso/neck/head x-positions and arm shoulder target are coordinated; spoon/grip remains prop-attached.
- Runtime IK tests verify named shoulder/wrist targets and 101 tween samples across changing shoulder and wrist coordinates. The exact elbow references use unrounded grip anchors; the test retains tight numeric tolerance. Contract #49 also locks the TypeScript shoulder parameter and numeric rotation state.
- Candidate #163 first validated the body-pose implementation; candidate #164 on the test-lock commit passed all three engine workflows. Native samples/contact sheet in S02 and S06 show a subtle counterbalance and maintained shoulder/arm/prop connection. This is still a small stylized vector-rig improvement, **not** naturalistic full-body acting or final anatomy approval.

### Previously verified scene work retained

- S03 reveals incident ray/true point, then refracted ray/observer point; S04 adds normal, angle labels and Snell formula. Original 240/384-frame windows remain unchanged.
- S05 reveals dashed backward extension, then coral `Vị trí thật`, pause, then green apparent point/`Vị trí biểu kiến` and explanatory caption. Total remains 17 seconds; the final hold is 13.85 s and still needs narration-led review.
- S02/S06 share the −50° clear-out transform and −44° inspection angle; the spoon bowl is outside the glass and about 43 px above waterline, with wrist target about 802.4 px from shoulder against 815 px maximum reach.

### Still incomplete

- Watch both 72-second films continuously at 24 fps and log shot/timecode-specific findings.
- Judge S05's 13.85-second hold against approved Vietnamese VO and continuous playback.
- Improve Nia's natural body weight/counterbalance, palm compression, finger depth/occlusion, gaze, shoulder follow-through and whole-body acting. Current rig remains stylized.
- Review reduced/mobile typography; obtain approved Vietnamese VO/captions, add SFX/music and complete audio QA.
- Measure authoring/preview/render/revision costs on equivalent runners; complete H2 source/license provenance before reuse from `Nolane-x/video`.
- **Do not mark M1 complete or begin broad Film IR/M2 yet.** Motion Canvas stays provisional first 2D adapter; Remotion baseline/reference; Manim specialist.

---

## -15. Latest verified state — 2026-11-28 (candidate #158; true/apparent position reveal staged)

This snapshot supersedes candidate #156 below. Candidate #158 is a green technical render and selected-frame inspection; M1 creative/audio acceptance remains open.

- **Repository:** `Nolane-x/Nolane-video` (NEE), not the separate `Nolane-x/video` workspace.
- **Branch:** `m1/optics-benchmark`; latest scene/test commit [`8b230d3`](https://github.com/Nolane-x/Nolane-video/commit/8b230d37630d622bf88048c2666fe5d7cb7175cc). Main remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- **Candidate:** [#158](https://github.com/Nolane-x/Nolane-video/actions/runs/46126163649) all three engines **success**.
- **Contract:** [#47](https://github.com/Nolane-x/Nolane-video/actions/runs/46126163646) **success**, 29 Python tests and benchmark validator. Motion Canvas IK/grip tests, build/typecheck, 1,728-frame render and ffprobe passed.

### Candidate #158 artifacts
- Remotion: H.264 1920×1080 yuv420p, 24 fps, 72 s, 1,728 frames; SHA-256 `f6b1cf4ac28d7c43c9eec3940472eb1303c65ed9ada29ecc798000b810301a67`; artifact `15256081226`; ZIP `sha256:c35c6755b07808d7e8ad91b745298d785b247dd305fa4739d249079c7bb7b92b`.
- Motion Canvas: same 1920×1080/24 fps/72 s/1,728 frames; zero browser errors; SHA-256 `37cda1eb7b8f3d8c5e309c5faaebccf63a498c1cb8037f8f16a090b0cf72bd00`; artifact `15255069488`; ZIP `sha256:06a26519a846d660068ec347a3126a66a54a28a1d4f0b6179b6ed91b8261b1b3`.
- Manim specialist segment: H.264 1920×1080, 279 frames, 11.624674 s; SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`; artifact `15255333723`; ZIP `sha256:b5dbf277be79f74a1f44f8b827a248a355273f51f7d6462fe36809044eab340c`.
- Both full films remain video-only/silent.

### S05 true/apparent reveal
- Dashed backward extension appears first and holds alone for 1.0 s.
- Coral `Vị trí thật` label then appears alone (0.4 s); a 0.35 s pause separates it from the apparent image.
- Green apparent point, `Vị trí biểu kiến` label and caption `Mắt kéo dài tia khúc xạ về vị trí biểu kiến.` then appear.
- Total: 0.8 + 1.0 + 0.4 + 0.35 + 0.6 + 13.85 = **17.0 s**. Checkpoint/shot boundary unchanged.
- Contract #47 checks order/duration. Frames at 44.2/44.8/45.5/46.2/47.2 s were inspected: dashed ray first; ~46.2 s only true-position label; ~47.2 s apparent point/label/caption visible.

### Retained work and open gates
- S03 reveals incident then refracted ray; S04 adds normal, angle labels and Snell formula. Original 240/384-frame windows remain.
- S02/S06 share −50° clear-out and −44° inspection; spoon bowl clears water/glass, wrist target about 802.4 px from shoulder within 815 px IK reach.
- Still required: continuous 24-fps review of both films; narration-led judgment of 13.85 s S05 hold; natural Nia body/hand acting; mobile typography; approved Vietnamese VO, synchronized captions, SFX/music; comparable revision-cost measures; H2 provenance/license audit.
- **Do not mark M1 complete or start broad Film IR/M2 yet.**

---

## -14. Latest verified state — 2026-11-28 (candidate #156; staged virtual-ray reveal verified)

This snapshot supersedes candidate #154 below. Candidate #156 is a green technical render plus selected-frame inspection; M1 creative/audio acceptance remains open.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Working branch:** `m1/optics-benchmark`; latest scene/test commit [`dd7b317`](https://github.com/Nolane-x/Nolane-video/commit/dd7b317ed27700d18dac8e83c5ab3f2f1f5a72a9). **Main** remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- **Candidate workflow:** [#156](https://github.com/Nolane-x/Nolane-video/actions/runs/46125152963) completed **success** for Remotion, Motion Canvas and Manim.
- **Contract validation:** [#46](https://github.com/Nolane-x/Nolane-video/actions/runs/46125153063) completed **success** with 29 Python tests and the benchmark validator. Motion Canvas IK/grip runtime tests, build/typecheck, 1,728-frame render and ffprobe passed.

### Candidate #156 outputs (downloaded and checked)

- **Remotion 4.0.547:** H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. MP4 SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`. Artifact id `15255227810`; ZIP digest `sha256:dea327c1af3db60e6a145464f8401803d4059b8f17fff9c3b32936850282beba`.
- **Motion Canvas 3.17.2:** official editor rendered 1,728/1,728 with zero browser errors; H.264 1920×1080 yuv420p, 24/1 fps, 72.000 s. MP4 SHA-256 `35868965cadbcb910056ddd1ab32fe68146dccdaa80c75f24071f03d39a8f108`. Artifact id `15255463074`; ZIP digest `sha256:7f85f7252dcd6a8cf450e1adcba3f41ce1efe54e6c6a2d1a476dd16079538c4f`.
- **Manim CE specialist segment:** H.264 1920×1080 yuv420p, nominal 24 fps, 279 frames, 11.624674 s; average rate `857088/35711` (~24.00067 fps). MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. Artifact id `15255610902`; ZIP digest `sha256:c237128e63b7afb85691591324113dfe9fb233cc7fef4fe036e1dfeb52688ffc`.
- Both full-film MP4s remain video-only/silent.

### S05 — staged backward construction and apparent point

- S05 now reveals the dashed backward extension first, holds it alone for 1.0 second, then reveals the apparent point, true/apparent labels and the explanatory caption: `Mắt kéo dài tia khúc xạ về vị trí biểu kiến.`
- The final static hold is shortened from 15.6 to 14.6 seconds; with the 0.8-second line reveal and 0.6-second point/caption reveal, S05 remains exactly 17 seconds and retains its checkpoint.
- Contract #46 adds an ordering/timing test. Candidate #156 was downloaded and inspected at 44–60 s: the dashed line appears before the point/labels, and the explanatory caption follows. The remaining hold is still long; its acceptability depends on the approved narration and continuous review.

### Combined refraction and prop movement updates

- S03 reveals incident ray/true point, then refracted ray/observer point; S04 adds normal, angles and Snell formula. Their original 240/384-frame windows remain unchanged.
- S02 and S06 use the shared `−50°` clear-out transform and `−44°` inspection angle. The bowl is outside the glass and about 43 px above the waterline; the transformed wrist target remains about 802.4 px from the shoulder against an 815 px maximum IK reach.
- Candidate #156 native samples in S02 8–17 s and S06 62–71 s, plus S05 44–60 s, were inspected. This is selected-frame QA, **not** continuous 24-fps creative approval.

### Still incomplete / next task

- Watch both 72-second films continuously at 24 fps and record timecode/shot-specific defects.
- Judge the S05 14.6-second remaining hold with approved narration; re-choreograph if the spoken explanation does not support it.
- Improve Nia's natural body weight/counterbalance, hand depth/occlusion, gaze and follow-through.
- Review reduced/mobile typography, obtain approved Vietnamese VO/captions, add SFX/music and complete audio QA.
- Measure authoring/preview/render/revision costs on equivalent runners; complete H2 source/license provenance before any reuse from `Nolane-x/video`.
- **Do not mark M1 complete or begin broad Film IR/M2 yet.** Motion Canvas stays provisional first 2D adapter; Remotion baseline/reference; Manim specialist.

---

## -13. Latest verified state — 2026-11-28 (candidate #154; refraction reveal and clear-out spoon lift verified)

This snapshot supersedes candidate #149 below. Candidate #154 is a green technical render and sampled visual check; M1 creative acceptance remains open.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Working branch:** `m1/optics-benchmark`. Geometry/shot implementation commit [`ef59a9a`](https://github.com/Nolane-x/Nolane-video/commit/ef59a9a3d086966e72f2990a1aa1f64151ef3256); contract assertion fix [`6c27763`](https://github.com/Nolane-x/Nolane-video/commit/6c27763fada639ffba00f5367c54cb316ab00d26). **Main** remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- **Candidate workflow:** [#154](https://github.com/Nolane-x/Nolane-video/actions/runs/46124226688) completed **success** for Remotion, Motion Canvas and Manim.
- **Contract validation:** [#45](https://github.com/Nolane-x/Nolane-video/actions/runs/46124226663) completed **success** with 28 Python tests and the benchmark validator. Motion Canvas IK/grip runtime tests, TypeScript build, 1,728-frame editor render, ffprobe and upload passed.

### Candidate #154 outputs (downloaded and checked)

- **Remotion 4.0.547:** H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. MP4 SHA-256 `f6b1cf4ac28d7c43c9eec3940472eb1303c65ed9ada29ecc798000b810301a67`. Artifact id `15255446471`; ZIP digest `sha256:57a13b2f0e8ab59aaaa78fd72bd2b59954603063ab3c2180e30d62cc80b19114`.
- **Motion Canvas 3.17.2:** official editor rendered 1,728/1,728 frames with zero browser errors; H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s. MP4 SHA-256 `91d0f7bec60e21a1deac18a59efe9b6be87b1586739099d91f7d2977e05287dd`. Artifact id `15255207773`; ZIP digest `sha256:38bdc66d26f13b31de09f2496353f260d0c604d2eedf492c288694daf82fb10a`.
- **Manim CE specialist segment:** H.264, 1920×1080, yuv420p, nominal 24 fps, 279 frames, 11.624674 s; average rate `857088/35711` (~24.00067 fps). MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. Artifact id `15254853044`; ZIP digest `sha256:88b8a10939d2c93bce5cb55a45ec87449d29c9fbc25c0fe07d6e25455a34b91f`.
- Both full-film MP4s are video-only/silent; narration, SFX/music and caption synchronization have not been supplied.

### Refraction reveal timing

- S03 now introduces the physical path in causal order: interface/air-water labels, incident ray and true point, a short pause, then refracted ray and observer point. S04 adds the normal, angle labels and Snell formula without replaying the rays.
- S03/S04 remain at their storyboard frame boundaries (240 and 384 frames respectively); a one-sample inclusive-endpoint correction is retained.
- Candidate [#151](https://github.com/Nolane-x/Nolane-video/actions/runs/46122977310) verified the render; candidate #154 includes the final geometry/contract snapshot. Selected samples show the rays earlier in S03. This is not a continuous playback review.

### Clear-out lift geometry and S02/S06 acting

- The prior lift anchor left the bowl underwater even when the wrist moved. The shared pose now uses `SPOON_LIFT_ORIGIN = [-280, -50]`, lift rotation `−50°`, inspection rotation `−44°`, bowl local centre `[195, 285]`, visual vertical half-extent 53 px and shared waterline stage Y `80`.
- With the prop transform applied, the bowl centre is approximately stage `[63.67, -16.18]`; its conservative lower edge is about Y `36.82`, around 43 px above the waterline. It is also fully to the right of the glass's right edge.
- The transformed grip target is approximately `[-364.42, -73.85]`, 802.4 px from Nia's shoulder; the rig's maximum reach is 815 px. Named lift/inspection elbow poses and 101-sample IK tween checks pass.
- Both S02 and S06 use the same clear-out transform and corresponding wrist IK targets. S02 lifts the straight spoon out, inspects, then re-dips; S06 returns to the straight state, lifts it fully out of the glass, makes a small inspection turn and holds the final pose.
- Candidate #153 render jobs passed, but contract #44 exposed a faulty assertion about the *first* lift-angle occurrence. That test was corrected in [`6c27763`](https://github.com/Nolane-x/Nolane-video/commit/6c27763fada639ffba00f5367c54cb316ab00d26); contract #45 and candidate #154 are green. The #153 and #154 Motion Canvas MP4s are byte-identical.
- Selected native samples at S02 8–17 s and S06 62–71 s show the bowl clearing the glass/water while the grip stays coupled to the transformed prop. This remains sampled QA, not continuous playback review.

### Still incomplete / next task

- Watch both complete 72-second films continuously at 24 fps and record shot/frame/timecode, severity, symptom and reproduction.
- Improve whole-body counterbalance, shoulder/wrist weight, gaze, palm/finger depth/occlusion and follow-through; the current vector hand and Nia body remain stylized.
- S05 still holds the backward construction/apparent point for a long interval; review its reveal, camera framing and purposeful holds.
- Review diagram readability and label typography at reduced/mobile size.
- Obtain approved Vietnamese VO, align captions to speech, add SFX/music and run perceptual audio QA.
- Measure authoring/preview/render/revision costs on equivalent runners; complete H2 source/license provenance before any reuse from `Nolane-x/video`.
- **Do not mark M1 complete or begin a broad Film IR/M2 build yet.** Motion Canvas remains provisional first 2D adapter; Remotion is baseline/reference; Manim remains specialist.

---

## -12. Latest verified state — 2026-11-28 (candidate #149; thumb-base silhouette refinement verified)

This snapshot supersedes candidate #146 below. M1 remains in progress; candidate #149 is a green technical render plus selected-frame/crop inspection, not final creative approval.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Working branch:** `m1/optics-benchmark`; first hand-detail implementation commit [`0453b9e`](https://github.com/Nolane-x/Nolane-video/commit/0453b9e218fc47046c4237b19e5ed6951df40622), then thumb-base blend fix [`dabab59`](https://github.com/Nolane-x/Nolane-video/commit/dabab598c18fdfb95bd1093f6141336de1684e67). **Main** remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- **Candidate workflow:** [#149](https://github.com/Nolane-x/Nolane-video/actions/runs/46119630293) completed **success** for Remotion, Motion Canvas and Manim.
- **Contract validation:** [#41](https://github.com/Nolane-x/Nolane-video/actions/runs/46119630375) completed **success** with 26 Python tests and the benchmark validator. Motion Canvas IK/grip-geometry runtime tests, build/typecheck, full 1,728-frame render and ffprobe passed.

### Candidate #149 outputs (downloaded and checked)

- **Remotion 4.0.547:** H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. MP4 SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`. Artifact id `15253047614`; ZIP digest `sha256:f7c665aac7b95af5b6288941fae925b7aab475adcca72fb70bcfc69a64fe95f5`.
- **Motion Canvas 3.17.2:** official editor rendered 1,728/1,728 frames with zero browser errors; H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s. MP4 SHA-256 `e78426c403b25c06cdabaa3310f5242ddb2b9977dec637025cef329e6d827ce8`. Artifact id `15252869337`; ZIP digest `sha256:819eb82fcd7cc5935f4818f9bcfddd6f8ae5bb2927db9b555dbfdb390a9261cb`.
- **Manim CE specialist segment:** H.264, 1920×1080, yuv420p, nominal 24 fps, 279 frames, 11.624674 s; average rate `857088/35711` (~24.00067 fps). MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. Artifact id `15252774321`; ZIP digest `sha256:baa71ca7068ee9caa7daaf29b9db43834c7535321113537ccb8db3c4aebe1f5c`.
- Full-film MP4s remain video-only/silent; narration, SFX and music have not been supplied.

### Nia hand silhouette refinement

- Previous slice: prop-local flexion creases for index/middle/ring/pinky, palm crease, and a thumb-base pad/crease generated from the active grip pose. The details remain animated with the existing `rest`/`brace` poses.
- Follow-up commit `dabab59`: thumb-base pad retains the skin fill but uses matching skin-coloured stroke, 1 px line width and −12° rotation to blend into the palm. The thumb's own dark contour remains. The spoon-handle axis, grip points, arm IK, prop transform and shot timing are unchanged.
- Contract #41 explicitly checks the thumb-base blending style; 26 Python tests and benchmark validator pass. Candidate #149 additionally passes the actual Motion Canvas grip runtime suite and full 72 s render.
- Candidate #149 MP4 was downloaded and ffprobed. Contact sheet and native 1920×1080 frames at 8.8/9.5/10.5/11.5 seconds plus magnified grip crops were reviewed. Compared with #146, the thumb-base no longer creates a second black ring; the grip reads more continuously. At whole-frame scale the hand is still small and highly stylized, with limited volume/depth and no approved organic anatomy.

### Still incomplete / next task

- Watch both 72-second films continuously at 24 fps and create a timestamped shot/frame defect log.
- Improve palm volume, finger layering/depth/occlusion, thumb webbing, wrist roll, shoulder/torso counterbalance, weight transfer, gaze and follow-through from the full-speed review.
- Review ray-diagram reveal pacing/holds/camera and reduced/mobile typography.
- Obtain approved Vietnamese VO, synchronize captions, add SFX/music and run audio QA.
- Measure authoring/preview/render/revision cost on equivalent runners; complete H2 source/license provenance before reuse from `Nolane-x/video`.
- **Do not mark M1 complete or begin a broad Film IR/M2 build yet.** Motion Canvas stays provisional first 2D adapter; Remotion full-film baseline/reference; Manim specialist.

---

## -11. Latest verified state — 2026-11-28 (candidate #146; Nia hand articulation slice verified)

This snapshot supersedes the candidate #140 handoff below. M1 remains in progress; candidate #146 is a green technical render plus selected-frame prototype inspection, not final creative approval.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Working branch:** `m1/optics-benchmark`; hand implementation commit [`0453b9e`](https://github.com/Nolane-x/Nolane-video/commit/0453b9e218fc47046c4237b19e5ed6951df40622), followed by contract updates through [`511d461`](https://github.com/Nolane-x/Nolane-video/commit/511d461fa627b8b86521c25ddf267b4981102831). **Main** remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- **Candidate workflow:** [#146](https://github.com/Nolane-x/Nolane-video/actions/runs/46118930631) completed **success** for Remotion, Motion Canvas and Manim.
- **Contract validation:** [#40](https://github.com/Nolane-x/Nolane-video/actions/runs/46118930644) completed **success** with 26 Python tests and the benchmark validator. Motion Canvas IK/grip-geometry tests, build/typecheck, 1,728-frame editor render and ffprobe gates passed; Remotion parity/typecheck/render and the Manim segment also passed.

### Candidate #146 outputs (downloaded and checked)

- **Remotion 4.0.547:** H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. MP4 SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`. Artifact id `15252990927`; ZIP digest `sha256:db5a47dadddaaff1d212306f067e293959635e3f8e011506679327150246095a`.
- **Motion Canvas 3.17.2:** official editor rendered 1,728/1,728 frames with zero browser errors; H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s. MP4 SHA-256 `2b327e50fde101e306642fcf73d3ce02a3af6a9b041edd81d108f1b9b88e8ff2`. Artifact id `15252578835`; ZIP digest `sha256:6371d006058612beb0f660d0a82c65704d29cc156f84140405bd752b58aa3535`.
- **Manim CE specialist segment:** H.264, 1920×1080, yuv420p, nominal 24 fps, 279 frames, 11.624674 s; average rate `857088/35711` (~24.00067 fps), within the workflow tolerance. MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. Artifact id `15252633547`; ZIP digest `sha256:9dd5b1d6495cccfd796c7d018c041f11b292d321a462c148b5628edfac81551d`.
- Both full-film MP4s remain video-only/silent; narration, SFX and music have not been supplied.

### Nia hand articulation slice

- `motion-canvas/src/actors/grip-geometry.ts` now derives flexion crease lines for index/middle/ring/pinky from each finger path. Each crease is perpendicular to its first segment, centred at 52% of that segment and 11 px long; degenerate paths fail fast.
- The same prop-local pose generator derives a palm crease, a thumb-base pad position from the palm/thumb path and a thumb-base crease. `nia-grip.tsx` animates these controls with the existing `rest`/`brace` grip; `scenes/spoon.tsx` wires their visibility at the kitchen-scene entrances.
- Runtime tests assert perpendicularity, length, centre position, palm bounds, finite thumb-base geometry and pose change. Contract #40 passes; candidate #146 passes the Motion Canvas grip runtime test and full render.
- The candidate #146 MP4 was downloaded and ffprobed. Its Motion Canvas MP4 SHA is byte-identical to #143's render; native 1920×1080 frames at 8.8, 9.5, 10.5 and 11.5 seconds plus grip-detail crops were inspected from that identical bitstream. Finger creases and palm/thumb-base details are visible, but enlarged views still show overlapping circular thumb/palm masses and a deliberately simplified vector hand. This is an articulation/readability improvement, **not** organic-anatomy approval.

### Still incomplete / next task

- Watch both full 72-second films continuously at 24 fps and log shot/frame/timecode, severity, symptom and reproduction.
- Improve hand volume/depth/occlusion, palm compression, thumb-base connection, wrist roll, shoulder/torso counterbalance, weight transfer, gaze and follow-through based on those findings.
- Review optical-diagram pacing/holds/camera and reduced/mobile typography.
- Obtain approved Vietnamese VO, synchronize captions, add SFX/music and run audio QA.
- Measure authoring/preview/render/revision costs on equivalent runners; complete H2 source/license provenance before reuse from `Nolane-x/video`.
- **Do not mark M1 complete or begin a broad Film IR/M2 build yet.** Motion Canvas remains the provisional first 2D adapter; Manim remains specialist and Remotion remains full-film baseline/reference.

---

## -10. Latest verified state — 2026-11-27 (candidate #140; Nia arm articulation slice verified)

This snapshot supersedes the candidate #137 handoff below. M1 remains in progress; candidate #140 is a technical render and selected-frame visual check, not final creative approval.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Working branch:** `m1/optics-benchmark`; code/test commit: [`a8cbe22`](https://github.com/Nolane-x/Nolane-video/commit/a8cbe2242ade6c00a09d11517f02a9f3c2d8b2b6). **Main** remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- **Candidate workflow:** [#140](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464282) completed **success** for Remotion, Motion Canvas and Manim.
- **Contract validation:** [#36](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464489) completed **success** with 26 Python contract tests and the benchmark validator. Motion Canvas IK/grip runtime tests, Remotion parity test/typecheck, all three render gates, ffprobe checks and uploads also passed.

### Candidate #140 outputs (downloaded and checked)

- **Remotion 4.0.547:** H.264, 1920×1080, yuv420p, nominal/average 24/1 fps, 72.000 s, 1,728 frames. MP4 SHA-256 `f6b1cf4ac28d7c43c9eec3940472eb1303c65ed9ada29ecc798000b810301a67`. Actions artifact id `15204821586`, archive digest `sha256:2fe1d309307b9c0fd5e3b2e8f6c90b38890845950ed8cdfe594dee7a6b28ba5f`.
- **Motion Canvas 3.17.2:** official editor rendered 1,728/1,728 frames with zero browser errors; H.264, 1920×1080, yuv420p, nominal/average 24/1 fps, 72.000 s. MP4 SHA-256 `b4637a336e3206a36975e769b2067802afeaa114d1aad90e63d928685e89260a`. Actions artifact id `15204537011`, archive digest `sha256:3b23ed29cb53a4e94c1e9466d7ad4ed12dea7309acee49fa9c4621d4e260e098`.
- **Manim CE specialist segment:** H.264, 1920×1080, yuv420p, nominal 24 fps, 279 frames, 11.624674 s; average rate `857088/35711` (~24.00067 fps), within the CI <0.01 fps tolerance. MP4 SHA-256 remains `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. Actions artifact id `15204886417`, archive digest `sha256:857d15c11361985c33af811570292232e0aad62fb8c92551b7ba76d40d0f4ddc`.
- Both full-film MP4s are video-only; narration, SFX and music have not been supplied.

### Nia arm visual slice

- `motion-canvas/src/actors/nia.tsx` now draws separate dark contour strokes behind the upper arm and forearm, plus shoulder, elbow and wrist joint circles.
- The outline paths follow the exact same shoulder/elbow/wrist coordinates as the existing `solveTwoBoneIK` update on every tween callback. Bone lengths remain 200 px / 615 px; the authored wrist anchors and prop-attached grip are unchanged.
- `scenes/spoon.tsx` animates visibility of the extra contours/joints consistently when Nia enters S01, disappears for the S03 cutaway and returns in S06.
- The contract test now asserts the outline/joint controls exist, follow the IK points and are wired into scene visibility. Contract #36 passes all 26 tests.
- The #140 Motion Canvas contact sheet, 4-fps S02 strip and native 1920×1080 frames at 8.8, 9.5, 10.5 and 11.5 seconds were inspected. The arm silhouette and three joints are more legible through lift/inspect/re-dip. It remains a stylized vector rig, **not** anatomical hand/arm approval.

### Still incomplete / next task

- Watch both full 72-second films continuously at 24 fps and log shot/frame/timecode, severity, symptom and reproduction.
- Improve hand anatomy (finger joints/depth/occlusion, palm compression, thumb base, wrist roll), forearm/shoulder shape, torso counterbalance, weight transfer, gaze and follow-through.
- Review causal diagram pacing/camera, mobile/reduced-size typography, approved Vietnamese narration, synchronized captions and audio; both full-film previews are currently silent.
- Measure authoring/preview/render/revision costs on equivalent runners; complete H2 source/license provenance before reuse from `Nolane-x/video`.
- **Do not mark M1 complete or start a broad Film IR/M2 build yet.** Motion Canvas remains the provisional first 2D adapter; Manim remains specialist and Remotion remains the full-film baseline/reference.

---

## -9. Latest verified state — 2026-11-27 (candidate #137; Remotion parity repair verified)

This snapshot supersedes the candidate #134 source-level parity finding below. M1 remains in progress; this is a technical and sampled-QA update, not creative approval.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Working branch:** `m1/optics-benchmark`; candidate code/test commit: [`9e639c2`](https://github.com/Nolane-x/Nolane-video/commit/9e639c2df7e80141fda25cdd8f1718070f2b9d99). This follow-up documentation refresh is docs-only. **Main** remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- **Candidate workflow:** [#137](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488421) completed **success** for Remotion, Motion Canvas and Manim.
- **Contract validation:** [#35](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488347) completed **success** with **26 Python contract tests** and the benchmark validator. The candidate workflow also passed the Remotion deterministic parity test, Remotion TypeScript typecheck, Motion Canvas IK/grip runtime tests, Motion Canvas build, all three renders, ffprobe gates and artifact uploads.

### Latest candidate outputs (downloaded and checked)

- **Remotion 4.0.547:** H.264, 1920×1080, yuv420p, nominal/average 24/1 fps, 72.000 s, 1,728 frames. MP4 SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`. Actions artifact id `15203563873`, archive digest `sha256:5566755d3a98961fcc61f094a152076eb747ecc1ee6bf7277b12ed88e8b1c136`.
- **Motion Canvas 3.17.2:** official editor rendered exactly 1,728/1,728 frames, zero browser errors; H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s. MP4 SHA-256 `3906dc514affe8b91fe226e51a5c16b0a535869ddc5f3483359dab024b81ead4`. Actions artifact id `15203143475`, archive digest `sha256:058b10938d2d206bf67dbf34735cd975520caa14c33707eb417c17bf717b95fe`.
- **Manim CE specialist segment:** H.264, 1920×1080, yuv420p, nominal 24 fps, 279 frames, 11.624674 s; average rate `857088/35711` (~24.00067 fps), within the workflow's 0.01 fps tolerance. MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. Actions artifact id `15202838965`, archive digest `sha256:8ba8edce850e3e45aa935a752eb12e02839b8d5e1cdb2aaeb0641f981aeff1e4`.
- Both full-film MP4s contain only a video stream; there is **no narration, music or SFX**.

### Remotion parity repair

- `benchmarks/optics-spoon/remotion/src/benchmark-motion.ts` defines deterministic global-frame motion for S02 `[192, 432)`: anticipation, lift, 6° inspection turn, re-dip and lean/reaction. The rendered spoon and Nia's hand share the same vertical lift value.
- The same helper stages the scientific reveal: S03 interface/physical ray path; S04 normal, angle labels and Snell formula; S05 dashed backward extension followed by the apparent point.
- `benchmarks/optics-spoon/remotion/scripts/test-parity.mjs` executes the TypeScript helper and asserts shot boundaries, representative beat values, every S02 hand/prop coupling sample and causal diagram ordering. It runs before typecheck/render in candidate CI.
- The repo-level Python contract test verifies the runtime helper and workflow wiring. Contract #35 passes all 26 tests.

### Visual inspection scope

- Downloaded both full-film candidate MP4s and checked their streams with ffprobe. Opened both contact sheets and sampled S02 at 4 fps; also inspected selected 1080p S02 and diagram frames in Remotion and selected 1080p S02 frames in Motion Canvas.
- Remotion samples show the straight-spoon lift, inspection turn, re-dip and Nia's lean/reaction. The diagram samples show the staged physical rays, normal/angle/formula reveal and later backward construction/apparent point.
- This is **sampled frame review, not a continuous full-speed 24-fps watch**. It does not establish final acting quality or full-film comprehension.

### Still incomplete / next task

- Watch both full 72-second films continuously at 24 fps; log shot ID, frame range, severity, visible symptom and reproduction in `benchmarks/optics-spoon/reports/VISUAL-QA.md`.
- Improve Nia's hand anatomy (knuckles, finger depth/occlusion, palm compression, thumb base, wrist roll), shoulder/torso counterbalance, weight transfer, gaze, reaction and follow-through.
- Revisit diagram pacing and camera staging after continuous review; check all essential Vietnamese typography at mobile/reduced size.
- Obtain approved Vietnamese narration and SFX/music, synchronize captions to actual speech, and run perceptual audio QA; otherwise explicitly revise the benchmark to silent visual-only scope.
- Measure authoring, preview, render and revision loops on equivalent runners; complete H2 source/license provenance before any reuse from `Nolane-x/video`.
- **Do not mark M1 complete or start a broad Film IR/M2 build yet.** Motion Canvas remains the provisional first 2D adapter; Manim remains specialist and Remotion remains the full-film baseline/reference.

---

## -8. Independent session audit — 2026-11-27 (candidate #134 parity review)

This snapshot is newer than the candidate #134 handoff below. It records an additional artifact/source audit; it does not replace the verified CI results.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not `Nolane-x/video`.
- **Branch:** `m1/optics-benchmark`. Previous HEAD before this documentation update: `7266aadd424e0ecea6a4c585c99fddb1db5ce352`. Candidate #134 and contract #34 were built from source commit `0c0118b372b930fc5ad84ff9773918e148a13bbc`. `main` remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge was made.
- **CI evidence:** candidate [#134](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922641) passed Remotion, Motion Canvas and Manim. Contract [#34](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922552) passed 25 tests and benchmark validation.
- **Artifact verification performed directly:** downloaded the Remotion and Motion Canvas #134 MP4 artifacts, checked each with ffprobe, and inspected contact sheets plus 4-fps S02 samples (40 frames per candidate across the 10-second shot). Both full films are H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. The Motion Canvas MP4 SHA-256 is `3906dc514affe8b91fe226e51a5c16b0a535869ddc5f3483359dab024b81ead4`; the Remotion MP4 SHA-256 is `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`. Both streams are silent (video only).
- **New parity finding:** Remotion `OpticsSpoon.tsx` currently cross-fades from the bent spoon to a horizontal straight spoon over 110 frames from frame 192, then holds. It does not implement the storyboard's S02 inspection turn, re-dip or lean/reaction. Remotion's diagram draws the normal and physical rays without the same causal staging; angle labels and formula share one opacity window. In contrast, Motion Canvas `scenes/spoon.tsx` authors explicit lift, inspection rotation, re-dip, lean and sequential diagram reveals.
- **Coverage gap:** `tests/test_benchmark.py` checks Motion Canvas shot checkpoints/S02 beats and shared science geometry, but has no Remotion-specific storyboard-parity test. Therefore the green #134 run proves each candidate's build/render contract, not equal creative implementation.
- **Visual scope:** contact sheets and 4-fps samples were inspected. Full uninterrupted 24-fps playback, native/reduced mobile typography approval and creative approval were **not** completed. No audio QA is possible because the artifacts contain no audio stream.
- **Code changes in this audit:** none. Only the handoff/QA/plan documents are being updated; the known-good #134 render artifacts remain unchanged.

**Next concrete work:** (1) add Remotion's missing S02 action arc and causal S04 reveal; (2) add frame-level parity tests for both shots; (3) run a new candidate workflow and compare against retained #134 artifacts; (4) complete full-speed 24-fps review and the remaining M1 audio/mobile/craft gates. Do not call M1 complete or start a broad Film IR/runtime build until acceptance is met.

---

## -7. Latest verified state — 2026-11-27 (candidate #134 verified)

This snapshot supersedes older candidate-run, grip, actor and render references below.

- **Repository:** `Nolane-x/Nolane-video` (Nolane Explainer Engine / NEE), not the separate `Nolane-x/video` workspace.
- **Main:** `19b53bd0bf785a8d58a91031678be717a8ae11d4`; unchanged and not merged.
- **Working branch:** `m1/optics-benchmark`; candidate #134 and validator #34 ran against source commit `0c0118b372b930fc5ad84ff9773918e148a13bbc`. The documentation refresh that follows is docs-only.
- **Latest candidate:** [run #134](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922641), source commit `0c0118b372b930fc5ad84ff9773918e148a13bbc`; Remotion, Motion Canvas and Manim all **success**.
  - Remotion: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. Artifact digest `sha256:eae41102226da187891482d0f67b2317635134f677e69f149b4d59ff3c1ed238`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
  - Motion Canvas: official editor rendered exactly 1,728/1,728 frames, zero browser errors; H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s. Artifact digest `sha256:a97cef0a398ec82d351bf4c9cd47d46525e934fea35b82d0ff318e83ec230e89`; MP4 SHA-256 `3906dc514affe8b91fe226e51a5c16b0a535869ddc5f3483359dab024b81ead4`; contact-sheet SHA-256 `1523957d30eb91fdfa38d22a1aeca3b3738a0d95e4197d81c0493162ee8fd48c`.
  - Manim specialist segment: H.264, 1920×1080, nominal 24 fps, 279 frames, 11.624674 s. Artifact digest `sha256:296a568a8929ee2a60dd2e0bc7883ff5037f1145ae28f8cfef5a3291b0283140`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- **Latest repository contract validation:** [run #34](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922552) passed **25 tests** and benchmark validation.
- **Candidate runtime gates:** candidate #134 passed two-bone IK runtime tests, handle-axis grip geometry runtime tests, TypeScript build, 1,728-frame official editor render, MP4 probe and artifact upload.
- **Grip geometry:** `rig-anchors.ts` owns the canonical spoon shaft endpoints. The physical spoon prop and `grip-geometry.ts` consume the same constants. Four finger paths are generated in a shaft-local coordinate frame at separated along-axis stations; all four cross the shaft centreline and exit on the other side. The thumb wraps in the opposing direction. Runtime assertions cover both `rest` and `brace` poses.
- **Arm rig:** two-bone IK uses fixed 200 px upper-arm and 615 px forearm lengths, and recalculates the elbow on every tween callback from the current wrist target. Reachability and invalid-input checks remain enabled.
- **Selected-frame QA:** native 1920×1080 frames at 9.5 s, 10.5 s and 11.5 s from candidate #134 were inspected. Four distinct finger bands and an opposing thumb are visible across the handle; the grip remains attached in the selected lift/inspection/re-dip poses. This is selected-frame prototype QA, not a complete 24 fps review or anatomical approval.
- **Still incomplete:** full-speed review of both films; anatomical finger joints/depth, palm compression and wrist articulation; shoulder/torso weight transfer and acting; reaction/follow-through; causal diagram pacing and camera staging; mobile typography; approved Vietnamese VO, speech-aligned captions, SFX/music and audio QA; repeated authoring/preview/render measurements; H2 provenance/license audit.
- **Next task:** complete continuous 24 fps creative review and record frame-specific issues, then improve hand anatomy and whole-body acting. M1 is **not complete**. Do not begin a broad Film IR/runtime package or claim creative approval before remaining acceptance gates close.

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
