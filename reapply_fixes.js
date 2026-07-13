const fs = require('fs');

// 1. Fix style.css back-to-top position
let css = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css', 'utf8');
css = css.replace(/\.back-to-top\s*\{[\s\S]*?right:\s*20px;/, function(match) {
    return match.replace('right: 20px;', 'left: 15px; /* fixed Zalo overlap */');
});
fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css', css);

// 2. Inject Cart Hooks into lucenva.html
let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');

const injectCode = `
<!-- CART HOOKS FOR HARDCODED PRODUCTS -->
<script>
function injectCartHooks() {
    document.querySelectorAll('.gift-card').forEach(card => {
        const id = card.getAttribute('data-id');
        if (!id) return;
        const nameNode = card.querySelector('.gift-name');
        const priceNode = card.querySelector('.gift-price');
        const imgNode = card.querySelector('img');
        
        const name = nameNode ? nameNode.innerText : '';
        const priceText = priceNode ? priceNode.innerText : '0';
        const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
        const imgSrc = imgNode ? imgNode.getAttribute('src') : '';

        // Add to Cart Buttons
        const btns = card.querySelectorAll('button');
        btns.forEach(btn => {
            if (btn.innerText.includes('THÊM VÀO GIỎ')) {
                const action = "event.stopPropagation(); addToCart('" + id + "', '" + name.replace(/'/g, "\\'") + "', " + price + ", '" + imgSrc + "')";
                btn.setAttribute('onclick', action);
                btn.setAttribute('data-add', action);
            }
        });
    });
    if (typeof updateProductButtons === 'function') updateProductButtons();
}
window.addEventListener('DOMContentLoaded', injectCartHooks);
setTimeout(injectCartHooks, 1000);
</script>
`;

if (!html.includes('CART HOOKS FOR HARDCODED PRODUCTS')) {
    html = html.replace('</body>', injectCode + '\n</body>');
    fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);
    console.log('Injected cart hooks.');
}
console.log('Fixed style.css and lucenva.html.');
