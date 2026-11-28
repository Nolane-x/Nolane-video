import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const here = new URL("../src/actors/", import.meta.url);

const loadTypeScriptModule = async (fileName) => {
  const source = await readFile(new URL(fileName, here), "utf8");
  const result = ts.transpileModule(source, {
    fileName,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true
    }
  });
  const errors = (result.diagnostics ?? []).filter(
    diagnostic => diagnostic.category === ts.DiagnosticCategory.Error
  );
  if (errors.length > 0) {
    const message = ts.formatDiagnostics(errors, {
      getCanonicalFileName: file => file,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => "\n"
    });
    throw new Error(message);
  }
  const encoded = Buffer.from(result.outputText, "utf8").toString("base64");
  return import(`data:text/javascript;base64,${encoded}`);
};

const anchors = await loadTypeScriptModule("rig-anchors.ts");
const { solveTwoBoneIK } = await loadTypeScriptModule("arm-ik.ts");
const upperLength = 200;
const forearmLength = 615;

const cases = [
  {
    name: "rest",
    shoulder: anchors.NIA_BODY_POSES.rest.shoulder,
    target: anchors.NIA_REST_GRIP_STAGE_POINT,
    expectedElbow: [258.5673095667, -23.0656023550]
  },
  {
    name: "lift",
    shoulder: anchors.NIA_BODY_POSES.lift.shoulder,
    target: anchors.NIA_LIFT_GRIP_STAGE_POINT,
    expectedElbow: [241.9723705312, 28.6658183078]
  },
  {
    name: "inspect",
    shoulder: anchors.NIA_BODY_POSES.inspect.shoulder,
    target: anchors.NIA_LIFT_TURN_GRIP_STAGE_POINT,
    expectedElbow: [246.3161148412, 11.3880040091]
  }
];
const shoulder = cases[0].shoulder;

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

const rotateLocalPoint = (origin, angleDegrees, point) => {
  const radians = angleDegrees * Math.PI / 180;
  const [x, y] = point;
  return [
    origin[0] + x * Math.cos(radians) - y * Math.sin(radians),
    origin[1] + x * Math.sin(radians) + y * Math.cos(radians)
  ];
};
const bowlCenter = rotateLocalPoint(
  anchors.SPOON_LIFT_ORIGIN,
  anchors.SPOON_LIFT_ROTATION_DEGREES,
  anchors.SPOON_BOWL_LOCAL_POSITION
);
const bowlLowerEdge = bowlCenter[1] + anchors.SPOON_BOWL_VERTICAL_HALF_EXTENT;
assert.ok(
  bowlLowerEdge <= anchors.KITCHEN_WATERLINE_STAGE_Y - 30,
  `lifted bowl must clear the waterline by at least 30 px; lower edge is ${bowlLowerEdge}`
);
const glassRightEdge = -90;
assert.ok(
  bowlCenter[0] - 30 > glassRightEdge,
  "lifted bowl must move completely to the right of the glass"
);
for (const poseName of ["NIA_LIFT_GRIP_STAGE_POINT", "NIA_LIFT_TURN_GRIP_STAGE_POINT"]) {
  const wrist = anchors[poseName];
  const reach = distance(shoulder, wrist);
  assert.ok(
    reach <= upperLength + forearmLength && reach >= Math.abs(upperLength - forearmLength),
    `${poseName} must remain reachable by the two-bone arm`
  );
}
const near = (actual, expected, tolerance, label) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: expected ${expected}, received ${actual}`
  );
};

for (const pose of cases) {
  const elbow = solveTwoBoneIK(
    pose.shoulder,
    pose.target,
    upperLength,
    forearmLength,
    1
  );
  near(elbow[0], pose.expectedElbow[0], 1e-6, `${pose.name} elbow.x`);
  near(elbow[1], pose.expectedElbow[1], 1e-6, `${pose.name} elbow.y`);
  near(distance(pose.shoulder, elbow), upperLength, 1e-6, `${pose.name} upper length`);
  near(distance(elbow, pose.target), forearmLength, 1e-6, `${pose.name} forearm length`);
}

const positiveBend = solveTwoBoneIK(shoulder, cases[0].target, upperLength, forearmLength, 1);
const negativeBend = solveTwoBoneIK(shoulder, cases[0].target, upperLength, forearmLength, -1);
// Confirm bendDirection selects the alternate, equally valid elbow branch.
assert.notDeepEqual(positiveBend, negativeBend, "bend direction must select a distinct IK branch");

// Simulate the tween callback at 101 samples across all S02 transitions.
// Every intermediate sample must preserve both segment lengths and remain
// reachable; this catches the endpoint-only interpolation failure mode.
const interpolate = (from, to, progress) => [
  from[0] + (to[0] - from[0]) * progress,
  from[1] + (to[1] - from[1]) * progress
];
const easeInOutCubic = value =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;

for (const [fromPose, toPose] of [
  [cases[0], cases[1]],
  [cases[1], cases[2]],
  [cases[2], cases[0]]
]) {
  for (let sample = 0; sample <= 100; sample += 1) {
    const progress = easeInOutCubic(sample / 100);
    const shoulderPoint = interpolate(fromPose.shoulder, toPose.shoulder, progress);
    const wrist = interpolate(fromPose.target, toPose.target, progress);
    const solvedElbow = solveTwoBoneIK(shoulderPoint, wrist, upperLength, forearmLength, 1);
    near(distance(shoulderPoint, solvedElbow), upperLength, 1e-6, "intermediate upper length");
    near(distance(solvedElbow, wrist), forearmLength, 1e-6, "intermediate forearm length");
  }
}

assert.throws(
  () => solveTwoBoneIK(shoulder, [1300, 95], upperLength, forearmLength, 1),
  { name: "RangeError" },
  "unreachable wrist targets must fail instead of stretching the arm"
);
assert.throws(
  () => solveTwoBoneIK(shoulder, [500, 95], upperLength, forearmLength, 1),
  { name: "RangeError" },
  "targets inside the minimum reach radius must also fail"
);
assert.throws(
  () => solveTwoBoneIK(shoulder, shoulder, upperLength, forearmLength, 1),
  { name: "RangeError" },
  "coincident shoulder and wrist targets must fail"
);
assert.throws(
  () => solveTwoBoneIK(shoulder, cases[0].target, 0, forearmLength, 1),
  { name: "RangeError" },
  "zero-length bones must fail"
);
assert.throws(
  () => solveTwoBoneIK(shoulder, cases[0].target, upperLength, forearmLength, 0),
  { name: "RangeError" },
  "invalid bend direction must fail"
);
assert.throws(
  () => solveTwoBoneIK([Number.NaN, 95], cases[0].target, upperLength, forearmLength, 1),
  { name: "TypeError" },
  "non-finite coordinates must fail"
);

console.log(
  "Arm IK passed: 3 named poses, fixed segment lengths, both bend branches, unreachable and invalid input guards."
);
