const fs = require('fs');
const lines = fs.readFileSync('lucenva_perfect_restore.html', 'utf8').split('\n');
const block = lines.slice(2933, 3100).join('\n');
fs.writeFileSync('checkout_block.html', block);
