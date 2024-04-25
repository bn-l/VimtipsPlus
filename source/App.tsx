// import "./css/App.css";
import TipBody from "./TipBody.tsx";
import tips from "./data/tips-generated.json";
import logo from "./images/logo.svg";


import { useState, useEffect } from "react";
import { DarkModeSwitch } from "clean-components";
import an from "../vendor/google-analytics.ts";

import Popup from "./Popup.tsx";

import colorTheme from "./colorTheme.json";

import VimTerminal from "./VimTerminal.tsx";

// wrap in try catch and set tip div to error message if one occurs

// :set clipboard=unnamed  will synchronise clipboards between vim and system (maybe)
// https://github.com/rhysd/vim.wasm/blob/wasm/wasm/home/web_user/tryit.js#L15C9-L15C31

// :e tutor - start "vim tutor"


// See original project for extension related js etc


// See: https://vitejs.dev/guide/static-deploy.html#netlify-with-git
// for Netlify deployment.

// need these headers for preview (plugin should work regardless as can set headers)
// { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" },
// { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }


// Alternatives to vim.wasm:
// https://github.com/brijeshb42/monaco-vim

// Todo:
// - Make term slightly smaller than outer div and add background



const VIMTIPS_LINK = "https://github.com/bn-l/VimtipsPlus";
const getEditLink = (idLineNumber: number) => `https://github.com/bn-l/VimtipsPlus/edit/main/source/tips.md?plain=1#L${ idLineNumber }`;

// Need to escape spaces. Can be any font available to browser including (like below), a web font 
// const font = "Consolas:h14";
const font = "Noto\\ Sans\\ Mono:h14";

const globalCSSVars = {
    "--light-bg": colorTheme.colors.light,
    "--dark-bg": colorTheme.colors.dark,
}

for (const [key, value] of Object.entries(globalCSSVars)) {
    document.documentElement.style.setProperty(key, value);
}

const firstLoad = !localStorage.getItem("loadedBefore");
if(firstLoad) localStorage.setItem("loadedBefore", "true");


export default function App() {

    const [tipIndex, setTipIndex] = useState(Math.floor(Math.random() * tips.length));
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [termLoaded, setTermLoaded] = useState(false);

    const loadedAt = Date.now();

    useEffect(() => {
        void an.pageView(document.title, document.location.href);

        const handleBeforeUnload = () => {
            void an.event("quit", { duration: Date.now() - loadedAt });
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);
    
    useEffect(() => {
        document.title = `New Tab - VimTips Plus- Tip #${ tips[tipIndex].tipId }`;
    }, [tipIndex]);

    const randomTip = () => setTipIndex(Math.floor(Math.random() * tips.length));
    const nextTip = () => setTipIndex(index => (index + 1) % tips.length);
    const prevTip = () => setTipIndex(index => (index - 1 + tips.length) % tips.length);
    const toggleTheme = () =>  setTheme(theme => theme === "light" ? "dark" : "light");


    // ------------- Keyboard listeners start ------------- //

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            switch (event.key) {
                case "+": randomTip();
                    break;
                case "[": prevTip();
                    break;
                case "]": nextTip();
                    break;
                case "t":
                    toggleTheme();
                    break;
                case "s":
                    setTermLoaded(true);
                    break;
                default:
                    break;
            }
        };
        document.addEventListener("keypress", handleKeyPress);
        return () => document.removeEventListener("keypress", handleKeyPress);
    }, []);

    // ------------- Keyboard listeners end -------------- //

    const { tipId, tipHtml, idLineNumber } = tips[tipIndex];

    return (
        <div id="app" className="flex-exp-col h-screen">

            <div className="flex-exp-row">
                <div className="pl-5 pr-5 pt-5 brightness-100 contrast-30 grayscale-100 opacity-10">
                    <img
                        className="h-12"
                        id="logo" 
                        src={logo} 
                        alt="VimTipsPLUS logo"
                    />
                </div>

                <div className="pt-8 pr-8 drop-shadow-sm">
                    <DarkModeSwitch 
                        lightColor={colorTheme.colors.light} 
                        darkColor={colorTheme.colors.dark}
                        stateManager={[theme, setTheme]}
                    />
                </div>
            </div>

            <div className="flex flex-col self-center flex-center m-0 w-full">

                <div className="text-xl text-slate-900 dark:text-zinc-100 w-50% text-center">
                    <TipBody 
                        tipHtml={tipHtml}
                    />
                </div>
                {!termLoaded &&
                    <div>
                        <button 
                            className="rounded-md px-4 py-2 bg-white border-none drop-shadow-md cursor-pointer font-mono lowercase dark:bg-[#525252] dark:text-zinc-100"
                            onClick={() => setTermLoaded(true)}
                        >
                            load terminal (s)
                        </button>
                    </div>
                }
                <VimTerminal 
                    font={font} 
                    theme={theme} 
                    loaded={termLoaded}
                />
            </div>

            <div className="flex place-self-end flex-row gap-3 text-xs text-slate-500 dark:text-zinc-400 p-5 sm:text-sm">

                <div className="">
                    <Popup 
                        hotkey="?" 
                        displayElement="?" 
                        startOpen={firstLoad} 
                        onOpen={() => an.event("help_popup")}
                    />
                </div>

                <div className="">Tip ID#: {tipId}</div>
                <div>
                    <a href={getEditLink(idLineNumber)} 
                        className="text-stone-500 dark:text-zinc-400 no-underline"
                        onClick={() => an.event("edit_tip")}
                    >edit</a>
                </div>
                <div>
                    <a href={VIMTIPS_LINK} 
                        className="text-stone-500 dark:text-zinc-400 no-underline"
                        onClick={() => an.event("repo_link")}
                    >Vimtips Plus</a>
                </div> 
                <div>by bn-l</div>
            </div>
        </div>
    );
}

