import { VimWasm } from "vim-wasm";
import "./css/VimTerminal.css";
import vimrc from "./vimrc.mjs";

import { useRef, useEffect } from "react";

const cancelEvent = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
}


export interface VimTerminalProps {
    theme?: "light" | "dark";
    /**
     * Console font as a vim string. (see default for example). Can be any font the 
     * browser can load.
     * @default "Courier\\ new:h16"
     */
    font?: string;
    /**
     * Whether the vim terminal is loaded
     */
    loaded: boolean;
    /**
     * Allows it to close itself on :q
     */
    setLoaded?: (loaded: boolean) => void;
}

/**
 * Listens for messages passed to it containing a type property equal to "vimWasm"
 */
export default function VimWasmComponent({
    theme = "light",
    font = "Courier\\ new:h16",
    loaded = false,
    setLoaded = () => {},
}: VimTerminalProps) {

    const vimRef = useRef<VimWasm | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!vimRef.current?.isRunning()) return;

        const cmdLight = `colorscheme PaperColor | set background=light | redraw`;
        const cmdDark = `colorscheme onedark | set background=dark | redraw`;

        console.log(theme === "light" ? cmdLight : cmdDark);

        void vimRef.current.cmdline(theme === "light" ? cmdLight : cmdDark);
        // vimRef.current.sendKeydown("", 18);
    }, [theme, vimRef]);

    // Term loaded
    useEffect(() => {

        if (!loaded || vimRef.current) return;

        // Create vim instance
        vimRef.current = new VimWasm({
            canvas: canvasRef.current!,
            input: inputRef.current!,
            workerScriptPath: "/vim.js",
        });

        divRef.current!.addEventListener(
            'dragover',
            e => {
                cancelEvent(e);
                if (e.dataTransfer) {
                    e.dataTransfer.dropEffect = 'copy';
                }
            },
            false,
        );
        
        divRef.current!.addEventListener(
            "drop",
            e => {
                cancelEvent(e);
                if (e.dataTransfer) {
                    vimRef.current!.dropFiles(e.dataTransfer.files).catch(console.error);
                }
            },
            false,
        );

        vimRef.current.onFileExport = (fullpath, contents) => {
            const slashIdx = fullpath.lastIndexOf('/');
            const filename = slashIdx !== -1 ? fullpath.slice(slashIdx + 1) : fullpath;
            const blob = new Blob([contents], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.rel = 'noopener';
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        vimRef.current.onError = console.error;

        vimRef.current.start({
            cmdArgs: [
                "/persist/white.txt",
                "-c", theme === "light" ? "set background=light" : "set background=dark",
                "-c", `colorscheme ${theme === "light" ? "PaperColor" : "onedark"}`,
                "-c", `set guifont=${font}`,
                // Rest set in vimrc
            ],
            debug: false,
            dirs: ["/persist"],
            persistentDirs: ["/persist"],
            files: {
                "/home/web_user/.vim/vimrc": vimrc,
            },
            fetchFiles: {
                "/persist/white.txt": "/white.txt",
                "/usr/local/share/vim/colors/PaperColor.vim": "/PaperColor.vim",
                // "/.vim/vimrc": "/vimrc",
            },

        });

        vimRef.current.onVimExit = () => {
            vimRef.current = null;
            setLoaded(false);
        };

        vimRef.current.focus();

    }, [font, theme, loaded, vimRef, canvasRef, inputRef, divRef]);

    useEffect(() => {
        // To save the result of :w calls to indexdb, need to :q
        //  this calls a quit before the tab is closed to sort of auto sync.
        // Disabled as it causes an on quit call when refreshing
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // if (vimRef.current?.isRunning()) {
            //     void vimRef.current.cmdline("qall!");
            // }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <div id="vim-terminal"  ref={divRef}>
            <input id="vim-input" ref={inputRef} />
            <canvas id="vim-canvas" ref={canvasRef} />
        </div>
    );
}