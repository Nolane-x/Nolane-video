import {
  makePlugin,
  makeProject,
  RendererResult,
  RendererState
} from "@motion-canvas/core";
import spoon from "./scenes/spoon?scene";

const rendererAudit = makePlugin({
  name: "nee:m1-renderer-audit",
  renderer(renderer) {
    let lastFrame = -1;

    renderer.onFrameChanged.subscribe((frame) => {
      lastFrame = frame;
      if (frame === 0 || frame % 24 === 0 || frame === 1728) {
        console.log("[M1 renderer] frame", frame);
      }
    });

    renderer.onStateChanged.subscribe((state) => {
      const label = state === RendererState.Initial
        ? "Initial"
        : state === RendererState.Working
          ? "Working"
          : "Aborting";
      console.log("[M1 renderer] state", label, "lastFrame", lastFrame);
    });

    renderer.onFinished.subscribe((result) => {
      const label = result === RendererResult.Success
        ? "Success"
        : result === RendererResult.Error
          ? "Error"
          : "Aborted";
      console.log("[M1 renderer] finished", {
        result: label,
        lastFrame
      });
    });
  }
});

export default makeProject({
  scenes: [spoon],
  plugins: [rendererAudit]
});
