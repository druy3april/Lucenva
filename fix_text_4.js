const fs = require('fs');

const styleFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/style.css';
let styleContent = fs.readFileSync(styleFile, 'utf8');

const foolproofAlignment = `
/* Bulletproof Centering for all product and category cards */
.cat-item, .gift-card {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    text-align: center !important;
}

.cat-img-box, .gift-img {
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 auto !important;
}

.cat-name, .cat-sub, .gift-name, .gift-desc {
    width: 100% !important;
    text-align: center !important;
    display: block !important;
    margin-left: auto !important;
    margin-right: auto !important;
}
`;

styleContent += '\n' + foolproofAlignment;
fs.writeFileSync(styleFile, styleContent);

// Bump cache
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/href="style\.css(\?v=\d+)?"/g, 'href="style.css?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);

console.log('Applied bulletproof flex-centering to style.css');
