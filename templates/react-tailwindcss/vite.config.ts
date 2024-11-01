/* eslint-disable @typescript-eslint/no-explicit-any */
/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
    reactRefresh(),
  ],
  server: {
    port: 8888,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 2000, //警告阈值大于2000KB才提示
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
