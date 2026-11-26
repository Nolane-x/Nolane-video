import preact from "@preact/preset-vite";
import {defineConfig} from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";

export default defineConfig({
  plugins: [
    preact({
      include: [
        /node_modules\/@motion-canvas\/ui\/(.*)\.tsx?$/,
        /node_modules\/@motion-canvas\/2d\/(.*)\.tsx?$/
      ]
    }),
    motionCanvas({buildForEditor: true})
  ],
  build: {
    minify: false
  }
});
