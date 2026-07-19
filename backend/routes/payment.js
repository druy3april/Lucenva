const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const querystring = require('querystring');
const { Order, OrderItem, Product } = require('../models');
const { sendTelegramMessage } = require('../utils/telegram');

// Helper format date for VNPay: YYYYMMDDHHmmss
function formatVnPayDate(date) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  return `${year}${month}${day}${hour}${minute}${second}`;
}

// Hàm sắp xếp object keys theo chuẩn VNPay
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj){
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

// Khởi tạo URL thanh toán VNPay
function createVnPayUrl(req, orderId, amount, orderInfo) {
  process.env.TZ = 'Asia/Ho_Chi_Minh';
  
  let date = new Date();
  let createDate = formatVnPayDate(date);
  
  let ipAddr = req.headers['x-forwarded-for'] ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.connection?.socket?.remoteAddress ||
      '127.0.0.1';

  let tmnCode = process.env.VNP_TMNCODE;
  let secretKey = process.env.VNP_HASHSECRET;
  let vnpUrl = process.env.VNP_URL;
  let returnUrl = process.env.VNP_RETURNURL;

  let vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_Locale'] = 'vn';
  vnp_Params['vnp_CurrCode'] = 'VND';
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = orderInfo;
  vnp_Params['vnp_OrderType'] = 'other';
  vnp_Params['vnp_Amount'] = amount * 100; // VNPay tính bằng HÀO (nhân 100)
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;

  vnp_Params = sortObject(vnp_Params);

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex"); 
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

  return vnpUrl;
}

// GET /api/payment/vnpay_return — Callback từ VNPay
router.get('/vnpay_return', async (req, res) => {
  let vnp_Params = req.query;

  let secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  let secretKey = process.env.VNP_HASHSECRET;
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");     

  const orderId = vnp_Params['vnp_TxnRef'];
  const rspCode = vnp_Params['vnp_ResponseCode'];

  let redirectUrl = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',')[0] : 'http://localhost:5500';
  
  if (secureHash === signed) {
    // Chữ ký hợp lệ
    try {
      const order = await Order.findByPk(orderId);
      if (order) {
        if (rspCode === '00') {
          // Thành công
          if (order.paymentStatus !== 'paid') {
            order.paymentStatus = 'paid';
            await order.save();

            // Trừ tồn kho khi thanh toán VNPay thành công
            const orderItems = await OrderItem.findAll({ where: { order_id: order.id } });
            for (const item of orderItems) {
              const dbProduct = await Product.findByPk(item.productId);
              
              if (dbProduct && dbProduct.stock !== null) {
                dbProduct.stock -= item.quantity;
                if (dbProduct.stock < 0) dbProduct.stock = 0;
                await dbProduct.save();
              }
            }

            sendTelegramMessage(`✅ <b>VNPay THANH TOÁN THÀNH CÔNG!</b>\n\nMã đơn: #${order.id}\nSố tiền: ${order.total_price.toLocaleString('vi-VN')}đ\nKhách: ${order.customer_name}`);
          }

          res.redirect(`${redirectUrl}/lucenva/lucenva.html?vnpay=success&orderId=${orderId}`);
        } else {
          // Thất bại
          order.paymentStatus = 'failed';
          await order.save();

          sendTelegramMessage(`❌ <b>VNPay THANH TOÁN THẤT BẠI!</b>\n\nMã đơn: #${order.id}\nMã lỗi: ${rspCode}`);

          res.redirect(`${redirectUrl}/lucenva/lucenva.html?vnpay=failed&orderId=${orderId}&code=${rspCode}`);
        }
      } else {
        res.redirect(`${redirectUrl}/lucenva/lucenva.html?vnpay=error`);
      }
    } catch (err) {
      console.error(err);
      res.redirect(`${redirectUrl}/lucenva/lucenva.html?vnpay=error`);
    }
  } else {
    // Chữ ký không hợp lệ
    res.redirect(`${redirectUrl}/lucenva/lucenva.html?vnpay=invalid_signature`);
  }
});

// GET /api/payment/vnpay_ipn — Server-to-Server Callback từ VNPay
router.get('/vnpay_ipn', async (req, res) => {
  let vnp_Params = req.query;
  const secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);
  const secretKey = process.env.VNP_HASHSECRET;
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
    const orderId = vnp_Params['vnp_TxnRef'];
    const rspCode = vnp_Params['vnp_ResponseCode'];

    try {
      const order = await Order.findByPk(orderId);
      if (order) {
        if (order.paymentStatus === 'paid' || order.paymentStatus === 'failed') {
          return res.status(200).json({ RspCode: '02', Message: 'Order already confirmed' });
        }

        if (rspCode === '00') {
          order.paymentStatus = 'paid';
          await order.save();

          const orderItems = await OrderItem.findAll({ where: { order_id: order.id } });
          for (const item of orderItems) {
            const dbProduct = await Product.findByPk(item.productId);
            
            if (dbProduct && dbProduct.stock !== null) {
              dbProduct.stock -= item.quantity;
              if (dbProduct.stock < 0) dbProduct.stock = 0;
              await dbProduct.save();
            }
          }

          sendTelegramMessage(`✅ <b>VNPay IPN XÁC NHẬN!</b>\n\nMã đơn: #${order.id}\nSố tiền: ${order.total_price.toLocaleString('vi-VN')}đ\nKhách: ${order.customer_name}`);
          return res.status(200).json({ RspCode: '00', Message: 'Confirm Success' });
        } else {
          order.paymentStatus = 'failed';
          await order.save();
          sendTelegramMessage(`❌ <b>VNPay IPN THẤT BẠI!</b>\n\nMã đơn: #${order.id}\nMã lỗi: ${rspCode}`);
          return res.status(200).json({ RspCode: '00', Message: 'Confirm Success' });
        }
      } else {
        return res.status(200).json({ RspCode: '01', Message: 'Order not found' });
      }
    } catch (e) {
      console.error(e);
      return res.status(200).json({ RspCode: '99', Message: 'Unknown error' });
    }
  } else {
    return res.status(200).json({ RspCode: '97', Message: 'Invalid signature' });
  }
});

module.exports = {
  router,
  createVnPayUrl
};
