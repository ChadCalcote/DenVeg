'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    address: DataTypes.STRING,
    photoURL: DataTypes.STRING,
    isVegan: DataTypes.BOOLEAN
  }, {});
  Restaurant.associate = function(models) {
    Restaurant.hasMany(models.FoodItem, { foreignKey: "restaurantId" });
    // associations can be defined here
  };
  return Restaurant;
};