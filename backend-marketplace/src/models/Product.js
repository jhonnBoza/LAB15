const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(200), allowNull: false },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  imageUrl: { type: DataTypes.STRING(500) },
  CategoryId: { type: DataTypes.INTEGER },
}, { timestamps: true });

module.exports = Product;
