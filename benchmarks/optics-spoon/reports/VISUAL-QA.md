# M1 Visual QA — The Spoon That Bends

**Review date:** 2026-11-26  
**Review scope:** static frame/contact-sheet review of the current candidate artifacts from run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148). This is an early visual review, not final artistic approval.

## Remotion 4.0.547 — full film prototype

Artifact: `m1-remotion-candidate`  
Digest: `sha256:0d893c6b19418e04fe31618766e0fbcc7d8712edfb42af4bd7852dbeabf032cc`  
Technical metadata: H.264, 1920×1080, progressive, 24/1 fps, 72.000 seconds, 1,728 frames.

### What works

- The six-shot progression is present: everyday observation, spoon check, optical cutaway, Snell-law geometry, apparent image, and return to the spoon.
- At full 1080p, the water/air boundary, normal, 40° incident angle, 58.9° refracted angle and Snell formula are legible.
- The physical outgoing ray and dashed backward extension share the canonical geometry. The apparent point is above the true point but remains below the interface.
- S02 uses a straight spoon outside the water and visually distinguishes the physical object from the refracted appearance.

### Issues to fix

- The “NƯỚC” region label is partially covered by the lower caption bar in S04–S06. Source fix moved its SVG baseline from y=970 to y=820 in commit `e5e0259ca2c517858511dcaf11a70edb40f640ea`. This source correction has not yet been re-rendered/reviewed.
- The character/acting remains a simple vector blockout. The gesture is readable at a glance but lacks distinct anticipation, wrist/finger articulation, grip continuity and expressive follow-through.
- The kitchen scenes use a limited number of poses and the transition to the ray diagram is a quick crossfade. This is acceptable for an engine smoke test, not the target cinematic quality.
- The on-screen bottom line is a per-shot explanatory caption, not a transcript synchronized to real speech. No real voice, SFX or music is included.
- The apparent-image shot has small labels that should be checked at normal viewing distance and on mobile output. Consider moving labels away from the ray if an editor's frame-size makes them hard to parse.

### Acceptance judgement

**Technical delivery:** PASS for the artifact above.  
**Educational diagram:** PASS with a minor label-safe-area correction pending rerender.  
**Character acting / film craft:** prototype only; not approved as final film quality.  
**Audio/caption sync:** NOT TESTED; no actual audio asset exists.

## Manim CE fork — S04/S05 specialist diagram

Artifact: `m1-manim-refraction-segment`  
Digest: `sha256:796002c68e32f584eb381a8753b14c01ba17b72c106593f7f729837bfb87d7c1`  
Technical metadata: 1920×1080, 24 fps, 11.625 seconds.

### What works

- The water-air interface is horizontal and the normal is perpendicular to it.
- The incident and refracted rays are directed correctly; the outgoing angle is larger than the in-water angle.
- The dashed backward extension is clearly differentiated from the physical ray.
- True and apparent points are visually separated, with stable semantic colors.
- Eye, ray, labels and equation fit within the 1080p canvas after the coordinate scale and label placement fixes.

### Issues / scope

- Manim is used only for the mathematical sequence, not the character-led story. It should be assessed as a specialist visual adapter, not scored against Remotion/Motion Canvas for full-scene performance.
- Initial frames reveal the diagram progressively and therefore contain a sparse/mostly empty composition. This is part of the reveal; review its timing together with the actual voice track before final approval.
- Typography uses the available vector text fallback rather than a dedicated LaTeX rendering path. The rendered formula is readable, but a production style pass should establish a consistent type system.

### Acceptance judgement

**Scientific diagram:** PASS for the current specialist segment.  
**Full-film renderer:** NOT APPLICABLE to this M1 candidate role.  
**Audio/caption sync:** NOT TESTED.

## Motion Canvas 3.17.2 — pending exact-range rerender

The previous run [45840319216](https://github.com/Nolane-x/Nolane-video/actions/runs/45840319216) confirms that the official renderer completed successfully at frame 1,728, but the image exporter produced 1,729 samples because an inclusive 72-second endpoint added frame 1,728.

Commit `31fd2997dce941be05b089e8066928eebc0f7dd3` changed the range end to the timestamp for frame 1,727 (`71.95833333333333` seconds). Exact-count render and ffprobe validation are in run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148), currently in progress at the time of this review.

Do not assign a Motion Canvas visual score until the exact 1,728-frame MP4 and its contact sheet have been uploaded and inspected.

## Cross-engine conclusion

No master runtime has been selected. The evidence so far supports:
- Remotion as a viable deterministic full-film baseline;
- Manim as a strong specialist adapter for the mathematical sequence;
- Motion Canvas as a viable editor/runtime candidate whose exact half-open output range is under validation.

The current prototypes do not yet prove the product's final quality bar. A final comparison requires the same approved narration and audio cues, equivalent acting/asset effort, continuous-motion review, frame-level text legibility checks and revision-effort measurements.
