const https = require('https');

/**
 * Gửi tin nhắn thông báo qua Telegram Bot
 * @param {string} text Nội dung tin nhắn
 */
function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId || token === 'your_bot_token_here') {
    // Chưa cấu hình Telegram, bỏ qua không gửi để tránh lỗi sập server
    console.log('Telegram is not configured. Message skipped.');
    return;
  }

  const data = JSON.stringify({
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML' // Cho phép dùng thẻ <b>, <i>... trong tin nhắn
  });

  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${token}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Telegram API responded with status ${res.statusCode}`);
    }
  });

  req.on('error', (error) => {
    console.error('Error sending Telegram message:', error);
  });

  req.write(data);
  req.end();
}

module.exports = { sendTelegramMessage };
