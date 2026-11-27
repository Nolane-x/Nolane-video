# ADR-0001 — Select Motion Canvas as the First 2D Scene Runtime

**Status:** Accepted provisionally for the next implementation vertical slice  
**Date:** 2026-11-27  
**Decision scope:** first 2D/2.5D scene-execution adapter only; not a choice of a universal renderer or a claim of final visual superiority.

## Context

NEE needs a deterministic runtime for original, character-led educational explainer films. The first comparable implementation, **The Spoon That Bends**, is a 72-second / 1,728-frame / 1920×1080 / 24 fps film. Three candidates were exercised against the same six-shot script and canonical scientific geometry:

- Remotion 4.0.547 — full-film React-based candidate.
- Motion Canvas 3.17.2 — full-film generator/scene-graph candidate.
- Manim CE fork — S04–S05 specialist scientific visualization only.

The successful candidate workflow is [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231). All three jobs passed. The prior run [45943879530](https://github.com/Nolane-x/Nolane-video/actions/runs/45943879530) also proved that Motion Canvas can complete the exact 1,728-frame render and terminate the CI process cleanly.

The render contract is not a creative approval. Both full-film outputs remain vector blockouts with rudimentary character acting, incomplete prop contact and no real narration, synchronized transcript captions, SFX or music. Full-speed playback review and production-level acting remain open.

## Decision

Select **Motion Canvas 3.17.2 as the first 2D/2.5D scene-execution adapter** for the next NEE vertical slice.

This decision is provisional and deliberately narrow:

1. The **Film IR remains the source of truth**, independent of Motion Canvas, Remotion and Manim. Story, learning objective, timing, actors, props, diagrams, camera and audio cues must not become Motion Canvas-only data.
2. Motion Canvas is the first executable backend for the initial 2D scene runtime and choreography prototype. It is an adapter, not the NEE data model or the whole NEE architecture.
3. NEE-owned actor rigs, hand/prop constraints, educational primitives, continuity rules, review metadata and quality gates remain domain code. Do not assume Motion Canvas's primitive scene graph is already a production character-animation system.
4. Keep **Manim CE as an optional specialist adapter** for mathematical/scientific sequences where its semantic geometry and mathematical objects add value. Do not use it as the full-film story runtime.
5. Keep **Remotion as a benchmark and reference adapter**. Do not vendor its source or make it a production dependency until the intended legal entity, deployment model and exact license rights for NEE have been reviewed.
6. Do not vendor whole frameworks. Pin adapter dependencies and expose only the capabilities the Film IR needs.

## Evidence supporting the decision

### Motion Canvas

- Run [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231) passed all candidate jobs, including the Motion Canvas official editor build, exact render, FFmpeg assembly, ffprobe and upload.
- Renderer log: `RendererResult.Success`, last included frame 1,727, 1,728 export events, 1,728 unique frames and 1,728 sequential PNG files.
- Output: H.264, 1920×1080, yuv420p, 24/1 fps, 72.000 seconds, 1,728 frames. The render report records zero browser errors.
- The earlier process hang was fixed by starting Vite directly in a detached process group and waiting for the full process group to terminate; the successful job now exits normally.
- The angle labels were moved away from the ray lines and re-rendered successfully in the same passing run.
- The exact upstream v3.17.2 `LICENSE` file is MIT (blob SHA `b30f04e173f68773714b7d9e2652caecbeec53f9`). The optional Motion Canvas FFmpeg exporter is GPLv3 and remains excluded; the benchmark uses the core image-sequence exporter and an independent FFmpeg binary.

### Manim CE

- The pinned fork commit `18320e2f0feaf142b2c3a377068ddb44c82fb2a1` rendered the 11.624674-second S04–S05 segment at 1920×1080 and 24 fps; ffprobe passed in run [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231).
- The reviewed output correctly depicts the interface, normal, incident/refracted rays, angle convention, backward extension and apparent point.
- The fork's `LICENSE.community` and base `LICENSE` at the pinned commit are MIT. Its role is narrow and valuable; the benchmark does not show it is a replacement for the full-film story runtime.

### Remotion

- Remotion 4.0.547 also passed the full 72-second / 1,728-frame technical gate in run [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231). It remains a valuable deterministic baseline and an adapter option.
- The user's fork is pinned at `6951a4f4f72fa0e397ea91586aef1386bf2585bb`. Its `LICENSE.md` is a two-tier source-available license (blob SHA `b0ad889f2b3eaee020de507ca6e98f1f1b664c9d)), not MIT. The Free License permits eligible individuals and small companies (up to three employees) to create videos/images, including commercial output, and modify the software for their own use; it prohibits selling, renting, licensing, relicensing or sublicensing a derivative of Remotion. Organisations outside the Free License eligibility require a Company License. This does not ban ordinary use by an eligible individual, but NEE's intended distribution/automation model must be checked before embedding, redistributing or selling a Remotion-derived product.
- No legal conclusion is made here about the user's future entity or distribution model. Obtain a current license review or written clarification before commercial product adoption.

## Alternatives considered

### Remotion as the first runtime

Rejected for the first integration decision, not for technical merit. It passed the benchmark and remains an excellent baseline. Its React/composition and CLI workflow are mature, but the current license introduces product-structure constraints that must be understood before NEE builds a distributable engine around it. The benchmark also does not show better acting or educational quality from Remotion; its character/prop performance is still a blockout.

### Manim as the first full-film runtime

Rejected because its successful scope is a short scientific diagram segment. It is the right specialist tool for semantic mathematics and geometry, but the candidate does not establish the character-led story, acting, camera and environment workflow required for a full explainer.

### Build a custom renderer immediately

Deferred. No benchmark evidence yet justifies the engineering and maintenance cost of a custom renderer. NEE should first identify missing domain capabilities above the adapter boundary, then consider a custom subsystem only if a measured gap cannot be solved cleanly.

## Required implementation boundaries

The next vertical slice should:

- Define typed, versioned Film IR entities for project, learning objective, narrative beat, shot, script span, actor, prop, diagram, animation track, camera move, caption and audio cue.
- Use rational frame-rate metadata and integer half-open frame intervals. Motion Canvas's inclusive seconds-to-frame conversion must remain behind tested adapter logic.
- Convert IR to Motion Canvas scene descriptions through a narrow adapter package. The adapter must fail clearly on unsupported IR features rather than silently dropping them.
- Implement one NEE-owned reusable character rig with a hierarchical head/body/upper-arm/forearm/hand model, explicit grip/contact constraints, and deterministic pose/acting tracks.
- Implement an educational-diagram primitive layer sourced from canonical data, not duplicated hardcoded coordinates in each renderer.
- Produce a low-resolution preview workflow for iteration and a pinned full-resolution export workflow.
- Preserve the ability to render an equivalent project through Remotion for regression comparison where useful. Avoid making both frameworks hard dependencies of every package.

## Revisit conditions

Reopen this ADR after the next vertical slice, not merely after another identical technical render. Reassess if any of the following is true:

- Motion Canvas cannot support the required hand/prop constraints or deterministic incremental preview without invasive framework modifications.
- Authoring/revision time is materially worse than Remotion for the same acted scene.
- Full-speed review finds that Motion Canvas choreography cannot achieve the required timing, camera and continuity quality.
- License terms, dependency changes or deployment requirements materially change.
- A custom NEE-owned renderer demonstrates a measurable advantage and a sustainable implementation plan.

The next comparison must include repeated render timings on equivalent runners, authoring/revision time, deterministic output checks, full-speed human review, acting/contact quality, caption readability, audio synchronization and license/deployment costs.

## Consequences

**Positive**
- NEE can build its first actor/diagram/scene vertical slice without designing an entire renderer first.
- The core data model stays replaceable and does not inherit any one framework's composition API.
- Manim retains a clear specialist role; Remotion remains an independently useful benchmark/reference.

**Trade-offs**
- Motion Canvas editor automation and image-sequence export add browser/CI operational complexity.
- A first NEE-owned jointed Nia rig now exists in the benchmark adapter code, but it is still a minimal vertical slice, not a production skeletal system; articulated fingers and robust grip/contact constraints remain to be built.
- No final-film quality conclusion is made until voice, acting, camera and continuous motion are reviewed.

**This ADR does not mark M1 creative acceptance complete.** It authorizes Motion Canvas as the first implementation adapter while the narrative, acting, audio and quality gates remain active.
