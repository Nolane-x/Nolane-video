# Animation Craft Standards — Nolane Explainer Engine

**Purpose:** define how NEE evaluates animation craft beyond whether a scene builds, renders or contains correct facts.  
**Scope:** original 2D/2.5D, character-led educational explainers.  
**Relationship:** this document operationalizes the craft ambition in `PRODUCT_NORTH_STAR.md` and the public reference study in `REFERENCE_ENGINE_STUDY.md`. It is not a recipe for copying Median, Alan Becker or another creator's protected characters, shots, visual identity or expression.

## 1. The governing rule

Every shot must communicate a deliberate change in story information, character intention, viewer understanding, scale or emotional state. Motion is not decoration. It must make intention, causality, weight, contact, attention or explanation easier to read.

A technically correct sequence can still fail this standard if it looks like a slide deck with moving icons, an unmotivated camera zoom, a puppet with disconnected props, or a collection of generic transitions.

## 2. Story and staging

Before animation begins, each shot must state:

- **Purpose:** what new information or emotional beat does this shot deliver?
- **Viewer attention:** what should the viewer look at first, second and third?
- **Character intention:** what does the character want, notice, test or realize?
- **Visual proof:** what visible action or transformation proves the idea?
- **Exit condition:** what changed enough for the next shot to be necessary?

A shot is not ready for animation when its purpose can only be explained by a long paragraph. The image should communicate its primary action quickly and survive a one-second thumbnail/readability check.

## 3. Character performance

A performance should be authored as an intentional sequence of poses and transitions, not a stream of unrelated keyframes.

1. **Attention:** eyes, head or body orientation establish what the character notices.
2. **Preparation:** anticipation or a small preparatory gesture makes the coming action readable.
3. **Action:** the body moves with a clear path, rhythm and target.
4. **Reaction:** the character responds to the result, rather than changing expression arbitrarily.
5. **Follow-through:** secondary parts settle after the main action.
6. **Hold:** the pose remains long enough for the viewer to read the result.
7. **Recovery:** the character returns to a motivated neutral pose or prepares the next beat.

Use silhouette, line of action, eye-line and pose contrast to keep the performance legible at the intended shot size. Avoid random head bobbing, constant blinking, generic waving, or facial changes that do not correspond to an emotional or cognitive beat.

## 4. Prop interaction and physical continuity

Any object a character touches becomes part of the performance system.

- Define the active hand, grip point, contact point and release condition.
- Keep hand and prop motion coupled while contact is maintained.
- A prop must not slide through the hand, teleport between fingers, change scale or rotate without a physical cause.
- Show preparation before lifting, pushing, dipping or releasing an object.
- Preserve mass and inertia: a heavy prop should not stop like a cursor; a light prop should not move as if attached to a rigid body when released.
- Respect constraints: a straight spoon remains straight; a glass stays fixed unless pushed; waterline and object contact remain coherent between shots.
- When contact changes, animate the separation clearly rather than allowing an unexplained jump.

For every important interaction, review at least the anticipation, contact, maximum-action and settle frames.

## 5. Timing, spacing and motion paths

- Store timing in integer frames and use deterministic curves. Never use wall-clock time for authored animation.
- Use anticipation, acceleration, deceleration, overshoot and settle only when they help explain intent or physical response.
- Vary timing according to the action: observation, hesitation, testing, impact, realization and diagram construction should not all share the same cadence.
- Hold important explanatory states long enough to be read. A correct diagram that flashes past is still a failed explanation.
- Keep arcs and pivot points consistent with the character's body and the prop's constraints.
- Do not add secondary motion that competes with the primary information.

## 6. Camera and editing

Every camera move must have a reason: reveal hidden information, follow an action, change scale, clarify spatial relationships or direct attention.

Prefer motivated reframing, purposeful push-ins, parallax and match cuts over generic zooms, random shake or continuous movement without a narrative function.

A transition must preserve or deliberately change spatial/time continuity. Use a crossfade only when the overlap is meaningful; do not use it as the default substitute for an edit decision.

## 7. Educational visualization

Educational imagery must be both visually elegant and scientifically honest.

- Build diagrams from canonical data, not independently typed coordinates in each renderer.
- Introduce elements in causal order. For refraction: interface, normal, physical incident ray, refracted ray, measured angles, backward extension, then apparent point.
- Keep semantic colors stable: physical ray, construction line, true position and apparent position must never exchange meanings.
- Never bend an object to represent an optical illusion; show the light path changing.
- Avoid implying that an illustrative angle is universal when it is only a worked example.
- Camera movement must not silently change the reference frame or angle convention.
- Give the viewer time to compare physical and apparent positions.

## 8. Art direction and readable typography

- Keep scene palettes, type, line weights and spatial rules coherent across candidate engines.
- Use the shared design tokens in `benchmarks/optics-spoon/shared/ART-DIRECTION.md`.
- Vietnamese diacritics must render correctly on Linux CI and at 1080p.
- Keep essential labels and equations editable/vector; avoid tiny bitmap text.
- Respect title, diagram-label and caption safe areas. Captions must not cover region names, key points, equations or character actions.
- A contact sheet is not enough to approve type: inspect selected frames at native 1920×1080 and at a reduced/mobile view.

## 9. Sound and narration

When an approved real voice/audio source exists:

- Map narration spans to the exact shots and frame/sample ranges they explain.
- Use intentional pauses before and after a conceptual reveal.
- Use sound effects to support physical action or attention, not to decorate every movement.
- Preserve dialogue clarity; music must not compete with narration.
- Captions should synchronize to actual speech, not simply repeat a hand-authored summary line.
- Keep audio acceptance separate from silent visual-render acceptance.

Until audio is supplied and synchronized, label the render **silent prototype**. Do not claim narration or audio QA from cue metadata alone.

## 10. Review gates

A shot passes only when its technical render and human review both pass.

| Gate | Reject when | Evidence required |
|---|---|---|
| Story purpose | The shot adds no new information or emotional beat | One-sentence purpose and storyboard |
| Staging/readability | Attention is ambiguous or the action is unreadable at normal view | Thumbnail and native-resolution frame |
| Performance | Pose changes are arbitrary, anticipation/reaction is missing, or the hold is too short | Continuous playback and key pose frames |
| Contact/continuity | Hand/prop slips, teleports, deforms or changes state without cause | Anticipation, contact, action and settle frames |
| Motion timing | Motion is uniform, mechanical or distracts from the idea | Continuous playback at intended frame rate |
| Camera/edit | Camera movement has no purpose or the cut breaks spatial logic | Shot-to-shot review |
| Educational truth | Geometry, labels or physical behavior are incorrect | Machine validation plus human diagram review |
| Typography | Diacritics fail, labels are too small or captions overlap important content | 1080p and mobile/reduced-size review |
| Audio | Speech, captions and effects are not aligned or intelligible | Final mixed audio/video playback |

A hard factual error, broken prop contact, unreadable essential label or unsafe caption overlap is a blocker; it cannot be averaged away by strengths elsewhere.

## 11. Benchmark review protocol

For each candidate:

1. Inspect the full contact sheet for pacing, shot variety, palette and visual hierarchy.
2. Watch the complete video at its intended frame rate; do not infer motion quality from still frames.
3. Scrub every important interaction at anticipation, contact, peak action and settle.
4. Inspect scientific frames at native resolution and reduced/mobile scale.
5. Record each defect with shot ID, frame range, severity, reproduction note and proposed repair.
6. Keep engine technical pass, educational correctness and artistic approval as separate statuses.

## 12. M1 current application

For **The Spoon That Bends**, the next acting improvement after engine output is stable is Nia's spoon interaction:

- gaze moves to the spoon/glass before the hand acts;
- grip visibly attaches to the handle;
- hand and spoon lift as one constrained action;
- spoon is shown straight outside the water;
- the re-dip is deliberate and readable;
- Nia's reaction follows the apparent kink;
- the diagram transition reveals light-path causality;
- the ending returns to the physical spoon and resolves the misconception.

Do not add extra camera motion or decorative particles as a substitute for these performance and explanatory requirements.
