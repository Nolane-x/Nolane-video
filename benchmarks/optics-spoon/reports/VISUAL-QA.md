# M1 Visual QA — The Spoon That Bends

**Review date:** 2026-11-26  
**Review scope:** static contact-sheet and selected 1080p frame review of candidate artifacts from run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169). This is an early visual review, not final artistic approval.

## Remotion 4.0.547 — full film prototype

Artifact: `m1-remotion-candidate`  
Digest: `sha256:f829285a43711aed3a869bae9d93ede74d37c9561125a510ad2101e673d20b14`  
Technical metadata: H.264, 1920×1080, progressive, 24/1 fps, 72.000 seconds, 1,728 frames.

### What works

- The six-shot progression is present: everyday observation, spoon check, optical cutaway, Snell-law geometry, apparent image, and return to the spoon.
- At full 1080p, the water/air boundary, normal, 40° incident angle, 58.9° refracted angle and Snell formula are legible.
- The physical outgoing ray and dashed backward extension share the canonical geometry. The apparent point is above the true point but remains below the interface.
- S02 uses a straight spoon outside the water and visually distinguishes the physical object from the refracted appearance.

### Issues to fix

- The earlier “NƯỚC” label/caption overlap is fixed in the current artifact. Source moved its SVG baseline from y=970 to y=820 in commit `e5e0259ca2c517858511dcaf11a70edb40f640ea`; the current render's contact sheet and 1080p frames 1056 and 1248 confirm the label is now clear of the caption safe area.
- The character/acting remains a simple vector blockout. The gesture is readable at a glance but lacks distinct anticipation, wrist/finger articulation, grip continuity and expressive follow-through.
- The kitchen scenes use a limited number of poses and the transition to the ray diagram is a quick crossfade. This is acceptable for an engine smoke test, not the target cinematic quality.
- The on-screen bottom line is a per-shot explanatory caption, not a transcript synchronized to real speech. No real voice, SFX or music is included.
- The apparent-image shot has small labels that should be checked at normal viewing distance and on mobile output. Consider moving labels away from the ray if an editor's frame-size makes them hard to parse.

### Acceptance judgement

**Technical delivery:** PASS for the artifact above.  
**Educational diagram:** PASS for this prototype; the water label safe-area correction is visually verified.  
**Character acting / film craft:** prototype only; not approved as final film quality.  
**Audio/caption sync:** NOT TESTED; no actual audio asset exists.

## Manim CE fork — S04/S05 specialist diagram

Artifact: `m1-manim-refraction-segment`  
Digest: `sha256:a2fcf0ddda1cb40eb27bfd877b93be0c2d725d2162fd08926e1765cd416c77e4`  
Technical metadata: 1920×1080, 24 fps, 11.625 seconds.

### What works

- The water-air interface is horizontal and the normal is perpendicular to it.
- The incident and refracted rays are directed correctly; the outgoing angle is larger than the in-water angle.
- The dashed backward extension is clearly differentiated from the physical ray.
- True and apparent points are visually separated, with stable semantic colors.
- Eye, ray, labels and equation fit within the 1080p canvas after the coordinate scale and label placement fixes.

### Issues / scope

- Manim is used only for the mathematical sequence, not the character-led story. It should be assessed as a specialist visual adapter, not scored against Remotion/Motion Canvas for full-scene performance.
- The current contact sheet has a near-black background that does not match the shared Deep Ink/Water Slate art direction; a few opening frames are visually too empty before the ray appears.
- Default serif typography is inconsistent with the shared sans-serif typography brief, and the water-region label is low-contrast against black.
- The source was revised in commit `0a09f2ef4925dcd55734d38a8f455c1a54c0a6b5` to use the shared palette, a DejaVu Sans typeface and a persistent slate water region from frame zero. Its new render is pending in [45849998362](https://github.com/Nolane-x/Nolane-video/actions/runs/45849998362).
- The rendered formula currently uses a vector text fallback rather than a LaTeX rendering path. The formula is readable, but a production style pass must retain mathematical glyph legibility.

### Acceptance judgement

**Scientific geometry:** PASS for the current specialist segment. **Visual style:** needs the palette/font revision to be re-rendered and reviewed.  
**Full-film renderer:** NOT APPLICABLE to this M1 candidate role.  
**Audio/caption sync:** NOT TESTED.

## Motion Canvas 3.17.2 — exact-range render pending

Run [45840319216](https://github.com/Nolane-x/Nolane-video/actions/runs/45840319216) proved the renderer can finish with `RendererResult.Success`, but the inclusive 72-second endpoint produced 1,729 frames. Commit `31fd2997dce941be05b089e8066928eebc0f7dd3` moved the range end to `71.95833333333333` seconds, the final included frame timestamp. Run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148) was cancelled while still rendering. A new run [45842364169](https://github.com/Nolane-x/Nolane-video/actions/runs/45842364169) has Remotion and Manim jobs complete; Motion Canvas has passed setup/build and remains in its render step. The next run is waiting with the Manim style correction.

Do not assign a Motion Canvas visual score until the exact 1,728-frame MP4 and its contact sheet have been uploaded and inspected.

## Cross-engine conclusion

No master runtime has been selected. The evidence so far supports:
- Remotion as a viable deterministic full-film baseline;
- Manim as a strong specialist adapter for the mathematical sequence;
- Motion Canvas as a viable editor/runtime candidate whose exact half-open output range is under validation.

The current prototypes do not yet prove the product's final quality bar. A final comparison requires the same approved narration and audio cues, equivalent acting/asset effort, continuous-motion review, frame-level text legibility checks and revision-effort measurements.
