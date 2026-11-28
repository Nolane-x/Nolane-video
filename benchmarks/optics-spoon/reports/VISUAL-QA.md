**Review date:** 2026-11-28  
**Latest technical candidate:** [#171](https://github.com/Nolane-x/Nolane-video/actions/runs/46136144320) passed all three engine CI jobs; contract [#52](https://github.com/Nolane-x/Nolane-video/actions/runs/46136144238) passed 30 tests and benchmark validation. Candidate #171 has not yet been visually inspected.  
**Latest visually reviewed candidate:** [#167](https://github.com/Nolane-x/Nolane-video/actions/runs/46134635408); all three engine jobs passed. Motion Canvas artifact was downloaded and ffprobed: H.264 1920×1080 yuv420p, 24 fps, 72 s, 1,728 frames, zero browser errors. Native hand crops at 10.55/11.2/12.4 s were inspected and compared with #165.  
**Scope:** candidate #167 contact sheet, selected S02 hand frames and render report. This remains sampled QA, **not** continuous 24-fps review or final creative approval; audio review remains open.

## Candidate #167 — distinct finger-wrap profiles

- Source commit [`f488eb4`](https://github.com/Nolane-x/Nolane-video/commit/f488eb4765273767bfb973c7c244ce2908cfdd4c); candidate [#167](https://github.com/Nolane-x/Nolane-video/actions/runs/46134635408) passed Remotion, Motion Canvas and Manim. Contract [#50](https://github.com/Nolane-x/Nolane-video/actions/runs/46134635396) passed 30 Python tests and benchmark validator.
- `wrapFinger` now accepts independent start/middle/end radii. Index, middle, ring and pinky have separate profiles; `brace` uses tighter offsets/radii than `rest`.
- Runtime assertions confirm four distinct contour profiles, each finger crosses the handle axis and wraps to the far side, adjacent contact centres remain at least 14 px apart, and each brace wrap span is smaller than its rest span. The thumb stays opposed.
- The prop node, grip anchor and spoon handle axis are unchanged. Arm IK and torso/shoulder counterbalance are unchanged.
- Enlarged native crops around 10.55–11.2 s show slightly differentiated contours and a tighter brace compared with #165. This is a small silhouette refinement; it is not a transition to realistic anatomy. The palm/thumb still read graphically and depth/occlusion remain a creative task.
- Motion Canvas MP4 SHA-256 `497461e2d73aebfcbe18ec11429ff2db7480d93ba00de31d17711f148c32f517`; artifact id `15259560675`; ZIP digest `sha256:200f20dcb5bbf0bf1a597b4eb6c24ec44ec08c0bec3c295886d7701f5da22751`.
- Remotion MP4 SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`; artifact id `15259127403`; ZIP digest `sha256:dea254938ce5d49ab128a03e1bb14611c2cfe830a5d48fc2a9ac1cecfbb1920f`.
- Manim MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`; artifact id `15259770495`; ZIP digest `sha256:944114f001fb01ad5117950d849abd765dbd83e3e143c867360ff060ab83acc9`.

**Assessment:** the hand now avoids four exactly identical finger wrap contours and has a tighter brace pose while preserving physical contact. It remains stylized, and the improvement is subtle at film scale. M1 anatomy/acting acceptance remains open.

**Review date:** 2026-11-28  
**Latest reviewed candidate:** [#164](https://github.com/Nolane-x/Nolane-video/actions/runs/46131553339); all three engine jobs passed. Motion Canvas artifact was downloaded and ffprobed: H.264 1920×1080 yuv420p, 24/1 fps, 72.000 s, 1,728 frames, zero browser errors. Contact sheet and selected S02/S06 native frames were inspected for the torso/shoulder pose.  
**Scope:** candidate #164 contact sheet, native torso/arm/prop frames and render report, plus earlier sampled candidates. This is **not** continuous 24-fps review or final creative approval; audio review remains open.

## Candidate #164 — Nia torso/shoulder counterbalance

- Source implementation [`6469b4e`](https://github.com/Nolane-x/Nolane-video/commit/6469b4ec61251eba21dc75bd88c813ae1615de23); final test-lock commit [`60fd883`](https://github.com/Nolane-x/Nolane-video/commit/60fd88377d6de49362b0a15be92e766b1e2cd714).
- Candidate [#164](https://github.com/Nolane-x/Nolane-video/actions/runs/46131553339) passed all three engines. Contract [#49](https://github.com/Nolane-x/Nolane-video/actions/runs/46131553392) passed 30 tests and benchmark validator.
- Added rest/lift/inspect body poses. During lift, torso moves 7 px right/down and rotates 2.5°; neck and head shift with it; shoulder target moves 11 px to remain attached to the torso. Inspect uses a smaller 1.5° pose; re-dip restores neutral.
- The two-bone solver now interpolates shoulder and wrist together, re-solving the elbow each frame; segment lengths remain 200/615 px. S02 uses lift/inspect/rest; S06 uses lift/inspect/lifted settle. The prop-attached grip path is unchanged.
- Runtime IK tests cover named body/shoulder targets and 101 tween samples through shoulder+wrist transitions. Contract #49 locks the use of the shoulder parameter and typed torso rotation state.
- Contact sheet and native samples at S02 14.5–15.5 s and S06 62–66 s show a subtle counterbalance while the arm stays connected to the body and the hand remains on the spoon. This is a small silhouette/action improvement; Nia remains a stylized vector construction, not realistic anatomy.
- Motion Canvas MP4 SHA-256 `950d5ae0a95f2ddbb263878aa6161a1196f31088d60b9165e58d8e47559f74c7`; artifact id `15257706889`; ZIP digest `sha256:6116a5420e413d8f442268d00bc26091236da389cd6e998ce17795602442309b`. Remotion SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`; artifact id `15257439850`; ZIP digest `sha256:05c633bdb8be792353664263c3007883f046597d0610b5720ed30e5b9201806f`. Manim SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`; artifact id `15258560497`; ZIP digest `sha256:377ac5e6136d45887b62da818daf730f078a1c517cec0e1b44eb687d589b2f8d`.

**Assessment:** the shoulder is now coordinated with a restrained torso/neck shift instead of remaining detached from an independently moving arm. This does not close full-speed acting/anatomy review or the remaining audio, typography and pacing gates.

**Review date:** 2026-11-28  
**Latest reviewed candidate:** [#158](https://github.com/Nolane-x/Nolane-video/actions/runs/46126163649); all three engine jobs passed. Motion Canvas MP4 was downloaded and ffprobed: H.264 1920×1080 yuv420p, 24 fps, 72 s, 1,728 frames, zero browser errors. Native S05 samples at 44.2/44.8/45.5/46.2/47.2 s were inspected.  
**Scope:** candidate #158 contact sheet, S05 transition frames and render report, plus earlier sampled candidates. This is **not** continuous 24-fps review or final creative approval; audio review remains open.

## Candidate #158 — true source before apparent image
- Source commit `8b230d37630d622bf88048c2666fe5d7cb7175cc`; candidate [#158](https://github.com/Nolane-x/Nolane-video/actions/runs/46126163649) passed all three engines; contract [#47](https://github.com/Nolane-x/Nolane-video/actions/runs/46126163646) passed 29 tests and validator.
- S05: dashed backward extension solo 1.0 s; coral `Vị trí thật` label 0.4 s; pause 0.35 s; green apparent point/label plus caption 0.6 s; final hold 13.85 s. Total remains 17 s.
- Samples confirm: dashed line first; “Vị trí thật” alone around 46.2 s; apparent point/label and caption visible by 47.2 s. Selected-frame review only.
- Motion Canvas: SHA-256 `37cda1eb7b8f3d8c5e309c5faaebccf63a498c1cb8037f8f16a090b0cf72bd00`, artifact `15255069488`, ZIP `sha256:06a26519a846d660068ec347a3126a66a54a28a1d4f0b6179b6ed91b8261b1b3`.
- Remotion: SHA-256 `f6b1cf4ac28d7c43c9eec3940472eb1303c65ed9ada29ecc798000b810301a67`, artifact `15256081226`, ZIP `sha256:c35c6755b07808d7e8ad91b745298d785b247dd305fa4739d249079c7bb7b92b`.
- Manim: SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`, artifact `15255333723`, ZIP `sha256:b5dbf277be79f74a1f44f8b827a248a355273f51f7d6462fe36809044eab340c`.
- The remaining 13.85 s hold needs narration-led and continuous review. M1 pacing/comprehension acceptance remains open.

**Review date:** 2026-11-28  
**Latest reviewed candidate run:** [#156](https://github.com/Nolane-x/Nolane-video/actions/runs/46125152963). All three engine jobs passed. Motion Canvas artifact was downloaded and ffprobed; H.264 1920×1080 yuv420p, 24/1 fps, 72.000 s, 1,728 frames, zero browser errors. Native samples at S05 44–60 s, S02 8–17 s and S06 62–71 s were inspected.  
**Review scope:** candidate #156 contact sheet, native S05/S02/S06 samples and MC ffprobe/render report, plus earlier runs #83, #89, #94, #100, #115, #116, #121, #122, #125, #126, #133, #134, #137, #140, #143, #146, #149, #151, #153 and #154. This remains sampled prototype QA, **not** continuous 24-fps review or final creative approval; audio review remains open.

## Candidate #156 — S05 staged backward extension

- Candidate [#156](https://github.com/Nolane-x/Nolane-video/actions/runs/46125152963), source commit `dd7b317ed27700d18dac8e83c5ab3f2f1f5a72a9`, passed Remotion, Motion Canvas and Manim. Contract [#46](https://github.com/Nolane-x/Nolane-video/actions/runs/46125153063) passed 29 Python tests and benchmark validation.
- S05 now fades in the dashed backward extension, holds it alone for 1.0 second, then reveals the apparent point, labels and explanatory caption. The final hold changes from 15.6 to 14.6 seconds; the shot stays 17 seconds and the checkpoint is unchanged.
- Native samples at 44–60 s show the backward line first, then the point/labels and new caption. The remaining hold is static and long; its adequacy must be judged with approved narration and continuous playback.
- Candidate #156 Motion Canvas: H.264 1920×1080 yuv420p, 24/1 fps, 72.000 s, 1,728 frames, zero browser errors. MP4 SHA-256 `35868965cadbcb910056ddd1ab32fe68146dccdaa80c75f24071f03d39a8f108`; artifact id `15255463074`; ZIP digest `sha256:7f85f7252dcd6a8cf450e1adcba3f41ce1efe54e6c6a2d1a476dd16079538c4f`.
- Remotion #156: H.264 1920×1080, 24 fps, 72.000 s, 1,728 frames; SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`; artifact id `15255227810`; ZIP digest `sha256:dea327c1af3db60e6a145464f8401803d4059b8f17fff9c3b32936850282beba`.
- Manim #156: H.264 1920×1080, 279 frames, 11.624674 s; SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`; artifact id `15255610902`; ZIP digest `sha256:c237128e63b7afb85691591324113dfe9fb233cc7fef4fe036e1dfeb52688ffc`.

**Assessment:** reveal order is clearer and shot duration remains deterministic. This does not close diagram pacing/learning-comprehension acceptance; narration and uninterrupted full-speed review remain required.

**Review date:** 2026-11-28  
**Latest reviewed candidate run:** [#154](https://github.com/Nolane-x/Nolane-video/actions/runs/46124226688). All three engine jobs passed. Motion Canvas artifact was downloaded and ffprobed; its MP4 is H.264 1920×1080 yuv420p at 24/1 fps, 72.000 s, 1,728 frames with zero browser errors. Native samples at S02 8–17 s and S06 62–71 s were inspected.  
**Review scope:** candidate #154 contact sheet, native S02/S06 frame samples and MC ffprobe/render report, plus earlier runs #83, #89, #94, #100, #115, #116, #121, #122, #125, #126, #133, #134, #137, #140, #143, #146, #149, #151 and #153. This remains sampled prototype QA, **not** a continuous 24-fps review or final creative approval; audio review remains open.

## Candidate #154 — clear-out spoon lift and causal ray reveal

- Candidate [#154](https://github.com/Nolane-x/Nolane-video/actions/runs/46124226688), source/test commit `6c27763fada639ffba00f5367c54cb316ab00d26`, passed Remotion, Motion Canvas and Manim. Contract [#45](https://github.com/Nolane-x/Nolane-video/actions/runs/46124226663) passed 28 Python tests and benchmark validation.
- S03 now shows the incident ray/true point, then the refracted ray/observer point, before S04 adds the normal, angle labels and Snell formula. S03/S04 checkpoint frame ranges and the 72-second total are preserved.
- The original S02/S06 lift left the bowl underwater. The shared lift geometry now uses origin `[-280,-50]` and rotation `−50°`; inspection is `−44°`. Bowl centre `[195,285]`, vertical visual extent 53 px and waterline Y=80 are shared constants used by render code and tests.
- Under the lift transform, bowl centre is approximately stage `[63.67,-16.18]`; its conservative lower edge is `36.82`, about 43 px above the waterline. The bowl is also outside the glass's right edge. The transformed grip wrist is about 802.4 px from Nia's shoulder, within the 815 px maximum reach. Both S02 and S06 use the same prop transform and matching IK wrist targets.
- Candidate #154 Motion Canvas: H.264, 1920×1080 yuv420p, 24/1 fps, 72.000 s, 1,728 frames, zero browser errors. MP4 SHA-256 `91d0f7bec60e21a1deac18a59efe9b6be87b1586739099d91f7d2977e05287dd`; artifact id `15255207773`; ZIP digest `sha256:38bdc66d26f13b31de09f2496353f260d0c604d2eedf492c288694daf82fb10a`.
- Remotion #154: H.264 1920×1080, 24 fps, 72.000 s, 1,728 frames; SHA-256 `f6b1cf4ac28d7c43c9eec3940472eb1303c65ed9ada29ecc798000b810301a67`; artifact id `15255446471`; ZIP digest `sha256:57a13b2f0e8ab59aaaa78fd72bd2b59954603063ab3c2180e30d62cc80b19114`.
- Manim #154: H.264 1920×1080, 279 frames, 11.624674 s; SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`; artifact id `15254853044`; ZIP digest `sha256:88b8a10939d2c93bce5cb55a45ec87449d29c9fbc25c0fe07d6e25455a34b91f`.
- Native samples in S02 8–17 s and S06 62–71 s show the bowl leaving the glass/water and the grip remaining coupled to the transformed shaft. The final hold keeps the straight spoon clear of the glass. This is selected-frame inspection only.
- Both full-film MP4s remain silent/video-only. No approved VO, synchronized captions, SFX or music are present.

**Assessment:** S03 is now a staged causal reveal and the clear-out lift is physically legible in sampled output. M1 remains open for full-speed review, natural acting/anatomy, S05 pacing, mobile typography and audio acceptance.

# M1 Visual QA — The Spoon That Bends

**Review date:** 2026-11-28  
**Latest reviewed candidate run:** [#149](https://github.com/Nolane-x/Nolane-video/actions/runs/46119630293). All three engine jobs passed. Candidate artifacts were downloaded; all MP4s were ffprobed. Motion Canvas rendered 1,728/1,728 frames with zero browser errors. Native frames at 8.8/9.5/10.5/11.5 s and enlarged grip crops were inspected.  
**Review scope:** candidate #149 contact sheet, full-frame samples and thumb-base/finger crops, candidate #149 ffprobe metadata, plus earlier runs #83, #89, #94, #100, #115, #116, #121, #122, #125, #126, #133, #134, #137, #140, #143 and #146. This remains sampled prototype QA, **not** a continuous 24-fps review or final creative approval; narration and audio review remain open.

## Candidate #149 — thumb-base silhouette blend

- Candidate [#149](https://github.com/Nolane-x/Nolane-video/actions/runs/46119630293), source commit `dabab598c18fdfb95bd1093f6141336de1684e67), passed Remotion, Motion Canvas and Manim. Contract [#41](https://github.com/Nolane-x/Nolane-video/actions/runs/46119630375) passed 26 Python tests and benchmark validation.
- The thenar/thumb-base pad still uses the same geometry and pose binding, but its fill and stroke now share the skin colour, line width is reduced to 1 px and its local rotation matches the palm at −12°. This intentionally removes the second heavy dark ring; the thumb's own dark contour remains.
- No finger points, handle axis, prop anchor, actor IK, spoon geometry or shot timings changed. Motion Canvas passed IK/grip runtime tests, TypeScript build, official 1,728-frame render and MP4 probe.
- Candidate #149 Motion Canvas: H.264 1920×1080 yuv420p, 24/1 fps, 72.000 s, 1,728 frames, zero browser errors. MP4 SHA-256 `e78426c403b25c06cdabaa3310f5242ddb2b9977dec637025cef329e6d827ce8`; artifact id `15252869337`; ZIP digest `sha256:819eb82fcd7cc5935f4818f9bcfddd6f8ae5bb2927db9b555dbfdb390a9261cb`.
- Native samples and enlarged crops show the thumb-base mass blending into the palm instead of forming a second dark-outlined circle. The full-frame hand remains small and stylized; finger depth/occlusion, palm compression, organic volume and acting are not approved.
- Remotion #149 remains H.264 1920×1080 yuv420p, 24 fps, 72.000 s, 1,728 frames; SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`. Manim specialist segment remains 279 frames/11.624674 s; SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- Both full-film candidates remain video-only/silent. No approved VO, synchronized captions, SFX or music are present.

**Assessment:** the silhouette is cleaner in inspected frames, but this is a small vector-style correction. It does not pass organic hand anatomy or close M1. Continuous 24-fps playback, body weight/acting, diagram pacing, mobile text and audio remain open.

**Review date:** 2026-11-28  
**Latest reviewed candidate run:** [#146](https://github.com/Nolane-x/Nolane-video/actions/runs/46118930631). All three engine jobs passed. Candidate artifacts were downloaded; both full-film streams were ffprobed. Motion Canvas rendered 1,728/1,728 frames with zero browser errors. Its #146 MP4 is SHA-identical to #143, and selected native frames at 8.8/9.5/10.5/11.5 s plus zoomed grip crops were inspected from that exact bitstream.  
**Review scope:** candidate #146 contact sheets and native grip/arm frames, candidate #146 ffprobe metadata, plus earlier runs #83, #89, #94, #100, #115, #116, #121, #122, #125, #126, #133, #134, #137, #140 and #143. This is sampled prototype QA, **not** a continuous 24-fps review or final creative approval; narration and audio review remain open.

## Candidate #146 — Nia prop-local hand articulation slice

- Candidate workflow [#146](https://github.com/Nolane-x/Nolane-video/actions/runs/46118930631) ran on branch HEAD `511d461fa627b8b86521c25ddf267b4981102831`; Remotion, Motion Canvas and Manim all passed. Contract [#40](https://github.com/Nolane-x/Nolane-video/actions/runs/46118930644) passed 26 Python tests and benchmark validation.
- The Motion Canvas grip generator now derives a crease line perpendicular to the first segment of each of the index, middle, ring and pinky paths, positioned at 52% of the segment with an 11 px length. It also derives a palm crease, thumb-base pad position and thumb-base crease from the same prop-local grip pose.
- The `nia-grip.tsx` controls animate with the existing `rest`/`brace` poses; `spoon.tsx` wires their visibility into S01/S06. The hand remains attached to the spoon prop and therefore inherits the same lift/inspection transforms. IK anchors, spoon geometry and shot timings are unchanged.
- Candidate #146 Motion Canvas MP4: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames, zero browser errors. MP4 SHA-256 `2b327e50fde101e306642fcf73d3ce02a3af6a9b041edd81d108f1b9b88e8ff2`. Actions artifact id `15252578835`; ZIP digest `sha256:6371d006058612beb0f660d0a82c65704d29cc156f84140405bd752b58aa3535`.
- Selected native 1080p samples and enlarged grip crops show flexion marks and thumb-base mass following the prop. At enlarged scale, the thumb/palm masses still overlap and read as simplified vector geometry; volume, depth/occlusion and convincing organic anatomy are not approved.
- Remotion #146: H.264, 1920×1080, 24 fps, 72.000 s, 1,728 frames; MP4 SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`. Manim #146: 279-frame specialist segment; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`. Both engine jobs passed.
- Both full-film MP4s remain video-only; no approved narration, SFX/music or synchronized audio exists.

**Assessment:** the slice adds measurable hand articulation cues and passes runtime, contract and full render gates. It does **not** close organic anatomy/acting or M1 creative acceptance; continuous 24-fps playback, wrist/body weight, diagram pacing, mobile typography and audio remain open.

**Review date:** 2026-11-27  
**Latest reviewed candidate run:** [46013464282 (#140)](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464282). All three engine jobs passed. The Motion Canvas MP4 was downloaded and ffprobed; its contact sheet, 4-fps S02 strip and selected native 1920×1080 frames at 8.8/9.5/10.5/11.5 s were inspected. The Remotion MP4 was also downloaded and ffprobed.  
**Review scope:** candidate #140 contact sheets and S02 4-fps strip, selected native 1080p Motion Canvas arm frames, Remotion ffprobe, plus earlier runs #83, #89, #94, #100, #115, #116, #121, #122, #125, #126, #133, #134 and #137. This is sampled prototype QA, **not** a continuous 24-fps review or final creative approval; narration and audio review remain open.

## Candidate #140 — Nia arm contour and joint slice

- Candidate workflow [#140](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464282) ran on source commit `a8cbe2242ade6c00a09d11517f02a9f3c2d8b2b6`; Remotion, Motion Canvas and Manim all passed. Contract workflow [#36](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464489) passed 26 tests and benchmark validation.
- Motion Canvas adds two outline strokes around the existing upper arm and forearm, plus shoulder, elbow and wrist joint circles. They are bound to the same IK shoulder/elbow/wrist coordinates on every tween callback; bone lengths (200/615 px), anchors and prop/grip geometry are unchanged.
- The scene fades the additional controls in S01, out for the S03 cutaway and back in at S06. The contract now asserts the controls, IK point bindings and visibility wiring.
- Candidate #140 Motion Canvas MP4: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames, zero browser errors. MP4 SHA-256 `b4637a336e3206a36975e769b2067802afeaa114d1aad90e63d928685e89260a`.
- The contact sheet, 4-fps S02 strip and native 1920×1080 frames at 8.8, 9.5, 10.5 and 11.5 seconds were inspected. The shoulder/elbow/wrist contour and joint markers make the extended arm easier to parse through lift/inspection/re-dip. The style is still a simple graphic/vector rig; it does not yet provide organic anatomy, skin volume or nuanced acting.
- Remotion candidate #140 remained green and ffprobed at H.264, 1920×1080, 24 fps, 72.000 s, 1,728 frames; its parity helper/test was unchanged. Manim's specialist segment also passed.

**Assessment:** this is a measurable silhouette/readability improvement with stable IK and technical render proof. It does **not** close hand/arm anatomy or M1 creative acceptance; full-speed 24-fps review, motion weight, body counterbalance, mobile type and audio remain open.

## Candidate #137 — Remotion storyboard parity repair and full candidate rerender

- Candidate workflow [#137](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488421) ran on code commit `9e639c2df7e80141fda25cdd8f1718070f2b9d99`; Remotion, Motion Canvas and Manim all completed successfully. Contract workflow [#35](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488347) passed **26 tests** and the benchmark validator.
- **Remotion:** deterministic `benchmark-motion.ts` helpers drive S02 anticipation/lift/inspection/re-dip/lean and the S03–S05 diagram reveal. The parity test runs before typecheck/render and passed. Downloaded MP4 metadata: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames; SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`.
- **Motion Canvas:** candidate rerender also passed; `render-report.json` reports 1,728 expected/rendered frames and zero browser errors. Downloaded MP4 metadata: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames; SHA-256 `3906dc514affe8b91fe226e51a5c16b0a535869ddc5f3483359dab024b81ead4`.
- **Manim specialist segment:** H.264, 1920×1080, yuv420p, nominal 24 fps, 279 frames, 11.624674 s; average stream rate `857088/35711` is ~24.00067 fps, within the CI tolerance. MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- Contact sheets and 4-fps S02 samples were inspected. Remotion samples show the lifted straight spoon, inspection turn, re-dip and the character lean/reaction; selected diagram frames show the interface/physical path in S03, normal and angles/formula in S04, then the dashed backward construction and apparent point in S05. This confirms the new states are present in rendered frames, but **does not substitute for watching the full films at 24 fps**.
- All three full candidate MP4s are silent/video-only. There is no approved narration, SFX/music or speech-synchronized caption track.
- **Remaining visual defects:** Nia remains a stylized vector blockout; hand anatomy/depth, palm and thumb articulation, shoulder/torso counterbalance and secondary acting need improvement. Diagram holds/camera pacing, mobile typography and complete shot-to-shot continuity remain open.

**Assessment:** source-level and deterministic storyboard parity gates are now in place, and candidate #137 proves all three renderers still pass their technical gates. Creative acceptance remains open.

## Independent cross-engine parity audit — candidate #134

**Evidence inspected in this session:** downloaded the Remotion and Motion Canvas artifacts from candidate workflow [#134](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922641), checked both MP4 streams with ffprobe, opened both contact sheets, and sampled S02 (08:00–18:00) at 4 fps. This is sampled visual review, **not** continuous playback at 24 fps.

- Both full-film artifacts are H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s and 1,728 frames. Both files contain only a video stream; no narration, music or SFX track is present. Motion Canvas also reports 1,728/1,728 frames and zero browser errors.
- **Remotion S02 is not yet storyboard-equivalent.** In `remotion/src/OpticsSpoon.tsx`, `Kitchen` computes one `lift` interpolation from global frame 192 over 110 frames and cross-fades the bent spoon to a horizontal straight spoon. The spoon then remains in that state. `Nia` uses a constant S02 tilt/hand offset; there is no authored inspection turn, second dip, or lean/reaction beat. The 4-fps S02 sample is consistent with that static tail. The canonical storyboard requires lift, gentle inspection turn, re-dip and reaction. This is an **implementation-parity gap**, not evidence of a Remotion runtime limitation.
- **Remotion S04 is also under-choreographed relative to the shared brief.** Its `Diagram` draws the normal and both physical ray segments without staged timing; angle labels and Snell formula share one broad opacity window. The Motion Canvas scene explicitly sequences normal, incident ray, refracted ray, angles and formula. The Remotion version should reveal those ideas causally before any engine-level comparison.
- **Test coverage gap:** `tests/test_benchmark.py` validates the canonical storyboard, science geometry, Motion Canvas checkpoints and Motion Canvas S02 beats, but contains no equivalent Remotion S02/S04 frame-parity assertions.
- **Motion Canvas timing note:** its current S02 authored actions total about 4.2 seconds followed by roughly 5.76 seconds of hold inside the 10-second shot. That may be intentional with narration, but the current silent preview cannot validate its pacing; review again with approved VO or a deliberate visual hold.

**Required parity repair before comparative creative scoring:** make Remotion S02 implement anticipation → lift → inspect/turn → re-dip → lean/reaction, stage S04 in the same causal order as the canonical storyboard, and add deterministic frame-level regression checks. Re-render both candidates and retain the old #134 artifacts for comparison. Keep the full 24-fps continuous review, reduced/mobile typography check, audio and final creative approval open.

## Follow-up review — candidate #134: handle-axis grip regression pass

- Candidate workflow: [46007922641](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922641); Remotion, Motion Canvas and Manim all passed. Repository contract validator [#34](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922552) passed 25 tests.
- Motion Canvas runtime IK test, handle-axis grip geometry test, TypeScript build, official editor render, 1,728-frame count, MP4 probe and artifact upload all passed.
- Native 1920×1080 frames at 9.5 s, 10.5 s and 11.5 s were opened. The four finger bands remain separately readable across the spoon handle; the thumb sits opposite the wrap; the hand remains visible in the selected lift/inspection/re-dip poses.
- Motion Canvas output: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames, zero browser errors. MP4 SHA-256 `3906dc514affe8b91fe226e51a5c16b0a535869ddc5f3483359dab024b81ead4`.
- The repo-level contract checks that the prop and grip share handle-axis constants and that runtime geometry tests are wired into candidate CI.
- **Remaining defects:** finger strokes are still pill-like, with no convincing knuckle joints, depth occlusion or organic palm shape. The thumb base and wrist need more articulation, and arm/body acting remains a blockout. These still frames do not substitute for a full-speed 24 fps review.

## Follow-up review — candidate #133: spoon-axis grip geometry

- Candidate workflow: [46006606072](https://github.com/Nolane-x/Nolane-video/actions/runs/46006606072); Remotion, Motion Canvas and Manim all passed. Motion Canvas IK runtime test, grip geometry runtime test, TypeScript build, official 1,728-frame render and ffprobe all passed.
- Motion Canvas output: H.264, 1920×1080, yuv420p, 24/1 fps, exactly 1,728 frames, 72.000 s; render report records zero browser errors.
- Native 1920×1080 frames at 9.5 s, 10.5 s and 11.5 s were opened. The four fingers now read as distinct bands crossing the shaft at separate positions; the thumb pad sits opposite the finger wrap. The pose remains visible through the selected lift/inspection/re-dip states.
- New shared anchors `SPOON_HANDLE_LOCAL_START` and `SPOON_HANDLE_LOCAL_END` are used by both `SpoonProp` and `grip-geometry.ts`. This prevents the prop shaft and hand rig from drifting due to duplicated axis constants.
- `grip-geometry.ts` projects the palm anchor onto the shaft centreline, derives an along-axis/perpendicular basis and creates four separated cross-section finger paths for rest/brace. The thumb path crosses in the opposing direction.
- `test-grip-geometry.mjs` executes the actual TypeScript geometry and asserts correct start/middle/end sides, centreline crossing, finger spacing, opposing thumb direction and thumb endpoint alignment.
- **Remaining visual defects:** current digits are pill-like vector strokes, not anatomical fingers with joints or occlusion/depth. The palm still needs compression/shape, thumb base articulation and wrist roll. Selected stills are not a full-speed 24 fps watch or final approval.

## Follow-up review — candidate #126: per-frame two-bone arm IK

- Candidate workflow: [46003070151](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070151); all Remotion, Motion Canvas and Manim jobs passed. Contract validation [#31](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070299) passed 24 tests.
- Motion Canvas output: H.264, 1920×1080, yuv420p, 24/1 fps, exactly 1,728 frames and 72.000 s; render report records 1,728 expected/rendered frames and zero browser errors.
- Native 1920×1080 frames at 8.8 s, 9.8 s, 10.8 s and 11.8 s were opened. Across the selected lift/inspection/re-dip beats, the elbow follows the wrist target, the hand remains visible above the forearm and the grip stays over the spoon handle.
- New module `src/actors/arm-ik.ts` implements the two-bone law-of-cosines solution, finite input validation, minimum/maximum reach guards and deterministic bend branch selection.
- `NIA_ARM_BONE_LENGTHS` fixes the upper segment at 200 px and forearm at 615 px. Nia's `toArmPose()` runs a callback tween and resolves the elbow every rendered frame; it no longer linearly interpolates precomputed elbow endpoints.
- `scripts/test-arm-ik.mjs` executes the real TypeScript solver, validates rest/lift/inspect anchors and both elbow branches, rejects unreachable/invalid inputs, and checks 101 samples across each of the three S02 transitions while asserting both segment lengths remain constant.
- **Remaining visual defects:** the arm and hand are still stylized strokes, not anatomical anatomy. The two-segment arm is extended and lacks shoulder/torso counterbalance; thumb opposition, finger wrap, palm compression, wrist roll and secondary motion still need work. Selected stills do not constitute a full-speed 24 fps watch or proof of every rendered pose's creative quality.

## Follow-up review — candidate #122: reusable four-finger and arm poses

- Candidate workflow: [45997725029](https://github.com/Nolane-x/Nolane-video/actions/runs/45997725029); all Remotion, Motion Canvas and Manim jobs passed. Contract validation [#29](https://github.com/Nolane-x/Nolane-video/actions/runs/45997963537) passed 23 tests.
- Motion Canvas output: H.264, 1920×1080, yuv420p, 24/1 fps, exactly 1,728 frames and 72.000 s; render report records 1,728 expected/rendered frames and zero browser errors.
- Selected native frames at 9.0 s, 10.5 s and 11.5 s were opened. The hand is visibly in front of the forearm; the palm and finger strokes remain over the spoon handle in the selected lift/inspection/re-dip states.
- createNiaGrip() now defines four separate finger paths (index, middle, ring, pinky) plus thumb and palm. Named local-space poses "rest" and "brace" are animated by toPose().
- createNiaActor() now owns named shoulder/elbow/wrist poses "rest", "lift" and "inspect", with a toArmPose() API. Scene code no longer declares arm point coordinates for these beats; the arm rig uses shared rotation-aware targets from rig-anchors.ts.
- A layer-order regression test ensures Nia's forearm is drawn before the spoon node, so prop-attached fingers are not obscured.
- **Remaining visual defects:** the hand remains a stylized vector blockout rather than convincing anatomical contact; thumb opposition, palm compression, wrist transition and true finger wrap need work. The arm lacks believable weight transfer and secondary motion. Selected stills do not prove stable contact across all 240 S02 frames or constitute a full-speed 24 fps review.

## Remotion 4.0.547 — full-film candidate

Artifact: `m1-remotion-candidate`  
Artifact digest: `sha256:e5819c0d06ebcdd9eda332a0619a605b8957bc3c77bdccf7d4e55dea92f3f998`  
MP4 SHA-256: `1970da35a380c0fd08a8a04e74bc03d050d21bb389ecb0bdd483ab49f232bbda`  
Contact-sheet SHA-256: `76de5519cdc408ca3b925c331b918f17a1aaab78f30c73fad77d127df9106d84`  
Output: H.264 High, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames.

### Passed

- The six-shot progression is present: hook, physical contradiction, optical reveal, refraction, apparent image and resolution.
- The water/air boundary, normal, 40° incident angle, approximately 58.9° refracted angle, Snell relation, true point and apparent point use the canonical scientific model.
- The “NƯỚC” label safe-area correction from commit `e5e0259ca2c517858511dcaf11a70edb40f640ea` is present; it no longer sits under the lower caption bar.
- The physical straight spoon is shown as distinct from the apparent kink.

### Still below the target

- Nia remains a geometric vector blockout. The hand/finger articulation, visible grip, weight transfer and expressive performance are not production quality.
- Hand/prop interaction does not yet demonstrate anticipation, contact, lift, release and follow-through.
- Camera movement and transitions are functional rather than cinematic.
- Bottom copy is explanatory per-shot text, not transcript captions synchronized to real speech. No VO/SFX/music track exists.

**Judgement:** technical and scientific-diagram prototype pass. Acting, audio and final art direction are not approved.

## Motion Canvas 3.17.2 — full-film candidate

Artifact: `m1-motion-canvas-candidate`  
Artifact digest: `sha256:d8450a374bfce31820c1cdfd2bf5aadd324396cd58dcb1e80a731fd85755816b`  
MP4 SHA-256: `8b6d7c9f388c5660b2594105ba0dcfa0e9a2ed1248262daea140048dbd40220d`  
Contact-sheet SHA-256: `d88fc57c6d7452a5e720cecc7afca84ee167ddb2c74f3157bdd7d84df4070a03`  
Output: H.264, 1920×1080, yuv420p, 24/1 fps, exactly 1,728 frames, 72.000 s. Report records zero browser errors.

### Passed

- Run [45943879530](https://github.com/Nolane-x/Nolane-video/actions/runs/45943879530) proved the complete exact-range render, and run [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231) passed again with the angle-label layout correction.
- Renderer: `RendererResult.Success`; last included frame 1,727; 1,728 export events, 1,728 unique frames, 1,728 sequential PNG files.
- ffprobe confirms H.264, 1920×1080, 24 fps, 72.000 s and 1,728 frames.
- The “NƯỚC”/“KHÔNG KHÍ” labels remain legible, and the diagram is consistent with canonical geometry.
- The 40° and 58.9° labels have been moved clear of the physical ray paths in source commit `3a091f4fe5eec706014aadfb42f17679752ea733`; contact sheet and frame 1152 in run 45944266231 confirm the correction.
- The runner no longer hangs after export. Commit `ad8fc14a848b02a61d7b76fb916ab4bfb0942e14` starts Vite directly in a process group and awaits its termination, so CI proceeds through ffprobe and candidate upload.

- Run [45944799022](https://github.com/Nolane-x/Nolane-video/actions/runs/45944799022) reran all three candidates successfully after the report update. The newly downloaded MP4s have been ffprobed: Remotion and Motion Canvas both 1920×1080, H.264/yuv420p, 24 fps, 72.000 s and 1,728 frames; Manim 1920×1080, 24 fps, 279 frames, 11.624674 s.

### Still below the target

- The character/arm is a geometric blockout. The arm is one static stroke without a hand or fingers; grip/contact continuity is not convincing.
- The spoon is represented by toggling bent and straight line segments, not a fully acted lift/re-dip action with articulated contact.
- Camera choreography is limited; the diagram transition is primarily a crossfade.
- Some small diagram labels should still be checked on mobile/reduced-size output.
- No real audio is included, and caption/speech synchronization is not tested.

**Judgement:** full-film technical pass and diagram-layout pass. Character acting, prop contact, cinematic camera work and audio are not approved.

## Manim CE fork — S04/S05 specialist diagram

Artifact: `m1-manim-refraction-segment`  
Artifact digest: `sha256:cc5f53c5252d81399f3b640e4ac16053c0feb68152afb34dd64e035724c87889`  
MP4 SHA-256: `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`  
Contact-sheet SHA-256: `b81bdd8da5a3e93e417b0822ec3c9cf99e4b6cf9e804fca666eb6a7bb6c5a33f`  
Output: H.264, 1920×1080, yuv420p, 24/1 fps, 279 frames, 11.624674 s.

### Passed

- Horizontal water-air interface and perpendicular normal are clear.
- The incoming and outgoing ray directions are consistent with water-to-air refraction; 40° and approximately 58.9° are measured from the normal.
- The dashed backward extension and true/apparent points are semantically distinct.
- NEE Deep Ink/Water Slate/Ray Gold palette, DejaVu Sans and persistent water region are applied.
- Native-resolution final frame and contact sheet have been reviewed; the Vietnamese labels and Snell formula are legible.

### Still open

- The initial build is progressively revealed and begins sparsely. Its timing must be judged with a real VO track.
- Formula text uses Manim's vector text fallback rather than LaTeX. Keep mathematical glyphs correct if the typography changes.
- Manim is a specialist diagram adapter, not a comparable full-film candidate.

**Judgement:** specialist scientific geometry and style pass. Audio and full-story role are not tested.

## Cross-engine conclusion

- Remotion and Motion Canvas both pass a silent 72-second full-film technical render.
- Manim passes the 11.624674-second specialist scientific segment.
- The full-film candidate visuals remain prototype-level. None yet demonstrates NEE's target character performance, believable prop contact, polished camera language, final audio or word-level caption synchronization.
- This review uses contact sheets and selected still frames; continuous-motion review is still required.
- Motion Canvas is provisionally selected as the first 2D scene adapter by [ADR-0001](../../docs/adr/ADR-0001-motion-canvas-first-2d-runtime.md). This is an implementation choice, not creative approval or proof of final quality. See `docs/M1_SCORECARD.md` and `docs/ANIMATION_CRAFT_STANDARDS.md`.


## Follow-up review — corrected geometry and first reusable Nia rig

### Run #83 — coordinate-system correction

- Candidate workflow: [45950491747](https://github.com/Nolane-x/Nolane-video/actions/runs/45950491747), all three engine jobs passed.
- Motion Canvas MP4: H.264, 1920×1080, 24/1 fps, 72.000 s, exactly 1,728 frames. The renderer emitted 1,728 unique sequential PNGs and no browser errors.
- Selected native frames and contact sheet confirm that the water region is below the air-water boundary, the air region is above it, and the interface line now uses the same top-left-to-centered coordinate mapping as the rays and points. The outgoing ray bends away from the normal; the dashed backward extension and true/apparent points are in the intended regions.

### Run #89 — reusable actor and S02 acting slice

- Candidate workflow: [45951640411](https://github.com/Nolane-x/Nolane-video/actions/runs/45951640411), all three engine jobs passed.
- Motion Canvas artifact: `m1-motion-canvas-candidate`, digest `sha256:4da7c9e84a449dabbb09ac235e14e9819691ecbdb444ca2755d98258c9904a92`. Output: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames; MP4 SHA-256 `0016d083c11a3dc1615c8ae9e8dbc4a58af5a02bbcb5354e66f2b80583965616`.
- Selected frames at 9.7 s, 11.8 s, 12.2 s and 63.0 s were inspected at native resolution. At 9.7 s, the spoon is shown straight outside the water. At 11.8 s, the apparent lower segment is visibly offset but continuous at the waterline (the offset is 14 px with a 22 px stroke, not a separated pair of pieces). At 12.2 s, Nia has leaned in and changed expression. At 63.0 s, the diagram has resolved back to the straight spoon.
- Nia now has a reusable rig in `src/actors/nia.tsx`: torso, neck, head, eyes, mouth, upper arm, forearm and elbow. The S02 prop-hand relationship remains a simple parented coupling; the hand is still a geometric blockout, not articulated fingers or a production grip constraint.

**Still not approved:** the review did not watch both entire films at 24 fps. Character performance and prop physics remain prototype-level; narration, transcript-aligned captions, SFX, music and perceptual audio QA are absent. Camera choreography, small-screen type and the full diagram pacing still need a dedicated review.


## Run #94 — reusable refraction diagram and virtual-ray styling

- Candidate workflow: [45952654166 (#94)](https://github.com/Nolane-x/Nolane-video/actions/runs/45952654166), all three candidate jobs passed.
- Motion Canvas artifact `m1-motion-canvas-candidate`: digest `sha256:92c3b5d3451520a6e7b7fc8bd6db0f7c51c772335b9692c4cadf24724693cbc8`; MP4 SHA-256 `4a12e4609d27e941202892b7ad10b6847f88ddfe878aac50e1119d6908b2fce3`. The renderer exported 1,728 unique sequential PNGs; ffprobe confirms H.264, 1920×1080, 24/1 fps, 72.000 s and 1,728 frames; zero browser errors.
- The scene now uses `src/diagrams/refraction.tsx` through `createRefractionDiagram(palette)`. The module owns the diagram view, labels, points and canonical coordinate mapping; the scene only controls when its returned refs appear.
- Frame at 51 s was inspected at native 1920×1080. It shows the water-air interface in the correct orientation; solid yellow incident/outgoing physical rays; a white dashed backward extension; coral true position; mint apparent position. The dashed segment begins exactly at the interface and follows the outgoing ray line backward to the apparent point.
- Contract workflow [#13](https://github.com/Nolane-x/Nolane-video/actions/runs/45952657476) passed 17 tests, including checks for component reuse and `lineDash={[18, 14]}`.

**Still not approved:** this confirms the selected scientific diagram frame and technical render only. Full-speed 24 fps pacing/comprehension review, small-screen readability, the remaining actor contact work and all real audio review remain open.


## Run #116 — rotation-aware Nia/spoon contact

- Candidate workflow [#116](https://github.com/Nolane-x/Nolane-video/actions/runs/45956296455) passed all three engine jobs.
- Motion Canvas output: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, exactly 1,728 frames; MP4 SHA-256 `4a12e4609d27e941202892b7ad10b6847f88ddfe878aac50e1119d6908b2fce3`.
- The S02 grip/wrist chain uses one shared local anchor. Wrist endpoint is recomputed from prop origin and rotation at rest (0°), lift (−5°) and inspection turn (+6°). This avoids leaving the forearm endpoint at the old stage position while the spoon rotates.
- Frames at 9.8 s, 10.8 s and 11.8 s were inspected at native 1920×1080. At 9.8 s the wrist meets the grip during lift; at 10.8 s the handle rotates and the wrist remains attached; at 11.8 s the spoon re-dips and the hand remains attached. No visible hand/prop separation appears in these selected frames.
- This is still a stylized blockout: fingers are simplified, not anatomical; palm compression, subtle grip pressure, full wrist articulation and nuanced weight transfer remain to be authored.
- Contract workflow [#24](https://github.com/Nolane-x/Nolane-video/actions/runs/45956346788) passed 21 tests, including numerical rest/lift/turn contact checks and component wiring.

**Still not approved:** full-speed 24 fps review of both films, continuous S02 grip inspection frame-by-frame, reduced/mobile typography, causal diagram pacing, final character animation and all audio/narration approval remain open.
