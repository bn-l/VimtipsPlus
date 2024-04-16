 
import { VimWasm } from "vim-wasm";
import vimWorkerPath from "vim-wasm/vim.js?url";
import { useRef, useEffect, useState } from "react";


export default function VimTerminal({ termVisible, setTermVisible }: { termVisible: boolean; setTermVisible: (show: boolean) => void }) {
    
    const vimRef = useRef<VimWasm | null>(null);
       
    useEffect(() => {
        if (termVisible && !vimRef.current) { 
            vimRef.current = new VimWasm({
                canvas: document.getElementById("vim-canvas")! as HTMLCanvasElement,
                input: document.getElementById("vim-input")! as HTMLInputElement,
                workerScriptPath: vimWorkerPath,
            });
        }   
    }, [termVisible]);

    if (!termVisible) {
        return (
            <button 
                className="rounded-md px-4 py-2 bg-white border-none drop-shadow-md cursor-pointer font-mono lowercase dark:bg-[#525252] dark:text-zinc-100"
                onClick={() => setTermVisible(true)}
            >show terminal</button>
        );
    }

    return (
        <div id="vim-terminal">
            <canvas id="vim-canvas"></canvas>
            <input id="vim-input" />
        </div>
    );
}
