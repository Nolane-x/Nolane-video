export type S02Motion = {
  anticipation: number; lift: number; inspection: number; redip: number; lean: number;
  straightness: number; handLiftPx: number; spoonRotationDeg: number;
  headTiltDeg: number; headOffsetX: number; headOffsetY: number;
  eyeLookOffsetX: number; surprise: number;
};
export type DiagramMotion = {
  interface: number; incidentRay: number; refractedRay: number; normal: number;
  angles: number; formula: number; backward: number; trueLabel: number; apparent: number;
};
const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));
const smoothstep = (value: number): number => {
  const x = clamp01(value);
  return x * x * (3 - 2 * x);
};
const progressBetween = (frame: number, start: number, end: number): number =>
  end <= start ? (frame >= end ? 1 : 0) : smoothstep((frame - start) / (end - start));

const easeInOutCubic = (value: number): number => {
  const x = clamp01(value);
  return x < 0.5
    ? 4 * x * x * x
    : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

const easedProgressBetween = (frame: number, start: number, end: number): number =>
  end <= start ? (frame >= end ? 1 : 0) : easeInOutCubic((frame - start) / (end - start));

/**
 * Match the two restrained Motion Canvas camera push-ins in global frame space.
 * S01 pushes toward the apparent kink, then resets during the S03 diagram cutaway.
 * S06 pushes toward the intact spoon and holds the final close-up.
 */
export const cameraScaleAt = (globalFrame: number): number => {
  if (!Number.isFinite(globalFrame)) throw new TypeError("Camera frame must be finite.");
  const s01Push = easedProgressBetween(globalFrame, 31, 65);
  const s01Reset = easedProgressBetween(globalFrame, 432, 451);
  const s01Scale = 1 + 0.025 * s01Push * (1 - s01Reset);
  const s06Push = easedProgressBetween(globalFrame, 1546, 1570);
  const s06Scale = 1 + 0.025 * s06Push;
  return Math.max(s01Scale, s06Scale);
};

/** Deterministic global-frame motion for the half-open S02 range [192, 432). */
export const s02MotionAt = (globalFrame: number): S02Motion => {
  if (!Number.isFinite(globalFrame)) throw new TypeError("S02 frame must be finite.");
  if (globalFrame < 192 || globalFrame >= 432) {
    return {
      anticipation: 0, lift: 0, inspection: 0, redip: 0, straightness: 0, lean: 0,
      handLiftPx: 0, spoonRotationDeg: 0, headTiltDeg: 0, headOffsetX: 0,
      headOffsetY: 0, eyeLookOffsetX: 0, surprise: 0
    };
  }
  const local = globalFrame - 192;
  const anticipation = Math.sin(Math.PI * clamp01(local / 18));
  const lift = progressBetween(local, 18, 74);
  const inspection = Math.sin(Math.PI * clamp01((local - 98) / 18));
  const redip = progressBetween(local, 142, 198);
  const lean = progressBetween(local, 198, 224);
  const straightness = lift * (1 - redip);
  const surprise = straightness * (1 - lean);
  return {
    anticipation, lift, inspection, redip, lean, straightness,
    handLiftPx: 70 * straightness - 4 * anticipation,
    spoonRotationDeg: 6 * inspection,
    headTiltDeg: -3 * surprise + 4 * lean,
    headOffsetX: -16 * lean,
    headOffsetY: -5 * lean,
    eyeLookOffsetX: -8 * (straightness + lean),
    surprise
  };
};

/** Causal reveal schedule shared by the S03-S05 Remotion diagram. */
export const diagramMotionAt = (globalFrame: number): DiagramMotion => {
  if (!Number.isFinite(globalFrame)) throw new TypeError("Diagram frame must be finite.");
  return {
    interface: progressBetween(globalFrame, 432, 456),
    incidentRay: progressBetween(globalFrame, 520, 538),
    refractedRay: progressBetween(globalFrame, 580, 598),
    normal: progressBetween(globalFrame, 690, 708),
    angles: progressBetween(globalFrame, 846, 866),
    formula: progressBetween(globalFrame, 918, 938),
    backward: progressBetween(globalFrame, 1056, 1076),
    // Match Motion Canvas S05: construction first, true source label, then apparent image.
    trueLabel: progressBetween(globalFrame, 1099, 1109),
    apparent: progressBetween(globalFrame, 1117, 1132)
  };
};

/** Shot-level caption schedule; S05 narrates the same staged construction as Motion Canvas. */
export const diagramCaptionAt = (frame: number): string => {
  if (!Number.isFinite(frame)) throw new TypeError("Caption frame must be finite.");
  if (frame < 192) return "Vì sao chiếc thìa trông như bị gãy?";
  if (frame < 432) return "Chiếc thìa vẫn thẳng.";
  if (frame < 672) return "Ánh sáng đi qua mặt phân cách.";
  if (frame < 1056) return "Nước → Không khí: tia sáng lệch xa pháp tuyến.";
  if (frame < 1099) return "Kéo dài tia khúc xạ ngược về phía dưới nước.";
  if (frame < 1117) return "Đây là vị trí thật của thìa dưới nước.";
  if (frame < 1464) return "Ảnh biểu kiến nằm gần mặt nước hơn vị trí thật.";
  return "Vật không cong. Đường đi của ánh sáng đổi hướng.";
};

