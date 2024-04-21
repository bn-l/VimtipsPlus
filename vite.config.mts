import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import react from "@vitejs/plugin-react-swc";
import { ViteStaticCopyOptions, viteStaticCopy } from "vite-plugin-static-copy";

const VSCOptions: ViteStaticCopyOptions = {
    targets: [
        {
          src: "node_modules/vim-wasm/vim.wasm",
          dest: "assets",
        },
        {
          src: "node_modules/vim-wasm/vim.data",
          dest: "assets"
        },
        {
            src: "netlify.toml",
            dest: ""
        }
    ]
}

export default defineConfig({
    
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