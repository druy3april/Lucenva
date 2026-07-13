/* ================================================================
ROUTER — SPA Navigation
================================================================ */
const routes = {
    'home': 'page-home',
    'products': 'page-products',
    'gifts': 'page-gifts',
    'about-brand': 'page-about-brand',
    'about-mission': 'page-about-mission',
    'about-team': 'page-about-team',
    'about-facility': 'page-about-facility',
    'spa-facial': 'page-spa-facial',
    'spa-massage': 'page-spa-massage',
    'spa-hifu': 'page-spa-hifu',
    'spa-acne': 'page-spa-acne',
    'spa-pricing': 'page-spa-pricing',
    'gift-sets': 'page-gift-sets',
    'gift-voucher': 'page-gift-voucher',
    'gift-limited': 'page-gift-limited',
    'commitment': 'page-commitment',
    'product-detail': 'page-product-detail',
    'checkout': 'page-checkout',
    'cart': 'page-cart'
};

let currentPage = 'home';
let allProducts = [];

// === API URL tự detect m?�i trư�?ng (dev/production) ===
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:' || window.location.hostname === ''
    ? 'http://localhost:3000/api'
    : window.location.origin + '/api';

// === Sanitize HTML chống XSS (loại b�? thế nguy hiểm, giữ HTML an to?�n) ===
function sanitizeHTML(str) {
    if (!str || typeof str !== 'string') return '';
    if (typeof DOMPurify !== 'undefined') {
        return DOMPurify.sanitize(str, {
            ADD_TAGS: ['iframe', 'i'],
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'style', 'class', 'id', 'target']
        });
    }
    // Fallback nếu DOMPurify bị block (vd: AdBlock)
    return str
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
        .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '')
        .replace(/<embed[^>]*>/gi, '')
        .replace(/<form[^>]*>[\s\S]*?<\/form>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/on\w+\s*=\s*[^\s>]+/gi, '')
        .replace(/javascript\s*:/gi, '');
}

async function fetchAndRenderProducts() {
    try {
        const res = await fetch(`${API_BASE_URL}/products?t=${Date.now()}`);
        if (!res.ok) throw new Error('API error');
        allProducts = await res.json();
        
        const productList = document.getElementById('product-list');
        if (productList && productList.children.length === 0) {
            // productList.innerHTML = ""; // X?a sạch dữ liệu cũ
            allProducts.forEach(product => {
                const tagsStr = Array.isArray(product.tags) ? product.tags.join(' ') : '';
                const badgeHtml = product.badge ? `<div class="gift-badge" style="background:#c4a46d;">${product.badge}</div>` : '';
                
                // Format price e.g. 980000 -> 980.000đ
                const isGift = product.category === 'gift' || parseInt(product.price) === 0 || tagsStr.includes('loai-qua-tang');
                const priceStr = isGift ? 'Quà tặng' : new Intl.NumberFormat('vi-VN').format(product.price) + 'đ';

                const finalImgSrc = product.imgSrc || (product.gallery && product.gallery.length > 0 ? product.gallery[0] : '');
                
                const isInCart = typeof cart !== 'undefined' && cart.some(item => item.id === product.id);
                let addedClass = isInCart ? 'btn-added-to-cart' : '';
                let origAction = `event.stopPropagation(); addToCart('${product.id}', '${product.name.replace(/'/g, "\\'")}', '${product.price}', '${finalImgSrc}')`;
                let actionAttr = isInCart ? 'onclick="event.stopPropagation(); openCart()"' : `onclick="${origAction}"`;
                let btnText = isInCart ? 'XEM GIỎ HÀNG' : 'THÊM VÀO GIỎ HÀNG';
                const btnHtmlPc = isGift 
                    ? `<button onclick="event.stopPropagation(); document.querySelector('.gift-card[data-id=\'${product.id}\']').click()">XEM THÔNG TIN</button>`
                    : `<button class="${addedClass}" data-add="${origAction}" ${actionAttr}>${btnText}</button>`;

                const btnHtmlMobile = isGift 
                    ? `<button class="btn-mobile-outline" onclick="event.stopPropagation(); document.querySelector('.gift-card[data-id=\'${product.id}\']').click()">XEM THÔNG TIN</button>`
                    : `<button class="btn-mobile-outline ${addedClass}" data-add="${origAction}" ${actionAttr}>${btnText}</button>`;

                const cardHtml = `
                  <div class="gift-card" data-id="${product.id}" data-category="${product.category || 'product'}"
                    data-tags="${tagsStr}"
                    data-price="${product.price}" onclick="openDetail(this)">
                    ${badgeHtml}
                    <div class="gift-img">
                      <img loading="lazy" src="${finalImgSrc}" alt="${product.name}">
                      <div class="gift-act hide-on-mobile">${btnHtmlPc}</div>
                    </div>
                    <div class="gift-name" style="text-align: center !important; width: 100% !important; display: block !important; font-weight: 700 !important;">${product.name}</div>
                    <div class="gift-desc" style="text-align: center !important; width: 100% !important; display: block !important;">${product.desc || ''}</div>
                    <div class="gift-price">${priceStr}</div>
                    <div class="gift-act-mobile hide-on-pc">${btnHtmlMobile}</div>
                  </div>
                `;
                productList.insertAdjacentHTML('beforeend', cardHtml);
            });
            // G?i lại bộ l?c sau khi vẽ xong
            if (typeof filterProducts === 'function') filterProducts();
        }
    } catch (err) {
        console.error("Lỗi khi tải sản phẩm từ Database:", err);
    }
}

async function fetchAndApplySettings() {
    try {
        const res = await fetch(`${API_BASE_URL}/settings?t=${Date.now()}`);
        if (!res.ok) throw new Error('API error');
        const settings = await res.json();
        
        // Zalo
        if (settings['zalo_link']) {
            const zaloBtn = document.querySelector('.fc-zalo');
            if (zaloBtn) zaloBtn.href = settings['zalo_link'];
        }
        
        // Messenger
        if (settings['messenger_link']) {
            const msgrBtn = document.querySelector('.fc-messenger');
            if (msgrBtn) msgrBtn.href = settings['messenger_link'];
        }
        
        // Phone
        if (settings['phone_number']) {
            const phoneBtn = document.querySelector('.fc-phone');
            if (phoneBtn) phoneBtn.href = settings['phone_number'];
        }

        // Announcement
        if (settings['announcement_text']) {
            const ab = document.getElementById('announcement-bar');
            const abt = document.getElementById('dyn-announcement');
            if (ab && abt) {
                abt.innerText = settings['announcement_text'];
                ab.style.display = 'block';
            }
        }

        // Footer Dynamic Data
        if (settings['company_name']) {
            const el = document.getElementById('dyn-company-name');
            if (el) el.innerText = settings['company_name'];
        }
        if (settings['company_address']) {
            const el = document.getElementById('dyn-company-address');
            if (el) el.innerText = settings['company_address'];
        }
        if (settings['company_email']) {
            const el = document.getElementById('dyn-company-email');
            if (el) el.innerText = settings['company_email'];
        }
        if (settings['footer_copyright']) {
            const el = document.getElementById('dyn-footer-copyright');
            if (el) el.innerText = settings['footer_copyright'];
        }
    } catch (err) {
        console.error("Lỗi khi tải cài đặt:", err);
    }
}

async function fetchAndRenderBanners() {
    try {
        const res = await fetch(`${API_BASE_URL}/banners?t=${Date.now()}`);
        if (!res.ok) throw new Error('API error');
        const banners = await res.json();
        
        const sliderContainer = document.getElementById('customer-slider');
        if (!sliderContainer) return;
        
        if (banners && banners.length > 0) {
            sliderContainer.innerHTML = '';
            banners.forEach(banner => {
                let html = `<div style="min-width:100%; position:relative;">`;
                if (banner.linkUrl) {
                    html += `<a href="${banner.linkUrl}"><img src="${banner.imageUrl}" alt="${banner.altText || ''}" style="width:100%; height:auto; display:block;"></a>`;
                } else {
                    html += `<img src="${banner.imageUrl}" alt="${banner.altText || ''}" style="width:100%; height:auto; display:block;">`;
                }
                html += `</div>`;
                sliderContainer.insertAdjacentHTML('beforeend', html);
            });
            // Re-init slider if needed, but since our slider logic loops elements, it might just work.
        }
    } catch (err) {
        console.error("Lỗi khi tải Banners:", err);
    }
}

async function fetchAndApplyContentBlocks() {
    try {
        const res = await fetch(`${API_BASE_URL}/content-blocks?t=${Date.now()}`);
        if (!res.ok) throw new Error('API error');
        const blocks = await res.json();
        
        // Apply About Brand
        if (blocks['about_brand_text']) {
            const brandTitle = document.getElementById('dyn-about-brand-title');
            const brandContent = document.getElementById('dyn-about-brand-content');
            const brandImg = document.getElementById('dyn-about-brand-img');
            if (brandTitle) brandTitle.innerText = blocks['about_brand_text'].title;
            if (brandContent) brandContent.innerHTML = blocks['about_brand_text'].contentHtml;
            if (brandImg && blocks['about_brand_text'].imageUrl) brandImg.src = blocks['about_brand_text'].imageUrl;
        }

        // Apply About Mission
        if (blocks['about_mission_text']) {
            const missionTitle = document.getElementById('dyn-about-mission-title');
            const missionContent = document.getElementById('dyn-about-mission-content');
            if (missionTitle) missionTitle.innerText = blocks['about_mission_text'].title;
            if (missionContent) missionContent.innerHTML = blocks['about_mission_text'].contentHtml;
        }

    } catch (err) {
        console.error("Lỗi khi tải Content Blocks:", err);
    }
}

function navigate(pageId, filterCat = null) {
    const curr = document.getElementById(routes[currentPage]);
    if (curr) curr.classList.remove('active');

    const next = document.getElementById(routes[pageId]);
    if (!next) return;
    next.classList.add('active');
    currentPage = pageId;

    // 1. ??ng sạch menu, bộ l?c, search overlay
    document.querySelector('.header-bottom')?.classList.remove('active');
    document.querySelector('.shop-sidebar')?.classList.remove('active');
    document.querySelector('.menu-overlay')?.classList.remove('active');
    document.getElementById('search-overlay')?.classList.remove('active');
    document.body.style.overflow = '';

    // 2. Cập nhật URL hash để mỗi trang c? URL ri?ng (hỗ trợ SEO & bookmark)
    // Dùng location.hash thay vì history.pushState() vì Chrome chặn/lỗi pushState()
    // khi trang được mở bằng file:// (double-click mở trực tiếp file, không qua server).
    if (window.location.hash !== '#' + pageId) {
        window.location.hash = pageId;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 3. Cập nhật state cho c?c thanh Menu (Top & Bottom)
    if (typeof updateActiveNav === 'function') updateActiveNav(pageId);
    updateMobileNav(pageId);

    // 4. Xử l? Logic l?c sản phẩm nếu c? truy?n filterCat
    if (pageId === 'products') {
        setTimeout(() => {
            const shopSidebar = document.querySelector('.shop-sidebar');
            if (filterCat === 'loai-qua-tang') {
                if (shopSidebar) shopSidebar.style.display = 'none';
            } else {
                if (shopSidebar) shopSidebar.style.display = '';
            }

            if (filterCat) {
                const cbAll = document.getElementById('cb-all');
                if (cbAll) cbAll.checked = false;
                document.querySelectorAll('.shop-sidebar input[type="checkbox"]:not(#cb-all)').forEach(cb => {
                    cb.checked = (cb.value === filterCat);
                });
            } else {
                const cbAll = document.getElementById('cb-all');
                if (cbAll) cbAll.checked = true;
                document.querySelectorAll('.shop-sidebar input[type="checkbox"]:not(#cb-all)').forEach(cb => {
                    cb.checked = false;
                });
                if (typeof clearFilters === 'function') clearFilters(false);
            }
            if (typeof filterProducts === 'function') filterProducts();
        }, 100);
    }

    // 5. Khởi tạo lại n?t Heart Wishlist
    setTimeout(() => {
        if (typeof injectHeartButtons === 'function') injectHeartButtons();
        if (typeof updateHeartButtons === 'function') updateHeartButtons();
        if (pageId === 'product-detail' && typeof injectDetailWishBtn === 'function') injectDetailWishBtn();
    }, 150);

    // 6. Lazy-load ảnh trong page mới hiển thị
    next.querySelectorAll('img[data-src]').forEach(img => {
        if (!img.src || img.src === '') {
            img.src = img.dataset.src;
        }
    });
}

// H?m bật/tắt menu mobile
function toggleMenu() {
    const nav = document.querySelector('.header-bottom');
    const overlay = document.querySelector('.menu-overlay');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
}

function updateActiveNav(pageId) {
    document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active-link'));
    if (pageId === 'home') document.querySelector('#nav-home')?.classList.add('active-link');
    if (pageId === 'products') document.querySelector('#nav-products')?.classList.add('active-link');
    if (pageId.startsWith('about')) document.querySelector('#nav-about')?.classList.add('active-link');
    if (pageId.startsWith('spa')) document.querySelector('#nav-spa')?.classList.add('active-link');
    if (pageId.startsWith('gift')) document.querySelector('#nav-gift-main')?.classList.add('active-link');
    if (pageId === 'commitment') document.querySelector('#nav-commit')?.classList.add('active-link');
}

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && routes[hash] && hash !== currentPage) {
        navigate(hash);
    }
});

window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && routes[hash] && hash !== currentPage) {
        navigate(hash);
    } else if (!hash) {
        navigate('home');
    }
});

window.addEventListener('load', async () => {
    await fetchAndRenderProducts(); // Tải sản phẩm từ Database
    await fetchAndApplySettings(); // Tải cài đặt
    await fetchAndRenderBanners();
    await fetchAndApplyContentBlocks();
    const hash = window.location.hash.replace('#', '');
    if (hash && routes[hash]) navigate(hash);
    else updateActiveNav('home');
});

function switchPriceTab(btn, tabId) {
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.pricing-table-wrap').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(tabId)?.classList.add('active');
}

window.addEventListener('scroll', () => {
    const h = document.getElementById('main-header');
    if (window.scrollY > 40) h.classList.add('scrolled');
    else h.classList.remove('scrolled');
});

function startCountdown() {
    const target = new Date(Date.now() + 7 * 24 * 3600 * 1000 + 14 * 3600 * 1000 + 32 * 60 * 1000);
    setInterval(() => {
        const now = new Date();
        const diff = target - now;
        if (diff <= 0) return;
        const pad = n => String(n).padStart(2, '0');
        ['cd-d', 'cd-h', 'cd-m', 'cd-s'].forEach((id, i) => {
            const el = document.getElementById(id);
            if (el) el.textContent = pad([Math.floor(diff / 86400000), Math.floor((diff % 86400000) / 3600000), Math.floor((diff % 3600000) / 60000), Math.floor((diff % 60000) / 1000)][i]);
        });
    }, 1000);
}
startCountdown();

/* ================================================================
SẢN PHẨM: BỘ LỌC ?? B? X?A THEO Y??U CẦU CỦA USER
================================================================ */
function filterProducts() {
    const cbAll = document.getElementById('cb-all');
    const cbs = document.querySelectorAll('.shop-sidebar input[type="checkbox"]:not(#cb-all)');
    let hasCheck = false;
    cbs.forEach(cb => { if(cb.checked) hasCheck = true; });
    
    if (window.event && window.event.target && window.event.target.id === 'cb-all' && cbAll && cbAll.checked) {
        cbs.forEach(cb => cb.checked = false);
        hasCheck = false;
    } else if (hasCheck && cbAll) {
        cbAll.checked = false;
    } else if (!hasCheck && cbAll) {
        cbAll.checked = true;
    }

    const checkedCats = Array.from(document.querySelectorAll('.shop-sidebar input[type="checkbox"]:not(#cb-all):checked')).map(cb => cb.value);
    const productCards = document.querySelectorAll('#product-list .gift-card');
    
    productCards.forEach(card => {
        const tags = card.getAttribute('data-tags') || '';
        const category = card.getAttribute('data-category') || 'product';
        
        if (!hasCheck) {
            // Khi chọn "Tất cả", ẩn các sản phẩm quà tặng (có tag loai-qua-tang hoặc category='gift' hoặc giá = 0)
            const isGift = category === 'gift' || tags.includes('loai-qua-tang') || parseInt(card.getAttribute('data-price')) === 0;
            if (isGift) {
                card.classList.add('hidden-card');
            } else {
                card.classList.remove('hidden-card');
            }
        } else {
            const match = checkedCats.some(cat => tags.includes(cat));
            if (match) {
                card.classList.remove('hidden-card');
            } else {
                card.classList.add('hidden-card');
            }
        }
    });
}


const cpSlides = document.querySelectorAll('.cp-slide');
let currentCpSlide = 0, cpSlideInterval;
function showCpSlide(index) {
    if (cpSlides.length === 0) return;
    cpSlides[currentCpSlide].classList.remove('active');
    currentCpSlide = (index + cpSlides.length) % cpSlides.length;
    cpSlides[currentCpSlide].classList.add('active');
}

function nextCpSlide() { showCpSlide(currentCpSlide + 1); }
if (cpSlides.length > 0) {
    cpSlideInterval = setInterval(nextCpSlide, 4000);
    document.querySelectorAll('.cp-nav-next').forEach(btn => {
        btn.addEventListener('click', () => { clearInterval(cpSlideInterval); nextCpSlide(); cpSlideInterval = setInterval(nextCpSlide, 4000); });
    });
    cpDots.forEach((dot, index) => {
        dot.addEventListener('click', () => { clearInterval(cpSlideInterval); showCpSlide(index); cpSlideInterval = setInterval(nextCpSlide, 4000); });
    });
}

const mhSlides = document.querySelectorAll('.mh-slide');
const mhDots = document.querySelectorAll('.mh-dot');
let currentMHSlide = 0, mhInterval;
function goToMHSlide(index) {
    if (mhSlides.length === 0) return;
    mhSlides[currentMHSlide].classList.remove('active');
    if (mhDots[currentMHSlide]) mhDots[currentMHSlide].classList.remove('active');
    currentMHSlide = index;
    mhSlides[currentMHSlide].classList.add('active');
    if (mhDots[currentMHSlide]) mhDots[currentMHSlide].classList.add('active');
}
function startMHSlider() { mhInterval = setInterval(() => { goToMHSlide((currentMHSlide + 1) % mhSlides.length); }, 5000); }
if (mhSlides.length > 0) {
    startMHSlider();
    mhDots.forEach((dot, idx) => { dot.addEventListener('click', () => { clearInterval(mhInterval); goToMHSlide(idx); startMHSlider(); }); });
}

const promoSlides = document.querySelectorAll('.promo-slide');
const promoDots = document.querySelectorAll('.promo-dot');
let currentPromoSlide = 0, promoInterval;
function goToPromoSlide(index) {
    if (promoSlides.length === 0) return;
    promoSlides[currentPromoSlide].classList.remove('active');
    if (promoDots[currentPromoSlide]) promoDots[currentPromoSlide].classList.remove('active');
    currentPromoSlide = index;
    promoSlides[currentPromoSlide].classList.add('active');
    if (promoDots[currentPromoSlide]) promoDots[currentPromoSlide].classList.add('active');
}
function startPromoSlider() { promoInterval = setInterval(() => { goToPromoSlide((currentPromoSlide + 1) % promoSlides.length); }, 4000); }
if (promoSlides.length > 0) {
    startPromoSlider();
    promoDots.forEach(dot => { dot.addEventListener('click', (e) => { clearInterval(promoInterval); goToPromoSlide(parseInt(e.target.getAttribute('data-index'))); startPromoSlider(); }); });
}

const expSlides = document.querySelectorAll('.expert-slide');
let currentExpSlide = 0, expInterval;
function showExpSlide(index) {
    if (expSlides.length === 0) return;
    expSlides[currentExpSlide].classList.remove('active');
    currentExpSlide = (index + expSlides.length) % expSlides.length;
    expSlides[currentExpSlide].classList.add('active');
}
function expertSlide(step) { clearInterval(expInterval); showExpSlide(currentExpSlide + step); startExpSlider(); }
function startExpSlider() { expInterval = setInterval(() => { showExpSlide(currentExpSlide + 1); }, 5000); }
if (expSlides.length > 0) { startExpSlider(); }

/* ================================================================
   H?M CHI TIẾT SẢN PHẨM & DỮ LIỆU ?ỘNG
   ================================================================ */

let currentProductGallery = [];
let currentImageIndex = 0;

// H?m cắt đu?i size ảnh (-247x296) để ?p tr?nh duyệt load ảnh gốc HD
function getHighResUrl(url) {
    if (!url) return "";
    return url.replace(/-\d+x\d+(?=\.\w+$)/, '');
}

function changeSpImage(index) {
    if (currentProductGallery.length === 0) return;

    // Trượt v?ng lặp
    if (index < 0) index = currentProductGallery.length - 1;
    if (index >= currentProductGallery.length) index = 0;

    currentImageIndex = index;

    // ?ổi ảnh to
    document.getElementById('pd-img-main').src = currentProductGallery[currentImageIndex];
    const imgBox = document.querySelector('.sp-main-img-box');
    if (imgBox) {
        if (currentImageIndex === 0) {
            imgBox.classList.remove('full-frame');
        } else {
            imgBox.classList.add('full-frame');
        }
    }

    // Cập nhật vi?n cho ảnh nh?
    const thumbItems = document.querySelectorAll('.sp-thumb-item');
    thumbItems.forEach((item, idx) => {
        if (idx === currentImageIndex) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            item.classList.remove('active');
        }
    });
}

// Bấm mũi t?n ảnh to
document.querySelector('.sp-nav-left').addEventListener('click', () => {
    changeSpImage(currentImageIndex - 1);
});
document.querySelector('.sp-nav-right').addEventListener('click', () => {
    changeSpImage(currentImageIndex + 1);
});

function toggleSpAcc(el) {
    const item = el.parentElement;
    item.classList.toggle('active');
    const body = item.querySelector('.sp-acc-body');
    body.style.display = item.classList.contains('active') ? 'block' : 'none';
}

function increaseQty() {
    const input = document.getElementById('qty-input');
    input.value = parseInt(input.value) + 1;
}

function decreaseQty() {
    const input = document.getElementById('qty-input');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function openDetail(element) {
    // ?p JS hiểu cả class ở ngo?i trang chủ (.fp-img, .cp-product-img)
    const imgEl = element.querySelector('.gift-img img, .fp-img img, .cp-product-img');
    const nameEl = element.querySelector('.gift-name, .fp-info h4, .cp-product-col h3');
    const priceEl = element.querySelector('.gift-price, .fp-price, .cp-price');

    const imgSrc = imgEl ? imgEl.src : '';
    const name = nameEl ? nameEl.innerText : 'Sản phẩm Lucenva';
    const price = priceEl ? priceEl.innerText : 'Liên hệ';

    // Bắt buộc phải c? data-id th? mới nạp được data
    const productId = element.getAttribute('data-id');
    if (!productId) {
        console.error("Lỗi: Khối n?y chưa được gắn data-id!");
        return;
    }

    const dbProduct = allProducts.find(p => p.id === productId);
    const specificData = dbProduct || (typeof productDatabase !== 'undefined' ? productDatabase[productId] : {}) || {};
    const details = { ...(typeof defaultProductInfo !== 'undefined' ? defaultProductInfo : {}), ...specificData };

    currentProductGallery = details.gallery && details.gallery.length > 0
        ? details.gallery.map(getHighResUrl)
        : [getHighResUrl(imgSrc)];

    currentImageIndex = 0;

    document.getElementById('pd-img-main').src = currentProductGallery[0];
    const imgBox = document.querySelector('.sp-main-img-box');
    if (imgBox) imgBox.classList.remove('full-frame');
    document.getElementById('pd-img-main').onerror = function() {
        this.onerror = null;
        this.src = 'https://md-care.vn/wp-content/uploads/2025/08/back-tron-copy-1024x1024.png';
    };
    document.getElementById('pd-name').innerText = name;
    document.getElementById('pd-breadcrumb-name').innerText = name;
    document.getElementById('ssb-name').innerText = name;
    document.getElementById('pd-sub-name').innerText = details.subName;
    document.getElementById('pd-top-desc').innerHTML = sanitizeHTML(details.topDesc);
    document.getElementById('pd-price').innerText = price;
    
    // An nut mua hang neu la qua tang
    const actionBox = document.querySelector('.sp-action-box');
    const stickyBtn = document.querySelector('.sp-sticky-bar .btn-dark');
    let noticeBox = document.getElementById('gift-notice');
    
    const dataPrice = element.getAttribute('data-price');
    const isGiftDetail = parseInt(price) === 0 || details.price === 0 || parseInt(dataPrice) === 0 || (price && price.toLowerCase().includes('quà tặng')) || (details.tags && details.tags.includes('loai-qua-tang'));
    
    if (isGiftDetail) {
        if (actionBox) actionBox.style.display = 'none';
        if (stickyBtn) stickyBtn.style.display = 'none';
        if (!noticeBox && actionBox) {
            noticeBox = document.createElement('div');
            noticeBox.id = 'gift-notice';
            noticeBox.style.color = '#c4a46d';
            noticeBox.style.fontWeight = 'bold';
            noticeBox.style.padding = '15px';
            noticeBox.style.border = '1px dashed #c4a46d';
            noticeBox.style.borderRadius = '8px';
            noticeBox.style.textAlign = 'center';
            noticeBox.style.marginBottom = '20px';
            noticeBox.innerText = 'Sản phẩm này là quà tặng kèm, không bán lẻ.';
            actionBox.parentNode.insertBefore(noticeBox, actionBox);
        } else if (noticeBox) {
            noticeBox.style.display = 'block';
        }
    } else {
        if (actionBox) actionBox.style.display = '';
        if (stickyBtn) stickyBtn.style.display = '';
        if (noticeBox) noticeBox.style.display = 'none';
    }

    document.getElementById('pd-review-name').innerText = name;
    
    // Lưu ID sản phẩm cho form H?i ??p
    const qaBtn = document.getElementById('qa-submit-btn');
    if (qaBtn) qaBtn.dataset.id = productId;

    const updateSection = (id, content) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = sanitizeHTML(content);
            const parent = el.closest('.sp-mini-sec') || el.closest('.sp-acc-item');
            if (parent) {
                parent.style.display = content ? 'block' : 'none';
            }
        }
    };

    updateSection('pd-cong-dung', details.congDung);
    updateSection('pd-ket-qua', details.ketQua);
    updateSection('pd-hoat-chat', details.hoatChat);

    const cdList = document.getElementById('pd-cong-dung-chinh');
    if (cdList) {
        cdList.innerHTML = '';
        const parent = cdList.closest('.sp-acc-item');
        if (details.congDungChinh && details.congDungChinh.length > 0) {
            details.congDungChinh.forEach(feat => {
                const li = document.createElement('li');
                li.innerHTML = sanitizeHTML(feat);
                cdList.appendChild(li);
            });
            if (parent) parent.style.display = 'block';
        } else {
            if (parent) parent.style.display = 'none';
        }
    }

    updateSection('pd-co-che', details.coChe);
    updateSection('pd-huong-dan', details.huongDan);
    updateSection('pd-thanh-phan', details.thanhPhan);
    updateSection('pd-cong-nghe', details.congNghe);

    // --- CẬP NHẬT LABEL ACCORDION THEO TỪNG SẢN PHẨM ---
    const defaultAccLabels = [
        'Công dụng chính',
        'Cơ chế tác dụng',
        'Hướng dẫn sử dụng',
        'Bảng thành phần',
        'Công nghệ & Khoa học'
    ];
    const accLabels = details.accordionTitles || defaultAccLabels;
    const accHeads = document.querySelectorAll('.sp-acc-head');
    accHeads.forEach((head, i) => {
        if (accLabels[i]) {
            // Giữ lại icon <i> ở cuối, chỉ thay text
            const icon = head.querySelector('i');
            head.textContent = accLabels[i] + ' ';
            if (icon) head.appendChild(icon);
        }
    });

    let thumbsBox = document.getElementById('pd-thumbs');
    let wrapper = document.getElementById('sp-thumbs-wrapper');

    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.id = 'sp-thumbs-wrapper';
        wrapper.className = 'sp-thumbs-wrapper';
        thumbsBox.parentNode.insertBefore(wrapper, thumbsBox);

        let prevBtn = document.createElement('button');
        prevBtn.className = 'thumb-nav thumb-prev';
        prevBtn.innerHTML = '<i class="fas fa-angle-left"></i>';
        prevBtn.onclick = () => {
            thumbsBox.scrollBy({ left: -(thumbsBox.clientWidth), behavior: 'smooth' });
        };

        let nextBtn = document.createElement('button');
        nextBtn.className = 'thumb-nav thumb-next';
        nextBtn.innerHTML = '<i class="fas fa-angle-right"></i>';
        nextBtn.onclick = () => {
            thumbsBox.scrollBy({ left: thumbsBox.clientWidth, behavior: 'smooth' });
        };

        wrapper.appendChild(prevBtn);
        wrapper.appendChild(thumbsBox);
        wrapper.appendChild(nextBtn);
    }

    thumbsBox.innerHTML = '';
    currentProductGallery.forEach((url, idx) => {
        const div = document.createElement('div');
        div.className = idx === 0 ? 'sp-thumb-item active' : 'sp-thumb-item';
        div.onclick = function () { changeSpImage(idx); };
        div.innerHTML = `<img src="${url}" alt="thumb" onerror="this.onerror=null; this.src='https://md-care.vn/wp-content/uploads/2025/08/back-tron-copy-1024x1024.png'">`;
        thumbsBox.appendChild(div);
    });

    document.getElementById('qty-input').value = 1;
    document.querySelectorAll('.sp-acc-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.sp-acc-body').style.display = 'none';
    });

    navigate('product-detail');
}

/* ================================================================
   ================================================================ */

// TOGGLE MENU (N??T 3 GẠCH) — ghi đ? bản ở tr?n
function toggleMenu() {
    document.querySelector('.header-bottom')?.classList.toggle('active');
    document.querySelector('.menu-overlay')?.classList.toggle('active');
    document.body.style.overflow = document.querySelector('.header-bottom')?.classList.contains('active') ? 'hidden' : '';
}

// 3. TOGGLE FILTER (BỘ LỌC SẢN PHẨM)
function toggleFilter() {
    document.querySelector('.shop-sidebar')?.classList.toggle('active');
    document.querySelector('.menu-overlay')?.classList.toggle('active');
    document.body.style.overflow = document.querySelector('.shop-sidebar')?.classList.contains('active') ? 'hidden' : '';
}

// 4. LOGIC T?M KIẾM — T?m theo t?n, tag, m? tả
function toggleSearch() {
    const searchWrap = document.getElementById('search-overlay');
    if (searchWrap) {
        searchWrap.classList.toggle('active');
        if (searchWrap.classList.contains('active')) document.getElementById('search-input').focus();
    }
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    if (currentPage !== 'products') { navigate('products'); }

    const productCards = document.querySelectorAll('#product-list .gift-card');
    let matchCount = 0;

    productCards.forEach(card => {
        const name = (card.querySelector('.gift-name')?.innerText || '').toLowerCase();
        const desc = (card.querySelector('.gift-desc')?.innerText || '').toLowerCase();
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();

        if (!query || name.includes(query) || desc.includes(query) || tags.includes(query)) {
            card.style.display = 'block';
            matchCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Hiện th?ng b?o khi kh?ng t?m thấy
    let noResult = document.getElementById('search-no-result');
    if (!noResult) {
        noResult = document.createElement('div');
        noResult.id = 'search-no-result';
        noResult.style.cssText = 'text-align:center;padding:60px 20px;color:#999;font-size:16px;display:none;';
        noResult.innerHTML = '<i class="fas fa-search" style="font-size:40px;margin-bottom:16px;display:block;color:#ddd;"></i><p>Không tìm thấy sản phẩm phù hợp</p>';
        document.getElementById('product-list')?.parentNode?.appendChild(noResult);
    }
    noResult.style.display = (query && matchCount === 0) ? 'block' : 'none';
}

/* ================================================================
   FORM HANDLING — Validation & gửi form
   ================================================================ */
function handleFormSubmit(formEl, successMsg) {
    // H?m n?y giữ lại để kh?ng bị lỗi nếu c?n s?t ở đ?u đ?
    console.warn("handleFormSubmit deprecated.");
    return false;
}



async function submitQAForm() {
    const content = document.getElementById('qa-content').value.trim();
    const name = document.getElementById('qa-name').value.trim();
    const email = document.getElementById('qa-email').value.trim();
    const genderEl = document.querySelector('input[name="gender"]:checked');
    const gender = genderEl ? genderEl.value : null;
    
    const btn = document.getElementById('qa-submit-btn');
    const productId = btn.dataset.id || 'unknown';

    if (!content || !name) {
        showToast('<i class="fas fa-exclamation-triangle" style="color:#f59e0b"></i> Vui lòng nhập nội dung hỏi đáp và Họ tên.');
        return;
    }
    
    btn.disabled = true;
    const oldText = btn.innerHTML;
    btn.innerHTML = 'ĐANG GỬI...';

    try {
        const res = await fetch(`${API_BASE_URL}/product-qa`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, gender, name, email, content })
        });
        if (res.ok) {
            showToast('<i class="fas fa-check-circle" style="color:#4ade80"></i> Cảm ơn bạn đã đóng góp câu hỏi!');
            document.getElementById('qa-content').value = '';
            document.getElementById('qa-name').value = '';
            document.getElementById('qa-email').value = '';
            if (genderEl) genderEl.checked = false;
        } else {
            const data = await res.json().catch(() => ({}));
            showToast(`<i class="fas fa-exclamation-triangle" style="color:#e74c3c"></i> ${data.error || 'Có lỗi xảy ra.'}`);
        }
    } catch (err) {
        showToast('<i class="fas fa-exclamation-triangle" style="color:#e74c3c"></i> Không thể kết nối tới máy chủ.');
    } finally {
        btn.disabled = false;
        btn.innerHTML = oldText;
    }
}

async function handleNewsletterSubmit(inputEl) {
    if (!inputEl) return;
    const email = inputEl.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        inputEl.style.borderColor = '#e74c3c';
        showToast('<i class="fas fa-exclamation-triangle" style="color:#f59e0b"></i> Vui lòng nhập email hợp lệ');
        return;
    }
    inputEl.style.borderColor = '';
    
    try {
        const res = await fetch(`${API_BASE_URL}/newsletter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (res.ok) {
            inputEl.value = '';
            showToast('<i class="fas fa-check-circle" style="color:#4ade80"></i> Đăng ký nhận tin thành công!');
        } else {
            const data = await res.json();
            showToast(`<i class="fas fa-info-circle" style="color:#f59e0b"></i> ${data.error || 'C? lỗi xảy ra'}`);
        }
    } catch (err) {
        showToast('<i class="fas fa-exclamation-triangle" style="color:#e74c3c"></i> Lỗi kết nối m?y chủ.');
    }
}

// 5. SỰ KIỆN CLICK OVERLAY V? MENU CON
document.addEventListener('DOMContentLoaded', () => {
    // Nhấp n?n đen đ?ng m?i thứ
    const overlay = document.querySelector('.menu-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            document.querySelector('.shop-sidebar')?.classList.remove('active');
            document.querySelector('.header-bottom')?.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Xổ menu con tr?n mobile (Hỗ trợ nhi?u cấp)
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            const parentLi = this.parentElement;
            const dropdown = this.nextElementSibling;
            if (window.innerWidth <= 1024 && dropdown && (dropdown.classList.contains('dropdown') || dropdown.classList.contains('submenu'))) {
                e.preventDefault();
                // ??ng c?c menu c?ng cấp kh?ng li?n quan
                const siblings = parentLi.parentElement.children;
                for (let i = 0; i < siblings.length; i++) {
                    if (siblings[i] !== parentLi) {
                        siblings[i].classList.remove('open');
                    }
                }
                parentLi.classList.toggle('open');
            }
        });
    });

    // Fetch and apply dynamic settings from backend
    fetchAndApplySettings();
    
    // Fetch and render products
    fetchAndRenderProducts();
});

function navigateToProduct(productId) {
    if (!allProducts || allProducts.length === 0) {
        setTimeout(() => navigateToProduct(productId), 500);
        return;
    }
    const dbProduct = allProducts.find(p => p.id === productId);
    if (!dbProduct) {
        console.error('Không tìm thấy sản phẩm: ' + productId);
        return;
    }

    const dummyEl = document.createElement('div');
    dummyEl.setAttribute('data-id', productId);

    const imgEl = document.createElement('img');
    imgEl.src = dbProduct.imgSrc || '';

    const nameEl = document.createElement('h3');
    nameEl.innerText = dbProduct.name || '';

    const priceEl = document.createElement('span');
    const isGift = dbProduct.category === 'gift' || parseInt(dbProduct.price) === 0;
    priceEl.innerText = isGift ? 'Quà tặng' : dbProduct.price.toLocaleString() + 'đ';

    dummyEl.appendChild(imgEl);
    dummyEl.appendChild(nameEl);
    dummyEl.appendChild(priceEl);

    dummyEl.querySelector = function(sel) {
        if (sel.includes('img')) return imgEl;
        if (sel.includes('name') || sel.includes('h3')) return nameEl;
        if (sel.includes('price')) return priceEl;
        return null;
    };

    navigate('product-detail');
    setTimeout(() => {
        if (typeof openDetail === 'function') openDetail(dummyEl);
    }, 100);
}



// Back to top visibility logic
window.addEventListener('scroll', () => {
    const btt = document.getElementById('back-to-top');
    if (btt) {
        if (window.scrollY > 300) {
            btt.classList.add('show');
        } else {
            btt.classList.remove('show');
        }
    }
});


window.updateProductButtons = function() {
    if (typeof cart === 'undefined') return;
    const cartIds = cart.map(item => item.id);
    document.querySelectorAll('.gift-card').forEach(card => {
        const id = card.getAttribute('data-id');
        if (!id) return;
        const name = (card.querySelector('.gift-name')?.innerText || '').replace(/'/g, "\\'");
        const price = card.getAttribute('data-price') || '0';
        const category = card.getAttribute('data-category') || 'product';
        const imgNode = card.querySelector('.gift-img img');
        const imgSrc = imgNode ? imgNode.src : '';
        const isGift = category === 'gift' || parseInt(price) === 0;

        const origAction = `event.stopPropagation(); addToCart('${id}', '${name}', '${price}', '${imgSrc}')`;
        const giftAction = `event.stopPropagation(); this.closest('.gift-card').click()`;

        const mobileBtn = card.querySelector('.gift-act-mobile button');
        if (mobileBtn) {
            if (isGift) {
                mobileBtn.innerText = 'XEM THÔNG TIN';
                mobileBtn.classList.remove('btn-added-to-cart');
                mobileBtn.setAttribute('onclick', giftAction);
            } else if (cartIds.includes(id)) {
                mobileBtn.innerText = 'XEM GIỎ HÀNG';
                mobileBtn.classList.add('btn-added-to-cart');
                mobileBtn.setAttribute('onclick', "event.stopPropagation(); openCart()");
            } else {
                mobileBtn.innerText = 'THÊM VÀO GIỎ HÀNG';
                mobileBtn.classList.remove('btn-added-to-cart');
                mobileBtn.setAttribute('onclick', origAction);
            }
        }

        const pcBtn = card.querySelector('.gift-act button');
        if (pcBtn) {
            if (isGift) {
                pcBtn.innerText = 'XEM THÔNG TIN';
                pcBtn.classList.remove('btn-added-to-cart');
                pcBtn.setAttribute('onclick', giftAction);
            } else if (cartIds.includes(id)) {
                pcBtn.innerText = 'XEM GIỎ HÀNG';
                pcBtn.classList.add('btn-added-to-cart');
                pcBtn.setAttribute('onclick', "event.stopPropagation(); openCart()");
            } else {
                pcBtn.innerText = 'THÊM VÀO GIỎ HÀNG';
                pcBtn.classList.remove('btn-added-to-cart');
                pcBtn.setAttribute('onclick', origAction);
            }
        }
    });
};
