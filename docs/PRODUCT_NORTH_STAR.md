# Product North Star

**Status:** Foundational product specification, v0.1  
**Date:** 2026-11-26  
**Working name:** Nolane Explainer Engine (NEE)

## 1. One-sentence mission

Build the best code-first production engine for **story-driven, narration-led educational animation**: a system that turns a researched idea into a visually coherent, mathematically trustworthy, emotionally engaging explainer film through precise 2D/2.5D staging, expressive character action, diagrams, voice-over, sound design, and reproducible rendering.

This is a focused engine, not a universal video tool.

## 2. Why this product should exist

General-purpose video tools optimize for breadth: many formats, many asset types, many templates, and many use cases. This project optimizes for one demanding form:

A film must explain an idea that the audience cannot directly see. It must translate abstraction into visible relationships, physical action, geometry, change, scale, evidence, and consequence. The visuals must be accurate enough to teach, yet compelling enough to keep the audience watching.

The difficulty is not merely generating frames. The system must coordinate:

- a sound argument and a satisfying narrative arc;
- scientific and mathematical correctness;
- a stable visual language across many scenes;
- actors and props that move with weight, intention, and contact;
- diagrams that transform meaningfully rather than decorate the screen;
- camera and composition that guide attention;
- voice-over, pauses, captions, music, ambience, and sound effects;
- an editable source project that can be revised without rebuilding the whole film.

The engine should make this kind of work repeatable for a small human-led team, with AI doing research, planning, drafting, coding, and quality-control assistance while people approve creative and factual decisions.

## 3. The creative ambition

The target combines three complementary forms of excellence.

### 3.1 Visual explanation — study Median

Study how Median turns abstract concepts into an ordered visual argument: introduce a question, create a point of confusion or tension, reveal an intuitive model, make the key transformation visible, and resolve the original question.

Important lesson: the image should explain the narration, not simply decorate it. A graph, equation, object, character, or metaphor must have a clear teaching purpose.

The Median join-us page publicly says its production source includes animation code, scripts, voice recordings, SFX and background music, and that the team uses the source in its own publishing workflow. The repository itself is access-controlled; this project does not claim to have inspected it.

### 3.2 Character action and animation craft — study Alan Becker

Study animation craft demonstrated by Alan Becker and the public production material around his work:

- story and ending before detailed animation;
- action that communicates without depending entirely on dialogue;
- clear silhouettes and readable poses;
- anticipation, timing, spacing, impact/contact, follow-through, and recovery;
- character intent expressed through posture, gesture, gaze, and timing;
- backgrounds and props that participate in the action;
- holds and pauses that make moments readable;
- production roles separated across writing, storyboard, animation, background, sound, editing, and coordination.

Do not copy a particular series' character design, exact staging, or visual identity. The objective is to learn principles of acting, motion, and production craft.

### 3.3 Technical precision and reproducibility — study the engines

- Remotion demonstrates component-based compositions, frame-based playback, nested sequences, browser-based rendering, media synchronization, and robust production tooling.
- Manim demonstrates mathematical object hierarchies, explicit animation objects, geometry, graphing, transformations, camera and rendering abstractions.
- Motion Canvas demonstrates generator-driven animation flow, concurrent animation tasks, signals, a 2D scene graph, camera control, and a live editor aimed at informative animations synchronized with voice-over.

We should learn from these systems without turning the product into a generic clone of any one of them.

## 4. Target audience and film format

**Primary audience:** viewers learning a difficult concept through a carefully produced animated explanation.

**Primary creator:** a small human-led production team using AI agents and code-first tools.

**Initial target film:**
- approximately 8–20 minutes when fully developed;
- primarily 16:9;
- 1080p delivery as the minimum quality benchmark, with higher resolutions considered after the pipeline is stable;
- 24 or 30 fps selected per project, with a rational timebase and frame-accurate timing;
- narration-led, with purposeful dialogue or character sounds where useful;
- 2D-first, with selective 2.5D depth and occasional 3D only when it clarifies the concept;
- many authored shots, not a single opaque generation.

**First engineering proof:** one complete 60–120 second sequence that exercises the entire pipeline. It should contain a hook, at least one explanatory transformation, one recurring character or consistent visual subject, one mathematically meaningful diagram or model, a motivated camera move, narration, captions, sound design, and a reviewed final render.

A short proof is a way to validate the engine, not a change to the long-form ambition.

## 5. Product principles

1. **Meaning before motion.** Every visual change must communicate information, action, emotion, scale, or transition.
2. **Story before polish.** The engine must preserve a coherent argument and a satisfying ending before visual decoration is added.
3. **Acting before rig complexity.** A technically sophisticated rig is useless if the pose, timing, gaze, and contact are unclear.
4. **Mathematical truth before visual spectacle.** Coordinate systems, units, equations, labels, scales, data, and physical relationships must be checked.
5. **One visual language per film.** Characters, environments, typography, color, line weight, lighting, and motion grammar must remain coherent.
6. **Audio is part of the scene.** Voice timing, pauses, SFX, ambience, and music must be planned with the action.
7. **Code is the editable source of truth.** Important scenes and timeline decisions must be inspectable, versioned, deterministic, and revisable.
8. **AI is a production department, not the filmmaker.** It proposes and implements; humans approve research, creative direction, and release quality.
9. **Quality is measured at the rendered frame and moving shot.** Tests and successful exports are necessary but not sufficient.
10. **Reuse craft, not protected expression.** Learn principles and public architecture; create original work.

## 6. What “stronger than Remotion” means here

This is an aspirational, domain-specific benchmark. It does not mean replacing every Remotion capability or supporting every kind of video.

NEE should eventually outperform a general-purpose timeline framework for the target workload on:

- **semantic authoring:** an AI can express a teaching beat, misconception, diagram, actor intention, contact event, and narration span as typed concepts rather than arbitrary JSX and timestamps;
- **visual explanation:** native primitives for equations, graphs, geometry, vectors, mechanisms, data, and transformations;
- **acting and choreography:** reusable 2D actors, pose libraries, gesture, gaze, anticipation, contact, follow-through, constraints, and controlled frame-by-frame overrides;
- **narration synchronization:** script spans, measured audio timing, pauses, emphasis, captions, and action cues share a common time model;
- **continuity:** characters, props, locations, palettes, and motifs maintain identity across a long film;
- **iteration:** changing one beat or shot can regenerate and re-review only the affected material while preserving downstream timing where possible;
- **quality gates:** a film can be checked for missing visual coverage, incorrect labels, unreadable text, action discontinuities, timing errors, audio issues, and style drift;
- **reproducibility:** the same inputs and pinned dependencies reproduce the same visual frames.

Do not claim superiority until these are benchmarked against a baseline project built with Remotion and at least one other relevant animation system.

## 7. Scope boundaries

### In scope
- Educational explainers and concept-led visual essays.
- Scientific, mathematical, technical, engineering, and carefully sourced knowledge topics.
- Character-led metaphors when they improve comprehension.
- Diagram-led and data-led sequences.
- Reusable characters, props, environments, motion recipes, and style bibles.
- 2D and selected 2.5D scene composition.
- Voice-over, music, SFX, captions, mastering, preview, render, and QA.

### Explicitly out of scope
- A general-purpose non-linear editor for every video format.
- A universal video generation API aggregator.
- Vlogs, podcasts, generic ads, UGC, music videos, sports edits, gaming clips, and arbitrary live action as first-class products.
- General 3D animation authoring as a core capability.
- A full replacement for Blender, After Effects, Adobe Animate, or Remotion across their entire domains.
- An autonomous publish-to-YouTube system.
- Building a huge agent swarm before the deterministic project model and engine interfaces exist.

## 8. Success criteria

The product is not successful because it has a large codebase or many agents. It is successful when it repeatedly makes better films with less rework.

### Quality
- A viewer can explain the central concept after watching the film.
- Every major claim is backed by sources or explicit derivation.
- Each shot has a documented visual purpose and a narration or story relationship.
- Character action reads clearly in silhouette and has believable anticipation, contact, follow-through, and recovery when the action requires them.
- Graphs and equations are accurate and readable at delivery resolution.
- Motion, camera, transitions, color, typography, and audio feel like one film rather than disconnected templates.

### Engineering
- The Film IR is versioned and schema-validated.
- The same pinned inputs produce deterministic scene frames.
- Timeline durations are frame-accurate; voice and sound cues are aligned to the actual audio.
- Individual shots can be rendered and reviewed independently.
- Incremental rendering avoids redoing unchanged shots where practical.
- A full build can be recreated from a documented commit and toolchain.
- The final package includes editable source, manifests, technical metadata, checksums, contact sheets, and a QA report.

### Process
- Every work session updates STATE and AI_HANDOFF.
- No major subsystem is added without a benchmark or a specific failure that justifies it.
- No framework is integrated without a source, license, maintenance, and operational assessment.

## 9. Decision rule

When choosing between a new feature and improving the existing system, prioritize the change that most improves the next benchmark film's:

1. comprehension;
2. visual storytelling and acting;
3. mathematical correctness;
4. continuity and art direction;
5. audio and pacing;
6. editability and iteration time;
7. rendering reliability.

A feature that does not improve one of these is not a priority for this project.
