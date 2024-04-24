import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import react from "@vitejs/plugin-react-swc";
import { ViteStaticCopyOptions, viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "node:path";

const VSCOptions: ViteStaticCopyOptions = {
    targets: [
        // {
        //   src: "source/VimTerminal/vim.wasm",
        //   dest: "assets",
        // },
        // {
        //   src: "source/VimTerminal/vim.data",
        //   dest: "assets"
        // },
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
              main: resolve(__dirname, 'index.html'),
              nested: resolve(__dirname, 'source/VimTerminal/terminal.html'),
            },
        }
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