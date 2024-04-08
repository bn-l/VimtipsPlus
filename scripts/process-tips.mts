import markdownit from "markdown-it";
import fsp from "node:fs/promises";
import hljs from "highlight.js";
import cheerio from "cheerio";

// Note: The first comment in a tip is always the tip id

// Add to index
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">


const md = markdownit({

    html: true,
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

const tipFile = await fsp.readFile("./source/tips.md", { encoding: "utf8" });
const tipMds = tipFile.split("---").filter(t => !!t.trim());

export interface Tip {
    tipId: string;
    tipHtml: string;
}

const processedTips: Tip[] = [];

for (const tipMd of tipMds) {
    const html = md.render(tipMd);
    const $ = cheerio.load(html);
    const tipId = $.root()?.[0]?.children?.[0]?.data?.trim() as string;
    if (!tipId) throw new Error("Couldn't find tip id. It should be the first comment in a tip.");
    
    processedTips.push({ tipId, html });
}

await fsp.writeFile("./source/tips.json", JSON.stringify(processedTips, null, 4), { encoding: "utf8" });
