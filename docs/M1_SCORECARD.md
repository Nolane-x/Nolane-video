# M1 Candidate Scorecard — The Spoon That Bends

**Snapshot:** 2026-11-26  
**Status:** evidence ledger; no numeric ranking and no master renderer selected.

## Benchmark contract

- 72.000-second target film
- 1920×1080, 24 fps, 1,728 frames (indices 0–1,727)
- Same Vietnamese script, six-shot schedule, art direction and canonical refraction geometry
- Remotion and Motion Canvas are full-film candidates; Manim is a specialist S04–S05 diagram candidate.

## Evidence-backed comparison

| Dimension | Remotion 4.0.547 | Motion Canvas 3.17.2 | Manim CE fork |
|---|---|---|---|
| Intended role | Full film | Full film | S04–S05 scientific segment only |
| Fresh CI result | PASS — run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169) | BUILD PASS; full render still running in same run | PASS — run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169) |
| Output metadata | H.264, 1920×1080, 24 fps, 72.000 s, 1,728 frames | No accepted MP4 yet; strict exact-count gate pending | 1920×1080, 24 fps, 11.625 s |
| Approximate render-step wall time | 68 s in one CI run (15:23:51–15:24:59 UTC) | Not yet measured on a completed exact-range run | 5 s in one CI run (15:23:30–15:23:35 UTC) |
| Visual review | Contact sheet and selected 1080p frames reviewed; caption safe-area fix verified | Pending complete MP4/contact sheet | Scientific geometry reviewed; palette/font revision pending |
| Story coverage | Six-shot narrative present | Six-shot scene implementation exists; output not yet reviewed | Not applicable; no character-led story |
| Scientific geometry | Pass in reviewed ray diagram | Shared canonical geometry; visual review pending | Pass in reviewed ray diagram |
| Character acting | Simple vector blockout; insufficient for final quality | Candidate not yet scored | Not applicable |
| Audio | No VO/SFX/music; no transcript sync | No audio acceptance yet | No audio acceptance yet |
| Operational status | Stable deterministic render and ffprobe proof | Editor automation, renderer event and range validation now instrumented | Pinned fork installs and renders specialist segment |
| License note | Two-tier licensing; recheck product/commercial use rights | MIT core; optional FFmpeg exporter GPLv3 and excluded | Manim Community Edition MIT |

### Render-time caveat

The 68-second Remotion and 5-second Manim numbers are single-run GitHub Actions step durations, not controlled performance benchmarks. They were executed in separate jobs and represent different output scopes. Do not compare them as if both generated the same 72-second film. A fair full-film render-time comparison requires a completed Motion Canvas render and repeated runs on comparable runner classes.

## Quality-gate ledger

| Gate | Current status | Evidence / next action |
|---|---|---|
| Story and learning objective | PARTIAL PASS | Remotion storyboard present; check complete continuous motion and comprehension |
| Scientific correctness | PASS for reviewed geometry | Shared Snell/geometry validator passed; preserve diagram.json as source of truth |
| Deterministic frame output | PARTIAL | Remotion 1,728 frames pass; Manim segment pass; Motion Canvas exact output pending |
| Visual readability | PARTIAL PASS | Remotion caption-safe-area fix verified; Manim palette/font rerender pending; Motion Canvas pending |
| Acting, prop contact, continuity | NOT APPROVED | Improve Nia grip, anticipation, hand/spoon coupling and follow-through |
| Audio/narration/captions | NOT TESTED | Add approved real VO, transcript alignment, SFX and music before audio acceptance |
| Technical export | PARTIAL PASS | Remotion/Manim metadata pass; Motion Canvas MP4/ffprobe pending |
| Reproducibility and revision cost | PARTIAL | Pinned deps and CI exist; measure iteration/edit time across candidates |
| Licensing/reuse | PARTIAL | Remotion terms need product review; H2 provenance audit remains open |

## Current CI references

- Full candidate run with Remotion/Manim successes and Motion Canvas still rendering: [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169).
- Latest queued candidate run including the Manim palette/font update: [45851338555](https://github.com/Nolane-x/Nolane-video/actions/runs/45851338555). Run 45850249595 was superseded while pending and did not execute.
- Frame-range validator: [45849610249](https://github.com/Nolane-x/Nolane-video/actions/runs/45849610249).
- Frame-range regression tests: [45849637293](https://github.com/Nolane-x/Nolane-video/actions/runs/45849637293).

## Decision

**No numeric score and no backend selection yet.**

The evidence currently supports Remotion as a proven deterministic full-film baseline and Manim as a useful math/diagram specialist. Motion Canvas remains a full-film candidate until its strict 1,728-frame render completes and is reviewed. None of these prototypes reaches NEE's final acting/audio/art-direction quality bar yet.

### Required evidence before an architecture decision

1. Motion Canvas exact 1,728-frame output, ffprobe, contact sheet and continuous-motion review.
2. Manim palette/font rerender and approval.
3. Shot-by-shot continuous-motion review for the full-film candidates.
4. One approved shared narration/audio package or a documented decision to benchmark silent visuals separately.
5. Repeatable render and revision-time measurements, then weighted criteria and an ADR.
