import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../src/benchmark-motion.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  fileName: "benchmark-motion.ts",
  reportDiagnostics: true,
  compilerOptions: {module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022, strict: true}
});
const errors = (compiled.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error);
assert.equal(errors.length, 0, "benchmark motion module must transpile without errors");
const encoded = Buffer.from(compiled.outputText, "utf8").toString("base64");
const {s02MotionAt, diagramMotionAt, diagramCaptionAt, cameraScaleAt} = await import("data:text/javascript;base64," + encoded);
const near = (actual, expected, tolerance, label) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, label + ": expected " + expected + ", received " + actual);
};
const inRange = (value, lo, hi, label) => {
  assert.ok(value >= lo && value <= hi, label + ": " + value + " is outside [" + lo + ", " + hi + "]");
};

const start = s02MotionAt(192);
near(start.straightness, 0, 1e-9, "S02 starts submerged");
near(start.handLiftPx, 0, 1e-9, "initial hand position");
near(s02MotionAt(201).anticipation, 1, 1e-9, "anticipation");
inRange(s02MotionAt(238).lift, 0.45, 0.55, "lift midpoint");
near(s02MotionAt(266).straightness, 1, 1e-9, "straight spoon");
near(s02MotionAt(299).spoonRotationDeg, 6, 1e-9, "inspection turn peak");
near(s02MotionAt(310).spoonRotationDeg, 0, 1e-9, "inspection settle");
inRange(s02MotionAt(362).redip, 0.45, 0.55, "re-dip midpoint");
near(s02MotionAt(390).straightness, 0, 1e-9, "re-dip completion");
assert.ok(s02MotionAt(414).lean > 0.8, "Nia leans toward the waterline");
near(s02MotionAt(431).lean, 1, 1e-9, "S02 end reaction");
near(s02MotionAt(432).straightness, 0, 1e-9, "S02 state does not leak into next shot");
for (let frame = 192; frame < 432; frame += 1) {
  const m = s02MotionAt(frame);
  near(m.handLiftPx, 70 * m.straightness - 4 * m.anticipation, 1e-9, "hand/prop coupling");
  inRange(m.straightness, 0, 1, "straightness range");
  inRange(m.spoonRotationDeg, 0, 6, "turn range");
}

near(diagramMotionAt(519).incidentRay, 0, 1e-9, "incident ray must not appear early");
near(diagramMotionAt(538).incidentRay, 1, 1e-9, "incident ray reveal");
near(diagramMotionAt(538).refractedRay, 0, 1e-9, "outgoing ray follows incident ray");
near(diagramMotionAt(598).refractedRay, 1, 1e-9, "refracted ray reveal");
near(diagramMotionAt(598).normal, 0, 1e-9, "normal belongs to S04");
near(diagramMotionAt(708).normal, 1, 1e-9, "normal reveal");
near(diagramMotionAt(866).angles, 1, 1e-9, "angle labels reveal");
near(diagramMotionAt(938).formula, 1, 1e-9, "Snell formula reveal");
near(diagramMotionAt(1056).backward, 0, 1e-9, "backward extension starts in S05");
near(diagramMotionAt(1076).backward, 1, 1e-9, "backward extension reveal");
near(diagramMotionAt(1098).trueLabel, 0, 1e-9, "true-position label waits for the construction hold");
near(diagramMotionAt(1109).trueLabel, 1, 1e-9, "true-position label reveal");
near(diagramMotionAt(1116).apparent, 0, 1e-9, "apparent point waits after the true-position label");
near(diagramMotionAt(1132).apparent, 1, 1e-9, "apparent point reveal");
assert.equal(diagramCaptionAt(1055), "Nước → Không khí: tia sáng lệch xa pháp tuyến.");
assert.equal(diagramCaptionAt(1056), "Kéo dài tia khúc xạ ngược về phía dưới nước.");
assert.equal(diagramCaptionAt(1098), "Kéo dài tia khúc xạ ngược về phía dưới nước.");
assert.equal(diagramCaptionAt(1099), "Đây là vị trí thật của thìa dưới nước.");
assert.equal(diagramCaptionAt(1116), "Đây là vị trí thật của thìa dưới nước.");
assert.equal(diagramCaptionAt(1117), "Ảnh biểu kiến nằm gần mặt nước hơn vị trí thật.");
assert.throws(() => diagramCaptionAt(Number.NaN), {name: "TypeError"});
assert.throws(() => s02MotionAt(Number.NaN), {name: "TypeError"});
assert.throws(() => diagramMotionAt(Number.POSITIVE_INFINITY), {name: "TypeError"});

near(cameraScaleAt(30), 1, 1e-9, "S01 camera starts at the baseline scale");
near(cameraScaleAt(48), 1.0125, 1e-9, "S01 camera push-in midpoint");
near(cameraScaleAt(65), 1.025, 1e-9, "S01 camera push-in reaches its 2.5% target");
near(cameraScaleAt(431), 1.025, 1e-9, "S01 push-in holds until the cutaway");
near(cameraScaleAt(432), 1.025, 1e-9, "S03 cutaway begins the camera reset");
near(cameraScaleAt(441.5), 1.0125, 1e-9, "S03 camera reset midpoint");
near(cameraScaleAt(451), 1, 1e-9, "S03 camera reset returns to baseline");
near(cameraScaleAt(1545), 1, 1e-9, "S06 push-in begins only after the spoon settles");
near(cameraScaleAt(1558), 1.0125, 1e-9, "S06 camera push-in midpoint");
near(cameraScaleAt(1570), 1.025, 1e-9, "S06 camera push-in reaches its final framing");
near(cameraScaleAt(1727), 1.025, 1e-9, "S06 holds the final close-up");
assert.throws(() => cameraScaleAt(Number.NaN), {name: "TypeError"});

console.log("Remotion storyboard parity passed: S01/S06 camera beats, S02 action arc and S03-S05 causal diagram reveal are deterministic at 24 fps.");
