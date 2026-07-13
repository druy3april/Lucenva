const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true, // e.g. 'sp22', 'sp23'
  },
  name: {
    type: DataTypes.STRING,
  },
  subName: {
    type: DataTypes.STRING,
  },
  badge: {
    type: DataTypes.STRING,
  },
  desc: {
    type: DataTypes.STRING,
  },
  imgSrc: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING, // 'product' hoặc 'gift'
    defaultValue: 'product',
  },
  tags: {
    type: DataTypes.JSONB,
  },
  topDesc: {
    type: DataTypes.TEXT,
  },
  congDung: {
    type: DataTypes.TEXT,
  },
  ketQua: {
    type: DataTypes.TEXT,
  },
  hoatChat: {
    type: DataTypes.TEXT,
  },
  congDungChinh: {
    type: DataTypes.JSONB, // Array of strings
  },
  coChe: {
    type: DataTypes.TEXT,
  },
  huongDan: {
    type: DataTypes.TEXT,
  },
  thanhPhan: {
    type: DataTypes.TEXT,
  },
  tangCuong: {
    type: DataTypes.TEXT,
  },
  congNghe: {
    type: DataTypes.TEXT,
  },
  gallery: {
    type: DataTypes.JSONB, // Array of strings (image URLs)
  },
  price: {
    type: DataTypes.INTEGER, // e.g., 480000
    defaultValue: 0,
  },
  stock: {
    type: DataTypes.INTEGER, // Số lượng tồn kho
    defaultValue: 0,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN, // Ẩn/hiện sản phẩm
    defaultValue: true,
    allowNull: false,
  }
});

module.exports = Product;
