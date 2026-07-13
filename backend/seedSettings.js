const { sequelize, SiteSetting } = require('./models');

const defaultSettings = [
  { key: 'zalo_link', value: 'https://zalo.me/yourzalo', description: 'Đường dẫn liên kết Zalo' },
  { key: 'messenger_link', value: 'https://m.me/yourfanpage', description: 'Đường dẫn liên kết Messenger' },
  { key: 'phone_number', value: 'tel:18009999', description: 'Số điện thoại Hotline (cần có tel: ở trước)' },
  { key: 'announcement_text', value: 'Miễn phí giao hàng cho đơn từ 800.000đ', description: 'Dòng chữ thông báo trên cùng của Web' },
  { key: 'hero_banner_img', value: 'images/background.jpg', description: 'Link ảnh Banner chính trên trang chủ' }
];

async function seed() {
  try {
    await sequelize.sync({ alter: true });
    for (const setting of defaultSettings) {
      const exists = await SiteSetting.findOne({ where: { key: setting.key } });
      if (!exists) {
        await SiteSetting.create(setting);
      }
    }
    console.log('SiteSettings seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding site settings:', error);
    process.exit(1);
  }
}

seed();
