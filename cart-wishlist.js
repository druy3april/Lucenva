/* ================================================================
   LUCENVA — CART & WISHLIST SYSTEM
   cart-wishlist.js  |  Thêm sau script.js và data.js
   ================================================================ */

/* ========================
   STATE — Khởi tạo từ localStorage
   ======================== */
let cart = loadFromStorage('lucenva_cart', []);
let wishlist = loadFromStorage('lucenva_wishlist', []);

/* ========================
   HELPERS
   ======================== */
function loadFromStorage(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch (e) { return fallback; }
}

function saveCartToStorage() {
    try { localStorage.setItem('lucenva_cart', JSON.stringify(cart)); } catch (e) {}
}

function saveWishlistToStorage() {
    try { localStorage.setItem('lucenva_wishlist', JSON.stringify(wishlist)); } catch (e) {}
}

/* ========================
   HELPERS
   ======================== */
function parsePrice(str) {
    if (!str) return 0;
    // Tách chuỗi theo khoảng trắng và lấy phần tử cuối cùng (bỏ qua giá bị gạch ngang nếu có)
    const parts = str.trim().split(/\s+/);
    const currentPriceStr = parts[parts.length - 1];
    return parseInt(currentPriceStr.replace(/[^0-9]/g, '')) || 0;
}

function formatPrice(num) {
    if (!num || num === 0) return 'Liên hệ';
    return num.toLocaleString('vi-VN') + 'đ';
}

/* ========================
   CART LOGIC
   ======================== */
function addToCart(id, name, price, imgSrc) {
    const existing = cart.findIndex(item => item.id ? item.id === id : item.name === name);
    if (existing >= 0) {
        cart[existing].qty += 1;
    } else {
        cart.push({ id, name, price, imgSrc, qty: 1 });
    }
    saveCartToStorage();
    updateCartBadge();
    renderCart();
    showToast('<i class="fas fa-check-circle" style="color:#4ade80"></i> Đã thêm <strong>' + name + '</strong> vào giỏ hàng');
    openCart();
    if (typeof updateProductButtons === 'function') updateProductButtons();
}

function addToCartFromProductDetail() {
    const name = document.getElementById('pd-name')?.innerText || 'Sản phẩm';
    const priceStr = document.getElementById('pd-price')?.innerText || '0';
    const price = parsePrice(priceStr);
    const imgSrc = document.getElementById('pd-img-main')?.src || '';
    const qty = parseInt(document.getElementById('qty-input')?.value) || 1;
    const id = document.getElementById('qa-submit-btn')?.dataset?.id || null;

    const existing = cart.findIndex(item => item.id ? item.id === id : item.name === name);
    if (existing >= 0) {
        cart[existing].qty += qty;
    } else {
        cart.push({ id, name, price, imgSrc, qty });
    }
    saveCartToStorage();
    updateCartBadge();
    renderCart();
    showToast('<i class="fas fa-check-circle" style="color:#4ade80"></i> Đã thêm <strong>' + name + '</strong> vào giỏ hàng');
    openCart();
}

function removeFromCart(index) {
    const name = cart[index]?.name || 'Sản phẩm';
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartBadge();
    renderCart();
    showToast('<i class="fas fa-trash-alt"></i> Đã xóa <strong>' + name + '</strong> khỏi giỏ');
    if (typeof updateProductButtons === 'function') updateProductButtons();
    if (typeof updateProductButtons === 'function') updateProductButtons();
}

function updateCartQty(index, delta) {
    if (!cart[index]) return;
    cart[index].qty = Math.max(1, cart[index].qty + delta);
    saveCartToStorage();
    renderCart();
    updateCartBadge();
}

function updateCartBadge() {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    // Sync tất cả .cart-count trên trang
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = total;
        el.style.display = total > 0 ? 'flex' : 'none';
    });
    // Header count
    const headerCount = document.getElementById('cart-count-header');
    if (headerCount) headerCount.textContent = total;
    // Mobile bottom nav badge
    const mbnBadge = document.getElementById('mbn-cart-badge');
    if (mbnBadge) {
        mbnBadge.textContent = total;
        mbnBadge.style.display = total > 0 ? 'flex' : 'none';
    }
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    const footer = document.getElementById('cart-footer');
    const empty = document.getElementById('cart-empty');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = '';
        list.style.display = 'none';
        if (footer) footer.style.display = 'none';
        if (empty) {
            empty.style.display = 'flex';
        }
        return;
    }

    list.style.display = 'block';
    if (footer) footer.style.display = 'block';
    if (empty) empty.style.display = 'none';

    list.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
            <div class="ci-img">
                <img src="${item.imgSrc || ''}" alt="${sanitizeHTML(item.name)}" onerror="this.src='https://md-care.vn/wp-content/uploads/2025/08/back-tron-copy-1024x1024.png'">
            </div>
            <div class="ci-info">
                <div class="ci-name">${sanitizeHTML(item.name)}</div>
                <div class="ci-price">${formatPrice(item.price)}</div>
                <div class="ci-qty-row">
                    <button class="ci-qty-btn" onclick="updateCartQty(${i}, -1)">−</button>
                    <span class="ci-qty">${item.qty}</span>
                    <button class="ci-qty-btn" onclick="updateCartQty(${i}, 1)">+</button>
                    <button class="ci-del" onclick="removeFromCart(${i})" title="Xóa">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Tổng cộng
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const totalEl = document.getElementById('cart-total-price');
    if (totalEl) totalEl.textContent = formatPrice(total);

    // Free ship message
    const freeshipEl = document.getElementById('cart-freeship-msg');
    if (freeshipEl) {
        if (total >= 800000) {
            freeshipEl.innerHTML = '<i class="fas fa-truck" style="color:#22c55e"></i> Đơn hàng được <strong style="color:#22c55e">miễn phí ship!</strong> 🎉';
        } else {
            const remaining = 800000 - total;
            freeshipEl.innerHTML = '<i class="fas fa-truck"></i> Mua thêm <strong>' + formatPrice(remaining) + '</strong> để được miễn phí ship';
        }
    }
    renderCartPage();
    renderCheckoutPage();
}

function openCart() {
    // Đóng wishlist nếu đang mở
    document.getElementById('wishlist-drawer')?.classList.remove('open');
    document.getElementById('wishlist-overlay')?.classList.remove('open');

    document.getElementById('cart-drawer')?.classList.add('open');
    document.getElementById('cart-overlay')?.classList.add('open');
    document.body.classList.add('drawer-open');
}

function closeCart() {
    document.getElementById('cart-drawer')?.classList.remove('open');
    document.getElementById('cart-overlay')?.classList.remove('open');
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
}

function checkout() {
    if (cart.length === 0) {
        showToast('<i class="fas fa-exclamation-circle" style="color:#f59e0b"></i> Giỏ hàng trống!');
        return;
    }

    closeCart(); // Close the side cart drawer
    navigate('checkout'); // Navigate to the new checkout page
    renderCheckoutPage();
}

function renderCheckoutPage() {
    const summaryContainer = document.getElementById('checkout-order-items');
    if (!summaryContainer) return;

    let summaryHtml = '';
    let total = 0;
    cart.forEach(item => {
        summaryHtml += `
            <tr class="cart_item">
                <td class="product-name">
                    <div class="product-name-qty">
                        <img src="${item.imgSrc}" alt="${sanitizeHTML(item.name)}">
                        <span>${sanitizeHTML(item.name)} <strong class="product-quantity">× ${item.qty}</strong></span>
                    </div>
                </td>
                <td class="product-total">
                    <span>${formatPrice(item.price * item.qty)}</span>
                </td>
            </tr>
        `;
        total += item.price * item.qty;
    });
    summaryContainer.innerHTML = summaryHtml;
    
    document.getElementById('chk-summary-subtotal').textContent = formatPrice(total);
    document.getElementById('chk-summary-total').textContent = formatPrice(total + 30000);
}

function togglePaymentInfo() {
    const codBox = document.getElementById('payment-box-cod');
    const bankBox = document.getElementById('payment-box-bank');
    const vnpayBox = document.getElementById('payment-box-vnpay');
    
    const method = document.querySelector('input[name="payment_method"]:checked').value;
    
    if (codBox) codBox.style.display = method === 'cod' ? 'block' : 'none';
    if (bankBox) bankBox.style.display = method === 'bank' ? 'block' : 'none';
    if (vnpayBox) vnpayBox.style.display = method === 'vnpay' ? 'block' : 'none';
}

function submitOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        showToast('<i class="fas fa-exclamation-circle" style="color:#f59e0b"></i> Giỏ hàng trống!');
        return;
    }

    const customer_name = document.getElementById('chk-name').value.trim();
    const phone = document.getElementById('chk-phone').value.trim();
    const address = document.getElementById('chk-address').value.trim();
    const email = document.getElementById('chk-email').value.trim();
    const note = document.getElementById('chk-note').value.trim();
    
    const paymentMethodEl = document.querySelector('input[name="payment_method"]:checked');
    const paymentMethod = paymentMethodEl ? paymentMethodEl.value : 'cod';

    // Show loading spinner
    const submitBtn = document.getElementById('chk-submit-btn');
    const btnText = submitBtn.querySelector('.chk-btn-text');
    const spinner = document.getElementById('chk-spinner');
    
    submitBtn.disabled = true;
    btnText.textContent = 'Đang xử lý...';
    spinner.style.display = 'inline-block';

    let orderSummary = '📦 ĐƠN HÀNG CỦA BẠN\n\n';
    cart.forEach((item, i) => {
        orderSummary += (i + 1) + '. ' + item.name + ' x' + item.qty + ' — ' + formatPrice(item.price * item.qty) + '\n';
    });

    if (paymentMethod === 'vnpay') {
        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.textContent = 'ĐẶT HÀNG';
            spinner.style.display = 'none';
            
            const confirmPay = confirm("Bản Demo: Bạn đang được chuyển hướng sang cổng thanh toán VNPay.\n\nBấm OK để mô phỏng thanh toán thành công, bấm Cancel để hủy.");
            
            if (confirmPay) {
                cart = [];
                saveCartToStorage();
                updateCartBadge();
                renderCart();
                navigate('home');
                showToast('<i class="fas fa-check-circle" style="color:#4ade80"></i> Đặt hàng & thanh toán VNPay thành công! Mã đơn: ' + Math.floor(Math.random() * 1000000));
            } else {
                showToast('<i class="fas fa-times-circle" style="color:#ef4444"></i> Đã hủy thanh toán VNPay.');
            }
        }, 1000);
        return;
    }

    fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customer_name,
            phone,
            address,
            email,
            note,
            paymentMethod,
            cart
        })
    })
    .then(async res => {
        const data = await res.json().catch(() => null);
        if(!res.ok) {
            throw new Error(data && data.error ? data.error : "API Error");
        }
        return data;
    })
    .then(data => {
        cart = [];
        saveCartToStorage();
        updateCartBadge();
        renderCart();
        
        // Nếu chọn VNPay, API sẽ trả về paymentUrl
        if (data.paymentUrl) {
            window.location.href = data.paymentUrl;
        } else {
            navigate('home');
            showToast('<i class="fas fa-check-circle" style="color:#4ade80"></i> Đặt hàng thành công! Mã đơn: ' + data.orderId);
        }
    })
    .catch(err => {
        console.error("Order error:", err.message);
        if (err.message && err.message !== "API Error" && err.message !== "Failed to fetch") {
            // Đây là lỗi validation từ server (ví dụ: Số điện thoại không hợp lệ)
            showToast('<i class="fas fa-exclamation-circle" style="color:#f59e0b"></i> ' + err.message);
        } else {
            // Lỗi mạng hoặc server không phản hồi -> dùng cách cũ qua Messenger
            console.warn("API không phản hồi, dùng cách cũ qua Messenger");
            const msg = encodeURIComponent(orderSummary + "\nKhách hàng: " + customer_name + " - SĐT: " + phone + " - Địa chỉ: " + address + "\nThanh toán: " + paymentMethod);
            window.open('https://m.me/?text=' + msg, '_blank');
            cart = [];
            saveCartToStorage();
            updateCartBadge();
            renderCart();
            navigate('home');
            showToast('<i class="fas fa-check-circle" style="color:#4ade80"></i> Đã gửi đơn hàng qua Messenger!');
        }
    })
    .finally(() => {
        // Reset loading state
        submitBtn.disabled = false;
        btnText.textContent = 'ĐẶT HÀNG';
        spinner.style.display = 'none';
        document.getElementById('checkout-form').reset();
    });
}

/* ========================
   WISHLIST LOGIC
   ======================== */
function toggleWishlist(name, price, imgSrc) {
    const existingIdx = wishlist.findIndex(item => item.name === name);
    if (existingIdx >= 0) {
        wishlist.splice(existingIdx, 1);
        showToast('<i class="fas fa-heart-broken"></i> Đã xóa <strong>' + name + '</strong> khỏi yêu thích');
    } else {
        wishlist.push({ name, price, imgSrc });
        showToast('<i class="fas fa-heart" style="color:#f87171"></i> Đã thêm <strong>' + name + '</strong> vào yêu thích');
    }
    saveWishlistToStorage();
    updateWishlistBadge();
    renderCart();
    renderWishlist();
    renderWishlist();
    updateHeartButtons();
}

function toggleWishlistFromDetail() {
    const name = document.getElementById('pd-name')?.innerText || 'Sản phẩm';
    const priceStr = document.getElementById('pd-price')?.innerText || '0';
    const price = parsePrice(priceStr);
    const imgSrc = document.getElementById('pd-img-main')?.src || '';
    toggleWishlist(name, price, imgSrc);
    // Update detail page wish button
    const detailWishBtn = document.getElementById('sp-wish-btn');
    if (detailWishBtn) {
        const isWished = wishlist.some(item => item.name === name);
        detailWishBtn.classList.toggle('wished', isWished);
        detailWishBtn.querySelector('i').className = isWished ? 'fas fa-heart' : 'far fa-heart';
    }
}

function removeFromWishlist(index) {
    const name = wishlist[index]?.name || '';
    wishlist.splice(index, 1);
    saveWishlistToStorage();
    updateWishlistBadge();
    renderCart();
    renderWishlist();
    renderWishlist();
    updateHeartButtons();
    if (name) showToast('<i class="fas fa-heart-broken"></i> Đã xóa <strong>' + name + '</strong> khỏi yêu thích');
}

function updateWishlistBadge() {
    const count = wishlist.length;
    const wBadge = document.getElementById('wishlist-count-header');
    if (wBadge) wBadge.textContent = count;
    // Header wish badge
    const headerBadge = document.querySelector('.wish-badge');
    if (headerBadge) {
        headerBadge.textContent = count;
        headerBadge.style.display = count > 0 ? 'flex' : 'none';
    }
}

function renderWishlist() {
    const list = document.getElementById('wishlist-items-list');
    const empty = document.getElementById('wishlist-empty');
    if (!list) return;

    if (wishlist.length === 0) {
        list.innerHTML = '';
        list.style.display = 'none';
        if (empty) empty.style.display = 'flex';
        return;
    }

    list.style.display = 'block';
    if (empty) empty.style.display = 'none';

    list.innerHTML = wishlist.map((item, i) => `
        <div class="wishlist-item">
            <div class="wi-img">
                <img src="${item.imgSrc || ''}" alt="${sanitizeHTML(item.name)}" onerror="this.src='https://md-care.vn/wp-content/uploads/2025/08/back-tron-copy-1024x1024.png'">
            </div>
            <div class="wi-info">
                <div class="wi-name">${sanitizeHTML(item.name)}</div>
                <div class="wi-price">${formatPrice(item.price)}</div>
                <div class="wi-act">
                    <button class="wi-cart-btn" onclick="addToCart('${item.id || ''}', '${sanitizeHTML(item.name).replace(/'/g, "\\'")}', ${item.price}, '${item.imgSrc || ''}')">
                        Thêm Vào Giỏ Hàng
                    </button>
                    <button class="wi-del" onclick="removeFromWishlist(${i})" title="Xóa">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateHeartButtons() {
    // Cập nhật tất cả nút tim trên trang
    document.querySelectorAll('.wish-btn[data-product-name]').forEach(btn => {
        const name = btn.getAttribute('data-product-name');
        const isWished = wishlist.some(item => item.name === name);
        btn.classList.toggle('wished', isWished);
        const icon = btn.querySelector('i');
        if (icon) icon.className = isWished ? 'fas fa-heart' : 'far fa-heart';
    });
}

function openWishlist() {
    // Đóng cart nếu đang mở
    document.getElementById('cart-drawer')?.classList.remove('open');
    document.getElementById('cart-overlay')?.classList.remove('open');

    document.getElementById('wishlist-drawer')?.classList.add('open');
    document.getElementById('wishlist-overlay')?.classList.add('open');
    document.body.classList.add('drawer-open');
}

function closeWishlist() {
    document.getElementById('wishlist-drawer')?.classList.remove('open');
    document.getElementById('wishlist-overlay')?.classList.remove('open');
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
}

/* ========================
   TOAST NOTIFICATION
   ======================== */
let _toastTimer;
function showToast(msg, duration = 3000) {
    let toast = document.getElementById('lucenva-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'lucenva-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = msg;
    toast.classList.add('show');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ========================
   INJECT HEART BUTTONS ON CARDS (via JS — không cần sửa HTML)
   ======================== */
function injectHeartButtons() {
    // === gift-card ===
    document.querySelectorAll('.gift-card:not([data-wish-injected])').forEach(card => {
        card.setAttribute('data-wish-injected', '1');
        const nameEl = card.querySelector('.gift-name');
        const priceEl = card.querySelector('.gift-price');
        const imgEl = card.querySelector('img');
        if (!nameEl) return;

        const name = nameEl.innerText.trim();
        const price = priceEl ? parsePrice(priceEl.innerText) : 0;
        const imgSrc = imgEl ? imgEl.src : '';

        const btn = document.createElement('button');
        btn.className = 'wish-btn';
        btn.setAttribute('data-product-name', name);
        btn.setAttribute('title', 'Thêm vào yêu thích');
        btn.innerHTML = '<i class="far fa-heart"></i>';
        btn.onclick = function (e) {
            e.stopPropagation();
            toggleWishlist(name, price, imgSrc);
        };

        const imgBox = card.querySelector('.gift-img');
        if (imgBox) imgBox.appendChild(btn);
    });

    // === fp-card (Featured Products) ===
    document.querySelectorAll('.fp-card:not([data-wish-injected])').forEach(card => {
        card.setAttribute('data-wish-injected', '1');
        const nameEl = card.querySelector('h4');
        const priceEl = card.querySelector('.fp-price');
        const imgEl = card.querySelector('img');
        if (!nameEl) return;

        const name = nameEl.innerText.trim();
        const price = priceEl ? parsePrice(priceEl.innerText) : 0;
        const imgSrc = imgEl ? imgEl.src : '';

        const btn = document.createElement('button');
        btn.className = 'wish-btn';
        btn.setAttribute('data-product-name', name);
        btn.setAttribute('title', 'Thêm vào yêu thích');
        btn.innerHTML = '<i class="far fa-heart"></i>';
        btn.onclick = function (e) {
            e.stopPropagation();
            toggleWishlist(name, price, imgSrc);
        };

        const imgBox = card.querySelector('.fp-img');
        if (imgBox) imgBox.appendChild(btn);
    });
}

/* ========================
   INJECT WISHLIST BUTTON ON PRODUCT DETAIL PAGE
   ======================== */
function injectDetailWishBtn() {
    const actionBox = document.querySelector('.sp-action-box');
    if (!actionBox || document.getElementById('sp-wish-btn')) return;

    const wishBtn = document.createElement('button');
    wishBtn.className = 'sp-wish-btn';
    wishBtn.id = 'sp-wish-btn';
    wishBtn.title = 'Thêm vào yêu thích';
    wishBtn.innerHTML = '<i class="far fa-heart"></i>';
    wishBtn.onclick = toggleWishlistFromDetail;
    actionBox.appendChild(wishBtn);
}

/* ========================
   EVENT DELEGATION (Bắt click tất cả nút sản phẩm — không sửa HTML gốc)
   ======================== */
document.addEventListener('click', function (e) {

    // gift-card: "Thêm Vào Giỏ" button
    const giftActBtn = e.target.closest('.gift-act button');
    if (giftActBtn) {
        const card = giftActBtn.closest('.gift-card');
        if (card) {
            const name = card.querySelector('.gift-name')?.innerText?.trim() || 'Sản phẩm';
            const priceStr = card.querySelector('.gift-price')?.innerText || '0';
            const price = parsePrice(priceStr);
            const imgSrc = card.querySelector('img')?.src || '';
            const id = card.getAttribute('data-id') || null;
            addToCart(id, name, price, imgSrc);
        }
        return;
    }

    // fp-card: "MUA NGAY" button
    const fpBtn = e.target.closest('.fp-btn');
    if (fpBtn) {
        const card = fpBtn.closest('.fp-card');
        if (card) {
            const name = card.querySelector('h4')?.innerText?.trim() || 'Sản phẩm';
            const priceStr = card.querySelector('.fp-price')?.innerText || '0';
            const price = parsePrice(priceStr);
            const imgSrc = card.querySelector('img')?.src || '';
            const id = card.getAttribute('data-id') || null;
            addToCart(id, name, price, imgSrc);
        }
        return;
    }

    // Clinical proof section: "MUA NGAY" button
    const cpBuyBtn = e.target.closest('.cp-btn-buy');
    if (cpBuyBtn) {
        const col = cpBuyBtn.closest('.cp-product-col');
        if (col) {
            const name = col.querySelector('h3')?.innerText?.trim() || 'Sản phẩm';
            const priceStr = col.querySelector('.cp-price')?.innerText || '0';
            const price = parsePrice(priceStr);
            const imgSrc = col.querySelector('.cp-product-img')?.src || '';
            const id = col.getAttribute('data-id') || null;
            addToCart(id, name, price, imgSrc);
        }
        return;
    }

    // Product detail: "THÊM VÀO GIỎ HÀNG" button
    const spAddBtn = e.target.closest('.sp-add-btn');
    if (spAddBtn) {
        addToCartFromProductDetail();
        return;
    }

    // Voucher cards: "Mua Ngay" button (voucher page)
    const vcBtn = e.target.closest('.voucher-card .btn');
    if (vcBtn) {
        const card = vcBtn.closest('.voucher-card');
        if (card) {
            const name = (card.querySelector('h4')?.innerText || 'Voucher Lucenva') + ' – Thẻ quà tặng';
            const amountText = card.querySelector('.vc-amount')?.innerText || '0';
            const unitText = card.querySelector('.vc-unit')?.innerText || '';
            let price = 0;
            if (amountText.includes('M')) price = parseInt(amountText) * 1000000;
            else if (amountText.includes('K')) price = parseInt(amountText) * 1000;
            else price = parseInt(amountText.replace(/[^0-9]/g, '')) || 0;
            const id = card.getAttribute('data-id') || null;
            addToCart(id, name, price, 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=500&q=80');
        }
        return;
    }
});

/* ========================
   UPDATE BOTTOM NAV ACTIVE STATE
   ======================== */
function updateMobileNav(pageId) {
    document.querySelectorAll('.mbn-item').forEach(item => item.classList.remove('active'));
    if (pageId === 'home') {
        document.getElementById('mbn-home')?.classList.add('active');
    } else if (pageId === 'products' || pageId === 'product-detail') {
        document.getElementById('mbn-shop')?.classList.add('active');
    }
}

/* ========================
   INIT
   ======================== */
document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo badge giỏ hàng = 0
    updateCartBadge();
    updateWishlistBadge();
    renderCart();
    renderWishlist();

    // Inject nút tim lên tất cả product cards hiện có
    injectHeartButtons();

    // Active home tab trên bottom nav
    updateMobileNav('home');

    // Inject wish button trên trang detail nếu đang hiển thị
    if (document.getElementById('page-product-detail')?.classList.contains('active')) {
        injectDetailWishBtn();
    }
});


function goToCartPage() {
    closeCart();
    navigate('cart');
    renderCartPage();
}

function renderCartPage() {
    const list = document.getElementById('cart-page-items');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 40px;">Giỏ hàng của bạn đang trống</td></tr>';
        document.getElementById('cart-page-subtotal').textContent = '0đ';
        document.getElementById('cart-page-total').textContent = '0đ';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, i) => {
        let subtotal = item.price * item.qty;
        total += subtotal;
        html += `
            <tr>
                <td class="col-remove">
                    <button onclick="removeFromCart(${i})" title="Xóa"><i class="fas fa-times"></i></button>
                </td>
                <td class="col-product">
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <span>${item.name}</span>
                </td>
                <td class="col-price">${formatPrice(item.price)}</td>
                <td class="col-qty">
                    <div class="qty-control">
                        <button onclick="updateCartQty(${i}, -1)">-</button>
                        <input type="text" value="${item.qty}" readonly>
                        <button onclick="updateCartQty(${i}, 1)">+</button>
                    </div>
                </td>
                <td class="col-subtotal">${formatPrice(subtotal)}</td>
            </tr>
        `;
    });
    list.innerHTML = html;
    
    document.getElementById('cart-page-subtotal').textContent = formatPrice(total);
    document.getElementById('cart-page-total').textContent = formatPrice(total + 30000); // include 30k shipping
}
