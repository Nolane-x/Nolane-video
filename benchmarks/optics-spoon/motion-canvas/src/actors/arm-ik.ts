export type ArmPoint = readonly [number, number];
export type BendDirection = -1 | 1;

const REACH_TOLERANCE = 1e-7;
const INPUT_EPSILON = 1e-9;

const assertPoint = (name: string, point: ArmPoint): void => {
  if (
    point.length !== 2 ||
    !Number.isFinite(point[0]) ||
    !Number.isFinite(point[1])
  ) {
    throw new TypeError(`${name} must contain two finite coordinates.`);
  }
};

/**
 * Solve a planar two-bone chain using the law of cosines.
 *
 * Coordinates use the stage convention (+Y down). bendDirection selects the
 * signed perpendicular side of the shoulder-to-target axis; it is stable for
 * every named Nia pose so the elbow does not flip branches between frames.
 *
 * Unreachable targets are rejected instead of silently stretching either
 * segment. The returned elbow is in stage coordinates.
 */
export const solveTwoBoneIK = (
  shoulder: ArmPoint,
  target: ArmPoint,
  upperLength: number,
  forearmLength: number,
  bendDirection: BendDirection = 1
): [number, number] => {
  assertPoint("shoulder", shoulder);
  assertPoint("target", target);

  if (!Number.isFinite(upperLength) || upperLength <= 0) {
    throw new RangeError("upperLength must be a positive finite number.");
  }
  if (!Number.isFinite(forearmLength) || forearmLength <= 0) {
    throw new RangeError("forearmLength must be a positive finite number.");
  }
  if (bendDirection !== 1 && bendDirection !== -1) {
    throw new RangeError("bendDirection must be either 1 or -1.");
  }

  const dx = target[0] - shoulder[0];
  const dy = target[1] - shoulder[1];
  const distance = Math.hypot(dx, dy);
  if (distance <= INPUT_EPSILON) {
    throw new RangeError("Shoulder and wrist target cannot occupy the same point.");
  }

  const minimumReach = Math.abs(upperLength - forearmLength);
  const maximumReach = upperLength + forearmLength;
  if (
    distance < minimumReach - REACH_TOLERANCE ||
    distance > maximumReach + REACH_TOLERANCE
  ) {
    throw new RangeError(
      `Wrist target is unreachable: distance ${distance.toFixed(4)} is outside [${minimumReach.toFixed(4)}, ${maximumReach.toFixed(4)}].`
    );
  }

  // Clamp only floating-point boundary noise; never hide a genuinely
  // unreachable target (checked immediately above).
  const solvedDistance = Math.min(maximumReach, Math.max(minimumReach, distance));
  const along = (
    upperLength * upperLength -
    forearmLength * forearmLength +
    solvedDistance * solvedDistance
  ) / (2 * solvedDistance);
  const heightSquared = upperLength * upperLength - along * along;
  if (heightSquared < -REACH_TOLERANCE) {
    throw new RangeError("IK geometry is numerically unstable for this target.");
  }

  const height = Math.sqrt(Math.max(0, heightSquared));
  const unitX = dx / distance;
  const unitY = dy / distance;
  const perpendicularX = -unitY;
  const perpendicularY = unitX;

  return [
    shoulder[0] + unitX * along + bendDirection * perpendicularX * height,
    shoulder[1] + unitY * along + bendDirection * perpendicularY * height
  ];
};
