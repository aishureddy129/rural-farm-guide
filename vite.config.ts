// @lovable.dev/vite-tanstack-config already includes the required
// TanStack Start, React, Tailwind, Nitro and path plugins.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  vite: {
    plugins: [
      VitePWA({
        registerType: "autoUpdate",

        manifest: {
          name: "GramSahay AI",
          short_name: "GramSahay",
          description:
            "AI-powered rural assistance and village issue reporting platform",
          theme_color: "#16a34a",
          background_color: "#ffffff",
          display: "standalone",
          start_url: "/",
          scope: "/",

          icons: [
            {
              src: "/icons/icon.svg",
              sizes: "512x512",
              type: "image/svg+xml",
              purpose: "any maskable",
            },
          ],
        },

        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        },
      }),
    ],
  },
});