import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages uses a repository subpath; Netlify serves from the domain root.
const isNetlify = process.env.NETLIFY === "true";

export default defineConfig({
  site: process.env.URL || "https://gpldroid.github.io",
  base: isNetlify ? "/" : "/kidsbooks",
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
