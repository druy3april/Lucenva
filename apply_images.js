const fs = require('fs');
let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');

html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/hero/hero01.webp', 'images/Lucenva_VN_Koreabeautyharmony.jpg');
html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/hero/hero02.webp', 'images/background.jpg');
html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec07/hero-product.webp', 'images/sp22-overview.jpg');
html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec07/lifestyle-1.webp', 'images/sp22-main.jpg');
html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec07/lifestyle-2.webp', 'images/sp22-5tang.jpg');
html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec09/expert-2.webp', 'images/chuyen_gia.jpg');
html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec09/expert-3.webp', 'images/chuyen_gia.jpg');
html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec09/expert-4.webp', 'images/chuyen_gia.jpg');
html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec09/expert-5.webp', 'images/chuyen_gia.jpg');
html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec09/expert-1.webp', 'images/chuyen_gia.jpg');
html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec05/1.webp', 'images/customer1.jpg');
html = html.replace('https://md-care.vn/wp-content/plugins/md-care-main-page/assets/imgs/font-page/sec05/2.webp', 'images/customer2.jpg');

fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);
console.log('Replaced md-care.vn images with local images.');
