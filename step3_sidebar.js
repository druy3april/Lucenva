const fs = require('fs');
let html = fs.readFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', 'utf8');

// The new sidebar for products
const newSidebar = `
          <aside class="shop-sidebar">
            <div class="filter-mobile-header">
              <span>BỘ LỌC</span>
              <i class="fas fa-times" onclick="toggleFilter()"></i>
            </div>
            <div class="filter-header">
              <span class="fh-title">LỌC SẢN PHẨM</span>
              <a href="javascript:void(0)" class="fh-clear" onclick="clearFilters()">Xóa lọc</a>
            </div>
            <div class="filter-group group-all">
              <label class="custom-cb"><input type="checkbox" id="cb-all" value="all" checked><span class="checkmark"></span> <strong>TẤT CẢ SẢN PHẨM</strong></label>
            </div>
            <div class="filter-divider"></div>
            <div class="filter-group">
              <h4>DANH MỤC</h4>
              <label class="custom-cb"><input type="checkbox" value="loai-lam-sach"><span class="checkmark"></span> Làm Sạch</label>
              <label class="custom-cb"><input type="checkbox" value="loai-tinh-chat"><span class="checkmark"></span> Tinh Chất</label>
              <label class="custom-cb"><input type="checkbox" value="loai-duong-da"><span class="checkmark"></span> Dưỡng Da</label>
              <label class="custom-cb"><input type="checkbox" value="loai-chong-nang"><span class="checkmark"></span> Chống Nắng</label>
            </div>
          </aside>
`;

html = html.replace(/<aside class="shop-sidebar">[\s\S]*?<\/aside>/, newSidebar);

fs.writeFileSync('c:/Users/ASUS/OneDrive/Lucenva/lucenva/lucenva/lucenva.html', html);
console.log('Sidebar updated');
