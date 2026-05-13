import { rm, mkdir, cp, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const FILES = [
  "manifest.json",
  "background.js",
  "popup.html",
  "popup.css",
  "popup.js",
  "options.html",
  "options.css",
  "options.js",
  "icons/icon16.png",
  "icons/icon32.png",
  "icons/icon48.png",
  "icons/icon128.png",
];

async function main() {
  const manifest = JSON.parse(
    await readFile(join(ROOT, "manifest.json"), "utf8")
  );

  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  for (const rel of FILES) {
    const src = join(ROOT, rel);
    const dest = join(DIST, rel);
    await mkdir(dirname(dest), { recursive: true });
    await cp(src, dest);
  }

  console.log(`Built ${manifest.name} v${manifest.version} -> ${DIST}`);
  console.log(`  ${FILES.length} files`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
