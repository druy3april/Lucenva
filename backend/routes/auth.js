const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Customer, Favorite, Product } = require('../models');
const { requireAuth } = require('../middleware/authMiddleware');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Vui lòng thử lại sau 15 phút' }
});

router.post('/register', authLimiter, async (req, res) => {
  try {
    const { email, password, fullName, phone, address } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email và mật khẩu là bắt buộc' });
    }

    const existing = await Customer.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email đã được sử dụng' });
    }

    const customer = await Customer.create({
      email,
      password,
      fullName,
      phone,
      address
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');
    const token = jwt.sign({ id: customer.id }, secret, { expiresIn: '7d' });
    
    res.json({ token, customer: { id: customer.id, email: customer.email, fullName: customer.fullName } });
  } catch (err) {
    console.error('Lỗi đăng ký:', err);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
});

router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email và mật khẩu là bắt buộc' });
    }

    const customer = await Customer.findOne({ where: { email } });
    if (!customer || !customer.isActive) {
      return res.status(401).json({ error: 'Tài khoản không hợp lệ' });
    }

    const matched = await bcrypt.compare(password, customer.password);
    if (!matched) {
      return res.status(401).json({ error: 'Sai mật khẩu' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');
    const token = jwt.sign({ id: customer.id }, secret, { expiresIn: '7d' });
    res.json({ 
      token, 
      customer: { 
        id: customer.id, 
        email: customer.email, 
        fullName: customer.fullName,
        phone: customer.phone,
        address: customer.address
      } 
    });
  } catch (err) {
    console.error('Lỗi đăng nhập:', err);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  res.json({
    customer: {
      id: req.customer.id,
      email: req.customer.email,
      fullName: req.customer.fullName,
      phone: req.customer.phone,
      address: req.customer.address
    }
  });
});

// Yêu thích
router.get('/favorites', requireAuth, async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { customerId: req.customer.id },
      include: [{ model: Product }]
    });
    res.json(favorites);
  } catch (err) {
    console.error('Lỗi lấy danh sách yêu thích:', err);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
});

router.post('/favorites', requireAuth, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'Thiếu mã sản phẩm' });
    }

    const existing = await Favorite.findOne({
      where: { customerId: req.customer.id, productId }
    });

    if (existing) {
      await existing.destroy();
      res.json({ message: 'Đã xóa khỏi yêu thích', status: 'removed' });
    } else {
      await Favorite.create({ customerId: req.customer.id, productId });
      res.json({ message: 'Đã thêm vào yêu thích', status: 'added' });
    }
  } catch (err) {
    console.error('Lỗi thay đổi yêu thích:', err);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
});

module.exports = router;
