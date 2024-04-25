import fsp from "node:fs/promises";


const manifestPath = "./public/manifest.json";
const json = await fsp.readFile(manifestPath, { encoding: "utf8" });
const manifest = JSON.parse(json);

let [major, minor, patch] = manifest.version.split(".");
patch = Number(patch) + 1;

manifest.version = `${ major }.${ minor }.${ patch }`;

const newJson = JSON.stringify(manifest, null, 2);
await fsp.writeFile(manifestPath, newJson);
