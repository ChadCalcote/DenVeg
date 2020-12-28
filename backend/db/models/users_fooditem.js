'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users_FoodItem = sequelize.define('Users_FoodItem', {
    foodItemId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Users_FoodItem.associate = function(models) {
    // associations can be defined here
  };
  return Users_FoodItem;
};