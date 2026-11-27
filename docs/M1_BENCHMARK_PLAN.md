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
- [ ] Improve Nia's gaze, anticipation, hand/grip, spoon lift/re-dip, reaction and follow-through to meet `ANIMATION_CRAFT_STANDARDS.md`.
- [ ] Re-choreograph the diagram as distinct causal stages with purposeful holds; remove unmotivated long static layouts.
- [ ] Obtain approved Vietnamese narration, align transcript captions to speech, add SFX/music and pass perceptual audio review, or explicitly revise the benchmark scope to visual-only.
- [ ] Run reduced/mobile-size label review and a repeated render/revision-time study.

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
- The grip is a prop-attached four-finger/palm/thumb rig with named rest/brace poses. The forearm is rendered behind this hand.
- Nia's two-bone arm rig uses 200 px / 615 px fixed segment lengths and re-solves the elbow inside the Motion Canvas tween callback on every frame. The scene no longer interpolates precomputed elbow endpoints.
- Candidate run [#126](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070151) passed all three engine jobs and exact frame/codec gates. Contract validation [#31](https://github.com/Nolane-x/Nolane-video/actions/runs/46003070299) passed 24 tests. The candidate job also executes the TypeScript IK runtime tests.
- Selected native frames at 8.8 s, 9.8 s, 10.8 s and 11.8 s show the elbow following the grip target through lift/turn/re-dip. This is selected-frame prototype QA, not a full-speed creative approval.
- M1 remains open for full-speed review, production-quality hand/body acting, diagram choreography, mobile typography, audio approval and repeated authoring/revision measurements.

## Required acceptance

M1 is not complete until the benchmark outputs are rendered or the limitations of each candidate are demonstrated with fresh logs, the scientific and visual reviews are recorded, and the architecture decision is explicit. A successful typecheck alone does not pass M1.
