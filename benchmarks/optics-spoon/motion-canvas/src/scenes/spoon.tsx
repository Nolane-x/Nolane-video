import {
  Circle,
  Line,
  Node,
  Rect,
  Txt,
  makeScene2D
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  waitFor,
  usePlayback
} from "@motion-canvas/core";
import diagramGeometry from "../../../shared/diagram.json";
import storyboard from "../../../shared/storyboard.json";

// Convert canonical top-left diagram pixels to centered Motion Canvas coordinates.
// Keep +Y downward so the water remains below the air-water interface.
const toStage = (point: {x: number; y: number}): [number, number] => [
  point.x - 960,
  point.y - 540
];
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

  const kitchenWall = createRef<Rect>();
  const table = createRef<Rect>();
  const glass = createRef<Rect>();
  const water = createRef<Rect>();
  const waterline = createRef<Line>();
  const spoonRig = createRef<Node>();
  const spoonTop = createRef<Line>();
  const spoonBentBottom = createRef<Line>();
  const spoonStraight = createRef<Line>();
  const spoonBowl = createRef<Circle>();
  const hand = createRef<Rect>();
  const thumb = createRef<Circle>();
  const torso = createRef<Rect>();
  const headRig = createRef<Node>();
  const head = createRef<Circle>();
  const arm = createRef<Line>();
  const eyeA = createRef<Circle>();
  const eyeB = createRef<Circle>();
  const face = createRef<Txt>();
  const kitchenCaption = createRef<Txt>();

  const diagramWater = createRef<Rect>();
  const interfaceLine = createRef<Line>();
  const normal = createRef<Line>();
  const incident = createRef<Line>();
  const refracted = createRef<Line>();
  const backward = createRef<Line>();
  const truePoint = createRef<Circle>();
  const apparentPoint = createRef<Circle>();
  const eyePoint = createRef<Circle>();
  const airLabel = createRef<Txt>();
  const waterLabel = createRef<Txt>();
  const normalLabel = createRef<Txt>();
  const angleWater = createRef<Txt>();
  const angleAir = createRef<Txt>();
  const formula = createRef<Txt>();
  const trueLabel = createRef<Txt>();
  const apparentLabel = createRef<Txt>();
  const diagramCaption = createRef<Txt>();

  view.add(
    <>
      <Rect ref={kitchenWall} size={[1920, 1080]} fill="#142433" opacity={0} />
      <Rect size={[1920, 360]} position={[0, 360]} fill="#172A35" opacity={0} />
      <Rect ref={table} size={[1080, 130]} position={[-350, 390]} radius={20} fill="#5B493D" opacity={0} />
      <Rect ref={glass} size={[460, 470]} position={[-320, 85]} radius={28} fill={"#9AD8D7"} opacity={0} lineWidth={10} stroke={C.ivory} />
      <Rect ref={water} size={[440, 230]} position={[-320, 195]} fill={C.water} opacity={0} />
      <Line ref={waterline} points={[[-550, 80], [-90, 80]]} stroke={C.waterLight} lineWidth={8} opacity={0} />
      <Node ref={spoonRig} position={[-320, 80]}>
        <Line ref={spoonTop} points={[[-145, -380], [0, 0]]} stroke="#E7E3D9" lineWidth={22} lineCap="round" opacity={0} />
        <Line ref={spoonBentBottom} points={[[70, 0], [205, 280]]} stroke="#E7E3D9" lineWidth={22} lineCap="round" opacity={0} />
        <Line ref={spoonStraight} points={[[-145, -380], [160, 280]]} stroke="#E7E3D9" lineWidth={22} lineCap="round" opacity={0} />
        <Circle ref={spoonBowl} size={78} position={[195, 285]} scale={[0.65, 1.25]} fill="#B7C3C5" stroke={C.ivory} lineWidth={8} opacity={0} />
        <Rect ref={hand} size={[62, 40]} position={[-36, -80]} rotation={-12} radius={16} fill="#D9B89B" stroke={C.ink} lineWidth={6} opacity={0} />
        <Circle ref={thumb} size={28} position={[-8, -66]} fill="#D9B89B" stroke={C.ink} lineWidth={5} opacity={0} />
      </Node>
      <Rect ref={torso} size={[185, 265]} position={[505, 185]} radius={38} fill={C.slate} stroke={C.ink} lineWidth={10} opacity={0} />
      <Node ref={headRig} position={[505, -105]}>
        <Circle ref={head} size={230} position={[0, 0]} fill="#D9B89B" stroke={C.ink} lineWidth={10} opacity={0} />
        <Circle size={125} position={[0, -85]} fill="#172631" opacity={0} />
        <Circle ref={eyeA} size={18} position={[-40, 0]} fill={C.ink} opacity={0} />
        <Circle ref={eyeB} size={18} position={[40, 0]} fill={C.ink} opacity={0} />
        <Txt ref={face} text="?" position={[130, -100]} fontSize={76} fill={C.brass} fontFamily="Arial" opacity={0} />
      </Node>
      <Line ref={arm} points={[[420, 95], [245, 30], [-356, 0]]} stroke="#D9B89B" lineWidth={28} lineCap="round" opacity={0} />
      <Txt ref={kitchenCaption} text="Vì sao chiếc thìa trông như bị gãy?" position={[0, 465]} fontSize={40} fill={C.ivory} fontFamily="Arial" opacity={0} />

      <Rect ref={diagramWater} size={[1920, 635]} position={[0, 222.5]} fill={C.water} opacity={0} />
      <Line ref={interfaceLine} points={[[-960, 540 - diagramGeometry.interface.y], [960, 540 - diagramGeometry.interface.y]]} stroke={C.waterLight} lineWidth={8} opacity={0} />
      <Line ref={normal} points={[toStage(diagramGeometry.normal.from), toStage(diagramGeometry.normal.to)]} stroke={C.ivory} lineWidth={4} opacity={0} />
      <Line ref={incident} points={[toStage(diagramGeometry.incident_point), toStage(diagramGeometry.interface)]} stroke={C.ray} lineWidth={12} lineCap="round" opacity={0} />
      <Line ref={refracted} points={[toStage(diagramGeometry.interface), toStage(diagramGeometry.observer_point)]} stroke={C.ray} lineWidth={12} lineCap="round" opacity={0} />
      <Line ref={backward} points={[toStage(diagramGeometry.interface), toStage(diagramGeometry.apparent_point)]} stroke={C.ivory} lineWidth={6} opacity={0} />
      <Circle ref={truePoint} size={38} position={toStage(diagramGeometry.incident_point)} fill={C.coral} opacity={0} />
      <Circle ref={apparentPoint} size={38} position={toStage(diagramGeometry.apparent_point)} fill={C.mint} opacity={0} />
      <Circle ref={eyePoint} size={42} position={toStage(diagramGeometry.observer_point)} fill={C.ivory} opacity={0} />
      <Txt ref={airLabel} text="KHÔNG KHÍ" position={[-650, -320]} fontSize={46} fill={C.ivory} fontFamily="Arial" opacity={0} />
      <Txt ref={waterLabel} text="NƯỚC" position={[-650, 320]} fontSize={46} fill={C.ivory} fontFamily="Arial" opacity={0} />
      <Txt ref={normalLabel} text="Pháp tuyến" position={[-340, -300]} fontSize={34} fill={C.ivory} fontFamily="Arial" opacity={0} />
      <Txt ref={angleWater} text="40°" position={[-275, 210]} fontSize={46} fill={C.ray} fontFamily="Arial" opacity={0} />
      <Txt ref={angleAir} text="58,9°" position={[55, -275]} fontSize={46} fill={C.ray} fontFamily="Arial" opacity={0} />
      <Txt ref={formula} text="n₁ sin θ₁ = n₂ sin θ₂" position={[300, -430]} fontSize={38} fill={C.ivory} fontFamily="Arial" opacity={0} />
      <Txt ref={trueLabel} text="Vị trí thật" position={[-600, 390]} fontSize={34} fill={C.coral} fontFamily="Arial" opacity={0} />
      <Txt ref={apparentLabel} text="Vị trí biểu kiến" position={[-600, 160]} fontSize={34} fill={C.mint} fontFamily="Arial" opacity={0} />
      <Txt ref={diagramCaption} text="Ánh sáng đổi hướng khi đi từ nước sang không khí" position={[0, -500]} fontSize={40} fill={C.ivory} fontFamily="Arial" opacity={0} />
    </>
  );

  // S01 — 8 seconds: establish Nia's attention, then make a clear grip/contact.
  yield* all(
    kitchenWall().opacity(1, 0.4),
    table().opacity(1, 0.4),
    glass().opacity(0.28, 0.5),
    water().opacity(0.55, 0.5),
    waterline().opacity(1, 0.5),
    spoonTop().opacity(1, 0.5),
    spoonBentBottom().opacity(1, 0.5),
    spoonBowl().opacity(1, 0.5),
    torso().opacity(1, 0.5),
    head().opacity(1, 0.5),
    eyeA().opacity(1, 0.5),
    eyeB().opacity(1, 0.5),
    face().opacity(1, 0.5),
    kitchenCaption().opacity(1, 0.5)
  );
  yield* waitFor(0.45);
  yield* all(
    arm().opacity(1, 0.35),
    hand().opacity(1, 0.25),
    thumb().opacity(1, 0.25),
    eyeA().position([-48, -3], 0.25),
    eyeB().position([32, -3], 0.25),
    headRig().rotation(-4, 0.25)
  );
  yield* view.scale([1.025, 1.025], 1.4);
  yield* waitFor(5.3);
  checkpoint("S01-complete");

  // S02 — 10 seconds: expose the straight spoon and lift it as one constrained prop.
  yield* all(
    spoonTop().opacity(0, 0.4),
    spoonBentBottom().opacity(0, 0.4),
    spoonStraight().opacity(1, 0.4),
    face().text("!", 0.3),
    headRig().position([505, -125], 0.4),
    headRig().rotation(0, 0.4)
  );
  yield* all(
    spoonRig().position([-320, 10], 0.85),
    spoonRig().rotation(-5, 0.85),
    arm().points([[420, 95], [240, 10], [-360, -70]], 0.85),
    eyeA().position([-55, 0], 0.35),
    eyeB().position([25, 0], 0.35)
  );
  yield* waitFor(8.75 - 1 / 24);
  checkpoint("S02-complete");

  // S03 — 10 seconds: move from the everyday scene into the invisible optical path.
  yield* all(
    kitchenWall().opacity(0, 0.8),
    table().opacity(0, 0.8),
    glass().opacity(0, 0.8),
    water().opacity(0, 0.8),
    waterline().opacity(0, 0.8),
    spoonRig().opacity(0, 0.8),
    torso().opacity(0, 0.8),
    headRig().opacity(0, 0.8),
    arm().opacity(0, 0.8),
    kitchenCaption().opacity(0, 0.8),
    diagramWater().opacity(0.22, 0.8),
    interfaceLine().opacity(1, 0.8),
    airLabel().opacity(1, 0.8),
    waterLabel().opacity(1, 0.8),
    diagramCaption().opacity(1, 0.8),
    view.scale([1, 1], 0.8)
  );
  yield* waitFor(9.2 + 1 / 24);
  checkpoint("S03-complete");

  // S04 — 16 seconds: construct the physical path in causal order.
  yield* all(
    normal().opacity(1, 0.6),
    normalLabel().opacity(1, 0.6)
  );
  yield* all(
    incident().opacity(1, 0.8),
    truePoint().opacity(1, 0.5)
  );
  yield* waitFor(0.8);
  yield* all(
    refracted().opacity(1, 0.8),
    eyePoint().opacity(1, 0.6)
  );
  yield* all(
    angleWater().opacity(1, 0.6),
    angleAir().opacity(1, 0.6)
  );
  yield* formula().opacity(1, 0.8);
  // Motion Canvas evaluates the final timestamp inclusively; compensate one sample
  // so the scene checkpoint lands on storyboard frame 1055, not 1056.
  yield* waitFor(11.6 - 1 / 24);
  checkpoint("S04-complete");

  // S05 — 17 seconds: derive the apparent point from a backward extension.
  yield* backward().opacity(1, 0.8);
  yield* all(
    apparentPoint().opacity(1, 0.5),
    trueLabel().opacity(1, 0.6),
    apparentLabel().opacity(1, 0.6)
  );
  yield* waitFor(15.6);
  checkpoint("S05-complete");

  // S06 — 11 seconds: return to the intact spoon and resolve the misconception.
  yield* all(
    diagramWater().opacity(0, 0.8),
    interfaceLine().opacity(0, 0.8),
    normal().opacity(0, 0.8),
    incident().opacity(0, 0.8),
    refracted().opacity(0, 0.8),
    backward().opacity(0, 0.8),
    truePoint().opacity(0, 0.8),
    apparentPoint().opacity(0, 0.8),
    eyePoint().opacity(0, 0.8),
    airLabel().opacity(0, 0.8),
    waterLabel().opacity(0, 0.8),
    normalLabel().opacity(0, 0.8),
    angleWater().opacity(0, 0.8),
    angleAir().opacity(0, 0.8),
    formula().opacity(0, 0.8),
    trueLabel().opacity(0, 0.8),
    apparentLabel().opacity(0, 0.8),
    diagramCaption().opacity(0, 0.8),
    kitchenWall().opacity(1, 0.8),
    table().opacity(1, 0.8),
    glass().opacity(0.28, 0.8),
    water().opacity(0.55, 0.8),
    waterline().opacity(1, 0.8),
    spoonRig().opacity(1, 0.8),
    spoonRig().position([-320, 80], 0.8),
    spoonRig().rotation(0, 0.8),
    spoonStraight().opacity(1, 0.8),
    spoonBowl().opacity(1, 0.8),
    torso().opacity(1, 0.8),
    headRig().opacity(1, 0.8),
    headRig().position([505, -105], 0.8),
    headRig().rotation(0, 0.8),
    eyeA().opacity(1, 0.8),
    eyeB().opacity(1, 0.8),
    arm().opacity(1, 0.8),
    arm().points([[420, 95], [245, 30], [-356, 0]], 0.8),
    hand().opacity(1, 0.8),
    thumb().opacity(1, 0.8),
    face().opacity(1, 0.8),
    kitchenCaption().text("Chiếc thìa vẫn nguyên vẹn.", 0.8),
    kitchenCaption().opacity(1, 0.8)
  );
  yield* waitFor(10.2);
  checkpoint("S06-complete");
});
