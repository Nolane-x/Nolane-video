import {
  NIA_GRIP_LOCAL_POSITION,
  SPOON_HANDLE_LOCAL_END,
  SPOON_HANDLE_LOCAL_START
} from "./rig-anchors";

export type GripPoint = [number, number];
export type FingerPath = [GripPoint, GripPoint, GripPoint];
export type GripLine = [GripPoint, GripPoint];
export type FingerName = "index" | "middle" | "ring" | "pinky";
export type NiaGripPoseName = "rest" | "brace";

export type NiaGripPose = {
  palm: GripPoint;
  palmCrease: FingerPath;
  thumb: GripPoint;
  thumbPath: FingerPath;
  thumbBase: GripPoint;
  thumbBaseCrease: FingerPath;
  fingerCreases: Record<FingerName, GripLine>;
  index: FingerPath;
  middle: FingerPath;
  ring: FingerPath;
  pinky: FingerPath;
};

const dx = SPOON_HANDLE_LOCAL_END[0] - SPOON_HANDLE_LOCAL_START[0];
const dy = SPOON_HANDLE_LOCAL_END[1] - SPOON_HANDLE_LOCAL_START[1];
const handleLength = Math.hypot(dx, dy);
if (handleLength <= 0) {
  throw new Error("Spoon handle axis must have non-zero length.");
}

const axis: GripPoint = [dx / handleLength, dy / handleLength];
const normal: GripPoint = [-axis[1], axis[0]];

// Project the authored palm/grip anchor onto the physical handle centreline.
// Finger and thumb points are measured from that axis, not from the slightly
// offset palm anchor, so the wrap stays centred on the shaft.
const anchorDelta: GripPoint = [
  NIA_GRIP_LOCAL_POSITION[0] - SPOON_HANDLE_LOCAL_START[0],
  NIA_GRIP_LOCAL_POSITION[1] - SPOON_HANDLE_LOCAL_START[1]
];
const gripAlong =
  anchorDelta[0] * axis[0] + anchorDelta[1] * axis[1];

const pointOnGripFrame = (along: number, across: number): GripPoint => [
  SPOON_HANDLE_LOCAL_START[0] +
    axis[0] * (gripAlong + along) +
    normal[0] * across,
  SPOON_HANDLE_LOCAL_START[1] +
    axis[1] * (gripAlong + along) +
    normal[1] * across
];

const wrapFinger = (
  alongOffset: number,
  outerRadius: number,
  middleRadius: number
): FingerPath => [
  pointOnGripFrame(alongOffset - 8, outerRadius),
  pointOnGripFrame(alongOffset + 1, middleRadius),
  pointOnGripFrame(alongOffset + 10, -outerRadius)
];

const wrapThumb = (
  startRadius: number,
  middleRadius: number,
  endRadius: number
): FingerPath => [
  pointOnGripFrame(37, -startRadius),
  pointOnGripFrame(18, middleRadius),
  pointOnGripFrame(2, endRadius)
];

/** A short crease perpendicular to the first finger segment at its flexion point. */
const fingerCrease = (path: FingerPath): GripLine => {
  const [start, joint] = path;
  const tangent: GripPoint = [joint[0] - start[0], joint[1] - start[1]];
  const length = Math.hypot(tangent[0], tangent[1]);
  if (length <= 0) {
    throw new Error("Finger articulation segment must have non-zero length.");
  }

  const t = 0.52;
  const center: GripPoint = [
    start[0] + tangent[0] * t,
    start[1] + tangent[1] * t
  ];
  const perpendicular: GripPoint = [
    -tangent[1] / length,
    tangent[0] / length
  ];
  const halfLength = 5.5;
  return [
    [
      center[0] - perpendicular[0] * halfLength,
      center[1] - perpendicular[1] * halfLength
    ],
    [
      center[0] + perpendicular[0] * halfLength,
      center[1] + perpendicular[1] * halfLength
    ]
  ];
};

const palmCrease = (palm: GripPoint): FingerPath => [
  [palm[0] - 21, palm[1] - 1],
  [palm[0] - 8, palm[1] + 8],
  [palm[0] + 9, palm[1] + 6]
];

const thumbBaseFrom = (palm: GripPoint, thumbPath: FingerPath): GripPoint => [
  (palm[0] + thumbPath[1][0]) / 2,
  (palm[1] + thumbPath[1][1]) / 2
];

const thumbBaseCrease = (base: GripPoint): FingerPath => [
  [base[0] - 7, base[1] + 1],
  [base[0], base[1] + 8],
  [base[0] + 7, base[1] + 6]
];

const makePose = (
  palm: GripPoint,
  thumb: GripPoint,
  thumbPath: FingerPath,
  index: FingerPath,
  middle: FingerPath,
  ring: FingerPath,
  pinky: FingerPath
): NiaGripPose => {
  const thumbBase = thumbBaseFrom(palm, thumbPath);
  return {
    palm,
    palmCrease: palmCrease(palm),
    thumb,
    thumbPath,
    thumbBase,
    thumbBaseCrease: thumbBaseCrease(thumbBase),
    fingerCreases: {
      index: fingerCrease(index),
      middle: fingerCrease(middle),
      ring: fingerCrease(ring),
      pinky: fingerCrease(pinky)
    },
    index,
    middle,
    ring,
    pinky
  };
};

/**
 * Finger paths are cross-sections around the spoon handle, spaced along its
 * local axis. The thumb travels in the opposite direction to form a visible
 * opposing pinch instead of clustering four strokes at one point.
 *
 * Joint creases and the thumb-base/palm details are authored in the same
 * prop-local frame, so they follow every lift and inspection rotation.
 */
export const NIA_GRIP_POSES: Record<NiaGripPoseName, NiaGripPose> = {
  rest: makePose(
    [...NIA_GRIP_LOCAL_POSITION],
    pointOnGripFrame(2, 25),
    wrapThumb(28, -4, 25),
    wrapFinger(-24, 29, 2),
    wrapFinger(-8, 29, 2),
    wrapFinger(8, 29, 2),
    wrapFinger(24, 29, 2)
  ),
  brace: makePose(
    [NIA_GRIP_LOCAL_POSITION[0] - 1, NIA_GRIP_LOCAL_POSITION[1] - 1],
    pointOnGripFrame(2, 22),
    wrapThumb(25, -2, 22),
    wrapFinger(-23, 25, 0),
    wrapFinger(-7, 25, 0),
    wrapFinger(9, 25, 0),
    wrapFinger(25, 25, 0)
  )
};
