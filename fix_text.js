const fs = require('fs');

// 1. Clean up manual <br> tags in HTML that interfere with responsive wrapping
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

htmlContent = htmlContent.replace(
    '<h3>Đăng ký để nhận những thông tin sớm<br>và mới nhất từ Lucenva</h3>',
    '<h3>Đăng ký để nhận những thông tin sớm và mới nhất từ Lucenva</h3>'
);

htmlContent = htmlContent.replace(
    '<p>Đăng ký ngay để nhận những thông tin về khuyến mãi, sản phẩm và<br>chương trình của Lucenva</p>',
    '<p>Đăng ký ngay để nhận những thông tin về khuyến mãi, sản phẩm và chương trình của Lucenva</p>'
);

htmlContent = htmlContent.replace(
    'Công ty TNHH LUCENVA VIỆT NAM<br>',
    'Công ty TNHH LUCENVA VIỆT NAM - '
);

// Bump cache
const ts = Date.now();
htmlContent = htmlContent.replace(/href="style\.css(\?v=\d+)?"/g, 'href="style.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/href="mobile-fix\.css(\?v=\d+)?"/g, 'href="mobile-fix.css?v=' + ts + '"');

fs.writeFileSync(htmlFile, htmlContent);
console.log('Updated HTML and bumped cache');

// 2. Add global text-wrap to style.css
const styleFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css';
let styleContent = fs.readFileSync(styleFile, 'utf8');

const textWrapRules = `
/* Global text wrap fixes for orphans/widows */
h1, h2, h3, h4, h5, h6, .sp-title, .sp-subtitle, .footer-newsletter-wrap h3 {
    text-wrap: balance;
}

p, li, .sp-uses li, .sp-desc, .copyright-text, .footer-newsletter-wrap p, .sp-short-desc {
    text-wrap: pretty;
}
`;

if (!styleContent.includes('text-wrap: balance;')) {
    styleContent += '\n' + textWrapRules;
    fs.writeFileSync(styleFile, styleContent);
    console.log('Added text-wrap rules to style.css');
}
