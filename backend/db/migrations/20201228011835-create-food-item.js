'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("FoodItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      views: {
        type: Sequelize.INTEGER,
      },
      restuarantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Restaurants", key: "id" },
      },
      isSpecial: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      photoUrl: {
        type: Sequelize.STRING(1000),
        defaultValue:
          "https://webstockreview.net/images/dish-clipart-purple-food-12.png",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FoodItems');
  }
};