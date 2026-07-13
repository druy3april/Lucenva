// Nạp 4 sản phẩm QUÀ TẶNG (2 túi + 2 đá massage Guasha) vào database.
// Sau khi chạy, khách có thể vào /admin -> "Sản phẩm" để sửa tên, ảnh, mô tả
// mà không cần đụng vào code. Giá luôn = 0 để website tự ẩn nút "Mua ngay"
// và hiển thị dòng "Sản phẩm này là quà tặng kèm, không bán lẻ." (xem script.js -> openDetail).
const { sequelize, Product } = require('./models');

const seedGifts = [
  {
    id: "gift-tui-luxury",
    name: "Túi Luxury Lucenva",
    subName: "Túi Xách Cao Cấp",
    desc: "Túi xách cao cấp thiết kế sang trọng, phù hợp làm quà tặng doanh nghiệp hoặc đối tác.",
    imgSrc: "images/lucenva_tui_luxury.jpg",
    tags: ["loai-qua-tang", "qua-tang-tui"],
    price: 0,
    stock: 0,
    isActive: true,
    congDung: "Đựng mỹ phẩm, quà tặng hoặc sử dụng như một phụ kiện thời trang sang trọng.",
    gallery: [
      "images/lucenva_tui_luxury.jpg",
      "images/tui-harmony.jpg",
      "images/Lucenva_VN_Koreabeautyharmony.jpg"
    ]
  },
  {
    id: "gift-tui-nhenhang",
    name: "Túi Nhẹ Nhàng Lucenva",
    subName: "Túi Tote Vải Canvas",
    desc: "Túi tote canvas form rộng, họa tiết hạc - núi - ngựa đặc trưng của Lucenva, nhẹ nhàng và tiện dụng.",
    imgSrc: "images/lucenva_tui_nhenhang.jpg",
    tags: ["loai-qua-tang", "qua-tang-tui"],
    price: 0,
    stock: 0,
    isActive: true,
    congDung: "Đựng vật dụng cá nhân, mỹ phẩm, tài liệu khi đi làm, đi chơi; bền bỉ và thân thiện với môi trường.",
    gallery: [
      "images/lucenva_tui_nhenhang.jpg",
      "images/tui_lucenva.jpg",
      "images/tui-thien-nhien.jpg"
    ]
  },
  {
    id: "gift-da-guasha",
    name: "Đá Guasha Hộp Quà Lucenva",
    subName: "Đá Thạch Anh Xanh Nguyên Khối (Kèm Hộp)",
    desc: "Đá Guasha thạch anh xanh tự nhiên nguyên khối, đóng hộp sang trọng - món quà tặng tinh tế.",
    imgSrc: "images/guasha.jpg",
    tags: ["loai-qua-tang", "qua-tang-da"],
    price: 0,
    stock: 0,
    isActive: true,
    congDung: "Dùng để massage Guasha nâng cơ mặt, kích thích tuần hoàn máu, hỗ trợ dưỡng chất thẩm thấu sâu hơn.",
    gallery: [
      "images/guasha.jpg"
    ]
  },
  {
    id: "gift-da-thachanh",
    name: "Đá Thạch Anh Nâng Cơ Tự Nhiên",
    subName: "Massage Nâng Cơ Cao Cấp",
    desc: "Đá thạch anh tự nhiên nguyên khối giúp massage nâng cơ, định hình khuôn mặt hiệu quả.",
    imgSrc: "images/lucenva_stone.jpg",
    tags: ["loai-qua-tang", "qua-tang-da"],
    price: 0,
    stock: 0,
    isActive: true,
    congDung: "Dùng để massage nâng cơ mặt, kích thích tuần hoàn máu, hỗ trợ kem dưỡng thẩm thấu sâu hơn.",
    gallery: [
      "images/lucenva_stone.jpg"
    ]
  }
];

async function runSeed() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced for seeding.');

    for (const data of seedGifts) {
      await Product.upsert(data);
    }
    console.log(`Successfully seeded ${seedGifts.length} gift products!`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

runSeed();
