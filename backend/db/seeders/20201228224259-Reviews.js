'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        "Reviews",
        [
          {
            heading: "Never trying this again!",
            rating: 1,
            foodItemId: 1,
            userId: 1,
            photoUrl:
              "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic1.squarespace.com%2Fstatic%2F57e701625016e1b28d274afb%2Ft%2F58daecd43a04111917f111f5%2F1490742489151%2F%3Fformat%3D1500w&imgrefurl=https%3A%2F%2Fwww.nikkidinkicooking.com%2Fblog%2Fbuffalo-cauliflower-wings&tbnid=fasWItozocEReM&vet=12ahUKEwjG4OK_4PHtAhUGgK0KHXutDNsQMygMegUIARD0Ag..i&docid=89BnmYVi_o3upM&w=700&h=467&q=cauliflower%20wings&ved=2ahUKEwjG4OK_4PHtAhUGgK0KHXutDNsQMygMegUIARD0Ag",
            reviewText: "Too crunchy for me!",
          },
          {
            heading: "My absolute favorite dish!",
            rating: 2,
            foodItemId: 2,
            userId: 2,
            photoUrl:
              "https://www.google.com/imgres?imgurl=https%3A%2F%2Fheatherchristo.com%2Fwp-content%2Fuploads%2F2013%2F04%2Favoc.jpg&imgrefurl=https%3A%2F%2Fheatherchristo.com%2F2013%2F04%2F23%2Ffried-avocado-tacos%2F&tbnid=CoR6so97gGN-LM&vet=12ahUKEwiKwvPo4PHtAhUKG6wKHYLLBX0QMygHegUIARC0AQ..i&docid=SJEe9mcLPS4NQM&w=1024&h=683&q=fried%20avocado%20taco&ved=2ahUKEwiKwvPo4PHtAhUKG6wKHYLLBX0QMygHegUIARC0AQ",
            reviewText: "Would recommend to anyone!",
          },
          {
            heading: "It was okay",
            rating: 3,
            foodItemId: 3,
            userId: 3,
            photoUrl:
              "https://www.google.com/imgres?imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D960813617452659&imgrefurl=https%3A%2F%2Fwww.facebook.com%2F203557073178321%2Fposts%2Ffuel-kale-yeah-mother-brussel-ez-recipe-remix-this-bomb-salad-from-greenseedmkt-%2F960813754119312%2F&tbnid=HqLAvnbi5X9MgM&vet=12ahUKEwjkuq2M4fHtAhVuja0KHXhgBXoQMygEegQIARA3..i&docid=tEJHATLqVo-WJM&w=960&h=960&itg=1&q=kale%20yeah%20mother%20brussel&ved=2ahUKEwjkuq2M4fHtAhVuja0KHXhgBXoQMygEegQIARA3",
            reviewText: "So many other great options on their menu. It was alright but I'll get something different next time",
          },
        ],
        {}
      );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Reviews', null, {});
  }
};
