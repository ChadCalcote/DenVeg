const express = require("express");
const { check, validationResult } = require("express-validator");
const { Sequelize } = require("../../db/models");
const db = require("../../db/models");
const { FoodItem } = db;
const router = express.Router();

const asyncHandler = (handler) => {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
};

const foodItemNotFoundError = (id) => {
  const err = Error("Food Item Not Found!");
  err.errors = [`Food Item with id of ${id} could not be found.`];
  err.title = "Food Item Not Found.";
  err.status = 404;
  return err;
};

const validateFoodItem = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Food Item Name cannot be empty.")
    .isLength({ max: 80 })
    .withMessage("Food Item Name cannot be longer than 80 characters."),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description must be filled out"),
  check("views")
    .exists({ checkFalsy: true })
    .withMessage("Amount of views must be present."),
  check("restaurantId")
    .exists({ checkFalsy: true })
    .withMessage("Restaurant ID must be specified."),
  check("isSpecial")
    .exists({ checkFalsy: true })
    .withMessage("Must specify if item is a special."),
  check("photoUrl")
    .exists({ checkFalsy: true })
    .withMessage("Must specify a photo URL."),
];

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const Op = Sequelize.Op;
    const foodItems = await FoodItem.findAll({
      where: {
        id: {
          [Op.gte]: 1,
        },
      },
    });
    if (foodItems) {
      res.json({ foodItems });
    } else {
      const err = new Error("Food Items not found");
      err.status = 404;
      err.title = "Food Items not found.";
      throw err;
    }
  })
);

module.exports = router;