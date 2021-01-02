'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Restaurants", {
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
      bio: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "No Bio Yet! Stay Tuned...",
      },
      address: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      photoURL: {
        type: Sequelize.STRING(100000),
        allowNull: false,
        defaultValue:
          "https://webstockreview.net/images/restaurants-clipart.png",
      },
      isVegan: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    return queryInterface.dropTable('Restaurants');
  }
};