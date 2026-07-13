const fs = require('fs');
const iconv = require('iconv-lite');

try {
  const currentContent = fs.readFileSync('../script.js', 'utf8');
  
  // Reverse the previous fix (which used win1252)
  const buffer1 = iconv.encode(currentContent, 'utf8');
  const doubleEncoded = iconv.decode(buffer1, 'win1252');
  
  // Now apply the correct fix using win1258
  const correctBuffer = iconv.encode(doubleEncoded, 'win1258');
  const fixedContent = iconv.decode(correctBuffer, 'utf8');
  
  fs.writeFileSync('../script.js', fixedContent, 'utf8');
  console.log('Fixed encoding with win1258');
} catch (e) {
  console.error(e);
}
