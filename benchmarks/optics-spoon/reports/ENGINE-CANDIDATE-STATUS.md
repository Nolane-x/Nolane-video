## Latest technical and sampled-visual candidate — 2026-11-28 (candidate #185 / contract #55)

Candidate [#185](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076477) is the latest completed technical candidate. All three engine jobs passed on source SHA [`0d7e2d2`](https://github.com/Nolane-x/Nolane-video/commit/0d7e2d2256c4581fafd6eff9052b021b0d326d84). Contract [#55](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076436) passed 30 Python tests and benchmark validation (6 shots, 1,728 frames, 24 fps, canonical ray geometry consistent).

### Candidate #185 outputs

- **Remotion 4.0.547:** H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames; MP4 SHA-256 `288118afaa584bc75aca61e6375a54f6c481a17d1f87f33cf6befbfef915be87`; artifact [`15269760385`](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076477/artifacts/15269760385); ZIP digest `sha256:39dfe3a6945e8930bfde3d38b717812f5bf90846d22ba91f2d30d73eec4c4af7`. Parity test, type-check, render, ffprobe, contact sheet and upload passed.
- **Motion Canvas 3.17.2:** H.264, 1920×1080, yuv420p, 24 fps, 72.000 s, 1,728 frames; MP4 SHA-256 `8ec191e235ab28ca36477be47f9cef568a7175f0d26c50fef6ace0ba55c95882`; artifact [`15269635145`](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076477/artifacts/15269635145); ZIP digest `sha256:a6d077ca39523b548a02c1b77ddc0f04ad307900a1f8e99323bbc171b31416fb`. Official editor build, IK/grip tests, 1,728-frame render, ffprobe and upload passed; render report has zero browser errors and says audio was not supplied.
- **Manim CE 0.22.1:** H.264 1920×1080, 24 fps, 279 frames, 11.624674 s; artifact [`15268529534`](https://github.com/Nolane-x/Nolane-video/actions/runs/46160076477/artifacts/15268529534); ZIP digest `sha256:495ee1ea1c47b0d8539436d669eb7dd3357f18d84378745a25b567a0bad2426c`.

### S06 Remotion action parity repair

Commits: [`ebbc73a`](https://github.com/Nolane-x/Nolane-video/commit/ebbc73ad3ab16726111bcaf5803258171d22646b), [`d08616a`](https://github.com/Nolane-x/Nolane-video/commit/d08616a0c6d72c0499456dfd916e1d4269202b29), [`0d7e2d2`](https://github.com/Nolane-x/Nolane-video/commit/0d7e2d2256c4581fafd6eff9052b021b0d326d84).

Remotion now uses deterministic `s06MotionAt(globalFrame)` to reproduce the S06 sequence: straight spoon submerged diagonally at 64° → lifted clear of water at 14° → inspection at 20° → settle at 14°. These are renderer-space angles for Remotion's horizontal local prop, not a shared cross-engine angle convention. Grip brace, hand/wrist, arm endpoint, torso counterbalance, head and gaze are time-coupled. Frame windows align with Motion Canvas: brace 1493–1499, lift 1499–1519, inspect 1534–1540, settle 1540–1546; S06 begins at 1464 and the final camera push starts at 1546. Total film duration and storyboard schedule are unchanged.

Contract #55 verifies 30 Python tests and benchmark validation. Candidate #185 verifies Remotion parity/type-check and full render; Motion Canvas full render and Manim specialist segment also pass.

### Sampled visual review — not final creative approval

Both full-film contact sheets and paired native-resolution S06 frames at 1464, 1493, 1499, 1509, 1519, 1537, 1540, 1546, 1570 and 1727 were inspected.

- The submerged start, prop lift, inspection turn, settle and final hold occur in the expected order in both renderers; the wrist remains associated with the spoon in sampled images, with no obvious frame-edge crop.
- Nia's design and the kitchen composition still differ visibly between renderers. At the final sampled frame, Remotion is almost black while Motion Canvas remains visible; reconcile both against the storyboard's “fade to quiet end frame”.
- Review was limited to contact sheets and selected still frames. No continuous 24-fps playback, mobile-size typography test or creative sign-off has been completed.
- Both full-film files are silent; no approved VO, transcript synchronization, SFX/music or audio QA is present.

### Historical technical baseline

Candidate [#175](https://github.com/Nolane-x/Nolane-video/actions/runs/46142711137) / contract [#53](https://github.com/Nolane-x/Nolane-video/actions/runs/46142711123) is superseded by #185/#55. Earlier CI trigger optimization candidate [#178](https://github.com/Nolane-x/Nolane-video/actions/runs/46158578572) passed; report-only docs no longer trigger candidate rerenders.

---
