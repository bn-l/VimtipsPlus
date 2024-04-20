
import { defineConfig, presetMini, presetWind, } from 'unocss'
import fs from "fs";
import colorTheme from "./source/colorTheme.json";

export default defineConfig({
    rules: [
        ["flex-center", {"align-items": "center", "justify-content": "center",}],

        ["flex-exp-col", {"justify-content": "space-between", "flex-direction": "column", "display": "flex", }],

        ["flex-exp-row", {"justify-content": "space-between", "flex-direction": "row", "display": "flex", "align-items": "center"}],
    ],
    theme: colorTheme
})