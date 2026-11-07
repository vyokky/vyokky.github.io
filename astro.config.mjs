// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Static build for GitHub Pages (user site, served from the gh-pages branch).
export default defineConfig({
  site: "https://vyokky.github.io",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: "always" },
  // Keep authored whitespace: compression drops the space where a line break meets an inline tag.
  compressHTML: false,
});
