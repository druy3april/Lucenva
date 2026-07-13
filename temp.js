const fs = require('fs');
const html = fs.readFileSync('lucenva_perfect_restore.html', 'utf8');
const startIdx = html.indexOf('PAGE: THANH TOÁN');
if (startIdx !== -1) {
    const endIdx = html.indexOf('PAGE: CHI TI?T S?N PH?M');
    if (endIdx !== -1) {
        let block = html.substring(startIdx - 80, endIdx - 80);
        fs.writeFileSync('checkout_block.html', block);
        console.log("Success, length: " + block.length);
    }
}
