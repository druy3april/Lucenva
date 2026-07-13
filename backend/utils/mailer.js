const nodemailer = require('nodemailer');
const logger = require('./logger');

// Khởi tạo Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Hoặc config host/port nếu dùng SMTP khác
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Dùng App Password của Gmail, không phải mật khẩu gốc
  },
});

/**
 * Hàm gửi email chung
 * @param {string} to Địa chỉ nhận
 * @param {string} subject Tiêu đề thư
 * @param {string} html Nội dung thư (HTML)
 */
async function sendMail(to, subject, html) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    logger.warn('SMTP credentials not configured. Email will not be sent.');
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Lucenva" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    logger.info(`Email sent to ${to}: ${info.messageId}`);
  } catch (error) {
    logger.error(`Error sending email to ${to}:`, error);
  }
}

/**
 * Gửi email xác thực Newsletter
 */
async function sendNewsletterVerification(toEmail, token) {
  // Lấy domain gốc. Có thể cấu hình trong env hoặc fallback localhost
  const domain = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',')[0] : 'http://localhost:3000';
  const verifyUrl = `${domain}/api/newsletter/verify?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #c99c51; text-align: center;">Cảm ơn bạn đã đăng ký nhận tin từ Lucenva!</h2>
      <p>Vui lòng click vào nút bên dưới để xác nhận địa chỉ email của bạn, giúp chúng tôi chắc chắn rằng bạn muốn nhận thông tin từ Lucenva.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verifyUrl}" style="background-color: #c99c51; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">XÁC NHẬN EMAIL</a>
      </div>
      <p style="color: #666; font-size: 14px;">Nếu nút không hoạt động, bạn có thể copy đường dẫn sau và dán vào trình duyệt:</p>
      <p style="color: #666; font-size: 12px; word-break: break-all;">${verifyUrl}</p>
    </div>
  `;

  await sendMail(toEmail, 'Xác nhận đăng ký nhận tin từ Lucenva', html);
}

module.exports = { sendMail, sendNewsletterVerification };
