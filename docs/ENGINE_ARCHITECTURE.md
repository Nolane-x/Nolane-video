# Engine Architecture

**Status:** Proposed architecture, v0.1  
**Date:** 2026-11-26

## 1. Architectural thesis

NEE should be built as a **specialist film compiler**, not as a collection of unrelated generation prompts.

The source of truth is a typed Film Intermediate Representation (Film IR). Research, script, beats, shots, actors, diagrams, animation, camera, narration, captions, and sound cues are represented as linked, versioned project data. AI agents author and revise the project artifacts. Deterministic runtime components evaluate this data and render scenes through carefully chosen adapters. People approve creative and factual decisions.

This separates:
- what the film means;
- what the viewer sees;
- how the scene moves;
- how the image is rendered;
- how the final media is assembled and checked.

## 2. High-level pipeline

Research dossier
→ learning objective and misconception map
→ narrative outline and beats
→ full script and narration spans
→ visual design bible
→ shot plan / storyboard / animatic
→ Film IR and scene assets
→ scene runtime and renderer adapters
→ voice, SFX, ambience, music and captions
→ shot preview and contact sheets
→ full render and mastering
→ technical + content + perceptual QA
→ versioned delivery and AI handoff

A stage cannot silently invent or overwrite the outputs of an earlier approved stage. Revisions must be traceable.

## 3. Film IR — the central contract

The Film IR is the most important architectural asset. It must be independent of Remotion, Manim, Motion Canvas, Rive, and any specific renderer.

### Core entities

- **Project:** title, subject, audience, language, aspect ratio, frame rate, resolution, seed, style-bible reference, schema version, dependencies.
- **ResearchSource:** URL, author/publisher, publication date, retrieval date, claim IDs supported, license/usage notes.
- **LearningObjective:** what viewers should understand or be able to explain.
- **Misconception:** an incorrect intuition or likely failure of understanding that the film must resolve.
- **NarrativeBeat:** story function, dramatic question, information introduced, emotion, start/end state.
- **ScriptSpan:** exact narration/dialogue text, speaker, emphasis, estimated/verified audio range, pause, source/claim links.
- **Shot:** stable ID, beat link, duration in integer frames, visual purpose, shot type, composition, start/end visual state, narration spans, transition, QA constraints.
- **Stage:** world coordinate system, background, environment layers, lighting, safe areas, depth and camera.
- **Actor:** stable character ID, rig definition, visual identity, permitted actions, emotion, pose, gaze, facing, costume and continuity state.
- **Prop:** reusable object ID, geometry or asset reference, transform, interaction points, physical/visual properties.
- **Diagram:** typed educational object — graph, axes, geometry, number line, vector, table, equation, flow, mechanism, map, or data visualization.
- **AnimationTrack:** target property, start frame, duration, keyframes, easing, constraints, event markers and interpolation semantics.
- **CameraMove:** framing, target, position, zoom, rotation, path, focus, easing and reason for movement.
- **AudioCue:** voice, dialogue, SFX, ambience or music; source, start/sample timing, gain, fade, ducking and semantic trigger.
- **CaptionCue:** exact words, start/end timing, speaker, emphasis and placement rules.
- **AssetReference:** stable ID, URI/path, content hash, source, license, attribution, color profile and intended use.
- **RenderProfile:** backend, dimensions, FPS, pixel format, color space, audio sample rate, codec and quality parameters.
- **ReviewRecord:** issue, severity, time range/frame, evidence, owner, resolution and review status.

### Time model

- Frame indices are integers.
- FPS is represented as an explicit rational value, not a floating-point approximation hidden in code.
- Audio uses sample-accurate timing at the project's declared sample rate.
- Imported timecodes are normalized into the project timebase.
- Conversion between frames, seconds, and audio samples happens through a single tested time module.
- Every shot has a stable ID so timing changes and QA results can be reconciled.

### Why an intermediate representation matters

AI-generated source code alone is a weak contract. It is difficult to validate whether a script line has a corresponding visual, whether a diagram uses the right units, or whether a character remains consistent across 80 shots.

A typed Film IR makes those relationships queryable and testable before rendering.

## 4. Runtime layers

### 4.1 Film and shot scheduler

Responsibilities:
- resolve shots and transitions into a global frame timeline;
- link narration spans and audio cues to frames/samples;
- support nested groups, sequential and parallel actions, holds, retiming and markers;
- calculate dependencies and invalidation when a shot changes;
- preserve stable shot identity through timeline edits.

The scheduler must not depend on a browser UI.

### 4.2 2D stage and scene graph

Responsibilities:
- hierarchical nodes and transforms;
- vector paths, shapes, SVG, text, images, masks, clipping and filters;
- explicit z-order and controlled depth;
- local/world coordinate conversion;
- layout and safe-area constraints;
- reusable environments, props and visual groups.

The rendering representation must separate semantic objects from their rendered pixels.

### 4.3 Character and acting system

Character acting is a core differentiator, not an optional decoration layer.

Initial capabilities:
- a stable reusable 2D rig with named joints and constraints;
- named poses and pose blending;
- gesture, gaze, facing, expression and posture;
- locomotion building blocks;
- prop interaction and contact points;
- anticipation → action → contact/impact → follow-through → recovery;
- overlapping action and secondary motion;
- explicit timing and spacing control;
- ability to override any rigged motion with authored keyframes or frame-by-frame artwork.

Do not assume every character should be a stick figure. The first benchmark can use a simple character because the goal is to test acting and staging, not expensive design. A rig must serve the art direction and story.

### 4.4 Educational visualization subsystem

Provide native semantic primitives for:
- coordinate planes and number lines;
- functions, plots, graphs and data series;
- equations, symbols, formulas and transformations;
- geometric constructions, vectors, angles, areas and volumes;
- diagrams, networks, flows and mechanisms;
- scientific processes with labeled states and units.

Each primitive must preserve numerical/semantic data separately from its display label. A pretty graph with a false scale is a defect.

The system should use the Manim fork as a deep reference and possible renderer adapter. It should not recreate Manim's entire feature set in the first milestone.

### 4.5 Animation choreography

Support:
- keyframes and property tracks;
- generator/coroutine-style sequencing where it provides readable authoring;
- concurrent and staggered actions;
- easing, interpolation, spring and constrained motion;
- event markers for contact, sound, reveal, emphasis and camera cuts;
- state transitions with deterministic evaluation at any frame;
- retiming without destroying relationships between linked actions.

The authoring model may be imperative, declarative, or hybrid, but the Film IR must remain inspectable and renderer-independent.

### 4.6 Camera and composition

Support motivated 2D camera pan, track, dolly, zoom, rotation, framing and target focus. Camera movement must direct attention or reveal information, not serve as empty motion.

Use 2.5D layers/parallax when depth creates a useful spatial model. Keep full 3D as an adapter for rare shots that genuinely require it.

### 4.7 Audio and narration

Responsibilities:
- import and validate recorded or generated voice-over;
- preserve original source audio and metadata;
- align words/phrases to actual audio, not estimated text durations;
- represent breaths, pauses and emphasis;
- synchronize action and SFX with frame/sample events;
- mix ambience, music, dialogue and effects with gain staging and ducking;
- master output and measure loudness, true peak, sample rate and channel layout.

Voice generation is a replaceable service. It must not be a hard dependency of the animation runtime.

### 4.8 Art direction and continuity

A versioned style bible defines:
- palette, contrast, line weight and texture;
- typefaces, hierarchy and text behavior;
- actor proportions, costume and expression vocabulary;
- environment and prop shape language;
- lighting and shadow rules;
- camera language and motion grammar;
- sound identity.

Every recurring asset has a stable ID. A continuity check compares scene usage against the bible and asset definitions.

## 5. Rendering architecture

### M1 decision — Motion Canvas as the first 2D scene adapter

The first comparable benchmark has now passed its technical export gates. [ADR-0001](adr/ADR-0001-motion-canvas-first-2d-runtime.md) provisionally selects Motion Canvas 3.17.2 as the first 2D/2.5D scene-execution adapter for NEE's next vertical slice.

This does **not** make Motion Canvas the Film IR, nor does it declare that it produces better art than Remotion. The decision is bounded to the first implementation path and must be revisited after an acted, voice-synchronized vertical slice.

| System | Current NEE role | Boundary |
|---|---|---|
| Motion Canvas 3.17.2 | First 2D/2.5D scene-execution adapter: generator choreography, signals and deterministic frame rendering | Adapter behind Film IR; not the product data model. NEE still owns actors, contact constraints, educational primitives, continuity and QA |
| Remotion 4.0.547 | Full-film benchmark baseline and possible future adapter | Do not vendor/redistribute or make it a product dependency until the two-tier license and intended deployment model are reviewed |
| Manim CE | Optional specialist math, geometry, graph and scientific-diagram adapter | Specialist scenes only; it does not own the story or master film timeline |
| Rive runtime | Optional future reusable character/prop rig adapter | Evaluate only if NEE's own actor system has a measured gap; validate linear-film control and licensing |
| Blender | Rare 3D shots or depth simulations | Not a core general-purpose 3D product |
| FFmpeg/ffprobe | Final assembly, transcode, audio mastering and media validation | Delivery infrastructure, not the scene authoring engine |

### Critical rule

The Film IR owns the master story and timeline. Motion Canvas executes the first adapter path; it must not become the only representation of shots, actors, timing or diagrams. Manim and any future backend consume explicitly mapped scene/diagram data. No adapter may silently discard unsupported IR features.

Do not vendor whole frameworks. Pin versions, audit licenses, and keep framework-specific imports inside adapter boundaries.

### Evidence required to revisit

- equivalent acted scene authored and revised in Motion Canvas and (where license terms allow) Remotion;
- deterministic frame output and repeated render/preview measurements;
- expressive acting, hand/prop contact, anticipation, follow-through and motivated camera;
- narration/word-aligned captions/SFX/music synchronization;
- full-speed perceptual review, revision cost and dependency/operational friction;
- a refreshed license/distribution review.

A technically successful renderer is not a creative approval.

## 6. AI production roles

Use specialist roles with explicit artifacts and handoffs, not one unconstrained all-purpose agent.

1. **Research Editor:** source collection, claim ledger, numerical checks and uncertainty.
2. **Story Architect:** learning objective, misconceptions, dramatic question, beats and ending.
3. **Scriptwriter:** narration, dialogue, pauses, emphasis and source links.
4. **Art Director:** style bible, actors, environments, palette and visual continuity.
5. **Storyboard Director:** shot list, composition, camera, visual purpose and animatic.
6. **Animation Director:** acting, pose, timing, contact, movement and choreography.
7. **Scientific Visualization Engineer:** graph/equation/diagram correctness and implementation.
8. **Audio Director:** voice timing, ambience, music, SFX, mix and mastering.
9. **Render Engineer:** backend selection, frame rendering, caching, assembly and technical metadata.
10. **Quality Supervisor:** factual, narrative, mathematical, motion, continuity, caption and audio QA.

Each role must read/write defined artifacts. No role may silently replace an approved artifact owned by another stage.

## 7. Quality gates

### Gate A — factual and educational
- claims have sources or derivations;
- equations, units, labels and graph scales are checked;
- the story resolves the stated misconception and learning objective.

### Gate B — story and storyboard
- every beat changes information, action, emotion, scale, place or relationship;
- every shot has a reason to exist;
- visual purpose and narration relationship are explicit;
- the ending resolves the opening question.

### Gate C — art and animation
- style bible applied consistently;
- silhouette and composition readable;
- poses, gaze and contact make sense;
- anticipation/action/contact/follow-through/recovery are reviewed where appropriate;
- no unexplained layer, camera, or asset discontinuity.

### Gate D — media and technical
- no missing/corrupt frames or streams;
- correct resolution, FPS, duration, codec and audio layout;
- captions cover actual speech;
- narration, SFX and music are synchronized and mixed;
- checksum and render provenance recorded.

### Gate E — human perceptual review
- watch the moving film, not only contact sheets;
- inspect representative frames before, during and after critical actions;
- review audio perceptually;
- unresolved P0/P1 issues block delivery;
- creative approval is distinct from CI success.

## 8. Repository layout target

The repository should evolve toward a clean separation such as:

- docs — north star, architecture decisions, research, state and handoffs.
- packages/film-ir — Film IR types, schema, validation and migrations.
- packages/time — rational FPS, frame/sample conversion and timing tests.
- packages/scene-runtime — stage graph, node transforms and deterministic evaluation.
- packages/animation — choreography, tracks, interpolation and constraints.
- packages/actors — character rigs, actions, poses and contact.
- packages/education — math/science diagrams and typed visual primitives.
- packages/audio — cue model, alignment, mixing helpers and validation.
- packages/render-adapters — Remotion, Manim, Motion Canvas, Rive and later backends.
- packages/qa — schema, story coverage, image, motion, audio and media checks.
- examples/benchmark-film — canonical vertical-slice project.
- tests/fixtures — deterministic test scenes and expected outputs.

This is a target layout, not a requirement to create empty directories immediately. Add packages only when a vertical slice requires them.

## 9. Architecture decisions still open

The first 2D adapter is provisionally selected in [ADR-0001](adr/ADR-0001-motion-canvas-first-2d-runtime.md). Remaining decisions require implementation evidence:

- the exact Film IR schema/version and adapter capability contract;
- whether Manim scenes should be compiled from semantic Film IR diagram nodes or remain separately authored specialist scenes;
- whether Rive adds enough rigging value to justify another adapter and licensing surface;
- whether the H2 rig in the prior Nolane-x/video repository has clean provenance/reuse rights;
- whether a custom NEE-owned renderer or stage runtime is justified by a measured gap after the actor/diagram vertical slice;
- the audio/sample-time model and word-level caption representation.

Do not resolve these by guesswork or by counting features in README files. The next step is to build one small NEE-owned actor/prop/diagram vertical slice on the decided adapter, not to create every target package in advance.
