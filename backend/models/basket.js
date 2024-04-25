'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate(models) {
      Basket.belongsTo(models.BuyerUser, {
        foreignKey: 'buyerUserId', 
        allowNull: false 
      });
      Basket.belongsToMany(models.Product, { through: 'BasketProducts' });
    }

    get totalPrice() {
      if (!this.Products || this.Products.length === 0) {
        return 0;
      }
      return this.Products.reduce((total, product) => total + product.price, 0);
    }
  }

  Basket.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 
      },
    },
    {
      sequelize,
      modelName: 'Basket',
      tableName: 'Baskets',
      defaultScope: {
        include: {
          model: sequelize.models.Product, 
          attributes: ['name', 'price', 'photos'] 
        }
      }
    }
  );

  return Basket;
};
