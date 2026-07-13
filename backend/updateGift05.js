const { Product } = require('./models');

const newGift = {
  id: 'gift-05',
  name: 'Túi Quai Nâu Nhỏ Lucenva',
  subName: 'Túi Xách Thời Trang',
  price: 0,
  stock: 999,
  isActive: true,
  tags: ['loai-qua-tang'],
  imgSrc: 'images/Lucenva_VN_Koreabeautyharmony.jpg',
  badge: 'QUÀ TẶNG',
  desc: 'Túi quai nâu nhỏ thời trang, xinh xắn và vô cùng thanh lịch.',
  topDesc: 'Quà tặng độc quyền từ Lucenva - Túi quai nâu nhỏ thiết kế trẻ trung.',
  congDung: 'Đựng các vật dụng cá nhân một cách tiện lợi và phong cách.'
};

async function addGift05() {
  try {
    const exists = await Product.findOne({ where: { id: newGift.id } });
    if (!exists) {
      await Product.create(newGift);
      console.log('Successfully added gift-05.');
    } else {
      console.log('gift-05 already exists.');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error adding gift-05:', err);
    process.exit(1);
  }
}

addGift05();
