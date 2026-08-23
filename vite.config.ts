// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//
// - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//   nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//   React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).

import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts.
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