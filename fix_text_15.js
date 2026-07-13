const fs = require('fs');

// 1. cart-wishlist.css: Update side-drawer width on mobile
const cwCssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/cart-wishlist.css';
let cwCssContent = fs.readFileSync(cwCssFile, 'utf8');

cwCssContent = cwCssContent.replace(
    /width: 100%;\s*max-width: 100%;/g,
    'width: 85%;\n        max-width: 400px;'
);
fs.writeFileSync(cwCssFile, cwCssContent);


// 2. mobile-fix.css: Add .btn-added-to-cart style
const mfCssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css';
let mfCssContent = fs.readFileSync(mfCssFile, 'utf8');
if (!mfCssContent.includes('.btn-added-to-cart')) {
    mfCssContent += '\n.btn-added-to-cart { background: #1a1a1a !important; color: #fff !important; border: 1px solid #1a1a1a !important; }\n';
    fs.writeFileSync(mfCssFile, mfCssContent);
}


// 3. style.css: Add .btn-added-to-cart for PC as well
const styleCssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css';
let styleCssContent = fs.readFileSync(styleCssFile, 'utf8');
if (!styleCssContent.includes('.btn-added-to-cart')) {
    styleCssContent += '\n.btn-added-to-cart { background: #1a1a1a !important; color: #fff !important; border: 1px solid #1a1a1a !important; }\n';
    fs.writeFileSync(styleCssFile, styleCssContent);
}


// 4. script.js: Rewrite fetchProducts rendering and add updateProductButtons()
const scriptFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js';
let scriptContent = fs.readFileSync(scriptFile, 'utf8');

const regex = /const isGift = parseInt\(product\.price\) === 0 \|\| tagsStr\.includes\('loai-qua-tang'\);[\s\S]*?<div class="gift-price">\$\{priceStr\}<\/div>\s*<div class="gift-act-mobile hide-on-pc">\$\{btnHtmlMobile\}<\/div>\s*<\/div>\s*`;/;

const newGen = `const isGift = parseInt(product.price) === 0 || tagsStr.includes('loai-qua-tang');
                const priceStr = isGift ? 'Quà tặng' : new Intl.NumberFormat('vi-VN').format(product.price) + 'đ';

                const finalImgSrc = product.imgSrc || (product.gallery && product.gallery.length > 0 ? product.gallery[0] : '');
                
                const isInCart = typeof cart !== 'undefined' && cart.some(item => item.id === product.id);
                let addedClass = isInCart ? 'btn-added-to-cart' : '';
                let actionAttr = isInCart ? 'onclick="event.stopPropagation(); openCart()"' : \`onclick="event.stopPropagation(); addToCart('\${product.id}', '\${product.name}', '\${product.price}', '\${finalImgSrc}')"\`;
                let btnText = isInCart ? 'XEM GIỎ HÀNG' : 'THÊM VÀO GIỎ HÀNG';

                const btnHtmlPc = isGift 
                    ? \`<button onclick="event.stopPropagation(); document.querySelector('.gift-card[data-id=\\'\${product.id}\\']').click()">XEM THÊM</button>\`
                    : \`<button class="\${addedClass}" \${actionAttr}>\${btnText}</button>\`;

                const btnHtmlMobile = isGift 
                    ? \`<button class="btn-mobile-outline" onclick="event.stopPropagation(); document.querySelector('.gift-card[data-id=\\'\${product.id}\\']').click()">XEM THÊM</button>\`
                    : \`<button class="btn-mobile-outline \${addedClass}" \${actionAttr}>\${btnText}</button>\`;

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

if (scriptContent.includes('const btnHtmlPc = isGift')) {
    scriptContent = scriptContent.replace(regex, newGen);
} else {
    console.log("Could not match script generation block");
}

if (!scriptContent.includes('function updateProductButtons')) {
    scriptContent += `\n
window.updateProductButtons = function() {
    if (typeof cart === 'undefined') return;
    const cartIds = cart.map(item => item.id);
    document.querySelectorAll('.gift-card').forEach(card => {
        const id = card.getAttribute('data-id');
        if (cartIds.includes(id)) {
            const mobileBtn = card.querySelector('.gift-act-mobile button:not([onclick*="XEM THÊM"])');
            if (mobileBtn && mobileBtn.innerText.includes('THÊM VÀO GIỎ HÀNG')) {
                mobileBtn.innerText = 'XEM GIỎ HÀNG';
                mobileBtn.classList.add('btn-added-to-cart');
                mobileBtn.setAttribute('onclick', "event.stopPropagation(); openCart()");
            }
            const pcBtn = card.querySelector('.gift-act button:not([onclick*="XEM THÊM"])');
            if (pcBtn && pcBtn.innerText.includes('THÊM VÀO GIỎ HÀNG')) {
                pcBtn.innerText = 'XEM GIỎ HÀNG';
                pcBtn.classList.add('btn-added-to-cart');
                pcBtn.setAttribute('onclick', "event.stopPropagation(); openCart()");
            }
        }
    });
};
`;
}
fs.writeFileSync(scriptFile, scriptContent);


// 5. cart-wishlist.js: Call updateProductButtons() in addToCart()
const cartFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/cart-wishlist.js';
let cartContent = fs.readFileSync(cartFile, 'utf8');

// We can just append a hook at the end of addToCart or after push.
// Let's replace `showToast('Đã thêm sản phẩm vào giỏ hàng');` with `showToast(...); if (typeof updateProductButtons === 'function') updateProductButtons();`
cartContent = cartContent.replace(
    /showToast\('Đã thêm sản phẩm vào giỏ hàng'\);/g,
    "showToast('Đã thêm sản phẩm vào giỏ hàng');\n    if (typeof updateProductButtons === 'function') updateProductButtons();"
);
fs.writeFileSync(cartFile, cartContent);


// Bump cache
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/href="style\.css(\?v=\d+)?"/g, 'href="style.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/href="cart-wishlist\.css(\?v=\d+)?"/g, 'href="cart-wishlist.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/src="script\.js(\?v=\d+)?"/g, 'src="script.js?v=' + ts + '"');
htmlContent = htmlContent.replace(/src="cart-wishlist\.js(\?v=\d+)?"/g, 'src="cart-wishlist.js?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Fixed cart drawer width and dynamic view cart button');
