const fs = require('fs');
let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');

html = html.replace(/<div class="gift-act"><button>Thêm Vào Giỏ<\/button><\/div>/g, 
    '<div class="gift-act"><button onclick="event.stopPropagation(); this.closest(\'.gift-card\').click()">XEM THÊM</button></div>');

fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);
console.log('Replaced Thêm Vào Giỏ with XEM THÊM for gifts.');
