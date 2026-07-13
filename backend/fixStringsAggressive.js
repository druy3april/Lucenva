const fs = require('fs');

try {
  let content = fs.readFileSync('../script.js', 'utf8');

  // Fix strings displayed to the user using regex wildcards
  // Accordions
  content = content.replace(/C[^\w\s]+ng dụng ch[^\w\s]+nh/g, 'Công dụng chính');
  content = content.replace(/Cơ chế t[^\w\s]+c dụng/g, 'Cơ chế tác dụng');
  content = content.replace(/Bảng th[^\w\s]+nh phần/g, 'Bảng thành phần');
  content = content.replace(/Tăng cư[^\w\s]+ng hiệu quả khi kết hợp với/g, 'Tăng cường hiệu quả khi kết hợp với');
  content = content.replace(/C[^\w\s]+ng nghệ & Khoa h[^\w\s]+c/g, 'Công nghệ & Khoa học');

  // Add to cart buttons
  content = content.replace(/TH[^\w\s]+M V[^\w\s]+O GI[^\w\s]+ H[^\w\s]+NG/g, 'THÊM VÀO GIỎ HÀNG');

  // Product detail strings
  content = content.replace(/Sản phẩm Lucenva/g, 'Sản phẩm Lucenva');
  content = content.replace(/Li[^\w\s]+n hệ/g, 'Liên hệ');
  content = content.replace(/S[^\w\s]+n ph[^\w\s]+m n[^\w\s]+y l[^\w\s]+ qu[^\w\s]+ t[^\w\s]+ng k[^\w\s]+m, kh[^\w\s]+ng b[^\w\s]+n l[^\w\s]+\./g, 'Sản phẩm này là quà tặng kèm, không bán lẻ.');
  content = content.replace(/toLocaleString\(\) \+ '[^\w\s]+' : '0[^\w\s]+'/g, "toLocaleString() + 'đ' : '0đ'");

  // Toast / UI text
  content = content.replace(/Kh[^\w\s]+ng t[^\w\s]+m thấy sản phẩm ph[^\w\s]+ hợp/g, 'Không tìm thấy sản phẩm phù hợp');
  content = content.replace(/Kh[^\w\s]+ng t[^\w\s]+m th[^\w\s]+y s[^\w\s]+n ph[^\w\s]+m:/g, 'Không tìm thấy sản phẩm:');
  content = content.replace(/Vui l[^\w\s]+ng nh[^\w\s]+p nội dung h[^\w\s]+i đ[^\w\s]+p v[^\w\s]+ H[^\w\s]+ t[^\w\s]+n\./g, 'Vui lòng nhập nội dung hỏi đáp và Họ tên.');
  content = content.replace(/[^\w\s]+ANG GỬI\.\.\./g, 'ĐANG GỬI...');
  content = content.replace(/Cảm ơn bạn đ[^\w\s]+ đ[^\w\s]+ng g[^\w\s]+p c[^\w\s]+u h[^\w\s]+i!/g, 'Cảm ơn bạn đã đóng góp câu hỏi!');
  content = content.replace(/C[^\w\s]+ lỗi xảy ra\./g, 'Có lỗi xảy ra.');
  content = content.replace(/Kh[^\w\s]+ng thể kết nối tới m[^\w\s]+y chủ\./g, 'Không thể kết nối tới máy chủ.');
  content = content.replace(/Vui l[^\w\s]+ng nh[^\w\s]+p email hợp lệ/g, 'Vui lòng nhập email hợp lệ');
  content = content.replace(/[^\w\s]+ăng k[^\w\s]+ nh[^\w\s]+n tin th[^\w\s]+nh c[^\w\s]+ng!/g, 'Đăng ký nhận tin thành công!');

  fs.writeFileSync('../script.js', content, 'utf8');
  console.log('Fixed visible strings aggressively');
} catch (e) {
  console.error(e);
}
