import { Circle, Line, Node } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";
import { createNiaGrip } from "../actors/nia-grip";
import { SPOON_REST_ORIGIN } from "../actors/rig-anchors";

export type SpoonPropPalette = {
  ivory: string;
  metal: string;
};

/**
 * Reusable spoon prop with three mutually exclusive visual states:
 * bent underwater, straight outside the water, and the spoon bowl.
 *
 * The grip is mounted inside the same transform node as the prop. This keeps
 * palm/fingers locked to the handle during all authored lift, turn and dip beats.
 */
export const createSpoonProp = (palette: SpoonPropPalette) => {
  const rig = createRef<Node>();
  const top = createRef<Line>();
  const bentBottom = createRef<Line>();
  const straight = createRef<Line>();
  const bowl = createRef<Circle>();
  const grip = createNiaGrip();

  const view = (
    <Node ref={rig} position={SPOON_REST_ORIGIN}>
      <Line
        ref={top}
        points={[[-145, -380], [0, 0]]}
        stroke={palette.metal}
        lineWidth={22}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={bentBottom}
        points={[[14, 0], [205, 280]]}
        stroke={palette.metal}
        lineWidth={22}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={straight}
        points={[[-145, -380], [160, 280]]}
        stroke={palette.metal}
        lineWidth={22}
        lineCap="round"
        opacity={0}
      />
      <Circle
        ref={bowl}
        size={78}
        position={[195, 285]}
        scale={[0.65, 1.25]}
        fill="#B7C3C5"
        stroke={palette.ivory}
        lineWidth={8}
        opacity={0}
      />
      {grip.view}
    </Node>
  );

  return { view, rig, top, bentBottom, straight, bowl, grip };
};
