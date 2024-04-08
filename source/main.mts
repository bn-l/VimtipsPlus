import "./css/style.css"; // do css imports here.
import tips from "./tips.json";

import { VimWasm, checkBrowserCompatibility, StartOptions } from "vim-wasm";
import worker from "vim-wasm/vim.js?url";


// wrap in try catch and set tip div to error message if one occurs

// :set clipboard=unnamed  will synchronise clipboards between vim and system (maybe)
// https://github.com/rhysd/vim.wasm/blob/wasm/wasm/home/web_user/tryit.js#L15C9-L15C31

// :e tutor - start "vim tutor"

// These guys are also wrapping vim.wasm: https://github.com/programmerhat/vim-online-editor/blob/master/index.php
// And doing some tricks for pasting (which might not be necessary)


const randomIndex = Math.floor(Math.random() * tips.length);
const randomTip = tips[randomIndex];

if (!randomTip) throw new Error("Couldn't get tip.");

const { tipHtml, tipId } = randomTip;


document.querySelector<HTMLDivElement>("#tip-id")!.innerText = tipId;
document.querySelector<HTMLDivElement>("#tip-body")!.innerHTML = tipHtml;

const vimPut = document.getElementById("vim-input") as HTMLInputElement;

const vim = new VimWasm({
    canvas: document.getElementById("vim-canvas") as HTMLCanvasElement,
    input: vimPut,
    workerScriptPath: worker,

});

vim.start();


// See: 
// https://vitejs.dev/guide/features.html#webassembly
// for wasm importing.

// See: https://vitejs.dev/guide/static-deploy.html#netlify-with-git
// for Netlify deployment.

// need these headers
// { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" },
// { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }
