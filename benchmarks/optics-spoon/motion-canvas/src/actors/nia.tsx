import { Circle, Line, Node, Rect, Txt } from "@motion-canvas/2d";
import { createRef, tween } from "@motion-canvas/core";
import {
  NIA_BODY_POSES,
  NIA_LIFT_GRIP_STAGE_POINT,
  NIA_LIFT_TURN_GRIP_STAGE_POINT,
  NIA_REST_GRIP_STAGE_POINT
} from "./rig-anchors";
import { solveTwoBoneIK } from "./arm-ik";

type StagePoint = readonly [number, number];
export type NiaArmPoseName = "rest" | "lift" | "inspect";
type NiaArmPose = {
  shoulder: StagePoint;
  elbow: StagePoint;
  wrist: StagePoint;
};

/** Fixed segment lengths prevent the arm from stretching as the wrist moves. */
export const NIA_ARM_BONE_LENGTHS = {
  upper: 200,
  forearm: 615
} as const;

const createArmPose = (wrist: StagePoint, shoulder: StagePoint): NiaArmPose => ({
  shoulder,
  elbow: solveTwoBoneIK(
    NIA_SHOULDER,
    wrist,
    NIA_ARM_BONE_LENGTHS.upper,
    NIA_ARM_BONE_LENGTHS.forearm,
    1
  ),
  wrist
});

/** Wrist targets are authored; elbow positions are solved by the two-bone rig. */
export const NIA_ARM_POSES: Record<NiaArmPoseName, NiaArmPose> = {
  rest: createArmPose(NIA_REST_GRIP_STAGE_POINT, NIA_BODY_POSES.rest.shoulder),
  lift: createArmPose(NIA_LIFT_GRIP_STAGE_POINT, NIA_BODY_POSES.lift.shoulder),
  inspect: createArmPose(NIA_LIFT_TURN_GRIP_STAGE_POINT, NIA_BODY_POSES.inspect.shoulder)
};

const copyPoint = (point: StagePoint): [number, number] => [point[0], point[1]];

const lerpPoint = (
  from: StagePoint,
  to: StagePoint,
  progress: number
): [number, number] => [
  from[0] + (to[0] - from[0]) * progress,
  from[1] + (to[1] - from[1]) * progress
];

// Match Motion Canvas's default easeInOutCubic property tween so the grip
// target and the spoon transform follow the same authored timing curve.
const easeInOutCubic = (value: number): number =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;

/**
 * Nia is a reusable, NEE-owned 2D actor rig.
 *
 * The shoulder, elbow, wrist and head are exposed as independent animated
 * parts. This is an intentionally small first rig: authored performance stays
 * deterministic and scene code controls the timing, while the rig owns visual
 * structure and reusable actor proportions.
 */
export const createNiaActor = () => {
  const torso = createRef<Rect>();
  const neck = createRef<Rect>();
  const headRig = createRef<Node>();
  const head = createRef<Circle>();
  const eyeLeft = createRef<Circle>();
  const eyeRight = createRef<Circle>();
  const mouth = createRef<Line>();
  const expression = createRef<Txt>();
  const upperArmOutline = createRef<Line>();
  const upperArm = createRef<Line>();
  const forearmOutline = createRef<Line>();
  const forearm = createRef<Line>();
  const shoulderJoint = createRef<Circle>();
  const elbow = createRef<Circle>();
  const wristJoint = createRef<Circle>();
  const restArm = NIA_ARM_POSES.rest;
  const restBody = NIA_BODY_POSES.rest;
  let currentShoulder = copyPoint(restArm.shoulder);
  let currentWrist = copyPoint(restArm.wrist);
  let currentTorsoPosition = copyPoint(restBody.torsoPosition);
  let currentTorsoRotationDegrees = restBody.torsoRotationDegrees;
  let currentNeckPosition = copyPoint(restBody.neckPosition);

  const view = (
    <>
      <Rect
        ref={torso}
        size={[185, 265]}
        position={[505, 185]}
        radius={38}
        fill="#203746"
        stroke="#101B26"
        lineWidth={10}
        opacity={0}
      />
      <Rect
        ref={neck}
        size={[82, 85]}
        position={[505, 32]}
        radius={24}
        fill="#D9B89B"
        stroke="#101B26"
        lineWidth={8}
        opacity={0}
      />
      <Node ref={headRig} position={[505, -105]}>
        <Circle
          ref={head}
          size={230}
          position={[0, 0]}
          fill="#D9B89B"
          stroke="#101B26"
          lineWidth={10}
          opacity={0}
        />
        <Circle size={125} position={[0, -85]} fill="#172631" opacity={0} />
        <Circle
          ref={eyeLeft}
          size={18}
          position={[-40, 0]}
          fill="#101B26"
          opacity={0}
        />
        <Circle
          ref={eyeRight}
          size={18}
          position={[40, 0]}
          fill="#101B26"
          opacity={0}
        />
        <Line
          ref={mouth}
          points={[[-26, 68], [0, 75], [26, 68]]}
          stroke="#8A554C"
          lineWidth={9}
          lineCap="round"
          opacity={0}
        />
        <Txt
          ref={expression}
          text="?"
          position={[130, -100]}
          fontSize={76}
          fill="#DDA85E"
          fontFamily="Arial"
          opacity={0}
        />
      </Node>
      {/* Dark contour strokes give the two-bone rig a readable silhouette. */}
      <Line
        ref={upperArmOutline}
        points={[[...restArm.shoulder], [...restArm.elbow]]}
        stroke="#101B26"
        lineWidth={48}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={upperArm}
        points={[[...restArm.shoulder], [...restArm.elbow]]}
        stroke="#D9B89B"
        lineWidth={32}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={forearmOutline}
        points={[[...restArm.elbow], [...restArm.wrist]]}
        stroke="#101B26"
        lineWidth={46}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={forearm}
        points={[[...restArm.elbow], [...restArm.wrist]]}
        stroke="#D9B89B"
        lineWidth={30}
        lineCap="round"
        opacity={0}
      />
      <Circle
        ref={shoulderJoint}
        size={50}
        position={[...restArm.shoulder]}
        fill="#D9B89B"
        stroke="#101B26"
        lineWidth={7}
        opacity={0}
      />
      <Circle
        ref={elbow}
        size={42}
        position={[...restArm.elbow]}
        fill="#D9B89B"
        stroke="#101B26"
        lineWidth={7}
        opacity={0}
      />
      <Circle
        ref={wristJoint}
        size={34}
        position={[...restArm.wrist]}
        fill="#D9B89B"
        stroke="#101B26"
        lineWidth={6}
        opacity={0}
      />
    </>
  );

  const toArmPose = (name: NiaArmPoseName, duration: number) => {
    const pose = NIA_ARM_POSES[name];
    const fromShoulder = copyPoint(currentShoulder);
    const fromWrist = copyPoint(currentWrist);

    // Re-solve the elbow every rendered frame. Interpolating the endpoint
    // elbows would stretch the bones between named poses.
    return tween(duration, progress => {
      const eased = easeInOutCubic(progress);
      const shoulder = lerpPoint(fromShoulder, pose.shoulder, eased);
      const wrist = lerpPoint(fromWrist, pose.wrist, eased);
      const elbowPoint = solveTwoBoneIK(
        shoulder,
        wrist,
        NIA_ARM_BONE_LENGTHS.upper,
        NIA_ARM_BONE_LENGTHS.forearm,
        1
      );

      upperArmOutline().points([shoulder, elbowPoint]);
      upperArm().points([shoulder, elbowPoint]);
      forearmOutline().points([elbowPoint, wrist]);
      forearm().points([elbowPoint, wrist]);
      shoulderJoint().position(shoulder);
      elbow().position(elbowPoint);
      wristJoint().position(wrist);
      currentShoulder = shoulder;
      currentWrist = wrist;
    });
  };


  /** Move torso/neck and the matching arm shoulder as one counterbalance pose. */
  const toBodyPose = (name: NiaArmPoseName, duration: number) => {
    const pose = NIA_BODY_POSES[name];
    const fromTorsoPosition = copyPoint(currentTorsoPosition);
    const fromTorsoRotationDegrees = currentTorsoRotationDegrees;
    const fromNeckPosition = copyPoint(currentNeckPosition);

    return tween(duration, progress => {
      const eased = easeInOutCubic(progress);
      const torsoPosition = lerpPoint(fromTorsoPosition, pose.torsoPosition, eased);
      const neckPosition = lerpPoint(fromNeckPosition, pose.neckPosition, eased);
      const torsoRotationDegrees =
        fromTorsoRotationDegrees
        + (pose.torsoRotationDegrees - fromTorsoRotationDegrees) * eased;

      torso().position(torsoPosition);
      torso().rotation(torsoRotationDegrees);
      neck().position(neckPosition);
      currentTorsoPosition = torsoPosition;
      currentTorsoRotationDegrees = torsoRotationDegrees;
      currentNeckPosition = neckPosition;
    });
  };

  return {
    view,
    torso,
    neck,
    headRig,
    head,
    eyeLeft,
    eyeRight,
    mouth,
    expression,
    upperArmOutline,
    upperArm,
    forearmOutline,
    forearm,
    shoulderJoint,
    elbow,
    wristJoint,
    toArmPose,
    toBodyPose
  };
};
