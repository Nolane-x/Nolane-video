import { Circle, Line, Rect } from "@motion-canvas/2d";
import { all, createRef } from "@motion-canvas/core";
import { NIA_GRIP_LOCAL_POSITION } from "./rig-anchors";

type Point = [number, number];
type FingerPath = [Point, Point, Point];

export type NiaGripPoseName = "rest" | "brace";

type NiaGripPose = {
  palm: Point;
  thumb: Point;
  index: FingerPath;
  middle: FingerPath;
  ring: FingerPath;
  pinky: FingerPath;
};

/**
 * Named, reusable hand poses in spoon-local coordinates.
 *
 * Keep these paths local to the spoon prop: the whole hand inherits its
 * position and rotation, while the pose transition only articulates the grip.
 */
export const NIA_GRIP_POSES: Record<NiaGripPoseName, NiaGripPose> = {
  rest: {
    palm: [...NIA_GRIP_LOCAL_POSITION],
    thumb: [-8, -66],
    index: [[-8, -65], [-20, -79], [-36, -94]],
    middle: [[-3, -53], [-17, -68], [-32, -84]],
    ring: [[2, -43], [-11, -57], [-27, -73]],
    pinky: [[8, -32], [-4, -45], [-21, -60]]
  },
  brace: {
    palm: [-37, -81],
    thumb: [-10, -68],
    index: [[-6, -66], [-19, -80], [-36, -95]],
    middle: [[-2, -54], [-16, -69], [-32, -85]],
    ring: [[4, -44], [-8, -58], [-25, -74]],
    pinky: [[10, -33], [-2, -47], [-20, -61]]
  }
};

const copyPath = (path: FingerPath): Point[] =>
  path.map(([x, y]): Point => [x, y]);

/**
 * Nia's prop-attached grip. Mount this view inside the spoon node so the palm
 * and all four fingers inherit the prop transform and cannot drift during lifts.
 */
export const createNiaGrip = () => {
  const palm = createRef<Rect>();
  const thumb = createRef<Circle>();
  const indexOutline = createRef<Line>();
  const indexFinger = createRef<Line>();
  const middleOutline = createRef<Line>();
  const middleFinger = createRef<Line>();
  const ringOutline = createRef<Line>();
  const ringFinger = createRef<Line>();
  const pinkyOutline = createRef<Line>();
  const pinkyFinger = createRef<Line>();

  const rest = NIA_GRIP_POSES.rest;
  const view = (
    <>
      <Rect
        ref={palm}
        size={[62, 40]}
        position={[...NIA_GRIP_LOCAL_POSITION]}
        rotation={-12}
        radius={16}
        fill="#D9B89B"
        stroke="#101B26"
        lineWidth={6}
        opacity={0}
      />
      <Line
        ref={indexOutline}
        points={rest.index}
        stroke="#101B26"
        lineWidth={21}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={indexFinger}
        points={rest.index}
        stroke="#D9B89B"
        lineWidth={14}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={middleOutline}
        points={rest.middle}
        stroke="#101B26"
        lineWidth={20}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={middleFinger}
        points={rest.middle}
        stroke="#D9B89B"
        lineWidth={13}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={ringOutline}
        points={rest.ring}
        stroke="#101B26"
        lineWidth={18}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={ringFinger}
        points={rest.ring}
        stroke="#D9B89B"
        lineWidth={12}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={pinkyOutline}
        points={rest.pinky}
        stroke="#101B26"
        lineWidth={16}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={pinkyFinger}
        points={rest.pinky}
        stroke="#D9B89B"
        lineWidth={10}
        lineCap="round"
        opacity={0}
      />
      <Circle
        ref={thumb}
        size={28}
        position={[...rest.thumb]}
        fill="#D9B89B"
        stroke="#101B26"
        lineWidth={5}
        opacity={0}
      />
    </>
  );

  const toPose = (name: NiaGripPoseName, duration: number) => {
    const pose = NIA_GRIP_POSES[name];
    return all(
      palm().position([...pose.palm], duration),
      thumb().position([...pose.thumb], duration),
      indexOutline().points(copyPath(pose.index), duration),
      indexFinger().points(copyPath(pose.index), duration),
      middleOutline().points(copyPath(pose.middle), duration),
      middleFinger().points(copyPath(pose.middle), duration),
      ringOutline().points(copyPath(pose.ring), duration),
      ringFinger().points(copyPath(pose.ring), duration),
      pinkyOutline().points(copyPath(pose.pinky), duration),
      pinkyFinger().points(copyPath(pose.pinky), duration)
    );
  };

  return {
    view,
    palm,
    thumb,
    indexOutline,
    indexFinger,
    middleOutline,
    middleFinger,
    ringOutline,
    ringFinger,
    pinkyOutline,
    pinkyFinger,
    toPose
  };
};
