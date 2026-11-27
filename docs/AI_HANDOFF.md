## Latest continuation snapshot — 2026-11-27 (candidate #137; Remotion parity repair complete)

This is the authoritative starting point for the next session. The source-level Remotion storyboard gap identified after #134 has now been repaired and technically rendered; M1 creative acceptance remains open.

### GitHub state
- Correct repository: `Nolane-x/Nolane-video` (NEE), **not** `Nolane-x/video`.
- Active branch: `m1/optics-benchmark`.
- Code/test commit: [`9e639c2`](https://github.com/Nolane-x/Nolane-video/commit/9e639c2df7e80141fda25cdd8f1718070f2b9d99); this session's follow-up documentation commit is docs-only.
- Main remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; do not merge into or change main.
- Candidate [#137](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488421): all Remotion, Motion Canvas and Manim jobs passed.
- Contract [#35](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488347): **26 tests passed** and benchmark validation passed.

### What changed
- Remotion `src/benchmark-motion.ts` supplies deterministic global-frame helpers.
- Remotion S02 (`[192,432)`) now authors anticipation → lift → inspection turn (6°) → re-dip → lean/reaction. The arm/hand endpoint uses the same Y displacement as the lifted spoon.
- Remotion's explanation sequence shows interface/physical rays during S03, then normal, angle labels and Snell formula during S04, followed by the dashed backward extension and apparent image point during S05.
- New `remotion/scripts/test-parity.mjs` tests representative frames, S02 boundaries, every frame of the 240-frame hand/prop vertical coupling, reveal ordering and invalid frame guards. It is wired as `npm run test:parity` before typecheck/render.
- `tests/test_benchmark.py` adds a repository-level parity contract. Candidate #137 proves it runs before the Remotion render.

### Verified outputs
- Remotion: H.264 1920×1080 yuv420p, 24/1 fps, 72.000 s, 1,728 frames; MP4 SHA-256 `5fac97a10174918d259cfe525495113e0b51c2018ad75ef27b5f62bcb9f310b2`; artifact id `15203563873`.
- Motion Canvas: H.264 1920×1080 yuv420p, 24/1 fps, 72.000 s, 1,728 frames, zero browser errors; MP4 SHA-256 `3906dc514affe8b91fe226e51a5c16b0a535869ddc5f3483359dab024b81ead4`; artifact id `15203143475`.
- Manim specialist segment: H.264 1920×1080 yuv420p, nominal 24 fps, 279 frames, 11.624674 s; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`; artifact id `15202838965`.
- Both full-film candidates are silent (video-only MP4s). No VO, SFX/music, synchronized captions or audio review is complete.

### Visual QA truth
- Both full-film MP4s were downloaded and ffprobed directly. Contact sheets and S02 samples at 4 fps were inspected; selected 1080p S02/diagram frames were opened.
- These samples show Remotion's lift/inspect/re-dip/reaction and the causal optical reveal. This is **not** a continuous 24-fps review or final creative approval.
- Motion Canvas remains stylized vector blocking: hand/finger anatomy, weight transfer and secondary acting need meaningful improvement. Diagram hold/pacing also requires continuous review.

### Exact next task
1. Watch both entire 72-second MP4s uninterrupted at 24 fps.
2. Record shot ID, frame range/timecode, severity, symptom and reproduction for every issue in `benchmarks/optics-spoon/reports/VISUAL-QA.md`.
3. Fix the highest-severity defects in acting/contact/diagram pacing while retaining frame-level parity tests and the #137 outputs as a known-good technical baseline.
4. Inspect Vietnamese labels and safe areas at reduced/mobile size.
5. Add only approved Vietnamese VO, synchronized captions, SFX/music and conduct perceptual audio QA; otherwise document a deliberate silent-visual benchmark scope change.
6. Measure authoring/preview/render/revision costs and complete H2 provenance/license audit.

### Guardrails
- Do not start a broad Film IR/M2 implementation or call M1 complete yet.
- Keep Motion Canvas as the provisional first 2D adapter, Manim as specialist, Remotion as full-film baseline/reference.
- Do not copy H2 code/assets from `Nolane-x/video` before provenance/license review.
- Preserve candidate #137 artifacts and current passing tests; no frame-count/checkpoint weakening.
- Keep technical pass, sampled-frame QA, continuous creative approval and audio approval separate.

---

## Latest continuation snapshot — 2026-11-27 (candidate #134 + cross-engine parity audit)

This is the current starting point for the next session. It adds a source-level parity finding to the candidate #134 verification; it does not claim M1 is complete.

### GitHub state
- Repo: `Nolane-x/Nolane-video` (NEE), **not** `Nolane-x/video`.
- Working branch: `m1/optics-benchmark`. Last verified HEAD before this handoff refresh: `7266aadd424e0ecea6a4c585c99fddb1db5ce352`. Candidate #134 and contract #34 source commit: `0c0118b372b930fc5ad84ff9773918e148a13bbc`.
- `main` remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; do not merge or change it as part of this work.
- Candidate [#134](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922641): all Remotion, Motion Canvas and Manim jobs passed.
- Contract [#34](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922552): 25 tests plus the benchmark validator passed.

### Verified output and inspection
- Remotion: H.264 1920×1080, yuv420p, 24/1 fps, 72 s, 1,728 frames; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
- Motion Canvas: H.264 1920×1080, yuv420p, 24/1 fps, 72 s, 1,728 frames, zero browser errors; MP4 SHA-256 `3906dc514affe8b91fe226e51a5c16b0a535869ddc5f3483359dab024b81ead4`.
- Manim specialist segment: H.264 1920×1080, nominal 24 fps, 279 frames, 11.624674 s; keep this as the specialist S04/S05 renderer, not a full-film candidate.
- Both full-film artifacts are silent: ffprobe found a single video stream. Narration timing remains estimated and no VO/SFX/music/caption synchronization has passed.
- Contact sheets and 40-frame S02 samples at 4 fps were inspected for both full-film artifacts. This is **not** a full-speed 24-fps watch.

### Important new finding — fix benchmark parity
- Remotion `src/OpticsSpoon.tsx` only cross-fades from the bent spoon to a horizontal straight spoon using a 110-frame lift interpolation starting at global frame 192. It then holds. There is no distinct S02 inspect/turn, re-dip or lean/reaction sequence.
- Its `Diagram` renders the normal and both physical ray segments without causal staging; angle labels and the Snell formula share a broad opacity window.
- Motion Canvas `src/scenes/spoon.tsx` already authors anticipation, lift, +6° inspection, re-dip, lean and sequential S04 reveal.
- `tests/test_benchmark.py` has Motion Canvas checkpoint/S02 checks but no equivalent Remotion frame-parity coverage. Do **not** interpret the gap as a limit of the Remotion engine; its candidate source is less complete.

### Exact next task
1. Implement Remotion S02 as anticipation → lift → inspect/turn → re-dip → lean/reaction using deterministic global-frame calculations.
2. Stage S04 causally: interface → normal → incident ray → refracted ray → angle labels → Snell formula; preserve the dashed backward construction and apparent-point reveal for S05.
3. Add deterministic tests that assert the Remotion states/transitions at representative frame ranges and guard the shared shot contract.
4. Trigger candidate workflow and contract CI; compare the new outputs with retained #134 artifacts.
5. Then complete uninterrupted 24-fps review, native and mobile text review, approved Vietnamese narration/captions/audio QA, and repeated authoring/render-time measurements.

### Guardrails
- Keep Motion Canvas 3.17.2 as the provisional first 2D adapter, Manim as a specialist diagram adapter, and Remotion as the full-film baseline/reference pending fair parity and licensing review.
- Keep Film IR renderer-independent. Do not begin a broad M2 runtime implementation before M1 acceptance.
- Do not copy H2 assets/source from `Nolane-x/video` before provenance/license review.
- Preserve #134 artifacts; never overwrite a known-good output until the replacement passes.
- Distinguish code, tests, render, technical media QA, selected-frame review and creative/audio approval.

---

## Latest continuation snapshot — 2026-11-27 (candidate #134 verified)

This is the authoritative continuation point. It supersedes older candidate #133 and pre-shared-axis grip notes below.

### GitHub state

- Repository: `Nolane-x/Nolane-video` (NEE), not `Nolane-x/video`.
- Main remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- Active branch: `m1/optics-benchmark`; candidate/validator source HEAD: `0c0118b372b930fc5ad84ff9773918e148a13bbc`. The current documentation refresh is docs-only.
- Candidate [#134](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922641): Remotion, Motion Canvas and Manim all succeeded.
- Contract validator [#34](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922552): 25 tests passed, plus benchmark validation.

### Verified candidate outputs

- **Remotion:** H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. Artifact digest `eae41102226da187891482d0f67b2317635134f677e69f149b4d59ff3c1ed238`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
- **Motion Canvas:** H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, exactly 1,728 frames, zero browser errors. Artifact digest `a97cef0a398ec82d351bf4c9cd47d46525e934fea35b82d0ff318e83ec230e89`; MP4 SHA-256 `3906dc514affe8b91fe226e51a5c16b0a535869ddc5f3483359dab024b81ead4`.
- **Manim:** H.264, 1920×1080, nominal 24 fps, 279 frames, 11.624674 s. Artifact digest `296a568a8929ee2a60dd2e0bc7883ff5037f1145ae28f8cfef5a3291b0283140`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.

### Current grip geometry

- The spoon prop and grip share `SPOON_HANDLE_LOCAL_START` / `SPOON_HANDLE_LOCAL_END` from `rig-anchors.ts`; do not duplicate the shaft direction in any actor module.
- `grip-geometry.ts` derives a local shaft axis and perpendicular normal. It projects the palm grip anchor onto the physical shaft centreline and generates four cross-section finger paths at separated along-axis stations.
- Index, middle, ring and pinky each approach from one side, cross near the shaft centreline, then wrap to the other side. The thumb follows an opposing path, creating a clearer pinch.
- `nia-grip.tsx` renders outlined/fill paths for each finger and thumb, with named `rest` / `brace` poses. They remain children of the spoon prop transform.
- `scripts/test-grip-geometry.mjs` executes the actual TypeScript geometry, checks both poses, shaft-centreline crossing, finger station separation and opposing thumb direction. Candidate #134 runs this before build/render.
- Native frames at 9.5 s, 10.5 s and 11.5 s from candidate #134 were inspected. Four finger bands and opposing thumb are visible across the shaft through the selected lift/inspection/re-dip states. The design is still a stylized vector blockout, not anatomical anatomy.

### Current arm rig

The two-bone solver uses fixed 200 px / 615 px segment lengths and recalculates the elbow inside each tween callback. It rejects unreachable/invalid targets and is tested at canonical poses plus 101 intermediate samples for each S02 transition.

### Exact next work

1. Watch both complete candidate films continuously at 24 fps; log shot ID, frame range, severity, symptom and reproduction in `benchmarks/optics-spoon/reports/VISUAL-QA.md`.
2. Improve the hand beyond pill-like strokes: thumb base/opposition, visible knuckle/finger joints, palm compression, finger depth/occlusion, wrist roll and release.
3. Improve shoulder/torso counterbalance, weight transfer, elbow plane, gaze reaction and settle/follow-through.
4. Rework S04/S05 as a causal educational reveal with purposeful holds and motivated camera staging.
5. Check essential typography/safe areas at reduced/mobile size.
6. Keep audio incomplete until approved Vietnamese VO and SFX/music exist; then align captions to spoken timing and conduct perceptual audio QA.
7. Measure authoring/preview/render/revision loops on equivalent runners.
8. Finish H2 provenance/license review before reusing material from `Nolane-x/video`.
9. Only after M1 creative acceptance, begin a typed renderer-independent Film IR slice.

### Honest status

Candidate #134 proves the new handle-axis grip compiles, passes runtime geometry assertions and renders in the full film. **M1 remains open** for full-speed creative review, realistic anatomy/acting, diagram pacing, mobile typography, approved audio/captions and provenance/performance evidence. Keep runtime geometry, contract CI, technical render, selected-frame review and final creative approval as separate gates.

---

### Latest grip geometry

- The spoon prop and finger rig now share the same local-space shaft endpoints from `rig-anchors.ts`; do not hardcode the shaft direction separately in any hand module.
- `grip-geometry.ts` constructs a coordinate frame from the physical handle axis. The palm anchor is projected onto that axis; finger paths use along-axis offsets and a perpendicular normal.
- The index, middle, ring and pinky are four separate cross-section paths spaced by at least 14 px along the shaft. Each begins on one side, crosses near the handle centreline and exits on the opposite side.
- The thumb path crosses in the opposing direction. The endpoint circle is tied exactly to the last thumb-path point in both rest and brace poses.
- `nia-grip.tsx` renders outlined/fill paths for each finger and thumb, with `toPose("rest" | "brace")` interpolating them under the spoon parent transform.
- `scripts/test-grip-geometry.mjs` loads the TypeScript geometry with its shared anchor module, checks both named poses and rejects broken centreline crossing, overlapping finger stations or non-opposing thumb geometry.
- The prior hand render looked like a single cluster. Candidate #133 frames at 9.5 s, 10.5 s and 11.5 s now show four clearer finger bands across the handle with a thumb pad on the opposite side. This is still a stylized vector hand, not a realistic anatomical hand.

### Latest candidate outputs

- **Remotion:** H.264, 1920×1080, 24 fps, 72.000 s, 1,728 frames. Artifact digest `fd1f4d7e210956e86d3829d2c80aee3948b9eb86f9cd6cb95d179a1994ba23aa`; MP4 hash `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
- **Motion Canvas:** H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames, zero browser errors. Artifact digest `a6c481f21017504181ecd55e445764540a60d3c96bdbac762785c51ac7b04c1c`; MP4 SHA-256 `9cfb358469bbf0d84a2ee656e9f1163db72b1df32fb2efc6fefd727d8a511c87`.
- **Manim:** H.264, 1920×1080, nominal 24 fps, 279 frames, 11.624674 s. Artifact digest `0e2a721cf4624339391966080376c08e49f2904fabfe556e241ada3b0d66d236`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.

### Arm IK still in place

The two-bone solver uses fixed 200 px / 615 px segment lengths, validates reachability and solves the elbow at every Motion Canvas tween callback. It is independently tested at canonical poses and across 101 interpolation samples in each S02 transition.

### Exact next work

1. Watch both complete candidate films continuously at 24 fps and record shot/frame, severity, visual symptom and reproduction in `benchmarks/optics-spoon/reports/VISUAL-QA.md`.
2. Improve hand anatomy after that review: distinct thumb base/opposition, finger joints wrapping in depth, palm compression, wrist roll and believable release. The handle-axis cross-section is a clearer blockout, not final anatomy.
3. Improve shoulder/torso counterbalance, weight shift, head/gaze reaction and settle/follow-through.
4. Rework the S04/S05 diagram into a causal reveal with purposeful holds and motivated camera staging.
5. Test essential text and safe areas at reduced/mobile size.
6. Keep audio incomplete until approved Vietnamese VO and SFX/music exist; then align captions to speech timing and conduct perceptual audio QA.
7. Measure authoring/preview/render/revision loops on equivalent runners.
8. Finish H2 provenance/license review before reusing material from `Nolane-x/video`.
9. Only after M1 creative acceptance, begin a typed renderer-independent Film IR slice.

### Honest status

Candidate #133 demonstrates the new grip geometry compiles, passes runtime assertions and renders in the full film. **M1 remains open** for complete-motion creative review, realistic anatomy/acting, diagram pacing, mobile typography, approved audio/captions and provenance/performance evidence. Keep runtime geometry, contract CI, technical render, selected-frame review and final creative approval as separate gates.

---

## Latest continuation snapshot — 2026-11-27 (candidate #126 verified)

This is the authoritative continuation point. It supersedes older endpoint-only arm tween notes below.

### GitHub state

- Repository: `Nolane-x/Nolane-video` (NEE), not `Nolane-x/video`.
- Main remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- Active branch `m1/optics-benchmark`; code/test HEAD: `0a0191a59d5aed329d5d750410a12c93669fe45b`.
- Candidate [#126](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070151): Remotion, Motion Canvas and Manim all succeeded.
- Contract validator [#31](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070299): 24 tests passed and benchmark validation passed.

### Verified candidate outputs

- **Remotion:** H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. Artifact digest `82248b0b6958777431b609a629c62486d097f91cf793ab307498b855b06e338e`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
- **Motion Canvas:** H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, exactly 1,728 frames, zero browser errors. Artifact digest `af245b9267272fb4c58601f86db1c6c7e96585e983831a5c923a94a3da3e6109`; MP4 SHA-256 `a1ef3bb538f9e3f822206bfb04561f2cf85ae40748373afa744ad4a17f414862`.
- **Manim:** H.264, 1920×1080, nominal 24 fps, 279 frames, 11.624674 s. Artifact digest `d486c876a1423da6354c2c695d5f4a2b191b9bad12af474d055b7acbeee57b33`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.

### New two-bone IK implementation

- `src/actors/arm-ik.ts` exports a deterministic two-bone solver using the law of cosines. It validates finite points, positive segment lengths, signed bend direction and the reachable distance interval. It throws on unreachable targets rather than silently stretching.
- `src/actors/nia.tsx` defines upper-arm length **200 px** and forearm length **615 px**. Rest/lift/inspect poses keep the canonical shoulder and wrist targets; the elbow is derived by the solver.
- Crucially, `toArmPose()` now uses the Motion Canvas `tween` callback to solve and update the elbow for every animation frame. It does not tween between three precomputed elbow endpoints.
- The callback uses the same ease-in-out cubic timing as Motion Canvas property tweens, so the arm's wrist target tracks the spoon movement curve.
- `scripts/test-arm-ik.mjs` transpiles and executes the actual TypeScript math module. It tests the three canonical anchor poses, segment lengths, both bend branches, non-finite/zero-length/invalid-direction cases, outside-minimum and outside-maximum targets, plus 101 samples for each S02 transition (rest→lift, lift→inspect, inspect→rest).
- Candidate #126's Motion Canvas build, IK runtime test, 1,728-frame editor render and MP4 probe all passed.

### Selected-frame review

Native 1920×1080 frames at 8.8 s, 9.8 s, 10.8 s and 11.8 s from run #126 were opened. The elbow follows the grip target through the selected lift/turn/re-dip states, the forearm remains behind the prop-attached hand, and the spoon remains connected to the grip. These are selected stills, not a complete 24 fps watch. The hand and body remain stylized vector blockouts, so this is not anatomical or creative approval.

### Exact next work

1. Watch both complete 72-second candidates continuously at 24 fps; log shot ID, frame range, severity, symptom and reproduction in `benchmarks/optics-spoon/reports/VISUAL-QA.md`.
2. Improve hand form and physical contact: thumb opposition, finger wrap around the handle, palm compression, wrist roll and explicit release.
3. Improve the actor beyond an extended arm: shoulder motion, torso counterbalance, elbow plane, weight shift, head/gaze reaction and settle/follow-through.
4. Review S04/S05 as a causal educational reveal: interface → normal → incident ray → refracted ray → angles/law → dashed backward extension → apparent point; add motivated holds and camera staging.
5. Check essential typography and safe areas at reduced/mobile sizes.
6. Keep audio incomplete until approved Vietnamese VO and SFX/music exist; then align captions to spoken timing and conduct perceptual audio QA.
7. Measure repeated authoring/preview/render/revision loops on equivalent runners; do not rank from one-off durations.
8. Finish H2 provenance/license review before reusing material from `Nolane-x/video`.
9. Only after M1 creative acceptance, begin a typed renderer-independent Film IR slice. Motion Canvas is still an execution adapter, not the IR.

### Honest status

M1 technical renders are green, and Nia now has a four-finger prop grip plus per-frame two-bone arm IK. **M1 remains open** for full-speed creative review, production-level anatomy/acting, diagram pacing, mobile readability, approved audio/captions and provenance/performance evidence. Keep code pass, contract pass, runtime IK pass, render pass, selected-frame review and final creative approval as separate states.

---

## Latest continuation snapshot — 2026-11-27 (candidate #122 verified)

This is the authoritative continuation point. It supersedes older pre-four-finger and scene-owned arm-coordinate notes below.

### GitHub state

- Repository: `Nolane-x/Nolane-video` (NEE), not `Nolane-x/video`.
- Main remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- Active branch: `m1/optics-benchmark`; code/test head before this documentation refresh: `f4124f37505ede40db0fa8454390525ed08f23ea`.
- Candidate [#122](https://github.com/Nolane-x/Nolane-video/actions/runs/45997725029), source commit `d4793bfc154b9311718e530215a2552525e740f1`: Remotion, Motion Canvas and Manim all succeeded.
- Contract validator [#29](https://github.com/Nolane-x/Nolane-video/actions/runs/45997963537): 23 tests passed and benchmark validation passed.

### Verified render outputs

- **Remotion:** H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, 1,728 frames. Artifact digest `6738609fc2b7601daed9caf972c743cb789d4a1d08bed521c1101992e17a5cec`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
- **Motion Canvas:** H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 s, exactly 1,728 frames, zero browser errors. Artifact digest `a2dc668a3c14340ecb79e31ad12d9107c1d0cf90d330623dcf943cfd4f2bc2c8`; MP4 SHA-256 `c435cb1149b75f0bb8c4d88c2cde08cdaed3e351accb6040089df9634a86d069`.
- **Manim:** H.264, 1920×1080, nominal 24 fps, 279 frames, 11.624674 s. Artifact digest `ded403a68f387ec1de4198133a7a0847de7fb7535adc9a41fa21c1c0d1f68419`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.

### Latest reusable actor/prop slice

- `src/actors/nia-grip.tsx`: palm, thumb and four independently authored finger paths (index, middle, ring, pinky), in two named local-space poses: `rest` and `brace`. Call `grip.toPose(name, duration)`; do not reintroduce coordinate literals in scene code.
- `src/actors/nia.tsx`: owns `NIA_ARM_POSES` and the `toArmPose(name, duration)` API. Named poses: `rest`, `lift`, `inspect`. It interpolates shoulder-to-elbow and elbow-to-wrist paths plus elbow position.
- `src/actors/rig-anchors.ts`: source of canonical spoon origins and rotation-aware wrist targets. Current S02 uses rest 0°, lift −5° and inspect +6°.
- `src/props/spoon.tsx`: prop node owns spoon geometry and grip subtree, so fingers inherit prop motion.
- `src/scenes/spoon.tsx`: orchestrates semantic poses and beat timing; Nia is added before the spoon in draw order so the forearm remains behind the prop-attached hand.
- Tests protect four-finger pose coverage, prop parenting, canonical rest anchor, arm-pose ownership and scene layer order.

### Selected-frame review

Native 1920×1080 frames at 9.0 s, 10.5 s and 11.5 s from run #122 were inspected. The palm/finger cluster appears in front of the forearm and remains visually attached during selected lift/inspection/re-dip poses. This is not a full 24 fps watch or final anatomical approval. Current hand and actor remain stylized vector blockouts.

### Exact next work

1. Watch both entire full-film candidates continuously at 24 fps and log shot/frame, severity, visual symptom and reproduction in `benchmarks/optics-spoon/reports/VISUAL-QA.md`. Never substitute selected frames for continuous review.
2. Improve hand anatomy and convincing grip: thumb opposition, finger wrapping around the handle, palm shape/compression, wrist transition and release. The current four paths improve articulation, but are still stylized strokes, not production anatomy.
3. Improve shoulder/elbow/wrist mechanics with measured joint continuity and believable weight shift. Consider a reusable two-bone IK/contact constraint only after visual defects are recorded; preserve deterministic anchor tests.
4. Rework S04/S05 as a causal reveal: interface → normal → incident ray → refracted ray → measured angles/law → dashed backward extension → apparent point, with intentional holds and motivated framing.
5. Check type, labels and safe areas at reduced/mobile size.
6. Keep audio incomplete until approved Vietnamese VO and SFX/music exist; then align captions to spoken timing and conduct perceptual audio QA.
7. Measure authoring, preview, render and revision loops on equivalent runners; do not rank performance using one-off timings.
8. Finish H2 provenance/license review before reusing material from `Nolane-x/video`.
9. Only after M1 creative acceptance, start the first typed renderer-independent Film IR slice. Motion Canvas is the execution adapter, not the IR.

### Honest status

The technical render gates are green and the reusable Nia hand/arm pose slice is in place. **M1 remains open** for full-speed creative review, production-level acting/contact, diagram pacing, mobile readability, real audio/captions and provenance/performance evidence. Keep code pass, contract pass, render pass, selected-frame review and final creative approval as separate states.

---

## Latest continuation snapshot — 2026-11-27 07:12 UTC

This is the authoritative handoff for the next session. It supersedes older pre-grip, pre-kitchen and non-rotating wrist instructions below.

### GitHub state

- Repository: `Nolane-x/Nolane-video` (NEE); not the separate `Nolane-x/video` production workspace.
- Main remains `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- Active branch: `m1/optics-benchmark`; latest current branch/test HEAD: `1b433b8c9eae6767e6a2d425a93347ba5b5ace73`.
- Latest candidate run [#116](https://github.com/Nolane-x/Nolane-video/actions/runs/45956296455) rendered source commit `7daf94a6a0b06b86f2626bb448da6c8027d895b9`; all three engine jobs passed. Latest contract CI [#24](https://github.com/Nolane-x/Nolane-video/actions/runs/45956346788) passed 21 tests.

### Verified render outputs

- Remotion: H.264, 1920×1080, 24/1 fps, 72.000 s, 1,728 frames. Artifact digest `b03965a3367b7785e9b4b1d59cd530981304092af7c9c1ea5ad059893a8c07d6`; MP4 SHA-256 `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
- Motion Canvas: 1,728 export events, unique sequential PNGs, zero browser errors; H.264, 1920×1080, 24/1 fps, 72.000 s, 1,728 frames. Artifact digest `d67eb551a582cd52713f08ae9734d5461140dbac1334a8df11ca3ca012f7e5a9`; MP4 SHA-256 `4a12e4609d27e941202892b7ad10b6847f88ddfe878aac50e1119d6908b2fce3`.
- Manim: H.264, 1920×1080, nominal 24 fps, 279 frames, 11.624674 s. Average rate `857088/35711` is ~24.00067 and is accepted within <0.01 fps tolerance. Artifact digest `bf396a8825f5c3ccf21af854084e13bad32d24f2707725e175b60c92c275247f`; MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.

### Engine modules now extracted

- `src/actors/nia.tsx`: reusable Nia torso/neck/head/eyes/mouth/upper arm/forearm/elbow.
- `src/actors/nia-grip.tsx`: palm, thumb, outlined index and middle fingers; the grip is a child of the prop transform.
- `src/actors/rig-anchors.ts`: immutable canonical stage/local anchors plus a rotation-aware point transform.
- `src/props/spoon.tsx`: one prop owns top/bent-bottom/straight spoon geometry, bowl and grip.
- `src/sets/kitchen.tsx`: reusable kitchen wall/table/glass/water/waterline/caption.
- `src/diagrams/refraction.tsx`: reusable diagram using canonical `shared/diagram.json`; virtual backward construction uses a dashed stroke.
- `src/scenes/spoon.tsx`: scene timeline and performance orchestration; it calls the actor, prop, set and diagram modules instead of declaring all their geometry itself.

### Rotation-aware contact

`getSpoonGripStagePoint(spoonOrigin, rotationDegrees)` rotates the local grip anchor using the same 2D matrix as prop rotation. S02 uses rest, lift at −5° and inspection turn at +6°. The wrist/forearm endpoint is tweened to the matching shared stage point, then returns to rest before re-dip. The regression test computes expected rest/lift/turn contact from source constants and verifies scene/component wiring.

Run #116 selected native 1920×1080 frames at 9.8 s, 10.8 s and 11.8 s were opened. The hand remains at the spoon handle during the lifted pose, the +6° inspection turn and the re-dip. This confirms the selected poses only; a full 24 fps motion watch is still required.

### Exact next work

1. Watch the entire Remotion and Motion Canvas films at 24 fps. Record shot ID, frame/time range, severity, reproduction, visual impact and proposed repair in `benchmarks/optics-spoon/reports/VISUAL-QA.md`. Do not use contact sheets or isolated frames as a substitute for continuous review.
2. Upgrade Nia from stylized blockout toward production performance: articulated thumb/index/middle/ring/pinky, wrist transition, palm compression, grip/release, elbow/shoulder continuity, weight shift, gaze, anticipation, follow-through and secondary motion.
3. Review S02 at full speed. Confirm grip stability on every frame of the lift, turn and re-dip; inspect for interpenetration, floating or clipping.
4. Re-choreograph the educational diagram as a causal reveal: water/air interface → normal → incident ray → refracted ray → angle labels/law → dashed backward extension → apparent point. Use purposeful holds and motivated camera moves only.
5. Review type/labels at reduced/mobile size and safe areas.
6. Keep audio marked incomplete until approved Vietnamese VO and SFX/music are supplied. Then align captions to actual spoken timing and conduct perceptual audio QA.
7. Measure authoring, preview, render and revision iteration on equivalent runners; do not rank performance from single runs.
8. Complete H2 provenance/license review before copying any external code.
9. Only after M1 creative acceptance, begin a typed renderer-independent Film IR slice. Motion Canvas is an execution adapter, not the Film IR.

### Honest status

M1 technical export is green for Remotion and Motion Canvas full films and the Manim scientific segment. Reusable scene components and a rotation-aware prop/hand contact slice now exist. **M1 is not complete**: full-speed review, production-quality acting/contact, diagram pacing, mobile readability and real audio/creative approval remain open. Keep authored source, tests, render, technical validation, selected-frame review and final creative approval as separate states.



---

## Latest continuation snapshot — 2026-11-27 06:38 UTC

This snapshot supersedes the older S04-timing failure and pre-refactor diagram handoff above.

### Current GitHub state

- Repository: `Nolane-x/Nolane-video` (NEE), not the separate `Nolane-x/video` production workspace.
- Main remains at `19b53bd0bf785a8d58a91031678be717a8ae11d4`; no merge to main.
- Active branch `m1/optics-benchmark`; latest docs HEAD `962e0fd2898e0958f38ff8e6cf8218b7ae90b464`; diagram component source commit `560303cb3738d150cbfb779844bfbc5768805893`; latest diagram tests commit `75b28da9463e5b9894a9a21a5b3a282fa8c78b72`.

### Latest CI evidence

- Candidate workflow [#94](https://github.com/Nolane-x/Nolane-video/actions/runs/45952654166), source head `29b33b50fee8d616bcfcb29ece939fb0a5430b96): all Remotion, Motion Canvas and Manim jobs passed.
  - Remotion: H.264 1920×1080, 24 fps, 72 s, 1,728 frames; artifact digest `1074b604e55f79fa95a553e732beb2cca40f696d59b5d26f44577439f031a510`; MP4 hash `27814a96eddfc8e53ba9b022efaf84a1f7d7365b70b962a063a104e4cdf786a2`.
  - Motion Canvas: exactly 1,728 unique sequential PNGs/events, zero browser errors; H.264 1920×1080, 24 fps, 72.000 s, 1,728 frames; artifact digest `92c3b5d3451520a6e7b7fc8bd6db0f7c51c772335b9692c4cadf24724693cbc8`; MP4 hash `4a12e4609d27e941202892b7ad10b6847f88ddfe878aac50e1119d6908b2fce3`.
  - Manim specialist segment: H.264 1920×1080, nominal 24 fps, 279 frames, 11.624674 s; artifact digest `faac7840db9a81a8827d9ff255698a89234239f0b55bcf2d607b25c2f132e245`; MP4 hash `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`.
- Contract validator [#13](https://github.com/Nolane-x/Nolane-video/actions/runs/45952657476) passed 17 tests, including the refraction module and dashed ray guard.

### New diagram architecture

- New file: `benchmarks/optics-spoon/motion-canvas/src/diagrams/refraction.tsx`.
- API: `createRefractionDiagram(palette)` returns `view` plus refs for diagram water, interface, normal, incident/refracted/backward rays, true/apparent/eye points, labels, angles, formula and caption.
- It consumes `shared/diagram.json` directly and owns its top-left pixel to centered Motion Canvas coordinate conversion (+Y down). The scene imports the component and only choreographs returned refs; duplicated diagram JSX and the local geometry helper were removed.
- The virtual/backward construction is rendered with `lineDash={[18, 14]}`; the real incident and refracted rays remain solid yellow.
- Inspected native frame at 51 s from run #94 confirms: water below interface, air above; white dashed extension goes backward from the interface along the outgoing ray to the mint apparent point; true point remains coral.

### Existing actor slice

Nia's reusable rig is still at `src/actors/nia.tsx`, with torso/neck/head/eyes/mouth/upper arm/forearm/elbow. S02 sequences anticipation, lift, inspection/turn, re-dip and lean. The spoon hand is still a geometric piece parented to the prop node; build articulated fingers, explicit grip/contact constraints, wrist/elbow continuity, weight transfer and follow-through next.

### Exact next work

1. Do a full 24 fps watch of the complete Remotion and Motion Canvas films. Record shot/frame IDs, severity, reproduction note and repair in `benchmarks/optics-spoon/reports/VISUAL-QA.md`; contact sheets and selected frames are not full motion approval.
2. Improve the Nia hand/prop system: articulated palm/fingers, grip target on spoon handle, constraint/coupling while lifting and dipping, visible contact/release, wrist/elbow continuity and secondary motion.
3. Use the new refraction diagram module as the reusable primitive for a causal teaching sequence: interface → normal → incident ray → refracted ray → angle labels/law → dashed backward extension → apparent point. Add purposeful holds and only motivated camera moves.
4. Review all essential typography at reduced/mobile sizes and maintain safe areas.
5. Keep audio incomplete until approved Vietnamese VO and SFX/music are supplied; then align captions to actual speech/sample time and conduct perceptual audio QA.
6. Measure repeated render and edit/preview iteration on equivalent runners. Do not rank by one run.
7. Finish provenance/license review before reusing H2 from `Nolane-x/video`.
8. After M1 creative acceptance, begin the first typed, renderer-independent Film IR slice. Motion Canvas is an execution adapter, not the Film IR.

### Honest status

The first reusable actor slice and reusable scientific diagram component exist. The exact 72-second technical render is green for Remotion and Motion Canvas, and the Manim scientific segment is green. The virtual-ray construction is now correctly dashed. **M1 remains open** because full-speed creative review, production-level acting/contact, mobile typography and real audio/creative approval remain incomplete. Keep source authored, test pass, render, technical QA, selected-frame review and final creative approval as distinct states.
# AI Session Handoff

**Updated:** 2026-11-27 06:29 UTC (live snapshot)  
**Repository:** https://github.com/Nolane-x/Nolane-video  
**Default branch:** `main`  
**Working branch:** `m1/optics-benchmark`  
**Verified code/test branch HEAD before documentation refresh:** `304db032c2ba4cefa269e795e2cbda7e06ac8d03`  
**Current milestone:** M1 — comparable benchmark and architecture decision, still in progress.  
**Architecture:** Motion Canvas is provisionally selected as the first 2D scene adapter by ADR-0001; Film IR remains renderer-independent. Do not treat this as creative approval or a final single-renderer decision.

## Read first

Read in this order:
1. `README.md`
2. `AGENTS.md`
3. `docs/PRODUCT_NORTH_STAR.md`
4. `docs/ENGINE_ARCHITECTURE.md`
5. `docs/REFERENCE_ENGINE_STUDY.md`
6. `docs/ANIMATION_CRAFT_STANDARDS.md`
7. `docs/ROADMAP.md`
8. `docs/STATE.md`
9. `docs/AI_HANDOFF.md`
10. `docs/M1_BENCHMARK_SPEC.md`
11. `docs/M1_BENCHMARK_PLAN.md`
12. `benchmarks/optics-spoon/reports/ENGINE-CANDIDATE-STATUS.md`
13. `benchmarks/optics-spoon/reports/VISUAL-QA.md`
14. `docs/M1_SCORECARD.md`

Then fetch the live `m1/optics-benchmark` HEAD and inspect the latest Actions runs. The handoff is a snapshot, not a substitute for live verification.

## Product identity — do not change

NEE is a specialist code-first system for story-driven, narration-led 2D/2.5D educational explainer films. Target domains are mathematics, physics, chemistry, engineering and technology. Long-form target is roughly 8–20 minutes, primarily 16:9.

This is not a universal video generator or general editor. Do not broaden into vlogs, podcasts, ads, UGC, music videos, gaming, sports or arbitrary live-action workflows.

## Architecture principles

- Build a specialist film compiler, not a prompt wrapper.
- A typed, versioned, renderer-independent Film IR is the proposed source of truth.
- AI agents may author research, story, script, style bible, storyboard, acting cues and QA records; deterministic runtime validates and executes them.
- Renderers are replaceable adapters. Avoid multiple competing master timelines.
- Native semantic educational objects and readable acting are required: poses, gesture, gaze, anticipation, contact, follow-through and recovery.
- Use integer frames and rational FPS. Align real audio using sample-aware timing.
- A successful render does not equal artistic approval; inspect moving scenes and audio.
- Do not adopt a framework just because it is familiar or has many features.

## Current branch contents

Shared benchmark:
- `benchmarks/optics-spoon/shared/script.vi.md`
- `benchmarks/optics-spoon/shared/storyboard.json`
- `benchmarks/optics-spoon/shared/ART-DIRECTION.md`
- `benchmarks/optics-spoon/shared/RESEARCH.md`
- `benchmarks/optics-spoon/shared/diagram.json`

Validation:
- `tools/validate_benchmark.py`
- `tests/test_benchmark.py`
- `.github/workflows/validate-m1-benchmark.yml`

Candidates:
- `benchmarks/optics-spoon/remotion/` — full film.
- `benchmarks/optics-spoon/motion-canvas/` — full-film editor/image-sequence candidate.
- `benchmarks/optics-spoon/manim/` — S04–S05 scientific segment.
- `.github/workflows/m1-benchmark-candidates.yml` — separate jobs for each candidate.

## Evidence already verified

### Remotion 4.0.547

Successful full-film run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169):
- H.264;
- 1920×1080;
- 24 fps;
- 72.000 seconds;
- exactly 1,728 frames.

Artifact digest: `sha256:f829285a43711aed3a869bae9d93ede74d37c9561125a510ad2101e673d20b14`.

The contact sheet and 1080p frames 1056/1248 were reviewed. The “NƯỚC” label is now outside the caption safe area. A further temporal scan sampled the opening at 4 fps and diagram section at 2 fps: Nia has little pose/gesture variation and the diagram has long holds on near-static ray layouts while labels change. This is a sampled-frame finding, not full-speed playback approval. Remaining limitation: the character and props are vector blockouts; no real Vietnamese VO, synchronized transcript captions, SFX or music is present. Full findings are in `benchmarks/optics-spoon/reports/VISUAL-QA.md` and `docs/M1_SCORECARD.md`.

### Manim CE fork

Successful scientific-segment run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169):
- fork `Nolane-x/manim` pinned at `18320e2f0feaf142b2c3a377068ddb44c82fb2a1`;
- S04–S05 only;
- 1920×1080, 24 fps, 11.625 seconds;
- ffprobe passed.

Artifact digest: `sha256:a2fcf0ddda1cb40eb27bfd877b93be0c2d725d2162fd08926e1765cd416c77e4`.

The diagram geometry passed review, but the original style had a black background, serif text and empty-looking opening. Source commit `0a09f2ef4925dcd55734d38a8f455c1a54c0a6b5` changes it to the shared palette, DejaVu Sans and a persistent water region. The rerender is in latest pending candidate run [45853726714](https://github.com/Nolane-x/Nolane-video/actions/runs/45853726714). Earlier pending runs 45850249595, 45851338555, 45853159646 and 45853225131 were superseded before starting. Manim remains a specialist scientific-visualization adapter, not a full-film candidate.

### Motion Canvas 3.17.2

Run [45840319216](https://github.com/Nolane-x/Nolane-video/actions/runs/45840319216) proves the renderer can complete with `RendererResult.Success`, `lastFrame: 1728`; the exporter emitted 1,729 frames (0–1,728) because the time endpoint is inclusive. Earlier short renders were caused by Playwright inferring completion from the UI's `data-rendering` attribute. The script now waits for the actual engine `renderer.onFinished` event. Its new export loop reads the Vite audit endpoint once per second instead of recursively rescanning the PNG directory, then performs one final file-tree check. Render timeout is 35 minutes within a 45-minute job, leaving time for encoding, ffprobe and artifact upload.

Commit `31fd2997dce941be05b089e8066928eebc0f7dd3` sets `project.meta` range end to `71.95833333333333` seconds, the final included timestamp for frame 1,727 at 24 fps. The 72-second output still requires exactly 1,728 samples (000000–001727).

Run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148) was cancelled before its Motion Canvas render completed. Current run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169) has Remotion and Manim jobs successful; Motion Canvas setup/build passed but its render step is still running. No MP4/ffprobe has been accepted yet.

The shared validator now checks Motion Canvas's `ceil(seconds × fps)` inclusive-end conversion. Validator run [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249) and regression-test run [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293) both passed. A new candidate rerun [45853726714](https://github.com/Nolane-x/Nolane-video/actions/runs/45853726714) is pending with the Manim palette/font update and Motion Canvas export-audit polling.

## Scorecard status

`docs/M1_SCORECARD.md` is an evidence ledger, not a ranking. It records the Remotion and Manim outputs, the current Motion Canvas blocker, observed one-run CI render-step durations, role differences and open quality gates. Do not assign a numeric score or choose a master runtime until Motion Canvas's exact output and comparable visual/audio evidence are available.

## Important implementation findings

- Motion Canvas 3.17.2 public packages are MIT-licensed.
- Its core image-sequence exporter is the intended exporter for this benchmark.
- Do not add Motion Canvas's optional FFmpeg exporter; its package declares GPLv3. Use independent FFmpeg after PNG sequence creation.
- Motion Canvas editor UI stores expandable state by project name. The Vite entry is `src/project.ts`, so storage namespace is `project-*`.
- Headless UI uses `prefers-reduced-motion: reduce` to choose its immediate `ReducedCollapse`. This changes editor UI mounting only, not authored scene motion.
- Project meta pins 1920×1080, 24 fps, sRGB and the core image-sequence exporter. Its `range` end is the final included frame timestamp `71.95833333333333` s so the render interval contains exactly 1,728 samples.
- Remotion's two-tier license needs a separate product-adoption review before redistribution/commercial embedding.
- H2 in `Nolane-x/video` has not been copied. Audit provenance/license before reuse.

## Exact workflows / commands

Remotion job:
- Node 22.
- `npm install --no-audit --no-fund`
- `npm run typecheck`
- `npm run render`
- ffprobe checks width, height, 24 fps and 72-second duration.

Motion Canvas job:
- Ubuntu 24.04, Node 22, FFmpeg and Playwright Chromium.
- `npm install --no-audit --no-fund`
- `npx playwright install --with-deps chromium`
- `npm run build`
- `npm run render` — launches Vite/editor, uses the official editor's Render button, waits for `renderer.onFinished` (not a UI data attribute), checks the sequential six-digit PNGs, then FFmpeg encodes MP4/contact sheet.
- Required acceptance is exactly 1,728 frames (000000–001727); do not lower the threshold.

Manim job:
- Python 3.12, ffmpeg, Cairo/Pango.
- `pip install -r requirements.txt`
- `manim -qh -r 1920,1080 --fps 24 --media_dir out refraction_segment.py RefractionSegment`
- ffprobe and contact-sheet validation.

Validator:
- `python -m unittest discover -s tests -v`
- `python tools/validate_benchmark.py`
- Latest successful validator: [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249), commit `d15705bdec39cc48cd7a802378adf8eb3fdcb6c3`.
- Latest successful unit/regression tests: [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293), commit `aba51bb249528a03448196326c255fcec334d797`. Regression coverage proves that a 72.0-second inclusive endpoint would add frame 1,728.

## Still incomplete

- Motion Canvas exact 1,728-frame render, MP4/ffprobe, contact sheet and continuous-motion review.
- Manim palette/font rerender and visual approval in run `45853726714`.
- Full-speed 24 fps movement/action/contact review across the complete film. Sampled 4 fps/2 fps scans already flag Nia's limited acting and long static diagram holds.
- Audio: no real Vietnamese voice, synchronized transcript captions, SFX or music.
- H2 provenance/license audit.
- Metric-backed candidate scorecard and formal architecture decision.
- No broad Film IR/runtime build before M1 acceptance.

## Immediate next actions

1. Inspect [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169). Require exactly 1,728 PNGs numbered 000000–001727; then verify H.264, 1920×1080, 24 fps, 72.000 seconds and artifact upload. On failure, retrieve `m1-motion-canvas-diagnostics` and inspect `short-render-debug.json`, `exportAudit`, browser console and Vite output.
2. Inspect latest pending candidate run [45853726714](https://github.com/Nolane-x/Nolane-video/actions/runs/45853726714); use `[M1 CI progress]`, `[NEE export audit]` and PNG file counts to measure Motion Canvas throughput, confirm Manim palette/font render and review its contact sheet.
3. Update `VISUAL-QA.md`, `ENGINE-CANDIDATE-STATUS.md`, `STATE.md` and this handoff with fresh results. Then perform full-speed playback review, improve Nia's acting and diagram choreography, and only after comparable evidence complete the scorecard/architecture decision.

Keep audio incomplete until a real approved VO/SFX/music source is provided and synchronized. Do not choose a master runtime from incomplete evidence.

## End-of-session rule

Before ending a session, update both `docs/STATE.md` and `docs/AI_HANDOFF.md` with the live branch/commit, exact evidence, unverified items, blocker and one next task. Never mark a build, render, test or review as passed without fresh logs/artifacts.


---

## Live continuation override — 2026-11-27 05:34 UTC

This section supersedes the older **Still incomplete** and **Immediate next actions** lists above. Always recheck live HEAD and Actions before acting.

### Exact repository identity and branch state

- Work only in `Nolane-x/Nolane-video`; do not confuse it with the separate prior production repository `Nolane-x/video`.
- Default branch: `main`, HEAD `19b53bd0bf785a8d58a91031678be717a8ae11d4`.
- Working branch: `m1/optics-benchmark`, HEAD `bdb7fe239530af0624769f4167187f550bcc47c4`.
- Current tree has the shared 72-second optics benchmark, Remotion full-film candidate, Motion Canvas full-film candidate, Manim S04–S05 candidate, validator/tests, CI and evidence documentation.
- Provisional adapter decision is in `docs/adr/ADR-0001-motion-canvas-first-2d-runtime.md`: Motion Canvas 3.17.2 is the first 2D scene-execution adapter; Film IR remains renderer-independent; Manim remains specialist; Remotion remains benchmark/reference pending license/distribution review.

### Latest CI truth

Latest candidate workflow is [45946419330 / run #80](https://github.com/Nolane-x/Nolane-video/actions/runs/45946419330), on HEAD `bdb7fe2`:
- Remotion full-film: **PASS**.
- Manim scientific segment: **PASS**.
- Motion Canvas full-film: **FAIL**.
- Overall workflow: **FAIL**.

Motion Canvas failed at the `S04-complete` checkpoint:
`Shot timing drift at S04-complete: expected last included frame 1055, got 1056.`
The diagnostics artifact is [m1-motion-canvas-diagnostics, artifact 15175275163](https://github.com/Nolane-x/Nolane-video/actions/runs/45946419330/artifacts/15175275163). The log shows `rendererFinished: true`, finish result `Error`, `lastFrame: 0`, zero exported image files, and no page errors. Setup, package install, Chromium, Vite/editor build and TypeScript checks passed before the timeline failure.

The immediately preceding all-green candidate run was [45945392423 / run #70](https://github.com/Nolane-x/Nolane-video/actions/runs/45945392423) on commit `204659c2853230c6245abc9337064df9713e8984`. Thirteen commits separate that baseline from current HEAD. Recent changes include a more causal, staged S04 reveal and shot-duration/checkpoint fixes; the current error is a one-frame Motion Canvas scene-timeline mismatch. Do not change the storyboard frame ranges or relax the checkpoint/1,728-frame requirement to hide it.

### Next task — fix the actual S04 timing drift

1. Inspect `benchmarks/optics-spoon/motion-canvas/src/scenes/spoon.tsx` around S04. Its sequential sub-actions total a nominal 16 seconds, but Motion Canvas reaches the checkpoint one frame late. Compare with S01–S03, where the final wait has explicit one-frame alignment compensation.
2. Make the smallest evidence-led timing correction while retaining the shared storyboard's exact half-open ranges. A one-frame compensation to the final S04 hold is a candidate, not a proven fix until CI confirms it.
3. Push to `m1/optics-benchmark` and inspect the new Motion Canvas diagnostics. Confirm S04, S05 and S06 checkpoints all match the storyboard, not just the first failing checkpoint.
4. Require Motion Canvas to export exactly 1,728 sequential PNGs (000000–001727), then H.264 1920×1080 / 24 fps / 72.000 s, successful ffprobe and artifact upload. Keep Remotion/Manim outcomes recorded separately.
5. Run `python -m unittest discover -s tests -v` and `python tools/validate_benchmark.py` where the environment permits. The existing validator workflow is path-filtered to shared benchmark data, validator, tests and its own workflow; scene changes do not automatically prove those tests ran.
6. Update `docs/STATE.md`, this file, `benchmarks/optics-spoon/reports/ENGINE-CANDIDATE-STATUS.md`, and the scorecard only from fresh run data.

### Product/creative constraints that remain unchanged

This repo is a specialist code-first pipeline for story-driven, narration-led 2D/2.5D educational films (math, physics, chemistry, engineering and technology), not a universal editor or prompt-to-video wrapper. The current benchmark is a silent technical prototype. Nia's acting, hand/grip and spoon contact, causal diagram pacing, motivated camera moves, mobile typography, approved Vietnamese narration, transcript-aligned captions, SFX/music and perceptual audio review remain open. H2 source/license provenance must be audited before reuse. Do not begin broad Film IR/runtime implementation until M1 evidence and creative acceptance are ready.



---

## Latest continuation snapshot — 2026-11-27 06:29 UTC

This is the authoritative continuation note for the latest session. It supersedes the older timing-failure and “no actor rig” next-task directions above.

### Repository and branch

- Work only in `Nolane-x/Nolane-video`; this is not `Nolane-x/video`.
- Default branch `main` remains at `19b53bd0bf785a8d58a91031678be717a8ae11d4`. No merge to main was made.
- Active branch: `m1/optics-benchmark`. Current code/test commits include `776d219fa02bd5392b7ade94ad348fbe3d74a7dd` (actor/scene polish) and `304db032c2ba4cefa269e795e2cbda7e06ac8d03` (16-test regression guard). State was then refreshed at `ac3f21acae0919c72854f314767fde7013461dfd`.

### Verified CI and media

- [Candidate run #89](https://github.com/Nolane-x/Nolane-video/actions/runs/45951640411): all three jobs passed.
  - Remotion full film: H.264, 1920×1080, 24 fps, 72.000 s, 1,728 frames. MP4 SHA-256 `1970da35a380c0fd08a8a04e74bc03d050d21bb389ecb0bdd483ab49f232bbda`.
  - Motion Canvas full film: 1,728 sequential PNGs (000000–001727), 1,728 export events, 1,728 unique frames, zero browser errors; H.264, 1920×1080, 24 fps, 72.000 s, 1,728 frames. MP4 SHA-256 `0016d083c11a3dc1615c8ae9e8dbc4a58af5a02bbcb5354e66f2b80583965616`.
  - Manim specialist segment: H.264, 1920×1080, 24 fps nominal, 279 frames, 11.624674 s. Average fps is `857088/35711` (~24.00067); CI accepts <0.01 fps mean-rate deviation while requiring `r_frame_rate=24/1` and exactly 279 frames.
- [Contract workflow #12](https://github.com/Nolane-x/Nolane-video/actions/runs/45951654984): all 16 tests and benchmark validator passed.
- [Run #87](https://github.com/Nolane-x/Nolane-video/actions/runs/45951356993) also passed all three candidates after exact frame-count gates were added.
- The stricter Remotion/Motion Canvas gates require codec H.264, 1920×1080, 24/1 average and nominal rate, exactly 1,728 frames and 72.000 s. Manim requires H.264, 1920×1080, 24/1 nominal rate, 279 frames, and <0.01 fps average deviation.

### Changes now in the repository

- Fixed Motion Canvas S04's one-frame drift by retaining the exact half-open storyboard and compensating one sample in the final hold. All six scene checkpoints are exercised by tests.
- Corrected the top-left-pixel to centered-stage mapping so water sits below the interface and air above it. The interface line uses the same mapping as rays/points.
- Added reusable actor module `benchmarks/optics-spoon/motion-canvas/src/actors/nia.tsx`. It exposes torso, neck, head rig, eyes, mouth, upper arm, forearm and elbow.
- S02 now sequences anticipation, lift, inspect/turn, re-dip and lean. The hand remains attached to the spoon node, preserving basic grip coupling. The apparent lower spoon segment now has a 14 px offset under a 22 px stroke so it remains visually connected.
- Tests additionally guard all six runtime checkpoints, coordinate orientation, interface alignment, Nia rig structure, S02 action beats and the continuous apparent-spoon kink.
- Run #89 selected 1080p frames at 9.7, 11.8, 12.2 and 63.0 seconds were inspected. They show a straight lifted spoon, continuous apparent kink on re-dip, Nia's neck/mouth and final straight-spoon resolution. Run #83 frames verified diagram geometry orientation.

### Exact next work

1. Watch the full Remotion and Motion Canvas films at 24 fps. Record shot ID, frame range, issue severity, reproduction notes and proposed correction in `benchmarks/optics-spoon/reports/VISUAL-QA.md`. Do not infer motion quality from contact sheets alone.
2. Improve Nia beyond the first rig blockout: articulated fingers, believable grip/hand-to-spoon contact, shoulder/elbow/wrist continuity, weight transfer, reaction, follow-through and pose holds. Preserve deterministic timing and six shot checkpoints.
3. Re-choreograph S03–S05 causally: interface → normal → incident ray → refracted ray → angle labels/law → backward extension → apparent point. Reduce static diagram holds; use motivated camera changes only when they aid comprehension.
4. Review captions/labels at reduced mobile size and maintain safe areas.
5. Keep audio marked incomplete until the user supplies or approves real Vietnamese narration and SFX/music. Then align captions to actual speech/sample timing and perform perceptual audio QA.
6. Measure repeated render and edit/preview iteration on equivalent runners. Do not rank performance from one run or compare unlike segments.
7. Complete H2 source provenance and license review before copying any code from `Nolane-x/video`.
8. Only after M1 creative and acceptance gates are complete, start the first typed, renderer-independent Film IR vertical slice. Motion Canvas is the provisional execution adapter, not the IR or product model.

### Current honest status

M1 technical export is now green for all three candidates and the first reusable Nia actor slice is implemented. M1 is **not complete**: full-speed review, production-quality acting/contact, final diagram pacing, mobile typography and audio/creative approval remain open. Outputs are silent prototypes. Keep these states separate: authored source, tests, export, technical validation, selected-frame review and final creative approval.
