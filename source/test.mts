
const x = `\


<!-- BLANK_ID_SENTINEL_DO_NOT_EDIT_THIS_LINE -->

something

<!-- BLANK_ID_SENTINEL_DO_NOT_EDIT_THIS_LINE -->

 
---
`;

const y = new RegExp(/^ *<!--\s*([A-z0-9]+)\s* -->[.\s]*?$/gm);
// const y = new RegExp(/BLANK_ID_(SENTINEL)_DO_NOT_EDIT_THIS_LINE/);

const res = Array.from(x.matchAll(y));

console.log(res);
