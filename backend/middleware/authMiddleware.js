const jwt = require('jsonwebtoken');
const { Customer } = require('../models');

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Không tìm thấy token xác thực' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'lucenva_secret_key');
    
    const customer = await Customer.findByPk(decoded.id);
    if (!customer) {
      return res.status(401).json({ error: 'Tài khoản không tồn tại' });
    }
    
    if (!customer.isActive) {
      return res.status(403).json({ error: 'Tài khoản đã bị khóa' });
    }

    req.customer = customer;
    next();
  } catch (error) {
    console.error('Lỗi xác thực token:', error);
    return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

module.exports = { requireAuth };
