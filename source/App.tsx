import "./css/App.css";
import TipBody from "./TipBody.tsx";
import tips from "./data/tips-generated.json";
import Logo from "./Logo.tsx";
import VimTerminal from "./VimTerminal.tsx";
import ByLine from "./ByLine.tsx";

import { presetUno } from "unocss";
import { useState, useEffect } from "react";


const repoLink = "https://github.com/bn-l/vimtips-plus";
const getEditLink = (idLineNumber: number) => `https://github.com/bn-l/vimtips-plus/edit/main/source/tips.md?plain=1#L${ idLineNumber }`;


function App() {

    const [tipIndex, setTipIndex] = useState(Math.floor(Math.random() * tips.length));
    const [popupVisible, setPopupVisible] = useState(false);
    const [termVisible, setTermVisible] = useState(false);

    const { tipId, tipHtml, idLineNumber } = tips[tipIndex];
    
    useEffect(() => {
        document.title = `New Tab - VimTips Plus- Tip #${ tips[tipIndex].tipId }`;
    }, [tipIndex]);

    return (
        <div id="app">
            <div>
                <Logo />
            </div>

            <TipBody 
                tipHtml={tipHtml}
            />

            <VimTerminal 
                termVisible={termVisible} 
                setTermVisible={setTermVisible}
            />

            <ByLine
                tipId={tipId}
                editLink={getEditLink(idLineNumber)}
                repoLink={repoLink}
            />
        </div>
    );
}

export default App;
