import unittest

from tools.validate_benchmark import (
    load_storyboard,
    refracted_angle_degrees,
    validate_storyboard,
    BENCHMARK,
)


class BenchmarkContractTests(unittest.TestCase):
    def setUp(self):
        self.storyboard = load_storyboard()
        self.research = (BENCHMARK / "RESEARCH.md").read_text(encoding="utf-8")

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

    def test_snell_example_bends_away_from_normal(self):
        theta_air = refracted_angle_degrees(1.333, 1.0003, 40.0)
        self.assertAlmostEqual(theta_air, 58.93, delta=0.1)
        self.assertGreater(theta_air, 40.0)

    def test_total_internal_reflection_is_reported(self):
        with self.assertRaises(ValueError):
            refracted_angle_degrees(1.5, 1.0, 60.0)

    def test_invalid_angles_are_rejected(self):
        with self.assertRaises(ValueError):
            refracted_angle_degrees(1.333, 1.0003, 90.0)


if __name__ == "__main__":
    unittest.main()
