// Vite build for shadcn: Tailwind as a Vite plugin, fixed target, minified JS and CSS, no sourcemap, no preload polyfill.
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: {
    target: "es2022",
    minify: true,
    cssMinify: true,
    sourcemap: false,
    // nginx caches this directory as immutable: every file name carries its content hash.
    assetsDir: "assets",
    modulePreload: { polyfill: false },
  },
});
