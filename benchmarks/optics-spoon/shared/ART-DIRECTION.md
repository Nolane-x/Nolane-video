# Art Direction — The Spoon That Bends

**Style bible v0.1**  
**Original design.** This is not a recreation of Median, Alan Becker, or another creator's character or visual identity.

## 1. Visual adjectives

Intimate, tactile, curious, precise, cinematic, restrained.

The film begins in a believable human-scale kitchen corner. It moves into a clean, luminous scientific cross-section, then returns to the human scene. The diagram should feel like the same film has revealed an invisible layer of reality, not like an unrelated school slide.

## 2. Palette and semantic roles

| Token | Color | Role |
|---|---|---|
| Deep ink | #101B26 | Main shadow/background |
| Blue slate | #203746 | Kitchen surfaces and depth |
| Warm ivory | #F4EDE0 | Main typography and highlights |
| Soft brass | #DDA85E | Practical lamp and warm accents |
| Water teal | #4EA6B5 | Water volume |
| Water highlight | #9AD8D7 | Surface/refraction highlight |
| Ray gold | #FFD36A | Physical light ray |
| Normal white | #E7E7E1 | Normal and measurement guides |
| True-position coral | #E47D68 | Actual submerged point |
| Apparent-position mint | #8ED2B0 | Apparent image point |
| Secondary copy | #A9B6BE | Labels and supporting text |

Colors have stable meaning: ray gold is always a real light ray; dashed ivory is a backward construction; coral is true object position; mint is apparent image position. Do not swap colors between shots.

## 3. Character — Nia

Nia is an original, simplified 2D character:
- youthful adult, gender-neutral stylization;
- expressive oval head and compact body proportions;
- dark teal overshirt with one warm brass accent;
- simple hands with clear finger/prop contact;
- no recognizable resemblance to another animation character;
- silhouette must read at medium shot and remain consistent across renderers.

Performance range: curious, puzzled, analytical, recognition. Keep gestures economical: head tilt, eye-line shift, brow change, hand pause, careful lift and re-dip of the spoon.

Nia's dominant hand remains consistent across all shots. The hand that grips the spoon must visibly contact its handle. When the spoon moves, the fingers and spoon move as one interaction until contact is released.

## 4. Environment and materials

Kitchen:
- clear cylindrical glass with a thick but restrained rim;
- brushed metal spoon with a readable reflective highlight;
- wooden or dark stone tabletop;
- warm practical lamp off-frame;
- background falloff and quiet depth, no generic gradient-only backdrop.

Scientific cutaway:
- clean horizontal air-water interface;
- translucent teal lower region, dark airy upper region;
- no decorative particles that could be mistaken for the ray path;
- clear normal, incident ray, refracted ray and backward extension;
- avoid 3D realism if it makes the geometry harder to understand.

## 5. Camera language

- Hook: macro close-up and slow push; the purpose is to isolate the apparent kink.
- Contradiction: medium close-up; reveal the spoon's physical straightness.
- Transition: move toward the waterline, then simplify the world into a cross-section.
- Diagram: orthographic/diagrammatic camera; geometry stays stable while labels appear.
- Apparent image: frame actual and apparent points together; do not move the camera in a way that changes the angle convention.
- Ending: return to the exact initial side-on perspective for a visual resolution.

No zoom-only shot should stand in for character action. A camera move must reveal, follow or emphasize something.

## 6. Motion grammar

- Everyday actions: grounded, controlled and slightly slower than real time where necessary for readability.
- Anticipation: small hand preparation and gaze before the spoon moves.
- Action: spoon moves as a single rigid prop; no bending or stretching.
- Contact: finger/handle attachment remains stable; spoon touches glass/water surface at the intended point.
- Follow-through: hand and spoon settle after the lift.
- Reaction: Nia's head/eyes respond after the visual discrepancy is observed.
- Diagram: introduce the boundary, normal and physical ray in causal order; never show the apparent point before the outgoing ray exists.
- Holds: preserve 0.5–1.0 seconds after the central optical transformation where the viewer needs time to understand it.

## 7. Typography and layout

- Main type: a legible sans-serif with full Vietnamese diacritic coverage; default fallback must be verified on Linux CI.
- Display titles: 68–92 px at 1920×1080.
- Diagram labels: 38–48 px minimum at 1080p.
- Equations: 48–58 px where possible; split into meaningful lines rather than shrinking.
- Captions: 42–50 px, 1–2 lines, placed in a reserved bottom safe area.
- Maintain at least 5% title/label safe margins and 7% caption safe margins.
- Do not burn essential scientific labels into a generated bitmap. Keep them editable/vector.

## 8. Cross-engine consistency

Each engine may use its native drawing primitives, but the same tokens, layout zones, shot frames, ray geometry, copy and character proportions must be preserved. Record unavoidable differences in the benchmark report; do not silently improve one candidate with extra assets or time.

## 9. Forbidden shortcuts

- Flat slides with a decorative title and moving icons.
- Generic gradient backgrounds as the only environment.
- Unmotivated camera shake or endless zooming.
- A spoon that visibly deforms to illustrate a visual illusion.
- An incorrect ray that bends toward the normal while exiting water.
- Angle labels measured from the surface rather than the normal.
- A dashed apparent-ray extension rendered as a physical light ray.
- Text smaller than the defined readability floor.
- Pseudo-real AI humans used as a shortcut for acting.
