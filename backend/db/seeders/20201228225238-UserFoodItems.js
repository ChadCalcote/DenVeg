'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        "Users_FoodItems",
        [
          {
            foodItemId: 2,
            userId: 1,
          },
          {
            foodItemId: 3,
            userId: 3,
          },
          {
            foodItemId: 1,
            userId: 2,
          },
        ],
        {}
      );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Users_FoodItems", null, {});
  }
};
