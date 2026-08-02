const { sequelize, Product } = require('./models');

const seedProducts = [
  {
    "id": "sp22",
    "name": "Lucenva V-Lift Cream",
    "subName": "Kem Dưỡng Nâng Cơ, Chống Lão Hóa Toàn Diện & Phục Hồi Da",
    "badge": "NEW",
    "desc": "Kem Nâng Cơ Chống Lão Hóa & Phục Hồi Da",
    "imgSrc": "images/sp-vlift.png",
    "tags": [
      "loai-serum-kem",
      "loai-chuyen-sau",
      "da-lao-hoa",
      "da-nhay-cam",
      "hc-niacinamide",
      "hc-peptide"
    ],
    "price": 980000,
    "topDesc": "Korean Clinical Formula – Khoa học nâng cơ trẻ hóa toàn diện. Kiểm nghiệm & chứng nhận bởi Viện Da Liễu Hàn Quốc (KDRI & KAHSRC).",
    "congDung": "Nâng cơ, làm mờ nếp nhăn sâu và ngăn ngừa chảy xệ cơ mặt. Đồng thời phục hồi nhanh chóng hàng rào bảo vệ da, cấp ẩm tầng sâu giúp da luôn săn chắc và trẻ hóa từ gốc.",
    "ketQua": "Da cải thiện rõ rệt độ đàn hồi (+28%), nếp nhăn giảm đáng kể (-23%) sau 2–4 tuần sử dụng. Sản phẩm đạt chứng nhận an toàn, lành tính bởi Viện Da Liễu Hàn Quốc.",
    "hoatChat": "Melatrepein 2%, Niacinamide 4%, Adenosine, 6 Peptide Complex, 5 Cica Complex, Active Postbiotics, Blue Complex HR",
    "congDungChinh": [
      "Nâng cơ – Săn chắc: Hỗ trợ nâng đỡ cấu trúc da, cải thiện độ đàn hồi và làm mềm nếp nhăn.",
      "Phục hồi & Tái tạo: Tái tạo tế bào, phục hồi tổn thương và củng cố nền da khỏe mạnh từ bên trong.",
      "Bảo vệ toàn diện: Chống oxy hóa, bảo vệ hàng rào da trước tác hại từ môi trường và lão hóa sớm."
    ],
    "coChe": "Tác động sâu vào nguyên bào sợi, kích thích sản sinh Collagen và Elastin tự nhiên. Sự kết hợp giữa Melatrepein và hệ thống Peptide giúp tái định hình đường nét khuôn mặt.",
    "huongDan": "1. Làm sạch và cân bằng da.\n2. Lấy một lượng kem vừa đủ, thoa đều lên toàn bộ khuôn mặt và cổ.\n3. Massage nhẹ nhàng theo chiều từ dưới lên trên, từ trong ra ngoài để kem thẩm thấu và hỗ trợ nâng cơ.\n4. Sử dụng 2 lần/ngày (Sáng & Tối).",
    "thanhPhan": "Water, Glycerin, Caprylic/Capric Triglyceride, Niacinamide, Melatrepein, Adenosine, Cica Complex, Peptide Complex...",
    "tangCuong": "Kết hợp cùng NMN.C+ Glow Sun Cream để bảo vệ da toàn diện ban ngày.",
    "congNghe": "Công nghệ DNA Epigen™ giúp tối ưu hóa khả năng thẩm thấu và hoạt động của các hoạt chất.",
    "gallery": [
      "images/sp-vlift.png",
      "https://md-care.vn/wp-content/uploads/2023/11/Banner-V-lift-kem-duong.jpg"
    ]
  },
  {
    "id": "sp23",
    "name": "NMN.C+ Glow Sun Cream",
    "subName": "Kem Chống Nắng Phục Hồi Chống Lão Hóa NMN.C+ SPF 50+ PA++++",
    "badge": "NEW",
    "desc": "Kem Chống Nắng Chống Lão Hóa SPF 50+ PA++++",
    "imgSrc": "images/sp-suncream.png",
    "tags": [
      "loai-chong-nang",
      "loai-chuyen-sau",
      "da-lao-hoa",
      "da-tham-sam",
      "hc-nmn",
      "hc-niacinamide"
    ],
    "price": 590000,
    "topDesc": "Bảo vệ phổ rộng ưu việt. Hàng rào vô hình ngăn chặn hoàn toàn tác hại của tia UV và ánh sáng xanh.",
    "congDung": "Bảo vệ da khỏi tác hại của tia UV và môi trường. Ngăn ngừa lão hóa sớm, sạm nám. Hỗ trợ làm sáng da và nâng tông nhẹ nhàng tự nhiên.",
    "ketQua": "Bảo vệ da liên tục nhiều giờ liền. Cảm giác mỏng nhẹ, không gây nhờn rít, không để lại vệt trắng.",
    "hoatChat": "NMN, Vitamin C (Dạng ổn định), Zinc Oxide, Titanium Dioxide, Tinosorb S, Uvinul A Plus, HA, Panthenol",
    "congDungChinh": [
      "Bảo vệ quang phổ rộng: Chống lại tia UVA, UVB, HEV, IR.",
      "Chống lão hóa & Dưỡng sáng: NMN và Vitamin C ức chế gốc tự do, kích thích tăng sinh collagen.",
      "Hiệu ứng Tone Up: Nâng tông da mỏng nhẹ, rạng rỡ tự nhiên, có thể dùng thay kem lót."
    ],
    "coChe": "Tạo màng lọc vật lý lai hóa học bền vững. Cung cấp màng bảo vệ chống oxy hóa nội sinh giúp vô hiệu hóa các gốc tự do do tia tử ngoại gây ra.",
    "huongDan": "1. Lấy một lượng kem vừa đủ.\n2. Thoa đều lên mặt và cổ trước khi ra ngoài 15-20 phút.\n3. Thoa lại sau mỗi 3-4 giờ hoặc sau khi vận động, đổ nhiều mồ hôi.",
    "thanhPhan": "Water, Cyclopentasiloxane, Zinc Oxide, Ethylhexyl Methoxycinnamate, Titanium Dioxide, Niacinamide, NMN...",
    "tangCuong": "Nên kết hợp dùng tinh chất NMN.P+ Regen First Essence trước khi thoa kem chống nắng.",
    "congNghe": "Công nghệ bọc vi nang giúp màng lọc bền vững và an toàn cho cả da nhạy cảm.",
    "gallery": [
      "images/sp-suncream.png",
      "https://md-care.vn/wp-content/uploads/2023/11/Banner-sun-cream.jpg"
    ]
  },
  {
    "id": "sp24",
    "name": "Ceramide Cica Barrier Gel",
    "subName": "Gel Rửa Mặt Dịu Nhẹ, Cân Bằng pH & Phục Hồi Hàng Rào Bảo Vệ Da",
    "badge": "BEST SELLER",
    "desc": "Gel Rửa Mặt Phục Hồi Hàng Rào Bảo Vệ Da",
    "imgSrc": "images/sp-cleanser.png",
    "tags": [
      "loai-sua-rua-mat",
      "loai-co-ban",
      "da-dau",
      "da-nhay-cam",
      "hc-b5",
      "hc-peptide"
    ],
    "price": 380000,
    "topDesc": "Sạch sâu nhưng không khô căng. Giải pháp tối ưu cho làn da tổn thương, mỏng yếu cần phục hồi chuyên sâu.",
    "congDung": "Làm sạch sâu lỗ chân lông mà không làm mất độ ẩm tự nhiên. Làm dịu da nhạy cảm, hỗ trợ duy trì độ pH lý tưởng (5.5).",
    "ketQua": "Da sạch thoáng, mềm mịn tức thì. Không căng rát sau khi rửa. Tình trạng mẩn đỏ và kích ứng giảm hẳn sau 1 tuần sử dụng.",
    "hoatChat": "Prebiotics, Probiotics Ferment, Panthenol (B5), Chiết xuất rau má (Centella Asiatica), HA đa tầng",
    "congDungChinh": [
      "Làm sạch dịu nhẹ: Sạch sâu nhưng không bào mòn hay gây khô da.",
      "Cân bằng hệ vi sinh: Bổ sung lợi khuẩn, tăng cường hàng rào bảo vệ.",
      "Phục hồi & Làm dịu: Giảm kích ứng, mẩn đỏ nhờ B5 và Cica."
    ],
    "coChe": "Sử dụng hệ chất hoạt động bề mặt nguồn gốc thiên nhiên dịu nhẹ. Cung cấp thức ăn (Prebiotics) cho lợi khuẩn tự nhiên trên da phát triển mạnh.",
    "huongDan": "1. Làm ướt da mặt.\n2. Lấy một lượng gel vừa đủ ra tay, tạo bọt nhẹ.\n3. Massage nhẹ nhàng lên toàn bộ khuôn mặt trong 30 - 60 giây.\n4. Rửa sạch lại với nước.",
    "thanhPhan": "Water, Sodium Cocoyl Glutamate, Lauryl Glucoside, Glycerin, Panthenol, Centella Asiatica Extract, Prebiotics...",
    "tangCuong": "Dùng kết hợp với NMN.P+ Regen First Essence ngay sau khi rửa mặt.",
    "congNghe": "Công nghệ Microbiome-Friendly tiên tiến.",
    "gallery": [
      "images/sp-cleanser.png",
      "https://md-care.vn/wp-content/uploads/2023/11/Banner-cleansing.jpg"
    ]
  },
  {
    "id": "sp25",
    "name": "NMN.P+ Regen First Essence",
    "subName": "Tinh Chất Kích Hoạt NMN, B5 & Peptide Phục Hồi Da Đa Tầng",
    "badge": "",
    "desc": "Tinh Chất NMN Kích Hoạt Phục Hồi Đa Tầng",
    "imgSrc": "images/sp-essence.png",
    "tags": [
      "loai-serum-kem",
      "loai-co-ban",
      "loai-chuyen-sau",
      "da-nhay-cam",
      "da-lao-hoa",
      "hc-nmn",
      "hc-b5"
    ],
    "price": 650000,
    "topDesc": "Bước kích hoạt 'vàng' đánh thức làn da, mở đường cho các dưỡng chất thẩm thấu tối đa vào các lớp biểu bì sâu hơn.",
    "congDung": "Cấp ẩm sâu tức thì, kích hoạt khả năng hấp thụ dưỡng chất của da. Thúc đẩy quá trình tái tạo, trẻ hóa da toàn diện, giảm thiểu các dấu hiệu mệt mỏi.",
    "ketQua": "Da ẩm mượt, căng mọng ngay sau lần đầu sử dụng. Độ rạng rỡ cải thiện rõ rệt, kết cấu da săn chắc hơn sau 2 tuần.",
    "hoatChat": "NMN tinh khiết 99.9%, Multi-Peptide Complex, Niacinamide, PDRN (DNA Cá Hồi), HA 8D",
    "congDungChinh": [
      "Trẻ hóa cấp độ tế bào: NMN tăng cường NAD+, sửa chữa DNA tổn thương.",
      "Tái sinh độ đàn hồi: PDRN và Peptide kích thích tăng sinh Collagen.",
      "Cấp nước tầng sâu: HA 8D giữ ẩm đa tầng, giúp da luôn ngậm nước."
    ],
    "coChe": "Dạng essence lỏng nhẹ thẩm thấu cực nhanh, đưa các phân tử NMN và PDRN siêu nhỏ tiến sâu vào lớp trung bì, kích hoạt tín hiệu tái sinh tế bào.",
    "huongDan": "1. Sử dụng ngay sau bước làm sạch (thay thế toner/nước hoa hồng).\n2. Cho vài giọt essence ra tay hoặc bông tẩy trang, vỗ nhẹ lên toàn bộ khuôn mặt và cổ.\n3. Tiếp tục với các bước serum và kem dưỡng.",
    "thanhPhan": "Water, Butylene Glycol, Glycerin, Niacinamide, NMN, Sodium DNA (PDRN), Sodium Hyaluronate, Peptides...",
    "tangCuong": "Khóa ẩm bằng Lucenva V-Lift Cream để đạt hiệu quả chống lão hóa tối đa.",
    "congNghe": "Công nghệ Liposome bao bọc PDRN & NMN.",
    "gallery": [
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
