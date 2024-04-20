
import { useState, useEffect } from "react";




const hints = [
    <span>Click outside the terminal to defocus it. <span className="font-medium">When the terminal has focus it will capture all key strokes</span></span>,
    <span>Type <code>:export</code> to download the current file</span>,
    <span>Drag and drop a file on the terminal to edit it</span>,
    <span><code>:e tutor</code> to run the vim tutor</span>,

]

const HintList = () => (
    <div id="hints" className="">
        <h3 className="p-0 m-0">Hints</h3>
        <ul id="help-list" className="pl-2 pt-0 my-2 list-none">
            {hints.map((hint, index) => (
                <li className="py-1" key={index}>
                    {hint}
                </li>
            ))}
        </ul>
    </div>
);

const shortcuts = [
    { text: <span className="font-medium">Toggle this help</span>, shortcut: "?" },
    { text: "Load Vim Terminal", "shortcut": "s" },
    { text: "Random tip", shortcut: "+"},
    { text: "Next tip", shortcut: "]" },
    { text: "Previous tip", shortcut: "[" },
];

const ShortcutTable = () => (
    <div className="pt-2" id="shortcuts">
        <h3 className="p-0 m-0">
            Shortcuts
        </h3>
        <div className="text-sm py-1">(when terminal is unfocussed)</div>
        <table id="shortcuts-table" className="pt-2 pl-2 m-0">
            {/* <thead>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
            </thead> */}
            <tbody>
                {shortcuts.map((shortcut, index) => (
                    <tr key={index}>
                        <td className="pr-8 py-1">{shortcut.text}</td>
                        <td><code>{shortcut.shortcut}</code></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);



export function PopupBody({closer}: {closer: () => void}) {
    return (
        <div 
            id="popup-body" 
            aria-modal="true" 
            role="dialog" 
            className="fixed top-0 left-0 max-h-[75vh] max-w-[50ch] overflow-y-auto p-5 m-5 bg-light dark:bg-dark shadow-slate-300 dark:shadow-slate-800 shadow-sm text-slate-600 dark:text-gray-300"
        >
            <button 
                onClick={closer} 
                className="float-right text-sm outline-none bg-inherit border-none text-inherit font-sans cursor-pointer"
                aria-label="Close popup"
            >
                x
            </button>
            <HintList />            
            <ShortcutTable />
        </div>
    );
}

export interface PopupOptions {
    displayElement: JSX.Element | string;
    hotkey: string;
    startOpen?: boolean;
}

export default function Popup(
    { hotkey, displayElement, startOpen }: PopupOptions
) {    

    const [popupVisible, setPopupVisible] = useState(!!startOpen);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === hotkey) setPopupVisible(!popupVisible);
        };
        document.addEventListener("keypress", handleKeyDown);

        return () => document.removeEventListener("keypress", handleKeyDown);
    }, [popupVisible]);


    return (
        <div id="popup">
            {(popupVisible) && <PopupBody closer={() => setPopupVisible(false)} />}
            <div 
                id="popup-toggle" 
                className="cursor-pointer"
                onClick={() => setPopupVisible(!popupVisible)}
                aria-label={`Shows help popup. Press the ${hotkey} key to toggle`}
            >
                {displayElement}
            </div>
        </div>
    );
}
