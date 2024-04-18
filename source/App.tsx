// import "./css/App.css";
import TipBody from "./TipBody.tsx";
import tips from "./data/tips-generated.json";
import VimTerminal from "./VimTerminal.tsx";
import logo from "./images/logo128.webp";

import { Switch } from "@mui/base/Switch";
import { useState, useEffect } from "react";
import { DarkModeSwitch } from "clean-components";

// wrap in try catch and set tip div to error message if one occurs

// :set clipboard=unnamed  will synchronise clipboards between vim and system (maybe)
// https://github.com/rhysd/vim.wasm/blob/wasm/wasm/home/web_user/tryit.js#L15C9-L15C31

// :e tutor - start "vim tutor"

// These guys are also wrapping vim.wasm: https://github.com/programmerhat/vim-online-editor/blob/master/index.php
// And doing some tricks for pasting (which might not be necessary)

// See original project for extension related js etc


// See: https://vitejs.dev/guide/static-deploy.html#netlify-with-git
// for Netlify deployment.

// need these headers for preview (plugin should work as can set headers)
// { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" },
// { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }


// Alternatives to vim.wasm:
// https://github.com/brijeshb42/monaco-vim

// Todo:
// - Make term slightly smaller than outer div and add background



const repoLink = "https://github.com/bn-l/VimtipsPlus";
const getEditLink = (idLineNumber: number) => `https://github.com/bn-l/vimtips-plus/edit/main/source/tips.md?plain=1#L${ idLineNumber }`;


export default function App() {

    const [tipIndex, setTipIndex] = useState(Math.floor(Math.random() * tips.length));
    const [popupVisible, setPopupVisible] = useState(false);


    const { tipId, tipHtml, idLineNumber } = tips[tipIndex];
    
    useEffect(() => {
        document.title = `New Tab - VimTips Plus- Tip #${ tips[tipIndex].tipId }`;
    }, [tipIndex]);


    const lightBg = "#FAFAFA"
    const darkBg = "#3C3C3C"

    return (
        <div id="app" className="flex-exp-col h-screen dark:bg-[#3C3C3C] bg-[#FAFAFA]">

            <div className="flex-exp-row">
                <div className="pl-5 pr-5 pt-5 brightness-100 contrast-100 grayscale-80">
                    <img
                        className="h-16"
                        id="logo" 
                        src={logo} 
                        alt="VimTipsPLUS logo"
                    />
                </div>

                <div className="pr-10 drop-shadow-sm">
                    <DarkModeSwitch 
                        lightColor="#FAFAFA" 
                        darkColor="#3C3C3C"
                    />
                </div>
            </div>

            {/* <div className="flex flex-col self-center flex-center sm:w-80% sm:h-50%"> */}
            <div className="flex flex-col self-center flex-center m-0 w-full">

                <div className="text-xl text-slate-900 dark:text-zinc-100 w-80% text-center">
                    <TipBody 
                        tipHtml={tipHtml}
                    />
                </div>
                <VimTerminal />
            </div>

            <div className="flex place-self-end flex-row gap-3 text-sm text-slate-500 dark:text-zinc-400 p-5">

                <div className="">Tip ID#: {tipId}</div>
                <div>
                    <a href={getEditLink(idLineNumber)} 
                        className="text-stone-500 dark:text-zinc-400 no-underline"
                    >edit</a>
                </div>
                <div>
                    <a href={repoLink} 
                        className="text-stone-500 dark:text-zinc-400 no-underline"
                    >VimTipsPLUS</a>
                </div> 
                <div>by bn-l</div>
            </div>
        </div>
    );
}

