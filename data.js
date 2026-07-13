/* ================================================================
   1. KHUNG DỮ LIỆU MẶC ĐỊNH (DEFAULT)
   Những cái gì dùng chung cho mọi sản phẩm thì để ở đây.
   Đỡ phải copy/paste lại hàng chục lần!
   ================================================================ */
const defaultProductInfo = {
    subName: "Dược mỹ phẩm chăm sóc da chuyên sâu",
    topDesc: "Sản phẩm thuộc hệ sinh thái MD CARE PRO, mang lại hiệu quả vượt trội nhờ ứng dụng công nghệ DNA Epigen™.",
    congDung: "Đang cập nhật...",
    ketQua: "Đang cập nhật...",
    hoatChat: "Đang cập nhật...",
    congDungChinh: ["Đang cập nhật..."],
    coChe: "Đang cập nhật...",
    huongDan: "Đang cập nhật...",
    thanhPhan: "Đang cập nhật...",
    tangCuong: "ĐANG CẬP NHẬT",
    congNghe: "Đang cập nhật...",
    gallery: ["https://md-care.vn/wp-content/uploads/2025/08/back-tron-copy-1024x1024.png"]
};

/* ================================================================
   2. KHO DỮ LIỆU CỤ THỂ TỪNG SẢN PHẨM (DATABASE)
   ================================================================ */
const productDatabase = {

    // QUÀ TẶNG — dữ liệu dự phòng khi chưa gọi được Backend API.
    // Nội dung chính thức (tên, ảnh, mô tả) nên chỉnh trong Admin Panel (/admin),
    // vì lúc tải trang xong dữ liệu ở đây sẽ bị dữ liệu thật từ database ghi đè (xem cuối file).
    "gift-tui-luxury": {
        subName: "Túi Xách Cao Cấp",
        topDesc: "Túi xách cao cấp thiết kế sang trọng, phù hợp làm quà tặng doanh nghiệp hoặc đối tác.",
        congDung: "Đựng mỹ phẩm, quà tặng hoặc sử dụng như một phụ kiện thời trang sang trọng.",
        gallery: ["images/lucenva_tui_luxury.jpg", "images/tui-harmony.jpg", "images/Lucenva_VN_Koreabeautyharmony.jpg"]
    },
    "gift-tui-nhenhang": {
        subName: "Túi Tote Vải Canvas",
        topDesc: "Túi tote canvas form rộng, họa tiết hạc - núi - ngựa đặc trưng của Lucenva, nhẹ nhàng và tiện dụng.",
        congDung: "Đựng vật dụng cá nhân, mỹ phẩm, tài liệu khi đi làm, đi chơi; bền bỉ và thân thiện với môi trường.",
        gallery: ["images/lucenva_tui_nhenhang.jpg", "images/tui_lucenva.jpg", "images/tui-thien-nhien.jpg"]
    },
    "gift-da-guasha": {
        subName: "Đá Thạch Anh Xanh Nguyên Khối (Kèm Hộp)",
        topDesc: "Đá Guasha thạch anh xanh tự nhiên nguyên khối, đóng hộp sang trọng — món quà tặng tinh tế.",
        congDung: "Dùng để massage Guasha nâng cơ mặt, kích thích tuần hoàn máu, hỗ trợ dưỡng chất thẩm thấu sâu hơn.",
        gallery: ["images/guasha.jpg"]
    },
    "gift-da-thachanh": {
        subName: "Massage Nâng Cơ Cao Cấp",
        topDesc: "Đá thạch anh tự nhiên nguyên khối giúp massage nâng cơ định hình khuôn mặt hiệu quả.",
        congDung: "Dùng để massage nâng cơ mặt, kích thích tuần hoàn máu, hỗ trợ kem dưỡng thẩm thấu sâu hơn.",
        gallery: ["images/lucenva_stone.jpg"]
    },
    
    // SẢN PHẨM 22: LUCENVA V-LIFT CREAM
    "sp22": {
        subName: "Kem Dưỡng Nâng Cơ, Chống Lão Hóa Toàn Diện & Phục Hồi Da",

        topDesc: "Korean Clinical Formula – Khoa học nâng cơ trẻ hóa toàn diện. Kiểm nghiệm & chứng nhận bởi Viện Da Liễu Hàn Quốc (KDRI & KAHSRC).",

        congDung: "Nâng cơ, làm mờ nếp nhăn sâu và ngăn ngừa chảy xệ cơ mặt. Đồng thời phục hồi nhanh chóng hàng rào bảo vệ da, cấp ẩm tầng sâu giúp da luôn săn chắc và trẻ hóa từ gốc.",

        ketQua: "Da cải thiện rõ rệt độ đàn hồi (<strong>+28%</strong>), nếp nhăn giảm đáng kể (<strong>-23%</strong>) sau 2–4 tuần sử dụng. Sản phẩm đạt chứng nhận an toàn, lành tính bởi Viện Da Liễu Hàn Quốc (KDRI & KAHSRC).",

        hoatChat: "Melatrepein 2%, Niacinamide 4%, Adenosine, 6 Peptide Complex (Copper Tripeptide-1, Palmitoyl Tripeptide-1, Palmitoyl Pentapeptide-4, Acetyl Hexapeptide-8...), 5 Cica Complex, Active Postbiotics, Blue Complex HR",

        congDungChinh: [
            "<strong>Nâng cơ – Săn chắc:</strong> Hỗ trợ nâng đỡ cấu trúc da, cải thiện độ đàn hồi và làm mềm nếp nhăn.",
            "<strong>Phục hồi & Tái tạo:</strong> Tái tạo tế bào, phục hồi tổn thương và củng cố nền da khỏe mạnh từ bên trong.",
            "<strong>Bảo vệ toàn diện:</strong> Chống oxy hóa, bảo vệ hàng rào da trước tác hại từ môi trường và lão hóa sớm.",
            "<strong>Sáng mịn – Đều màu:</strong> Giúp da sáng mịn, giảm thâm nám và mang lại làn da rạng rỡ tự nhiên.",
            "<strong>Dịu nhẹ & An toàn:</strong> Công thức lành tính, phù hợp cho mọi loại da, kể cả da nhạy cảm."
        ],

        coChe: `
            <p style="margin-bottom: 16px;"><strong>Cơ chế 5 Tầng Công Nghệ Nâng Cơ – Tác động đa tầng từ ngoài vào trong:</strong></p>
            <ul style="list-style: none; padding-left: 20px;">
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Tầng 1 – Barrier (Phục hồi & Bảo vệ):</strong> Tăng cường hàng rào bảo vệ, giữ ẩm, làm dịu. Niacinamide 4%, Betaine, Sodium Hyaluronate, Active Postbiotics, 5-CICA Complex.
                </li>
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Tầng 2 – Activation (Kích hoạt tái tạo):</strong> Thúc đẩy tái tạo tế bào, cải thiện độ đàn hồi. Sodium Hyaluronate, Betaine, Butylene Glycol, Active Postbiotics.
                </li>
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Tầng 3 – Signaling (Nâng đỡ cấu trúc):</strong> Gửi tín hiệu trẻ hóa, kích thích sản sinh collagen & elastin. 6-Peptide Complex, Melatrepein.
                </li>
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Tầng 4 – Soothing (Làm dịu đa tầng):</strong> Giảm viêm, chống oxy hóa, bảo vệ da khỏi tác nhân gây hại. 5-CICA Complex, Blue Complex HR, Botanical Soothing Complex.
                </li>
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Tầng 5 – Anti-Aging (Chống lão hóa):</strong> Cải thiện nếp nhăn, tăng độ săn chắc, ngăn ngừa lão hóa sớm. Adenosine, Niacinamide 4%, Peptide Complex.
                </li>
            </ul>
            <p style="margin-top: 16px;">Ngăn chặn hoàn toàn sự đứt gãy sợi liên kết Fibroblast, bù đắp lượng collagen thiếu hụt do tuổi tác.</p>
        `,

        huongDan: `
            <p style="margin-bottom: 12px;"><strong>Kết cấu:</strong> Dạng Gel-cream mỏng nhẹ như lụa, tan nhanh không bết dính bóng nhờn, hợp khí hậu Việt Nam.</p>
            <ul class="sp-bullet-list">
                <li>Sử dụng đều đặn <strong>2 lần/ngày</strong> (Sáng/Tối) ở bước cuối cùng của chu trình skincare.</li>
                <li>Lấy một lượng sản phẩm vừa đủ (khoảng hạt đậu) thoa đều toàn mặt và cổ.</li>
                <li>Massage nhẹ nhàng theo hướng <strong>từ dưới lên trên, từ trong ra ngoài</strong> để hỗ trợ nâng cơ.</li>
                <li>Để kem thẩm thấu hoàn toàn trước khi thoa kem chống nắng vào buổi sáng.</li>
            </ul>
            <p style="margin-top:20px; margin-bottom: 12px;"><strong>Cam kết an toàn:</strong></p>
            <ul class="sp-bullet-list">
                <li>Công thức thuần chay, không cồn, không paraben.</li>
                <li>Đạt tiêu chuẩn CGMP Hàn Quốc.</li>
                <li>Phù hợp mọi loại da, kể cả da nhạy cảm.</li>
                <li>An toàn cho mẹ bầu và đang cho con bú.</li>
            </ul>
        `,

        thanhPhan: "Aqua, Butylene Glycol, Glycerin, Niacinamide, Cetearyl Alcohol, Dimethicone, Caprylic/Capric Triglyceride, Sodium Hyaluronate, Adenosine, Melatrepein, Copper Tripeptide-1, Palmitoyl Tripeptide-1, Palmitoyl Pentapeptide-4, Acetyl Hexapeptide-8, Hexapeptide-9, Sh-Polypeptide-1, Centella Asiatica Extract, Madecassoside, Asiaticoside, Asiatic Acid, Madecassic Acid, Lactobacillus Ferment, Bifida Ferment Lysate, Betaine, Panthenol, Allantoin, Tocopheryl Acetate, Houttuynia Cordata Extract, Camellia Sinensis Leaf Extract, Cetearyl Olivate, Sorbitan Olivate, Polysorbate 60, Carbomer, Triethanolamine, Disodium EDTA, Phenoxyethanol, Ethylhexylglycerin",

        tangCuong: "Lucenva Regen First Essence (Tinh chất khởi nguồn), Lucenva V-Lift Ampoule (nếu có), Lucenva NMN.C+ Sun Cream (Kem chống nắng nâng tông).",

        congNghe: `
            <p style="margin-bottom:12px; font-size: 15px;"><strong>1/ MELATREPEIN 2%</strong></p>
            <p style="margin-bottom:12px;">Enzyme thế hệ mới giúp hỗ trợ tái tạo tế bào, cải thiện bề mặt da, làm mịn và rạng rỡ hơn. Kết hợp cùng Niacinamide 4% tạo thành bộ đôi ngăn chặn và phân hủy hắc tố Melanin, dưỡng sáng đều màu và se khít lỗ chân lông.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>2/ 6-PEPTIDE COMPLEX – "LIFTING SIGNALING"</strong></p>
            <p style="margin-bottom:12px;">Chuỗi peptide đỉnh cao gồm Copper Tripeptide-1, Palmitoyl Pentapeptide-4, Acetyl Hexapeptide-8... hoạt động như một liệu pháp "Botox tự nhiên" – gửi tín hiệu tái tạo đến tế bào, kích thích sản sinh collagen, elastin, làm mềm nếp nhăn biểu cảm và nâng đỡ cấu trúc da.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>3/ ADENOSINE – "K-BEAUTY WRINKLE CARE"</strong></p>
            <p style="margin-bottom:12px;">Hoạt chất cải thiện nếp nhăn đã hình thành, tăng độ đàn hồi và độ săn chắc. Hỗ trợ năng lượng tế bào, làm chậm lão hóa.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>4/ 5-CICA COMPLEX & BLUE COMPLEX HR</strong></p>
            <p style="margin-bottom:12px;">Hệ làm dịu đa tầng cực kỳ hợp khí hậu Việt Nam. 5-CICA Complex (Centella Asiatica, Madecassoside, Asiaticoside, Asiatic Acid, Madecassic Acid) kết hợp Blue Complex HR (hỗn hợp chiết xuất xanh độc quyền) giúp giảm viêm, đỏ rát, kích ứng, chống oxy hóa mạnh mẽ, bảo vệ da trước ô nhiễm & tia UV.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>5/ ACTIVE POSTBIOTICS & SODIUM HYALURONATE</strong></p>
            <p>Pre-Post Biotics cân bằng hệ vi sinh, tăng cường sức khỏe làn da, giảm nhạy cảm và hỗ trợ hấp thu dưỡng chất tối ưu. Sodium Hyaluronate (HA đa tầng) cấp nước tức thì 24h, duy trì độ ẩm lý tưởng giúp da căng mọng, mềm mịn.</p>
        `,

        gallery: [
            "images/sp-vlift.png",
            "images/sp22-5tang.jpg",
            "images/sp22-main.jpg",
            "images/sp22-melatrepein.jpg",
            "images/sp22-overview.jpg",
            "images/sp22-peptide.jpg"
        ]
    },

    "sp23": {
        subName: "Kem Chống Nắng Chống Lão Hóa | SPF 50+ PA++++ Broad Spectrum | Light Tone Up",

        topDesc: "Anti-Aging Sunscreen for Vietnamese Skin — Khoa học chống nắng bảo vệ & trẻ hóa da. Được nghiên cứu chuyên biệt cho làn da Việt Nam (Fitzpatrick III–IV), kiểm nghiệm lâm sàng tại Hàn Quốc. Tiêu chuẩn sản xuất CGMP Korea.",

        congDung: `
            <ul class="sp-bullet-list">
                <li><strong>Bảo vệ tối đa:</strong> Ngăn chặn tia UV/HEV/IR xâm nhập, bảo vệ DNA tế bào da khỏi tổn thương quang học.</li>
                <li><strong>Ngăn ngừa sạm nám:</strong> Ức chế hình thành hắc tố, giảm đốm nâu và tình trạng xỉn màu do nắng.</li>
                <li><strong>Phục hồi sinh học:</strong> Hỗ trợ tái tạo mô tổn thương, tăng cường sức khỏe màng da sau laser/peel/acid.</li>
                <li><strong>Chống lão hóa chuyên sâu:</strong> Bảo tồn Collagen & Elastin, duy trì độ đàn hồi và ngăn Photoaging.</li>
            </ul>
        `,

        ketQua: `Sau <strong>4 tuần</strong> kiểm nghiệm lâm sàng:<br>
            <ul class="sp-bullet-list" style="margin-top:10px;">
                <li>Giảm sạm nám <strong>-28.6%</strong></li>
                <li>Tăng đều màu da <strong>+18.7%</strong></li>
                <li>Tăng độ ẩm <strong>+32.4%</strong></li>
                <li>Nếp nhăn giảm <strong>-21.3%</strong></li>
                <li><strong>93%</strong> người dùng thấy da sáng hồng tự nhiên</li>
                <li><strong>87%</strong> thấy lỗ chân lông mịn màng hơn rõ rệt</li>
            </ul>`,

        hoatChat: "NMN (Nicotinamide Mononucleotide), Vitamin C (Ascorbic Acid), Adenosine, Barrier Care Complex (Glycerin, Lecithin, Sorbitan Olivate), Titanium Dioxide, Ethylhexyl Triazone, DHHB, Ethylhexyl Salicylate",

        congDungChinh: [
            "<strong>Bảo vệ tối đa khỏi tia UV/HEV/IR:</strong> Hệ 4 lớp màng lọc kép (vật lý + hóa học) chặn toàn diện phổ ánh sáng có hại, bảo vệ DNA và ngăn ngừa Photoaging.",
            "<strong>Trẻ hóa chủ động với NMN.C+:</strong> NMN chuyển hóa thành NAD+, kích hoạt gen Sirtuins trường thọ, sửa chữa DNA tổn thương. Vitamin C trung hòa gốc tự do ROS và kích thích tổng hợp Collagen.",
            "<strong>Xóa nhăn & Phục hồi hàng rào:</strong> Adenosine kích thích sản sinh Elastin, làm mờ rãnh nhăn nông/sâu. Barrier Care giảm mất nước TEWL đến -27%, phục hồi da sau treatment.",
            "<strong>Nâng tông & Kiểm soát dầu:</strong> Kết cấu gel-cream mỏng nhẹ tạo hiệu ứng màng lọc silicon cao cấp, nâng tông tự nhiên, không bóng dầu bết dính.",
            "<strong>Chuyên biệt cho làn da Việt Nam:</strong> Nghiên cứu tối ưu cho Fitzpatrick III–IV — dễ bắt nắng, dễ tăng sắc tố. Phù hợp da văn phòng, da treatment, da lão hóa và makeup daily."
        ],

        coChe: `
            <p style="margin-bottom: 16px;"><strong>Hệ Thống 4 Lớp Màng Lọc Bảo Vệ Toàn Phổ:</strong></p>
            <ul style="list-style: none; padding-left: 20px;">
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Lớp 1 – Titanium Dioxide (Phản xạ vật lý):</strong> Phản chiếu và tán xạ toàn bộ tia UV ngay trên bề mặt da, không thấm vào da, an toàn tuyệt đối cho da nhạy cảm.
                </li>
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Lớp 2 – Ethylhexyl Triazone (Hấp thụ UVB bền vững):</strong> Bộ lọc UVB thế hệ mới có độ ổn định quang học cao, duy trì hiệu quả ngay cả khi tiếp xúc nắng gắt kéo dài.
                </li>
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Lớp 3 – DHHB (Hấp thụ UVA tối đa):</strong> Diethylamino Hydroxybenzoyl Hexyl Benzoate — bộ lọc UVA phổ rộng, ngăn chặn tia UVA thâm nhập sâu gây lão hóa và sạm nám.
                </li>
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Lớp 4 – Ethylhexyl Salicylate (Phối hợp & Ổn định):</strong> Hấp thụ bổ sung UVB, đồng thời làm tăng độ ổn định của toàn bộ hệ màng lọc, kéo dài thời gian bảo vệ hiệu quả.
                </li>
            </ul>
            <p style="margin-top: 16px;">Tổng hợp bảo vệ toàn diện: UVA / UVB / HEV (ánh sáng xanh) / IR (tia hồng ngoại) — ngăn chặn cả cơ chế tổn thương DNA lẫn Photoaging.</p>
        `,

        huongDan: `
            <p style="margin-bottom: 12px;"><strong>Công Thức Độc Quyền NMN.C+ — Cơ Chế Năng Lượng Tế Bào:</strong></p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>NMN – Nicotinamide Mononucleotide "Năng Lượng Tế Bào Trẻ Hóa"</strong></p>
            <p style="margin-bottom:14px;">Tiền chất trực tiếp của NAD+ — phân tử năng lượng tế bào thiết yếu. NMN kích hoạt gen trường thọ Sirtuins, thúc đẩy sửa chữa DNA tổn thương do ánh nắng. Lâm sàng: tăng NAD+ <strong>+95%</strong>, tăng sức sống tế bào <strong>+63%</strong>, giảm gốc tự do <strong>-48%</strong>.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Vitamin C (Ascorbic Acid) — "Bộ Ba Chống Oxy Hóa Mạnh Mẽ"</strong></p>
            <p style="margin-bottom:14px;">Trung hòa gốc tự do ROS từ tia UV, ức chế men Tyrosinase làm mờ thâm sạm, kích thích tổng hợp Collagen type I & III — phối hợp cùng NMN tạo phức hợp chống lão hóa kép chưa từng có trong kem chống nắng.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Adenosine — "K-Beauty Wrinkle Eraser"</strong></p>
            <p style="margin-bottom:14px;">Được Bộ Y tế Hàn Quốc công nhận kích thích Fibroblast sản sinh Elastin, làm mờ cả rãnh nhăn nông lẫn sâu. Đồng thời giảm viêm, dịu da sau tiếp xúc nắng kéo dài.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Barrier Care Complex — "Phục Hồi Màng Da Hoàn Hảo"</strong></p>
            <p>Hệ phức hợp Glycerin + Lecithin + Sorbitan Olivate giảm mất nước xuyên biểu bì (TEWL) đến <strong>-27%</strong>. Đặc biệt hiệu quả phục hồi da sau laser, peel, acid treatment.</p>
        `,

        thanhPhan: `
            <p style="margin-bottom: 12px;"><strong>Quy Tắc Thoa 3 Tầng — Tối Ưu Bảo Vệ SPF 50+:</strong></p>
            <ul class="sp-bullet-list">
                <li><strong>Lượng dùng chuẩn "2 finger":</strong> Lấy kem trải đều theo chiều dài 2 đốt ngón tay — đủ lượng để phát huy tối đa chỉ số SPF 50+ PA++++.</li>
                <li><strong>Thoa trước khi ra ngoài 15 phút:</strong> Cho màng lọc đủ thời gian bám dính và hình thành lớp bảo vệ hoàn chỉnh trên bề mặt da.</li>
                <li><strong>Thoa lại sau 1–3 giờ:</strong> Văn phòng lạnh (3h), ngoài trời (1–2h), sau khi đổ mồ hôi hoặc tiếp xúc nước.</li>
                <li>Sử dụng ở <strong>bước cuối cùng</strong> của chu trình skincare buổi sáng, sau serum và kem dưỡng.</li>
            </ul>
            <p style="margin-top:20px; margin-bottom: 12px;"><strong>Cam kết an toàn & Tiêu chuẩn sản xuất:</strong></p>
            <ul class="sp-bullet-list">
                <li><strong>Made in Korea</strong> — Sản xuất tại Hàn Quốc, đạt tiêu chuẩn CGMP (Current Good Manufacturing Practice).</li>
                <li><strong>Kiểm nghiệm Patch Test</strong> — Không gây kích ứng, phù hợp cả da nhạy cảm và da sau điều trị.</li>
                <li>Không cồn, không Paraben, không hương liệu mạnh.</li>
                <li>An toàn cho da sau laser, peel và các liệu trình điều trị chuyên sâu.</li>
            </ul>
            <p style="margin-top:16px;"><strong>Thành phần đầy đủ (Full Ingredients):</strong></p>
            <p style="font-size:13px; color:#666; line-height:1.8; margin-top:8px;">Aqua, Cyclopentasiloxane, Titanium Dioxide, Ethylhexyl Triazone, Diethylamino Hydroxybenzoyl Hexyl Benzoate (DHHB), Ethylhexyl Salicylate, Nicotinamide Mononucleotide (NMN), Ascorbic Acid (Vitamin C), Adenosine, Glycerin, Lecithin, Sorbitan Olivate, Cetearyl Olivate, Butylene Glycol, Sodium Hyaluronate, Dimethicone, Caprylic/Capric Triglyceride, Niacinamide, Panthenol, Tocopheryl Acetate, Allantoin, Carbomer, Triethanolamine, Phenoxyethanol, Ethylhexylglycerin.</p>
        `,

        tangCuong: "Lucenva V-Lift Cream (Kem nâng cơ chống lão hóa — dùng trước bước kem chống nắng), Lucenva Regen First Essence (Tinh chất khởi nguồn — dùng sau toner), VitaC-Arbutin Serum (Tăng cường dưỡng sáng ban đêm).",

        accordionTitles: [
            'Công dụng chính — 5 Tác động cốt lõi',
            'Công nghệ 4 Lớp màng lọc chống nắng toàn phổ',
            'Công thức NMN.C+ & Cơ chế năng lượng tế bào',
            'Quy tắc thoa đúng cách & Cam kết an toàn',
            'Giải pháp chống nắng "may đo" cho da Việt Nam'
        ],

        congNghe: `
            <p style="margin-bottom:16px; font-size: 15px;"><strong>Tại Sao Người Việt Cần Một Kem Chống Nắng Riêng Biệt?</strong></p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>1/ Chỉ số UV tại Việt Nam — Thuộc nhóm cực cao thế giới</strong></p>
            <p style="margin-bottom:14px;">Việt Nam nằm trong vùng khí hậu nhiệt đới — chỉ số UV trung bình 9–12 (Very High đến Extreme) trong mùa hè, kéo dài từ 9h–16h. Da người Việt tiếp xúc cường độ UV gấp 2–3 lần so với da người châu Âu. LUCENVA NMN.C+ được xây dựng để đáp ứng tải lượng UV thực tế này.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>2/ Đặc điểm làn da Việt Nam — Fitzpatrick III–IV</strong></p>
            <p style="margin-bottom:14px;">Da người Việt thuộc nhóm Fitzpatrick III–IV: dễ bắt nắng, dễ tăng sắc tố và dễ để lại thâm nám kéo dài. Hệ màng lọc 4 lớp và công thức NMN.C+ được tối ưu hóa đặc biệt cho cơ chế này — không chỉ chống nắng mà còn ngăn kích hoạt tế bào sắc tố Melanocyte sau tổn thương UV.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>3/ Kết cấu thuần Việt — Không bét, không trắng bệch, không tắc lỗ chân lông</strong></p>
            <p style="margin-bottom:14px;">Kết cấu gel-cream mỏng nhẹ như lụa, thấm hút nhanh trong khí hậu nóng ẩm, tạo màng silicon cao cấp mịn màng không bóng dầu. Nâng tông nhẹ tự nhiên (Light Tone Up) — hoàn toàn phù hợp dưới lớp makeup, da ra đường nhiều, da sau treatment và da văn phòng điều hòa.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>4/ Đối tượng phù hợp</strong></p>
            <ul class="sp-bullet-list">
                <li>Da lão hóa sớm, nám, tàn nhang, da xỉn màu</li>
                <li>Da đang trong liệu trình điều trị: laser, peel, acid, retinol</li>
                <li>Dân văn phòng dùng makeup hằng ngày cần nền mịn và nhẹ</li>
                <li>Người ra nắng nhiều, vận động ngoài trời</li>
                <li>Da nhạy cảm cần màng bảo vệ không kích ứng</li>
            </ul>
        `,

        gallery: [
            "images/sp-suncream.png",
            "images/sp23-formula.jpg",
            "images/sp23-main.jpg",
            "images/sp23-nmn.jpg",
            "images/sp23-results.jpg",
            "images/sp23-vietnam.jpg"
        ]
    },

    "sp24": {
        subName: "Gel Làm Sạch Tiền Dưỡng Thế Hệ Mới — Microbiome Friendly Cleanser",

        topDesc: "Cleanse + Treat + Prime — Không chỉ làm sạch mà chuẩn bị làn da hoàn hảo hấp thu dưỡng chất phía sau. Công thức nền Amino Acid dịu nhẹ, bảo tồn hệ vi sinh tự nhiên, kiểm nghiệm lâm sàng tại Hàn Quốc.",

        congDung: `
            <ul class="sp-bullet-list">
                <li><strong>Làm sạch thông minh:</strong> Loại bỏ bã nhờn, bụi mịn PM2.5 và kem chống nắng hiệu quả mà không phá vỡ hàng rào bảo vệ tự nhiên.</li>
                <li><strong>Bảo tồn hệ vi sinh Microbiome:</strong> Công nghệ Postbiotic giữ nguyên hệ sinh thái vi khuẩn có lợi trên da, ngăn ngừa tình trạng Over-cleansing.</li>
                <li><strong>Tiền dưỡng tối ưu (Priming):</strong> Chuẩn bị nền da mịn màng, cân bằng pH giúp các bước dưỡng sau hấp thu dưỡng chất tối đa.</li>
            </ul>
        `,

        ketQua: `Sau <strong>4 tuần</strong> kiểm nghiệm lâm sàng:<br>
            <ul class="sp-bullet-list" style="margin-top:10px;">
                <li>Cải thiện hàng rào bảo vệ da <strong>+31%</strong></li>
                <li>Tăng độ ẩm da <strong>+36%</strong></li>
                <li>Giảm mất nước xuyên biểu bì (TEWL) <strong>-27%</strong></li>
                <li><strong>95%</strong> người dùng cảm nhận da mềm mượt không khô căng sau rửa</li>
                <li><strong>91%</strong> nhận thấy da sáng hơn và lỗ chân lông thông thoáng</li>
            </ul>`,

        hoatChat: "Nền Amino Acid (SCI, Disodium Laureth Sulfosuccinate, Coco Betaine), Postbiotic Lactobacillus Ferment Lysate, 5-Cica Complex, 6 Peptide Cocktail, Niacinamide, Glutathione, Vitamin C, Hệ 7 Thảo Dược Chống Oxy Hóa",

        congDungChinh: [
            "<strong>Làm sạch sâu & Dịu nhẹ:</strong> Hệ nền Amino Acid tạo bọt siêu mịn, loại bỏ bã nhờn và bụi mịn PM2.5 mà không gây rát đỏ, khô căng hay kích ứng — tôn trọng sinh lý tự nhiên của da.",
            "<strong>Bảo tồn Microbiome — Hệ vi sinh da:</strong> Postbiotic Lactobacillus Ferment Lysate củng cố hàng rào miễn dịch da, duy trì cân bằng hệ vi khuẩn có lợi, ngăn chặn tình trạng da suy yếu do tẩy rửa quá mức.",
            "<strong>Phục hồi & Làm dịu cấp tốc:</strong> Full Spectrum 5-Cica (Centella Asiatica + 4 hoạt chất rau má tinh khiết) hạ nhiệt, kháng viêm, chữa lành thương tổn và dịu da sau treatment.",
            "<strong>Bật sáng & Trẻ hóa từ bước rửa mặt:</strong> Bộ ba Niacinamide + Glutathione + Vitamin C làm sáng da xỉn màu. 6 Peptide Cocktail kích thích Fibroblast sản sinh Collagen ngay từ bước làm sạch.",
            "<strong>Tiền dưỡng tối ưu (Priming Effect):</strong> Cân bằng pH, mở khóa lỗ chân lông giúp serum và kem dưỡng thẩm thấu nhanh gấp bội — biến bước rửa mặt thành bước khởi đầu trẻ hóa."
        ],

        coChe: `
            <p style="margin-bottom: 16px;"><strong>Triết Lý "Làm Sạch Thông Minh" — Smart Cleansing Philosophy:</strong></p>
            <p style="margin-bottom:14px;">Vấn đề lớn nhất của skincare hiện đại không phải là thiếu dưỡng chất — mà là <strong>Over-cleansing</strong>: tẩy rửa quá mức phá hủy lớp màng bảo vệ, cuốn trôi lợi khuẩn, khiến da suy yếu từ bước đầu tiên. LUCENVA PEP.G+ được thiết kế để giải quyết triệt để nghịch lý này.</p>
            <ul style="list-style: none; padding-left: 20px;">
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>SCI (Sodium Cocoyl Isethionate):</strong> Chất hoạt động bề mặt gốc dừa cao cấp, tạo bọt mịn dày, sạch sâu nhưng cực kỳ nhẹ dịu — giữ nguyên lớp lipid tự nhiên trên bề mặt da.
                </li>
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Disodium Laureth Sulfosuccinate:</strong> Surfactant siêu dịu nhẹ hàng đầu trong dược mỹ phẩm, không gây kích ứng ngay cả trên da sau laser/peel. Lực tẩy rửa đủ mạnh để cuốn trôi bã nhờn mà pH luôn ổn định.
                </li>
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Coco Betaine:</strong> Chất lưỡng tính gốc dừa tạo bọt kem mượt mà, tăng cường cảm giác mịn mướt sau rửa, đồng thời bảo vệ hàng rào ẩm không bị cuốn trôi.
                </li>
            </ul>
            <p style="margin-top: 16px;">Kết quả: Da sạch thoáng, không khô rát, không bong tróc — hệ vi sinh và lớp acid mantle được bảo tồn nguyên vẹn.</p>
        `,

        huongDan: `
            <p style="margin-bottom: 16px;"><strong>Công Nghệ Microbiome Vi Sinh & Phục Hồi Full Spectrum 5-Cica:</strong></p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Postbiotic Lactobacillus Ferment Lysate — "Lá Chắn Vi Sinh"</strong></p>
            <p style="margin-bottom:14px;">Dịch lên men lợi khuẩn Lactobacillus cung cấp các Postbiotic (sản phẩm sau lên men) giàu peptide kháng khuẩn tự nhiên và acid lactic. Củng cố hàng rào miễn dịch bẩm sinh của da, giảm TEWL (mất nước xuyên biểu bì) đến <strong>-27%</strong>, đồng thời nuôi dưỡng hệ vi sinh Microbiome khỏe mạnh.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Full Spectrum 5-Cica — "Phục Hồi Toàn Phổ Rau Má"</strong></p>
            <p style="margin-bottom:8px;">Không chỉ dùng chiết xuất rau má tổng hợp, LUCENVA PEP.G+ sử dụng cả 5 hoạt chất tinh khiết từ Centella Asiatica:</p>
            <ul class="sp-bullet-list">
                <li><strong>Centella Asiatica Extract:</strong> Chiết xuất toàn phần — hạ nhiệt, dịu da tức thì.</li>
                <li><strong>Asiaticoside:</strong> Kích thích tổng hợp Collagen type I, thúc đẩy chữa lành thương tổn.</li>
                <li><strong>Madecassoside:</strong> Chống viêm, giảm đỏ rát và ngứa kích ứng mạnh mẽ nhất trong họ Cica.</li>
                <li><strong>Asiatic Acid:</strong> Tăng sinh mô liên kết, cải thiện độ đàn hồi da.</li>
                <li><strong>Madecassic Acid:</strong> Kháng khuẩn, giảm viêm mụn, hỗ trợ da phục hồi sau laser/peel.</li>
            </ul>
        `,

        thanhPhan: `
            <p style="margin-bottom: 16px;"><strong>Phức Hợp Trắng Sáng Triple Brightening & 6 Peptide Trẻ Hóa:</strong></p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Triple Brightening Complex</strong></p>
            <ul class="sp-bullet-list" style="margin-bottom:16px;">
                <li><strong>Niacinamide:</strong> Ức chế men Tyrosinase, giảm vận chuyển Melanin, làm đều màu da và se khít lỗ chân lông.</li>
                <li><strong>Glutathione:</strong> "Master Antioxidant" — trung hòa gốc tự do mạnh mẽ, chuyển đổi Eumelanin (sắc tố đen) sang Pheomelanin (sắc tố sáng).</li>
                <li><strong>Vitamin C (Ascorbic Acid):</strong> Kích thích Collagen, mờ thâm sạm, dưỡng sáng da từ tầng sâu biểu bì.</li>
            </ul>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>6 Peptide Cocktail — "Botox Tự Nhiên Từ Bước Rửa Mặt"</strong></p>
            <p style="margin-bottom:8px;">Chuỗi 6 peptide chống lão hóa hoạt động ngay trong 60 giây tiếp xúc da:</p>
            <ul class="sp-bullet-list">
                <li><strong>Copper Tripeptide-1:</strong> Kích thích tái tạo mô, tăng sinh Collagen & Elastin.</li>
                <li><strong>Palmitoyl Tripeptide-1:</strong> Gửi tín hiệu sửa chữa, giảm nếp nhăn nông.</li>
                <li><strong>Palmitoyl Pentapeptide-4 (Matrixyl):</strong> Kích thích ma trận ngoại bào, tăng độ dày và đàn hồi da.</li>
                <li><strong>Acetyl Hexapeptide-8 (Argireline):</strong> Làm mềm nếp nhăn biểu cảm — "Botox không kim".</li>
                <li><strong>Hexapeptide-9:</strong> Hỗ trợ liên kết giữa lớp biểu bì và hạ bì, cải thiện cấu trúc da.</li>
                <li><strong>Sh-Polypeptide-1 (EGF-like):</strong> Mô phỏng EGF — thúc đẩy tái tạo tế bào, làm mới bề mặt da.</li>
            </ul>
        `,

        tangCuong: "Lucenva Regen First Essence (Tinh chất khởi nguồn — dùng ngay sau bước rửa mặt), Lucenva V-Lift Cream (Kem nâng cơ chống lão hóa), Lucenva NMN.C+ Sun Cream (Kem chống nắng nâng tông — bước cuối buổi sáng).",

        accordionTitles: [
            'Công dụng chính — 5 Tác động cốt lõi',
            'Triết lý "Làm sạch thông minh" & Hệ nền Amino Acid',
            'Công nghệ Microbiome vi sinh & 5-Cica phục hồi',
            'Triple Brightening & 6 Peptide trẻ hóa',
            'Hệ 7 Thảo Dược & Hướng dẫn sử dụng'
        ],

        congNghe: `
            <p style="margin-bottom:16px; font-size: 15px;"><strong>Hệ 7 Thảo Dược Chống Oxy Hóa — Botanical Shield Complex:</strong></p>
            <ul class="sp-bullet-list" style="margin-bottom:20px;">
                <li><strong>Trà xanh (Green Tea):</strong> EGCG chống oxy hóa vượt trội, bảo vệ da khỏi stress ô nhiễm.</li>
                <li><strong>Cam thảo (Licorice):</strong> Glabridin ức chế Tyrosinase, dịu da và làm sáng tự nhiên.</li>
                <li><strong>Hắc mai biển (Sea Buckthorn):</strong> Omega-7 hiếm, phục hồi màng da tổn thương.</li>
                <li><strong>Cúc La Mã (Chamomile):</strong> Bisabolol chống viêm, làm dịu da nhạy cảm và đỏ rát.</li>
                <li><strong>Hương thảo (Rosemary):</strong> Carnosic acid bảo vệ Collagen khỏi phân hủy bởi UV.</li>
                <li><strong>Oải hương (Lavender):</strong> Linalool kháng khuẩn nhẹ, giúp thư giãn da kích ứng.</li>
                <li><strong>Hoa lưu ly (Borage):</strong> GLA (Gamma-Linolenic Acid) phục hồi hàng rào lipid thiếu hụt.</li>
            </ul>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Hướng Dẫn Sử Dụng — Skincare Chuẩn Khoa Học:</strong></p>
            <ul class="sp-bullet-list">
                <li>Sử dụng <strong>sáng & tối</strong> ở bước đầu tiên của chu trình skincare.</li>
                <li>Làm ướt da, lấy lượng gel bằng <strong>hạt đậu lớn</strong>, tạo bọt với nước.</li>
                <li>Massage nhẹ nhàng theo hình tròn <strong>30–60 giây</strong>, tập trung vùng chữ T và hai bên cánh mũi.</li>
                <li>Rửa trôi bằng nước ấm, vỗ khô rồi dùng ngay toner hoặc essence.</li>
            </ul>
            <p style="margin-top:16px; margin-bottom: 12px;"><strong>Cam kết an toàn:</strong></p>
            <ul class="sp-bullet-list">
                <li>Công thức thuần chay, không Sulfate gốc cứng (SLS/SLES), không cồn, không Paraben.</li>
                <li>pH 5.5 tối ưu — cân bằng acid mantle tự nhiên.</li>
                <li>Phù hợp: Da dầu mụn, da nhạy cảm, da mụn ẩn bít tắc, da sau treatment (laser, peel, acid).</li>
                <li>Tiêu chuẩn sản xuất CGMP Hàn Quốc.</li>
            </ul>
        `,

        gallery: [
            "images/sp-cleanser.png",
            "images/sp24-aminoacid.jpg",
            "images/sp24-brightening.jpg",
            "images/sp24-main.jpg",
            "images/sp24-microbiome.jpg",
            "images/sp24-overview.jpg"
        ]
    },

    "sp25": {
        subName: "Tinh Chất Khởi Nguồn Trẻ Hóa Da 2 IN 1 — NMN.P+ Regen First Essence",

        topDesc: "Giải pháp tích hợp 2 trong 1: Nước hoa hồng thanh lọc + Tinh chất phục hồi sâu. Bước đệm đầu tiên kích hoạt nền da khỏe mạnh, nạp năng lượng tế bào và hấp thu dưỡng chất tối đa. Kiểm nghiệm & chứng nhận bởi Viện Da Liễu Hàn Quốc (KDRI & KAHSRC).",

        congDung: `
            <ul class="sp-bullet-list">
                <li><strong>2 IN 1 — Thanh lọc & Phục hồi:</strong> Thay thế cả nước hoa hồng lẫn tinh chất dưỡng. Cân bằng da nhanh, nạp năng lượng tế bào và phục hồi thương tổn cấu trúc từ bước đầu tiên.</li>
                <li><strong>Chống lão hóa toàn diện từ gốc:</strong> NMN + PDRN DNA cá hồi + Multi-Peptide tác động đa tầng — từ sửa chữa DNA đến kích thích Collagen và nâng đỡ cấu trúc cơ mặt.</li>
                <li><strong>Kích hoạt hấp thu tối đa:</strong> Kết cấu lỏng nhẹ như nước, thẩm thấu tức thì, mở đường cho serum và kem dưỡng phía sau hoạt động hiệu quả gấp bội.</li>
            </ul>
        `,

        ketQua: `Sau <strong>4 tuần</strong> kiểm nghiệm lâm sàng:<br>
            <ul class="sp-bullet-list" style="margin-top:10px;">
                <li>Độ đàn hồi và săn chắc tăng <strong>+28%</strong></li>
                <li>Diện tích nếp nhăn giảm sâu <strong>-23%</strong></li>
                <li>Độ ẩm màng bảo vệ da củng cố <strong>+26%</strong></li>
                <li>Tăng sinh NAD+ <strong>+95%</strong> — sức sống tế bào phục hồi rõ rệt</li>
                <li><strong>96%</strong> người dùng cảm nhận da căng mướt, mềm mịn ngay lần đầu sử dụng</li>
            </ul>`,

        hoatChat: "NMN (Nicotinamide Mononucleotide), PDRN — Sodium DNA cá hồi, 5 Chuỗi Multi-Peptide, Multi HA Complex 5 tầng, Tranexamic Acid, Niacinamide, Cica Complex, Beta Glucan, Panthenol",

        congDungChinh: [
            "<strong>NMN — Cấp năng lượng & Sửa chữa DNA:</strong> Chuyển hóa thành NAD+, kích hoạt gen trường thọ Sirtuins, tăng tuổi thọ tế bào và sửa chữa chuỗi DNA lão hóa từ gốc phân tử.",
            "<strong>PDRN DNA cá hồi — Phục hồi mô sinh học:</strong> Phân tử sinh học tương thích 95% cơ thể người, kích thích nguyên bào sợi tăng tốc sửa chữa mô hư tổn gấp 3 lần, tăng sinh 4 dòng Collagen cốt lõi.",
            "<strong>5 Chuỗi Peptide — Nâng cơ & Xóa nhăn:</strong> Mờ rãnh cười, nâng đỡ cơ mặt, hiệu ứng \"Botox tự nhiên\" không cần kim — tác động từ biểu bì đến hạ bì.",
            "<strong>5 Tầng HA — Khóa ẩm 72h đa tầng:</strong> Hệ Hyaluronic Acid từ phân tử siêu nhỏ thẩm thấu sâu đến đại phân tử khóa ẩm bề mặt — duy trì nền ẩm liên tục suốt 72 giờ.",
            "<strong>2 IN 1 Priming Effect — Kích hoạt nền da:</strong> Kết cấu lỏng mỏng nhẹ thẩm thấu tức thì, cân bằng pH, mở khóa hấp thu giúp mọi bước dưỡng phía sau tối đa hiệu quả."
        ],

        coChe: `
            <p style="margin-bottom: 16px;"><strong>Công Nghệ NMN & Sức Mạnh Phục Hồi Sinh Học PDRN DNA:</strong></p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>NMN (Nicotinamide Mononucleotide) — "Pin Năng Lượng Tế Bào"</strong></p>
            <p style="margin-bottom:14px;">Tiền chất trực tiếp của NAD+ — coenzyme thiết yếu cho mọi hoạt động sống của tế bào. NMN bổ sung NAD+ suy giảm theo tuổi tác, kích hoạt nhóm gen trường thọ Sirtuins, thúc đẩy sửa chữa DNA tổn thương và tái lập trình tuổi sinh học của tế bào da. Lâm sàng ghi nhận: tăng NAD+ <strong>+95%</strong>, tăng sức sống tế bào <strong>+63%</strong>, giảm gốc tự do <strong>-48%</strong>.</p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>PDRN — Sodium DNA Cá Hồi "Vật Liệu Tái Sinh Mô"</strong></p>
            <ul style="list-style: none; padding-left: 20px;">
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Tương thích sinh học 95%:</strong> Phân tử DNA chiết xuất từ tinh trùng cá hồi có cấu trúc gần như đồng nhất với mô người — giúp da tiếp nhận và sử dụng ngay lập tức không gây phản ứng loại thải.
                </li>
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Kích thích nguyên bào sợi (Fibroblast):</strong> Tăng tốc sửa chữa mô hư tổn gấp 3 lần so với không dùng PDRN, kích thích tăng sinh 4 dòng Collagen cốt lõi (Type I, III, IV, VII).
                </li>
                <li style="position:relative; margin-bottom:14px;">
                    <i class="fas fa-check" style="position:absolute; left:-20px; top:4px; font-size:12px; color: #c4a46d;"></i>
                    <strong>Tái tạo vi mạch & Kháng viêm:</strong> Kích thích yếu tố tăng trưởng nội mô mạch máu (VEGF), cải thiện tuần hoàn vi mô nuôi dưỡng da, đồng thời giảm viêm sưng sau treatment.
                </li>
            </ul>
        `,

        huongDan: `
            <p style="margin-bottom: 16px;"><strong>Phức Hợp 5 Chuỗi Multi-Peptide Nâng Cơ & Hệ 5 Tầng Ẩm HA:</strong></p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>5 Chuỗi Multi-Peptide — "Liệu Pháp Botox Không Kim"</strong></p>
            <ul class="sp-bullet-list" style="margin-bottom:20px;">
                <li><strong>12-Hexapeptide-9:</strong> Hexapeptide thế hệ mới — làm mềm nếp nhăn biểu cảm vùng trán, đuôi mắt, rãnh cười.</li>
                <li><strong>Copper Tripeptide-1 (GHK-Cu):</strong> "Gold standard" trong tái tạo mô — kích thích Collagen, Elastin, Glycosaminoglycans đồng thời.</li>
                <li><strong>Palmitoyl Tripeptide-1:</strong> Gửi tín hiệu sửa chữa đến Fibroblast, mô phỏng phản ứng lành thương để tái cấu trúc da.</li>
                <li><strong>Palmitoyl Pentapeptide-4 (Matrixyl):</strong> Kích thích ma trận ngoại bào, tăng độ dày lớp hạ bì và cải thiện đàn hồi rõ rệt.</li>
                <li><strong>Acetyl Hexapeptide-8 (Argireline):</strong> Ức chế co cơ biểu cảm quá mức, mờ nếp nhăn "Botox-like" không xâm lấn.</li>
            </ul>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Multi HA Complex — Hệ 5 Tầng Ẩm Khóa Nước 72h</strong></p>
            <ul class="sp-bullet-list">
                <li><strong>Tầng 1 — Nano HA (siêu nhỏ):</strong> Xuyên sâu đến tận lớp hạ bì, cấp nước từ gốc tế bào.</li>
                <li><strong>Tầng 2 — Low Molecular HA:</strong> Thẩm thấu giữa các lớp biểu bì, làm đầy nếp nhăn từ trong.</li>
                <li><strong>Tầng 3 — Medium HA:</strong> Lấp đầy khoảng trống giữa tế bào, tạo nền ẩm đều đặn.</li>
                <li><strong>Tầng 4 — High Molecular HA:</strong> Tạo màng giữ ẩm trên bề mặt, ngăn bay hơi nước.</li>
                <li><strong>Tầng 5 — Cross-linked HA:</strong> Khóa chặt toàn bộ hệ thống ẩm, duy trì liên tục suốt 72 giờ.</li>
            </ul>
        `,

        thanhPhan: `
            <p style="margin-bottom: 16px;"><strong>Hệ Dưỡng Sáng TXA + Niacinamide & Phức Hợp Cica Làm Dịu:</strong></p>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Tranexamic Acid (TXA) + Niacinamide — "Bộ Đôi Chặn Đứng Melanin"</strong></p>
            <ul class="sp-bullet-list" style="margin-bottom:20px;">
                <li><strong>Tranexamic Acid:</strong> Ức chế Plasmin — enzyme kích hoạt chuỗi sản sinh Melanin. Khác biệt hoàn toàn với các chất trắng da thông thường: TXA tác động ở gốc cơ chế, ngăn tín hiệu viêm gây nám từ trước khi Melanocyte kịp phản ứng.</li>
                <li><strong>Niacinamide:</strong> Chặn vận chuyển Melanosome từ Melanocyte sang tế bào biểu bì, đồng thời thu nhỏ lỗ chân lông, kiểm soát bã nhờn và củng cố hàng rào Ceramide tự nhiên.</li>
            </ul>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Cica + Beta Glucan + Panthenol — "Bộ Ba Cấp Cứu Da Tổn Thương"</strong></p>
            <ul class="sp-bullet-list">
                <li><strong>Cica (Centella Asiatica):</strong> Hạ nhiệt, kháng viêm, kích thích Collagen và chữa lành thương tổn mô — đặc biệt cần thiết cho da sau laser/peel/acid.</li>
                <li><strong>Beta Glucan:</strong> Polysaccharide sinh học kích hoạt tế bào Langerhans (miễn dịch da), cấp ẩm sâu gấp 20% so với HA thông thường và giảm mẫn cảm da.</li>
                <li><strong>Panthenol (Pro-Vitamin B5):</strong> Xoa dịu đỏ rát, phục hồi lớp lipid màng da bị phá vỡ sau treatment, duy trì cân bằng ẩm bề mặt.</li>
            </ul>
        `,

        tangCuong: "Lucenva PEP.G+ Priming Cleansing Gel (Gel làm sạch tiền dưỡng — dùng trước bước Essence), Lucenva V-Lift Cream (Kem nâng cơ chống lão hóa — dùng sau Essence), Lucenva NMN.C+ Sun Cream (Kem chống nắng nâng tông — bước cuối buổi sáng).",

        accordionTitles: [
            'Công dụng chính — 5 Tác động cốt lõi',
            'Công nghệ NMN & Phục hồi sinh học PDRN DNA',
            '5 Chuỗi Multi-Peptide nâng cơ & Hệ 5 tầng HA',
            'Dưỡng sáng TXA + Niacinamide & Phức hợp Cica làm dịu',
            'Chu trình sử dụng & Cam kết an toàn'
        ],

        congNghe: `
            <p style="margin-bottom:16px; font-size: 15px;"><strong>Chu Trình Sử Dụng Tối Ưu — First Step Protocol:</strong></p>
            <ul class="sp-bullet-list" style="margin-bottom:20px;">
                <li>Sử dụng <strong>sáng & tối</strong> ngay sau bước rửa mặt — là bước đệm đầu tiên bắt buộc trong chu trình skincare.</li>
                <li>Đổ ra lòng bàn tay <strong>3–5 giọt</strong>, ấn nhẹ lên toàn mặt và cổ.</li>
                <li><strong>Không cần dùng bông cotton</strong> — kết cấu lỏng nhẹ như nước thẩm thấu tức thì khi ấn nhẹ bằng tay.</li>
                <li>Có thể layer thêm <strong>2–3 lớp</strong> cho da khô hoặc da tổn thương cần phục hồi chuyên sâu.</li>
                <li>Đợi 15–30 giây cho essence thẩm thấu hoàn toàn trước khi dùng serum hoặc kem dưỡng tiếp theo.</li>
            </ul>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Cam Kết An Toàn Chuẩn Clinic:</strong></p>
            <ul class="sp-bullet-list" style="margin-bottom:16px;">
                <li><strong>Đạt chứng nhận KDRI & KAHSRC</strong> — Viện Da Liễu Quốc Gia Hàn Quốc kiểm nghiệm an toàn da liễu.</li>
                <li>Công thức thuần chay, không cồn, không Paraben, không hương liệu tổng hợp.</li>
                <li>Tiêu chuẩn sản xuất <strong>CGMP Hàn Quốc</strong>.</li>
                <li>An toàn tuyệt đối cho <strong>da nhạy cảm bẩm sinh, da mỏng yếu, da sau treatment</strong> (laser, peel, acid, microneedling).</li>
            </ul>

            <p style="margin-bottom:12px; font-size: 15px;"><strong>Đối Tượng Phù Hợp:</strong></p>
            <ul class="sp-bullet-list">
                <li>Da lão hóa sớm, chùng nhão, nếp nhăn sâu</li>
                <li>Da khô thiếu ẩm, thiếu sức sống, xỉn màu</li>
                <li>Da nhạy cảm bẩm sinh cần phục hồi hàng rào bảo vệ</li>
                <li>Da sau liệu trình treatment: laser, peel, acid, retinol</li>
                <li>Da cần giải pháp chống lão hóa toàn diện không xâm lấn</li>
            </ul>
        `,

        gallery: [
            "images/sp-essence.png",
            "images/sp25-ha.jpg",
            "images/sp25-main.jpg",
            "images/sp25-overview.jpg",
            "images/sp25-pdrn.jpg",
            "images/sp25-peptide.jpg"
        ]
    },
};

// Fetch dynamic products from the backend (if available)
// Dùng API_BASE_URL từ script.js (đã load trước)
const _API = (typeof API_BASE_URL !== 'undefined') ? API_BASE_URL : 'http://localhost:3000/api';
fetch(`${_API}/products`)
    .then(res => res.json())
    .then(products => {
        if (Array.isArray(products) && products.length > 0) {
            products.forEach(p => {
                productDatabase[p.id] = {
                    ...productDatabase[p.id],
                    ...p
                };
            });
            console.log("Dữ liệu sản phẩm đã được đồng bộ từ Backend API");
        }
    })
    .catch(err => {
        console.warn("Backend chưa hoạt động hoặc lỗi kết nối. Chạy offline bằng dữ liệu tĩnh.");
    });