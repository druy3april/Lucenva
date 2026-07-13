const fs = require('fs');

const cssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

const buttonFix = `
/* Make product buttons always visible on mobile */
.gift-act {
    opacity: 1 !important;
    transform: translateY(0) !important;
    position: relative !important;
    padding: 10px !important;
    background: transparent !important;
    margin-top: 10px !important;
}

.gift-act button {
    width: 100% !important;
    padding: 10px !important;
    font-size: 13px !important;
    border-radius: 8px !important;
    background: #1a1a1a !important;
    color: #fff !important;
    border: none !important;
    font-weight: bold !important;
}
`;

cssContent += '\n' + buttonFix;
fs.writeFileSync(cssFile, cssContent);

// Bump cache
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Fixed mobile button visibility');
