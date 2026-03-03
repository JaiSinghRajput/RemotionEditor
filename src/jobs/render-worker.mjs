import fs from "fs";
import path from "path";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";

const root = process.cwd();
const jobsDir = path.join(root, "jobs");
const outDir = path.join(root, "public", "renders");
const bundleDir = path.join(root, ".remotion-bundle");

if (!fs.existsSync(jobsDir)) fs.mkdirSync(jobsDir, { recursive: true });
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function runOneJob(file) {
  const jobPath = path.join(jobsDir, file);
  const raw = fs.readFileSync(jobPath, "utf8");
  const job = JSON.parse(raw);

  const { jobId, project } = job;

  console.log("🔧 Rendering job:", jobId);

  const entry = path.join(root, "src", "remotion", "index.ts");

  // publicDir tells Remotion's bundler to serve everything in public/
  // so /uploads/audio.mp3 resolves correctly inside the composition
  const publicDir = path.join(root, "public");

  console.log("📦 Bundling...");
  const serveUrl = await bundle({
    entryPoint: entry,
    outDir: bundleDir,
    publicDir,
    webpackOverride: (config) => config,
    enableCaching: false,
    onProgress: (progress) => {
      process.stdout.write(`\r📦 Bundle: ${Math.round(progress * 100)}%  `);
    },
  });
  console.log("\n📦 Bundle ready:", serveUrl);

  const comps = await getCompositions(serveUrl, { inputProps: { project } });

  const comp = comps.find((c) => c.id === "VideoComposition");
  if (!comp) throw new Error('Composition "VideoComposition" not found');

  const outPath = path.join(outDir, `${jobId}.mp4`);

  await renderMedia({
    composition: comp,
    serveUrl,
    codec: "h264",
    outputLocation: outPath,
    inputProps: { project },
    onProgress: ({ progress }) => {
      process.stdout.write(`\r🎬 Rendering: ${(progress * 100).toFixed(1)}%`);
    },
  });

  console.log(`\n✅ Render done: /renders/${jobId}.mp4`);
  fs.unlinkSync(jobPath);
}

async function loop() {
  console.log("🎬 Remotion render worker started...");
  while (true) {
    const files = fs.readdirSync(jobsDir).filter((f) => f.endsWith(".json"));
    if (files.length) {
      for (const f of files) {
        try {
          await runOneJob(f);
        } catch (e) {
          console.error("❌ job failed:", f, e);
        }
      }
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
}

loop();
