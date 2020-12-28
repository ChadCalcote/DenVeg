'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodItem = sequelize.define('FoodItem', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    views: DataTypes.STRING,
    restuarantId: DataTypes.INTEGER,
    isSpecial: DataTypes.BOOLEAN,
    photoUrl: DataTypes.STRING
  }, {});
  FoodItem.associate = function(models) {
    // associations can be defined here
  };
  return FoodItem;
};