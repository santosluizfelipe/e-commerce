'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate(models) {
      Basket.belongsTo(models.BuyerUser, {
        foreignKey: 'buyerUserId', 
        allowNull: false 
      });
      Basket.belongsToMany(models.Product, { through: 'BasketProducts' });
    }
  }

  Basket.init(
    {
      // Define any additional fields you need for the Basket model
      //update this table
    },
    {
      sequelize,
      modelName: 'Basket',
      tableName: 'Baskets' 
    }
  );

  return Basket;
};
