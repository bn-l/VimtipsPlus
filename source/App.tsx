
import TipBody from "./TipBody.tsx";
import tips from "./data/tips-generated.json";
import logo from "./images/logo.svg";
import Popup from "./Popup.tsx";
import colorTheme from "./colorTheme.json";
import VimTerminal from "./VimTerminal.tsx";
import extensionBadge from "../media/extension-badge.svg";

import { useState, useEffect } from "react";
import { DarkModeSwitch, getStartingTheme } from "clean-components";


// need these headers for preview (plugin should work regardless as can set headers)
// { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" },
// { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }


// Alternatives to vim.wasm:
// https://github.com/brijeshb42/monaco-vim



const repoLink = "https://github.com/bn-l/VimtipsPlus";
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


const startingTheme = getStartingTheme();


export default function App() {

    const [tipIndex, setTipIndex] = useState(Math.floor(Math.random() * tips.length));
    const [theme, setTheme] = useState<"light" | "dark">(startingTheme);
    const [termLoaded, setTermLoaded] = useState(false);

    const loadedAt = Date.now();
    
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

                <div className="pt-8 pr-8 drop-shadow-sm w-70vw flex flex-row justify-end align-middle gap-2ch">
                    {chrome?.runtime ? null : 
                        <img 
                            className="w-15ch"
                            src={extensionBadge}
                            alt="Download the Vimtips Plus chrome new tab page"
                        /> 
                    }
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
                {termLoaded ?
                    <VimTerminal 
                        font={font} 
                        theme={theme} 
                        loaded={termLoaded}
                        setLoaded={setTermLoaded} 
                    />
                    :
                    <div id="button-div">
                        <button 
                            className="rounded-md px-4 py-2 bg-white border-none drop-shadow-md cursor-pointer font-mono lowercase dark:bg-[#525252] dark:text-zinc-100"
                            onClick={() => setTermLoaded(true)}
                        >
                            load terminal (s)
                        </button>
                    </div>
                }

            </div>

            <div className="flex place-self-end flex-row gap-3 text-xs text-slate-500 dark:text-zinc-400 p-5 sm:text-sm">

                <div className="">
                    <Popup 
                        hotkey="?" 
                        displayElement="?" 
                        startOpen={firstLoad} 
                    />
                </div>

                <div className="">Tip ID#: {tipId}</div>
                <div id="edit-link">
                    <a href={getEditLink(idLineNumber + 2)} // two down from id comment
                        className="text-stone-500 dark:text-zinc-400 no-underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >edit</a>
                </div>
                <div id="add-link">
                    <a href={getEditLink(5)} // two down from id comment
                        className="text-stone-500 dark:text-zinc-400 no-underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >add</a>
                </div>
                <div id="repo-link">
                    <a href={repoLink} 
                        className="text-stone-500 dark:text-zinc-400 no-underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Vimtips Plus</a>
                </div> 
                <div>by bn-l</div>
            </div>
        </div>
    );
}

