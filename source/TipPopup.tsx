
import { useState, useEffect } from "react";


const Popup = ({ tipId, shortcuts }: { tipId: string; shortcuts: Shortcut[]; displayChar: string }) => {
    return (
        <div id="popup">

            <div id="popup-tip-id">Tip ID: {tipId}</div>

            <table id="shortcuts-table">
                <thead>
                    <tr>
                        <th></th>
                        <th id="shortcuts-header">shortcuts</th>
                    </tr>
                </thead>
                <tbody>
                    {shortcuts.map((shortcut, index) => (
                        <tr key={index}>
                            <td>{shortcut.name}</td>
                            <td>{shortcut.shortcut}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default function TipPopup({ tipId, shortcuts, displayChar, popupVisible, setPopupVisible }: { tipId: string; shortcuts: Shortcut[]; displayChar: string; popupVisible: boolean; setPopupVisible: (show: boolean) => void }) {    

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === displayChar) {
                setPopupVisible(!popupVisible);
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);

    }, [popupVisible]);

    return (
        <div id="tip-popup">
            {popupVisible && 
                <Popup 
                    tipId={tipId} 
                    shortcuts={shortcuts} 
                    displayChar={displayChar} 
                />
            }
            <div id="popup-toggle" onClick={() => setPopupVisible(!popupVisible)}>
                {displayChar}
            </div>
        </div>
    );
}
