import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import react from "@vitejs/plugin-react-swc";
import { ViteStaticCopyOptions, viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "node:path";
import { whyframe } from '@whyframe/core'
import { whyframeJsx } from '@whyframe/jsx'

import { fileURLToPath } from 'url';

const VSCOptions: ViteStaticCopyOptions = {
    targets: [
        {
          src: "VimTerminal/vendor/vim.wasm",
          dest: "assets",
        },
        {
          src: "VimTerminal/vendor/vim.data",
          dest: "assets"
        },
        // {
        //     src: "source/VimTerminal/vim.css",
        //     dest: "assets"
        // },    
        {
            src: "netlify.toml",
            dest: ""
        }
    ]
}

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
        viteStaticCopy(VSCOptions)
    ],
    server: {
        headers: {
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin"
        }
    }
})