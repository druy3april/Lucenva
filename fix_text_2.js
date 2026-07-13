const fs = require('fs');
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

// Fix .cat-name alignment and wrapping
htmlContent = htmlContent.replace(/white-space:\s*nowrap;/g, 'white-space: normal;');
htmlContent = htmlContent.replace(/text-align:\s*center;/g, 'text-align: center !important;');

// Bump cache
const ts = Date.now();
htmlContent = htmlContent.replace(/href="style\.css(\?v=\d+)?"/g, 'href="style.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);
console.log('Fixed lucenva.html');

const styleFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css';
let styleContent = fs.readFileSync(styleFile, 'utf8');

const additionalRules = `
/* Force centering and balancing for all titles on PC and Mobile */
.cat-name, .cat-sub, .gift-name, .gift-desc {
    text-align: center !important;
    text-wrap: balance !important;
    white-space: normal !important;
}
`;
styleContent += '\n' + additionalRules;
fs.writeFileSync(styleFile, styleContent);
console.log('Fixed style.css');
