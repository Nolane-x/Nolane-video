import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const here = new URL("../src/actors/", import.meta.url);

const loadTypeScriptModule = async fileName => {
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
  if (errors.length) {
    throw new Error(
      ts.formatDiagnostics(errors, {
        getCanonicalFileName: file => file,
        getCurrentDirectory: () => process.cwd(),
        getNewLine: () => "\n"
      })
    );
  }
  const encoded = Buffer.from(result.outputText, "utf8").toString("base64");
  return import(`data:text/javascript;base64,${encoded}`);
};

const anchors = await loadTypeScriptModule("rig-anchors.ts");
const { NIA_GRIP_POSES } = await loadTypeScriptModule("grip-geometry.ts");

const ax = anchors.SPOON_HANDLE_LOCAL_END[0] - anchors.SPOON_HANDLE_LOCAL_START[0];
const ay = anchors.SPOON_HANDLE_LOCAL_END[1] - anchors.SPOON_HANDLE_LOCAL_START[1];
const length = Math.hypot(ax, ay);
const ux = ax / length;
const uy = ay / length;
const nx = -uy;
const ny = ux;
const start = anchors.SPOON_HANDLE_LOCAL_START;

const project = ([x, y]) => {
  const dx = x - start[0];
  const dy = y - start[1];
  return {
    along: dx * ux + dy * uy,
    across: dx * nx + dy * ny
  };
};

const near = (actual, expected, tolerance, label) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: expected ${expected}, received ${actual}`
  );
};

for (const poseName of ["rest", "brace"]) {
  const pose = NIA_GRIP_POSES[poseName];
  const fingerNames = ["index", "middle", "ring", "pinky"];
  const middleAlong = [];

  for (const name of fingerNames) {
    const path = pose[name];
    assert.equal(path.length, 3, `${poseName}/${name}: expected three articulation points`);
    const startPoint = project(path[0]);
    const middlePoint = project(path[1]);
    const endPoint = project(path[2]);

    // Each finger must approach one side of the shaft, cross its centreline,
    // and wrap around to the opposite side.
    assert.ok(startPoint.across > 20, `${poseName}/${name}: start must be on the positive side`);
    assert.ok(endPoint.across < -20, `${poseName}/${name}: end must wrap to the negative side`);
    assert.ok(Math.abs(middlePoint.across) <= 3, `${poseName}/${name}: middle must cross the handle axis`);
    assert.ok(middlePoint.along >= 250 && middlePoint.along <= 360, `${poseName}/${name}: contact point must remain in the palm region`);
    middleAlong.push(middlePoint.along);
  }

  for (let i = 1; i < middleAlong.length; i += 1) {
    assert.ok(middleAlong[i] - middleAlong[i - 1] >= 14, `${poseName}: adjacent fingers must remain separated along the handle`);
  }

  const thumbStart = project(pose.thumbPath[0]);
  const thumbMiddle = project(pose.thumbPath[1]);
  const thumbEnd = project(pose.thumbPath[2]);
  assert.ok(thumbStart.across < -20, `${poseName}: thumb starts opposite the four fingers`);
  assert.ok(Math.abs(thumbMiddle.across) <= 10, `${poseName}: thumb approaches the handle centreline`);
  assert.ok(thumbEnd.across > 20, `${poseName}: thumb closes across the handle`);

  near(pose.thumb[0], pose.thumbPath[2][0], 1e-9, `${poseName} thumb x`);
  near(pose.thumb[1], pose.thumbPath[2][1], 1e-9, `${poseName} thumb y`);
}

console.log(
  "Grip geometry passed: four separated fingers cross the handle centreline, with an opposing thumb on both rest and brace poses."
);
