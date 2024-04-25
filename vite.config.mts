import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import react from "@vitejs/plugin-react-swc";
import { ViteStaticCopyOptions, viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "node:path";

import { fileURLToPath } from 'url';

export default defineConfig({
    build: {
        rollupOptions: {
          input: {
            main: fileURLToPath(new URL('./index.html', import.meta.url)),
            vimTerminal: fileURLToPath(new URL('./VimTerminal/index.html', import.meta.url)),
          },
        },
    },
    plugins: [
        UnoCSS(),
        react(),
        // viteStaticCopy(VSCOptions),
    ],
    server: {
        headers: {
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin"
        }
    }
})