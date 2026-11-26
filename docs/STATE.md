# Project State

**Snapshot date:** 2026-11-26  
**Repository:** https://github.com/Nolane-x/Nolane-video  
**Default branch:** main  
**Current phase:** M0 — product foundation and scope lock  
**Last verified source commit before this state document:** 99a705ab09648012855710da5455da8e458ad2ed

## 1. Verified repository facts

- This repository was created on 2026-11-26 and was empty at the start of this project session.
- The first project README was committed as 5a64523916b9c83d90c5d46a5e9cda7969637ac0.
- The dedicated engine repository is separate from Nolane-x/video.
- The user's Remotion fork is Nolane-x/remotion, forked from remotion-dev/remotion.
- The user's Manim fork is Nolane-x/manim, forked from ManimCommunity/manim.
- The prior production workspace is Nolane-x/video and contains a separate Remotion project plus an H2 2D prototype. It is not the new engine repository.
- Motion Canvas was inspected as a public MIT-licensed candidate for code-first 2D explanatory animation and narration synchronization.
- Rive runtime was identified as an optional character/prop runtime candidate (MIT).
- Synfig was identified as an animation/rigging reference with GPL-3.0 integration implications.

## 2. Documents established

- README.md — project identity and entry point.
- AGENTS.md — scope lock, source/licensing rules, engineering rules and mandatory handoff.
- docs/PRODUCT_NORTH_STAR.md — mission, target quality, in/out of scope and success criteria.
- docs/ENGINE_ARCHITECTURE.md — Film IR, runtime layers, renderer adapter policy, AI production roles and QA gates.
- docs/REFERENCE_ENGINE_STUDY.md — Median, Alan Becker, Remotion, Manim, Motion Canvas, existing H2, Rive and Synfig research.
- docs/ROADMAP.md — M0–M6 with measurable acceptance gates.

## 3. Strategic decisions established

1. Product category is narrow: story-driven, narration-led 2D/2.5D educational explainers, primarily math, science, engineering and technology.
2. Long-term film target is approximately 8–20 minutes, primarily 16:9.
3. Short benchmark target is 60–120 seconds and is an engineering proof, not a reduction of product ambition.
4. Film IR is proposed as the renderer-independent source of truth.
5. Remotion, Manim, Motion Canvas and the existing H2 prototype are references or benchmark candidates; none is yet selected as the sole engine.
6. No entire framework should be imported by default.
7. Every future work session must update this file and docs/AI_HANDOFF.md before ending.

## 4. Work actually performed

- Inspected GitHub metadata and repository trees for the new repo, existing production repo, Remotion fork and Manim fork.
- Inspected representative Remotion Composition, Sequence, TimelineContext and render-flow source.
- Inspected representative Manim Scene, Animation and Mobject source.
- Inspected Motion Canvas GeneratorScene, Thread, sequence flow, 2D Scene and Camera source.
- Inspected parts of the H2 prototype in Nolane-x/video, including core timing/interpolation/seeded-random functions, actor rig pose definitions and browser/FFmpeg renderer.
- Researched public Median and Alan Becker workflow materials. Median's private repository was not accessed.
- Created the foundation documents listed above.

## 5. Not yet done

- No engine runtime code has been written.
- No third-party package has been installed or vendored.
- No source has been copied from Remotion, Manim, Motion Canvas, H2, Rive or Synfig.
- No benchmark scene has been implemented or rendered.
- No tests, typechecks, builds, render jobs or media QA have been run.
- No renderer has been selected.
- No claim is made that this engine can currently create a finished film.

## 6. Next milestone

**M1 — comparable benchmark and architecture decision.**

Implement one small, consistent 60–120 second educational scene in candidate systems and assess them using the same story, narration, assets and output settings. Compare Motion Canvas, Remotion, and the existing H2 prototype after a provenance/license audit; use Manim for the mathematically meaningful segment. Document results and choose the initial runtime only after actual preview/render and visual review.

## 7. Last-known GitHub source state

- Foundation README commit: 5a64523916b9c83d90c5d46a5e9cda7969637ac0
- Product/architecture/roadmap documentation existed on main through: 99a705ab09648012855710da5455da8e458ad2ed
- The AI handoff document is being established in the same foundation session. Always inspect the live main HEAD before continuing.
