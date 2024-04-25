import App from "./App.tsx";

import React from "react";
import ReactDOM from "react-dom/client";
import "./css/style.css";
import "virtual:uno.css";
import worker from "./background.ts?worker"; 
 
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
