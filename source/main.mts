import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import {setupCounter} from './counter.mts' 

// See: 
// https://vitejs.dev/guide/features.html#webassembly
// for wasm importing.

// See: https://vitejs.dev/guide/static-deploy.html#netlify-with-git
// for Netlify deployment.

// need these headers
// { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" },
// { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
