import copy
import math
import unittest
from pathlib import Path

from tools.validate_benchmark import (
    BENCHMARK,
    angle_from_normal_degrees,
    load_diagram,
    load_motion_canvas_meta,
    load_storyboard,
    refracted_angle_degrees,
    validate_diagram,
    validate_motion_canvas_range,
    validate_storyboard,
)


class BenchmarkContractTests(unittest.TestCase):
    def setUp(self):
        self.storyboard = load_storyboard()
        self.research = (BENCHMARK / "RESEARCH.md").read_text(encoding="utf-8")
        self.diagram = load_diagram()

    def test_storyboard_is_valid(self):
        self.assertEqual(validate_storyboard(self.storyboard, self.research), [])

    def test_total_frame_count_is_exact(self):
        total = sum(shot["duration_frames"] for shot in self.storyboard["shots"])
        self.assertEqual(total, 1728)
        self.assertEqual(total, self.storyboard["project"]["duration_frames"])

    def test_shots_are_contiguous_and_half_open(self):
        shots = self.storyboard["shots"]
        self.assertEqual(shots[0]["start_frame"], 0)
        for previous, current in zip(shots, shots[1:]):
            self.assertEqual(previous["end_frame"], current["start_frame"])
        self.assertEqual(shots[-1]["end_frame"], 1728)

    def test_motion_canvas_range_maps_to_exact_output_frames(self):
        meta = load_motion_canvas_meta()
        self.assertEqual(validate_motion_canvas_range(self.storyboard, meta), [])
        fps = self.storyboard["project"]["fps"]["numerator"]
        end_frame = math.ceil(meta["shared"]["range"][1] * fps)
        self.assertEqual(end_frame, 1727)

    def test_motion_canvas_exclusive_duration_boundary_adds_an_extra_frame(self):
        meta = copy.deepcopy(load_motion_canvas_meta())
        meta["shared"]["range"][1] = 72.0
        errors = validate_motion_canvas_range(self.storyboard, meta)
        self.assertTrue(errors)
        self.assertIn("maps to frame 1728", errors[0])

    def test_every_storyboard_shot_has_a_runtime_frame_checkpoint(self):
        scene_path = (
            Path(__file__).resolve().parents[1]
            / "benchmarks"
            / "optics-spoon"
            / "motion-canvas"
            / "src"
            / "scenes"
            / "spoon.tsx"
        )
        scene_source = scene_path.read_text(encoding="utf-8")

        for shot in self.storyboard["shots"]:
            checkpoint = f'checkpoint("{shot["id"]}-complete")'
            with self.subTest(shot=shot["id"]):
                self.assertIn(checkpoint, scene_source)

        # The runtime must compare the sampled final frame against the
        # storyboard's half-open end frame, rather than a seconds estimate.
        self.assertIn("candidate.end_frame - 1", scene_source)
        self.assertIn("Math.round(playback.frame)", scene_source)

    def test_motion_canvas_cutaway_preserves_water_below_air(self):
        scene_path = (
            Path(__file__).resolve().parents[1]
            / "benchmarks"
            / "optics-spoon"
            / "motion-canvas"
            / "src"
            / "scenes"
            / "spoon.tsx"
        )
        scene_source = scene_path.read_text(encoding="utf-8")

        # The canonical diagram uses top-left pixel coordinates. Motion Canvas
        # uses a centered stage with +Y downward, so this mapping must not flip Y.
        self.assertIn("point.y - 540", scene_source)
        self.assertNotIn("540 - point.y", scene_source)
        self.assertIn("position={[0, 222.5]}", scene_source)
        self.assertIn('text="NƯỚC" position={[-650, 320]}', scene_source)
        self.assertIn('text="KHÔNG KHÍ" position={[-650, -320]}', scene_source)

    def test_snell_example_bends_away_from_normal(self):
        theta_air = refracted_angle_degrees(1.333, 1.0003, 40.0)
        self.assertAlmostEqual(theta_air, 58.9346, delta=0.001)
        self.assertGreater(theta_air, 40.0)

    def test_total_internal_reflection_is_reported(self):
        with self.assertRaises(ValueError):
            refracted_angle_degrees(1.5, 1.0, 60.0)

    def test_invalid_angles_are_rejected(self):
        with self.assertRaises(ValueError):
            refracted_angle_degrees(1.333, 1.0003, 90.0)

    def test_shared_ray_geometry_matches_snell_law(self):
        self.assertEqual(validate_diagram(self.diagram), [])

    def test_outgoing_and_backward_rays_are_collinear(self):
        interface = self.diagram["interface"]
        observer = self.diagram["observer_point"]
        apparent = self.diagram["apparent_point"]
        out_angle = angle_from_normal_degrees(
            observer["x"] - interface["x"],
            interface["y"] - observer["y"],
        )
        back_angle = angle_from_normal_degrees(
            interface["x"] - apparent["x"],
            apparent["y"] - interface["y"],
        )
        self.assertAlmostEqual(out_angle, back_angle, delta=0.001)

    def test_incorrect_apparent_point_geometry_is_rejected(self):
        broken = copy.deepcopy(self.diagram)
        broken["apparent_point"]["y"] = 745
        self.assertTrue(validate_diagram(broken))


if __name__ == "__main__":
    unittest.main()
