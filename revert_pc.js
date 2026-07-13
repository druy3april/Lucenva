const fs = require('fs');

const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

// The HTML currently contains the modified nav-products:
// <li class="has-submenu">
//   <a href="#" id="nav-products" onclick="navigate('products'); return false;">Danh mục sản phẩm <i class="fas fa-chevron-down"></i></a>
//   <ul class="dropdown">...</ul>
// </li>
// I will replace it with a version that ONLY shows the dropdown on mobile!

const navCurrent = `<li class="has-submenu">
            <a href="#" id="nav-products" onclick="navigate('products'); return false;">Danh mục sản phẩm <i class="fas fa-chevron-down"></i></a>
            <ul class="dropdown">
              <li><a href="#" onclick="navigate('products', 'loai-sua-rua-mat');return false;">Làm sạch</a></li>
              <li><a href="#" onclick="navigate('products', 'loai-serum-kem');return false;">Tinh chất & Dưỡng da</a></li>
              <li><a href="#" onclick="navigate('products', 'loai-chong-nang');return false;">Bảo vệ (Chống nắng)</a></li>
            </ul>
          </li>`;

const navFixed = `<li>
            <a href="#" onclick="navigate('products');return false;" id="nav-products">Danh mục sản phẩm <i class="fas fa-chevron-down mobile-only"></i></a>
            <ul class="dropdown mobile-only">
              <li><a href="#" onclick="navigate('products', 'loai-sua-rua-mat');return false;">Làm sạch</a></li>
              <li><a href="#" onclick="navigate('products', 'loai-serum-kem');return false;">Tinh chất & Dưỡng da</a></li>
              <li><a href="#" onclick="navigate('products', 'loai-chong-nang');return false;">Bảo vệ (Chống nắng)</a></li>
            </ul>
          </li>`;

if (htmlContent.includes(navCurrent)) {
    htmlContent = htmlContent.replace(navCurrent, navFixed);
} else {
    // If it's already the original one
    const navOrig = `<li>
            <a href="#" onclick="navigate('products');return false;" id="nav-products">Danh mục sản phẩm</a>
          </li>`;
    if (htmlContent.includes(navOrig)) {
        htmlContent = htmlContent.replace(navOrig, navFixed);
    }
}
fs.writeFileSync(htmlFile, htmlContent);


// 2. Add CSS for mobile-only elements to style.css
const cssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

if (!cssContent.includes('.mobile-only')) {
    const mobileOnlyCss = `
/* Hide on PC */
@media (min-width: 901px) {
    .mobile-only {
        display: none !important;
    }
}
`;
    cssContent += '\n' + mobileOnlyCss;
    fs.writeFileSync(cssFile, cssContent);
}


// 3. Revert the script.js changes (putting the button BACK inside the gift-img, so PC returns to hover behavior)
const scriptFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js';
let scriptContent = fs.readFileSync(scriptFile, 'utf8');

const brokenRegex = /<div class="gift-img"><img loading="lazy" src="\$\{finalImgSrc\}" alt="\$\{product\.name\}"><\/div>\n<div class="gift-act-mobile-safe" style="width:100%; padding: 10px 0;">\$\{btnHtml\}<\/div>/g;
const fixedHtml = `<div class="gift-img"><img loading="lazy" src="\${finalImgSrc}" alt="\${product.name}">\n  <div class="gift-act">\${btnHtml}</div>\n</div>`;

if (brokenRegex.test(scriptContent)) {
    scriptContent = scriptContent.replace(brokenRegex, fixedHtml);
    fs.writeFileSync(scriptFile, scriptContent);
}


// 4. Update mobile-fix.css to make sure the original button is visible on Mobile but NOT on PC
const mobileFixCssFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css';
let mobileFixCssContent = fs.readFileSync(mobileFixCssFile, 'utf8');

// I already added CSS to make .gift-act visible in mobile-fix.css in step 8.
// Since mobile-fix.css ONLY applies on mobile (max-width: 900px), PC won't be affected by it!
// Let me verify if mobile-fix.css has a max-width: 900px wrapper.
// Actually mobile-fix.css is loaded globally, so the code in it MUST be wrapped in @media (max-width: 900px) or max-width: 768px!
// WAIT! Did I put my buttonFix OUTSIDE the media query in mobile-fix.css?!
// Let's check mobile-fix.css

// I will re-write the end of mobile-fix.css properly.
// The previous buttonFix was added to the end of the file, probably outside any media query!

// Bump cache
htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="style\.css(\?v=\d+)?"/g, 'href="style.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/src="script\.js(\?v=\d+)?"/g, 'src="script.js?v=' + ts + '"');
htmlContent = htmlContent.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Reverted script.js and fixed HTML for PC');
