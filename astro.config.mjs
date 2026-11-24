import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://gpldroid.github.io",
  base: "/kidsbooks",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory"
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
