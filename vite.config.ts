import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), dts()],

  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "listflow-react",
      formats: ["es"],
      fileName: () => "index.es.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "autoprefixer", "postcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          autoprefixer: "autoprefixer",
          postcss: "postcss",
        },
      },
    },
    sourcemap: false,
    emptyOutDir: true,
    cssCodeSplit: false, // 启用 CSS 文件的单独打包
  },
});
