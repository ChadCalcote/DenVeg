'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "VegHead",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: faker.internet.email(),
          username: "NoMeat4Me",
          hashedPassword: bcrypt.hashSync("vegan"),
        },
        {
          email: faker.internet.email(),
          username: "PlantEater",
          hashedPassword: bcrypt.hashSync("veggies"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['VegHead', 'NoMeat4Me', 'PlantEater'] }
    }, {});
  }
};
