const fs = require("fs");
const lines = fs.readFileSync("lucenva.html", "utf-8").split("\n");
let divCount = 0;
let inHome = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("id=\"page-home\"")) { inHome = true; divCount = 1; continue; }
  if (lines[i].includes("id=\"page-about-brand\"")) break;
  if (!inHome) continue;
  
  const openCount = (lines[i].match(/<div\b[^>]*>/g) || []).length;
  const closeCount = (lines[i].match(/<\/div>/g) || []).length;
  divCount += openCount - closeCount;
  
  if (divCount === 0) {
    console.log("page-home closed at line " + (i + 1));
    console.log("Line content: " + lines[i]);
    break;
  }
}
