const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');

Category.hasMany(Product, { foreignKey: 'CategoryId' });
Product.belongsTo(Category, { foreignKey: 'CategoryId' });

module.exports = { Category, Product, User };
