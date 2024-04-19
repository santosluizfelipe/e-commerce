'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
  
      Product.belongsTo(models.SellerUser, {
        foreignKey: 'sellerUserId', // Specify the foreign key field name
        allowNull: false // Ensure that sellerUserId cannot be null
      });
    }
  }

  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      photos: DataTypes.JSON
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'Products'
    }
  );

  return Product;
};
