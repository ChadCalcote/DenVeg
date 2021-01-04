const express = require('express');
const { check, validationResult } = require('express-validator');
const { Sequelize } = require('../../db/models');
const db = require ('../../db/models');
const { Restaurant } = db;
const router = express.Router();

const asyncHandler = (handler) => {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
};

const restaurantNotFoundError = (id) => {
    const err = Error("Restaurant Not Found!");
    err.errors = [`Restaurant with id of ${id} could not be found.`];
    err.title = "Restaurant Not Found.";
    err.status = 404;
    return err;
};

const validateRestaurant = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Restaurant Name cannot be empty.")
    .isLength({ max: 80 })
    .withMessage("Restaurant Name cannot be longer than 80 characters."),
  check("bio")
    .exists({ checkFalsy: true })
    .withMessage("Bio must be filled out"),
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Address field must be completed."),
  check("photoURL")
    .exists({ checkFalsy: true })
    .withMessage("Photo URL must be added.")
    .isLength({ max: 100000 })
    .withMessage("Restaurant Name cannot exceed 1000 characters."),
];

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const Op = Sequelize.Op;
    const restaurants = await Restaurant.findAll({
      where: {
        id: {
            [Op.gte]: 1
        }
      },
    });
    if (restaurants) {
      res.json({ restaurants });
    } else {
      const err = new Error("Restaurants not found");
      err.status = 404;
      err.title = "Restaurants not found.";
      throw err;
    }
  })
);

// Get Restaurant By ID
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const restaurant = await Restaurant.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (restaurant) {
      res.json({
        restaurant
      });
    } else {
      next(restaurantNotFoundError(req.params.id));
    }
  })
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const foodItem = await FoodItem.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (foodItem) {
      res.json({
        foodItem,
      });
    } else {
      next(foodItemNotFoundError(req.params.id));
    }
  })
);

// Get all food items under $10
router.get(
  "/vegan",
  asyncHandler(async (req, res, next) => {
    const Op = Sequelize.Op;
    const veganRestaurants = await Restaurant.findAll({
      where: {
        isVegan: {
          [Op.not]: false,
        },
      },
    });
    if (veganRestaurants) {
      res.json({
        veganRestaurants,
      });
    } else {
      const err = new Error("Vegan Restaurants not found below that price");
      err.status = 404;
      err.title = "Vegan Restaurants not found.";
      throw err;
    }
  })
);

// Create a New Restaurant
router.post(
  "/create",
  validateRestaurant,
  asyncHandler(async (req, res, next) => {
    const { name, bio, address, photoURL, isVegan } = req.body;
    const restaurant = db.Restaurant.build({
      name,
      bio,
      address,
      photoURL,
      isVegan,
    });
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      await restaurant.save();
      res.json({
        name,
        bio,
        address,
        photoURL,
        isVegan
      });
    } else {
      restaurantErrors = validatorErrors.array().map((error) => error.msg);
      console.log(restaurantErrors);
      res.json({ restaurantErrors });
    }
  })
);

// Delete a Restaurant
router.delete(
  "/:id(\\d+)/delete",
  asyncHandler(async (req, res, next) => {
    const { restaurant } = req.body;
    const destroyedRestaurant = restaurant;
    const foundRestaurant = await Restaurant.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (foundRestaurant) {
      await foundRestaurant.destroy();
      res.json({ message: `${destroyedRestaurant} has been deleted.` });
    } else {
      next(restaurantNotFoundError(req.params.id));
    }
  })
);

module.exports = router;