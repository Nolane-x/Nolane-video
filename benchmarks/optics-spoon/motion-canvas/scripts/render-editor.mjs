import {chromium} from "playwright";
import {spawn} from "node:child_process";
import {promises as fs} from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const OUTPUT_ROOT = path.join(ROOT, "output");
const DELIVERY_DIR = path.join(ROOT, "out");
const URL = "http://127.0.0.1:9000";
const EXPECTED_FRAMES = 1728;
const FPS = 24;
const RENDER_TIMEOUT_MS = 25 * 60 * 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer(timeoutMs = 120000) {
  const end = Date.now() + timeoutMs;
  let lastError = "server did not respond";
  while (Date.now() < end) {
    try {
      const response = await fetch(URL);
      if (response.ok) return;
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await sleep(500);
  }
  throw new Error(`Motion Canvas Vite server failed to start: ${lastError}`);
}

async function findFrameDirectory(root) {
  const matches = [];
  async function visit(directory) {
    let entries;
    try {
      entries = await fs.readdir(directory, {withFileTypes: true});
    } catch {
      return;
    }
    const pngs = entries
      .filter((entry) => entry.isFile() && /^\d{6}\.png$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort();
    if (pngs.length) matches.push({directory, pngs});
    for (const entry of entries) {
      if (entry.isDirectory()) await visit(path.join(directory, entry.name));
    }
  }
  await visit(root);
  return matches.sort((a, b) => b.pngs.length - a.pngs.length)[0] ?? null;
}

async function run(command, args, options = {}) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? ROOT,
      stdio: "inherit",
      shell: false,
      ...options
    });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code ?? "null"} (signal ${signal ?? "none"})`));
    });
  });
}

await fs.mkdir(DELIVERY_DIR, {recursive: true});
await fs.rm(OUTPUT_ROOT, {recursive: true, force: true});

const vite = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1", "--port", "9000"], {
  cwd: ROOT,
  stdio: ["ignore", "pipe", "pipe"]
});
let viteLog = "";
vite.stdout.on("data", (chunk) => { viteLog += chunk.toString(); });
vite.stderr.on("data", (chunk) => { viteLog += chunk.toString(); });

let browser;
try {
  await waitForServer();
  browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });
  const page = await browser.newPage({viewport: {width: 1600, height: 1000}});
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  // The editor persists expandable-panel and process selection state per
  // project. Seed a known, reproducible first-render state before the app
  // mounts, rather than relying on a stale/default localStorage snapshot.
  await page.addInitScript(() => {
    // The Vite project entry is src/project.ts, so Motion Canvas names it "project".
    const projectName = "project";
    for (const title of ["General", "Preview", "Rendering"]) {
      localStorage.setItem(`${projectName}-expandable-${title}`, "true");
    }
    localStorage.setItem(`${projectName}-main-action`, "0");
  });
  // The editor only: choose ReducedCollapse so panel content mounts immediately
  // in headless CI. This does not alter frame-based animation in the film.
  await page.emulateMedia({reducedMotion: "reduce"});

  await page.goto(URL, {waitUntil: "domcontentloaded", timeout: 120000});
  const settingsTab = page.locator("#rendering-tab");
  const settingsPane = page.locator("#settings-pane");
  await settingsTab.waitFor({state: "visible", timeout: 120000});
  const renderButton = page.locator("#render");

  // Tabs are toggles. Check the actual active class after the editor has
  // mounted; an early element count can race with the persisted panel state.
  const isTabActive = () => settingsTab.evaluate((element) =>
    element.className.split(" ").some((name) => name.includes("_active_"))
  );
  if (!(await isTabActive())) {
    await settingsTab.click({force: true});
    try {
      await page.waitForFunction(
        () => document.getElementById("rendering-tab")?.className.includes("_active_"),
        {timeout: 12000}
      );
    } catch {
      await settingsTab.evaluate((element) =>
        element.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true}))
      );
      await page.waitForFunction(
        () => document.getElementById("rendering-tab")?.className.includes("_active_"),
        {timeout: 12000}
      );
    }
  }
  try {
    await settingsPane.waitFor({state: "visible", timeout: 45000});
    if (await renderButton.count() === 0) {
      const renderingHeader = settingsPane
        .locator("div[class*='title']")
        .filter({hasText: /^Rendering$/})
        .first();
      await renderingHeader.waitFor({state: "visible", timeout: 15000});
      const toggle = renderingHeader.locator("button").first();
      const isExpanded = () => toggle.evaluate((element) =>
        element.className.split(" ").some((name) => name.includes("_open_"))
      );

      // Some headless Preact mounts can show the initial expanded arrow while
      // the AnimatedCollapse child tree has not mounted. A real close/open
      // cycle re-runs the component's visibility lifecycle deterministically.
      if (await isExpanded()) {
        await toggle.click({force: true});
        await page.waitForFunction(() =>
          !document.querySelector("#settings-pane ._title_1npk1_6 button")?.className.includes("_open_")
        );
      }
      await toggle.click({force: true});
      await page.waitForFunction(() =>
        document.querySelector("#settings-pane ._title_1npk1_6 button._open_hvw7c_297") !== null
      );
    }
    await renderButton.waitFor({state: "visible", timeout: 45000});
  } catch {
    const debug = {
      url: page.url(),
      title: await page.title(),
      body: (await page.locator("body").innerText().catch(() => "")).slice(0, 12000),
      buttons: await page.locator("button").evaluateAll((items) =>
        items.map((item) => ({
          id: item.id,
          text: item.innerText,
          disabled: item.disabled,
          className: item.className
        }))
      ),
      localStorage: await page.evaluate(() =>
        Object.fromEntries(Object.keys(localStorage).map((key) => [key, localStorage.getItem(key)]))
      ),
      settingsPaneHTML: await settingsPane.evaluate((pane) => ({
        html: pane.innerHTML.slice(0, 16000),
        groups: [...pane.querySelectorAll("div[class*='title']")].map((title) => {
          const root = title.parentElement;
          const collapse = root?.children[1];
          return {
            title: title.textContent.trim(),
            titleClass: title.className,
            toggleClass: title.querySelector("button")?.className ?? null,
            collapseHTML: collapse?.outerHTML.slice(0, 3500) ?? null,
            collapseHeight: collapse ? getComputedStyle(collapse).height : null,
            collapseDataset: collapse?.dataset ?? null
          };
        })
      })),
      pageErrors,
      viteLog: viteLog.slice(-8000)
    };
    await page.screenshot({path: path.join(DELIVERY_DIR, "editor-debug.png"), fullPage: true}).catch(() => {});
    await fs.writeFile(path.join(DELIVERY_DIR, "editor-debug.json"), JSON.stringify(debug, null, 2));
    throw new Error("Motion Canvas Render button not visible. " + JSON.stringify(debug, null, 2));
  }
  await renderButton.click();

  const startDeadline = Date.now() + 30000;
  let started = false;
  while (Date.now() < startDeadline) {
    const rendering = await page.locator("#render").getAttribute("data-rendering").catch(() => null);
    if (rendering === "true") {
      started = true;
      break;
    }
    const frameDirectory = await findFrameDirectory(OUTPUT_ROOT);
    if (frameDirectory?.pngs.length > 0) {
      started = true;
      break;
    }
    await sleep(250);
  }
  if (!started) {
    throw new Error("Motion Canvas did not enter its rendering state. Recent Vite output:\n" + viteLog.slice(-5000));
  }

  const deadline = Date.now() + RENDER_TIMEOUT_MS;
  let finalFrames = null;
  while (Date.now() < deadline) {
    finalFrames = await findFrameDirectory(OUTPUT_ROOT);
    const rendering = await page.locator("#render").getAttribute("data-rendering").catch(() => null);
    if (rendering !== "true" && finalFrames?.pngs.length === EXPECTED_FRAMES) break;
    if (rendering !== "true" && finalFrames && finalFrames.pngs.length !== EXPECTED_FRAMES) {
      await sleep(1500);
      const secondCheck = await findFrameDirectory(OUTPUT_ROOT);
      if (secondCheck?.pngs.length !== EXPECTED_FRAMES) {
        throw new Error(`Motion Canvas finished with ${secondCheck?.pngs.length ?? 0}/${EXPECTED_FRAMES} PNG frames.`);
      }
      finalFrames = secondCheck;
      break;
    }
    await sleep(1000);
  }

  if (!finalFrames || finalFrames.pngs.length !== EXPECTED_FRAMES) {
    throw new Error(`Timed out waiting for ${EXPECTED_FRAMES} frames; found ${finalFrames?.pngs.length ?? 0}.\n${viteLog.slice(-5000)}`);
  }
  if (pageErrors.length) {
    throw new Error("Browser runtime errors:\n" + pageErrors.join("\n"));
  }

  const frameNumbers = finalFrames.pngs.map((name) => Number.parseInt(name.slice(0, 6), 10));
  for (let i = 0; i < EXPECTED_FRAMES; i += 1) {
    if (frameNumbers[i] !== i) {
      throw new Error(`Frame sequence gap: expected ${String(i).padStart(6, "0")}.png, got ${finalFrames.pngs[i]}`);
    }
  }

  const videoPath = path.join(DELIVERY_DIR, "optics-spoon.mp4");
  await run("ffmpeg", [
    "-y",
    "-framerate", String(FPS),
    "-start_number", "0",
    "-i", path.join(finalFrames.directory, "%06d.png"),
    "-frames:v", String(EXPECTED_FRAMES),
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    videoPath
  ]);
  await run("ffmpeg", [
    "-y",
    "-i", videoPath,
    "-vf", "fps=1/6,scale=480:-1,tile=4x3",
    "-frames:v", "1",
    path.join(DELIVERY_DIR, "contact-sheet.jpg")
  ]);

  await fs.writeFile(
    path.join(DELIVERY_DIR, "render-report.json"),
    JSON.stringify({
      engine: "Motion Canvas",
      version: "3.17.2",
      width: 1920,
      height: 1080,
      fps: FPS,
      expected_frames: EXPECTED_FRAMES,
      rendered_frames: finalFrames.pngs.length,
      frame_directory: path.relative(ROOT, finalFrames.directory),
      audio: "not supplied in this benchmark preview",
      browser_errors: pageErrors
    }, null, 2) + "\n"
  );

  console.log(`Motion Canvas rendered ${finalFrames.pngs.length} PNG frames and encoded ${videoPath}`);
} finally {
  if (browser) await browser.close();
  vite.kill("SIGTERM");
}
