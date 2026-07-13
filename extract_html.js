const fs = require('fs');
const readline = require('readline');
const transcriptPath = 'C:/Users/ASUS/.gemini/antigravity-ide/brain/345f2a3e-0ec8-4787-812a-5fdc2f07f2d4/.system_generated/logs/transcript_full.jsonl';

const rl = readline.createInterface({
    input: fs.createReadStream(transcriptPath),
    crlfDelay: Infinity
});

let maxHtml = '';
let bestLine = -1;
let lineIndex = 0;

rl.on('line', (line) => {
    lineIndex++;
    try {
        const obj = JSON.parse(line);
        let contentStr = '';
        if (obj.content) contentStr += obj.content;
        if (obj.output) contentStr += obj.output;
        if (obj.tool_calls) contentStr += JSON.stringify(obj.tool_calls);
        
        const start = contentStr.indexOf('<!DOCTYPE html>');
        if (start !== -1) {
            const end = contentStr.lastIndexOf('</html>');
            if (end !== -1 && end > start) {
                let html = contentStr.substring(start, end + 7);
                // Unescape JSON specific escaping
                html = html.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\t/g, '\t');
                
                if (html.length > maxHtml.length) {
                    maxHtml = html;
                    bestLine = lineIndex;
                }
            }
        }
    } catch (e) {}
});

rl.on('close', () => {
    if (maxHtml) {
        fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', maxHtml);
        console.log('Restored lucenva.html from line ' + bestLine + '. Size: ' + maxHtml.length);
    } else {
        console.log('No HTML found in any line.');
    }
});
