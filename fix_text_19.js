const fs = require('fs');

const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

const forceBlock = `
<!-- FORCE OVERRIDE TO BYPASS CACHE -->
<style>
@media (max-width: 900px) {
    #cart-drawer, #wishlist-drawer, .cart-drawer, .wishlist-drawer {
        width: 85% !important;
        max-width: 400px !important;
    }
}
</style>
<script>
// Run immediately and also on load
function injectCartHooks() {
    if (window._cartHooksInjected) return;
    
    // Override removeFromCart to ensure it calls updateProductButtons
    if (typeof window.removeFromCart === 'function') {
        const origRemove = window.removeFromCart;
        window.removeFromCart = function(index) {
            origRemove(index);
            if (typeof updateProductButtons === 'function') updateProductButtons();
        };
        window._cartHooksInjected = true;
    }
    
    // Redefine updateProductButtons to ensure latest logic is used
    window.updateProductButtons = function() {
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
                    if (mobileBtn.hasAttribute('data-add')) {
                        mobileBtn.setAttribute('onclick', mobileBtn.getAttribute('data-add'));
                    }
                }
                if (pcBtn && pcBtn.innerText.includes('XEM GIỎ HÀNG')) {
                    pcBtn.innerText = 'THÊM VÀO GIỎ HÀNG';
                    pcBtn.classList.remove('btn-added-to-cart');
                    if (pcBtn.hasAttribute('data-add')) {
                        pcBtn.setAttribute('onclick', pcBtn.getAttribute('data-add'));
                    }
                }
            }
        });
    };
}

// Try hooking now
injectCartHooks();
// And try again on DOMContentLoaded
window.addEventListener('DOMContentLoaded', injectCartHooks);
// And try again after 1 second just in case scripts load late
setTimeout(injectCartHooks, 1000);
</script>
<!-- END FORCE OVERRIDE -->
`;

if (!htmlContent.includes('<!-- FORCE OVERRIDE TO BYPASS CACHE -->')) {
    htmlContent = htmlContent.replace('</body>', forceBlock + '\n</body>');
    fs.writeFileSync(htmlFile, htmlContent);
    console.log('Successfully injected FORCE OVERRIDE block into lucenva.html');
} else {
    console.log('FORCE OVERRIDE block already exists in lucenva.html');
}
