import markdownit from "markdown-it";
import fsp from "node:fs/promises";
import hljs from "highlight.js";
import crypto from "node:crypto";

// Note: The first comment in a tip is always the tip id

const BLANK_ID_SENTINEL = "BLANK_ID_SENTINEL";
const BLANK_ID_SENTINEL_REGEX = new RegExp(`<!--\\s*${ BLANK_ID_SENTINEL }\\s* -->`);


const md = markdownit({

    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            }
            catch {
            }
        }
        return "";
    },
});

const tipMd = await fsp.readFile("./source/tips.md", { encoding: "utf8" });
let tipMdSnippets = tipMd.split("/^ {0,3}---(?:-*)* *\n$/gm");

tipMdSnippets = tipMdSnippets.map((snippet: string) => {
    if (snippet.match(BLANK_ID_SENTINEL_REGEX)) {
        const snippetBody = snippet.replace(BLANK_ID_SENTINEL_REGEX, "").trim();

        if (snippetBody.length) {
            const tipId = `<!-- ${ crypto.randomBytes(3).toString("hex") } -->`;
            snippet = snippet.replace(BLANK_ID_SENTINEL_REGEX, tipId);
        }
        return snippet;
    }
    else {
        return snippet;
    }
});

const processedMd = tipMdSnippets.join("---\n");
await fsp.writeFile("./source/tips.md", processedMd, { encoding: "utf8" });

const tipHtml = md.render(tipMd);


const tipMdLines = tipMd.split("\n");

function getTipIdLineNumber(tipId: string): number {
    const tipMdIdRegex = new RegExp(`<!--\\s*${ tipId }\\s* -->`);
    const index = tipMdLines.findIndex(line => line.match(tipMdIdRegex));
    return index + 1;
}

// ------------------ tip html to json ---------------------- //

const tipHtmlIdRegex = new RegExp(/<p>&lt;!--\s*([a-z0-9]+)\s*--&gt;<\/p>/);
const processedTips: Tip[] = [];

// tip html is split by <hr> (horizontal lines / "rules") created with "---".

const tipSnippets = tipHtml.split("<hr>").filter(t => !!t.trim());


for (let tipHtml of tipSnippets) {

    // Get tip id with regex. If it's the sentinel, it's a new tip, so create an id for the tip.

    let tipId = tipHtml.match(tipHtmlIdRegex)?.[1];
    tipHtml = tipHtml.replace(tipHtmlIdRegex, "");

    if (!tipId) throw new Error("Couldn't find tip id. It should be the first comment in a tip.");

    const idLineNumber = getTipIdLineNumber(tipId);

    processedTips.push({ tipId, tipHtml, idLineNumber });
}

await fsp.writeFile("./source/data/tips-generated.json", JSON.stringify(processedTips, null, 4), { encoding: "utf8" });
