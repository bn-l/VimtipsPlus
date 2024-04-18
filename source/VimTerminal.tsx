 
import { VimWasm } from "vim-wasm";
import vimWorkerPath from "vim-wasm/vim.js?url";
import { useRef, useEffect, useState } from "react";

// const vim = new VimWasm({
//     canvas: document.getElementById("vim-canvas")! as HTMLCanvasElement,
//     input: document.getElementById("vim-input")! as HTMLInputElement,
//     workerScriptPath: vimWorkerPath,
// });

// Todo:
// - Add on paste / cut events (see other impl. + example on main repo)
//    - Info on clipboard here: https://github.com/rhysd/vim.wasm/blob/310836b3824a401d18725f786bc7f3ff6ab678e8/wasm/DEMO_USAGE.md#clipboard-integration
// - Set light and dark theme through command method on instance.
//    - See usage here: https://github.com/rhysd/vim.wasm/tree/310836b3824a401d18725f786bc7f3ff6ab678e8/wasm#set-font


// Light or dark mode mutation observer

const startingTheme = document.documentElement.className.includes("dark") ? "dark" : "light";

console.log("document.documentElement.className:", document.documentElement.className);

console.log("Starting theme:", startingTheme);

function getStartingTheme() {
    return document.documentElement.className.includes("dark") ? "dark" : "light";
}

export interface VimTerminalProps {
    theme: "light" | "dark";
    font: string;
}

export default function VimTerminal(props: VimTerminalProps) {

    const [termVisible, setTermVisible] = useState(false);
    const vimRef = useRef<VimWasm | null>(null);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        document.documentElement.className.includes("dark") ? setTheme("dark") : setTheme("light");
    });

    // Runs when the theme changes. Sets the theme with a command to the
    // vim instance then calls sendKeyDown to force redraw.

    useEffect(() => {
        if(!vimRef.current?.isRunning()) return;

        const cmdLight = `colorscheme PaperColor | set background=light`;
        const cmdDark = `colorscheme onedark | set background=dark`;

        console.log(theme === "light" ? cmdLight : cmdDark);

        void vimRef.current.cmdline(theme === "light" ? cmdLight : cmdDark);
        vimRef.current.sendKeydown("", 18);
    }, [theme]);

    // Looks for a "light" / "dark" class being added to the root element.

    useEffect(() => {
        const onMutated = function(mutationsList: MutationRecord[], observer: MutationObserver) {
            for(const mutation of mutationsList) {
                if(mutation.attributeName === "class") {
                    const classList = (mutation.target as HTMLElement).className.split(/\s+/g);
                    if (classList.includes("light")) setTheme("light");
                    else if (classList.includes("dark")) setTheme("dark");
                }
            }
        };
        const observer = new MutationObserver(onMutated);
        observer.observe(document.documentElement, { attributes: true });

        return () => { observer.disconnect(); };
    }, []);

       
    useEffect(() => {
        if (termVisible && !vimRef.current) { 
            vimRef.current = new VimWasm({
                canvas: document.getElementById("vim-canvas")! as HTMLCanvasElement,
                input: document.getElementById("vim-input")! as HTMLInputElement,
                workerScriptPath: vimWorkerPath,
            });
            vimRef.current.start({
                cmdArgs: [
                    "/persist/hello.js",
                    "-c", theme === "light" ? "set background=light" : "set background=dark",
                    "-c", `colorscheme ${theme === "light" ? "PaperColor" : "onedark"}`,
                    "-c", `set number | set guifont=${props.font} | set tabstop=4 | set shiftwidth=4 | set expandtab | set autoindent | set clipboard=unnamedplus | syntax on | set wildmenu | set wildmode=longest:full,full`,
                ],
                debug: false,
                dirs: ["/persist"],
                persistentDirs: ["/persist"],
                files: {
                    "/persist/hello.js": "function hello() {\n    console.log(\"yoohooo\")\n}",
                },
                fetchFiles: {
                    "/usr/local/share/vim/colors/PaperColor.vim": "/PaperColor.vim" 
                }
            })
            vimRef.current.focus();
        }   
    }, [termVisible]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "s") {
                setTermVisible(true);
            }
        };
    
        window.addEventListener("keypress", handleKeyPress);
    
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, []);

    if (!termVisible) {
        return (
            <button 
                className="rounded-md px-4 py-2 bg-white border-none drop-shadow-md cursor-pointer font-mono lowercase dark:bg-[#525252] dark:text-zinc-100"
                onClick={() => setTermVisible(true)}
            >show terminal (s)</button>
        );
    }

    return (
        <div id="vim-terminal">
            <canvas id="vim-canvas"></canvas>
            <input id="vim-input" autoFocus />
        </div>
    );
}
