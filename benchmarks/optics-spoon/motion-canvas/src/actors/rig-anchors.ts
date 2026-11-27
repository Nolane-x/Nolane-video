export type StagePoint = readonly [number, number];

/** Canonical stage and local-space anchors for Nia's spoon interaction rig. */
export const SPOON_REST_ORIGIN: StagePoint = [-320, 80];
export const SPOON_LIFT_ORIGIN: StagePoint = [-320, 10];
export const NIA_GRIP_LOCAL_POSITION: StagePoint = [-36, -80];

export const getSpoonGripStagePoint = (spoonOrigin: StagePoint): [number, number] => [
  spoonOrigin[0] + NIA_GRIP_LOCAL_POSITION[0],
  spoonOrigin[1] + NIA_GRIP_LOCAL_POSITION[1]
];

export const NIA_REST_GRIP_STAGE_POINT = getSpoonGripStagePoint(SPOON_REST_ORIGIN);
export const NIA_LIFT_GRIP_STAGE_POINT = getSpoonGripStagePoint(SPOON_LIFT_ORIGIN);
