const { Sequelize } = require('sequelize');

// Update these credentials via .env file
require('dotenv').config({ path: __dirname + '/../.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME || 'lucenva_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
  }
);

module.exports = sequelize;
