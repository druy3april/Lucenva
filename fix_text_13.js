const fs = require('fs');
const scriptFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js';
let scriptContent = fs.readFileSync(scriptFile, 'utf8');

const regex = /function filterProducts\(\) \{[\s\S]*?\}\s*(?=\nfunction |$)/;

const newFilter = `function filterProducts() {
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
        }
    });
}
`;

if (regex.test(scriptContent)) {
    scriptContent = scriptContent.replace(regex, newFilter);
    fs.writeFileSync(scriptFile, scriptContent);
    console.log('Replaced filterProducts successfully');
} else {
    console.log('Could not find filterProducts with regex');
}

// Bump cache
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/src="script\.js(\?v=\d+)?"/g, 'src="script.js?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);
