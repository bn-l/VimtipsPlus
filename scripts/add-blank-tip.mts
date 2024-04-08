
import crypto from "node:crypto";
import fs from "node:fs";


const markdownFile = "./scripts/tips.md";
const tipId = crypto.randomBytes(3).toString("hex");


const tip = `\


<!-- tipId: ${ tipId } -->




---
`;


fs.appendFileSync(markdownFile, tip, { encoding: "utf8" });
