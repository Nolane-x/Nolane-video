import copy
import json
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
        for part in ("torso", "neck", "headRig", "upperArmOutline", "upperArm", "forearmOutline", "forearm", "shoulderJoint", "elbow", "wristJoint", "mouth"):
            with self.subTest(part=part):
                self.assertIn(f"const {part} =", actor_source)
        self.assertIn("export const createNiaActor", actor_source)
        self.assertIn("upperArmOutline,", actor_source)
        self.assertIn("upperArm,", actor_source)
        self.assertIn("forearmOutline,", actor_source)
        self.assertIn("forearm,", actor_source)
        self.assertIn("shoulderJoint,", actor_source)
        self.assertIn("elbow", actor_source)
        self.assertIn("wristJoint,", actor_source)
        self.assertIn("lineWidth={48}", actor_source)
        self.assertIn("lineWidth={46}", actor_source)
        self.assertIn("upperArmOutline().points([shoulder, elbowPoint])", actor_source)
        self.assertIn("forearmOutline().points([elbowPoint, wrist])", actor_source)
        self.assertIn("wristJoint().position(wrist)", actor_source)
        scene_path = (
            Path(__file__).resolve().parents[1]
            / "benchmarks" / "optics-spoon" / "motion-canvas" / "src" / "scenes" / "spoon.tsx"
        )
        scene_source = scene_path.read_text(encoding="utf-8")
        for control in ("upperArmOutline", "forearmOutline", "shoulderJoint", "elbow", "wristJoint"):
            with self.subTest(control=control):
                self.assertIn(f"nia.{control}().opacity(", scene_source)
        self.assertIn("mouth,", actor_source)

    def test_nia_grip_is_prop_attached_and_has_finger_controls(self):
        root = Path(__file__).resolve().parents[1] / "benchmarks" / "optics-spoon" / "motion-canvas" / "src"
        grip_source = (root / "actors" / "nia-grip.tsx").read_text(encoding="utf-8")
        prop_source = (root / "props" / "spoon.tsx").read_text(encoding="utf-8")
        scene_source = (root / "scenes" / "spoon.tsx").read_text(encoding="utf-8")

        self.assertIn("export const createNiaGrip", grip_source)
        for part in (
            "palm", "palmCrease", "thumbBase", "thumbBaseCrease",
            "thumb", "thumbOutline", "thumbFinger",
            "indexOutline", "indexFinger", "indexCrease",
            "middleOutline", "middleFinger", "middleCrease",
            "ringOutline", "ringFinger", "ringCrease",
            "pinkyOutline", "pinkyFinger", "pinkyCrease",
        ):
            with self.subTest(part=part):
                self.assertIn(f"const {part} =", grip_source)
        self.assertIn("export const createSpoonProp", prop_source)
        self.assertIn('<Node ref={rig}', prop_source)
        self.assertIn("{grip.view}", prop_source)
        self.assertIn("const grip = createNiaGrip()", prop_source)
        self.assertIn("const spoon = createSpoonProp", scene_source)
        self.assertIn("{spoon.view}", scene_source)
        self.assertIn('spoon.grip.toPose("brace", 0.25)', scene_source)
        self.assertIn('spoon.grip.toPose("rest", 0.8)', scene_source)
        self.assertNotIn("spoon.grip.indexFinger().points", scene_source)
        self.assertNotIn("spoon.grip.middleFinger().points", scene_source)
        geometry_source = (root / "actors" / "grip-geometry.ts").read_text(encoding="utf-8")
        package_source = (root.parent / "package.json").read_text(encoding="utf-8")
        workflow_source = (
            Path(__file__).resolve().parents[1]
            / ".github"
            / "workflows"
            / "m1-benchmark-candidates.yml"
        ).read_text(encoding="utf-8")
        self.assertIn("NIA_GRIP_POSES", grip_source)
        self.assertIn('export type NiaGripPoseName = "rest" | "brace"', geometry_source)
        self.assertIn("pointOnGripFrame", geometry_source)
        self.assertIn("SPOON_HANDLE_LOCAL_START", geometry_source)
        self.assertIn("SPOON_HANDLE_LOCAL_END", geometry_source)
        self.assertIn('"test:grip": "node scripts/test-grip-geometry.mjs"', package_source)
        self.assertIn("npm run test:grip", workflow_source)
        self.assertIn("thumbOutline().points(copyPath(pose.thumbPath)", grip_source
        )
        self.assertIn("const toPose =", grip_source)
        self.assertIn("return all(", grip_source)
        self.assertIn("fingerCrease(path)", geometry_source)
        self.assertIn("thumbBaseFrom", geometry_source)
        self.assertIn("palmCrease(palm)", geometry_source)
        for control in ("palmCrease", "thumbBase", "thumbBaseCrease", "indexCrease", "middleCrease", "ringCrease", "pinkyCrease"):
            with self.subTest(detail=control):
                self.assertIn(f"const {control} =", grip_source)
                self.assertIn(f"spoon.grip.{control}().opacity(", scene_source)
        self.assertIn("indexCrease().points(copyLine(pose.fingerCreases.index)", grip_source)
        self.assertIn("thumbBaseCrease().points(copyPath(pose.thumbBaseCrease)", grip_source)

    def test_prop_attached_grip_renders_above_the_forearm(self):
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
        # The actor arm is a separate stroke; draw it first so the spoon node's
        # attached palm/fingers are not hidden at the contact point.
        self.assertLess(scene_source.index("{nia.view}"), scene_source.index("{spoon.view}"))

    def test_nia_grip_pose_library_contains_four_independently_articulated_fingers(self):
        grip_path = (
            Path(__file__).resolve().parents[1]
            / "benchmarks"
            / "optics-spoon"
            / "motion-canvas"
            / "src"
            / "actors"
            / "nia-grip.tsx"
        )
        grip_source = grip_path.read_text(encoding="utf-8")
        geometry_source = (grip_path.parent / "grip-geometry.ts").read_text(encoding="utf-8")
        for digit in ("index", "middle", "ring", "pinky"):
            with self.subTest(digit=digit):
                self.assertIn(f"{digit}: FingerPath", geometry_source)
                self.assertIn(f"{digit}: wrapFinger(", geometry_source)
                self.assertIn(f"{digit}Outline", grip_source)
                self.assertIn(f"{digit}Finger", grip_source)
                self.assertIn(f"{digit}Outline().points(copyPath(pose.{digit})", grip_source)
                self.assertIn(f"{digit}Finger().points(copyPath(pose.{digit})", grip_source)

        self.assertIn('rest: {', geometry_source)
        self.assertIn('brace: {', geometry_source)
        self.assertIn("NIA_GRIP_LOCAL_POSITION", geometry_source)

    def test_nia_grip_geometry_is_derived_from_the_shared_spoon_handle_axis(self):
        root = Path(__file__).resolve().parents[1] / "benchmarks" / "optics-spoon" / "motion-canvas"
        anchors = (root / "src" / "actors" / "rig-anchors.ts").read_text(encoding="utf-8")
        geometry = (root / "src" / "actors" / "grip-geometry.ts").read_text(encoding="utf-8")
        grip = (root / "src" / "actors" / "nia-grip.tsx").read_text(encoding="utf-8")
        prop = (root / "src" / "props" / "spoon.tsx").read_text(encoding="utf-8")
        runtime_test = (root / "scripts" / "test-grip-geometry.mjs").read_text(encoding="utf-8")
        package_source = (root / "package.json").read_text(encoding="utf-8")
        workflow_source = (
            Path(__file__).resolve().parents[1]
            / ".github"
            / "workflows"
            / "m1-benchmark-candidates.yml"
        ).read_text(encoding="utf-8")

        self.assertIn("SPOON_HANDLE_LOCAL_START: StagePoint = [-145, -380]", anchors)
        self.assertIn("SPOON_HANDLE_LOCAL_END: StagePoint = [0, 0]", anchors)
        self.assertIn("SPOON_HANDLE_LOCAL_START", prop)
        self.assertIn("SPOON_HANDLE_LOCAL_END", prop)
        self.assertIn("const axis: GripPoint", geometry)
        self.assertIn("const normal: GripPoint", geometry)
        self.assertIn("const gripAlong", geometry)
        self.assertNotIn("gripAcross", geometry)
        self.assertIn("normal[0] * across", geometry)
        self.assertIn("normal[1] * across", geometry)
        for digit in ("index", "middle", "ring", "pinky"):
            with self.subTest(digit=digit):
                self.assertIn(f"{digit}: wrapFinger(", geometry)
        self.assertIn("thumbPath: wrapThumb(", geometry)
        self.assertIn("NIA_GRIP_POSES", geometry)
        self.assertIn("thumbOutline().points(copyPath(pose.thumbPath)", grip)

        # Runtime assertions protect centreline crossings, separated finger
        # stations and the opposing thumb on both named poses.
        self.assertIn("startPoint.across > 20", runtime_test)
        self.assertIn("Math.abs(middlePoint.across) <= 3", runtime_test)
        self.assertIn("endPoint.across < -20", runtime_test)
        self.assertIn("thumbStart.across < -20", runtime_test)
        self.assertIn("thumbEnd.across > 20", runtime_test)
        self.assertIn('"test:grip": "node scripts/test-grip-geometry.mjs"', package_source)
        self.assertIn("npm run test:grip", workflow_source)

    def test_nia_grip_geometry_is_derived_from_the_shared_spoon_handle_axis(self):
        root = Path(__file__).resolve().parents[1] / "benchmarks" / "optics-spoon" / "motion-canvas"
        anchors = (root / "src" / "actors" / "rig-anchors.ts").read_text(encoding="utf-8")
        geometry = (root / "src" / "actors" / "grip-geometry.ts").read_text(encoding="utf-8")
        grip = (root / "src" / "actors" / "nia-grip.tsx").read_text(encoding="utf-8")
        prop = (root / "src" / "props" / "spoon.tsx").read_text(encoding="utf-8")
        runtime_test = (root / "scripts" / "test-grip-geometry.mjs").read_text(encoding="utf-8")
        package_source = (root / "package.json").read_text(encoding="utf-8")
        workflow_source = (
            Path(__file__).resolve().parents[1]
            / ".github"
            / "workflows"
            / "m1-benchmark-candidates.yml"
        ).read_text(encoding="utf-8")

        self.assertIn("SPOON_HANDLE_LOCAL_START: StagePoint = [-145, -380]", anchors)
        self.assertIn("SPOON_HANDLE_LOCAL_END: StagePoint = [0, 0]", anchors)
        self.assertIn("SPOON_HANDLE_LOCAL_START", prop)
        self.assertIn("SPOON_HANDLE_LOCAL_END", prop)
        self.assertIn("const axis: GripPoint", geometry)
        self.assertIn("const normal: GripPoint", geometry)
        self.assertIn("const gripAlong", geometry)
        self.assertNotIn("gripAcross", geometry)
        self.assertIn("normal[0] * across", geometry)
        self.assertIn("normal[1] * across", geometry)
        for digit in ("index", "middle", "ring", "pinky"):
            with self.subTest(digit=digit):
                self.assertIn(f"{digit}: wrapFinger(", geometry)
        self.assertIn("thumbPath: wrapThumb(", geometry)
        self.assertIn("NIA_GRIP_POSES", geometry)
        self.assertIn("thumbOutline().points(copyPath(pose.thumbPath)", grip)

        # Runtime assertions protect centreline crossings, separated finger
        # stations and the opposing thumb on both named poses.
        self.assertIn("startPoint.across > 20", runtime_test)
        self.assertIn("Math.abs(middlePoint.across) <= 3", runtime_test)
        self.assertIn("endPoint.across < -20", runtime_test)
        self.assertIn("thumbStart.across < -20", runtime_test)
        self.assertIn("thumbEnd.across > 20", runtime_test)
        self.assertIn('"test:grip": "node scripts/test-grip-geometry.mjs"', package_source)
        self.assertIn("npm run test:grip", workflow_source)

    def test_nia_arm_uses_reachable_two_bone_ik_and_candidate_gate_runs_its_tests(self):
        root = Path(__file__).resolve().parents[1] / "benchmarks" / "optics-spoon" / "motion-canvas"
        actor_source = (root / "src" / "actors" / "nia.tsx").read_text(encoding="utf-8")
        ik_source = (root / "src" / "actors" / "arm-ik.ts").read_text(encoding="utf-8")
        package_source = (root / "package.json").read_text(encoding="utf-8")
        workflow_source = (
            Path(__file__).resolve().parents[1]
            / ".github"
            / "workflows"
            / "m1-benchmark-candidates.yml"
        ).read_text(encoding="utf-8")

        self.assertIn('import { solveTwoBoneIK } from "./arm-ik"', actor_source)
        self.assertIn("export const NIA_ARM_BONE_LENGTHS", actor_source)
        self.assertIn("elbow: solveTwoBoneIK(", actor_source)
        self.assertIn("return tween(duration, progress =>", actor_source)
        self.assertIn("const elbowPoint = solveTwoBoneIK(", actor_source)
        self.assertIn("currentWrist = wrist", actor_source)
        self.assertNotIn("elbow: [245, 30]", actor_source)
        self.assertIn("Math.hypot(dx, dy)", ik_source)
        self.assertIn("Math.sqrt(Math.max(0, heightSquared))", ik_source)
        self.assertIn("Wrist target is unreachable", ik_source)
        self.assertIn('"test:ik": "node scripts/test-arm-ik.mjs"', package_source)
        self.assertIn("npm run test:ik", workflow_source)

        lengths = (200, 615)
        targets = (
            ((-356.0, 0.0), (258.567310, -23.065602)),
            ((-362.8354685511, -66.5579691084), (249.519104, -9.576595)),
            ((-347.4405111718, -73.3247763071), (266.228404, -32.883917)),
        )
        shoulder = (420.0, 95.0)

        def solve_reference(target):
            dx = target[0] - shoulder[0]
            dy = target[1] - shoulder[1]
            distance = math.hypot(dx, dy)
            upper, forearm = lengths
            self.assertGreaterEqual(distance, abs(upper - forearm))
            self.assertLessEqual(distance, upper + forearm)
            along = (upper**2 - forearm**2 + distance**2) / (2 * distance)
            height = math.sqrt(max(0.0, upper**2 - along**2))
            unit_x, unit_y = dx / distance, dy / distance
            elbow = (
                shoulder[0] + unit_x * along - unit_y * height,
                shoulder[1] + unit_y * along + unit_x * height,
            )
            return elbow, distance

        for target, expected_elbow in targets:
            with self.subTest(target=target):
                elbow, distance = solve_reference(target)
                self.assertAlmostEqual(elbow[0], expected_elbow[0], delta=0.002)
                self.assertAlmostEqual(elbow[1], expected_elbow[1], delta=0.002)
                self.assertAlmostEqual(math.dist(shoulder, elbow), lengths[0], delta=1e-6)
                self.assertAlmostEqual(math.dist(elbow, target), lengths[1], delta=1e-6)
                self.assertGreater(lengths[0] + lengths[1] - distance, 0)

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

        def rotated_contact(origin, angle_degrees):
            radians = math.radians(angle_degrees)
            local_x, local_y = grip_local
            rotated_x = local_x * math.cos(radians) - local_y * math.sin(radians)
            rotated_y = local_x * math.sin(radians) + local_y * math.cos(radians)
            return (origin[0] + rotated_x, origin[1] + rotated_y)

        rest_contact = rotated_contact(rest_origin, 0)
        lift_contact = rotated_contact(lift_origin, -5)
        turn_contact = rotated_contact(lift_origin, 6)
        self.assertEqual(rest_contact, (-356, 0))
        self.assertAlmostEqual(lift_contact[0], -362.83, delta=0.02)
        self.assertAlmostEqual(lift_contact[1], -66.56, delta=0.02)
        self.assertAlmostEqual(turn_contact[0], -347.45, delta=0.02)
        self.assertAlmostEqual(turn_contact[1], -73.32, delta=0.02)

        self.assertIn("rotationDegrees = 0", anchor_source)
        self.assertIn("Math.cos(radians)", anchor_source)
        self.assertIn("Math.sin(radians)", anchor_source)
        self.assertIn("NIA_REST_GRIP_STAGE_POINT", actor_source)
        self.assertIn("export const NIA_ARM_POSES", actor_source)
        self.assertIn("NIA_LIFT_GRIP_STAGE_POINT", actor_source)
        self.assertIn("NIA_LIFT_TURN_GRIP_STAGE_POINT", actor_source)
        self.assertIn('nia.toArmPose("lift", 0.85)', scene_source)
        self.assertIn('nia.toArmPose("inspect", 0.25)', scene_source)
        self.assertIn('nia.toArmPose("rest", 0.85)', scene_source)
        self.assertNotIn("nia.upperArm().points", scene_source)
        self.assertNotIn("nia.forearm().points", scene_source)
        geometry_source = (root / "actors" / "grip-geometry.ts").read_text(encoding="utf-8")
        self.assertIn("NIA_GRIP_LOCAL_POSITION", grip_source)
        self.assertIn("position={[...NIA_GRIP_LOCAL_POSITION]}", grip_source)
        self.assertIn("palm: [...NIA_GRIP_LOCAL_POSITION]", geometry_source)
        self.assertIn("SPOON_HANDLE_LOCAL_START", geometry_source)
        self.assertIn("SPOON_HANDLE_LOCAL_END", geometry_source)
        self.assertIn("SPOON_REST_ORIGIN", prop_source)
        self.assertIn("position={[...SPOON_REST_ORIGIN]}", prop_source)
        self.assertIn("NIA_LIFT_GRIP_STAGE_POINT", actor_source)
        self.assertIn("NIA_LIFT_TURN_GRIP_STAGE_POINT", actor_source)
        self.assertIn("NIA_REST_GRIP_STAGE_POINT", actor_source)
        self.assertNotIn("NIA_LIFT_GRIP_STAGE_POINT", scene_source)
        self.assertNotIn("NIA_LIFT_TURN_GRIP_STAGE_POINT", scene_source)
        self.assertNotIn("NIA_REST_GRIP_STAGE_POINT", scene_source)
        self.assertIn("SPOON_LIFT_ORIGIN", scene_source)
        self.assertIn("SPOON_REST_ORIGIN", scene_source)

    def test_kitchen_environment_is_a_reusable_scene_set(self):
        root = Path(__file__).resolve().parents[1] / "benchmarks" / "optics-spoon" / "motion-canvas" / "src"
        set_source = (root / "sets" / "kitchen.tsx").read_text(encoding="utf-8")
        scene_source = (root / "scenes" / "spoon.tsx").read_text(encoding="utf-8")

        self.assertIn("export const createKitchenSet", set_source)
        for part in ("wall", "table", "glass", "water", "waterline", "caption"):
            with self.subTest(part=part):
                self.assertIn(f"const {part} =", set_source)
        self.assertIn('import { createKitchenSet } from "../sets/kitchen"', scene_source)
        self.assertIn("const kitchen = createKitchenSet(", scene_source)
        self.assertIn("{kitchen.view}", scene_source)
        self.assertIn("kitchen.wall().opacity", scene_source)
        self.assertIn("kitchen.caption().text", scene_source)
        self.assertNotIn("const kitchenWall =", scene_source)
        self.assertNotIn("<Rect ref={glass}", scene_source)

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
        self.assertIn('nia.toArmPose("lift", 0.85)', scene_source)
        self.assertIn('nia.toArmPose("inspect", 0.25)', scene_source)
        self.assertIn('nia.toArmPose("rest", 0.85)', scene_source)
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


    def test_remotion_candidate_has_deterministic_storyboard_parity_gates(self):
        root = (
            Path(__file__).resolve().parents[1]
            / "benchmarks"
            / "optics-spoon"
            / "remotion"
        )
        source = (root / "src" / "OpticsSpoon.tsx").read_text(encoding="utf-8")
        motion_source = (root / "src" / "benchmark-motion.ts").read_text(encoding="utf-8")
        runtime_test = (root / "scripts" / "test-parity.mjs").read_text(encoding="utf-8")
        package = json.loads((root / "package.json").read_text(encoding="utf-8"))
        workflow = (
            Path(__file__).resolve().parents[1]
            / ".github"
            / "workflows"
            / "m1-benchmark-candidates.yml"
        ).read_text(encoding="utf-8")

        s02 = next(shot for shot in self.storyboard["shots"] if shot["id"] == "S02")
        self.assertEqual((s02["start_frame"], s02["end_frame"]), (192, 432))
        self.assertIn("s02MotionAt(frame)", source)
        self.assertIn("diagramMotionAt(frame)", source)
        for key in (
            "anticipation", "lift", "inspection", "redip", "lean",
            "straightness", "spoonRotationDeg", "handLiftPx",
        ):
            with self.subTest(key=key):
                self.assertIn(key, motion_source)
        for phase in (
            "incidentRay", "refractedRay", "normal", "angles",
            "formula", "backward", "apparent",
        ):
            with self.subTest(phase=phase):
                self.assertIn(phase, motion_source)
                self.assertIn(phase, runtime_test)

        self.assertEqual(package["scripts"]["test:parity"], "node scripts/test-parity.mjs")
        self.assertIn("npm run test:parity", workflow)



if __name__ == "__main__":
    unittest.main()
