import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  server: {
    port: 8080,
  },
  publicDir:
    command === "serve" || (command === "build" && mode === "staging")
      ? "public_dev"
      : "public",
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
  build:
    mode === "staging"
      ? {}
      : {
          target: "esnext",
          lib: {
            entry: fileURLToPath(new URL("src/index.js", import.meta.url)),
            name: "CdsInteractiveMap",
          },
          rollupOptions: {
            external: ["vue"],
            output: {
              globals: {
                vue: "Vue",
              },
            },
          },
        },
}));
