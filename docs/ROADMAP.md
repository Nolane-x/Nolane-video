# Roadmap

**Current phase:** M1 — comparable benchmark and architecture decision (in progress)  
**Date:** 2026-11-26

The roadmap is deliberately milestone-based. Do not skip evaluation and benchmark work to create a large codebase before the core approach is proven.

## M0 — Product foundation and scope lock

**Goal:** make the product boundary impossible to misunderstand.

Deliverables:
- mission, target film format and quality bar;
- in-scope and out-of-scope list;
- architecture proposal with Film IR as renderer-independent source of truth;
- reference-engine and creator-workflow study;
- AI session rules and durable handoff;
- a roadmap with measurable gates.

Acceptance:
- a new AI session can identify the project target from README and AGENTS alone;
- every major framework is classified as a reference, benchmark candidate, or adopted dependency;
- no engine integration is claimed before testing;
- STATE and AI_HANDOFF reflect reality.

**Status: COMPLETE.** Foundation documents and scope lock exist.

## M1 — Comparable benchmark and architecture decision

**Goal:** determine the best initial runtime architecture through evidence.

Build one small educational sequence, 60–120 seconds, that includes:
- a compelling question or misconception;
- one character that performs a meaningful action;
- one mathematically/scientifically accurate visual transformation;
- at least one motivated camera move;
- narration, a pause, captions and synchronized sound;
- a coherent art direction and a resolved ending.

Candidate implementations:
1. Motion Canvas;
2. Remotion;
3. existing H2 engine from Nolane-x/video, after provenance/license audit;
4. Manim only for the math/diagram portions where appropriate.

Use the same story, source material, shot plan, voice track, and output settings for comparison.

Measure:
- time to author and revise;
- visual legibility and explanatory clarity;
- acting and contact quality;
- camera and scene composition;
- mathematical correctness;
- deterministic frame output;
- audio/narration synchronization;
- render and incremental render time;
- dependency footprint and operational friction;
- license and distribution suitability.

Acceptance:
- source and outputs are committed or released with hashes;
- every candidate has a technical report and visual review;
- limitations and missing capabilities are explicit;
- a written architecture decision names the first backend and which tools remain adapters;
- no engine-wide dependency choice is made solely on familiarity or number of features.

**Status: IN PROGRESS — technical benchmark and provisional adapter decision complete; creative acceptance remains open.** Run [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231) passed all three candidate jobs, and the full suite passed again in [45944799022](https://github.com/Nolane-x/Nolane-video/actions/runs/45944799022). Remotion and Motion Canvas each render the 72-second/1,728-frame silent film; Manim renders the specialist scientific segment. Motion Canvas is provisionally selected as the first 2D scene adapter by [ADR-0001](adr/ADR-0001-motion-canvas-first-2d-runtime.md), while Film IR remains renderer-independent and Manim/Remotion retain specialist/reference roles. The scorecard and visual QA are recorded. M1 remains open for full-speed continuous-motion review, acting/prop-contact improvement, approved audio/caption synchronization, repeatable authoring-cost measurements and the H2 provenance audit.

## M2 — Film IR and deterministic time foundation

**Goal:** define and validate the project contract before building broad authoring features.

Deliverables:
- versioned Film IR schema;
- IDs for project, beats, script spans, shots, actors, props, diagrams, assets, cameras, audio and captions;
- rational frame-rate and integer-frame time model;
- tested conversion between frames, seconds and audio samples;
- source/claim ledger and schema migration policy;
- validation errors with useful file and entity paths.

Acceptance:
- malformed timeline, missing asset, invalid duration, unknown node and broken references fail before rendering;
- test fixtures validate stable IDs and exact timing;
- same Film IR and pinned dependencies resolve to the same schedule.

## M3 — Specialist 2D stage, actors and educational visuals

**Goal:** provide native authoring abstractions that make this domain easier than a general video framework.

Priority order:
1. stage graph and coordinate transforms;
2. shapes, text, image assets and clipping;
3. camera and compositional constraints;
4. typed math/science visual primitives;
5. character rig, named poses and blending;
6. gesture, gaze and expression;
7. locomotion, prop interaction and contact;
8. anticipation, action, impact, follow-through and recovery;
9. secondary motion and authored overrides.

Acceptance:
- deterministic fixture scenes for every primitive;
- a character can perform a readable multi-step action with believable prop contact;
- a diagram can be animated without changing its underlying mathematical data;
- camera and stage transforms pass coordinate and safe-area tests.

## M4 — Narration-led production pipeline and quality gates

**Goal:** connect script, audio, timing, scenes and review.

Deliverables:
- research and claim dossier format;
- narrative beats, script and shotbook;
- style bible and asset provenance;
- narration/audio ingestion and word/phrase alignment;
- caption and SFX cue timeline;
- preview render, contact sheets and shot-level render;
- FFmpeg/ffprobe mastering and technical validation;
- QA report with factual, mathematical, story, visual, motion, continuity, caption and audio findings.

Acceptance:
- every script span maps to one or more shots;
- every shot documents visual purpose;
- captions cover actual speech;
- audio cues remain sample/frame aligned;
- technical pass and artistic approval are separately recorded.

## M5 — Long-form film production

**Goal:** demonstrate a complete 8–20 minute educational film without architecture collapse.

Acceptance:
- a fully sourced, coherent narrative arc;
- consistent art direction and recurring character identity;
- varied scene sizes and compositions;
- meaningful explanatory visuals rather than generic slide transitions;
- all mathematical/scientific diagrams checked;
- complete voice, captions, SFX and music;
- deterministic rebuild and incremental shot revisions;
- full moving-picture and audio review;
- source project, manifests, checksums, contact sheets, QA and handoff.

## M6 — Capability depth and performance

Only after a benchmark film is approved, prioritize depth:
- higher-quality rigging and deformation;
- expressive acting and interaction libraries;
- more diagram and visualization primitives;
- sophisticated 2.5D stage/camera;
- GPU acceleration and caching;
- parallel shot rendering;
- precise change propagation;
- render profiling and memory management;
- optional Rive or 3D adapters if evidence supports them.

## Work rules

- A milestone may be split into smaller reviewable pull requests.
- Each change must state which acceptance criterion it advances.
- Do not create empty scaffolding for future packages before a vertical slice needs them.
- Do not add new video genres or unrelated editor features.
- A new framework candidate must solve a demonstrated gap.
- Do not begin M2/M3 engine-wide implementation until the M1 benchmark comparison and architecture decision make the interfaces clear.
