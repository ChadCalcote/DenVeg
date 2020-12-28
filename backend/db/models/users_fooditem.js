'use strict';

// const { BelongsTo } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const Users_FoodItem = sequelize.define('Users_FoodItem', {
    foodItemId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Users_FoodItem.associate = function(models) {
    Users_FoodItem.belongsTo(models.User, { foreignKey: "userId" });
    Users_FoodItem.belongsTo(models.FoodItem, { foreignKey: "foodItemId" });
    // associations can be defined here
  };
  return Users_FoodItem;
};