import React from "react";
import {Composition} from "remotion";
import {OpticsSpoon} from "./OpticsSpoon";

export const Root: React.FC = () => (
  <Composition
    id="optics-spoon"
    component={OpticsSpoon}
    width={1920}
    height={1080}
    fps={24}
    durationInFrames={1728}
    defaultProps={{}}
  />
);
