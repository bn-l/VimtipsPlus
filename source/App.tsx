// import "./css/App.css";
import TipBody from "./TipBody.tsx";
import tips from "./data/tips-generated.json";
import VimTerminal from "./VimTerminal.tsx";
import logo from "./images/logo128.webp";

import { Switch } from "@mui/base/Switch";
import { useState, useEffect } from "react";
import { DarkModeSwitch } from "clean-components";


const repoLink = "https://github.com/bn-l/vimtips-plus";
const getEditLink = (idLineNumber: number) => `https://github.com/bn-l/vimtips-plus/edit/main/source/tips.md?plain=1#L${ idLineNumber }`;


export default function App() {

    const [tipIndex, setTipIndex] = useState(Math.floor(Math.random() * tips.length));
    const [popupVisible, setPopupVisible] = useState(false);
    const [termVisible, setTermVisible] = useState(false);

    const { tipId, tipHtml, idLineNumber } = tips[tipIndex];
    
    useEffect(() => {
        document.title = `New Tab - VimTips Plus- Tip #${ tips[tipIndex].tipId }`;
    }, [tipIndex]);


    const lightBg = "#FAFAFA"
    const darkBg = "#3C3C3C"

    return (
        <div id="app" className="flex-exp-col h-screen dark:bg-[#3C3C3C] bg-[#FAFAFA]">

            <div className="flex-exp-row">
                <div className="p-5 brightness-100 contrast-100 grayscale-80">
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
                        sizeMultiple={0.8}
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col self-center flex-center p-5 sm:w-50%">

                <div className="text-xl text-slate-900 dark:text-zinc-100">
                    <TipBody 
                        tipHtml={tipHtml}
                    />
                </div>
                <div className="pb-20 pt-2">
                    <VimTerminal 
                        termVisible={termVisible} 
                        setTermVisible={setTermVisible}
                    />
                </div>
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

