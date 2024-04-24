import VimWasmComponent from "./VimWasmComponent.tsx";

import React from "react";
import ReactDOM from "react-dom/client";
import "./vim.css";
import "virtual:uno.css";
 
ReactDOM.createRoot(document.getElementById("vimRoot")!).render(
    <React.StrictMode>
        <VimWasmComponent />
    </React.StrictMode>
);
