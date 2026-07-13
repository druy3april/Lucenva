const fs = require('fs');
const cartFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/cart-wishlist.js';
let cartContent = fs.readFileSync(cartFile, 'utf8');

const oldCode = `    showToast('<i class="fas fa-check-circle" style="color:#4ade80"></i> Đã thêm <strong>' + name + '</strong> vào giỏ hàng');\n    openCart();`;
const newCode = `    showToast('<i class="fas fa-check-circle" style="color:#4ade80"></i> Đã thêm <strong>' + name + '</strong> vào giỏ hàng');\n    openCart();\n    if (typeof updateProductButtons === 'function') updateProductButtons();`;

if (cartContent.includes(oldCode)) {
    cartContent = cartContent.replace(oldCode, newCode);
    fs.writeFileSync(cartFile, cartContent);
    console.log('Fixed addToCart');
} else {
    console.log('Failed to find oldCode');
}

// Bump cache again
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/src="cart-wishlist\.js(\?v=\d+)?"/g, 'src="cart-wishlist.js?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);
