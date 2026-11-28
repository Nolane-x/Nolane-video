import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import diagramGeometry from "../../shared/diagram.json";
import {diagramCaptionAt, diagramMotionAt, s02MotionAt} from "./benchmark-motion";

const C = {
  ink: "#101B26", slate: "#203746", ivory: "#F4EDE0", brass: "#DDA85E",
  water: "#4EA6B5", waterLight: "#9AD8D7", ray: "#FFD36A",
  coral: "#E47D68", mint: "#8ED2B0", muted: "#A9B6BE",
};
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (v: number) => {
  const x = clamp(v);
  return x * x * (3 - 2 * x);
};
const windowOpacity = (frame: number, start: number, end: number, fade = 12) =>
  Math.min(smooth((frame - start) / fade), smooth((end - frame) / fade));



const Nia: React.FC<{frame: number}> = ({frame}) => {
  const motion = s02MotionAt(frame);
  const tilt = frame >= 432 && frame < 672 ? 2 : 0;
  const handY = 230 - motion.handLiftPx;
  const armPath = "M-115 590 Q-280 520 -470 420 Q-625 315 -755 " + handY;
  return (
    <g transform={"translate(1370 0) rotate(" + tilt + " 0 470)"}>
      <ellipse cx="0" cy="890" rx="185" ry="28" fill="#07121A" opacity=".5" />
      <path d="M-120 565 Q-158 680 -130 865 L-35 865 L-25 690 L35 690 L58 865 L154 865 Q160 675 105 565Z" fill="#203746" stroke="#0A151D" strokeWidth="12" />
      <path d={armPath} fill="none" stroke="#203746" strokeWidth="64" strokeLinecap="round" />
      <path d={armPath} fill="none" stroke="#D9B89B" strokeWidth="27" strokeLinecap="round" />
      <g transform={"translate(0 " + (handY - 230) + ")"}>
        <path d="M-759 230 Q-772 211 -758 190 M-748 235 Q-733 258 -710 246" fill="none" stroke="#D9B89B" strokeWidth="17" strokeLinecap="round" />
      </g>
      <path d="M100 590 Q185 640 215 590" fill="none" stroke="#203746" strokeWidth="58" strokeLinecap="round" />
      <path d="M100 590 Q185 640 215 590" fill="none" stroke="#F4EDE0" strokeWidth="15" strokeLinecap="round" />
      <path d="M-65 875 L-155 935 M85 875 L165 935" stroke="#101B26" strokeWidth="46" strokeLinecap="round" />
      <g transform={"translate(" + motion.headOffsetX + " " + motion.headOffsetY + ") rotate(" + motion.headTiltDeg + " 0 410)"}>
        <ellipse cx="0" cy="410" rx="145" ry="165" fill="#D9B89B" stroke="#101B26" strokeWidth="12" />
        <path d="M-145 405 Q-150 230 -8 226 Q145 240 145 390 Q85 330 40 320 Q-25 370 -145 405Z" fill="#172631" />
        <path d="M-142 445 Q-85 420 -36 444" stroke="#172631" strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d="M35 444 Q85 420 132 445" stroke="#172631" strokeWidth="13" fill="none" strokeLinecap="round" />
        <ellipse cx={-65 + motion.eyeLookOffsetX} cy="458" rx="13" ry="18" fill="#101B26" />
        <ellipse cx={70 + motion.eyeLookOffsetX} cy="458" rx="13" ry="18" fill="#101B26" />
        <path d={"M-25 520 Q0 " + (540 + motion.surprise * 18) + " 28 516"} stroke="#8A554C" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M-55 570 L0 720 L58 570" fill="none" stroke="#DDA85E" strokeWidth="9" opacity=".85" />
      </g>
    </g>
  );
};

const Kitchen: React.FC<{frame: number}> = ({frame}) => {
  const motion = s02MotionAt(frame);
  const finalStraight = frame >= 1452;
  const straightness = finalStraight ? 1 : motion.straightness;
  const handLiftPx = finalStraight ? 0 : motion.handLiftPx;
  const spoonTurn = finalStraight ? 0 : motion.spoonRotationDeg;
  return (
    <g>
      <rect width="1920" height="1080" fill="#142433" />
      <rect y="690" width="1920" height="390" fill="#172A35" />
      <path d="M0 692 H1920" stroke="#6E7780" strokeWidth="5" opacity=".45" />
      <ellipse cx="360" cy="175" rx="300" ry="220" fill="#DDA85E" opacity=".09" />
      <path d="M90 0 V320 M0 300 H520" stroke="#485663" strokeWidth="6" opacity=".6" />
      <rect x="135" y="250" width="250" height="12" fill="#DDA85E" opacity=".65" />
      <rect x="145" y="260" width="230" height="340" rx="6" fill="#0D1B25" stroke="#6C6E70" strokeWidth="7" />
      <path d="M160 285 H360 V575 H160Z" fill="#263F4A" opacity=".65" />
      <rect x="220" y="590" width="1050" height="135" rx="22" fill="#5B493D" />
      <rect x="220" y="590" width="1050" height="18" rx="9" fill="#B58B63" />
      <rect x="480" y="300" width="480" height="450" rx="35" fill="#9AD8D7" fillOpacity=".07" stroke="#D5E0DE" strokeWidth="12" />
      <rect x="494" y="500" width="452" height="236" fill="#4EA6B5" fillOpacity=".36" />
      <path d="M496 500 Q720 487 944 500" stroke="#9AD8D7" strokeWidth="9" fill="none" />
      <path d="M515 328 Q510 650 535 710" stroke="#FFFFFF" strokeWidth="8" opacity=".2" fill="none" />
      <g opacity={1 - straightness}>
        <path d="M615 230 L705 500" stroke="#E7E3D9" strokeWidth="22" strokeLinecap="round" />
        <path d="M765 500 L840 690" stroke="#E7E3D9" strokeWidth="22" strokeLinecap="round" />
        <ellipse cx="850" cy="708" rx="35" ry="62" transform="rotate(-22 850 708)" fill="#B7C3C5" stroke="#E7E3D9" strokeWidth="9" />
        <path d="M605 220 L690 480" stroke="#FFFFFF" strokeWidth="4" opacity=".65" />
      </g>
      <g opacity={straightness} transform={"translate(0 " + (-handLiftPx) + ") rotate(" + spoonTurn + " 615 230)"}>
        <path d="M615 230 L1010 230" stroke="#E7E3D9" strokeWidth="22" strokeLinecap="round" />
        <path d="M630 224 L990 224" stroke="#FFFFFF" strokeWidth="4" opacity=".7" />
        <ellipse cx="1042" cy="230" rx="55" ry="29" fill="#B7C3C5" stroke="#E7E3D9" strokeWidth="9" />
      </g>
      <Nia frame={frame} />
    </g>
  );
};

const Diagram: React.FC<{frame: number}> = ({frame}) => {
  const reveal = diagramMotionAt(frame);
  const {interface: boundary, incident_point, observer_point, apparent_point, normal} = diagramGeometry;
  const rayPath = (a: {x: number; y: number}, b: {x: number; y: number}) =>
    "M" + a.x + " " + a.y + " L" + b.x + " " + b.y;
  const interfacePoint = {x: boundary.x, y: boundary.y};
  return (
    <g>
      <rect width="1920" height="1080" fill="#101B26" />
      <rect x="0" y="445" width="1920" height="635" fill="#4EA6B5" opacity={0.20 * reveal.interface} />
      <path d={"M0 " + boundary.y + " H1920"} stroke="#9AD8D7" strokeWidth="8" opacity={reveal.interface} />
      <text x="145" y="170" fill={C.ivory} fontSize="48" fontFamily="Arial" letterSpacing="4" opacity={reveal.interface}>KHÔNG KHÍ</text>
      <text x="145" y="820" fill={C.ivory} fontSize="48" fontFamily="Arial" letterSpacing="4" opacity={reveal.interface}>NƯỚC</text>
      <path d={rayPath(normal.from, normal.to)} stroke="#E7E7E1" strokeWidth="5" strokeDasharray="14 14" opacity={0.75 * reveal.normal} />
      <text x="870" y="220" fill={C.muted} fontSize="34" fontFamily="Arial" opacity={reveal.normal}>Pháp tuyến</text>
      <path d={rayPath(incident_point, interfacePoint)} stroke={C.ray} strokeWidth="13" strokeLinecap="round" opacity={reveal.incidentRay} />
      <path d={rayPath(interfacePoint, observer_point)} stroke={C.ray} strokeWidth="13" strokeLinecap="round" opacity={reveal.refractedRay} />
      <path d={rayPath(interfacePoint, apparent_point)} stroke={C.ivory} strokeWidth="8" strokeDasharray="20 18" opacity={reveal.backward} />
      <circle cx={incident_point.x} cy={incident_point.y} r="19" fill={C.coral} opacity={reveal.incidentRay} />
      <circle cx={apparent_point.x} cy={apparent_point.y} r="19" fill={C.mint} opacity={reveal.apparent} />
      <circle cx={observer_point.x} cy={observer_point.y} r="24" fill={C.ivory} opacity={0.95 * reveal.refractedRay} />
      <path d={"M" + (observer_point.x - 30) + " " + (observer_point.y + 34) + " L" + observer_point.x + " " + observer_point.y + " L" + (observer_point.x + 30) + " " + (observer_point.y + 34)} stroke={C.ivory} strokeWidth="8" fill="none" opacity={0.85 * reveal.refractedRay} />
      <text x="1510" y="160" fill={C.ivory} fontSize="32" fontFamily="Arial" opacity={reveal.refractedRay}>Mắt</text>
      <text x={incident_point.x - 155} y={incident_point.y + 68} fill={C.coral} fontSize="34" fontFamily="Arial" opacity={reveal.trueLabel}>Vị trí thật</text>
      <text x={apparent_point.x - 310} y={apparent_point.y - 75} fill={C.mint} fontSize="32" fontFamily="Arial" opacity={reveal.apparent}>Vị trí biểu kiến</text>
      <text x="680" y="690" fill={C.ray} fontSize="42" fontFamily="Arial" opacity={reveal.angles}>{diagramGeometry.incident_angle_from_normal_deg}°</text>
      <text x="965" y="305" fill={C.ray} fontSize="42" fontFamily="Arial" opacity={reveal.angles}>{(Math.atan2(observer_point.x-interfacePoint.x, interfacePoint.y-observer_point.y)*180/Math.PI).toFixed(1).replace(".", ",")}°</text>
      <g opacity={reveal.formula}>
        <rect x="1040" y="710" width="720" height="170" rx="24" fill="#203746" stroke="#64818C" strokeWidth="3" />
        <text x="1400" y="780" fill={C.ivory} fontSize="48" textAnchor="middle" fontFamily="Arial">n₁ sin θ₁ = n₂ sin θ₂</text>
        <text x="1400" y="835" fill={C.muted} fontSize="29" textAnchor="middle" fontFamily="Arial">nước: 1,333  ·  không khí: 1,0003</text>
      </g>
    </g>
  );
};

export const OpticsSpoon: React.FC = () => {
  const frame = useCurrentFrame();
  const kitchen = Math.max(windowOpacity(frame, 0, 480), windowOpacity(frame, 1452, 1728));
  const diagram = windowOpacity(frame, 420, 1480);
  const text = diagramCaptionAt(frame);
  return (
    <AbsoluteFill style={{backgroundColor: C.ink}}>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="kitchenGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DDA85E" stopOpacity=".22" />
            <stop offset="100%" stopColor="#101B26" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g opacity={kitchen}><Kitchen frame={frame} /></g>
        <g opacity={diagram}><Diagram frame={frame} /></g>
        <rect x="80" y="945" width="1760" height="90" rx="18" fill="#08121A" fillOpacity=".78" />
        <text x="960" y="1005" fontSize="38" fill={C.ivory} textAnchor="middle" fontFamily="Arial">{text}</text>
        <rect x="80" y="80" width="1760" height="1" fill={C.ivory} opacity=".12" />
      </svg>
    </AbsoluteFill>
  );
};
