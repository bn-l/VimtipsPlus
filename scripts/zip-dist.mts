import JSZip from "jszip";
import fsp from "node:fs/promises";
import pathe from "pathe";

const distDir = "dist";

let zip = new JSZip();
const files = await fsp.readdir(distDir, { recursive: true });


for (const relativePath of files) {

    const fullPath = pathe.join(distDir, relativePath);
    const stat = await fsp.stat(fullPath);
    if (stat.isDirectory()) continue;

    const data = await fsp.readFile(fullPath);

    zip.file(relativePath, data);
}

const content = await zip.generateAsync({ type: "nodebuffer" });
await fsp.writeFile("dist.zip", content);
