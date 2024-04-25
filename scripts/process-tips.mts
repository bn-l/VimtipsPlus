import markdownit from "markdown-it";
import fsp from "node:fs/promises";
import hljs from "highlight.js";
import crypto from "node:crypto";

// Note: The first comment in a tip is always the tip id

const BLANK_ID_SENTINEL = "INSERT_TIP_BELOW_DO_NOT_EDIT_THIS_LINE";
const tipIdLineRegex = new RegExp(/^ *<!--\s*([A-z0-9]+)\s* -->[.\s]*?$/gm);
const tipDividerRegex = new RegExp(/^ {0,3}---(?:-*)*\s*?$/gm); 

const blankSnippet = `\n\n<!-- ${ BLANK_ID_SENTINEL } -->\n\n\n\n\n`;


const md = markdownit({
    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            }
            catch { }
        }
        return "";
    },
});

const tipMd = await fsp.readFile("./source/tips.md", { encoding: "utf8" });

const tipMdLines = tipMd.split("\n");

function getTipIdLineNumber(tipId: string): number {
    const tipMdIdRegex = new RegExp(`<!--\\s*${ tipId }\\s* -->`);
    const index = tipMdLines.findIndex(line => line.match(tipMdIdRegex));
    return index + 1;
}

const tipMdSnippets = tipMd.split(tipDividerRegex).filter(t => !!t.trim());
const destructuredTips: Tip[] = [];
const processedMdSnippets: string[] = [];


for (let [index, snippet] of tipMdSnippets.entries()) {

    let tipId = [...snippet.matchAll(tipIdLineRegex)][0][1];
    const tipBody = snippet.replace(tipIdLineRegex, "");

    if (!tipId) {
        throw new Error("Couldn't find tip id.");
    }
    else if (tipId?.includes(BLANK_ID_SENTINEL)) {

        if (tipBody.trim().length) {    
            tipId = crypto.randomBytes(3).toString("hex");
            snippet = snippet.replace(BLANK_ID_SENTINEL, tipId);
        }
        else {
            continue;
        }
    }
    processedMdSnippets.push(snippet);
    
    const idLineNumber = getTipIdLineNumber(tipId);
    const tipHtml = md.render(tipBody);
    destructuredTips.push({ tipId, tipHtml, idLineNumber });
}

if (!processedMdSnippets[0].includes(BLANK_ID_SENTINEL)) {
    processedMdSnippets.unshift(blankSnippet);
}
if (!processedMdSnippets[processedMdSnippets.length - 1].includes(BLANK_ID_SENTINEL)) {
    processedMdSnippets.push(blankSnippet);
}

const processedMd = processedMdSnippets.join("---") + "---";
await fsp.writeFile("./source/tips.md", processedMd, { encoding: "utf8" });


await fsp.writeFile("./source/data/tips-generated.json", JSON.stringify(destructuredTips, null, 4), { encoding: "utf8" });
