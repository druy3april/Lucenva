const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContentBlock = sequelize.define('ContentBlock', {
  sectionKey: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  contentHtml: {
    type: DataTypes.TEXT('long'),
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
});

module.exports = ContentBlock;
