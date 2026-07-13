const fs = require('fs');

// 1. mobile-fix.css: Fix image size (max-width: 100px -> 100%)
const mobileFixCssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css';
let mobileFixContent = fs.readFileSync(mobileFixCssFile, 'utf8');

mobileFixContent = mobileFixContent.replace(
    /max-width: 100px !important;\s*max-height: 100px !important;/g,
    'max-width: 100% !important;\n    max-height: 450px !important;'
);
fs.writeFileSync(mobileFixCssFile, mobileFixContent);


// 2. style.css: Fix back-to-top position
const styleCssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css';
let styleCssContent = fs.readFileSync(styleCssFile, 'utf8');

// The block has `right: 20px;` for `.back-to-top`
styleCssContent = styleCssContent.replace(
    /\.back-to-top \{\s*position: fixed;\s*bottom: 80px;\s*right: 20px;/g,
    '.back-to-top {\n    position: fixed;\n    bottom: 80px;\n    left: 20px;\n    right: auto;'
);
fs.writeFileSync(styleCssFile, styleCssContent);


// 3. lucenva.html: Update the FORCE OVERRIDE style block to guarantee the changes apply immediately!
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

const oldStyleRegex = /<style>[\s\S]*?@media \(max-width: 900px\) \{[\s\S]*?#cart-drawer[\s\S]*?\}[\s\S]*?<\/style>/;
const newStyle = `<style>
@media (max-width: 900px) {
    #cart-drawer, #wishlist-drawer, .cart-drawer, .wishlist-drawer {
        width: 85% !important;
        max-width: 400px !important;
    }
    .sp-main-img-box img {
        max-width: 100% !important;
        max-height: 450px !important;
        width: 100% !important;
    }
}
.back-to-top {
    left: 20px !important;
    right: auto !important;
}
</style>`;

if (htmlContent.includes('<style>') && oldStyleRegex.test(htmlContent)) {
    htmlContent = htmlContent.replace(oldStyleRegex, newStyle);
} else {
    // If not found, append it inside the FORCE OVERRIDE block
    htmlContent = htmlContent.replace('<!-- FORCE OVERRIDE TO BYPASS CACHE -->', '<!-- FORCE OVERRIDE TO BYPASS CACHE -->\n' + newStyle);
}
fs.writeFileSync(htmlFile, htmlContent);

console.log('Fixed image size and back-to-top position');
