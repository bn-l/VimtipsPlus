
import terminalSrc from "./terminal.html?url";
import { useRef, useState, useEffect } from "react";

// vimMain mounts VimWasm.tsx in terminal.html
//   (can add back the divs to Terminal's render method)
// This component communicates with VimWasm through post message

// The iframe is rendered here making calling the term from another component very clean.

// Remove the button from VimWasm (the caller of this component can create a button 
//  and listen for the "s" keystroke. (i.e. add loadedStateManager prop)

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
}

export default function VimTerminal({
    theme = "light",
    font = "Courier\\ new:h16",
    loaded = false
}) {
    
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const sendState = () => {
        if(!iframeRef.current) return;
        iframeRef.current.contentWindow?.postMessage({ 
            type: "vimWasm", 
            state: { loaded, font, theme } 
        },"*");
    }
    
    // Load initial state
    useEffect(() => {
        iframeRef.current?.addEventListener("load", sendState);

        return () => {
            iframeRef.current?.removeEventListener("load", sendState);
        };
    }, [iframeRef.current]);

    // Sync state
    useEffect(() => {
        sendState();
    }, [theme, font, loaded]);
        

    return (
        <iframe 
            id="vim-iframe"
            className="p-0 m-0 border-none"
            src={terminalSrc} ref={iframeRef} 
            style={{
                display: loaded ? "block" : "none"
            }} 
        />
    );
}