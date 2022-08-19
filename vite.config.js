import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  publicDir:
    command === "serve" || (command === "build" && mode === "staging")
      ? "public_dev"
      : "public",
  plugins: [vue()],
  build:
    mode === "staging"
      ? {}
      : {
          target: "esnext",
          lib: {
            entry: path.resolve(__dirname, "src/index.js"),
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
