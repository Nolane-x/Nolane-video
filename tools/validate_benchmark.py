"""Validate the shared NEE optics benchmark before any renderer consumes it."""

from __future__ import annotations

import json
import math
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
BENCHMARK = ROOT / "benchmarks" / "optics-spoon" / "shared"


def refracted_angle_degrees(n_incident: float, n_transmitted: float, theta_incident_degrees: float) -> float:
    """Return the refracted angle measured from the normal using Snell's law."""
    if n_incident <= 0 or n_transmitted <= 0:
        raise ValueError("Refractive indices must be positive.")
    if not 0 <= theta_incident_degrees < 90:
        raise ValueError("Incident angle must be in [0, 90) degrees.")
    sine_out = (n_incident / n_transmitted) * math.sin(math.radians(theta_incident_degrees))
    if sine_out > 1:
        raise ValueError("Total internal reflection: no propagating refracted ray.")
    return math.degrees(math.asin(sine_out))


def load_storyboard(path: Path = BENCHMARK / "storyboard.json") -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def validate_storyboard(storyboard: dict[str, Any], research_text: str) -> list[str]:
    errors: list[str] = []
    project = storyboard.get("project", {})
    shots = storyboard.get("shots", [])
    narration = storyboard.get("narration_spans", [])

    declared_frames = project.get("duration_frames")
    if not isinstance(declared_frames, int) or declared_frames <= 0:
        errors.append("project.duration_frames must be a positive integer.")
        declared_frames = 0

    if project.get("fps") != {"numerator": 24, "denominator": 1}:
        errors.append("Benchmark FPS must remain exactly 24/1.")
    if (project.get("width"), project.get("height")) != (1920, 1080):
        errors.append("Benchmark canvas must remain 1920x1080.")
    if len(shots) != 6:
        errors.append("The canonical benchmark must contain exactly six shots.")

    shot_ids = [shot.get("id") for shot in shots]
    if len(shot_ids) != len(set(shot_ids)):
        errors.append("Shot IDs must be unique.")

    cursor = 0
    for shot in shots:
        start = shot.get("start_frame")
        end = shot.get("end_frame")
        duration = shot.get("duration_frames")
        if not all(isinstance(value, int) for value in (start, end, duration)):
            errors.append(f"{shot.get('id', 'unknown')}: frame values must be integers.")
            continue
        if start != cursor:
            errors.append(f"{shot.get('id')}: expected start_frame {cursor}, got {start}.")
        if end <= start or duration != end - start:
            errors.append(f"{shot.get('id')}: invalid half-open frame range or duration.")
        cursor = end

    if cursor != declared_frames:
        errors.append(f"Shot coverage ends at {cursor}, declared duration is {declared_frames}.")

    known_shots = set(shot_ids)
    narration_ids: set[str] = set()
    for span in narration:
        span_id = span.get("id")
        if not span_id or span_id in narration_ids:
            errors.append(f"Invalid or duplicate narration span ID: {span_id!r}.")
        narration_ids.add(span_id)
        if span.get("shot_id") not in known_shots:
            errors.append(f"{span_id}: references unknown shot {span.get('shot_id')!r}.")
        if not span.get("text", "").strip():
            errors.append(f"{span_id}: narration text is empty.")

    for claim in storyboard.get("claims", []):
        if f"### {claim} " not in research_text:
            errors.append(f"Claim {claim} has no matching claim-ledger section.")

    # Independent numerical check for the benchmark's example ray.
    theta_air = refracted_angle_degrees(1.333, 1.0003, 40.0)
    if not 58.8 <= theta_air <= 59.1:
        errors.append(f"Snell calculation drifted: expected about 58.9°, got {theta_air:.4f}°.")
    if not 1.333 > 1.0003:
        errors.append("The water-to-air ray must travel from higher to lower refractive index.")

    shot_map = {shot.get("id"): shot for shot in shots}
    if "S04" not in shot_map or "S05" not in shot_map:
        errors.append("The physics explanation and apparent-image shots are required.")
    else:
        if not any("normal" in action.lower() for action in shot_map["S04"].get("action", [])):
            errors.append("S04 must explicitly construct the normal before measuring angles.")
        if not any("backward extension" in action.lower() for action in shot_map["S05"].get("action", [])):
            errors.append("S05 must explicitly show the backward extension for apparent position.")

    return errors


def main() -> int:
    storyboard = load_storyboard()
    research = (BENCHMARK / "RESEARCH.md").read_text(encoding="utf-8")
    errors = validate_storyboard(storyboard, research)
    if errors:
        print("BENCHMARK VALIDATION FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    theta_air = refracted_angle_degrees(1.333, 1.0003, 40.0)
    print("BENCHMARK VALIDATION PASSED")
    print(f"shots={len(storyboard['shots'])}")
    print(f"duration_frames={storyboard['project']['duration_frames']}")
    print(f"fps={storyboard['project']['fps']['numerator']}/{storyboard['project']['fps']['denominator']}")
    print(f"snell_example=40.0deg_water_to_{theta_air:.2f}deg_air")
    return 0


if __name__ == "__main__":
    sys.exit(main())
