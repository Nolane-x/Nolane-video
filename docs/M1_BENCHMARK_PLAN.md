# M1 Benchmark Implementation Plan

> **For agentic workers:** use this plan task-by-task. Keep tasks independently testable and update the state/handoff at the end of every session.

**Goal:** produce comparable, evidence-backed implementations of one 72-second educational film so NEE can choose its first 2D runtime based on actual clarity, animation craft, correctness, reproducibility and integration effort.

**Architecture:** one shared script, frame-accurate storyboard, art bible and claim ledger are the canonical creative brief. Remotion and Motion Canvas receive equivalent full-film implementations; Manim receives the scientific ray-diagram segment. The output/reporting layer records each candidate independently. ADR-0001 provisionally selects Motion Canvas as the first 2D scene adapter; Film IR remains renderer-independent and no universal/master render dependency is implied.

**Tech stack:** TypeScript/React and Remotion 4.0.547; TypeScript and Motion Canvas 3.17.2; Python and the user's Manim CE fork pinned by commit; FFmpeg/ffprobe for media assembly and checks.

**Spec:** docs/M1_BENCHMARK_SPEC.md

## Global constraints

- Preserve the NEE product boundary: story-driven educational explainer animation only.
- Use the same 1,728-frame, 24 fps, 1920×1080 storyboard and shared artistic/scientific brief.
- Keep all frame ranges half-open and integer based.
- Do not use Motion Canvas FFmpeg exporter as a dependency until its GPLv3 obligations are assessed; prefer its native image sequence plus independent FFmpeg if practical.
- Do not copy H2 code into NEE without an explicit source/reuse-rights decision.
- Do not generate or assume a synthetic voice; mark audio-incomplete previews honestly.
- Keep all source, versions, commands, checksums and QA evidence.
- Every production behavior needs an automated test or a documented, reproducible render proof.
- Update docs/STATE.md and docs/AI_HANDOFF.md before ending this session.

## Target file map

- docs/M1_BENCHMARK_SPEC.md — benchmark requirements and acceptance.
- docs/M1_BENCHMARK_PLAN.md — this task plan.
- docs/ANIMATION_CRAFT_STANDARDS.md — animation craft and visual QA requirements.
- docs/M1_SCORECARD.md — evidence-backed cross-candidate comparison.
- docs/adr/ADR-0001-motion-canvas-first-2d-runtime.md — provisional first 2D scene adapter decision.
- benchmarks/optics-spoon/shared/script.vi.md — narration.
- benchmarks/optics-spoon/shared/storyboard.json — canonical timing and shot IDs.
- benchmarks/optics-spoon/shared/ART-DIRECTION.md — visual system.
- benchmarks/optics-spoon/shared/RESEARCH.md — claim/source ledger.
- benchmarks/optics-spoon/remotion/ — full-film Remotion candidate.
- benchmarks/optics-spoon/motion-canvas/ — full-film Motion Canvas candidate.
- benchmarks/optics-spoon/manim/ — scientific visualization segment.
- benchmarks/optics-spoon/reports/ — technical, visual and comparative evidence.
- .github/workflows/m1-benchmark.yml — reproducible build/render checks, only after local structure is verified.

## Tasks

### Task 1 — Freeze the shared creative contract
- [x] Validate storyboard JSON syntax and exact frame totals.
- [x] Check narration spans and shot frame ranges cover the intended 72 seconds without gaps or overlaps.
- [x] Independently verify the Snell calculation and angle convention.
- [x] Create a machine-readable test for storyboard totals and claim IDs.

### Task 2 — Motion Canvas full-film candidate
- [x] Pin compatible Motion Canvas packages to 3.17.2 and a compatible Vite version.
- [x] Create an original character/prop/stage scene using generator choreography and signals.
- [x] Implement S01–S06 using the shared frame schedule.
- [x] Build the project with type checking.
- [x] Prove preview and determine a reproducible render/export route through the official editor and core image-sequence exporter.
- [x] Record the GPLv3 status of the optional FFmpeg exporter; do not add it without approval.
- [x] Verify exactly 1,728 sequential frames and a 72.000-second MP4 in run [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231); ffprobe passed.
- [x] Review the contact sheet and native 1080p diagram frame; reposition 40°/58.9° labels away from ray lines and re-render in the same passing run.

### Task 3 — Remotion full-film candidate
- [x] Pin Remotion packages to 4.0.547 and compatible React packages.
- [ ] Refactor each shot into independently reusable scene components. The current benchmark composition is a single deterministic implementation; this modularity step is deferred until after M1 backend selection.
- [x] Use `useCurrentFrame` and frame-based transitions; no wall-clock animation.
- [x] Implement the six story beats, the straight-spoon action and shared Snell/ray geometry.
- [x] Render the full 1080p candidate through CLI and pass ffprobe: 1920×1080, 24 fps, 72.000 s, 1,728 frames.
- [x] Record artifact digest, metadata and visual review in `reports/VISUAL-QA.md`.
- [ ] Run a separate low-resolution iteration preview and measure edit/render iteration time; record measured authoring/revision effort before any performance ranking.

### Task 4 — Manim scientific-segment candidate
- [x] Pin the Manim Community Edition fork by exact commit and isolated Python requirements.
- [x] Implement S04–S05 with shared ray geometry, normal, refracted ray, angles, Snell law and apparent image.
- [x] Use the Manim text/vector fallback rather than requiring LaTeX.
- [x] Render a 1920×1080, 24 fps specialist segment and inspect the scientific geometry/contact sheet.
- [x] Re-render and visually approve the shared palette/font correction in run [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231); verify native-resolution Vietnamese labels, formula and ray construction.

### Task 5 — Quality and comparison
- [x] Validate the Snell example, shared ray geometry and storyboard frame schedule in code.
- [x] Make and review contact sheets for Remotion, Motion Canvas and the Manim specialist segment; selected native 1080p frames were also reviewed.
- [ ] Inspect continuous motion and action/contact states across the complete 72-second film.
- [x] Check Vietnamese diacritics, Remotion caption safe area, Motion Canvas angle-label spacing and Manim font/palette at selected native 1080p frames.
- [ ] Check all essential labels at reduced/mobile size across every shot.
- [x] Record candidate output metadata, codecs, frame counts, durations, artifact digests, MP4 SHA-256 values and CI references in `ENGINE-CANDIDATE-STATUS.md` / `M1_SCORECARD.md`.
- [ ] Measure repeated render times on equivalent runners and authoring/revision effort; current one-off jobs are not a fair performance ranking.
- [x] Create an evidence-backed scorecard. Numeric ranking is intentionally withheld because acting, full-speed review, audio and authoring-cost evidence are incomplete.
- [x] Write provisional [ADR-0001](adr/ADR-0001-motion-canvas-first-2d-runtime.md) selecting Motion Canvas as the first 2D scene adapter; update the roadmap while keeping creative/audio acceptance open.

### Task 6 — Renderer time/range regression guard
- [x] Validate Motion Canvas's inclusive `ceil(seconds × fps)` endpoint mapping against the 1,728-frame half-open storyboard.
- [x] Add a regression test proving that an endpoint of exactly 72.0 s would incorrectly map to frame 1,728.
- [x] Pass validator CI [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249) and unit-test CI [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293).

### Task 7 — Creative acceptance and M1 closure
- [ ] Watch the full 72-second Remotion and Motion Canvas films at 24 fps; record shot/frame-specific findings.
- [x] Close the source-level cross-engine storyboard parity gap: Remotion S02 now has deterministic anticipation/lift/inspect-turn/re-dip/lean motion; the S03–S05 optical reveal is staged; TypeScript runtime parity checks execute before render. Candidate [#137](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488421) passed and contract [#35](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488347) passed 26 tests. Continuous full-speed creative comparison remains open.
- [ ] Improve Nia's gaze, anticipation, hand/grip, spoon lift/re-dip, reaction and follow-through to meet `ANIMATION_CRAFT_STANDARDS.md`.
- [ ] Re-choreograph the diagram as distinct causal stages with purposeful holds; remove unmotivated long static layouts.
- [ ] Obtain approved Vietnamese narration, align transcript captions to speech, add SFX/music and pass perceptual audio review, or explicitly revise the benchmark scope to visual-only.
- [ ] Run reduced/mobile-size label review and a repeated render/revision-time study.

## Latest thumb-base silhouette refinement — 2026-11-28

- Visual QA of the #146 native grip crop showed a dark-outlined thumb-base pad overlapping the thumb circle, reading as two separate round masses.
- In `nia-grip.tsx`, the thumb-base pad now uses skin colour for both fill and stroke, a 1 px line width and a −12° local rotation matching the palm. The thumb's own dark outline is retained.
- Added contract assertions to ensure the thenar pad remains visually blended. Contract [#41](https://github.com/Nolane-x/Nolane-video/actions/runs/46119630375) passes 26 tests and benchmark validation.
- Candidate [#149](https://github.com/Nolane-x/Nolane-video/actions/runs/46119630293) passes all three engines. Motion Canvas renders exactly 1,728 frames at 1920×1080/24 fps/72 seconds with zero browser errors; MP4 SHA-256 `e78426c403b25c06cdabaa3310f5242ddb2b9977dec637025cef329e6d827ce8`.
- Contact sheet and selected native frames at 8.8/9.5/10.5/11.5 s plus enlarged crops were inspected. The extra dark ring is removed; the hand remains stylized and small in the full shot, so depth/volume and creative anatomy approval remain open.

## Latest Nia hand articulation update — 2026-11-28

- `motion-canvas/src/actors/grip-geometry.ts` derives one 11 px crease per finger, perpendicular to its first path segment and centred at 52%; it also derives a palm crease, thumb-base pad position and thumb-base crease from the active grip pose.
- `nia-grip.tsx` animates the new refs with the same `rest`/`brace` pose generator. The visuals remain inside the spoon prop node. The scene wires their visibility at the kitchen-scene entrances.
- Runtime test coverage checks crease perpendicularity/length/centre, palm-crease bounds, finite thumb-base geometry and distinct poses. Python contract tests now verify the shared constructor and generated controls rather than stale literal pose syntax.
- Candidate [#146](https://github.com/Nolane-x/Nolane-video/actions/runs/46118930631) passed all three engine jobs; contract [#40](https://github.com/Nolane-x/Nolane-video/actions/runs/46118930644) passed 26 tests and benchmark validation.
- Downloaded Motion Canvas candidate #146: H.264, 1920×1080 yuv420p, 24 fps, 72.000 s, exactly 1,728 frames, zero browser errors. MP4 SHA-256 `2b327e50fde101e306642fcf73d3ce02a3af6a9b041edd81d108f1b9b88e8ff2`.
- Selected native frames at 8.8/9.5/10.5/11.5 s and grip-detail crops were inspected on the same byte-identical MP4 bitstream from #143/#146. The hand remains a simple vector construction with palm/thumb overlap; creative anatomy approval and continuous 24-fps viewing remain open.

## Latest Motion Canvas arm articulation update — 2026-11-27

- `motion-canvas/src/actors/nia.tsx` now draws dark contour strokes behind the upper arm and forearm plus shoulder, elbow and wrist joint circles.
- Each outline and joint follows the same shoulder/elbow/wrist values as the two-bone solver on every tween callback. Bone lengths remain 200 px / 615 px; grip anchors and spoon geometry are unchanged.
- `scenes/spoon.tsx` includes the new controls in S01/S03/S06 visibility transitions. `tests/test_benchmark.py` asserts their existence, IK-point bindings and scene wiring.
- Contract [#36](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464489) passes 26 tests. Candidate [#140](https://github.com/Nolane-x/Nolane-video/actions/runs/46013464282) passes all three engine jobs, including Motion Canvas build/render/ffprobe and Remotion parity/typecheck.
- Motion Canvas artifact metadata: H.264, 1920×1080 yuv420p, 24 fps, 72.000 s, 1,728 frames, zero browser errors; MP4 SHA-256 `b4637a336e3206a36975e769b2067802afeaa114d1aad90e63d928685e89260a`.
- Contact sheet, 4-fps S02 strip and selected native 1080p frames at 8.8/9.5/10.5/11.5 s were inspected. Arm silhouette and joint landmarks read more clearly; anatomy/acting remains prototype-level. This does not close continuous 24-fps creative review.

## Latest Remotion parity and candidate update — 2026-11-27

- Added `remotion/src/benchmark-motion.ts` with deterministic global-frame S02 and diagram schedules. The S02 helper covers the half-open range `[192, 432)`; the spoon/hand lift coupling is asserted across all 240 frames.
- Added `remotion/scripts/test-parity.mjs`, wired as `npm run test:parity` before Remotion typecheck/render. It validates anticipation, lift, 6° inspection, re-dip, reaction, frame bounds, hand/prop coupling and S03–S05 reveal ordering.
- Extended `tests/test_benchmark.py` with a repository-level wiring contract; candidate workflow path filters now include that test file.
- Candidate [#137](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488421) passed all three engine jobs; contract [#35](https://github.com/Nolane-x/Nolane-video/actions/runs/46011488347) passed 26 tests and benchmark validation. Remotion and Motion Canvas both passed 72s/1,728-frame H.264 1080p/24fps gates; Manim passed its 279-frame specialist segment.
- Sampled 4-fps S02 outputs and selected native frames show the missing Remotion action beats and staged diagram are present in the rendered video. This is not a complete 24fps playback review.
- M1 remains open for full-speed creative review, hand/body acting, diagram pacing, mobile typography, approved audio/captions, repeated authoring/revision metrics and H2 provenance/license review.

## Current implementation note — 2026-11-27

- The first NEE-owned Motion Canvas actor slice is implemented in `benchmarks/optics-spoon/motion-canvas/src/actors/nia.tsx`. It exposes torso, neck, head, eyes, mouth, upper arm, forearm and elbow as reusable refs.
- S02 now has a first authored action arc: anticipation, lift, inspect/turn, re-dip and lean. The spoon hand remains parented to the prop; the grip and hand are still geometric, so this does not satisfy final articulation/contact acceptance.
- The visual kink was adjusted to remain continuous at the interface while still being offset; the selected frame review and final run #89 validate the prototype result.
- Candidate run [45951640411](https://github.com/Nolane-x/Nolane-video/actions/runs/45951640411) passed all three render/ffprobe/upload jobs. Contract CI [45951654984](https://github.com/Nolane-x/Nolane-video/actions/runs/45951654984) passed 16 tests.
- M1 remains open until both full films receive full-speed review and the missing audio/creative gates are resolved or explicitly scoped out. No general Film IR/runtime package build is authorized by these results alone.

## Latest reusable diagram slice — 2026-11-27

- Extracted `createRefractionDiagram(palette)` to `benchmarks/optics-spoon/motion-canvas/src/diagrams/refraction.tsx`; the component consumes canonical `shared/diagram.json`, owns the interface, normal, physical rays, backward construction, points and labels, and returns refs for scene choreography.
- The backward extension now uses `lineDash={[18, 14]}` to distinguish the virtual construction from physical rays.
- Candidate run [45952654166 (#94)](https://github.com/Nolane-x/Nolane-video/actions/runs/45952654166) passed all three engine jobs and the exact frame/codec gates. Contract workflow [45952657476 (#13)](https://github.com/Nolane-x/Nolane-video/actions/runs/45952657476) passed 17 tests.
- Selected native-resolution frame review at 51 s confirms the physical/backward ray styling. This does not close full-speed creative review, audio or mobile-size QA.

## Latest implementation slice — 2026-11-27

- Motion Canvas visual systems now live in reusable Nia actor/grip, SpoonProp, KitchenSet and RefractionDiagram modules; `spoon.tsx` primarily orchestrates shot timing and acting.
- `rig-anchors.ts` defines immutable local/stage anchors and computes wrist contact after prop rotation. S02 uses rest (0°), lift (−5°) and inspection turn (+6°) points.
- The grip is a prop-attached palm/thumb/four-finger rig with named rest/brace poses. Finger paths are generated from the shared spoon-handle axis; the four fingers cross the centreline at separated along-axis stations, while the thumb crosses from the opposite side. The prop and rig use the same handle endpoint constants.
- Nia's two-bone arm rig uses 200 px / 615 px fixed segment lengths and re-solves the elbow inside the Motion Canvas tween callback on every frame. The scene no longer interpolates precomputed elbow endpoints.
- Candidate run [#134](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922641) passed all three engine jobs, both actor runtime suites, typecheck and exact frame/codec gates. Contract validation [#34](https://github.com/Nolane-x/Nolane-video/actions/runs/46007922552) passed 25 tests, including shared handle-axis ownership; the grip runtime suite verifies both rest/brace paths against the actual shaft axis.
- Selected native frames at 9.5 s, 10.5 s and 11.5 s from candidate #134 show four distinct finger bands and the opposing thumb across the shaft, with the elbow following the wrist through the lift/inspection/re-dip. This is selected-frame prototype QA, not a full-speed creative approval.
- M1 remains open for full-speed review, production-quality hand/body acting, diagram choreography, mobile typography, audio approval and repeated authoring/revision measurements.

## Required acceptance

M1 is not complete until the benchmark outputs are rendered or the limitations of each candidate are demonstrated with fresh logs, the scientific and visual reviews are recorded, and the architecture decision is explicit. A successful typecheck alone does not pass M1.
