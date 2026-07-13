const fs = require('fs');

// 1. mobile-fix.css: Fix width 100% !important
const mobileFixCssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css';
let mobileFixContent = fs.readFileSync(mobileFixCssFile, 'utf8');

mobileFixContent = mobileFixContent.replace(
    /width: 100% !important;\s*max-width: 100% !important;/g,
    'width: 85% !important;\n    max-width: 400px !important;'
);
fs.writeFileSync(mobileFixCssFile, mobileFixContent);


// 2. cart-wishlist.js: Add updateProductButtons hook to removeFromCart and clear/update functions
const cartJsFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/cart-wishlist.js';
let cartJsContent = fs.readFileSync(cartJsFile, 'utf8');

cartJsContent = cartJsContent.replace(
    /showToast\('<i class="fas fa-trash-alt"><\/i> Đã xóa <strong>' \+ name \+ '<\/strong> khỏi giỏ'\);/g,
    "showToast('<i class=\"fas fa-trash-alt\"></i> Đã xóa <strong>' + name + '</strong> khỏi giỏ');\n    if (typeof updateProductButtons === 'function') updateProductButtons();"
);

fs.writeFileSync(cartJsFile, cartJsContent);


// 3. script.js: Rewrite button HTML generation to include data-add and fix updateProductButtons
const scriptJsFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js';
let scriptJsContent = fs.readFileSync(scriptJsFile, 'utf8');

const regexGen = /const isInCart = typeof cart !== 'undefined'[\s\S]*?<div class="gift-price">\$\{priceStr\}<\/div>\s*<div class="gift-act-mobile hide-on-pc">\$\{btnHtmlMobile\}<\/div>\s*<\/div>\s*`;/;

const newGen = `const isInCart = typeof cart !== 'undefined' && cart.some(item => item.id === product.id);
                let addedClass = isInCart ? 'btn-added-to-cart' : '';
                
                let origAction = \`event.stopPropagation(); addToCart('\${product.id}', '\${product.name}', '\${product.price}', '\${finalImgSrc}')\`;
                let actionAttr = isInCart ? 'onclick="event.stopPropagation(); openCart()"' : \`onclick="\${origAction}"\`;
                let btnText = isInCart ? 'XEM GIỎ HÀNG' : 'THÊM VÀO GIỎ HÀNG';

                const btnHtmlPc = isGift 
                    ? \`<button onclick="event.stopPropagation(); document.querySelector('.gift-card[data-id=\\'\${product.id}\\']').click()">XEM THÊM</button>\`
                    : \`<button class="\${addedClass}" data-add="\${origAction}" \${actionAttr}>\${btnText}</button>\`;

                const btnHtmlMobile = isGift 
                    ? \`<button class="btn-mobile-outline" onclick="event.stopPropagation(); document.querySelector('.gift-card[data-id=\\'\${product.id}\\']').click()">XEM THÊM</button>\`
                    : \`<button class="btn-mobile-outline \${addedClass}" data-add="\${origAction}" \${actionAttr}>\${btnText}</button>\`;

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

if (scriptJsContent.includes('let actionAttr = isInCart')) {
    scriptJsContent = scriptJsContent.replace(regexGen, newGen);
} else {
    console.log("Failed to match script.js generation block");
}

const regexUpdate = /window\.updateProductButtons = function\(\) \{[\s\S]*?\}\s*\};\s*/;

const newUpdate = `window.updateProductButtons = function() {
    if (typeof cart === 'undefined') return;
    const cartIds = cart.map(item => item.id);
    document.querySelectorAll('.gift-card').forEach(card => {
        const id = card.getAttribute('data-id');
        
        const pcBtn = card.querySelector('.gift-act button:not([onclick*="XEM THÊM"])');
        const mobileBtn = card.querySelector('.gift-act-mobile button:not([onclick*="XEM THÊM"])');

        if (cartIds.includes(id)) {
            if (mobileBtn && mobileBtn.innerText.includes('THÊM VÀO GIỎ HÀNG')) {
                mobileBtn.innerText = 'XEM GIỎ HÀNG';
                mobileBtn.classList.add('btn-added-to-cart');
                mobileBtn.setAttribute('onclick', "event.stopPropagation(); openCart()");
            }
            if (pcBtn && pcBtn.innerText.includes('THÊM VÀO GIỎ HÀNG')) {
                pcBtn.innerText = 'XEM GIỎ HÀNG';
                pcBtn.classList.add('btn-added-to-cart');
                pcBtn.setAttribute('onclick', "event.stopPropagation(); openCart()");
            }
        } else {
            if (mobileBtn && mobileBtn.innerText.includes('XEM GIỎ HÀNG')) {
                mobileBtn.innerText = 'THÊM VÀO GIỎ HÀNG';
                mobileBtn.classList.remove('btn-added-to-cart');
                mobileBtn.setAttribute('onclick', mobileBtn.getAttribute('data-add'));
            }
            if (pcBtn && pcBtn.innerText.includes('XEM GIỎ HÀNG')) {
                pcBtn.innerText = 'THÊM VÀO GIỎ HÀNG';
                pcBtn.classList.remove('btn-added-to-cart');
                pcBtn.setAttribute('onclick', pcBtn.getAttribute('data-add'));
            }
        }
    });
};
`;

if (scriptJsContent.includes('window.updateProductButtons = function()')) {
    scriptJsContent = scriptJsContent.replace(regexUpdate, newUpdate);
} else {
    console.log("Failed to match window.updateProductButtons in script.js");
}

fs.writeFileSync(scriptJsFile, scriptJsContent);


// Bump cache
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/src="script\.js(\?v=\d+)?"/g, 'src="script.js?v=' + ts + '"');
htmlContent = htmlContent.replace(/src="cart-wishlist\.js(\?v=\d+)?"/g, 'src="cart-wishlist.js?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Fixed mobile drawer width and button revert on cart remove');
