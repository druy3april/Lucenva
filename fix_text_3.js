const fs = require('fs');

const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
htmlContent = htmlContent.replace(/class="cat-name"/g, 'class="cat-name" style="text-align: center !important; width: 100% !important; display: block !important;"');
htmlContent = htmlContent.replace(/class="cat-sub"/g, 'class="cat-sub" style="text-align: center !important; width: 100% !important; display: block !important;"');
fs.writeFileSync(htmlFile, htmlContent);

const scriptFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js';
let scriptContent = fs.readFileSync(scriptFile, 'utf8');
scriptContent = scriptContent.replace(/class="gift-name"/g, 'class="gift-name" style="text-align: center !important; width: 100% !important; display: block !important; font-weight: 700 !important;"');
scriptContent = scriptContent.replace(/class="gift-desc"/g, 'class="gift-desc" style="text-align: center !important; width: 100% !important; display: block !important;"');
fs.writeFileSync(scriptFile, scriptContent);

console.log('Injected inline styles directly into HTML and JS.');
