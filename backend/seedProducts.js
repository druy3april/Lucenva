const { sequelize, Product } = require('./models');

const seedProducts = [
  {
    id: "sp22",
    name: "Lucenva V-Lift Cream",
    subName: "Kem Dưỡng Nâng Cơ, Chống Lão Hóa Toàn Diện & Phục Hồi Da",
    badge: "NEW",
    desc: "Kem Nâng Cơ Chống Lão Hóa & Phục Hồi Da",
    imgSrc: "images/sp-vlift.png",
    tags: ["loai-serum-kem", "loai-chuyen-sau", "da-lao-hoa", "da-nhay-cam", "hc-niacinamide", "hc-peptide"],
    price: 980000,
    topDesc: "Korean Clinical Formula – Khoa học nâng cơ trẻ hóa toàn diện. Kiểm nghiệm & chứng nhận bởi Viện Da Liễu Hàn Quốc (KDRI & KAHSRC).",
    congDung: "Cung cấp độ ẩm chuyên sâu, làm đầy rãnh nhăn, nâng cơ chảy xệ, phục hồi màng bảo vệ da mỏng yếu.",
    ketQua: "Da săn chắc, đàn hồi hơn, giảm rõ rệt dấu hiệu lão hóa chỉ sau 4 tuần.",
    hoatChat: "PDRN (Chiết xuất DNA cá hồi), NMN, Sodium Hyaluronate, 7 loại Peptides, Adenosine.",
    congDungChinh: [
      "Nâng cơ chảy xệ, định hình lại đường nét khuôn mặt (V-Line).",
      "Làm đầy nếp nhăn tĩnh, xóa mờ nếp nhăn động, ngăn ngừa lão hóa tương lai.",
      "Siêu cấp ẩm đa tầng, phục hồi hàng rào bảo vệ sinh học tự nhiên.",
      "Làm dịu da nhạy cảm, giảm đỏ đỏ, phù hợp cho da sau xâm lấn."
    ],
    coChe: "Phức hợp Peptide & PDRN kích thích nguyên bào sợi sản sinh Collagen & Elastin. NMN đảo ngược quá trình thoái hóa tế bào.",
    huongDan: "Lấy một lượng vừa đủ, thoa đều lên toàn bộ khuôn mặt và cổ, massage nhẹ nhàng theo hướng từ dưới lên, từ trong ra ngoài.",
    thanhPhan: "Water, Butylene Glycol, Glycerin, Niacinamide, NMN, Sodium DNA (PDRN), Sodium Hyaluronate, Peptides...",
    tangCuong: "Khóa ẩm bằng Lucenva V-Lift Cream để đạt hiệu quả chống lão hóa tối đa.",
    congNghe: "Công nghệ Liposome bao bọc PDRN & NMN.",
    gallery: [
      "images/sp-vlift.png",
      "https://md-care.vn/wp-content/uploads/2023/11/Banner-V-lift-kem-duong.jpg"
    ]
  },
  {
    id: "sp23",
    name: "NMN.C+ Glow Sun Cream",
    subName: "Kem Chống Nắng Phục Hồi Chống Lão Hóa NMN.C+ SPF 50+ PA++++",
    badge: "NEW",
    desc: "Kem Chống Nắng Chống Lão Hóa SPF 50+ PA++++",
    imgSrc: "images/sp-suncream.png",
    tags: ["loai-chong-nang", "loai-chuyen-sau", "da-lao-hoa", "da-tham-sam", "hc-nmn", "hc-niacinamide"],
    price: 590000,
    topDesc: "Bảo vệ phổ rộng ưu việt. Hàng rào vô hình ngăn chặn hoàn toàn tác hại của tia UV và ánh sáng xanh.",
    congDung: "Chống nắng tối đa, ngăn ngừa sạm nám, bảo vệ da khỏi gốc tự do, hỗ trợ phục hồi da cháy nắng.",
    ketQua: "Không để lại vệt trắng, lớp finish mỏng nhẹ, da không bóng nhờn, được bảo vệ toàn diện suốt 8 giờ.",
    hoatChat: "Titanium Dioxide, Niacinamide, NMN, Chiết xuất rau má (Cica Complex).",
    congDungChinh: [
      "Bảo vệ phổ rộng 360 độ (UVA1, UVA2, UVB, Ánh sáng xanh, Tia hồng ngoại).",
      "Chống oxy hóa mạnh mẽ, ngăn ngừa sạm nám và đốm nâu hình thành.",
      "Làm dịu da, giảm kích ứng, an toàn tuyệt đối cho da treatment, da nhạy cảm.",
      "Tích hợp nâng tone tự nhiên, có thể dùng làm lớp lót trang điểm hoàn hảo."
    ],
    coChe: "Màng lọc vật lý lai hóa học thế hệ mới, không gây bít tắc lỗ chân lông. NMN & Niacinamide bổ sung năng lượng, sửa chữa DNA do UV phá hủy.",
    huongDan: "Thoa một lượng bằng đồng xu lên mặt và cổ trước khi ra nắng 20 phút. Thoa lại sau 4 giờ hoặc sau khi bơi, đổ nhiều mồ hôi.",
    thanhPhan: "Water, Cyclopentasiloxane, Zinc Oxide, Ethylhexyl Methoxycinnamate, Titanium Dioxide, Niacinamide, NMN...",
    tangCuong: "Nên kết hợp dùng tinh chất NMN.P+ Regen First Essence trước khi thoa kem chống nắng.",
    congNghe: "Công nghệ bọc vi nang giúp màng lọc bền vững và an toàn cho cả da nhạy cảm.",
    gallery: [
      "images/sp-suncream.png",
      "https://md-care.vn/wp-content/uploads/2023/11/Banner-sun-cream.jpg"
    ]
  },
  {
    id: "sp24",
    name: "Ceramide Cica Barrier Gel",
    subName: "Gel Rửa Mặt Dịu Nhẹ, Cân Bằng pH & Phục Hồi Hàng Rào Bảo Vệ Da",
    badge: "BEST SELLER",
    desc: "Gel Rửa Mặt Phục Hồi Hàng Rào Bảo Vệ Da",
    imgSrc: "images/sp-cleanser.png",
    tags: ["loai-sua-rua-mat", "loai-co-ban", "da-dau", "da-nhay-cam", "hc-b5", "hc-peptide"],
    price: 380000,
    topDesc: "Sạch sâu nhưng không khô căng. Giải pháp tối ưu cho làn da tổn thương, mỏng yếu cần phục hồi chuyên sâu.",
    congDung: "Loại bỏ bụi bẩn, bã nhờn, cặn trang điểm nhẹ mà không phá vỡ màng ẩm sinh học của da.",
    ketQua: "Da mềm mại, ẩm mượt ngay sau khi rửa, lỗ chân lông thông thoáng, giảm mẩn đỏ.",
    hoatChat: "Ceramide NP, Panthenol (B5), Chiết xuất rau má (Centella Asiatica), Prebiotics.",
    congDungChinh: [
      "Làm sạch sâu lỗ chân lông, loại bỏ bã nhờn dư thừa và tạp chất dịu nhẹ.",
      "Duy trì độ pH lý tưởng (5.5 - 6.0), không làm khô căng, rít da.",
      "Phục hồi hàng rào bảo vệ sinh học ngay trong bước làm sạch.",
      "Nuôi dưỡng hệ vi sinh vật trên da khỏe mạnh nhờ Prebiotics."
    ],
    coChe: "Chất hoạt động bề mặt nguồn gốc từ Amino Acid cực kỳ dịu nhẹ. Hệ đệm Ceramide & B5 bù ẩm tức thì, chữa lành vi tổn thương.",
    huongDan: "Lấy một lượng nhỏ gel, tạo bọt nhẹ nhàng với nước. Massage lên da mặt ẩm trong 60 giây và rửa sạch bằng nước ấm.",
    thanhPhan: "Water, Sodium Cocoyl Glutamate, Lauryl Glucoside, Glycerin, Panthenol, Centella Asiatica Extract, Prebiotics...",
    tangCuong: "Dùng kết hợp với NMN.P+ Regen First Essence ngay sau khi rửa mặt.",
    congNghe: "Công nghệ Microbiome-Friendly tiên tiến.",
    gallery: [
      "images/sp-cleanser.png",
      "https://md-care.vn/wp-content/uploads/2023/11/Banner-cleansing.jpg"
    ]
  },
  {
    id: "sp25",
    name: "NMN.P+ Regen First Essence",
    subName: "Tinh Chất Kích Hoạt NMN, B5 & Peptide Phục Hồi Da Đa Tầng",
    badge: "",
    desc: "Tinh Chất NMN Kích Hoạt Phục Hồi Đa Tầng",
    imgSrc: "images/sp-essence.png",
    tags: ["loai-serum-kem", "loai-co-ban", "loai-chuyen-sau", "da-nhay-cam", "da-lao-hoa", "hc-nmn", "hc-b5"],
    price: 650000,
    topDesc: "Bước kích hoạt 'vàng' đánh thức làn da, mở đường cho các dưỡng chất thẩm thấu tối đa vào các lớp biểu bì sâu hơn.",
    congDung: "Tăng cường năng lượng tế bào (ATP), siêu cấp ẩm, làm dịu da tức thì, kích thích tái tạo da.",
    ketQua: "Làn da bừng sáng, ngậm nước, mềm mại và rạng rỡ ngay lập tức. Tối ưu hóa hiệu quả của toàn bộ quy trình dưỡng.",
    hoatChat: "NMN, Niacinamide, Melatrepein, Cica Complex, Peptide Complex.",
    congDungChinh: [
      "Đóng vai trò như một chất dẫn xuất, tăng khả năng thẩm thấu của các sản phẩm sau đó lên gấp 3 lần.",
      "Bổ sung NMN ở nồng độ cao, sửa chữa DNA, làm chậm quá trình lão hóa cấp độ tế bào.",
      "Làm dịu nhanh tình trạng kích ứng, đỏ rát, phục hồi da yếu.",
      "Làm sáng và đều màu da, ức chế hình thành sắc tố Melanin."
    ],
    coChe: "Cấu trúc phân tử siêu nhỏ dạng lỏng (Essence) thẩm thấu xuyên qua lớp sừng chỉ trong 3 giây. NMN đi thẳng vào ti thể tế bào.",
    huongDan: "Sử dụng sau bước làm sạch. Đổ vài giọt tinh chất ra lòng bàn tay, vỗ nhẹ nhàng lên toàn bộ khuôn mặt và cổ cho đến khi thấm hoàn toàn.",
    thanhPhan: "Water, Glycerin, Caprylic/Capric Triglyceride, Niacinamide, Melatrepein, Adenosine, Cica Complex, Peptide Complex...",
    tangCuong: "Kết hợp cùng NMN.C+ Glow Sun Cream để bảo vệ da toàn diện ban ngày.",
    congNghe: "Công nghệ DNA Epigen™ giúp tối ưu hóa khả năng thẩm thấu và hoạt động của các hoạt chất.",
    gallery: [
      "images/sp-essence.png",
      "https://md-care.vn/wp-content/uploads/2023/11/Banner-First-essence.jpg"
    ]
  }
];

async function runSeed() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced for seeding.');
    
    for (const data of seedProducts) {
      await Product.upsert(data);
    }
    console.log('Successfully seeded 4 main products!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

runSeed();
