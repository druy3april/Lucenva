const fs = require('fs');
const cssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

// Find all the garbage I appended and remove it, then append it properly inside a media query!
// The appended text includes:
/* Make product buttons always visible on mobile */
// down to the end of the file.

const marker1 = '/* Make product buttons always visible on mobile */';
const idx = cssContent.indexOf(marker1);

if (idx !== -1) {
    cssContent = cssContent.substring(0, idx);
    
    // Now append the correct mobile-only CSS
    const fixedCss = `
/* Make product buttons always visible on mobile ONLY */
@media (max-width: 900px) {
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
        text-transform: uppercase !important;
    }
}
`;
    cssContent += '\n' + fixedCss;
    fs.writeFileSync(cssFile, cssContent);
}

// Bump cache
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Fixed mobile-fix.css media query leakage');
