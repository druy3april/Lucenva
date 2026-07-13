const fs = require('fs');

// 1. Add subcategories to Danh mục sản phẩm and Back To Top button HTML
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

const navOrig = `<li>
            <a href="#" onclick="navigate('products');return false;" id="nav-products">Danh mục sản phẩm</a>
          </li>`;

const navNew = `<li class="has-submenu">
            <a href="#" id="nav-products" onclick="navigate('products'); return false;">Danh mục sản phẩm <i class="fas fa-chevron-down"></i></a>
            <ul class="dropdown">
              <li><a href="#" onclick="navigate('products', 'loai-sua-rua-mat');return false;">Làm sạch</a></li>
              <li><a href="#" onclick="navigate('products', 'loai-serum-kem');return false;">Tinh chất & Dưỡng da</a></li>
              <li><a href="#" onclick="navigate('products', 'loai-chong-nang');return false;">Bảo vệ (Chống nắng)</a></li>
            </ul>
          </li>`;

htmlContent = htmlContent.replace(navOrig, navNew);

if (!htmlContent.includes('back-to-top')) {
    htmlContent = htmlContent.replace('</body>', `
  <!-- Back to top button -->
  <button id="back-to-top" class="back-to-top" onclick="window.scrollTo({top:0, behavior:'smooth'})">
    <i class="fas fa-arrow-up"></i>
  </button>
</body>`);
}

fs.writeFileSync(htmlFile, htmlContent);


// 2. Add CSS for Back To Top button
const cssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

if (!cssContent.includes('.back-to-top')) {
    const bttCss = `
/* Back To Top Button */
.back-to-top {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 44px;
    height: 44px;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}
.back-to-top.show {
    opacity: 1;
    visibility: visible;
}
@media (min-width: 901px) {
    .back-to-top {
        bottom: 40px;
        right: 40px;
        width: 50px;
        height: 50px;
    }
}
`;
    cssContent += '\n' + bttCss;
    fs.writeFileSync(cssFile, cssContent);
}


// 3. Add JS logic for Back To Top button
const scriptFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js';
let scriptContent = fs.readFileSync(scriptFile, 'utf8');

if (!scriptContent.includes('back-to-top')) {
    const bttJs = `
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
`;
    scriptContent += '\n' + bttJs;
    fs.writeFileSync(scriptFile, scriptContent);
}


// Bump cache
htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="style\.css(\?v=\d+)?"/g, 'href="style.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/src="script\.js(\?v=\d+)?"/g, 'src="script.js?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Fixed menu subcategories and added back to top button');
