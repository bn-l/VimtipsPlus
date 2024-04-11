 
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
            <button onClick={() => setTermVisible(true)}>Show Terminal</button>
        );
    }

    return (
        <div id="vim-terminal">
            <canvas id="vim-canvas"></canvas>
            <input id="vim-input" />
        </div>
    );
}
