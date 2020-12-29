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
    .isLength({ max: 10000 })
    .withMessage("Restaurant Name cannot exceed 1000 characters."),
  check("isVegan")
    .exists({ checkFalsy: true })
    .withMessage("Must specify if item is vegan."),
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

module.exports = router;