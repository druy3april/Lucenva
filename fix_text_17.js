const fs = require('fs');
const scriptFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js';
let scriptContent = fs.readFileSync(scriptFile, 'utf8');

const missingCode = `
const cpSlides = document.querySelectorAll('.cp-slide');
let currentCpSlide = 0, cpSlideInterval;
function showCpSlide(index) {
    if (cpSlides.length === 0) return;
    cpSlides[currentCpSlide].classList.remove('active');
    currentCpSlide = (index + cpSlides.length) % cpSlides.length;
    cpSlides[currentCpSlide].classList.add('active');
}
`;

if (scriptContent.includes('function nextCpSlide()') && !scriptContent.includes('const cpSlides =')) {
    scriptContent = scriptContent.replace('function nextCpSlide()', missingCode + '\nfunction nextCpSlide()');
    fs.writeFileSync(scriptFile, scriptContent);
    console.log('Restored missing cpSlides code');
} else {
    console.log('cpSlides code already exists or nextCpSlide not found');
}

// Bump cache
const htmlFile = 'c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');
const ts = Date.now();
htmlContent = htmlContent.replace(/src="script\.js(\?v=\d+)?"/g, 'src="script.js?v=' + ts + '"');
fs.writeFileSync(htmlFile, htmlContent);
