const { Product, sequelize } = require('./models');

const giftProducts = [
  {
    id: 'gift-01',
    name: 'Đá Thạch Anh Tự Nhiên Guasha',
    subName: 'Massage Nâng Cơ',
    price: 0,
    stock: 999,
    isActive: true,
    tags: ['loai-qua-tang'],
    imgSrc: 'images/lucenva_stone.jpg',
    badge: 'QUÀ TẶNG',
    desc: 'Đá thạch anh tự nhiên nguyên khối giúp massage nâng cơ định hình khuôn mặt hiệu quả.',
    topDesc: 'Quà tặng độc quyền từ Lucenva - Đá thạch anh tự nhiên Guasha hỗ trợ massage nâng cơ, tăng cường lưu thông máu và trẻ hóa làn da.',
    congDung: 'Dùng để massage nâng cơ mặt, kích thích tuần hoàn máu, hỗ trợ kem dưỡng thẩm thấu sâu hơn vào da.'
  },
  {
    id: 'gift-02',
    name: 'Túi Luxury Lucenva',
    subName: 'Túi Xách Cao Cấp',
    price: 0,
    stock: 999,
    isActive: true,
    tags: ['loai-qua-tang'],
    imgSrc: 'images/lucenva_tui_luxury.jpg',
    badge: 'QUÀ TẶNG',
    desc: 'Túi xách cao cấp thiết kế sang trọng, phù hợp làm quà tặng doanh nghiệp hoặc đối tác.',
    topDesc: 'Quà tặng độc quyền từ Lucenva - Túi xách Luxury với thiết kế thanh lịch, chất liệu cao cấp.',
    congDung: 'Đựng mỹ phẩm, quà tặng hoặc sử dụng như một phụ kiện thời trang sang trọng.'
  },
  {
    id: 'gift-03',
    name: 'Túi Nhẹ Nhàng Lucenva',
    subName: 'Túi Vải Tiện Dụng',
    price: 0,
    stock: 999,
    isActive: true,
    tags: ['loai-qua-tang'],
    imgSrc: 'images/lucenva_tui_nhenhang.jpg',
    badge: 'QUÀ TẶNG',
    desc: 'Túi vải nhẹ nhàng, thân thiện với môi trường, thiết kế tối giản tinh tế.',
    topDesc: 'Túi vải tiện dụng từ Lucenva, thiết kế nhỏ gọn nhẹ nhàng, thích hợp mang theo hàng ngày.',
    congDung: 'Đựng vật dụng cá nhân, mỹ phẩm khi đi làm, đi chơi.'
  },
  {
    id: 'gift-04',
    name: 'Túi To In Hình Lucenva',
    subName: 'Túi Tote Canvas',
    price: 0,
    stock: 999,
    isActive: true,
    tags: ['loai-qua-tang'],
    imgSrc: 'images/tui_lucenva.jpg',
    badge: 'QUÀ TẶNG',
    desc: 'Túi canvas form rộng in họa tiết đặc trưng của Lucenva, bền bỉ và cá tính.',
    topDesc: 'Túi Tote Canvas kích thước lớn, chất liệu vải dày dặn in hình độc quyền Lucenva.',
    congDung: 'Sử dụng hàng ngày để đựng nhiều vật dụng, tài liệu, thân thiện với môi trường.'
  }
];

async function seedGifts() {
  try {
    // Only add if not already exist
    for (const p of giftProducts) {
      const exists = await Product.findOne({ where: { id: p.id } });
      if (!exists) {
        await Product.create(p);
      }
    }
    console.log('Successfully seeded gift products.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding gift products:', err);
    process.exit(1);
  }
}

seedGifts();
