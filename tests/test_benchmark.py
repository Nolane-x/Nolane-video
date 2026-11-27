import copy
import math
import re
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
        self.assertIn("shot.end_frame - 1", scene_source)
        self.assertIn("Math.round(playback.frame)", scene_source)

    def test_motion_canvas_cutaway_preserves_water_below_air(self):
        diagram_path = (
            Path(__file__).resolve().parents[1]
            / "benchmarks"
            / "optics-spoon"
            / "motion-canvas"
            / "src"
            / "diagrams"
            / "refraction.tsx"
        )
        diagram_source = diagram_path.read_text(encoding="utf-8")

        # The canonical top-left pixels are converted to a centered Motion
        # Canvas stage with +Y downward; water must remain below the interface.
        self.assertIn("point.y - 540", diagram_source)
        self.assertNotIn("540 - point.y", diagram_source)
        self.assertIn("geometry.interface.y - 540", diagram_source)
        self.assertNotIn("540 - geometry.interface.y", diagram_source)
        self.assertIn("position={[0, 222.5]}", diagram_source)
        self.assertIn('text="NƯỚC"', diagram_source)
        self.assertIn('text="KHÔNG KHÍ"', diagram_source)

    def test_refraction_diagram_is_reusable_and_marks_virtual_ray_as_dashed(self):
        diagram_path = (
            Path(__file__).resolve().parents[1]
            / "benchmarks"
            / "optics-spoon"
            / "motion-canvas"
            / "src"
            / "diagrams"
            / "refraction.tsx"
        )
        diagram_source = diagram_path.read_text(encoding="utf-8")
        scene_path = diagram_path.parents[1] / "scenes" / "spoon.tsx"
        scene_source = scene_path.read_text(encoding="utf-8")

        self.assertIn("export const createRefractionDiagram", diagram_source)
        self.assertIn("lineDash={[18, 14]}", diagram_source)
        self.assertIn("palette.ivory", diagram_source)
        self.assertIn("toStage(geometry.apparent_point)", diagram_source)
        self.assertIn("const optics = createRefractionDiagram(C)", scene_source)
        self.assertIn("{optics.view}", scene_source)
        self.assertIn("optics.backward().opacity(1, 0.8)", scene_source)
        self.assertNotIn("<Line ref={backward}", scene_source)

    def test_nia_actor_is_a_reusable_jointed_rig(self):
        actor_path = (
            Path(__file__).resolve().parents[1]
            / "benchmarks"
            / "optics-spoon"
            / "motion-canvas"
            / "src"
            / "actors"
            / "nia.tsx"
        )
        actor_source = actor_path.read_text(encoding="utf-8")
        for part in ("torso", "neck", "headRig", "upperArm", "forearm", "elbow", "mouth"):
            with self.subTest(part=part):
                self.assertIn(f"const {part} =", actor_source)
        self.assertIn("export const createNiaActor", actor_source)
        self.assertIn("upperArm,", actor_source)
        self.assertIn("forearm,", actor_source)
        self.assertIn("elbow", actor_source)
        self.assertIn("mouth,", actor_source)

    def test_nia_grip_is_prop_attached_and_has_finger_controls(self):
        root = Path(__file__).resolve().parents[1] / "benchmarks" / "optics-spoon" / "motion-canvas" / "src"
        grip_source = (root / "actors" / "nia-grip.tsx").read_text(encoding="utf-8")
        prop_source = (root / "props" / "spoon.tsx").read_text(encoding="utf-8")
        scene_source = (root / "scenes" / "spoon.tsx").read_text(encoding="utf-8")

        self.assertIn("export const createNiaGrip", grip_source)
        for part in ("palm", "thumb", "indexOutline", "indexFinger", "middleOutline", "middleFinger"):
            with self.subTest(part=part):
                self.assertIn(f"const {part} =", grip_source)
        self.assertIn("export const createSpoonProp", prop_source)
        self.assertIn('<Node ref={rig}', prop_source)
        self.assertIn("{grip.view}", prop_source)
        self.assertIn("const grip = createNiaGrip()", prop_source)
        self.assertIn("const spoon = createSpoonProp", scene_source)
        self.assertIn("{spoon.view}", scene_source)
        self.assertIn("spoon.grip.indexFinger().points", scene_source)
        self.assertIn("spoon.grip.middleFinger().points", scene_source)
        self.assertIn("spoon.grip.indexOutline().points", scene_source)
        self.assertIn("spoon.grip.middleOutline().points", scene_source)
        self.assertIn("spoon.grip.thumb().position", scene_source)

    def test_motion_canvas_runtime_failure_keeps_actionable_browser_diagnostics(self):
        script_path = (
            Path(__file__).resolve().parents[1]
            / "benchmarks"
            / "optics-spoon"
            / "motion-canvas"
            / "scripts"
            / "render-editor.mjs"
        )
        script_source = script_path.read_text(encoding="utf-8")
        self.assertIn("error.stack", script_source)
        self.assertIn('page.on("requestfailed"', script_source)
        self.assertIn("networkFailures", script_source)
        self.assertIn("browser-runtime-debug.json", script_source)
        self.assertIn('if (pageErrors.length)', script_source)
        self.assertIn('"Browser runtime errors after the frame render completed:', script_source)

    def test_actor_prop_grip_contact_uses_one_shared_anchor_contract(self):
        root = Path(__file__).resolve().parents[1] / "benchmarks" / "optics-spoon" / "motion-canvas" / "src"
        anchor_source = (root / "actors" / "rig-anchors.ts").read_text(encoding="utf-8")
        actor_source = (root / "actors" / "nia.tsx").read_text(encoding="utf-8")
        grip_source = (root / "actors" / "nia-grip.tsx").read_text(encoding="utf-8")
        prop_source = (root / "props" / "spoon.tsx").read_text(encoding="utf-8")
        scene_source = (root / "scenes" / "spoon.tsx").read_text(encoding="utf-8")

        def read_point(name):
            match = re.search(
                rf"{name}: StagePoint = \[(-?\d+),\s*(-?\d+)\]",
                anchor_source,
            )
            self.assertIsNotNone(match, f"Missing typed rig anchor: {name}")
            return (int(match.group(1)), int(match.group(2)))

        rest_origin = read_point("SPOON_REST_ORIGIN")
        lift_origin = read_point("SPOON_LIFT_ORIGIN")
        grip_local = read_point("NIA_GRIP_LOCAL_POSITION")

        rest_contact = (rest_origin[0] + grip_local[0], rest_origin[1] + grip_local[1])
        lift_contact = (lift_origin[0] + grip_local[0], lift_origin[1] + grip_local[1])
        self.assertEqual(rest_contact, (-356, 0))
        self.assertEqual(lift_contact, (-356, -70))

        self.assertIn("NIA_REST_GRIP_STAGE_POINT", actor_source)
        self.assertIn("NIA_GRIP_LOCAL_POSITION", grip_source)
        self.assertIn("SPOON_REST_ORIGIN", prop_source)
        self.assertIn("NIA_LIFT_GRIP_STAGE_POINT", scene_source)
        self.assertIn("NIA_REST_GRIP_STAGE_POINT", scene_source)
        self.assertIn("SPOON_LIFT_ORIGIN", scene_source)
        self.assertIn("SPOON_REST_ORIGIN", scene_source)

    def test_s02_authors_anticipation_lift_inspection_and_redip(self):
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
        for beat in ("Anticipation:", "Re-dip:", "leans closer"):
            with self.subTest(beat=beat):
                self.assertIn(beat, scene_source)
        self.assertIn("nia.upperArm().points", scene_source)
        self.assertIn("nia.forearm().points", scene_source)
        self.assertIn("spoon.bentBottom().opacity(1, 0.2)", scene_source)
        self.assertIn(
            "10 - 1 / 24 - (0.4 + 0.25 + 0.85 + 0.8 + 0.25 + 0.2 + 0.85 + 0.6)",
            scene_source,
        )

    def test_apparent_spoon_kink_is_continuous_at_the_waterline(self):
        prop_path = (
            Path(__file__).resolve().parents[1]
            / "benchmarks"
            / "optics-spoon"
            / "motion-canvas"
            / "src"
            / "props"
            / "spoon.tsx"
        )
        prop_source = prop_path.read_text(encoding="utf-8")
        # The apparent lower segment is offset, but less than the 22px stroke
        # width so the viewer reads one optically displaced spoon, not two pieces.
        self.assertIn("points={[[14, 0], [205, 280]]}", prop_source)
        self.assertNotIn("points={[[70, 0], [205, 280]]}", prop_source)

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
