const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductQA = sequelize.define('ProductQA', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING, // 'anh' or 'chi'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

module.exports = ProductQA;
