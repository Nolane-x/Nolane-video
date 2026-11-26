# M1 Benchmark Implementation Plan

> **For agentic workers:** use this plan task-by-task. Keep tasks independently testable and update the state/handoff at the end of every session.

**Goal:** produce comparable, evidence-backed implementations of one 72-second educational film so NEE can choose its first 2D runtime based on actual clarity, animation craft, correctness, reproducibility and integration effort.

**Architecture:** one shared script, frame-accurate storyboard, art bible and claim ledger are the canonical creative brief. Remotion and Motion Canvas receive equivalent full-film implementations; Manim receives the scientific ray-diagram segment. The output/reporting layer records each candidate independently. No candidate becomes the master backend before the architecture decision is written.

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
- [ ] Verify 1,728-frame half-open range and 72-second MP4 output in run 45840831148; review the final contact sheet.

### Task 3 — Remotion full-film candidate
- [ ] Pin Remotion packages to 4.0.547 and compatible React packages.
- [ ] Implement each shot as a reusable scene component.
- [ ] Use useCurrentFrame and frame-based transitions; no wall-clock animation.
- [ ] Implement the same character action and ray geometry.
- [ ] Render a low-resolution preview and full 1080p candidate through CLI.
- [ ] Record timings, CLI output, ffprobe metadata and SHA-256.

### Task 4 — Manim scientific-segment candidate
- [ ] Pin the Manim Community Edition fork by exact commit and isolated Python requirements.
- [ ] Implement S04–S05 with a shared ray geometry, normal, refracted ray, angles, Snell law and apparent image.
- [ ] Avoid MathTex unless LaTeX is available; use a tested text/vector fallback otherwise.
- [ ] Render low-quality and full-resolution previews and inspect the actual frames.

### Task 5 — Quality and comparison
- [ ] Validate all math and labels.
- [ ] Make contact sheets for every candidate.
- [ ] Inspect continuous motion and action/contact states.
- [ ] Check Vietnamese diacritics, caption size and safe areas.
- [ ] Record output metadata, render time, authoring effort and reproducibility.
- [ ] Score candidates only after evidence exists.
- [ ] Write a formal architecture decision and update the roadmap.

## Required acceptance

M1 is not complete until the benchmark outputs are rendered or the limitations of each candidate are demonstrated with fresh logs, the scientific and visual reviews are recorded, and the architecture decision is explicit. A successful typecheck alone does not pass M1.
