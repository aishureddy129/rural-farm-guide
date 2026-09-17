import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";
import { nitro } from "nitro/vite";

export default defineConfig({
  vite: {
    plugins: [
      nitro(),

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
              src: "/icon/icon.svg",
              sizes: "any",
              type: "image/svg+xml",
              purpose: "any",
            },
          ],
        },

        workbox: {
          globPatterns: [
            "**/*.{js,css,html,ico,png,svg,woff2}",
          ],
        },
      }),
    ],
  },
});