const fs = require('fs');

// 1. Rewrite script.js HTML generation
const scriptFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js';
let scriptContent = fs.readFileSync(scriptFile, 'utf8');

const oldGen = `const isGift = parseInt(product.price) === 0;
                const priceStr = isGift ? 'Quà tặng' : new Intl.NumberFormat('vi-VN').format(product.price) + 'đ';

                const finalImgSrc = product.imgSrc || (product.gallery && product.gallery.length > 0 ? product.gallery[0] : '');

                const btnHtml = isGift 
                    ? \`<button onclick="event.stopPropagation(); document.querySelector('.gift-card[data-id=\\'\${product.id}\\']').click()">XEM THÔNG TIN</button>\`
                    : \`<button onclick="event.stopPropagation(); addToCart('\${product.id}', '\${product.name}', '\${product.price}', '\${finalImgSrc}')">THÊM VÀO GIỎ HÀNG</button>\`;

                const cardHtml = \`
                  <div class="gift-card" data-id="\${product.id}"
                    data-tags="\${tagsStr}"
                    data-price="\${product.price}" onclick="openDetail(this)">
                    \${badgeHtml}
                    <div class="gift-img"><img loading="lazy" src="\${finalImgSrc}" alt="\${product.name}">
  <div class="gift-act">\${btnHtml}</div>
</div>
                    <div class="gift-name" style="text-align: center !important; width: 100% !important; display: block !important; font-weight: 700 !important;">\${product.name}</div>
                    <div class="gift-desc" style="text-align: center !important; width: 100% !important; display: block !important;">\${product.desc || ''}</div>
                    <div class="gift-price">\${priceStr}</div>
                  </div>
                \`;`;

const newGen = `const isGift = parseInt(product.price) === 0 || tagsStr.includes('loai-qua-tang');
                const priceStr = isGift ? 'Quà tặng' : new Intl.NumberFormat('vi-VN').format(product.price) + 'đ';

                const finalImgSrc = product.imgSrc || (product.gallery && product.gallery.length > 0 ? product.gallery[0] : '');

                const btnHtmlPc = isGift 
                    ? \`<button onclick="event.stopPropagation(); document.querySelector('.gift-card[data-id=\\'\${product.id}\\']').click()">XEM THÊM</button>\`
                    : \`<button onclick="event.stopPropagation(); addToCart('\${product.id}', '\${product.name}', '\${product.price}', '\${finalImgSrc}')">THÊM VÀO GIỎ HÀNG</button>\`;

                const btnHtmlMobile = isGift 
                    ? \`<button class="btn-mobile-outline" onclick="event.stopPropagation(); document.querySelector('.gift-card[data-id=\\'\${product.id}\\']').click()">XEM THÊM</button>\`
                    : \`<button class="btn-mobile-outline" onclick="event.stopPropagation(); addToCart('\${product.id}', '\${product.name}', '\${product.price}', '\${finalImgSrc}')">THÊM VÀO GIỎ HÀNG</button>\`;

                const cardHtml = \`
                  <div class="gift-card" data-id="\${product.id}"
                    data-tags="\${tagsStr}"
                    data-price="\${product.price}" onclick="openDetail(this)">
                    \${badgeHtml}
                    <div class="gift-img">
                      <img loading="lazy" src="\${finalImgSrc}" alt="\${product.name}">
                      <div class="gift-act hide-on-mobile">\${btnHtmlPc}</div>
                    </div>
                    <div class="gift-name" style="text-align: center !important; width: 100% !important; display: block !important; font-weight: 700 !important;">\${product.name}</div>
                    <div class="gift-desc" style="text-align: center !important; width: 100% !important; display: block !important;">\${product.desc || ''}</div>
                    <div class="gift-price">\${priceStr}</div>
                    <div class="gift-act-mobile hide-on-pc">\${btnHtmlMobile}</div>
                  </div>
                \`;`;

if (scriptContent.includes(oldGen)) {
    scriptContent = scriptContent.replace(oldGen, newGen);
    fs.writeFileSync(scriptFile, scriptContent);
    console.log('Successfully replaced HTML generation in script.js');
} else {
    console.log('FAILED to find old generation block. Using regex...');
    const backupRegex = /const isGift = parseInt\(product\.price\) === 0;[\s\S]*?<div class="gift-price">\$\{priceStr\}<\/div>\s*<\/div>\s*`;/;
    if (backupRegex.test(scriptContent)) {
        scriptContent = scriptContent.replace(backupRegex, newGen);
        fs.writeFileSync(scriptFile, scriptContent);
        console.log('Successfully replaced HTML generation in script.js (via regex)');
    } else {
        console.log('FAILED to find old generation block completely.');
    }
}


// 2. Add Mobile-specific CSS to mobile-fix.css
const cssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

if (!cssContent.includes('.btn-mobile-outline')) {
    const mobileCss = `
/* Mobile Static Button Styling (md-care style) */
@media (max-width: 900px) {
    .hide-on-mobile { display: none !important; }
    
    .gift-act-mobile {
        width: 100%;
        margin-top: 10px;
        display: flex;
        justify-content: center;
    }
    
    .btn-mobile-outline {
        width: 100%;
        padding: 8px 12px;
        font-size: 13px !important;
        font-weight: 600 !important;
        color: #1a1a1a !important;
        background: transparent !important;
        border: 1px solid #1a1a1a !important;
        border-radius: 4px !important;
        text-transform: uppercase !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
    }
    
    .btn-mobile-outline:active {
        background: #f5f5f5 !important;
    }
}
@media (min-width: 901px) {
    .hide-on-pc { display: none !important; }
}
`;
    cssContent += '\n' + mobileCss;
    fs.writeFileSync(cssFile, cssContent);
}

// 3. We also need to add hide-on-pc to style.css just in case mobile-fix.css is loaded late
const mainCssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css';
let mainCssContent = fs.readFileSync(mainCssFile, 'utf8');
if (!mainCssContent.includes('.hide-on-pc')) {
    mainCssContent += '\n@media (min-width: 901px) { .hide-on-pc { display: none !important; } }\n';
    fs.writeFileSync(mainCssFile, mainCssContent);
}

// Bump cache
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/href="style\.css(\?v=\d+)?"/g, 'href="style.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/src="script\.js(\?v=\d+)?"/g, 'src="script.js?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Script updated with mobile buttons');
