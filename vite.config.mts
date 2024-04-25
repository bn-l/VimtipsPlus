import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";

import { fileURLToPath } from 'url';

export default defineConfig({
    plugins: [
        UnoCSS(),
        react(),
    ],
    server: {
        headers: {
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin"
        }
    }
})