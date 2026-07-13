const fs = require('fs');
const content = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');
const lines = content.split('\n');
const mbnIndex = lines.findIndex(l => l.includes('mbn-shop'));
if (mbnIndex !== -1) {
    const giftNavItem = `
    <div class="mbn-item" id="mbn-gift" onclick="navigate('products', 'loai-qua-tang')">
      <i class="fas fa-gift"></i>
      <span>Quà tặng</span>
    </div>`;
    lines.splice(mbnIndex + 4, 0, giftNavItem);
    fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', lines.join('\n'));
    console.log('Added Quà tặng to mobile bottom nav');
}
