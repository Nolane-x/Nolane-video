import preact from "@preact/preset-vite";
import {defineConfig, type Plugin} from "vite";
import motionCanvasModule from "@motion-canvas/vite-plugin";

// The published 3.17.2 package is CommonJS. Normalize Node's CJS/ESM
// interop so the config works in Vite's bundled config loader as well.
const motionCanvasFactory =
  (motionCanvasModule as unknown as {
    default?: typeof motionCanvasModule;
  }).default ?? motionCanvasModule;

function neeExportAudit(): Plugin {
  const seenFrames = new Set<number>();
  let received = 0;
  let minFrame: number | null = null;
  let maxFrame: number | null = null;
  let malformed = 0;

  return {
    name: "nee:m1-export-audit",
    configureServer(server) {
      server.ws.on("motion-canvas:export", (payload: {frame?: number}) => {
        received += 1;
        if (!Number.isInteger(payload.frame)) {
          malformed += 1;
          return;
        }
        const frame = payload.frame as number;
        seenFrames.add(frame);
        minFrame = minFrame === null ? frame : Math.min(minFrame, frame);
        maxFrame = maxFrame === null ? frame : Math.max(maxFrame, frame);
        if (received % 100 === 0) {
          process.stdout.write(
            `[NEE export audit] received=${received} unique=${seenFrames.size} min=${minFrame} max=${maxFrame}\n`
          );
        }
      });

      server.middlewares.use((request, response, next) => {
        if (request.url?.split("?")[0] !== "/__m1-export-audit") {
          next();
          return;
        }
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify({
          received,
          uniqueFrames: seenFrames.size,
          minFrame,
          maxFrame,
          malformed,
          missingFrames: Array.from({length: 1728}, (_, index) => index)
            .filter(frame => !seenFrames.has(frame))
        }));
      });
    }
  };
}

export default defineConfig({
  plugins: [
    preact({
      include: [
        /node_modules\/@motion-canvas\/ui\/(.*)\.tsx?$/,
        /node_modules\/@motion-canvas\/2d\/(.*)\.tsx?$/
      ]
    }),
    motionCanvasFactory({buildForEditor: true}),
    neeExportAudit()
  ],
  build: {
    minify: false
  }
});
