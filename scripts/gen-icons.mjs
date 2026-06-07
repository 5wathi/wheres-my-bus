// Generate PWA icons from an inline SVG using sharp. Run: npm run icons
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const dir = resolve(dirname(fileURLToPath(import.meta.url)), "../public/icons");
mkdirSync(dir, { recursive: true });

// Indigo rounded tile with a white bus glyph. Full-bleed background is
// maskable-safe (the glyph sits well inside the 80% safe zone).
const svg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#4f5aa3"/>
  <g fill="none" stroke="#ffffff" stroke-width="22" stroke-linecap="round" stroke-linejoin="round">
    <rect x="150" y="132" width="212" height="208" rx="40"/>
    <line x1="150" y1="236" x2="362" y2="236"/>
    <line x1="186" y1="184" x2="326" y2="184"/>
  </g>
  <circle cx="196" cy="372" r="26" fill="#ffffff"/>
  <circle cx="316" cy="372" r="26" fill="#ffffff"/>
</svg>`;

async function main() {
  const targets = [
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
    { name: "maskable-512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
  ];
  for (const t of targets) {
    await sharp(Buffer.from(svg(t.size))).resize(t.size, t.size).png().toFile(
      resolve(dir, t.name)
    );
    console.log("wrote", t.name);
  }
}
main();
