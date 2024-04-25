
import fsp from "node:fs/promises";
import { minify } from "terser";


const vimjs = await fsp.readFile("./vendor/vim.js", { encoding: "utf-8" });
const vimjsmin = (await minify(vimjs)).code;
if (!vimjsmin) throw new Error("Failed to minify the code");
await fsp.writeFile("./public/vim.js", vimjsmin, { encoding: "utf-8" });


await fsp.cp("./node_modules/vim-wasm/vim.wasm", "./public/vim.wasm");
await fsp.cp("./node_modules/vim-wasm/vim.data", "./public/vim.data");
