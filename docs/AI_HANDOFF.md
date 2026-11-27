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
