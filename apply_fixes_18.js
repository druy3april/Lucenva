const fs = require('fs');
let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');

const sectionStart = html.indexOf('<section class="gift-page">');
if (sectionStart !== -1) {
    const gridStart = html.indexOf('<div class="gift-grid">', sectionStart);
    if (gridStart !== -1) {
        let openCount = 0;
        let gridEnd = -1;
        let i = gridStart;
        while (i < html.length) {
            if (html.substring(i, i + 4) === '<div') openCount++;
            if (html.substring(i, i + 5) === '</div') {
                openCount--;
                if (openCount === 0) {
                    gridEnd = i + 6;
                    break;
                }
            }
            i++;
        }
        if (gridEnd !== -1) {
            const newGrid = '<div id="product-list" class="gift-grid"></div>';
            html = html.substring(0, gridStart) + newGrid + html.substring(gridEnd);
            console.log('Replaced gift-grid with product-list');
        }
    }
}

const floatingHtml = '\n' +
  '<div class="floating-contact">\n' +
  '  <a href="#" class="fc-btn fc-phone"><i class="fas fa-phone-alt"></i></a>\n' +
  '  <a href="https://zalo.me" class="fc-btn fc-zalo"><img src="images/zalo-icon.png" alt="Zalo" style="width:24px;height:24px;" onerror="this.onerror=null; this.src=\'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Zalo_Logo.svg/512px-Zalo_Logo.svg.png\'"></a>\n' +
  '  <a href="#" class="fc-btn fc-mess"><i class="fab fa-facebook-messenger"></i></a>\n' +
  '</div>\n' +
  '<div class="back-to-top" onclick="window.scrollTo({top:0, behavior:\'smooth\'})" style="left: 20px; right: auto; opacity: 1; visibility: visible;">\n' +
  '  <i class="fas fa-chevron-up"></i>\n' +
  '</div>\n';

if (!html.includes('floating-contact')) {
    html = html.replace('</body>', floatingHtml + '\n</body>');
    console.log('Injected floating contacts');
}

fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);

let css = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css', 'utf8');
const floatingCss = '\n' +
'.floating-contact {\n' +
'    position: fixed;\n' +
'    bottom: 20px;\n' +
'    right: 20px;\n' +
'    display: flex;\n' +
'    flex-direction: column;\n' +
'    gap: 10px;\n' +
'    z-index: 9999;\n' +
'}\n' +
'.fc-btn {\n' +
'    width: 45px;\n' +
'    height: 45px;\n' +
'    border-radius: 50%;\n' +
'    display: flex;\n' +
'    align-items: center;\n' +
'    justify-content: center;\n' +
'    background: #0084ff;\n' +
'    color: #fff;\n' +
'    text-decoration: none;\n' +
'    box-shadow: 0 4px 10px rgba(0,0,0,0.2);\n' +
'}\n' +
'.fc-zalo { background: #0068ff; }\n' +
'.fc-phone { background: #ff3b30; }\n';

if (!css.includes('.floating-contact')) {
    css += '\n' + floatingCss;
    fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/mobile-fix.css', css);
    console.log('Added CSS for floating contacts');
}
