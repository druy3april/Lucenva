const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const xss = require('xss');
const { Product, Order, OrderItem, B2bContact, ProductQA, Newsletter, SiteSetting, Banner, ContentBlock, sequelize } = require('../models');
const logger = require('../utils/logger');
const { createVnPayUrl } = require('./payment');
const { sendTelegramMessage } = require('../utils/telegram');
const { sendNewsletterVerification } = require('../utils/mailer');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

// === Rate limiter riêng cho POST endpoints (chống spam) ===
const postLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 20, // Tối đa 20 request POST / 15 phút / IP
  message: { error: 'Quá nhiều yêu cầu, vui lòng thử lại sau 15 phút.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// === Hàm validate & sanitize input ===
function sanitize(str, maxLength = 500) {
  if (typeof str !== 'string') return '';
  return xss(str.trim().slice(0, maxLength));
}

function isValidPhone(phone) {
  // Regex cho SĐT Việt Nam (10-11 số, bắt đầu bằng 0 hoặc +84)
  return /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/.test(phone.replace(/[\s.-]/g, ''));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// GET all settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await SiteSetting.findAll();
    // Convert array of objects to key-value object
    const result = {};
    settings.forEach(s => {
      result[s.key] = s.value;
    });
    res.json(result);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

// GET all active banners
router.get('/banners', async (req, res) => {
  try {
    const banners = await Banner.findAll({
      where: { isActive: true },
      order: [['order', 'ASC']]
    });
    res.json(banners);
  } catch (error) {
    logger.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

// GET all content blocks
router.get('/content-blocks', async (req, res) => {
  try {
    const blocks = await ContentBlock.findAll();
    // Convert array of objects to key-value object
    const result = {};
    blocks.forEach(b => {
      result[b.sectionKey] = b;
    });
    res.json(result);
  } catch (error) {
    logger.error('Error fetching content blocks:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

// GET all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { isActive: true } // Chỉ lấy sản phẩm đang active
    });
    res.json(products);
  } catch (error) {
    logger.error('Error in API route:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

// GET product by id
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

// POST checkout order (BẢO MẬT + TOÀN VẸN DỮ LIỆU + QUẢN LÝ TỒN KHO)
router.post('/orders', postLimiter, async (req, res) => {
  // Khởi tạo một phiên giao dịch (Transaction)
  const t = await sequelize.transaction();

  try {
    let customerId = null;
    if (req.cookies && req.cookies.token) {
      try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        customerId = decoded.id;
      } catch (err) {
        console.error('Invalid token during order creation:', err.message);
      }
    }

    const { customer_name, phone, address, email, note, paymentMethod, cart } = req.body;

    // === Validate input ===
    const cleanName = sanitize(customer_name, 100);
    const cleanPhone = sanitize(phone, 20);
    const cleanAddress = sanitize(address, 300);
    const cleanEmail = email ? sanitize(email, 100) : null;
    const cleanNote = note ? sanitize(note, 500) : null;
    const cleanPayment = sanitize(paymentMethod, 20) || 'cod';

    if (!cleanName || !cleanPhone || !cleanAddress || !cart || !Array.isArray(cart) || cart.length === 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin (tên, SĐT, địa chỉ) và giỏ hàng.' });
    }

    if (!isValidPhone(cleanPhone)) {
      await t.rollback();
      return res.status(400).json({ error: 'Số điện thoại không hợp lệ.' });
    }

    if (cleanEmail && !isValidEmail(cleanEmail)) {
      await t.rollback();
      return res.status(400).json({ error: 'Email không hợp lệ.' });
    }

    if (cart.length > 50) {
      await t.rollback();
      return res.status(400).json({ error: 'Giỏ hàng quá lớn.' });
    }

    let total_price = 0;
    const orderItemsData = [];

    // Duyệt qua từng item để lấy GIÁ THẬT từ Database + KIỂM TRA TỒN KHO
    for (const item of cart) {
      // Validate qty
      const qty = parseInt(item.qty);
      if (!qty || qty <= 0 || qty > 100) {
        await t.rollback();
        return res.status(400).json({ error: `Số lượng sản phẩm "${item.name}" không hợp lệ.` });
      }

      // Tìm sản phẩm trong DB dựa trên ID (nếu có) hoặc Tên
      const dbProduct = item.id 
        ? await Product.findByPk(item.id, { transaction: t, lock: t.LOCK.UPDATE })
        : await Product.findOne({ where: { name: item.name }, transaction: t, lock: t.LOCK.UPDATE });

      if (!dbProduct) {
        await t.rollback();
        return res.status(400).json({ error: `Sản phẩm "${item.name}" không tồn tại hoặc đã bị xoá.` });
      }

      // === KIỂM TRA TỒN KHO ===
      if (dbProduct.stock !== null && dbProduct.stock < qty) {
        await t.rollback();
        return res.status(400).json({ 
          error: `Sản phẩm "${dbProduct.name}" chỉ còn ${dbProduct.stock} sản phẩm trong kho.` 
        });
      }

      // Tính tổng tiền dựa trên giá gốc từ database
      total_price += dbProduct.price * qty;

      // Đẩy thông tin chuẩn vào mảng tạm
      orderItemsData.push({
        product_name: dbProduct.name,
        quantity: qty,
        price: dbProduct.price,
        productId: dbProduct.id // Lưu lại để trừ stock
      });
    }

    // Bước 1: Tạo Order
    const order = await Order.create({
      customer_name: cleanName,
      phone: cleanPhone,
      address: cleanAddress,
      email: cleanEmail,
      note: cleanNote,
      paymentMethod: cleanPayment,
      total_price,
      status: 'pending',
      customerId: customerId
    }, { transaction: t });

    // Cập nhật order_id cho các order items
    const orderItems = orderItemsData.map(item => ({
      product_name: item.product_name,
      quantity: item.quantity,
      price: item.price,
      order_id: order.id,
      productId: item.productId
    }));

    // Bước 2: Lưu hàng loạt Order Items
    await OrderItem.bulkCreate(orderItems, { transaction: t });

    // Bước 3: TRỪ TỒN KHO (Chỉ trừ nếu KHÔNG PHẢI là VNPay. VNPay sẽ trừ ở callback IPN/return)
    if (cleanPayment !== 'vnpay') {
      for (const item of orderItemsData) {
        if (item.productId) {
          const dbProduct = await Product.findByPk(item.productId, { transaction: t });
          if (dbProduct && dbProduct.stock !== null) {
            dbProduct.stock -= item.quantity;
            if (dbProduct.stock < 0) dbProduct.stock = 0;
            await dbProduct.save({ transaction: t });
          }
        }
      }
    }

    // Xác nhận lưu vĩnh viễn vào DB
    await t.commit();

    // Xử lý VNPay (Chưa gửi Telegram vội vì chưa chắc khách thanh toán)
    if (cleanPayment === 'vnpay') {
      const paymentUrl = createVnPayUrl(req, order.id, total_price, `Thanh toan don hang ${order.id}`);
      return res.status(201).json({ 
        message: 'Chuyển hướng tới VNPay...', 
        orderId: order.id,
        paymentUrl: paymentUrl
      });
    }

    // === GỬI THÔNG BÁO TELEGRAM (CHO COD VÀ BANK) ===
    let itemDetails = cart.map(item => `- ${item.name} x${item.qty}`).join('\n');
    let message = `🚨 <b>CÓ ĐƠN HÀNG MỚI! (Mã: #${order.id})</b>\n\n` +
                  `👤 Khách: ${cleanName}\n` +
                  `📞 SĐT: ${cleanPhone}\n` +
                  `💰 Tổng: ${total_price.toLocaleString('vi-VN')}đ\n` +
                  `💳 Thanh toán: ${cleanPayment.toUpperCase()}\n\n` +
                  `📦 <b>Sản phẩm:</b>\n${itemDetails}`;
    sendTelegramMessage(message);

    res.status(201).json({ message: 'Đặt hàng thành công!', orderId: order.id });
  } catch (error) {
    // Hoàn tác toàn bộ nếu có lỗi
    await t.rollback();
    console.error('Error creating order, transaction rolled back:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});



// POST Product QA
router.post('/product-qa', postLimiter, async (req, res) => {
  try {
    const { productId, gender, name, email, content } = req.body;

    const cleanName = sanitize(name, 100);
    const cleanContent = sanitize(content, 2000);
    const cleanProductId = sanitize(productId, 20);

    if (!cleanProductId || !cleanName || !cleanContent) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin.' });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: 'Email không hợp lệ.' });
    }

    const qa = await ProductQA.create({ 
      productId: cleanProductId, 
      gender: sanitize(gender, 10), 
      name: cleanName, 
      email: email ? sanitize(email, 100) : null, 
      content: cleanContent 
    });

    const cleanEmailForTelegram = email ? sanitize(email, 100) : 'Không có';
    sendTelegramMessage(`❓ <b>HỎI ĐÁP SẢN PHẨM (ID: ${cleanProductId})</b>\n\n👤 Tên: ${cleanName}\n📧 Email: ${cleanEmailForTelegram}\n💬 Hỏi: ${cleanContent}`);

    res.status(201).json({ message: 'Cảm ơn bạn đã gửi câu hỏi!', id: qa.id });
  } catch (error) {
    logger.error('Error creating QA:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

// POST Newsletter (Double opt-in)
router.post('/newsletter', postLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Email không hợp lệ.' });
    }

    const cleanEmail = sanitize(email, 100);

    // Kiểm tra xem email đã đăng ký chưa
    const existing = await Newsletter.findOne({ where: { email: cleanEmail } });
    if (existing) {
      if (existing.isVerified) {
        return res.status(400).json({ error: 'Email này đã đăng ký và xác thực rồi!' });
      } else {
        // Đã đăng ký nhưng chưa xác thực -> Gửi lại thư
        const token = uuidv4();
        existing.verificationToken = token;
        await existing.save();
        await sendNewsletterVerification(cleanEmail, token);
        return res.status(201).json({ message: 'Đã gửi lại link xác nhận vào email của bạn!' });
      }
    }

    const token = uuidv4();
    await Newsletter.create({ email: cleanEmail, isVerified: false, verificationToken: token });
    await sendNewsletterVerification(cleanEmail, token);

    res.status(201).json({ message: 'Vui lòng kiểm tra hộp thư đến (hoặc thư rác) để xác nhận đăng ký!' });
  } catch (error) {
    logger.error('Error adding newsletter:', error);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

// GET Newsletter Verify
router.get('/newsletter/verify', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send('<h1>Thiếu mã xác nhận.</h1>');

    const subscription = await Newsletter.findOne({ where: { verificationToken: token } });
    if (!subscription) {
      return res.status(400).send('<h1>Link xác nhận không hợp lệ hoặc đã hết hạn.</h1>');
    }

    subscription.isVerified = true;
    subscription.verificationToken = null;
    await subscription.save();

    res.send('<h1 style="color: green; text-align:center; margin-top:50px;">Xác nhận Email thành công! Bạn có thể đóng tab này.</h1>');
  } catch (error) {
    logger.error('Error verifying newsletter:', error);
    res.status(500).send('<h1>Có lỗi xảy ra khi xác nhận.</h1>');
  }
});

module.exports = router;