const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SiteSetting = sequelize.define('SiteSetting', {
  key: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = SiteSetting;
