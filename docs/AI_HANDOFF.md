# AI Session Handoff

**Updated:** 2026-11-26  
**Repository:** https://github.com/Nolane-x/Nolane-video  
**Current branch:** main  
**Verified HEAD before this handoff update:** f10fa327aaaaa80aa8cf16246ff2eb2309d4f716  
**Current milestone:** M0 complete as a documentation foundation; M1 is next.

## Read first

A new AI session must read the following documents in this order:

1. README.md
2. AGENTS.md
3. docs/PRODUCT_NORTH_STAR.md
4. docs/ENGINE_ARCHITECTURE.md
5. docs/REFERENCE_ENGINE_STUDY.md
6. docs/ROADMAP.md
7. docs/STATE.md
8. docs/AI_HANDOFF.md

Then fetch the live GitHub main HEAD and inspect the tree and changed files. Do not assume this handoff is newer than the repository.

## Project identity — do not change

Nolane Explainer Engine (working name NEE) is a specialist code-first engine for **story-driven, narration-led 2D/2.5D educational explainer films**.

Target subjects:
- mathematics;
- physics;
- chemistry;
- engineering;
- technology;
- other topics where accurate visual explanation is the central challenge.

Long-form target: approximately 8–20 minutes, primarily 16:9.

The ambition is the highest practical quality in this narrow category: Median-level clarity of explanation, strong character acting and cause-and-effect craft informed by Alan Becker's public work, mathematically accurate diagrams informed by Manim, and reliable frame-based authoring/rendering informed by Remotion and Motion Canvas.

This is NOT a universal video generator or a general-purpose editor. Do not add vlog, podcast, ad, UGC, music-video, gaming, sports, or arbitrary live-action workflows as product goals. Read PRODUCT_NORTH_STAR before proposing any new feature.

## Architecture principles already established

- Build a specialist film compiler, not a prompt wrapper.
- A typed, versioned, renderer-independent Film IR is the proposed source of truth.
- AI agents author research, story, script, style bible, storyboard, scene/acting cues and QA records.
- Deterministic runtime components validate and execute these artifacts.
- Render backends are replaceable adapters; avoid several competing master timelines.
- The system needs native semantic educational objects plus real acting, pose, gesture, gaze, anticipation, contact, follow-through, recovery and sound-synchronized choreography.
- Time must be frame-accurate (integer frames and rational FPS); audio alignment must use the actual audio and sample-aware timing.
- A successful render is not proof of artistic approval. Review moving scenes and audio.

## Important repositories and their roles

- New engine: https://github.com/Nolane-x/Nolane-video
- User Remotion fork: https://github.com/Nolane-x/remotion
- Remotion upstream: https://github.com/remotion-dev/remotion
- User Manim fork: https://github.com/Nolane-x/manim
- Manim upstream: https://github.com/ManimCommunity/manim
- Prior production workspace: https://github.com/Nolane-x/video
- Motion Canvas candidate: https://github.com/motion-canvas/motion-canvas
- Rive runtime candidate: https://github.com/rive-app/rive-runtime
- Synfig reference: https://github.com/synfig/synfig

Do not confuse the new engine repo with the prior production workspace. Do not modify the Remotion or Manim forks while working in Nolane-video unless the user explicitly asks.

## Key source findings

### Remotion fork
Composition, Sequence, TimelineContext and render-flow code provide strong examples for timeline composition, nested sequences, frame state, media synchronization, rendering progress and pipeline reliability.

The inspected Remotion license is a two-tier license. Its free license is not permission to sell or sublicense a derivative of Remotion. Verify current license terms before any redistribution or commercial productization. Do not assume that the user having a fork removes upstream license obligations.

### Manim fork
Manim has structured mathematical objects, explicit Animation instances, transformations, groups, updaters, geometry, graphing, Cairo and OpenGL rendering. Use it as a math/visualization reference and possible adapter, not the sole long-form film model. The inspected upstream license is MIT.

### Motion Canvas
The public Motion Canvas repo is MIT-licensed and specifically targets informative vector animation synchronized with voice-over. Its generators, concurrent threads, reactive signals, 2D scene graph, camera and live editor make it a serious candidate for the specialist 2D runtime.

### Existing H2 prototype
Nolane-x/video contains a small H2 2D engine with time/interpolation/seeded randomness, a pose-based character rig and Playwright/Chromium + FFmpeg rendering. It may contain useful ideas or code, but first audit exact source provenance, manifest, license and dependency constraints. Do not copy files into this repo without that review.

### Median and Alan Becker
Median's public join-us page says its source repository contains animation code, scripts, voice recordings, SFX and music, but access is paid/private. No private Median code was accessed.

Alan Becker's public behind-the-scenes content and current production credits are references for story-first planning, action clarity, storyboard/animatic, performance, background, audio, editing and specialized production roles. Do not copy characters, footage, scripts, music, source projects or distinctive protected artwork.

## Exact next task — M1 benchmark, not a full engine build

First, produce a benchmark specification and a small educational idea suitable for 60–120 seconds. It must be simple enough to render in multiple engines but rich enough to test the target category.

Required content:
- one question or misconception that creates curiosity;
- one concise narrative arc with a clear ending;
- one recurring character or consistent visual subject that performs a meaningful action;
- one mathematically/scientifically meaningful transformation;
- one camera move with a clear reason;
- narration with at least one deliberate pause;
- captions and at least one action-synchronized sound cue;
- a consistent miniature style bible.

Then implement equivalent versions for:
1. Motion Canvas;
2. Remotion;
3. existing H2 engine only after source/license review;
4. Manim for the math/diagram shot or segment.

Keep the source story, narration, assets and output settings the same across candidates. Do not make every engine implement all features if the capability is not relevant to that engine; document the adapter boundary.

Collect:
- exact commands and dependency versions;
- authoring time and difficulty;
- successful preview/render evidence;
- per-shot contact sheets and representative moving-frame checks;
- math/factual validation;
- timing, captions and audio synchronization;
- render time and incremental-render behavior;
- code and asset provenance;
- license assessment.

Write the comparison and a formal architecture decision in docs before starting major runtime implementation. Choose one master 2D runtime/timeline, retain other systems as adapters or references where justified, and explain why. Do not choose simply because a framework is familiar.

## Before any implementation

- Re-read the relevant design and roadmap.
- Create a small plan for the benchmark.
- Use tests for any implemented behavior.
- Keep scope restricted to the M1 benchmark.
- Do not add large packages, frameworks, agent swarms or speculative folders.
- Do not build a general editor or AI video API aggregator.

## Required end-of-session handoff

At the end of every future session, update both:
- docs/STATE.md
- docs/AI_HANDOFF.md

Include:
- live branch and commit;
- changes made;
- exact tests/builds/render commands actually run;
- artifacts and checksums, if any;
- technical QA versus visual/audio review status;
- unresolved blockers;
- the next single concrete task.

Never say a test, build, render, or review passed unless its fresh command/log/evidence verifies it.
