import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages hosts this repository below /kidsbooks; root-hosted providers use /.
const githubPages = process.env.GITHUB_PAGES === "true";
const base = process.env.ASTRO_BASE_PATH ?? (githubPages ? "/kidsbooks" : "/");

// Prefer an explicit canonical site, then provider-specific production URLs.
const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL;
const detectedSite =
  process.env.ASTRO_SITE ||
  process.env.URL ||
  (vercelHost ? `https://${vercelHost}` : undefined) ||
  (process.env.CF_PAGES_URL ? `https://${process.env.CF_PAGES_URL}` : undefined) ||
  process.env.RENDER_EXTERNAL_URL ||
  "https://gpldroid.github.io";

export default defineConfig({
  site: detectedSite,
  base,
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory"
  },
  integrations: [sitemap()],
  vite: {
    plugins: [/** @type {never} */ (tailwindcss())]
  }
});
