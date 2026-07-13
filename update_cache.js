const fs = require('fs');
const file = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let content = fs.readFileSync(file, 'utf8');
const ts = Date.now();
content = content.replace(/href="style\.css(\?v=\d+)?"/g, 'href="style.css?v=' + ts + '"');
content = content.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');
fs.writeFileSync(file, content);
console.log('Updated cache busters');
