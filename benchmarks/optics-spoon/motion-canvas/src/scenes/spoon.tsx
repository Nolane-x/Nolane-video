import {
  Circle,
  Line,
  Rect,
  Txt,
  makeScene2D
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  waitFor
} from "@motion-canvas/core";

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
  view.fill(C.ink);

  const kitchenWall = createRef<Rect>();
  const table = createRef<Rect>();
  const glass = createRef<Rect>();
  const water = createRef<Rect>();
  const waterline = createRef<Line>();
  const spoonTop = createRef<Line>();
  const spoonBentBottom = createRef<Line>();
  const spoonStraight = createRef<Line>();
  const spoonBowl = createRef<Circle>();
  const head = createRef<Circle>();
  const torso = createRef<Rect>();
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
      <Line ref={spoonTop} points={[[-465, -300], [-320, 80]]} stroke="#E7E3D9" lineWidth={22} lineCap="round" opacity={0} />
      <Line ref={spoonBentBottom} points={[[-250, 80], [-115, 360]]} stroke="#E7E3D9" lineWidth={22} lineCap="round" opacity={0} />
      <Line ref={spoonStraight} points={[[-465, -300], [-160, 360]]} stroke="#E7E3D9" lineWidth={22} lineCap="round" opacity={0} />
      <Circle ref={spoonBowl} size={78} position={[-125, 365]} scale={[0.65, 1.25]} fill="#B7C3C5" stroke={C.ivory} lineWidth={8} opacity={0} />
      <Rect ref={torso} size={[185, 265]} position={[505, 185]} radius={38} fill={C.slate} stroke={C.ink} lineWidth={10} opacity={0} />
      <Circle ref={head} size={230} position={[505, -105]} fill="#D9B89B" stroke={C.ink} lineWidth={10} opacity={0} />
      <Circle size={125} position={[505, -190]} fill="#172631" opacity={0} />
      <Circle ref={eyeA} size={18} position={[465, -105]} fill={C.ink} opacity={0} />
      <Circle ref={eyeB} size={18} position={[545, -105]} fill={C.ink} opacity={0} />
      <Line ref={arm} points={[[420, 95], [270, 45], [-380, 10]]} stroke="#D9B89B" lineWidth={28} lineCap="round" opacity={0} />
      <Txt ref={face} text="?" position={[635, -205]} fontSize={76} fill={C.brass} fontFamily="Arial" opacity={0} />
      <Txt ref={kitchenCaption} text="Vì sao chiếc thìa trông như bị gãy?" position={[0, 465]} fontSize={40} fill={C.ivory} fontFamily="Arial" opacity={0} />

      <Rect ref={diagramWater} size={[1920, 600]} position={[0, 240]} fill={C.water} opacity={0} />
      <Line ref={interfaceLine} points={[[-960, -60], [960, -60]]} stroke={C.waterLight} lineWidth={8} opacity={0} />
      <Line ref={normal} points={[[0, -430], [0, 490]]} stroke={C.ivory} lineWidth={4} opacity={0} />
      <Line ref={incident} points={[[-330, 435], [0, -60]]} stroke={C.ray} lineWidth={12} lineCap="round" opacity={0} />
      <Line ref={refracted} points={[[0, -60], [520, -375]]} stroke={C.ray} lineWidth={12} lineCap="round" opacity={0} />
      <Line ref={backward} points={[[0, -60], [-330, 260]]} stroke={C.ivory} lineWidth={6} opacity={0} />
      <Circle ref={truePoint} size={38} position={[-330, 435]} fill={C.coral} opacity={0} />
      <Circle ref={apparentPoint} size={38} position={[-330, 260]} fill={C.mint} opacity={0} />
      <Circle ref={eyePoint} size={42} position={[520, -375]} fill={C.ivory} opacity={0} />
      <Txt ref={airLabel} text="KHÔNG KHÍ" position={[-650, -340]} fontSize={46} fill={C.ivory} fontFamily="Arial" opacity={0} />
      <Txt ref={waterLabel} text="NƯỚC" position={[-650, 390]} fontSize={46} fill={C.ivory} fontFamily="Arial" opacity={0} />
      <Txt ref={normalLabel} text="Pháp tuyến" position={[170, -390]} fontSize={34} fill={C.ivory} fontFamily="Arial" opacity={0} />
      <Txt ref={angleWater} text="40°" position={[-175, 85]} fontSize={46} fill={C.ray} fontFamily="Arial" opacity={0} />
      <Txt ref={angleAir} text="58,9°" position={[165, -180]} fontSize={46} fill={C.ray} fontFamily="Arial" opacity={0} />
      <Txt ref={formula} text="n_nước sin θ_nước = n_không_khí sin θ_không_khí" position={[0, 435]} fontSize={34} fill={C.ivory} fontFamily="Arial" opacity={0} />
      <Txt ref={trueLabel} text="Vị trí thật" position={[-500, 490]} fontSize={34} fill={C.coral} fontFamily="Arial" opacity={0} />
      <Txt ref={apparentLabel} text="Vị trí biểu kiến" position={[-500, 225]} fontSize={34} fill={C.mint} fontFamily="Arial" opacity={0} />
      <Txt ref={diagramCaption} text="Ánh sáng đổi hướng khi đi từ nước sang không khí" position={[0, -500]} fontSize={40} fill={C.ivory} fontFamily="Arial" opacity={0} />
    </>
  );

  // S01 — 8 seconds: reveal the apparent kink.
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
    arm().opacity(1, 0.5),
    face().opacity(1, 0.5),
    kitchenCaption().opacity(1, 0.5)
  );
  yield* view.scale([1.025, 1.025], 1.4);
  yield* waitFor(6.1);

  // S02 — 10 seconds: lift and reveal the physically straight spoon.
  yield* all(
    spoonTop().opacity(0, 0.4),
    spoonBentBottom().opacity(0, 0.4),
    spoonStraight().opacity(1, 0.6),
    face().text("!", 0.3),
    head().position([505, -125], 0.4)
  );
  yield* waitFor(9.4);

  // S03 — 10 seconds: move from the everyday scene into the invisible optical path.
  yield* all(
    kitchenWall().opacity(0, 0.8),
    table().opacity(0, 0.8),
    glass().opacity(0, 0.8),
    water().opacity(0, 0.8),
    waterline().opacity(0, 0.8),
    spoonStraight().opacity(0, 0.8),
    spoonBowl().opacity(0, 0.8),
    torso().opacity(0, 0.8),
    head().opacity(0, 0.8),
    eyeA().opacity(0, 0.8),
    eyeB().opacity(0, 0.8),
    arm().opacity(0, 0.8),
    face().opacity(0, 0.8),
    kitchenCaption().opacity(0, 0.8),
    diagramWater().opacity(0.22, 0.8),
    interfaceLine().opacity(1, 0.8),
    incident().opacity(1, 0.8),
    refracted().opacity(1, 0.8),
    eyePoint().opacity(1, 0.8),
    airLabel().opacity(1, 0.8),
    waterLabel().opacity(1, 0.8),
    diagramCaption().opacity(1, 0.8),
    view.scale([1, 1], 0.8)
  );
  yield* waitFor(9.2);

  // S04 — 16 seconds: show the normal and Snell relationship.
  yield* all(
    normal().opacity(1, 0.6),
    normalLabel().opacity(1, 0.6),
    angleWater().opacity(1, 0.7),
    angleAir().opacity(1, 0.7),
    formula().opacity(1, 0.9)
  );
  yield* waitFor(15.1);

  // S05 — 17 seconds: construct the apparent image by extending the outgoing ray backward.
  yield* all(
    backward().opacity(1, 0.8),
    truePoint().opacity(1, 0.5),
    apparentPoint().opacity(1, 0.5),
    trueLabel().opacity(1, 0.6),
    apparentLabel().opacity(1, 0.6)
  );
  yield* waitFor(16.2);

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
    spoonStraight().opacity(1, 0.8),
    spoonBowl().opacity(1, 0.8),
    torso().opacity(1, 0.8),
    head().opacity(1, 0.8),
    eyeA().opacity(1, 0.8),
    eyeB().opacity(1, 0.8),
    arm().opacity(1, 0.8),
    face().opacity(1, 0.8),
    kitchenCaption().text("Chiếc thìa vẫn nguyên vẹn.", 0.8),
    kitchenCaption().opacity(1, 0.8)
  );
  yield* waitFor(10.2);
});
