const { Sequelize } = require('sequelize');

// Update these credentials via .env file
require('dotenv').config({ path: __dirname + '/../.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME || 'lucenva_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
  }
);

module.exports = sequelize;
