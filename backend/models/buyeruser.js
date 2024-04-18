'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuyerUser extends Model {
    static associate(models) {
      // define association here
    }
  }
  BuyerUser.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'BuyerUser',
      tableName: 'BuyerUsers' 
    }
  );
  return BuyerUser;
};

