import { Line, Rect, Txt } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";

export type KitchenSetPalette = {
  water: string;
  waterLight: string;
  ivory: string;
};

/** Reusable kitchen stage for Nia's opening and resolution beats. */
export const createKitchenSet = (palette: KitchenSetPalette) => {
  const wall = createRef<Rect>();
  const table = createRef<Rect>();
  const glass = createRef<Rect>();
  const water = createRef<Rect>();
  const waterline = createRef<Line>();
  const caption = createRef<Txt>();

  const view = (
    <>
      <Rect ref={wall} size={[1920, 1080]} fill="#142433" opacity={0} />
      <Rect size={[1920, 360]} position={[0, 360]} fill="#172A35" opacity={0} />
      <Rect
        ref={table}
        size={[1080, 130]}
        position={[-350, 390]}
        radius={20}
        fill="#5B493D"
        opacity={0}
      />
      <Rect
        ref={glass}
        size={[460, 470]}
        position={[-320, 85]}
        radius={28}
        fill={palette.waterLight}
        opacity={0}
        lineWidth={10}
        stroke={palette.ivory}
      />
      <Rect
        ref={water}
        size={[440, 230]}
        position={[-320, 195]}
        fill={palette.water}
        opacity={0}
      />
      <Line
        ref={waterline}
        points={[[-550, 80], [-90, 80]]}
        stroke={palette.waterLight}
        lineWidth={8}
        opacity={0}
      />
      <Txt
        ref={caption}
        text="Vì sao chiếc thìa trông như bị gãy?"
        position={[0, 465]}
        fontSize={40}
        fill={palette.ivory}
        fontFamily="Arial"
        opacity={0}
      />
    </>
  );

  return { view, wall, table, glass, water, waterline, caption };
};
