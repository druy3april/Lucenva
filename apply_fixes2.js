const fs = require('fs');

let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');
let css = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css', 'utf8');

// 1. Hero Slide 2 Deletion & Dots
html = html.replace(/<div class="mh-slide">\s*<img loading="lazy"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
html = html.replace(/<div class="mh-dots">[\s\S]*?<\/div>/, '');

// 2. Commitment Images Size
if (!css.includes('.commit-icon-circle.has-img img { padding: 0')) {
    css += `
.commit-icon-circle.has-img img {
    padding: 0 !important;
    border-radius: 50% !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
}
`;
}

// 3. Customer Images Fix (Shrink & Add Buttons)
const newPromoHtml = `
    <!-- HÌNH ẢNH KHÁCH HÀNG SỬ DỤNG -->
    <section class="promo-banner-section" style="padding: 60px 0; background: #fafafa;">
      <div class="container">
        <h2 style="text-align:center; font-family:'Playfair Display',serif; margin-bottom:40px; color:#111;">Hình Ảnh Khách Hàng Sử Dụng</h2>
        <div class="promo-slider-wrap" style="position:relative; max-width:800px; margin:0 auto; overflow:hidden; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.1);">
          <div class="promo-slider" style="display:flex; position:relative; transition: transform 0.5s ease-in-out;" id="customer-slider">
            <div class="promo-slide" style="min-width:100%;">
              <img loading="lazy" src="images/customer1.jpg" alt="Customer 1" style="width:100%; display:block; object-fit: cover;">
            </div>
            <div class="promo-slide" style="min-width:100%;">
              <img loading="lazy" src="images/customer2.jpg" alt="Customer 2" style="width:100%; display:block; object-fit: cover;">
            </div>
          </div>
          <button id="cust-prev" style="position:absolute; top:50%; left:10px; transform:translateY(-50%); background:rgba(0,0,0,0.5); color:#fff; border:none; width:40px; height:40px; border-radius:50%; cursor:pointer; z-index:10;"><i class="fas fa-chevron-left"></i></button>
          <button id="cust-next" style="position:absolute; top:50%; right:10px; transform:translateY(-50%); background:rgba(0,0,0,0.5); color:#fff; border:none; width:40px; height:40px; border-radius:50%; cursor:pointer; z-index:10;"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
      <script>
        // Customer Slider Logic
        document.addEventListener("DOMContentLoaded", () => {
          const slider = document.getElementById('customer-slider');
          if (!slider) return;
          const slides = slider.querySelectorAll('.promo-slide');
          const btnPrev = document.getElementById('cust-prev');
          const btnNext = document.getElementById('cust-next');
          let idx = 0;
          
          function updateSlider() {
            slider.style.transform = 'translateX(-' + (idx * 100) + '%)';
          }
          
          btnNext.addEventListener('click', () => {
            idx = (idx + 1) % slides.length;
            updateSlider();
          });
          
          btnPrev.addEventListener('click', () => {
            idx = (idx - 1 + slides.length) % slides.length;
            updateSlider();
          });
          
          setInterval(() => {
            idx = (idx + 1) % slides.length;
            updateSlider();
          }, 4000);
        });
      </script>
    </section>
`;
html = html.replace(/<!-- HÌNH ẢNH KHÁCH HÀNG SỬ DỤNG -->[\s\S]*?<\/section>/, newPromoHtml);

// 4. Gifts Section Images
const giftsHtml = `
          <div class="gift-grid shop-grid">
            <div class="gift-card" id="gift-luxury" data-id="gift-luxury" data-price="0" onclick="openDetail(this)">
              <div class="gift-img"><img loading="lazy" src="images/lucenva_tui_luxury.jpg" alt="Túi Luxury Lucenva">
                <div class="gift-act"><button onclick="event.stopPropagation(); this.closest('.gift-card').click()">XEM THÊM</button></div>
              </div>
              <div class="gift-name">Túi Luxury Lucenva</div>
              <div class="gift-desc">Túi xách cao cấp thiết kế sang trọng, phù hợp làm quà tặng</div>
              <div class="gift-price">Quà tặng</div>
            </div>

            <div class="gift-card" id="gift-nhenhang" data-id="gift-nhenhang" data-price="0" onclick="openDetail(this)">
              <div class="gift-img"><img loading="lazy" src="images/lucenva_tui_nhenhang.jpg" alt="Túi nhẹ nhàng">
                <div class="gift-act"><button onclick="event.stopPropagation(); this.closest('.gift-card').click()">XEM THÊM</button></div>
              </div>
              <div class="gift-name">Túi Nhẹ Nhàng</div>
              <div class="gift-desc">Túi thiết kế tinh tế, dịu dàng cho phái đẹp</div>
              <div class="gift-price">Quà tặng</div>
            </div>

            <div class="gift-card" id="gift-quainau" data-id="gift-quainau" data-price="0" onclick="openDetail(this)">
              <div class="gift-img"><img loading="lazy" src="images/tui-harmony.jpg" alt="Túi quai nâu nhỏ">
                <div class="gift-act"><button onclick="event.stopPropagation(); this.closest('.gift-card').click()">XEM THÊM</button></div>
              </div>
              <div class="gift-name">Túi Quai Nâu Nhỏ</div>
              <div class="gift-desc">Thiết kế quai nâu nhỏ gọn, tiện lợi mang theo hàng ngày</div>
              <div class="gift-price">Quà tặng</div>
            </div>

            <div class="gift-card" id="gift-toinhinh" data-id="gift-toinhinh" data-price="0" onclick="openDetail(this)">
              <div class="gift-img"><img loading="lazy" src="images/tui-thien-nhien.jpg" alt="Túi to in hình">
                <div class="gift-act"><button onclick="event.stopPropagation(); this.closest('.gift-card').click()">XEM THÊM</button></div>
              </div>
              <div class="gift-name">Túi To In Hình</div>
              <div class="gift-desc">Túi canvas lớn in họa tiết thiên nhiên, sức chứa thoải mái</div>
              <div class="gift-price">Quà tặng</div>
            </div>
          </div>
`;
html = html.replace(/<div class="gift-grid shop-grid">\s*<\/div>/, giftsHtml);


fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);
fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css', css);
console.log('Fixes applied successfully!');
