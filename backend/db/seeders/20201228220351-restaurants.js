'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        "Restaurants",
        [
          {
            name: "WaterCourse Foods",
            bio:
              "A cute cafe space with Watership Down-inspired murals sets the scene for vegan dishes",
            address: "837 E 17th Ave, Denver, CO 80218",
            photoURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.happycow.net%2Freviews%2Fwatercourse-foods-denver-1754&psig=AOvVaw0HPTqprl8g4gw57SKODIVY&ust=1609279926574000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLD4q5rZ8e0CFQAAAAAdAAAAABAD",
            isVegan: true,
          },
          {
            name: "Migration Taco",
            address: "On The Move",
            bio: "",
            photoURL: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fd3hbe0kmbam4a5.cloudfront.net%2Fphotos%2F40146746-3cca-45c3-a359-5279a849f934.jpg&imgrefurl=https%3A%2F%2Froaminghunger.com%2Fmigration-taco%2F&tbnid=eDcQI1AVa-xS7M&vet=12ahUKEwjS24722fHtAhUGH6wKHXUoB4sQMygCegUIARCUAQ..i&docid=jt9BxPuwd4JCKM&w=960&h=756&q=migration%20taco&hl=en&ved=2ahUKEwjS24722fHtAhUGH6wKHXUoB4sQMygCegUIARCUAQ",
            isVegan: true,
          },
          {
            name: "Green Seed Market",
            bio: "A brightly painted space with build-your-own salads from an array of fresh & prepared ingredients.",
            address: "2669 Larimer St, Denver, CO 80205",
            photoURL: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcontent.idine.com%2Fimages%2Fmerchant%2Frestaurant_images%2F8151498P1.jpg&imgrefurl=https%3A%2F%2Fwww.idine.com%2Fdetails.htm%3FmerchantId%3D151498&tbnid=4w0OdZpM1_2hyM&vet=12ahUKEwid-4uk2vHtAhXIf6wKHfgfAQMQMygAegUIARCcAQ..i&docid=k2sLEKR6tiCLIM&w=513&h=366&q=green%20seed%20market&hl=en&ved=2ahUKEwid-4uk2vHtAhXIf6wKHfgfAQMQMygAegUIARCcAQ",
            isVegan: false,
          },
        ],
        {}
      );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Restaurants", {
        id: { [Op.between]: [1, 3] },
      });
  }
};
