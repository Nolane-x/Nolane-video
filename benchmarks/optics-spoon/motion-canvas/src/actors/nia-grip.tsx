import { Circle, Line, Rect } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

/**
 * Nia's prop-attached grip. Mount this view inside the spoon node so the palm
 * and fingers inherit the prop transform and cannot drift away during lifts.
 */
export const createNiaGrip = () => {
  const palm = createRef<Rect>();
  const thumb = createRef<Circle>();
  const indexOutline = createRef<Line>();
  const indexFinger = createRef<Line>();
  const middleOutline = createRef<Line>();
  const middleFinger = createRef<Line>();

  const view = (
    <>
      <Rect
        ref={palm}
        size={[62, 40]}
        position={[-36, -80]}
        rotation={-12}
        radius={16}
        fill="#D9B89B"
        stroke="#101B26"
        lineWidth={6}
        opacity={0}
      />
      <Line
        ref={indexOutline}
        points={[[-8, -65], [-20, -79], [-36, -94]]}
        stroke="#101B26"
        lineWidth={21}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={indexFinger}
        points={[[-8, -65], [-20, -79], [-36, -94]]}
        stroke="#D9B89B"
        lineWidth={14}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={middleOutline}
        points={[[-3, -53], [-17, -68], [-32, -84]]}
        stroke="#101B26"
        lineWidth={20}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={middleFinger}
        points={[[-3, -53], [-17, -68], [-32, -84]]}
        stroke="#D9B89B"
        lineWidth={13}
        lineCap="round"
        opacity={0}
      />
      <Circle
        ref={thumb}
        size={28}
        position={[-8, -66]}
        fill="#D9B89B"
        stroke="#101B26"
        lineWidth={5}
        opacity={0}
      />
    </>
  );

  return { view, palm, thumb, indexOutline, indexFinger, middleOutline, middleFinger };
};
