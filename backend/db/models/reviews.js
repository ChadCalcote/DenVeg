'use strict';

const { Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
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
  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.FoodItem, { foreignKey: "foodItemId" });
    // associations can be defined here
  };
  return Review;
};