'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodItem = sequelize.define('FoodItem', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    views: DataTypes.STRING,
    restaurantId: DataTypes.INTEGER,
    isSpecial: DataTypes.BOOLEAN,
    photoUrl: DataTypes.STRING
  }, {});
  FoodItem.associate = function(models) {
    const columnMapping = {
      through: 'Users_FoodItem',
      otherKey: 'userId',
      foreignKey: 'foodItemId'
    }
    FoodItem.belongsToMany(models.User, columnMapping);
    FoodItem.belongsTo(models.Restaurant, { foreignKey: "restaurantId" });
    FoodItem.hasMany(models.Review, { foreignKey: "foodItemId" });
    // associations can be defined here
  };
  return FoodItem;
};