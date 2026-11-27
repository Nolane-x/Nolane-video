import { Circle, Line, Rect, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";
import geometry from "../../../shared/diagram.json";

export type RefractionDiagramPalette = {
  ink: string;
  water: string;
  waterLight: string;
  ivory: string;
  ray: string;
  coral: string;
  mint: string;
  muted: string;
};

const toStage = (point: {x: number; y: number}): [number, number] => [
  point.x - 960,
  point.y - 540
];

/**
 * Reusable scientific diagram for refraction at a horizontal air-water boundary.
 *
 * The canonical source remains shared/diagram.json (top-left pixel coordinates).
 * The adapter maps those coordinates to Motion Canvas' centered stage while
 * preserving +Y-down, and distinguishes the physical outgoing ray from the
 * dashed virtual backward construction.
 */
export const createRefractionDiagram = (palette: RefractionDiagramPalette) => {
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

  const view = (
    <>
      <Rect
        ref={diagramWater}
        size={[1920, 635]}
        position={[0, 222.5]}
        fill={palette.water}
        opacity={0}
      />
      <Line
        ref={interfaceLine}
        points={[
          [-960, geometry.interface.y - 540],
          [960, geometry.interface.y - 540]
        ]}
        stroke={palette.waterLight}
        lineWidth={8}
        opacity={0}
      />
      <Line
        ref={normal}
        points={[toStage(geometry.normal.from), toStage(geometry.normal.to)]}
        stroke={palette.ivory}
        lineWidth={4}
        opacity={0}
      />
      <Line
        ref={incident}
        points={[toStage(geometry.incident_point), toStage(geometry.interface)]}
        stroke={palette.ray}
        lineWidth={12}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={refracted}
        points={[toStage(geometry.interface), toStage(geometry.observer_point)]}
        stroke={palette.ray}
        lineWidth={12}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={backward}
        points={[toStage(geometry.interface), toStage(geometry.apparent_point)]}
        stroke={palette.ivory}
        lineWidth={6}
        lineDash={[18, 14]}
        opacity={0}
      />
      <Circle
        ref={truePoint}
        size={38}
        position={toStage(geometry.incident_point)}
        fill={palette.coral}
        opacity={0}
      />
      <Circle
        ref={apparentPoint}
        size={38}
        position={toStage(geometry.apparent_point)}
        fill={palette.mint}
        opacity={0}
      />
      <Circle
        ref={eyePoint}
        size={42}
        position={toStage(geometry.observer_point)}
        fill={palette.ivory}
        opacity={0}
      />
      <Txt
        ref={airLabel}
        text="KHÔNG KHÍ"
        position={[-650, -320]}
        fontSize={46}
        fill={palette.ivory}
        fontFamily="Arial"
        opacity={0}
      />
      <Txt
        ref={waterLabel}
        text="NƯỚC"
        position={[-650, 320]}
        fontSize={46}
        fill={palette.ivory}
        fontFamily="Arial"
        opacity={0}
      />
      <Txt
        ref={normalLabel}
        text="Pháp tuyến"
        position={[-340, -300]}
        fontSize={34}
        fill={palette.ivory}
        fontFamily="Arial"
        opacity={0}
      />
      <Txt
        ref={angleWater}
        text="40°"
        position={[-275, 210]}
        fontSize={46}
        fill={palette.ray}
        fontFamily="Arial"
        opacity={0}
      />
      <Txt
        ref={angleAir}
        text="58,9°"
        position={[55, -275]}
        fontSize={46}
        fill={palette.ray}
        fontFamily="Arial"
        opacity={0}
      />
      <Txt
        ref={formula}
        text="n₁ sin θ₁ = n₂ sin θ₂"
        position={[300, -430]}
        fontSize={38}
        fill={palette.ivory}
        fontFamily="Arial"
        opacity={0}
      />
      <Txt
        ref={trueLabel}
        text="Vị trí thật"
        position={[-600, 390]}
        fontSize={34}
        fill={palette.coral}
        fontFamily="Arial"
        opacity={0}
      />
      <Txt
        ref={apparentLabel}
        text="Vị trí biểu kiến"
        position={[-600, 160]}
        fontSize={34}
        fill={palette.mint}
        fontFamily="Arial"
        opacity={0}
      />
      <Txt
        ref={diagramCaption}
        text="Ánh sáng đổi hướng khi đi từ nước sang không khí"
        position={[0, -500]}
        fontSize={40}
        fill={palette.ivory}
        fontFamily="Arial"
        opacity={0}
      />
    </>
  );

  return {
    view,
    diagramWater,
    interfaceLine,
    normal,
    incident,
    refracted,
    backward,
    truePoint,
    apparentPoint,
    eyePoint,
    airLabel,
    waterLabel,
    normalLabel,
    angleWater,
    angleAir,
    formula,
    trueLabel,
    apparentLabel,
    diagramCaption
  };
};
