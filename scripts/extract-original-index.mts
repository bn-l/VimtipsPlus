import cheerio from "cheerio";
import fs from "node:fs";
import TurndownService from "turndown";
import wrapAnsi from "wrap-ansi";
import crypto from "node:crypto";
import indent from "indent-string";


const turndownService = new TurndownService();
const html = fs.readFileSync("./index.html");

const $ = cheerio.load(html);

const tipEls = $(".cbp-qtcontent");


console.log(tipEls.length);

const tipMds = [];

for (const tipEl of tipEls) {
    const tipHtml = $(tipEl).html();
    const tipMd = turndownService.turndown(tipHtml ?? "<div> TIP NOT FOUND </div>");
    tipMds.push(tipMd);    
}

const markdownFile = "./scripts/tips.md";

// ! wrap after converting

for (let tip of tipMds) {

    const tipId = crypto.randomBytes(3).toString("hex");

    tip = `\


        <!-- tipId: ${ tipId } -->

        ${ tip }


        ---
    `;
    
    tip = wrapAnsi(tip, 80);

    fs.appendFileSync(markdownFile, tip, { encoding: "utf8" });
}
