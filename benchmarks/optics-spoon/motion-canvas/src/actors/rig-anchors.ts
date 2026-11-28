export type StagePoint = readonly [number, number];

/** Canonical stage and local-space anchors for Nia's spoon interaction rig. */
/** Small, controlled counterbalance poses keep Nia's shoulder attached to her torso. */
export const NIA_BODY_POSES = {
  rest: {
    torsoPosition: [505, 185] as StagePoint,
    torsoRotationDegrees: 0,
    neckPosition: [505, 32] as StagePoint,
    shoulder: [420, 95] as StagePoint
  },
  lift: {
    torsoPosition: [512, 188] as StagePoint,
    torsoRotationDegrees: 2.5,
    neckPosition: [512, 35] as StagePoint,
    shoulder: [431, 94] as StagePoint
  },
  inspect: {
    torsoPosition: [511, 187] as StagePoint,
    torsoRotationDegrees: 1.5,
    neckPosition: [511, 34] as StagePoint,
    shoulder: [428, 95] as StagePoint
  }
} as const;

export const SPOON_REST_ORIGIN: StagePoint = [-320, 80];
/** A clear-out position that puts the full bowl above the waterline and right of the glass. */
export const SPOON_LIFT_ORIGIN: StagePoint = [-280, -50];
export const SPOON_LIFT_ROTATION_DEGREES = -50;
export const SPOON_INSPECT_ROTATION_DEGREES = -44;
export const SPOON_BOWL_LOCAL_POSITION: StagePoint = [195, 285];
/** Visual vertical half-extent including the bowl stroke. */
export const SPOON_BOWL_VERTICAL_HALF_EXTENT = 53;
export const KITCHEN_WATERLINE_STAGE_Y = 80;
export const NIA_GRIP_LOCAL_POSITION: StagePoint = [-36, -80];

/** The physical handle axis in spoon-local coordinates; shared by prop and grip geometry. */
export const SPOON_HANDLE_LOCAL_START: StagePoint = [-145, -380];
export const SPOON_HANDLE_LOCAL_END: StagePoint = [0, 0];

export const getSpoonGripStagePoint = (
  spoonOrigin: StagePoint,
  rotationDegrees = 0
): [number, number] => {
  const radians = rotationDegrees * Math.PI / 180;
  const [localX, localY] = NIA_GRIP_LOCAL_POSITION;
  const rotatedX = localX * Math.cos(radians) - localY * Math.sin(radians);
  const rotatedY = localX * Math.sin(radians) + localY * Math.cos(radians);
  return [spoonOrigin[0] + rotatedX, spoonOrigin[1] + rotatedY];
};

export const NIA_REST_GRIP_STAGE_POINT = getSpoonGripStagePoint(SPOON_REST_ORIGIN);
export const NIA_LIFT_GRIP_STAGE_POINT = getSpoonGripStagePoint(
  SPOON_LIFT_ORIGIN,
  SPOON_LIFT_ROTATION_DEGREES
);
export const NIA_LIFT_TURN_GRIP_STAGE_POINT = getSpoonGripStagePoint(
  SPOON_LIFT_ORIGIN,
  SPOON_INSPECT_ROTATION_DEGREES
);
