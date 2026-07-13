const fs = require('fs');
let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');

const regex = /<div class="floating-contact">[\s\S]*?<\/div>\s*<div class="back-to-top"[\s\S]*?<\/div>/;
const newHtml = '\n' +
  '  <div class="floating-contact">\n' +
  '    <a href="#" class="fc-btn fc-phone"><i class="fas fa-phone-alt" style="font-size:20px;"></i></a>\n' +
  '    <a href="https://zalo.me" class="fc-btn fc-zalo" style="background:none; box-shadow:none;"><img src="images/zalo-icon.png" alt="Zalo" style="width:50px;height:50px;border-radius:50%;box-shadow: 0 4px 10px rgba(0,0,0,0.2);" onerror="this.onerror=null; this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Zalo_Logo.svg/512px-Zalo_Logo.svg.png\'"></a>\n' +
  '    <a href="#" class="fc-btn fc-mess" style="font-size:24px;"><i class="fab fa-facebook-messenger"></i></a>\n' +
  '  </div>\n' +
  '  <button id="back-to-top" class="back-to-top" onclick="window.scrollTo({top:0, behavior:\'smooth\'})" style="left: 20px; right: auto;">\n' +
  '    <i class="fas fa-chevron-up"></i>\n' +
  '  </button>\n';

html = html.replace(regex, newHtml);

fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);
console.log('Fixed floating-contact and back-to-top sizing/IDs');
