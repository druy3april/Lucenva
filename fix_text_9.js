const fs = require('fs');

// 1. Undo bottom nav change
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

// Remove the Quà tặng from mobile bottom nav
const giftNavRegex = /<div class="mbn-item" id="mbn-gift" onclick="navigate\('products', 'loai-qua-tang'\)">[\s\S]*?<\/div>/;
htmlContent = htmlContent.replace(giftNavRegex, '');

// 2. Make "Quà tặng & Phụ kiện" visible in the sidebar categories ("tách đúng trên các mục")
htmlContent = htmlContent.replace(
    /<label style="display:none; margin-bottom:12px; cursor:pointer;"><input type="checkbox" value="loai-qua-tang" onchange="filterProducts\(\)"> Quà tặng & Phụ kiện<\/label>/,
    '<label style="display:block; margin-bottom:12px; cursor:pointer;"><input type="checkbox" value="loai-qua-tang" onchange="filterProducts()"> Quà tặng & Phụ kiện</label>'
);

fs.writeFileSync(htmlFile, htmlContent);

// 3. Move the button BELOW the product image in script.js
const scriptFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js';
let scriptContent = fs.readFileSync(scriptFile, 'utf8');

// The original HTML in script.js looks like:
// <div class="gift-img"><img loading="lazy" src="${finalImgSrc}" alt="${product.name}">
//   <div class="gift-act">${btnHtml}</div>
// </div>
// <div class="gift-name" ...

scriptContent = scriptContent.replace(
    /<div class="gift-img"><img loading="lazy" src="\$\{finalImgSrc\}" alt="\$\{product\.name\}">[\s]*<div class="gift-act">\$\{btnHtml\}<\/div>[\s]*<\/div>/g,
    '<div class="gift-img"><img loading="lazy" src="${finalImgSrc}" alt="${product.name}"></div>\n<div class="gift-act-mobile-safe" style="width:100%; padding: 10px 0;">${btnHtml}</div>'
);

fs.writeFileSync(scriptFile, scriptContent);

// 4. Update mobile-fix.css to style the new button container safely
const cssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

const buttonFix = `
.gift-act-mobile-safe button {
    width: 100% !important;
    padding: 12px !important;
    font-size: 13px !important;
    border-radius: 8px !important;
    background: #1a1a1a !important;
    color: #fff !important;
    border: none !important;
    font-weight: bold !important;
    cursor: pointer !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
}

@media (min-width: 901px) {
    /* On PC, keep the hover effect over the image if we want to restore it later, but right now we just moved it down for everyone. To match PC, let's just make it look good everywhere */
    .gift-act-mobile-safe {
        margin-top: auto;
    }
}
`;
cssContent += '\n' + buttonFix;
fs.writeFileSync(cssFile, cssContent);

// Bump cache
htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/src="script\.js(\?v=\d+)?"/g, 'src="script.js?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Fixed button location and category visibility');
