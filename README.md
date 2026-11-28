# Nolane Explainer Engine

**A specialist animation engine for story-driven educational films.**

Nolane Explainer Engine (working name: **NEE**) is a code-first production system for making excellent, long-form animated explainers — especially mathematics, physics, chemistry, engineering, technology, and other subjects where abstract ideas become understandable through visual models, diagrams, characters, and cause-and-effect animation.

It is deliberately **not** a universal video generator or a general-purpose video editor.

## The north star

Build an engine that lets a small human-led team use AI as a capable production department to create films with:

- the conceptual clarity and carefully staged visual explanations associated with Median;
- the expressive character acting, timing, anticipation, contact, follow-through, and visual cause-and-effect worth studying in Alan Becker's animation;
- the mathematical and geometric precision of Manim;
- the deterministic, composable, frame-accurate production discipline demonstrated by Remotion and other code-driven animation systems.

The references are sources of craft and engineering ideas, not templates to copy. We must create original characters, visual language, scripts, assets, and music.

**Success means being better than general-purpose tools inside this narrow category — not supporting every category of video.** That claim must be demonstrated by repeatable benchmark films, not asserted in advance.

## The product boundary

### In scope

- Narration-led, story-driven 2D explainers, with 2.5D depth when it clarifies the scene.
- Long-form educational films, initially targeting roughly 8–20 minutes.
- Expressive reusable characters, props, environments, and visual motifs.
- Mathematical diagrams, graphs, equations, geometry, mechanisms, data, and scientific visualizations.
- Visual metaphors and acted scenes that make abstract ideas concrete.
- Shot-level camera choreography, transitions, typography, and purposeful composition.
- Voice-over timing, word/phrase-aligned captions, music, ambience, and action-synced SFX.
- A repeatable AI-assisted pipeline from research through script, storyboard, scene code, preview, review, and final render.

### Out of scope

- A universal editor for vlogs, podcasts, commercials, gaming highlights, music videos, or arbitrary live-action films.
- A thin prompt wrapper around text-to-video APIs.
- A slide deck with decorative movement.
- Opaque AI-generated scenes that cannot be inspected and revised.
- Copying Median or Alan Becker's code, characters, scripts, footage, sound, or distinctive protected artwork.
- Rebuilding all of Remotion, Manim, Blender, or a professional 2D animation editor without a measured need.

## Architecture at a glance

The proposed system is a **specialist film compiler**:

1. Research and learning objective.
2. Narrative beats and script.
3. A typed, versioned Film IR (the source of truth for beats, shots, timing, actors, diagrams, cameras, and audio cues).
4. A 2D stage and animation runtime with character acting, vector objects, camera, motion, and educational primitives.
5. Renderer adapters, selected by measured quality and licensing — not by brand preference.
6. Voice, music, SFX, captions, compositing, and mastering.
7. Technical, mathematical, narrative, animation, continuity, and perceptual QA.
8. A complete reproducible project, render evidence, and AI handoff.

Initial reference systems:

- [Nolane-x/remotion](https://github.com/Nolane-x/remotion) — the user's Remotion fork; study composition, timeline, media, preview, render and production infrastructure.
- [Nolane-x/manim](https://github.com/Nolane-x/manim) — the user's Manim CE fork; study mathematical object models, transformations, graphing, cameras and renderers.
- [Motion Canvas](https://github.com/motion-canvas/motion-canvas) — a particularly relevant code-first 2D animation and voice-over synchronization reference.
- [Nolane-x/video](https://github.com/Nolane-x/video) — prior production workspace containing a separate Remotion project and an H2 2D rig/rendering prototype. Reuse only after source and license review.
- [Rive runtime](https://github.com/rive-app/rive-runtime) — optional character-rig/runtime research.
- [Synfig](https://github.com/synfig/synfig) — optional vector, tweening and bone-rig research; GPL-3.0 requires special care.

Do not import all of these frameworks into one runtime. Build a small domain-specific core and adapters.

## Start every AI session here

Read these files in order:

1. [AGENTS.md](AGENTS.md)
2. [docs/PRODUCT_NORTH_STAR.md](docs/PRODUCT_NORTH_STAR.md)
3. [docs/ENGINE_ARCHITECTURE.md](docs/ENGINE_ARCHITECTURE.md)
4. [docs/REFERENCE_ENGINE_STUDY.md](docs/REFERENCE_ENGINE_STUDY.md)
5. [docs/ANIMATION_CRAFT_STANDARDS.md](docs/ANIMATION_CRAFT_STANDARDS.md) — staging, acting, prop contact, timing and review gates
6. [docs/ROADMAP.md](docs/ROADMAP.md)
7. [docs/STATE.md](docs/STATE.md)
8. [docs/AI_HANDOFF.md](docs/AI_HANDOFF.md)
9. [docs/adr/ADR-0001-motion-canvas-first-2d-runtime.md](docs/adr/ADR-0001-motion-canvas-first-2d-runtime.md)
10. [docs/M1_SCORECARD.md](docs/M1_SCORECARD.md)
11. [docs/M1_BENCHMARK_PLAN.md](docs/M1_BENCHMARK_PLAN.md)

Then inspect the current Git branch, HEAD, repository tree, recent commits, and the relevant upstream/fork source before changing anything.

**Every working session must leave an updated docs/STATE.md and docs/AI_HANDOFF.md.** The handoff is a required deliverable, not optional housekeeping.

## Current status

> **M1 benchmark phase — 2026-11-28.** Candidate [#158](https://github.com/Nolane-x/Nolane-video/actions/runs/46126163649) on scene/test commit `8b230d3` passes Remotion, Motion Canvas and Manim; contract [#47](https://github.com/Nolane-x/Nolane-video/actions/runs/46126163646) passes 29 tests and benchmark validation. S05 reveals the dashed backward extension, then the “Vị trí thật” label, pauses, and only then shows the apparent point/label and explanatory caption; the shot remains 17 seconds. S03/S04 physical-ray order and the S02/S06 clear-out spoon pose remain verified. Candidate #158 is H.264 1920×1080 yuv420p, 24 fps, 72 seconds / 1,728 frames; MC SHA-256 `37cda1eb7b8f3d8c5e309c5faaebccf63a498c1cb8037f8f16a090b0cf72bd00`. This is sampled QA, not uninterrupted full-speed review. M1 remains open for continuous review, natural acting, narration-led hold pacing, mobile typography, approved VO/captions/audio, revision-cost measurement and H2 provenance.

The first implementation milestone is not a large code dump. It is a small, complete benchmark film that proves the chosen runtime can turn one approved educational idea into an editable, narratively coherent, mathematically correct, well-acted, voice-synchronized short film.
