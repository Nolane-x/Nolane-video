## Latest technical and sampled-visual candidate — 2026-11-28 (candidate #175 / contract #53)

This is the latest technical candidate and latest **sampled** visual review. It supersedes candidate #171's technical snapshot, but does not represent continuous 24-fps review or final creative approval.

- Camera-parity source commit: [`0425437`](https://github.com/Nolane-x/Nolane-video/commit/042543767e68b2003b1218ece001185203202286), `feat(m1): align Remotion camera push-ins with Motion Canvas`.
- Candidate [#175](https://github.com/Nolane-x/Nolane-video/actions/runs/46142711137): Remotion 4.0.547, Motion Canvas 3.17.2 and Manim CE 0.22.1 jobs all **success**.
- Contract [#53](https://github.com/Nolane-x/Nolane-video/actions/runs/46142711123): **30 Python tests passed**, benchmark validator passed, `duration_frames=1728`.
- Remotion: H.264, 1920×1080, 24/1 fps, 72.000 s, 1,728 frames. Type-check, parity test, render, ffprobe and upload passed. MP4 SHA-256 `775152a8a1f6e5f0cd8c4745c9522db95a907e828204c158e11cad03bd074f4e`; artifact `15262995737`; ZIP digest `sha256:bcf7336cd6ee3ca89c2840b26036747c92d993d16ea40b6151a05f78842d8ce6`.
- Motion Canvas: official editor build, IK/grip runtime tests, 1,728-frame render, H.264 1920×1080, 24/1 fps, 72.000 s; ffprobe and upload passed. Logs record 1,728 PNGs and no browser/render errors. MP4 SHA-256 `8ec191e235ab28ca36477be47f9cef568a7175f0d26c50fef6ace0ba55c95882`; artifact `15263075327`; ZIP digest `sha256:f44a2a41a1d4643d3a621851f29fa1b0de5958fccac0a06047527d9386f9f387`.
- Manim: H.264 1920×1080, 279 frames, 11.624674 s; ffprobe and upload passed. MP4 SHA-256 `bb2c70607f8d0e89b9bd2c09cfc9f237d4871244629c6fd541cb6015208177e7`; artifact `15261894499`; ZIP digest `sha256:065e0fe8fc4a869d123d42004b585540fbedfa818089ebc9a71cebb58fccc1e4`.
- Camera parity: Remotion `cameraScaleAt(globalFrame)` reproduces the existing Motion Canvas beats — S01 push-in over frames 31–65 to 1.025 scale, S03 reset over frames 432–451, S06 push-in over frames 1546–1570 to 1.025 scale and hold through frame 1727. Runtime and Python contract tests cover the timings/wiring.
- Sampled visual review: both contact sheets and selected native-resolution frames around S01, the S03 reset, S06 and S05 were inspected. The 2.5% move appears restrained; no obvious clipping of Nia or the caption overlay was seen in the inspected frames. No complete 24-fps viewing has been performed.
- Artifacts: Remotion `15262995737`; Motion Canvas `15263075327`; Manim `15261894499`; Motion Canvas diagnostics `15262537341` (diagnostics expire around 2026-12-12; candidate artifacts around 2026-12-28).
- Both full-film outputs remain silent/video-only. Natural Nia anatomy/acting, S05 VO-led pacing, mobile type, real narration/audio QA, comparable authoring/revision measurements and H2 provenance/license review remain open.

