export type StagePoint = readonly [number, number];

/** Canonical stage and local-space anchors for Nia's spoon interaction rig. */
export const SPOON_REST_ORIGIN: StagePoint = [-320, 80];
export const SPOON_LIFT_ORIGIN: StagePoint = [-320, 10];
export const NIA_GRIP_LOCAL_POSITION: StagePoint = [-36, -80];

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
export const NIA_LIFT_GRIP_STAGE_POINT = getSpoonGripStagePoint(SPOON_LIFT_ORIGIN, -5);
export const NIA_LIFT_TURN_GRIP_STAGE_POINT = getSpoonGripStagePoint(SPOON_LIFT_ORIGIN, 6);
