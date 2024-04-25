import JSZip from "jszip";
import fsp from "node:fs/promises";
import pathe from "pathe";


let zip = new JSZip();
const dircontents = await fsp.readdir("dist", { recursive: true, withFileTypes: true });


for (const ent of dircontents) {

    if (ent.isDirectory()) continue;

    const relativePath = pathe.join(ent.path, ent.name);

    const data = await fsp.readFile(pathe.join(ent.path, ent.name));

    const savePath = relativePath.replace("dist/", "");

    zip.file(savePath, data);
}

const content = await zip.generateAsync({ type: "nodebuffer" });
await fsp.writeFile("dist.zip", content);
