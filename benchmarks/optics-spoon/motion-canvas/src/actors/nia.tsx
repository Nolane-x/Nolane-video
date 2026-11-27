import { Circle, Line, Node, Rect, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

/**
 * Nia is a reusable, NEE-owned 2D actor rig.
 *
 * The shoulder, elbow, wrist and head are exposed as independent animated
 * parts. This is an intentionally small first rig: authored performance stays
 * deterministic and scene code controls the timing, while the rig owns visual
 * structure and reusable actor proportions.
 */
export const createNiaActor = () => {
  const torso = createRef<Rect>();
  const neck = createRef<Rect>();
  const headRig = createRef<Node>();
  const head = createRef<Circle>();
  const eyeLeft = createRef<Circle>();
  const eyeRight = createRef<Circle>();
  const mouth = createRef<Line>();
  const expression = createRef<Txt>();
  const upperArm = createRef<Line>();
  const forearm = createRef<Line>();
  const elbow = createRef<Circle>();

  const view = (
    <>
      <Rect
        ref={torso}
        size={[185, 265]}
        position={[505, 185]}
        radius={38}
        fill="#203746"
        stroke="#101B26"
        lineWidth={10}
        opacity={0}
      />
      <Rect
        ref={neck}
        size={[82, 85]}
        position={[505, 32]}
        radius={24}
        fill="#D9B89B"
        stroke="#101B26"
        lineWidth={8}
        opacity={0}
      />
      <Node ref={headRig} position={[505, -105]}>
        <Circle
          ref={head}
          size={230}
          position={[0, 0]}
          fill="#D9B89B"
          stroke="#101B26"
          lineWidth={10}
          opacity={0}
        />
        <Circle size={125} position={[0, -85]} fill="#172631" opacity={0} />
        <Circle
          ref={eyeLeft}
          size={18}
          position={[-40, 0]}
          fill="#101B26"
          opacity={0}
        />
        <Circle
          ref={eyeRight}
          size={18}
          position={[40, 0]}
          fill="#101B26"
          opacity={0}
        />
        <Line
          ref={mouth}
          points={[[-26, 68], [0, 75], [26, 68]]}
          stroke="#8A554C"
          lineWidth={9}
          lineCap="round"
          opacity={0}
        />
        <Txt
          ref={expression}
          text="?"
          position={[130, -100]}
          fontSize={76}
          fill="#DDA85E"
          fontFamily="Arial"
          opacity={0}
        />
      </Node>
      <Line
        ref={upperArm}
        points={[[420, 95], [245, 30]]}
        stroke="#D9B89B"
        lineWidth={28}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={forearm}
        points={[[245, 30], [-356, 0]]}
        stroke="#D9B89B"
        lineWidth={28}
        lineCap="round"
        opacity={0}
      />
      <Circle
        ref={elbow}
        size={34}
        position={[245, 30]}
        fill="#D9B89B"
        stroke="#101B26"
        lineWidth={5}
        opacity={0}
      />
    </>
  );

  return {
    view,
    torso,
    neck,
    headRig,
    head,
    eyeLeft,
    eyeRight,
    mouth,
    expression,
    upperArm,
    forearm,
    elbow
  };
};
