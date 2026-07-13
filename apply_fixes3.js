const fs = require('fs');

let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');

// 1. Restore .promo-banner-section to original 4 images
const originalPromo = `
    <!-- KHỐI BANNER CHUYỂN ẢNH TỰ ĐỘNG -->
    <section class="promo-banner-section">
      <div class="promo-slider">
        <!-- Ảnh 1 -->
        <div class="promo-slide active">
          <img loading="lazy"
            src="https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec05/1.webp"
            alt="Banner 1">
        </div>
        <!-- Ảnh 2 -->
        <div class="promo-slide">
          <img loading="lazy"
            src="https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec05/2.webp"
            alt="Banner 2">
        </div>
        <!-- Ảnh 3 -->
        <div class="promo-slide">
          <img loading="lazy"
            src="https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec05/3.webp"
            alt="Banner 3">
        </div>
        <!-- Ảnh 4 -->
        <div class="promo-slide">
          <img loading="lazy"
            src="https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec05/4.webp"
            alt="Banner 4">
        </div>
      </div>
    </section>
`;
// Replace the current promo-banner-section I injected
html = html.replace(/<!-- HÌNH ẢNH KHÁCH HÀNG SỬ DỤNG -->[\s\S]*?<section class="promo-banner-section"[\s\S]*?<\/section>/, originalPromo);


// 2. Replace .expert-feedback-section with the Customer Images slider
const customerImagesHtml = `
    <!-- HÌNH ẢNH KHÁCH HÀNG SỬ DỤNG -->
    <section class="expert-feedback-section customer-images-section" style="padding: 60px 0; background: #fafafa;">
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
// Find expert-feedback-section and replace it entirely
html = html.replace(/<section class="expert-feedback-section">[\s\S]*?<\/section>/, customerImagesHtml);

// 3. Center the commit items
// Add style to commit-item inline or via style.css
// I will just add an inline style to .commit-grid items so it's guaranteed to apply.
html = html.replace(/<div class="commit-item">/g, '<div class="commit-item" style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center;">');

// Write back
fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);
console.log('Fixes 3 applied successfully!');
