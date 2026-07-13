const bcrypt = require('bcryptjs');
const { Product, Order, OrderItem, Admin, ProductQA, Newsletter, SiteSetting } = require('./models');

async function setupAdmin() {
  const AdminJS = await import('adminjs');
  const AdminJSExpress = await import('@adminjs/express');
  const AdminJSSequelize = await import('@adminjs/sequelize');

  // Register the Sequelize adapter
  AdminJS.AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
  });

  // Configure AdminJS
  const adminJs = new AdminJS.AdminJS({
    locale: {
      language: 'vi',
      translations: {
        actions: {
          new: 'Tạo mới',
          edit: 'Sửa',
          show: 'Xem chi tiết',
          delete: 'Xóa',
          bulkDelete: 'Xóa nhiều',
          list: 'Danh sách',
          search: 'Tìm kiếm',
        },
        buttons: {
          save: 'Lưu lại',
          addNewItem: 'Thêm mới',
          filter: 'Lọc dữ liệu',
          applyChanges: 'Áp dụng',
          resetFilter: 'Xóa bộ lọc',
          confirmRemovalMany: 'Xác nhận xóa {{count}} bản ghi',
          confirmRemovalMany_plural: 'Xác nhận xóa {{count}} bản ghi',
          logout: 'Đăng xuất',
          login: 'Đăng nhập',
        },
        labels: {
          navigation: 'Menu Điều Hướng',
          pages: 'Trang',
          selectedRecords: 'Đã chọn ({{selected}})',
          filters: 'Bộ lọc',
          adminVersion: 'Admin: {{version}}',
          appVersion: 'App: {{version}}',
          loginWelcome: 'Chào mừng bạn đến với trang Quản Trị Lucenva',
          Dashboard: 'Bảng điều khiển',
          Admin: 'Tài khoản Admin',
          Product: 'Sản phẩm',
          Order: 'Đơn hàng',
          OrderItem: 'Chi tiết đơn hàng',
          ProductQA: 'Hỏi đáp Sản phẩm',
          Newsletter: 'Email Đăng ký',
          SiteSetting: 'Cài đặt liên hệ',
        },
        messages: {
          successfullyBulkDeleted: 'Đã xóa thành công {{count}} bản ghi',
          successfullyBulkDeleted_plural: 'Đã xóa thành công {{count}} bản ghi',
          successfullyDeleted: 'Đã xóa thành công bản ghi',
          successfullyUpdated: 'Đã cập nhật thành công bản ghi',
          thereWereValidationErrors: 'Có lỗi xác thực dữ liệu, vui lòng kiểm tra lại',
          forbiddenError: 'Bạn không có quyền thực hiện thao tác này',
          anyForbiddenError: 'Có lỗi xảy ra',
          successfullyCreated: 'Đã tạo thành công bản ghi mới',
          bulkDeleteError: 'Có lỗi xảy ra khi xóa nhiều bản ghi',
          errorFetchingRecords: 'Lỗi tải danh sách',
          errorFetchingRecord: 'Lỗi tải bản ghi',
          noRecordsSelected: 'Chưa chọn bản ghi nào',
          theseRecordsWillBeDeleted: 'Các bản ghi sau sẽ bị xóa vĩnh viễn',
          theseRecordsWillBeDeleted_plural: 'Các bản ghi sau sẽ bị xóa vĩnh viễn',
          confirmDelete: 'Bạn có chắc chắn muốn xóa mục này không?',
          noRecordsInResource: 'Chưa có dữ liệu nào trong mục này',
        }
      }
    },
    resources: [
      { resource: Admin, options: { navigation: { name: 'Quản Trị' }, label: 'Tài khoản Admin' } },
      { resource: SiteSetting, options: { navigation: { name: 'Quản Trị' }, label: 'Cài đặt liên hệ' } },
      { 
        resource: Product, 
        options: { 
          navigation: { name: 'Sản Phẩm' }, 
          label: 'Danh sách sản phẩm',
          properties: {
            id: {
              isVisible: { edit: true, list: true, show: true, filter: true },
              label: 'Mã Sản Phẩm (ID)',
              description: 'Nhập mã liền không dấu (VD: sp-test-01)'
            },
            name: { label: 'Tên Sản Phẩm' },
            subName: { label: 'Tên Phụ (Sub Name)' },
            price: { label: 'Giá Bán (VNĐ)' },
            stock: { label: 'Tồn Kho' },
            isActive: { label: 'Trạng Thái Hiển Thị' },
            imgSrc: { label: 'Link Ảnh Đại Diện' },
            gallery: { label: 'Thư viện ảnh', description: 'Nhập 1 mảng JSON chứa các link ảnh. VD: ["link1", "link2"]' },
            topDesc: { label: 'Mô tả nổi bật (Top Desc)', type: 'textarea' },
            congDung: { label: 'Công dụng tổng quan', type: 'textarea' },
            hoatChat: { label: 'Hoạt chất nổi bật', type: 'textarea' },
            ketQua: { label: 'Kết quả lâm sàng', type: 'textarea' },
            congDungChinh: { label: 'Công dụng chính', description: 'Nhập 1 mảng JSON. VD: ["Trắng da", "Trị mụn"]' },
            coChe: { label: 'Cơ chế hoạt động', type: 'textarea' },
            huongDan: { label: 'Hướng dẫn sử dụng', type: 'textarea' },
            thanhPhan: { label: 'Thành phần chi tiết', type: 'textarea' },
            tangCuong: { label: 'Tăng cường hiệu quả', type: 'textarea' },
            congNghe: { label: 'Công nghệ', type: 'textarea' },
            desc: { label: 'Mô tả phụ', type: 'textarea' },
            badge: { label: 'Tem nhãn (Badge)', description: 'VD: Best Seller, New' },
            tags: { label: 'Thẻ Tags (SEO)', description: 'Nhập mảng JSON' }
          }
        } 
      },
      { resource: Order, options: { navigation: { name: 'Đơn Hàng' }, label: 'Danh sách đơn hàng' } },
      { resource: OrderItem, options: { navigation: { name: 'Đơn Hàng' }, label: 'Chi tiết đơn hàng' } },
      { resource: ProductQA, options: { navigation: { name: 'Sản Phẩm' }, label: 'Hỏi đáp' } },
      { resource: Newsletter, options: { navigation: { name: 'Khách Hàng' }, label: 'Email Đăng ký' } },
    ],
    rootPath: '/admin',
    branding: {
      companyName: 'Lucenva Admin',
      softwareBrothers: false, // Ẩn logo AdminJS
    },
  });

  // Build the authenticated router
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate: async (email, password) => {
        // In our DB, we use "username", but AdminJS default login form asks for "email"
        const user = await Admin.findOne({ where: { username: email } });
        if (user) {
          const matched = await bcrypt.compare(password, user.password);
          if (matched) {
            return user.toJSON();
          }
        }
        return false;
      },
      cookieName: 'adminjs',
      cookiePassword: process.env.ADMIN_COOKIE_SECRET || (() => { throw new Error('Missing ADMIN_COOKIE_SECRET in environment variables'); })(),
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
    }
  );

  return { adminJs, adminRouter };
}

module.exports = setupAdmin;
