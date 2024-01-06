import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  includeAssests: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Nexa Canvas",
    short_name: "nexa-canvas",
    description:
      "Nexa Canvas is an immersive media gallery that seamlessly blends timeless visuals and offline accessibility, providing a captivating journey through a harmonious collection of images and videos.",
    icons: [
      {
        src: "/icons/nexa.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
  registerType: "autoUpdate",
  workbox: {
    cleanupOutdatedCaches: true,
    skipWaiting: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  plugins: [react(), VitePWA(manifestForPlugIn)],
});
