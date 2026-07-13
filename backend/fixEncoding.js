const fs = require('fs');
const iconv = require('iconv-lite');

try {
  const content = fs.readFileSync('../script.js', 'utf8');
  // Re-encode from UTF-8 string to windows-1252 bytes
  const buffer = iconv.encode(content, 'win1252');
  // Decode the bytes back to UTF-8
  let fixedContent = iconv.decode(buffer, 'utf8');
  
  // Write the fixed content back
  fs.writeFileSync('../script.js', fixedContent, 'utf8');
  console.log('Fixed encoding in script.js');
} catch (e) {
  console.error(e);
}
