const fs = require('fs');
let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');

// 1. Separate gifts from products
// Find the gift cards that are actually gifts (e.g., Set Quà Tặng VIP Luxury, etc.)
// Wait, the user's gifts are hardcoded in product-list.
const productListMatch = html.match(/<div class="gift-grid shop-grid" id="product-list">([\s\S]*?)<\/div>\s*<\/main>/);
if (productListMatch) {
    let innerHtml = productListMatch[1];
    
    // Split into actual products (sp22-sp25) and gifts
    const cards = innerHtml.split(/<div class="gift-card"/g).filter(c => c.trim().length > 0).map(c => '<div class="gift-card"' + c);
    
    let productsHtml = [];
    let giftsHtml = [];
    
    cards.forEach(card => {
        if (card.includes('sp22') || card.includes('sp23') || card.includes('sp24') || card.includes('sp25') || card.includes('NMN.C+ Glow Sun Cream') || card.includes('PEP.G+ Priming Cleansing Gel')) {
            productsHtml.push(card);
        } else {
            // It's a gift!
            // Ensure the text says "Quà tặng" instead of price
            let processedGift = card;
            if (processedGift.includes('gift-price')) {
                processedGift = processedGift.replace(/<div class="gift-price">.*?<\/div>/, '<div class="gift-price">Quà tặng</div>');
            }
            // Ensure button says XEM THÊM
            if (processedGift.includes('<button>THÊM VÀO GIỎ HÀNG</button>')) {
                processedGift = processedGift.replace('<button>THÊM VÀO GIỎ HÀNG</button>', '<button onclick="event.stopPropagation(); this.closest(\'.gift-card\').click()">XEM THÊM</button>');
            } else if (processedGift.includes('<button>Thêm Vào Giỏ</button>')) {
                processedGift = processedGift.replace('<button>Thêm Vào Giỏ</button>', '<button onclick="event.stopPropagation(); this.closest(\'.gift-card\').click()">XEM THÊM</button>');
            }
            // Add an ID or data-gift so it can be targeted
            if (processedGift.includes('Set Quà Tặng VIP Luxury') || processedGift.includes('Túi Luxury')) {
                processedGift = processedGift.replace('class="gift-card"', 'class="gift-card" id="gift-luxury"');
            } else if (processedGift.includes('Túi nhẹ nhàng') || processedGift.includes('Túi Nhẹ Nhàng')) {
                processedGift = processedGift.replace('class="gift-card"', 'class="gift-card" id="gift-nhenhang"');
            } else if (processedGift.includes('túi quai nâu') || processedGift.includes('Túi quai nâu')) {
                processedGift = processedGift.replace('class="gift-card"', 'class="gift-card" id="gift-quainau"');
            } else if (processedGift.includes('túi to in hình') || processedGift.includes('Túi to in hình')) {
                processedGift = processedGift.replace('class="gift-card"', 'class="gift-card" id="gift-toinhinh"');
            }
            giftsHtml.push(processedGift);
        }
    });

    // Replace product list with ONLY products
    const newProductList = '<div class="gift-grid shop-grid" id="product-list">\n' + productsHtml.join('\n') + '\n</div>';
    html = html.replace(productListMatch[0], newProductList + '\n          </main>');

    // Create a new #page-gifts if it doesn't exist, or replace an old one
    const newGiftsPage = `
    <!-- PAGE: QUÀ TẶNG -->
    <div class="page" id="page-gifts">
      <div class="breadcrumb">
        <div class="container breadcrumb-inner"><a href="#" onclick="navigate('home');return false;">Trang chủ</a><i class="fas fa-chevron-right"></i><span>Quà Tặng</span></div>
      </div>
      <div class="page-hero">
        <div class="page-hero-img" style="background-image:url('https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=1920&q=80');"></div>
        <div class="container page-hero-content">
          <div class="label">Tri ân</div>
          <h1>Quà Tặng<br>Yêu Thương</h1>
        </div>
      </div>
      <section class="gift-page">
        <div class="container">
          <div class="gift-grid shop-grid">
            ${giftsHtml.join('\n')}
          </div>
        </div>
      </section>
    </div>
    `;

    // Inject after page-products
    const pageProductsMatch = html.match(/<div class="page" id="page-products">[\s\S]*?<\/section>\s*<\/div>/);
    if (pageProductsMatch) {
        if (html.includes('id="page-gifts"')) {
            html = html.replace(/<div class="page" id="page-gifts">[\s\S]*?<\/section>\s*<\/div>/, newGiftsPage);
        } else {
            html = html.replace(pageProductsMatch[0], pageProductsMatch[0] + '\n\n' + newGiftsPage);
        }
    }
}

// 2. Update Navbar to point to gifts page and open specific gifts
html = html.replace(/<a href="#" onclick="if\(window.innerWidth > 1024\) navigate\('products'\); return false;">quà tặng yêu\s*thương <i class="fas fa-chevron-right"><\/i><\/a>/, 
    '<a href="#" onclick="if(window.innerWidth > 1024) navigate(\'gifts\'); return false;">quà tặng yêu thương <i class="fas fa-chevron-right"></i></a>');

html = html.replace(/<li><a href="#" onclick="navigate\('products'\);return false;">túi luxury lucenva<\/a><\/li>/, 
    '<li><a href="#" onclick="navigate(\'gifts\'); setTimeout(() => document.getElementById(\'gift-luxury\')?.click(), 300); return false;">túi luxury lucenva</a></li>');
html = html.replace(/<li><a href="#" onclick="navigate\('products'\);return false;">túi quai nâu nhỏ<\/a><\/li>/, 
    '<li><a href="#" onclick="navigate(\'gifts\'); setTimeout(() => document.getElementById(\'gift-quainau\')?.click(), 300); return false;">túi quai nâu nhỏ</a></li>');
html = html.replace(/<li><a href="#" onclick="navigate\('products'\);return false;">túi nhẹ nhàng lucenva<\/a><\/li>/, 
    '<li><a href="#" onclick="navigate(\'gifts\'); setTimeout(() => document.getElementById(\'gift-nhenhang\')?.click(), 300); return false;">túi nhẹ nhàng lucenva</a></li>');
html = html.replace(/<li><a href="#" onclick="navigate\('products'\);return false;">túi to in hình<\/a><\/li>/, 
    '<li><a href="#" onclick="navigate(\'gifts\'); setTimeout(() => document.getElementById(\'gift-toinhinh\')?.click(), 300); return false;">túi to in hình</a></li>');

// Add 'gifts' to routes in script.js
let js = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js', 'utf8');
if (!js.includes("'gifts': 'page-gifts'")) {
    js = js.replace("'products': 'page-products',", "'products': 'page-products',\n    'gifts': 'page-gifts',");
    fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js', js);
}

fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);
console.log('Step 4 & 5 applied! Gifts separated and Navbar updated.');
