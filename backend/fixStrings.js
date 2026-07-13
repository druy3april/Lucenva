const fs = require('fs');

try {
  let content = fs.readFileSync('../script.js', 'utf8');

  // Fix strings displayed to the user
  content = content.replace(/TH\?\?M V\?O GI\? H\?NG/g, 'THÊM VÀO GIỎ HÀNG');
  content = content.replace(/S\?n ph\?m ny l qu t\?ng km, khng bn l\?\./g, 'Sản phẩm này là quà tặng kèm, không bán lẻ.');
  content = content.replace(/Khng t\?m th\?y s\?n ph\?m:/g, 'Không tìm thấy sản phẩm:');
  content = content.replace(/toLocaleString\(\) \+ '\?' : '0\?'/g, "toLocaleString() + 'đ' : '0đ'");
  content = content.replace(/'Li\?n hệ'/g, "'Liên hệ'");
  content = content.replace(/Kh\?ng t\?m thấy sản phẩm ph\? hợp/g, 'Không tìm thấy sản phẩm phù hợp');
  content = content.replace(/Vui l\?ng nhp nội dung h\?i đ\?p v\? H\? t\?n\./g, 'Vui lòng nhập nội dung hỏi đáp và Họ tên.');
  content = content.replace(/\?ANG GỬI\.\.\./g, 'ĐANG GỬI...');
  content = content.replace(/Cảm ơn bạn đ\? đ\?ng g\?p c\?u h\?i!/g, 'Cảm ơn bạn đã đóng góp câu hỏi!');
  content = content.replace(/C\? lỗi xảy ra\./g, 'Có lỗi xảy ra.');
  content = content.replace(/Kh\?ng thể kết nối tới m\?y chủ\./g, 'Không thể kết nối tới máy chủ.');
  content = content.replace(/Vui l\?ng nhp email hợp lệ/g, 'Vui lòng nhập email hợp lệ');
  content = content.replace(/\?ăng k\? nhn tin th\?nh c\?ng!/g, 'Đăng ký nhận tin thành công!');
  
  // A few missing ones based on regex output
  content = content.replace(/Kh?ng t?m thấy/g, 'Không tìm thấy');
  content = content.replace(/sản phẩm ph? hợp/g, 'sản phẩm phù hợp');
  
  fs.writeFileSync('../script.js', content, 'utf8');
  console.log('Fixed visible strings in script.js');
} catch (e) {
  console.error(e);
}
