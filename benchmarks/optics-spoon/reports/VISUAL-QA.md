# M1 Visual QA — The Spoon That Bends

**Review date:** 2026-11-27  
**Review scope:** contact sheets and selected native-resolution frames from successful candidate run [45943879530](https://github.com/Nolane-x/Nolane-video/actions/runs/45943879530), plus the earlier scientific frame review. This is a prototype QA report, not final creative approval.

## Remotion 4.0.547 — full-film candidate

Artifact: `m1-remotion-candidate`  
Artifact digest: `sha256:18712527a3c4cb5ec10790c31dd3db296aa418774783588a8a8a98c263ab6903`  
Output: H.264, 1920×1080, progressive, 24/1 fps, 72.000 s, 1,728 frames.

### Passed

- The six-shot progression is present: hook, physical contradiction, optical reveal, refraction, apparent image and resolution.
- The water/air boundary, normal, 40° incident angle, approximately 58.9° refracted angle, Snell relation, true point and apparent point are represented from the shared scientific model.
- The “NƯỚC” label safe-area correction from commit `e5e0259ca2c517858511dcaf11a70edb40f640ea` is verified in the current artifact: it no longer sits under the lower caption bar.
- The spoon is shown as a bent optical appearance and then as a straight physical object.

### Still below the target

- Nia is a simple geometric blockout. There is no persuasive hand/finger articulation, visible grip, weight transfer or detailed facial performance.
- The hand/prop relationship is not convincingly animated through anticipation, contact, lift, release and settle.
- Camera language and scene transitions are functional rather than cinematic; the move into the diagram is a quick crossfade.
- The bottom line is an explanatory per-shot caption, not a transcript aligned to real spoken Vietnamese. There is no VO/SFX/music track.

**Judgement:** technical and diagram prototype pass. Acting, contact continuity, audio and final art direction are not approved.

## Motion Canvas 3.17.2 — full-film candidate

Artifact: `m1-motion-canvas-candidate`  
Artifact digest: `sha256:19c770d1cff47e1a11d7b6ffefacbb457004724542a5f052f5a01343b82c982d`  
MP4 SHA-256: `2cda419f879a99a06b17453bc33232ecc43d4c3bedd648d2be77b5ad2ae18acd`  
Contact-sheet SHA-256: `ee0de3d39c0d9b06942830262ce7ccaea343416d5e9bebbcb6c8185590504a41`  
Output: H.264, 1920×1080, yuv420p, 24/1 fps, exactly 1,728 frames, 72.000 s. Render report has zero browser errors.

### Technical result

Run [45943879530](https://github.com/Nolane-x/Nolane-video/actions/runs/45943879530) passed all three candidate jobs. The Motion Canvas renderer log records `RendererResult.Success`, `lastFrame: 1727`, `exportEvents=1728`, `uniqueFrames=1728` and `PNG files=1728/1728`. The official ffprobe step also passed.

The render script had previously kept Actions alive after producing the MP4 because it killed only the `npm` wrapper and left Vite/esbuild descendants running. Commit `ad8fc14a848b02a61d7b76fb916ab4bfb0942e14` launches Vite directly in its own process group and waits for the group to terminate. The run now exits successfully and uploads the candidate, diagnostics and MP4.

### What works

- All six shots exist in the same frame schedule as the Remotion candidate.
- The diagram uses the canonical interface, rays, normal, true/apparent positions and the same NEE semantic colors.
- The “NƯỚC” and “KHÔNG KHÍ” region labels are clear in the native-resolution review.
- The transition from the kitchen to the diagram and return to the intact spoon gives the short an understandable overall structure.

### Visual defects and current correction

- The 40° and 58.9° labels are too close to, and partially intersect visually with, the ray lines in the reviewed frames. Source commit `3a091f4fe5eec706014aadfb42f17679752ea733` moves both labels away from the lines and relocates “Pháp tuyến”. The confirming render is running in [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231); do not mark that correction approved until its new contact sheet/frame is inspected.
- The geometric character/arm remains a blockout. The arm is a single static stroke without a hand/grip, so the prop-contact standard is not met.
- The spoon's apparent bend is represented by a segmented line, then replaced by a straight line; there is no convincing lift/re-dip animation showing the physical action.
- Several explanatory labels are readable at 1080p but look crowded around the diagram's center at reduced scale. Verify after the safe-area/angle-label correction.
- No real audio is included and no speech/caption timing has been tested.

**Judgement:** technical full-film pass; visual clarity is promising but still prototype-level. Character acting, prop contact, camera craft and audio are not approved.

## Manim CE fork — S04/S05 specialist diagram

Artifact: `m1-manim-refraction-segment`  
Artifact digest: `sha256:d33772298acaabfe6eeb1506758d625e888b267674bdf5155a3789af60859c63`  
MP4 SHA-256: `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`  
Output: H.264, 1920×1080, 24/1 fps, 279 frames, 11.624674 s.

### Passed

- The water-air interface is horizontal and the normal is perpendicular to it.
- The incident and refracted ray directions are consistent with water-to-air refraction; 40° and 58.9° are measured from the normal.
- The dashed backward construction, true point and apparent point are distinct.
- The style update uses the NEE Deep Ink/Water Slate/Ray Gold palette, DejaVu Sans and a persistent water region. The final native-resolution frame has good contrast and clear Vietnamese typography.
- The formula and refractive-index values fit within the 1080p canvas.

### Still open

- The opening builds the diagram progressively and is sparse. That may be appropriate when synchronized to narration, but must be reviewed with a real voice track before approval.
- The formula is rendered with Manim's vector text fallback rather than a LaTeX pipeline. It is legible in the reviewed final frame; ensure math glyphs remain correct if the typography changes.
- Manim is only the specialist diagram adapter in this benchmark, not a comparable 72-second story/acting candidate.

**Judgement:** scientific geometry and the revised visual style pass for this specialist segment. Audio timing is not tested.

## Cross-engine conclusion

- Remotion and Motion Canvas both have a complete silent 72-second technical render.
- Manim has a successful 11.625-second specialist scientific segment.
- The reviewed images remain prototype-level. Neither full-film candidate currently demonstrates the character acting, prop-contact continuity, expressive timing, camera language or voice synchronization required for NEE's final quality target.
- Full continuous-motion review is still required; this report primarily records contact sheets and selected still frames.
- No master runtime is selected in this report. See `docs/M1_SCORECARD.md` for the evidence ledger and `docs/ANIMATION_CRAFT_STANDARDS.md` for required creative review criteria.
