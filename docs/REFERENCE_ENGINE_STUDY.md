# Reference Engine and Creator Workflow Study

**Snapshot date:** 2026-11-26  
**Purpose:** identify ideas worth learning, boundaries, provenance, and license risks.

This document records public-source research and repository inspection. It does not claim access to Median's paid private repository or to any creator's private source files.

## 1. Median — target film form and production discipline

Public reference:
- Channel: https://www.youtube.com/@median-lab
- Join-us page: https://www.median-lab.com/join-us
- Example video — Calculus: https://www.youtube.com/watch?v=ptPvraS02Eg
- Example video — Mol: https://www.youtube.com/watch?v=jMGMRa55hfw

The public join-us page says Median's production repository contains animation source code used for its videos, scripts, voice recordings, SFX, and background music. It describes access as paid and time-limited or permanent depending on the plan. This confirms the source repository is not public source material that this project has inspected.

Public lessons to study:
- a repeatable source project can be the backbone of an entire channel;
- scripts, voice-over, visuals, SFX and music should be managed together;
- a specialized format and evergreen subject matter can be more valuable than indiscriminate daily output;
- AI should assist the process while people retain creative control;
- the public videos should be reviewed shot-by-shot to understand how narration, diagrams, visual metaphors and timing work together.

Research tasks for a future session:
- watch complete representative Median videos, not thumbnails alone;
- make a timecoded shot breakdown for at least one math video and one science video;
- mark each shot's narration span, visual purpose, graphic type, camera behavior, transition and sound events;
- separate direct observations from interpretation;
- do not attempt to reconstruct Median's private code or reuse its music/SFX assets.

## 2. Alan Becker — character action and animation production

Public references:
- Official channel: https://www.youtube.com/@alanbecker
- Behind the Scenes — Animator vs. Animation 4: https://www.youtube.com/watch?v=ptc7rGXp284
- Behind the Scenes — Animation vs. YouTube: https://www.youtube.com/watch?v=F74m1Bi9Trc
- Current production example with credits — The Machine, Animator vs. Animation 13: https://www.youtube.com/watch?v=l6WeJ9JqDfU
- Public newsletter archive mirror (secondary source): https://animatorvsanimation.fandom.com/wiki/Alan_Becker_Newsletter_Archive

### Directly observed public disclosures

The 2014 behind-the-scenes description says the production used Adobe Flash for animation, Premiere for editing, After Effects for effects/editing, a Wacom tablet for drawing, and Audacity for sound editing. This is a historical disclosure for that specific production, not proof of the team's current entire toolchain.

The 2017 Animation vs. YouTube behind-the-scenes transcript says the storyline was written with attention to the ending, and describes rebuilding portions of the browser/YouTube interface from screenshots and matching typography for the specific film. It also describes that specific film as largely one continuous flat shot. Do not generalize that one-shot approach to every film.

The 2026 The Machine video credits show a larger team with separate director/writer, storyboard artists, 2D animators, 3D animators, background modelers, painters, concept artists, SFX, music, editors, thumbnail artists, and production coordination roles.

The secondary newsletter archive reports a pipeline involving writing, beats, script, animatic, animation, background/asset implementation and audio. Treat it as a useful lead, but prefer direct official material when verifying current practices.

### Principles to translate into engine capabilities

- actions should have readable intent and clear silhouettes;
- use anticipation before important action;
- make contact and impact visible, then show follow-through and recovery;
- stage gaze, posture, gesture, weight and timing deliberately;
- animate props and environments as part of the action;
- use holds and pauses to make a moment readable;
- ensure the ending resolves the story's promise;
- separate writing, storyboard, animation, backgrounds, audio, editing and production review into artifacts and specialist responsibilities.

Do not copy Alan Becker's characters, scripts, source files, exact compositions, sound, or protected visual identity.

## 3. The user's existing source repositories

### 3.1 Nolane-x/remotion

Repository: https://github.com/Nolane-x/remotion  
Upstream: https://github.com/remotion-dev/remotion

Verified as a fork of remotion-dev/remotion. At the 2026-11-26 inspection, the fork's main commit was:
- 6951a4f4f72fa0e397ea91586aef1386bf2585bb

The upstream main commit observed shortly afterward was:
- 8d44faebf0b7720401a21334e1eda52f17ecafb8

The fork was therefore slightly behind the upstream snapshot at inspection time. Check the current upstream/fork relation before relying on this exact status.

The source tree is a large monorepo with packages for core, renderer, CLI, browser bundler, player, studio, media, audio, effects and more.

Useful architectural patterns observed:
- Composition is a declared unit with dimensions, FPS, duration and component;
- Sequence gives nested, frame-positioned and trimmed timeline segments;
- timeline state and frame seeking are handled in explicit contexts;
- audio/video tags are managed for preview/render synchronization;
- render flows separate bundling, rendering, progress and finalization;
- schema validation and integration tests are present around timing, media and compositions.

License note:
The fork's LICENSE.md describes a two-tier license. Individuals and qualifying small organizations may create videos and modify the software for their custom use, but copying or modifying Remotion code to sell, rent, license, relicense or sublicense a derivative of Remotion is disallowed under the free license. Larger for-profit companies may need a company license. Verify current terms before redistribution or commercial productization. Do not build a resold Remotion derivative by accident.

Recommendation:
Use Remotion as the primary general-rendering/timeline benchmark and a possible adapter. Do not assume that modifying the fork is the best path to a domain-specific educational animation engine.

### 3.2 Nolane-x/manim

Repository: https://github.com/Nolane-x/manim  
Upstream: https://github.com/ManimCommunity/manim

Verified as a fork of ManimCommunity/manim. At inspection, fork and upstream main pointed to the same commit:
- 18320e2f0feaf142b2c3a377068ddb44c82fb2a1

The source uses a scene model, Mobject hierarchy, explicit Animation objects, animation groups/sequences, transformations, updaters, graphing objects, Cairo rendering and OpenGL rendering.

Useful architectural patterns:
- mathematical objects are structured data, not just arbitrary pixels;
- transformations operate on objects and their subobjects;
- scene orchestration is explicit;
- updaters allow dependent geometry to follow changing values;
- graphing, coordinate systems, equations and 3D scenes are specialized capabilities;
- renderer choice is separated from the high-level scene/animation model.

The Manim Community Edition repository is MIT-licensed at the inspected upstream source. Preserve the copyright and license notices for any source used.

Recommendation:
Use Manim as the mathematical visualization reference and potential adapter. Do not make Manim's scene model the sole representation of a long-form narrative film.

### 3.3 Motion Canvas

Repository: https://github.com/motion-canvas/motion-canvas  
License observed: MIT.

Its README describes a TypeScript animation library built around generators and an editor with real-time preview, specifically aimed at informative vector animations synchronized with voice-over.

Source inspection found:
- GeneratorScene as a scene implementation controlled by generators;
- Thread objects that can execute child generators concurrently and track time;
- flow helpers for sequencing and parallel behavior;
- signals for reactive properties;
- a 2D scene graph with nodes and a camera;
- editor features for preview and inspection.

Why it matters:
Motion Canvas is arguably the closest existing open-source architecture to the desired authoring experience: code-driven 2D explanatory animation with voice-over synchronization and interactive preview.

Recommendation:
Make Motion Canvas a first-class benchmark candidate. Before adopting it, build one representative scene and compare it against Remotion and the existing H2 prototype. Evaluate the project's export, caching, text rendering, 2D acting, audio, preview, long-form orchestration and maintenance.

### 3.4 Existing Nolane-x/video production workspace

Repository: https://github.com/Nolane-x/video

This is a separate, established production workspace, not the new Nolane-video engine repository.

Public tree inspection found:
- a separate Remotion project under video-projects/remotion;
- an H2 SelfImprove Studio source mirror and production overlay;
- a small H2 2D Studio engine in JavaScript;
- an actor rig with named poses and pose blending;
- a browser-driven renderer using Playwright/Chromium and FFmpeg;
- story JSON, audio helpers, tool inventory, production skills, render workflows and handoff files.

The H2 prototype has potentially valuable ideas:
- a project frame/time context;
- interpolation and easing functions;
- deterministic seeded randomness;
- reusable palette/mood definitions;
- a joint-based character rig with named poses and blending.

Recommendation:
Treat it as a valuable prior prototype, not an automatically accepted foundation. Inspect its source manifest, upstream provenance, license and full render flow before migrating or adapting any file. Keep it separate from the new project until a migration decision is documented.

### 3.5 Rive runtime

Repository: https://github.com/rive-app/rive-runtime  
License observed: MIT.

The public runtime loads Rive artboards, advances state machines and animations, and draws through renderer abstractions with several GPU backends.

Potential fit:
- reusable character/prop animation assets;
- consistent authored rigs;
- state-machine controlled performances;
- vector rendering across platforms.

Limitations to validate:
- the runtime is not a full narrative film timeline;
- authoring/export workflows and .riv file creation need separate evaluation;
- free/editor/export constraints must be reviewed at adoption time.

Recommendation:
Keep as an optional rig/asset adapter candidate. Do not make it a core dependency before the benchmark.

### 3.6 Synfig Studio

Repository: https://github.com/synfig/synfig  
License observed: GPL-3.0.

Public project information describes vector and bitmap animation, automatic tweening, layer systems, bone rigs, filters/effects, HDRI color operations and sound support.

Potential learning:
- bone deformation and rig constraints;
- vector interpolation and time-based animation;
- layer and filter architecture.

License boundary:
Do not embed or copy Synfig code into a differently licensed core unless the resulting distribution is deliberately compatible with GPL obligations. Studying public concepts is different from copying source.

Recommendation:
Use as a technical reference for rigging and tweening, not as a v1 runtime dependency.

## 4. Selection matrix

| System | Strongest contribution | Best likely role | Main risk |
|---|---|---|---|
| Remotion | composition, timeline, browser rendering, media, production infrastructure | render backend and baseline benchmark | broad/general; license limits on reselling derivatives |
| Manim CE | mathematical object model and transformations | scientific/math adapter | not a complete narrative-film system |
| Motion Canvas | generator choreography, 2D scene graph, signals, live preview, narration synchronization | primary 2D runtime candidate | must test long-form editing, export and acting needs |
| Rive runtime | vector runtime and state-machine animation | optional character/prop runtime | authoring format and export workflow constraints |
| Synfig | bones, vector tweening and filters | reference or separate authoring tool | GPL-3.0 integration obligations |
| Existing H2 prototype | lightweight custom rig, pose library, seeded animation, browser capture | prior-art implementation to audit | current scope and provenance may not meet the new engine's architecture |

## 5. Research discipline

For every studied source:
- cite the exact repository, file, commit or public video;
- record observation separately from interpretation;
- record license, version and provenance;
- do not claim that a reference system has a feature merely because another system does;
- turn every adoption into a benchmark or an explicit decision record.

Next comparison:
Use one common 60–120 second educational benchmark scene across Remotion, Manim (where appropriate), Motion Canvas, and the existing H2 prototype. Compare clarity, acting, authoring effort, frame determinism, timing, text, audio, incremental render and output quality. Do not select a winner from feature lists alone.
