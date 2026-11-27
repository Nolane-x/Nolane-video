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
const shoulder = [420, 95];
const upperLength = 200;
const forearmLength = 615;

const cases = [
  {
    name: "rest",
    target: anchors.NIA_REST_GRIP_STAGE_POINT,
    expectedElbow: [258.5673095667, -23.0656023550]
  },
  {
    name: "lift",
    target: anchors.NIA_LIFT_GRIP_STAGE_POINT,
    expectedElbow: [249.5191043981, -9.5765950620]
  },
  {
    name: "inspect",
    target: anchors.NIA_LIFT_TURN_GRIP_STAGE_POINT,
    expectedElbow: [266.2284035238, -32.8839165695]
  }
];

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const near = (actual, expected, tolerance, label) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: expected ${expected}, received ${actual}`
  );
};

for (const pose of cases) {
  const elbow = solveTwoBoneIK(
    shoulder,
    pose.target,
    upperLength,
    forearmLength,
    1
  );
  near(elbow[0], pose.expectedElbow[0], 1e-6, `${pose.name} elbow.x`);
  near(elbow[1], pose.expectedElbow[1], 1e-6, `${pose.name} elbow.y`);
  near(distance(shoulder, elbow), upperLength, 1e-6, `${pose.name} upper length`);
  near(distance(elbow, pose.target), forearmLength, 1e-6, `${pose.name} forearm length`);
}

const positiveBend = solveTwoBoneIK(shoulder, cases[0].target, upperLength, forearmLength, 1);
const negativeBend = solveTwoBoneIK(shoulder, cases[0].target, upperLength, forearmLength, -1);
assert.notDeepEqual(positiveBend, negativeBend, "bend direction must select a distinct IK branch");

assert.throws(
  () => solveTwoBoneIK(shoulder, [1200, 95], upperLength, forearmLength, 1),
  { name: "RangeError" },
  "unreachable wrist targets must fail instead of stretching the arm"
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
