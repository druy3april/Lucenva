const fs = require('fs');
let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');

// 1. Delete featured-products-section
html = html.replace(/<section class="featured-products-section">[\s\S]*?<\/section>/, '<!-- Deleted featured-products-section per user request -->');

// 2. Promo banner section (Hình ảnh KH sử dụng) -> replace with 2 auto-slide images
const newPromoHtml = `
    <!-- HÌNH ẢNH KHÁCH HÀNG SỬ DỤNG -->
    <section class="promo-banner-section">
      <div class="promo-slider" style="display:flex; overflow:hidden; position:relative;">
        <div class="promo-slide active" style="min-width:100%; transition: transform 0.5s ease-in-out;">
          <img loading="lazy" src="images/customer1.jpg" alt="Customer 1" style="width:100%; display:block; object-fit: cover;">
        </div>
        <div class="promo-slide" style="min-width:100%; transition: transform 0.5s ease-in-out;">
          <img loading="lazy" src="images/customer2.jpg" alt="Customer 2" style="width:100%; display:block; object-fit: cover;">
        </div>
      </div>
      <script>
        // Auto slider logic for Customer Images
        document.addEventListener("DOMContentLoaded", () => {
          const pSlides = document.querySelectorAll('.promo-banner-section .promo-slide');
          if(pSlides.length < 2) return;
          let pIdx = 0;
          setInterval(() => {
            pSlides[pIdx].classList.remove('active');
            pSlides[pIdx].style.transform = 'translateX(-100%)';
            pIdx = (pIdx + 1) % pSlides.length;
            pSlides[pIdx].style.transform = 'translateX(0)';
            pSlides[pIdx].classList.add('active');
          }, 3000);
        });
      </script>
    </section>
`;
html = html.replace(/<section class="promo-banner-section">[\s\S]*?<\/section>/, newPromoHtml);

fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);
console.log('Step 2 applied!');
