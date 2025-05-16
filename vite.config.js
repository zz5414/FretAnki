import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,mp3}"], // Ensure mp3 files are cached
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*/i, // Cache external resources if any, adjust as needed
            handler: "NetworkFirst",
            options: {
              cacheName: "external-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        name: "Guitar Fretboard Trainer",
        short_name: "FretTrainer",
        description: "An interactive web app to learn guitar fretboard notes.",
        theme_color: "#1e293b", // slate-800
        background_color: "#0f172a", // slate-900
        display: "fullscreen",
        orientation: "landscape",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});

