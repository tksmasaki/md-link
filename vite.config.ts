import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import { readFileSync } from "node:fs";

const manifest = defineManifest(
  JSON.parse(readFileSync("./manifest.json", "utf8")),
);

export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
