# M1 Candidate Status — The Spoon That Bends

**Snapshot:** 2026-11-26  
**Branch:** `m1/optics-benchmark`  
**Branch HEAD before this report:** `71691374f96b137f24fb8711609e338034a08d84`  
**Decision status:** OPEN — no master runtime selected.

## Executive status

M1 has a shared creative/scientific brief and executable candidates for Remotion, Motion Canvas and Manim. The benchmark validator checks frame schedule, narration references, Snell's law and canonical ray geometry.

| Candidate | What was actually verified | Current result |
|---|---|---|
| Remotion 4.0.547 | TypeScript check; 1,728-frame H.264 render; ffprobe confirms 1920×1080, 24 fps, 72.000 s; contact sheet reviewed | Technical render PASS; visual review remains in progress; no narration/SFX audio supplied |
| Manim Community Edition fork | Pinned fork install; 1920×1080, 24 fps scientific segment render; ffprobe and contact sheet/frame review | Scientific segment PASS; it is not a full-film candidate |
| Motion Canvas 3.17.2 | Dependency install; editor build/typecheck; editor invokes the official core image-sequence renderer; renderer lifecycle and frame-count audit | Renderer PASS: `RendererResult.Success`, last frame 1,728. First full run emitted 1,729 PNGs (frames 0–1,728) because the 72 s end boundary was inclusive; `project.meta` now ends at 71.9583333333 s to produce the required 1,728 samples (0–1,727). Exact-count verification is running in [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148) |

A workflow can be marked failed overall while its individual jobs succeed. In run [45835419773](https://github.com/Nolane-x/Nolane-video/actions/runs/45835419773), Remotion and Manim jobs succeeded; the Motion Canvas job failed. Do not describe the whole run as a clean pass.

## Shared benchmark contract

- Film: **The Spoon That Bends / Vì sao chiếc thìa trông như bị gãy trong nước?**
- 72 seconds, 1920×1080, 24 fps, 1,728 frames, Vietnamese text/narration plan.
- Six stable shots: hook, physical contradiction, optical reveal, refraction, apparent image, resolution.
- Shared storyboard: `benchmarks/optics-spoon/shared/storyboard.json`.
- Shared scientific geometry: `benchmarks/optics-spoon/shared/diagram.json`.
- Shared art direction, script and claim ledger live in the same `shared/` directory.
- `tools/validate_benchmark.py` and `tests/test_benchmark.py` enforce storyboard continuity and geometry. The validator workflow passed at commit `191d6f6b4e63f63edcbaed76fac1bc9bb1d2c07a`; rerun it before merging because the branch has continued to change.

### Scientific geometry

The canonical ray starts in water at 40° from the normal, crosses the horizontal water-air interface, and exits at approximately 58.935° from the normal. The observer is above the interface. The virtual backward extension lies on the same outgoing-ray line, and the apparent point is above the true point but remains below the water surface. All three implementations read the same `diagram.json`.

## Candidate evidence

### Remotion

- Pinned packages: Remotion and CLI 4.0.547; React 19.2.0; TypeScript 5.9.3.
- Successful output from run [45835419773](https://github.com/Nolane-x/Nolane-video/actions/runs/45835419773).
- Artifact: `m1-remotion-candidate`, artifact digest `sha256:d952ac40773e0e67f504afaebe74aa6a3c7dd327833ec9d7d8865261e4b5f1f7`.
- ffprobe: H.264, 1920×1080, progressive, 24/1 fps, exactly 72.000 s and 1,728 frames.
- Contact sheet reviewed. The six-shot progression is present. The design is still a vector prototype rather than approved film art; narration/SFX/music are not muxed. Check the water-region label and caption safe area at full resolution in the next visual QA pass.

### Manim

- Installed from `Nolane-x/manim` commit `18320e2f0feaf142b2c3a377068ddb44c82fb2a1`.
- The benchmark uses Manim only for S04–S05, which is its appropriate specialist scope.
- Successful artifact from run [45835419773](https://github.com/Nolane-x/Nolane-video/actions/runs/45835419773).
- Artifact: `m1-manim-refraction-segment`, digest `sha256:360165a33ae89e101b0aa055fdba88a99926ed943fed3f31f71b09bdfa4d4bbc`.
- Rendered 1920×1080 at 24 fps; duration 11.625 s. Contact sheet and final frame were reviewed. The eye, normal, true point, apparent point and rays fit the frame after coordinate-scale and label-layout revisions.
- This does not establish Manim as the master film timeline. It is a diagram adapter candidate.

### Motion Canvas

- Pinned 3.17.2 packages; Vite 5.4.19; Preact 10.19.2; Playwright 1.56.0; Node 22; Ubuntu 24.04 runner.
- The official editor project builds and typechecks. It uses Motion Canvas core's MIT image-sequence exporter and independent FFmpeg assembly.
- The optional Motion Canvas FFmpeg exporter declares GPLv3 and is deliberately not included.
- Headless editor automation reached the official Render control. Reduced-motion preference is applied to the editor UI only to avoid animated panel mount races; it does not change film animation.
- Early partial-render runs [45835419773](https://github.com/Nolane-x/Nolane-video/actions/runs/45835419773), [45836812915](https://github.com/Nolane-x/Nolane-video/actions/runs/45836812915) and [45839365206](https://github.com/Nolane-x/Nolane-video/actions/runs/45839365206) were caused by the Playwright script treating a missing `data-rendering` button attribute as completion and closing Chromium while the engine was still working. The script now waits for the engine's `renderer.onFinished` event.
- Run [45840319216](https://github.com/Nolane-x/Nolane-video/actions/runs/45840319216) proves the actual renderer completes: `RendererResult.Success`, `lastFrame: 1728`, renderer state returns to `Initial`. The audit received 1,729 unique export events, frames 0–1,728. This was a separate off-by-one caused by Motion Canvas treating the 72.0 s range endpoint as an included frame.
- Fix commit `31fd2997dce941be05b089e8066928eebc0f7dd3` moves the Motion Canvas end time to `71.95833333333333` s, the timestamp of frame 1,727 at 24 fps. The exact 1,728-frame rerun is [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148). Do not call Motion Canvas fully passed until that run uploads the MP4 and ffprobe validates it.

## Licensing and reuse constraints

- Motion Canvas public packages inspected are MIT-licensed. The first benchmark does not depend on its optional GPLv3 FFmpeg exporter.
- Manim Community Edition is MIT-licensed; the user's fork is pinned by commit for reproducibility.
- Remotion has a two-tier licensing model documented in the project reference study. The benchmark render is evaluation evidence, not a decision to redistribute or commercially embed Remotion. Recheck exact terms before product adoption.
- H2 source in `Nolane-x/video` has not been copied into this repository. Its provenance/license audit remains outstanding.

## What is not complete

- No final voice track, captions/audio alignment, SFX or music mix.
- No approved character acting, rigging, expressive performance or final art direction.
- Motion Canvas renderer has now completed a full 72 s run, but the first output contained one extra boundary frame; the half-open-range fix is awaiting CI proof and a complete MP4/ffprobe artifact.
- No H2 implementation.
- No complete scorecard, renderer decision or architecture decision record.
- No M2/M3 engine-wide implementation should begin until M1 acceptance is met.

## Immediate next action

Inspect run [45840831148](https://github.com/Nolane-x/Nolane-video/actions/runs/45840831148). It must finish with exactly 1,728 sequential PNGs (000000–001727), then pass 1920×1080 / 24 fps / 72.000 s ffprobe checks and upload the MP4/contact sheet. Review the contact sheet and moving sequence before scoring the candidate. Keep audio incompleteness explicit.
