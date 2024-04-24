import { VimWasm } from "./vendor/vimwasm.js";
import vimWorkerPath from "./vendor/vim.js?url";
import { useRef, useEffect, useState } from "react";

const cancelEvent = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
}



/**
 * Listens for messages passed to it containing a type property equal to "vimWasm"
 */
export default function VimWasmComponent() {

    const vimRef = useRef<VimWasm | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);

    const [loaded, setLoaded] = useState(false);
    const [font, setFont] = useState("Courier\\ new:h16");
    const [theme, setTheme] = useState<"light" | "dark">("light");


    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type !== "vimWasm") return;
            
            const { loaded, font, theme } = event.data.state;
            setLoaded(loaded);
            setFont(font);
            setTheme(theme);
        };
        window.addEventListener("message", handleMessage);
        return () => {
          window.removeEventListener("message", handleMessage);
        };
    }, []);


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
            workerScriptPath: vimWorkerPath,
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
                "-c", `set number | set guifont=${font} | set tabstop=4 | set shiftwidth=4 | set expandtab | set autoindent | syntax on | set wildmenu | set wildmode=longest:full,full`,
            ],
            debug: false,
            dirs: ["/persist"],
            persistentDirs: ["/persist"],
            // files: {
            //     "/persist/hello.js": startingFile,
            // },
            fetchFiles: {
                "/persist/white.txt": "/white.txt",
                "/usr/local/share/vim/colors/PaperColor.vim": "/PaperColor.vim",
            },

        });

        vimRef.current.onVimExit = () => {
            vimRef.current = null;
        };

        vimRef.current.focus();

    }, [vimWorkerPath, font, theme, loaded, vimRef, canvasRef, inputRef, divRef]);

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

    // <button 
    // className="rounded-md px-4 py-2 bg-white border-none drop-shadow-md cursor-pointer font-mono lowercase dark:bg-[#525252] dark:text-zinc-100"
    // onClick={() => setTermLoaded(true)}
    // >load terminal (s)</button>

    return (
        <div id="vim-terminal"  ref={divRef}>
            <input id="vim-input" ref={inputRef} />
            <canvas id="vim-canvas" ref={canvasRef} />
        </div>
    );
}