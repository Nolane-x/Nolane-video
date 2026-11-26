"""Validate the shared NEE optics benchmark before any renderer consumes it."""

from __future__ import annotations

import json
import math
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
BENCHMARK = ROOT / "benchmarks" / "optics-spoon" / "shared"
MOTION_CANVAS_META = ROOT / "benchmarks" / "optics-spoon" / "motion-canvas" / "src" / "project.meta"


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


def angle_from_normal_degrees(dx: float, dy: float) -> float:
    """Return acute angle from the vertical normal, in screen coordinates."""
    if math.isclose(dx, 0.0) and math.isclose(dy, 0.0):
        raise ValueError("A ray vector cannot have zero length.")
    return math.degrees(math.atan2(abs(dx), abs(dy)))


def load_storyboard(path: Path = BENCHMARK / "storyboard.json") -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def load_diagram(path: Path = BENCHMARK / "diagram.json") -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def validate_diagram(diagram: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    try:
        interface = diagram["interface"]
        true_point = diagram["incident_point"]
        observer = diagram["observer_point"]
        apparent = diagram["apparent_point"]
        n_water = float(diagram["water_refractive_index"])
        n_air = float(diagram["air_refractive_index"])
        theta_water = float(diagram["incident_angle_from_normal_deg"])

        for name, point in (
            ("interface", interface),
            ("incident_point", true_point),
            ("observer_point", observer),
            ("apparent_point", apparent),
        ):
            if not all(math.isfinite(float(point[key])) for key in ("x", "y")):
                errors.append(f"{name} coordinates must be finite numbers.")

        if not true_point["y"] > interface["y"]:
            errors.append("The true submerged point must be below the water-air interface.")
        if not observer["y"] < interface["y"]:
            errors.append("The observer must be in the air region above the interface.")
        if not interface["y"] < apparent["y"] < true_point["y"]:
            errors.append("The apparent point must lie in water, closer to the interface than the true point.")

        dx_in = interface["x"] - true_point["x"]
        dy_in = interface["y"] - true_point["y"]
        dx_out = observer["x"] - interface["x"]
        dy_out = interface["y"] - observer["y"]
        dx_back = interface["x"] - apparent["x"]
        dy_back = apparent["y"] - interface["y"]

        measured_in = angle_from_normal_degrees(dx_in, dy_in)
        measured_out = angle_from_normal_degrees(dx_out, dy_out)
        measured_back = angle_from_normal_degrees(dx_back, dy_back)
        expected_out = refracted_angle_degrees(n_water, n_air, theta_water)

        if abs(measured_in - theta_water) > 0.15:
            errors.append(f"Incident ray geometry is {measured_in:.3f}°, expected {theta_water:.3f}° from the normal.")
        if abs(measured_out - expected_out) > 0.15:
            errors.append(f"Outgoing ray geometry is {measured_out:.3f}°, Snell's law requires {expected_out:.3f}°.")
        if abs(measured_back - expected_out) > 0.15:
            errors.append(f"Backward extension geometry is {measured_back:.3f}°, it must lie on the outgoing ray line ({expected_out:.3f}°).")
        if not observer["x"] > interface["x"]:
            errors.append("The benchmark observer must be on the positive-x side of the interface.")
        if not true_point["x"] < interface["x"]:
            errors.append("The submerged source must be on the negative-x side of the interface.")
    except (KeyError, TypeError, ValueError, ZeroDivisionError) as exc:
        errors.append(f"Invalid canonical refraction diagram: {exc}")

    return errors


def load_motion_canvas_meta(path: Path = MOTION_CANVAS_META) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def validate_motion_canvas_range(
    storyboard: dict[str, Any],
    project_meta: dict[str, Any],
) -> list[str]:
    """Validate Motion Canvas's inclusive renderer endpoint against N half-open samples.

    Motion Canvas converts seconds to frames with ceil(seconds * fps). The
    renderer's range endpoint is therefore the last included frame timestamp,
    not the exclusive duration boundary.
    """
    errors: list[str] = []
    try:
        project = storyboard["project"]
        fps_data = project["fps"]
        fps = float(fps_data["numerator"]) / float(fps_data["denominator"])
        duration_frames = int(project["duration_frames"])
        render_range = project_meta["shared"]["range"]
        if len(render_range) != 2:
            return ["Motion Canvas shared.range must contain a start and end time."]

        start_seconds, end_seconds = (float(value) for value in render_range)
        if not math.isfinite(start_seconds) or not math.isfinite(end_seconds):
            return ["Motion Canvas render range values must be finite."]
        start_frame = math.ceil(start_seconds * fps)
        last_included_frame = math.ceil(end_seconds * fps)
        expected_last_frame = duration_frames - 1

        if start_frame != 0:
            errors.append(
                f"Motion Canvas must start at frame 0, but shared.range maps to frame {start_frame}."
            )
        if last_included_frame != expected_last_frame:
            errors.append(
                "Motion Canvas inclusive end maps to frame "
                f"{last_included_frame}; expected final included frame {expected_last_frame} "
                f"for exactly {duration_frames} output frames."
            )
    except (KeyError, TypeError, ValueError, ZeroDivisionError) as exc:
        errors.append(f"Invalid Motion Canvas render range metadata: {exc}")

    return errors


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

    diagram_errors = validate_diagram(load_diagram())
    errors.extend(diagram_errors)
    errors.extend(validate_motion_canvas_range(storyboard, load_motion_canvas_meta()))

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
    diagram = load_diagram()
    errors = validate_storyboard(storyboard, research)
    if errors:
        print("BENCHMARK VALIDATION FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    theta_air = refracted_angle_degrees(
        diagram["water_refractive_index"],
        diagram["air_refractive_index"],
        diagram["incident_angle_from_normal_deg"],
    )
    print("BENCHMARK VALIDATION PASSED")
    print(f"shots={len(storyboard['shots'])}")
    print(f"duration_frames={storyboard['project']['duration_frames']}")
    print(f"fps={storyboard['project']['fps']['numerator']}/{storyboard['project']['fps']['denominator']}")
    print(f"snell_example={diagram['incident_angle_from_normal_deg']:.1f}deg_water_to_{theta_air:.3f}deg_air")
    print("canonical_ray_geometry=consistent")
    return 0


if __name__ == "__main__":
    sys.exit(main())
