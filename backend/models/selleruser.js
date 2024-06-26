'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SellerUser extends Model {
    static associate(models) {
      // define association here
    }
  }
  SellerUser.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'SellerUser',
      tableName: 'SellerUsers' 
    }
  );
  return SellerUser;
};

