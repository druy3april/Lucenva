const fs = require("fs");
let lines = fs.readFileSync("style.css", "utf8").split("\n");

// Remove the mistakenly added block at lines 30-57
lines.splice(29, 28); // index 29 is line 30, remove 28 lines

// Now find the real .sp-main-img-box
let targetIdx = lines.findIndex(l => l.includes(".sp-main-img-box {") && lines.indexOf(l) > 100);
if (targetIdx !== -1) {
    let newContent = `    .sp-main-img-box {
        background: #fff;
        border: 1px solid #eee;
        border-radius: 8px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px auto;
        padding: 0;
        aspect-ratio: 1 / 1;
        width: 90%;
    }

    .sp-main-img-box.full-frame {
        padding: 0;
        aspect-ratio: auto;
    }

    .sp-main-img-box img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        mix-blend-mode: normal;
    }`;
    
    // Find the end of this block, which is the start of .sp-zoom-btn
    let endIdx = lines.findIndex((l, i) => i > targetIdx && l.includes(".sp-zoom-btn {"));
    if (endIdx !== -1) {
        lines.splice(targetIdx, endIdx - targetIdx - 1, ...newContent.split("\n"));
        fs.writeFileSync("style.css", lines.join("\n"));
        console.log("Replaced successfully!");
    } else {
        console.log("Could not find end of block");
    }
} else {
    console.log("Could not find real .sp-main-img-box");
}
