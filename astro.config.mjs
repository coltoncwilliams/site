import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 100000000, // inline all assets (JS, images, etc.)
      rollupOptions: {
        output: {
          codeSplitting: false,
        },
      },
    },
  },
});
