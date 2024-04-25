import VimWasmComponent from "./VimTerminal.tsx";

import React from "react";
import ReactDOM from "react-dom/client";
import "./vim.css";

console.log('document.getElementById("vimRoot")', document.getElementById("vimRoot"));

console.log(document);

ReactDOM.createRoot(document.getElementById("vim-root")!).render(
    <React.StrictMode>
        <VimWasmComponent />
    </React.StrictMode>
);
