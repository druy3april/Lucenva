const fs = require('fs');

const mobileFixFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css';
let mobileFixContent = fs.readFileSync(mobileFixFile, 'utf8');

const zIndexFix = `
/* Fix z-index for cart and wishlist so they cover main-header */
.cart-overlay, .wishlist-overlay {
    z-index: 20000 !important;
}
.cart-drawer, .wishlist-drawer {
    z-index: 20010 !important;
}
`;

mobileFixContent += '\n' + zIndexFix;
fs.writeFileSync(mobileFixFile, mobileFixContent);

// Bump cache for mobile-fix.css
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Fixed drawer z-index');
