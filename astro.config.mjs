import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://coltoncwilliams.github.io",
  base: "/site",
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 100000000,
      rollupOptions: {
        output: {
          codeSplitting: false,
        },
      },
    },
  },
});
