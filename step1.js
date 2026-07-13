const fs = require('fs');
let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');
let css = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css', 'utf8');

// 1. Hero Image Fix
// Add CSS to style.css for .mh-bg-img and .main-hero-slider
if (!css.includes('max-height: 85vh !important;')) {
    css += `
/* Hero Banner Fix */
.main-hero-slider {
    align-items: center;
    background: #fcfcfc;
}
.mh-bg-img {
    max-height: 85vh !important;
    object-fit: contain !important;
    width: 100% !important;
}
.mh-slide:not(.active) {
    display: none !important; /* Prevent inactive slide from stretching container */
}
.mh-slide.active {
    display: block !important;
    animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
`;
}

// 2. Cam Kết Từ Lucenva
// Replace commit-grid
const commitHtml = `
          <div class="commit-item">
            <div class="commit-icon-circle has-img">
              <img loading="lazy" src="images/cer-kdri-en.png" alt="KDRI EN">
            </div>
            <p class="commit-label">Dermatologically Tested in Korea</p>
          </div>

          <div class="commit-item">
            <div class="commit-icon-circle has-img">
              <img loading="lazy" src="images/cer-kdri-kor.png" alt="KDRI KOR">
            </div>
            <p class="commit-label">Human Skin Patch Test Completed</p>
          </div>

          <div class="commit-item">
            <div class="commit-icon-circle has-img">
              <img loading="lazy" src="images/cert-rd.jpg" alt="R&D">
            </div>
            <p class="commit-label">R&D chuyên cho làn da Việt Nam</p>
          </div>
`;
html = html.replace(/<div class="commit-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, 
    '<div class="commit-grid" style="grid-template-columns: repeat(3, 1fr); gap: 30px;">' + commitHtml + '</div>\n      </div>\n    </section>');

// 3. Triết Lý Khoa Học
// Replace philosophy-grid
const philoHtml = `
        <div class="philosophy-grid" style="display: flex; gap: 40px; align-items: stretch; margin-top: 40px;">
          <div class="philosophy-text-col" style="flex: 1; display: flex; flex-direction: column; gap: 20px;">
            <div class="philosophy-box" style="padding: 20px; border: 1px solid #eee; border-radius: 12px; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
              <h3 style="font-size: 15px; font-weight: 800; margin-bottom: 10px; color:#111;">1. KHƠI NGUỒN SỨC SỐNG TỪ GỐC LÀN DA</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #555; text-align: justify; margin: 0;">Lucenva được xây dựng trên triết lý cốt lõi: Vẻ đẹp thực sự bắt nguồn từ một làn da khỏe mạnh từ sâu bên trong. Lấy cảm hứng từ quá trình tái sinh tự nhiên, Lucenva đánh thức cơ chế tự phục hồi ở cấp độ tế bào.</p>
            </div>
            <div class="philosophy-box" style="padding: 20px; border: 1px solid #eee; border-radius: 12px; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
              <h3 style="font-size: 15px; font-weight: 800; margin-bottom: 10px; color:#111;">2. KHOA HỌC HIỆN ĐẠI KẾT HỢP TINH HOA TỰ NHIÊN</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #555; text-align: justify; margin: 0;">Khác biệt với các phương pháp chăm sóc da bề mặt thông thường, Lucenva tiếp cận làn da bằng các công nghệ tiên tiến nhất như Peptide, NMN, Exosome kết hợp cùng các chiết xuất thực vật quý giá, tạo ra hiệu quả nâng cơ, giảm nhăn và trẻ hóa vượt trội.</p>
            </div>
            <div class="philosophy-box" style="padding: 20px; border: 1px solid #eee; border-radius: 12px; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
              <h3 style="font-size: 15px; font-weight: 800; margin-bottom: 10px; color:#111;">3. ĐẸP BỀN VỮNG - AN TOÀN - CHUYÊN BIỆT</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #555; text-align: justify; margin: 0;">Tất cả sản phẩm đều được kiểm nghiệm da liễu nghiêm ngặt tại Viện Da Liễu Quốc Gia Hàn Quốc (KDRI), đảm bảo an toàn tối đa ngay cả với làn da nhạy cảm nhất. R&D đặc biệt dành riêng cho cấu trúc và môi trường da của người Việt Nam.</p>
            </div>
          </div>
          <div class="philosophy-img-col" style="flex: 1; display: flex;">
            <div class="philosophy-img" style="flex: 1; border-radius: 16px; overflow: hidden; position: relative; transition: all 0.4s ease;" onmouseover="this.style.boxShadow='0 0 30px rgba(100, 100, 100, 0.4)'" onmouseout="this.style.boxShadow='none'">
              <img loading="lazy" src="https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/hero/hero02.webp" alt="Triết lý Lucenva" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </div>
        </div>
`;
html = html.replace(/<div class="philosophy-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, philoHtml + '\n      </div>\n    </section>');

fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);
fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css', css);
console.log('Step 1 applied!');
