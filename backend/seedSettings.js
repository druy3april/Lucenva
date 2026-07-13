const { sequelize, SiteSetting, Banner, ContentBlock } = require('./models');

const defaultSettings = [
  { key: 'zalo_link', value: 'https://zalo.me/yourzalo', description: 'Đường dẫn liên kết Zalo' },
  { key: 'messenger_link', value: 'https://m.me/yourfanpage', description: 'Đường dẫn liên kết Messenger' },
  { key: 'phone_number', value: 'tel:18009999', description: 'Số điện thoại Hotline (cần có tel: ở trước)' },
  { key: 'announcement_text', value: 'Miễn phí giao hàng cho đơn từ 800.000đ', description: 'Dòng chữ thông báo trên cùng của Web' },
  { key: 'company_name', value: 'LUCENVA VIỆT NAM', description: 'Tên công ty (Footer)' },
  { key: 'company_address', value: 'Số 1, Đường ABC, Quận XYZ, TP.HCM', description: 'Địa chỉ công ty (Footer)' },
  { key: 'company_email', value: 'contact@lucenva.vn', description: 'Email liên hệ (Footer)' },
  { key: 'footer_copyright', value: '© 2026 LUCENVA. All rights reserved.', description: 'Bản quyền Footer' }
];

const defaultBanners = [
  { imageUrl: 'images/customer1.jpg', altText: 'Banner 1', order: 1, isActive: true },
  { imageUrl: 'images/customer2.jpg', altText: 'Banner 2', order: 2, isActive: true },
];

const defaultContentBlocks = [
  { 
    sectionKey: 'about_brand_text', 
    title: 'Về Lucenva', 
    contentHtml: 'LUCENVA là thương hiệu dược mỹ phẩm hàng đầu, mang lại giải pháp chăm sóc da toàn diện...',
    imageUrl: 'images/about-us.jpg'
  },
  { 
    sectionKey: 'about_mission_text', 
    title: 'Sứ Mệnh Bền Vững', 
    contentHtml: 'Sứ mệnh của chúng tôi là mang lại vẻ đẹp tự nhiên và khỏe mạnh cho mọi làn da thông qua nghiên cứu và công nghệ.',
  }
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

    for (const banner of defaultBanners) {
      const exists = await Banner.findOne({ where: { imageUrl: banner.imageUrl } });
      if (!exists) {
        await Banner.create(banner);
      }
    }
    console.log('Banners seeded successfully.');

    for (const block of defaultContentBlocks) {
      const exists = await ContentBlock.findOne({ where: { sectionKey: block.sectionKey } });
      if (!exists) {
        await ContentBlock.create(block);
      }
    }
    console.log('ContentBlocks seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding site settings:', error);
    process.exit(1);
  }
}

seed();
