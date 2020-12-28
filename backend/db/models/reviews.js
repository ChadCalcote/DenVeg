'use strict';

const { Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define(
    "Reviews",
    {
      heading: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          max: 5,
        },
      },
      foodItemId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      photoUrl: DataTypes.STRING,
      reviewText: DataTypes.TEXT,
    },
    {}
  );
  Reviews.associate = function(models) {
    Reviews.belongsTo(models.User, { foreignKey: "userId" });
    Reviews.belongsTo(models.FoodItem, { foreignKey: "foodItemId" });
    // associations can be defined here
  };
  return Reviews;
};