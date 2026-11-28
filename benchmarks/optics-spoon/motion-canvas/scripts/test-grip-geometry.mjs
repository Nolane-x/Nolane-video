import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const here = new URL("../src/actors/", import.meta.url);

const loadTypeScriptModule = async (fileName, sourceOverrides = []) => {
  let source = await readFile(new URL(fileName, here), "utf8");
  for (const [before, after] of sourceOverrides) {
    if (!source.includes(before)) {
      throw new Error(`Unable to resolve ${before} in ${fileName}.`);
    }
    source = source.replace(before, after);
  }

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
        getNewLine: () => "\\n"
      })
    );
  }
  const encoded = Buffer.from(result.outputText, "utf8").toString("base64");
  const url = `data:text/javascript;base64,${encoded}`;
  return {module: await import(url), url};
};

const {module: anchors, url: anchorsUrl} = await loadTypeScriptModule("rig-anchors.ts");
const {module: gripGeometry} = await loadTypeScriptModule("grip-geometry.ts", [
  ['from "./rig-anchors";', `from "${anchorsUrl}";`]
]);
const {NIA_GRIP_POSES} = gripGeometry;

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
  const contourProfiles = [];

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
    contourProfiles.push([
      startPoint.across.toFixed(3),
      middlePoint.across.toFixed(3),
      endPoint.across.toFixed(3)
    ].join(":"));
  }

  for (let i = 1; i < middleAlong.length; i += 1) {
    assert.ok(middleAlong[i] - middleAlong[i - 1] >= 14, `${poseName}: adjacent fingers must remain separated along the handle`);
  }
  assert.equal(
    new Set(contourProfiles).size,
    fingerNames.length,
    `${poseName}: each finger must have its own wrap curvature`
  );

  const thumbStart = project(pose.thumbPath[0]);
  const thumbMiddle = project(pose.thumbPath[1]);
  const thumbEnd = project(pose.thumbPath[2]);
  assert.ok(thumbStart.across < -20, `${poseName}: thumb starts opposite the four fingers`);
  assert.ok(Math.abs(thumbMiddle.across) <= 10, `${poseName}: thumb approaches the handle centreline`);
  assert.ok(thumbEnd.across > 20, `${poseName}: thumb closes across the handle`);

  near(pose.thumb[0], pose.thumbPath[2][0], 1e-9, `${poseName} thumb x`);
  near(pose.thumb[1], pose.thumbPath[2][1], 1e-9, `${poseName} thumb y`);
}


for (const poseName of ["rest", "brace"]) {
  const pose = NIA_GRIP_POSES[poseName];
  const palmBounds = {left: pose.palm[0] - 31, right: pose.palm[0] + 31, top: pose.palm[1] - 20, bottom: pose.palm[1] + 20};

  for (const name of ["index", "middle", "ring", "pinky"]) {
    const path = pose[name];
    const crease = pose.fingerCreases[name];
    assert.equal(crease.length, 2, `${poseName}/${name}: expected a two-point flexion crease`);
    const tangent = [path[1][0] - path[0][0], path[1][1] - path[0][1]];
    const creaseVector = [crease[1][0] - crease[0][0], crease[1][1] - crease[0][1]];
    const dot = tangent[0] * creaseVector[0] + tangent[1] * creaseVector[1];
    const creaseLength = Math.hypot(creaseVector[0], creaseVector[1]);
    assert.ok(Math.abs(dot) <= 1e-7, `${poseName}/${name}: joint crease must be perpendicular to the finger segment`);
    near(creaseLength, 11, 1e-7, `${poseName}/${name} crease length`);

    const expectedCenter = [
      path[0][0] + tangent[0] * 0.52,
      path[0][1] + tangent[1] * 0.52
    ];
    near((crease[0][0] + crease[1][0]) / 2, expectedCenter[0], 1e-7, `${poseName}/${name} crease x`);
    near((crease[0][1] + crease[1][1]) / 2, expectedCenter[1], 1e-7, `${poseName}/${name} crease y`);
  }

  for (const point of pose.palmCrease) {
    assert.ok(point[0] >= palmBounds.left && point[0] <= palmBounds.right, `${poseName}: palm crease x must stay inside palm bounds`);
    assert.ok(point[1] >= palmBounds.top && point[1] <= palmBounds.bottom, `${poseName}: palm crease y must stay inside palm bounds`);
  }

  near(pose.thumbBase[0], (pose.palm[0] + pose.thumbPath[1][0]) / 2, 1e-7, `${poseName} thumb base x`);
  near(pose.thumbBase[1], (pose.palm[1] + pose.thumbPath[1][1]) / 2, 1e-7, `${poseName} thumb base y`);
  assert.equal(pose.thumbBaseCrease.length, 3, `${poseName}: expected shaped thumb-base crease`);
  assert.ok(pose.thumbBaseCrease.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y)), `${poseName}: thumb-base crease must be finite`);
}

assert.notDeepEqual(
  NIA_GRIP_POSES.rest.fingerCreases.index,
  NIA_GRIP_POSES.brace.fingerCreases.index,
  "finger creases must follow the changing grip pose"
);


for (const name of ["index", "middle", "ring", "pinky"]) {
  const restPath = NIA_GRIP_POSES.rest[name];
  const bracePath = NIA_GRIP_POSES.brace[name];
  const restSpan = project(restPath[0]).across - project(restPath[2]).across;
  const braceSpan = project(bracePath[0]).across - project(bracePath[2]).across;
  assert.ok(
    braceSpan < restSpan,
    `brace/${name}: the flexed pose must compress the finger wrap around the shaft`
  );
}

console.log(
  "Grip geometry passed: four distinct finger wraps compress from rest to brace and retain an opposing thumb."
);
