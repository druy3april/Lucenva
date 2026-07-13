const fs = require('fs');
let c = fs.readFileSync('script.js', 'utf8');
c = c.replace(/btn\.innerHTML = ĐANG GỬI\.\.\.';/g, "btn.innerHTML = 'ĐANG GỬI...';");
fs.writeFileSync('script.js', c);
console.log('Fixed missing quote');
