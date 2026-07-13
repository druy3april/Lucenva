const fs = require('fs');

let js = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/cart-wishlist.js', 'utf8');

js = js.replace(/saveCart\(\);\s*renderCart\(\);/g, 'saveCart();\n    renderCart();\n    if(typeof updateProductButtons === "function") updateProductButtons();');
js = js.replace(/saveCart\(\);\s*renderCart\(\);\s*updateCartCount\(\);/g, 'saveCart();\n    renderCart();\n    updateCartCount();\n    if(typeof updateProductButtons === "function") updateProductButtons();');

fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/cart-wishlist.js', js);
console.log('Hooked cart-wishlist.js');
