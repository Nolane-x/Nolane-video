# M1 Benchmark Specification — The Spoon That Bends

**Version:** 0.1  
**Date:** 2026-11-26  
**Status:** Candidate #171 and contract #52 verify the current cross-renderer build and 30-test contract; the latest source update aligns progressive S05 caption cues across Motion Canvas and Remotion. The latest visually reviewed candidate remains #167; creative, anatomy, audio and performance acceptance remain open.

## 1. Purpose

M1 is a controlled experiment to determine which existing runtime should become the first execution backend for Nolane Explainer Engine (NEE), and which capabilities need to be built natively.

The benchmark is not a popularity contest and not a feature-count comparison. It compares how well candidate systems support one representative NEE workload: a narration-led educational film that combines character performance, a physical setup, a visually rigorous scientific explanation, camera direction, typography, and reproducible rendering.

## 2. Benchmark film

**Title:** The Spoon That Bends  
**Vietnamese title:** Vì sao chiếc thìa trông như bị gãy trong nước?  
**Subject:** Refraction at a plane air-water interface and apparent position.  
**Audience:** General secondary-school learner with basic familiarity with light.  
**Target duration:** 72 seconds.  
**Master format:** 1920×1080, 24 fps, 16:9, progressive, sRGB.  
**Total frames:** 1,728.  
**Language:** Vietnamese narration and on-screen copy.  
**Visual form:** original character-led 2D educational film with selective diagrammatic/2.5D transitions.  
**Sound:** benchmark script includes narration and timed SFX/music cues; no external voice is synthesized or assumed. The first renderer spike may use a scratch track or silent output where a licensed/approved Vietnamese voice asset is not available. Such output must be marked as an audio-incomplete preview, not a finished film.

### Learning objective

After watching, a learner should be able to explain why a straight object partially submerged in water appears displaced at the water surface: light from the submerged part is refracted as it exits water into air, and the eye traces the outgoing rays backward in straight lines, locating the apparent image closer to the surface.

### Misconception to resolve

The spoon itself appears bent or the water physically bends the spoon. The film must show that the spoon remains straight and that the apparent displacement is caused by refraction and image formation.

### Scientific claims and constraints

- The relevant boundary is water to air.
- Angles are measured from the normal, not from the water surface.
- For visible light in fresh water near 20°C, use n_water ≈ 1.333; for air, n_air ≈ 1.0003. Values are approximate and depend slightly on wavelength and conditions.
- Snell's law: n_water sin(theta_water) = n_air sin(theta_air).
- For a ray exiting water into air, the refracted ray bends away from the normal.
- With theta_water = 40°, the corresponding theta_air is approximately 58.9° using the stated indices. Use this as a diagram example only; do not imply every ray in the spoon scene has this exact angle.
- The apparent image point is obtained by extending the refracted ray backward into the water. It is not a second physical spoon and not the actual location of the submerged tip.

Primary sources:
- OpenStax College Physics, 25.3 The Law of Refraction: https://openstax.org/books/college-physics/pages/25-3-the-law-of-refraction
- OpenStax University Physics Vol. 3, 2.3 Images Formed by Refraction: https://openstax.org/books/university-physics-volume-3/pages/2-3-images-formed-by-refraction
- OpenStax Physics, 16.2 Refraction: https://openstax.org/books/physics/pages/16-2-refraction

## 3. Story spine

1. Show an apparent contradiction: a straight spoon looks kinked at the waterline.
2. Prove the spoon itself is straight by lifting it out.
3. Ask what changed and shift the viewer's attention from the object to the light path.
4. Show a ray crossing the water-air boundary and bending away from the normal.
5. Show the eye extending that ray backward, producing a higher apparent position for the submerged part.
6. Return to the original spoon and resolve the misconception.

Every shot must change information, action, viewpoint, scale, or emotional state. No shot exists solely to fill time.

## 4. Shot timeline

The canonical, frame-accurate storyboard is benchmarks/optics-spoon/shared/storyboard.json. All ranges are half-open [start_frame, end_frame). At 24 fps, 1,728 output samples are frames 0–1,727, with timestamps 0 through 71.9583333333 seconds. The 72.0-second mark is the exclusive end boundary, not an additional frame. Renderers with inclusive time-range controls must target the timestamp of the final included frame.

| Shot | Frames | Time | Function | Visual requirement |
|---|---:|---:|---|---|
| S01 | 0–192 | 0–8 s | Hook | Nia dips a spoon; the submerged portion appears displaced at the waterline |
| S02 | 192–432 | 8–18 s | Contradiction | Nia lifts the spoon; it is straight, then dips it again |
| S03 | 432–672 | 18–28 s | Reveal cause | Camera moves to a cutaway of the glass and traces light from spoon to eye |
| S04 | 672–1056 | 28–44 s | Explain physics | Show the normal, incoming ray, refracted ray, angle labels and Snell's law |
| S05 | 1056–1464 | 44–61 s | Explain apparent image | Back-extend the refracted ray; show the apparent submerged point above the true point |
| S06 | 1464–1728 | 61–72 s | Resolve | Return to Nia and the intact spoon; conclude that light's path changed |

## 5. Candidate systems and their roles

### Full-scene candidates

- Motion Canvas 3.17.2: candidate for 2D scene graph, generator-based choreography, reactive signals, camera and voice-over-oriented explanatory animation.
- Remotion 4.0.547: baseline for frame-deterministic composition, timeline, React/SVG staging, media synchronization and automated CLI rendering.
- Existing H2 kit in Nolane-x/video: prior internal prototype, but use only after confirming provenance and reuse rights. Its public mirrored source is associated with a private Plugin Creator package and has no clear standalone license in the inspected folder. Do not copy it into this repository without a documented rights decision. It may be inspected as a prior-art reference only.

### Specialized math candidate

- Manim Community Edition: implement the mathematical ray-diagram sequence corresponding to S04–S05. Manim is not expected to reproduce the character-led opening and is evaluated as a specialist educational visualization renderer, not as a full narrative film engine.

### Excluded from implementation in M1

- Motion Canvas FFmpeg exporter: the upstream package currently declares GPLv3. Do not add it as a runtime dependency until its implications for NEE distribution are explicitly decided. The first benchmark should investigate the built-in image-sequence route and independent FFmpeg assembly instead.
- Blender and Rive: remain research candidates for later 2.5D depth or rigged character assets. They are not needed to answer M1's first backend question.
- Text-to-video APIs: excluded from this deterministic source benchmark.

## 6. Fairness protocol

Each full-scene candidate must receive:
- the exact same approved script;
- the same 72-second timeline and frame rate;
- the same storyboard and shot IDs;
- the same visual tokens and character reference;
- equivalent vector assets or assets drawn from the same source files;
- the same narration/audio files if supplied;
- the same output resolution and codec settings;
- the same required on-screen text and caption content.

Candidates may express their implementation idiomatically. They do not need identical internal code. Any difference in asset fidelity, animation detail, rendering quality, or missing feature must be documented rather than concealed.

Manim is assessed only on its math segment and on how cleanly it could supply that segment to a master timeline.

## 7. Metrics and scorecard

Score 1–5 with written evidence for each category. Do not invent numeric results before rendering and review.

| Category | Weight | Evidence |
|---|---:|---|
| Explanatory clarity | 20% | Can viewers explain why the spoon appears bent? |
| Character acting and interaction | 15% | Clear intention, gesture, hand/prop contact and reaction |
| Visual composition and camera | 10% | Hierarchy, framing, motivated camera and spatial continuity |
| Mathematical/scientific accuracy | 15% | Correct indices, angle conventions, ray direction and apparent image |
| Motion quality | 10% | Timing, anticipation, follow-through, easing and non-decorative movement |
| Typography and Vietnamese rendering | 5% | Diacritics, contrast, safe areas and reading duration |
| Timeline/audio integration | 10% | Exact frame schedule, cue model and audio alignment capability |
| Render reliability and reproducibility | 10% | Repeatable output, logs, checksum and failure behavior |
| Authoring and revision efficiency | 5% | Time and effort to change one beat without breaking the whole film |

Licensing, maintenance, install footprint, CI support and ecosystem risk are recorded as hard decision constraints, not hidden in the weighted artistic score.

## 8. Required benchmark deliverables

- shared script, storyboard and art-direction bible;
- research source/claim ledger;
- source code for every candidate that reaches implementation;
- pinned dependency versions and installation commands;
- exact render commands and CI logs;
- output media or image-sequence proof with SHA-256;
- ffprobe metadata and technical QA;
- contact sheets and reviewed moving sequences;
- scorecard with evidence and known gaps;
- architecture decision record stating one master timeline/backend and adapter boundaries;
- updated docs/STATE.md and docs/AI_HANDOFF.md.

## 9. Stop conditions

Do not choose a master backend if:
- the full-scene candidates have not rendered at least a representative moving proof;
- motion and typography have not been inspected at target dimensions;
- render/export automation is unknown;
- license obligations are unresolved;
- one candidate's missing implementation is being scored as an engine limitation without documenting the missing code;
- the same benchmark brief was not used across candidates.

A technically successful render is only one gate. The film must also pass scientific, narrative, visual, motion, caption and audio review.

## 10. Current status

The latest code/test commit is [`e6ce4a8`](https://github.com/Nolane-x/Nolane-video/commit/e6ce4a81659fe11bac54b450533863da36b79c6b). Candidate workflow [#171](https://github.com/Nolane-x/Nolane-video/actions/runs/46136144320) passes all three renderer jobs: Remotion 4.0.547 and Motion Canvas 3.17.2 each render the full 72-second / 1,728-frame film at H.264 1920×1080 / 24 fps; Manim CE 0.22.1 renders the 279-frame S04–S05 specialist segment. Contract CI [#52](https://github.com/Nolane-x/Nolane-video/actions/runs/46136144238) passes 30 Python tests and the benchmark validator. The latest source change synchronizes the progressive S05 captions across Motion Canvas and Remotion at frames 1056, 1099 and 1117.

Candidate #171 is the latest technical render, but the latest visually reviewed candidate remains #167. The outputs are not a final approved film: both full-film renders remain silent/video-only, and full-speed 24-fps playback, learning comprehension, organic hand/body anatomy and acting, S05 narration-led pacing, mobile typography, approved Vietnamese voice-over, transcript/audio synchronization, SFX/music, repeated authoring/revision measurements and H2 provenance/license review remain open. No overall artistic or performance ranking is assigned until comparable evidence and those reviews are complete.
