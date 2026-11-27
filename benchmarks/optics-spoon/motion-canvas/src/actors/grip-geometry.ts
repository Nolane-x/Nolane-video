import {
  NIA_GRIP_LOCAL_POSITION,
  SPOON_HANDLE_LOCAL_END,
  SPOON_HANDLE_LOCAL_START
} from "./rig-anchors";

export type GripPoint = [number, number];
export type FingerPath = [GripPoint, GripPoint, GripPoint];
export type NiaGripPoseName = "rest" | "brace";

export type NiaGripPose = {
  palm: GripPoint;
  thumb: GripPoint;
  thumbPath: FingerPath;
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
// All finger paths are then generated relative to that measured contact frame.
const anchorDelta: GripPoint = [
  NIA_GRIP_LOCAL_POSITION[0] - SPOON_HANDLE_LOCAL_START[0],
  NIA_GRIP_LOCAL_POSITION[1] - SPOON_HANDLE_LOCAL_START[1]
];
const gripAlong =
  anchorDelta[0] * axis[0] + anchorDelta[1] * axis[1];
// Finger and thumb points are measured from the physical handle axis,
 // not from the slightly offset palm anchor. This keeps the wrap centred on
 // the shaft while allowing the palm itself to sit naturally behind it.
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

/**
 * Finger paths are cross-sections around the spoon handle, spaced along its
 * local axis. The thumb travels in the opposite direction to form a visible
 * opposing pinch instead of clustering four strokes at one point.
 */
export const NIA_GRIP_POSES: Record<NiaGripPoseName, NiaGripPose> = {
  rest: {
    palm: [...NIA_GRIP_LOCAL_POSITION],
    thumb: pointOnGripFrame(2, 25),
    thumbPath: wrapThumb(28, -4, 25),
    index: wrapFinger(-24, 29, 2),
    middle: wrapFinger(-8, 29, 2),
    ring: wrapFinger(8, 29, 2),
    pinky: wrapFinger(24, 29, 2)
  },
  brace: {
    palm: [NIA_GRIP_LOCAL_POSITION[0] - 1, NIA_GRIP_LOCAL_POSITION[1] - 1],
    thumb: pointOnGripFrame(1, 22),
    thumbPath: wrapThumb(25, -2, 22),
    index: wrapFinger(-23, 25, 0),
    middle: wrapFinger(-7, 25, 0),
    ring: wrapFinger(9, 25, 0),
    pinky: wrapFinger(25, 25, 0)
  }
};
