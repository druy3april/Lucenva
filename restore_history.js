const fs = require('fs');
let raw = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva_from_history.html', 'utf8');

let unescaped = raw.replace(/\\n/g, '\n').replace(/\\"/g, '"');

const lines = unescaped.split('\n');
const finalLines = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const match = line.match(/^(\d+): (.*)$/);
    if (match) {
        finalLines.push(match[2]);
    } else {
        if(line.includes('<!DOCTYPE html>')) {
             finalLines.push('<!DOCTYPE html>');
        } else if(line.trim().length > 0 && !line.includes('The above content shows')) {
             finalLines.push(line);
        }
    }
}

fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva_perfect_restore.html', finalLines.join('\n'));
console.log('Restored. Total lines: ' + finalLines.length);
