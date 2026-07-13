const { Product } = require('./models');

const newGift = {
  id: 'gift-06',
  name: 'Đá Khắc Lucenva',
  subName: 'Đá Thạch Anh Khắc Logo',
  price: 0,
  stock: 999,
  isActive: true,
  tags: ['loai-qua-tang'],
  imgSrc: 'images/lucenva_stone.jpg',
  badge: 'QUÀ TẶNG',
  desc: 'Hình ảnh đá thạch anh được điêu khắc tinh xảo mang thương hiệu Lucenva.',
  topDesc: 'Quà tặng độc quyền từ Lucenva - Đá khắc logo tinh xảo.',
  congDung: 'Làm vật phẩm lưu niệm, trang trí và massage nhẹ nhàng.'
};

async function updateGifts() {
  try {
    // 1. Update gift-01 image to guasha.jpg
    const gift01 = await Product.findOne({ where: { id: 'gift-01' } });
    if (gift01) {
      gift01.imgSrc = 'images/guasha.jpg';
      await gift01.save();
      console.log('Successfully updated gift-01 to use guasha.jpg.');
    } else {
      console.log('gift-01 not found.');
    }

    // 2. Add gift-06
    const exists = await Product.findOne({ where: { id: newGift.id } });
    if (!exists) {
      await Product.create(newGift);
      console.log('Successfully added gift-06 (lucenva_stone.jpg).');
    } else {
      console.log('gift-06 already exists.');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error updating gifts:', err);
    process.exit(1);
  }
}

updateGifts();
