import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), dts()],
  css: {
    modules: {
      localsConvention: "camelCase", // 将 CSS Modules 类名转换为驼峰命名
      scopeBehaviour: "local", // 确保样式是局部的
    },
  },
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
    cssCodeSplit: true, // 启用 CSS 文件的单独打包
  },
});
