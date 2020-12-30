'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        "FoodItems",
        [
          {
            name: "Cauliflower Wings",
            description: "Choice of Sauce: Buffalo or BBQ",
            price: 1200,
            views: 0,
            restaurantId: 1,
            isSpecial: false,
            photoUrl:
              "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F5b3ab6f65ffd206fbbaf233f%2F1592240798808-ZO52B8I6EPPQ61CAQI5Y%2Fke17ZwdGBToddI8pDm48kAmzVESnndSkFo4VjUYj3iZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UetZcyBSe8EzOZ6neXOxaly-CFnPMrhhheFAmjlN4d47pJmyJuPnROfkv0UjH_ecUA%2F1N0A9458.jpg&imgrefurl=https%3A%2F%2Fwww.watercoursefoods.com%2F&tbnid=R-9XCHb0FPlz6M&vet=12ahUKEwjQrp7A3PHtAhUMFqwKHZA0CjkQMygCegUIARCXAQ..i&docid=zbGxMxWjSKcghM&w=1000&h=667&q=cauliflower%20wings%20watercourse%20denver&ved=2ahUKEwjQrp7A3PHtAhUMFqwKHZA0CjkQMygCegUIARCXAQ",
          },
          {
            name: "Fried Avocado",
            description: "Beer-Battered Fried Avocado",
            price: 600,
            views: 65,
            restaurantId: 2,
            isSpecial: false,
            photoUrl:
              "https://www.google.com/imgres?imgurl=https%3A%2F%2Ffood-fanatic-res.cloudinary.com%2Fiu%2Fs--Lg36Pm1s--%2Fc_thumb%2Cf_auto%2Cg_auto%2Ch_1200%2Cq_auto%2Cw_1200%2Fv1477510646%2Ffried-avocado-tacos-photo&imgrefurl=https%3A%2F%2Fwww.cakenknife.com%2Ffried-avocado-tacos%2F&tbnid=4q46ldlPa3VrAM&vet=12ahUKEwiple2C3fHtAhUOL6wKHepVBUAQMygBegUIARCVAQ..i&docid=DkSNrQotPMC0BM&w=1200&h=1200&q=fried%20avocado%20taco%20migration%20taco&hl=en&ved=2ahUKEwiple2C3fHtAhUOL6wKHepVBUAQMygBegUIARCVAQ",
          },
          {
            name: "Kale Yeah Mother Brussel",
            description:
              "Kale, Shaved Brussels, Bacon, Cherry Tomatoes, Granny Apples, Roasted Almonds, Golden Raisins, White Apple Balsamic Vinaigrette",
            price: 1150,
            views: 0,
            restaurantId: 3,
            isSpecial: false,
            photoUrl:
              "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia-cdn.grubhub.com%2Fimage%2Fupload%2Ff_auto%2Cfl_lossy%2Cq_80%2Cc_fill%2Cw_200%2Ch_150%2Fsvxo66eqitzu5eqfkoz3&imgrefurl=https%3A%2F%2Fwww.grubhub.com%2Frestaurant%2Fgreen-seed-2669-larimer-st-denver%2F383952&tbnid=_kfkztPFisdCiM&vet=12ahUKEwj5u8PX3fHtAhVO_qwKHaV5CCYQMygCegQIARAy..i&docid=TWG37Y8zwue2WM&w=200&h=150&q=kale%20yeah%20mother%20brussel&hl=en&ved=2ahUKEwj5u8PX3fHtAhVO_qwKHaV5CCYQMygCegQIARAy",
          },
        ],
        {}
      );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("FoodItems", {
        id: { [Op.between]: [1, 3] },
      });
  }
};
