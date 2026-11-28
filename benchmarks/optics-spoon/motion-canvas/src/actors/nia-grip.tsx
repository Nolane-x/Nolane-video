import { Circle, Line, Rect } from "@motion-canvas/2d";
import { all, createRef } from "@motion-canvas/core";
import { NIA_GRIP_LOCAL_POSITION } from "./rig-anchors";
import {
  NIA_GRIP_POSES,
  type FingerPath,
  type GripLine,
  type GripPoint,
  type NiaGripPoseName
} from "./grip-geometry";

const copyPath = (path: FingerPath): GripPoint[] =>
  path.map(([x, y]): GripPoint => [x, y]);

const copyLine = (line: GripLine): GripPoint[] =>
  line.map(([x, y]): GripPoint => [x, y]);

/**
 * Nia's prop-attached grip. Mount this view inside the spoon node so the palm,
 * thumb base, joint creases and all four fingers inherit the prop transform.
 */
export const createNiaGrip = () => {
  const palm = createRef<Rect>();
  const palmCrease = createRef<Line>();
  const thumbBase = createRef<Circle>();
  const thumbBaseCrease = createRef<Line>();
  const thumb = createRef<Circle>();
  const thumbOutline = createRef<Line>();
  const thumbFinger = createRef<Line>();
  const indexOutline = createRef<Line>();
  const indexFinger = createRef<Line>();
  const indexCrease = createRef<Line>();
  const middleOutline = createRef<Line>();
  const middleFinger = createRef<Line>();
  const middleCrease = createRef<Line>();
  const ringOutline = createRef<Line>();
  const ringFinger = createRef<Line>();
  const ringCrease = createRef<Line>();
  const pinkyOutline = createRef<Line>();
  const pinkyFinger = createRef<Line>();
  const pinkyCrease = createRef<Line>();

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
        ref={palmCrease}
        points={rest.palmCrease}
        stroke="#9B7566"
        lineWidth={2.5}
        lineCap="round"
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
        ref={indexCrease}
        points={rest.fingerCreases.index}
        stroke="#9B7566"
        lineWidth={2.5}
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
        ref={middleCrease}
        points={rest.fingerCreases.middle}
        stroke="#9B7566"
        lineWidth={2.5}
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
        ref={ringCrease}
        points={rest.fingerCreases.ring}
        stroke="#9B7566"
        lineWidth={2.5}
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
      <Line
        ref={pinkyCrease}
        points={rest.fingerCreases.pinky}
        stroke="#9B7566"
        lineWidth={2.5}
        lineCap="round"
        opacity={0}
      />
      <Circle
        ref={thumbBase}
        size={[34, 30]}
        position={[...rest.thumbBase]}
        fill="#D9B89B"
        stroke="#D9B89B"
        lineWidth={1}
        rotation={-12}
        opacity={0}
      />
      <Line
        ref={thumbOutline}
        points={rest.thumbPath}
        stroke="#101B26"
        lineWidth={20}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={thumbFinger}
        points={rest.thumbPath}
        stroke="#D9B89B"
        lineWidth={13}
        lineCap="round"
        opacity={0}
      />
      <Line
        ref={thumbBaseCrease}
        points={rest.thumbBaseCrease}
        stroke="#9B7566"
        lineWidth={2.5}
        lineCap="round"
        opacity={0}
      />
      <Circle
        ref={thumb}
        size={25}
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
      palmCrease().points(copyPath(pose.palmCrease), duration),
      thumbBase().position([...pose.thumbBase], duration),
      thumbBaseCrease().points(copyPath(pose.thumbBaseCrease), duration),
      thumb().position([...pose.thumb], duration),
      thumbOutline().points(copyPath(pose.thumbPath), duration),
      thumbFinger().points(copyPath(pose.thumbPath), duration),
      indexOutline().points(copyPath(pose.index), duration),
      indexFinger().points(copyPath(pose.index), duration),
      indexCrease().points(copyLine(pose.fingerCreases.index), duration),
      middleOutline().points(copyPath(pose.middle), duration),
      middleFinger().points(copyPath(pose.middle), duration),
      middleCrease().points(copyLine(pose.fingerCreases.middle), duration),
      ringOutline().points(copyPath(pose.ring), duration),
      ringFinger().points(copyPath(pose.ring), duration),
      ringCrease().points(copyLine(pose.fingerCreases.ring), duration),
      pinkyOutline().points(copyPath(pose.pinky), duration),
      pinkyFinger().points(copyPath(pose.pinky), duration),
      pinkyCrease().points(copyLine(pose.fingerCreases.pinky), duration)
    );
  };

  return {
    view,
    palm,
    palmCrease,
    thumbBase,
    thumbBaseCrease,
    thumb,
    thumbOutline,
    thumbFinger,
    indexOutline,
    indexFinger,
    indexCrease,
    middleOutline,
    middleFinger,
    middleCrease,
    ringOutline,
    ringFinger,
    ringCrease,
    pinkyOutline,
    pinkyFinger,
    pinkyCrease,
    toPose
  };
};
