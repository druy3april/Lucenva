const fs = require('fs');

// 1. Fix iOS click bug and padding in CSS
const mobileFixFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css';
let mobileFixContent = fs.readFileSync(mobileFixFile, 'utf8');

const iosFix = `
/* Fix iOS click on overlay */
.cart-overlay, .wishlist-overlay {
    cursor: pointer !important;
}

/* Fix product image too small on mobile */
.cat-grid-4 .cat-img-box img,
.gift-img img,
.cat-img-box img {
    padding: 10px !important;
}

/* Fix close button size for easier tapping on mobile */
.cart-drawer-close, .wishlist-drawer-close {
    width: 44px !important;
    height: 44px !important;
    font-size: 24px !important;
}
`;

mobileFixContent += '\n' + iosFix;
fs.writeFileSync(mobileFixFile, mobileFixContent);

// Bump cache for mobile-fix.css
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Fixed iOS click and image size on mobile');
