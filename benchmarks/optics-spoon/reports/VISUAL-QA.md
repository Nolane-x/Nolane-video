# M1 Visual QA — The Spoon That Bends

**Review date:** 2026-11-27  
**Latest reviewed candidate run:** [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231). All three candidate jobs passed in this run.  
**Review scope:** contact sheets and selected 1920×1080 still frames. This is prototype visual QA, not final creative approval; full continuous-motion, narration and audio review remain open.

## Remotion 4.0.547 — full-film candidate

Artifact: `m1-remotion-candidate`  
Artifact digest: `sha256:4ebbeecc977c377910eed47949d4eb5271f22f6cb90aeecbeff94f9000e6cc7e`  
Output: H.264, 1920×1080, progressive, 24/1 fps, 72.000 s, 1,728 frames.

### Passed

- The six-shot progression is present: hook, physical contradiction, optical reveal, refraction, apparent image and resolution.
- The water/air boundary, normal, 40° incident angle, approximately 58.9° refracted angle, Snell relation, true point and apparent point use the canonical scientific model.
- The “NƯỚC” label safe-area correction from commit `e5e0259ca2c517858511dcaf11a70edb40f640ea` is present; it no longer sits under the lower caption bar.
- The physical straight spoon is shown as distinct from the apparent kink.

### Still below the target

- Nia remains a geometric vector blockout. The hand/finger articulation, visible grip, weight transfer and expressive performance are not production quality.
- Hand/prop interaction does not yet demonstrate anticipation, contact, lift, release and follow-through.
- Camera movement and transitions are functional rather than cinematic.
- Bottom copy is explanatory per-shot text, not transcript captions synchronized to real speech. No VO/SFX/music track exists.

**Judgement:** technical and scientific-diagram prototype pass. Acting, audio and final art direction are not approved.

## Motion Canvas 3.17.2 — full-film candidate

Artifact: `m1-motion-canvas-candidate`  
Artifact digest: `sha256:daa9b3a5501a001d1f34af7b19bd6000cbaf3d8d831db30d79beefbe809a9a2d`  
MP4 SHA-256: `8b6d7c9f388c5660b2594105ba0dcfa0e9a2ed1248262daea140048dbd40220d`  
Contact-sheet SHA-256: `d88fc57c6d7452a5e720cecc7afca84ee167ddb2c74f3157bdd7d84df4070a03`  
Output: H.264, 1920×1080, yuv420p, 24/1 fps, exactly 1,728 frames, 72.000 s. Report records zero browser errors.

### Passed

- Run [45943879530](https://github.com/Nolane-x/Nolane-video/actions/runs/45943879530) proved the complete exact-range render, and run [45944266231](https://github.com/Nolane-x/Nolane-video/actions/runs/45944266231) passed again with the angle-label layout correction.
- Renderer: `RendererResult.Success`; last included frame 1,727; 1,728 export events, 1,728 unique frames, 1,728 sequential PNG files.
- ffprobe confirms H.264, 1920×1080, 24 fps, 72.000 s and 1,728 frames.
- The “NƯỚC”/“KHÔNG KHÍ” labels remain legible, and the diagram is consistent with canonical geometry.
- The 40° and 58.9° labels have been moved clear of the physical ray paths in source commit `3a091f4fe5eec706014aadfb42f17679752ea733`; contact sheet and frame 1152 in run 45944266231 confirm the correction.
- The runner no longer hangs after export. Commit `ad8fc14a848b02a61d7b76fb916ab4bfb0942e14` starts Vite directly in a process group and awaits its termination, so CI proceeds through ffprobe and candidate upload.

### Still below the target

- The character/arm is a geometric blockout. The arm is one static stroke without a hand or fingers; grip/contact continuity is not convincing.
- The spoon is represented by toggling bent and straight line segments, not a fully acted lift/re-dip action with articulated contact.
- Camera choreography is limited; the diagram transition is primarily a crossfade.
- Some small diagram labels should still be checked on mobile/reduced-size output.
- No real audio is included, and caption/speech synchronization is not tested.

**Judgement:** full-film technical pass and diagram-layout pass. Character acting, prop contact, cinematic camera work and audio are not approved.

## Manim CE fork — S04/S05 specialist diagram

Artifact: `m1-manim-refraction-segment`  
Artifact digest: `sha256:b70d75224e904f4d04719f6f7388bb973cbd239016b8a2f265f024f09a097c36`  
MP4 SHA-256: `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`  
Output: H.264, 1920×1080, 24/1 fps, 279 frames, 11.624674 s.

### Passed

- Horizontal water-air interface and perpendicular normal are clear.
- The incoming and outgoing ray directions are consistent with water-to-air refraction; 40° and approximately 58.9° are measured from the normal.
- The dashed backward extension and true/apparent points are semantically distinct.
- NEE Deep Ink/Water Slate/Ray Gold palette, DejaVu Sans and persistent water region are applied.
- Native-resolution final frame and contact sheet have been reviewed; the Vietnamese labels and Snell formula are legible.

### Still open

- The initial build is progressively revealed and begins sparsely. Its timing must be judged with a real VO track.
- Formula text uses Manim's vector text fallback rather than LaTeX. Keep mathematical glyphs correct if the typography changes.
- Manim is a specialist diagram adapter, not a comparable full-film candidate.

**Judgement:** specialist scientific geometry and style pass. Audio and full-story role are not tested.

## Cross-engine conclusion

- Remotion and Motion Canvas both pass a silent 72-second full-film technical render.
- Manim passes the 11.624674-second specialist scientific segment.
- The full-film candidate visuals remain prototype-level. None yet demonstrates NEE's target character performance, believable prop contact, polished camera language, final audio or word-level caption synchronization.
- This review uses contact sheets and selected still frames; continuous-motion review is still required.
- No master runtime is selected in this QA report. See `docs/M1_SCORECARD.md`, `docs/ANIMATION_CRAFT_STANDARDS.md` and the renderer strategy ADR.
