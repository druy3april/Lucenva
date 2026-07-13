const fs = require('fs');
const path = require('path');
const { sequelize } = require('../models');
const logger = require('./logger');

const backupDir = path.join(__dirname, '../backups');

// Đảm bảo thư mục backups tồn tại
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function runBackup() {
  try {
    logger.info('Starting daily database JSON backup...');
    const dateStr = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0];
    const backupFile = path.join(backupDir, `backup_${dateStr}.json`);

    const data = {};

    // Lấy tất cả tên bảng từ Sequelize models
    for (const modelName of Object.keys(sequelize.models)) {
      const model = sequelize.models[modelName];
      const records = await model.findAll({ raw: true });
      data[modelName] = records;
    }

    // Ghi toàn bộ dữ liệu ra file JSON
    fs.writeFileSync(backupFile, JSON.stringify(data, null, 2), 'utf-8');
    logger.info(`Database backup successful: ${backupFile}`);

    // (Tuỳ chọn) Chỉ giữ lại 7 bản backup gần nhất để tiết kiệm dung lượng
    const files = fs.readdirSync(backupDir)
      .filter(f => f.startsWith('backup_') && f.endsWith('.json'))
      .map(f => ({ name: f, path: path.join(backupDir, f), time: fs.statSync(path.join(backupDir, f)).mtime.getTime() }))
      .sort((a, b) => b.time - a.time);

    if (files.length > 7) {
      for (let i = 7; i < files.length; i++) {
        fs.unlinkSync(files[i].path);
        logger.info(`Deleted old backup: ${files[i].name}`);
      }
    }

  } catch (error) {
    logger.error('Failed to run database backup:', error);
  }
}

module.exports = { runBackup };
