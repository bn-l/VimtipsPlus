import { defineConfig } from 'vite'
import { resolve } from "node:path";

console.log("__dirname", __dirname);

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        emptyOutDir: false,
        minify: "terser",
        rollupOptions: {
            input: {
                background: resolve(__dirname, "./source/background.ts"),
            },
            output: {
                format: "iife",
                entryFileNames: "[name].js",
                dir: "public"
            }
        },
        terserOptions: {
            module: false,
        },
    }
})