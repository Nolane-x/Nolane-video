# Manim candidate — S04/S05

This candidate renders only the scientific explanation segment. It is not scored as a full-film renderer.

## Reproduction

Python 3.11+ is required by the pinned Manim fork.

Install system packages required by Manim Community Edition, then install:

    pip install -r requirements.txt

Render:

    manim -ql refraction_segment.py RefractionSegment --media_dir build

The scene deliberately uses vector Text rather than MathTex so it does not silently depend on a TeX installation. The formula and all numeric labels remain editable.

The renderer is pinned to the user's fork commit 18320e2f0feaf142b2c3a377068ddb44c82fb2a1. Check upstream/fork status before updating it.
