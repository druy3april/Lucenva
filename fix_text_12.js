const fs = require('fs');

// 1. Add .hidden-card to style.css
const styleFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css';
let styleContent = fs.readFileSync(styleFile, 'utf8');

if (!styleContent.includes('.hidden-card')) {
    styleContent += '\n.hidden-card { display: none !important; }\n';
    fs.writeFileSync(styleFile, styleContent);
}


// 2. Fix filterProducts in script.js to use classList instead of inline style
const scriptFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js';
let scriptContent = fs.readFileSync(scriptFile, 'utf8');

const brokenFilterLogic = `        if (!hasCheck) {
            // Khi chọn "Tất cả", ẩn các sản phẩm quà tặng (giá = 0)
            const isGift = parseInt(card.getAttribute('data-price')) === 0;
            card.style.display = isGift ? 'none' : 'block';
        } else {
            const tags = card.getAttribute('data-tags') || '';
            const match = checkedCats.some(cat => tags.includes(cat));
            card.style.display = match ? 'block' : 'none';
        }`;

const fixedFilterLogic = `        const tags = card.getAttribute('data-tags') || '';
        if (!hasCheck) {
            // Khi chọn "Tất cả", ẩn các sản phẩm quà tặng (có tag loai-qua-tang hoặc giá = 0)
            const isGift = tags.includes('loai-qua-tang') || parseInt(card.getAttribute('data-price')) === 0;
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
        }`;

if (scriptContent.includes('card.style.display = isGift ? \'none\' : \'block\';')) {
    scriptContent = scriptContent.replace(brokenFilterLogic, fixedFilterLogic);
    fs.writeFileSync(scriptFile, scriptContent);
}

// Bump cache
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="style\.css(\?v=\d+)?"/g, 'href="style.css?v=' + ts + '"');
htmlContent = htmlContent.replace(/src="script\.js(\?v=\d+)?"/g, 'src="script.js?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Fixed filterProducts important override bug');
