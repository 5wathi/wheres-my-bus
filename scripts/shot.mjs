// One-off: capture README screenshots from the running dev server (port 3002).
// Usage: node scripts/shot.mjs   (requires `npm run dev` running, puppeteer-core)
import puppeteer from "puppeteer-core";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3002";
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../docs");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const shots = [
  { file: "live.png", path: "/?city=blr", theme: "light" },
  { file: "route.png", path: "/?city=mum&route=mum-700", theme: "light" },
  { file: "dark.png", path: "/?city=hyd", theme: "dark" },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--window-size=1400,840"],
});

for (const s of shots) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 820, deviceScaleFactor: 2 });
  // Seed theme before the app reads it.
  await page.evaluateOnNewDocument((t) => {
    try {
      localStorage.setItem("wmb:theme", t);
    } catch {}
  }, s.theme);
  await page.goto(BASE + s.path, { waitUntil: "networkidle2", timeout: 30000 });
  await sleep(3500); // let tiles + simulated buses settle
  await page.screenshot({ path: resolve(OUT, s.file) });
  console.log("wrote", s.file);
  await page.close();
}

await browser.close();
console.log("done");
