const fs = require('fs');
let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');

if (!html.includes('id="back-to-top"')) {
    html = html.replace('</body>', '<button id="back-to-top" class="back-to-top" title="Lên đầu trang"><i class="fas fa-arrow-up"></i></button>\n</body>');
    fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);
    console.log('Added back-to-top to HTML');
} else {
    console.log('back-to-top already in HTML');
}
