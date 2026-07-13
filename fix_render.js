const fs = require('fs');

let js = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js', 'utf8');

js = js.replace(/productList\.innerHTML = '';/, '// productList.innerHTML = "";');
js = js.replace(/if \(productList\) \{/, 'if (productList && productList.children.length === 0) {');

fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/script.js', js);
console.log('Disabled rendering if productList already has hardcoded elements');
