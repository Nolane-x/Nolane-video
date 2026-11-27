import {
  makeScene2D
} from "@motion-canvas/2d";
import {
  all,
  waitFor,
  usePlayback
} from "@motion-canvas/core";
import storyboard from "../../../shared/storyboard.json";
import { createRefractionDiagram } from "../diagrams/refraction";
import { createNiaActor } from "../actors/nia";
import { createSpoonProp } from "../props/spoon";
import { createKitchenSet } from "../sets/kitchen";
import { NIA_LIFT_GRIP_STAGE_POINT, NIA_LIFT_TURN_GRIP_STAGE_POINT, NIA_REST_GRIP_STAGE_POINT, SPOON_LIFT_ORIGIN, SPOON_REST_ORIGIN } from "../actors/rig-anchors";

const C = {
  ink: "#101B26",
  slate: "#203746",
  ivory: "#F4EDE0",
  brass: "#DDA85E",
  water: "#4EA6B5",
  waterLight: "#9AD8D7",
  ray: "#FFD36A",
  coral: "#E47D68",
  mint: "#8ED2B0",
  muted: "#A9B6BE"
};

export default makeScene2D(function* (view) {
  const playback = usePlayback();
  const checkpoint = (name: string) => {
    const shot = storyboard.shots.find(
      candidate => `${candidate.id}-complete` === name
    );
    const expectedFrame =
      name === "scene-start"
        ? 0
        : shot
          ? shot.end_frame - 1
          : undefined;
    if (expectedFrame === undefined) {
      throw new Error(`Unknown storyboard checkpoint: ${name}.`);
    }
    const actualFrame = Math.round(playback.frame);
    if (actualFrame !== expectedFrame) {
      throw new Error(
        `Shot timing drift at ${name}: expected last included frame ${expectedFrame}, got ${actualFrame}.`
      );
    }
    console.log("[M1 Motion Canvas]", name, {
      frame: actualFrame,
      expected_frame: expectedFrame,
      exclusive_end_frame: shot?.end_frame,
      time_seconds: playback.time,
      fps: playback.fps,
      speed: playback.speed
    });
  };
  checkpoint("scene-start");
  view.fill(C.ink);

  const kitchen = createKitchenSet({water: C.water, waterLight: C.waterLight, ivory: C.ivory});
  const spoon = createSpoonProp({ivory: C.ivory, metal: "#E7E3D9"});
  const nia = createNiaActor();

  const optics = createRefractionDiagram(C);

  view.add(
    <>
      {kitchen.view}
      {spoon.view}
      {nia.view}

      {optics.view}
    </>
  );

  // S01 — 8 seconds: establish Nia's attention, then make a clear grip/contact.
  yield* all(
    kitchen.wall().opacity(1, 0.4),
    kitchen.table().opacity(1, 0.4),
    kitchen.glass().opacity(0.28, 0.5),
    kitchen.water().opacity(0.55, 0.5),
    kitchen.waterline().opacity(1, 0.5),
    spoon.top().opacity(1, 0.5),
    spoon.bentBottom().opacity(1, 0.5),
    spoon.bowl().opacity(1, 0.5),
    nia.torso().opacity(1, 0.5),
    nia.neck().opacity(1, 0.5),
    nia.head().opacity(1, 0.5),
    nia.eyeLeft().opacity(1, 0.5),
    nia.eyeRight().opacity(1, 0.5),
    nia.expression().opacity(1, 0.5),
    nia.mouth().opacity(1, 0.5),
    kitchen.caption().opacity(1, 0.5)
  );
  yield* waitFor(0.45);
  yield* all(
    nia.upperArm().opacity(1, 0.35),
    nia.forearm().opacity(1, 0.35),
    nia.elbow().opacity(1, 0.35),
    spoon.grip.palm().opacity(1, 0.25),
    spoon.grip.indexOutline().opacity(1, 0.25),
    spoon.grip.indexFinger().opacity(1, 0.25),
    spoon.grip.middleOutline().opacity(1, 0.25),
    spoon.grip.middleFinger().opacity(1, 0.25),
    spoon.grip.thumb().opacity(1, 0.25),
    nia.eyeLeft().position([-48, -3], 0.25),
    nia.eyeRight().position([32, -3], 0.25),
    nia.headRig().rotation(-4, 0.25)
  );
  yield* view.scale([1.025, 1.025], 1.4);
  yield* waitFor(5.3);
  checkpoint("S01-complete");

  // S02 — 10 seconds: reveal the straight spoon, inspect it, then re-dip it.
  // The hand remains parented to the spoon prop, so grip and prop stay coupled.
  yield* all(
    spoon.top().opacity(0, 0.4),
    spoon.bentBottom().opacity(0, 0.4),
    spoon.straight().opacity(1, 0.4),
    nia.expression().text("!", 0.3),
    nia.mouth().points([[-17, 62], [0, 85], [17, 62]], 0.3),
    nia.headRig().position([505, -125], 0.4),
    nia.headRig().rotation(0, 0.4)
  );
  // Anticipation: Nia steadies the wrist before lifting.
  yield* all(
    spoon.grip.thumb().position([-10, -68], 0.25),
    spoon.grip.indexOutline().points([[-6, -66], [-19, -80], [-36, -95]], 0.25),
    spoon.grip.indexFinger().points([[-6, -66], [-19, -80], [-36, -95]], 0.25),
    spoon.grip.middleOutline().points([[-2, -54], [-16, -69], [-32, -85]], 0.25),
    spoon.grip.middleFinger().points([[-2, -54], [-16, -69], [-32, -85]], 0.25)
  );
  yield* all(
    spoon.rig().position([...SPOON_LIFT_ORIGIN], 0.85),
    spoon.rig().rotation(-5, 0.85),
    nia.upperArm().points([[420, 95], [240, 10]], 0.85),
    nia.forearm().points([[240, 10], [...NIA_LIFT_GRIP_STAGE_POINT]], 0.85),
    nia.elbow().position([240, 10], 0.85),
    nia.eyeLeft().position([-55, 0], 0.35),
    nia.eyeRight().position([25, 0], 0.35)
  );
  // Give the viewer time to see that the exposed spoon is physically straight.
  yield* waitFor(0.8);
  yield* all(
    spoon.rig().rotation(6, 0.25),
    nia.forearm().points([[240, 10], [...NIA_LIFT_TURN_GRIP_STAGE_POINT]], 0.25),
    nia.headRig().position([505, -118], 0.25),
    nia.headRig().rotation(3, 0.25)
  );
  // Re-dip: the physical prop stays rigid while the underwater portion appears offset.
  yield* all(
    spoon.straight().opacity(0, 0.2),
    spoon.top().opacity(1, 0.2),
    spoon.bentBottom().opacity(1, 0.2)
  );
  yield* all(
    spoon.rig().position([...SPOON_REST_ORIGIN], 0.85),
    spoon.rig().rotation(0, 0.85),
    nia.upperArm().points([[420, 95], [245, 30]], 0.85),
    nia.forearm().points([[245, 30], [...NIA_REST_GRIP_STAGE_POINT]], 0.85),
    nia.elbow().position([245, 30], 0.85),
    nia.eyeLeft().position([-48, -3], 0.5),
    nia.eyeRight().position([32, -3], 0.5)
  );
  // Nia leans closer after seeing the apparent kink.
  yield* all(
    nia.headRig().position([505, -145], 0.6),
    nia.headRig().rotation(4, 0.6),
    nia.expression().text("?", 0.4),
    nia.mouth().points([[-26, 68], [0, 75], [26, 68]], 0.4)
  );
  // Exact ten-second half-open shot, with Motion Canvas's inclusive endpoint correction.
  yield* waitFor(10 - 1 / 24 - (0.4 + 0.25 + 0.85 + 0.8 + 0.25 + 0.2 + 0.85 + 0.6));
  checkpoint("S02-complete");

  // S03 — 10 seconds: move from the everyday scene into the invisible optical path.
  yield* all(
    kitchen.wall().opacity(0, 0.8),
    kitchen.table().opacity(0, 0.8),
    kitchen.glass().opacity(0, 0.8),
    kitchen.water().opacity(0, 0.8),
    kitchen.waterline().opacity(0, 0.8),
    spoon.rig().opacity(0, 0.8),
    nia.torso().opacity(0, 0.8),
    nia.neck().opacity(0, 0.8),
    nia.headRig().opacity(0, 0.8),
    nia.upperArm().opacity(0, 0.8),
    nia.forearm().opacity(0, 0.8),
    nia.elbow().opacity(0, 0.8),
    kitchen.caption().opacity(0, 0.8),
    optics.diagramWater().opacity(0.22, 0.8),
    optics.interfaceLine().opacity(1, 0.8),
    optics.airLabel().opacity(1, 0.8),
    optics.waterLabel().opacity(1, 0.8),
    optics.diagramCaption().opacity(1, 0.8),
    view.scale([1, 1], 0.8)
  );
  yield* waitFor(9.2 + 1 / 24);
  checkpoint("S03-complete");

  // S04 — 16 seconds: construct the physical path in causal order.
  yield* all(
    optics.normal().opacity(1, 0.6),
    optics.normalLabel().opacity(1, 0.6)
  );
  yield* all(
    optics.incident().opacity(1, 0.8),
    optics.truePoint().opacity(1, 0.5)
  );
  yield* waitFor(0.8);
  yield* all(
    optics.refracted().opacity(1, 0.8),
    optics.eyePoint().opacity(1, 0.6)
  );
  yield* all(
    optics.angleWater().opacity(1, 0.6),
    optics.angleAir().opacity(1, 0.6)
  );
  yield* optics.formula().opacity(1, 0.8);
  // Motion Canvas evaluates the final timestamp inclusively; compensate one sample
  // so the scene checkpoint lands on storyboard frame 1055, not 1056.
  yield* waitFor(11.6 - 1 / 24);
  checkpoint("S04-complete");

  // S05 — 17 seconds: derive the apparent point from a backward extension.
  yield* optics.backward().opacity(1, 0.8);
  yield* all(
    optics.apparentPoint().opacity(1, 0.5),
    optics.trueLabel().opacity(1, 0.6),
    optics.apparentLabel().opacity(1, 0.6)
  );
  yield* waitFor(15.6);
  checkpoint("S05-complete");

  // S06 — 11 seconds: return to the intact spoon and resolve the misconception.
  yield* all(
    optics.diagramWater().opacity(0, 0.8),
    optics.interfaceLine().opacity(0, 0.8),
    optics.normal().opacity(0, 0.8),
    optics.incident().opacity(0, 0.8),
    optics.refracted().opacity(0, 0.8),
    optics.backward().opacity(0, 0.8),
    optics.truePoint().opacity(0, 0.8),
    optics.apparentPoint().opacity(0, 0.8),
    optics.eyePoint().opacity(0, 0.8),
    optics.airLabel().opacity(0, 0.8),
    optics.waterLabel().opacity(0, 0.8),
    optics.normalLabel().opacity(0, 0.8),
    optics.angleWater().opacity(0, 0.8),
    optics.angleAir().opacity(0, 0.8),
    optics.formula().opacity(0, 0.8),
    optics.trueLabel().opacity(0, 0.8),
    optics.apparentLabel().opacity(0, 0.8),
    optics.diagramCaption().opacity(0, 0.8),
    kitchen.wall().opacity(1, 0.8),
    kitchen.table().opacity(1, 0.8),
    kitchen.glass().opacity(0.28, 0.8),
    kitchen.water().opacity(0.55, 0.8),
    kitchen.waterline().opacity(1, 0.8),
    spoon.rig().opacity(1, 0.8),
    spoon.rig().position([...SPOON_REST_ORIGIN], 0.8),
    spoon.rig().rotation(0, 0.8),
    spoon.top().opacity(0, 0.8),
    spoon.bentBottom().opacity(0, 0.8),
    spoon.straight().opacity(1, 0.8),
    spoon.bowl().opacity(1, 0.8),
    nia.torso().opacity(1, 0.8),
    nia.neck().opacity(1, 0.8),
    nia.headRig().opacity(1, 0.8),
    nia.headRig().position([505, -105], 0.8),
    nia.headRig().rotation(0, 0.8),
    nia.eyeLeft().opacity(1, 0.8),
    nia.eyeRight().opacity(1, 0.8),
    nia.upperArm().opacity(1, 0.8),
    nia.upperArm().points([[420, 95], [245, 30]], 0.8),
    nia.forearm().opacity(1, 0.8),
    nia.forearm().points([[245, 30], [...NIA_REST_GRIP_STAGE_POINT]], 0.8),
    nia.elbow().opacity(1, 0.8),
    nia.elbow().position([245, 30], 0.8),
    spoon.grip.palm().opacity(1, 0.8),
    spoon.grip.indexOutline().opacity(1, 0.8),
    spoon.grip.indexFinger().opacity(1, 0.8),
    spoon.grip.middleOutline().opacity(1, 0.8),
    spoon.grip.middleFinger().opacity(1, 0.8),
    spoon.grip.thumb().opacity(1, 0.8),
    spoon.grip.thumb().position([-8, -66], 0.8),
    spoon.grip.indexOutline().points([[-8, -65], [-20, -79], [-36, -94]], 0.8),
    spoon.grip.indexFinger().points([[-8, -65], [-20, -79], [-36, -94]], 0.8),
    spoon.grip.middleOutline().points([[-3, -53], [-17, -68], [-32, -84]], 0.8),
    spoon.grip.middleFinger().points([[-3, -53], [-17, -68], [-32, -84]], 0.8),
    nia.expression().opacity(1, 0.8),
    nia.mouth().opacity(1, 0.8),
    nia.mouth().points([[-26, 68], [0, 75], [26, 68]], 0.8),
    kitchen.caption().text("Chiếc thìa vẫn nguyên vẹn.", 0.8),
    kitchen.caption().opacity(1, 0.8)
  );
  yield* waitFor(10.2);
  checkpoint("S06-complete");
});
