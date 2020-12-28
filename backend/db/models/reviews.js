'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    heading: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    foodItemId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    photoUrl: DataTypes.STRING,
    reviewText: DataTypes.TEXT
  }, {});
  Reviews.associate = function(models) {
    // associations can be defined here
  };
  return Reviews;
};