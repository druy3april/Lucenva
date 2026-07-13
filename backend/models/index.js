const sequelize = require('../config/database');
const Product = require('./product');
const Order = require('./order');
const OrderItem = require('./orderItem');
const Admin = require('./admin');
const ProductQA = require('./productQA');
const Newsletter = require('./newsletter');
const SiteSetting = require('./siteSetting');
const Banner = require('./banner');
const ContentBlock = require('./contentBlock');
const Customer = require('./customer');
const Favorite = require('./favorite');

// Define associations
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(ProductQA, { foreignKey: 'productId', as: 'qas' });
ProductQA.belongsTo(Product, { foreignKey: 'productId' });

Customer.hasMany(Favorite, { foreignKey: 'customerId', as: 'favorites' });
Favorite.belongsTo(Customer, { foreignKey: 'customerId' });

Product.hasMany(Favorite, { foreignKey: 'productId' });
Favorite.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  sequelize,
  Product,
  Order,
  OrderItem,
  Admin,
  ProductQA,
  Newsletter,
  SiteSetting,
  Banner,
  ContentBlock,
  Customer,
  Favorite,
};
