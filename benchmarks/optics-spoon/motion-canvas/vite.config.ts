import preact from "@preact/preset-vite";
import {defineConfig} from "vite";
import motionCanvasModule from "@motion-canvas/vite-plugin";

// The published 3.17.2 package is CommonJS. Normalize Node's CJS/ESM
// interop so the config works in Vite's bundled config loader as well.
const motionCanvasFactory =
  (motionCanvasModule as unknown as {
    default?: typeof motionCanvasModule;
  }).default ?? motionCanvasModule;

export default defineConfig({
  plugins: [
    preact({
      include: [
        /node_modules\/@motion-canvas\/ui\/(.*)\.tsx?$/,
        /node_modules\/@motion-canvas\/2d\/(.*)\.tsx?$/
      ]
    }),
    motionCanvasFactory({buildForEditor: true})
  ],
  build: {
    minify: false
  }
});
