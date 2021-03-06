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

// Get all food items from database
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
      res.json({ foodItems: foodItems });
    } else {
      const err = new Error("Food Items not found");
      err.status = 404;
      err.title = "Food Items not found.";
      throw err;
    }
  })
);

// Get Food Item by ID
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
        foodItem
      });
    } else {
      next(foodItemNotFoundError(req.params.id));
    }
  })
);

// Get all food items under $10
router.get(
  "/cheap",
  asyncHandler(async (req, res, next) => {
    const Op = Sequelize.Op;
    const cheapItems = await FoodItem.findAll({
      where: {
        price: {
          [Op.lte]: 1000,
        },
      },
    });
    if (cheapItems) {
      res.json({
        cheapItems,
      });
    } else {
      const err = new Error("Food Items not found below that price");
      err.status = 404;
      err.title = "Food Items not found.";
      throw err;
    }
  })
);

// Create a new food item
router.post(
  "/create",
  validateFoodItem,
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const validatorErrors = validationResult(req);
    const { name, description, price, restaurantId, isSpecial, photoUrl } = req.body;
    const foodItem = db.FoodItem.build({ name, description, price, restaurantId, isSpecial, photoUrl });
    if (validatorErrors.isEmpty()) {
      await foodItem.save();
      res.status(200)
      res.json({
        name,
        description,
        price,
        restaurantId
      });
    } else {
      res.status(400);
      foodItemErrors = validatorErrors.array().map((error) => error.msg);
      console.log(foodItemErrors);
      res.json({ foodItemErrors });
    }
  })
);

// Delete a Food Item
router.delete(
  "/:id(\\d+)/delete",
  asyncHandler(async (req, res, next) => {
    const { foodItem } = req.body;
    const destroyedFoodItem = foodItem;
    const item = await FoodItem.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (item) {
      await item.destroy();
      res.json({ message: `${destroyedFoodItem} has been deleted.` });
    } else {
      next(foodItemNotFoundError(req.params.id));
    }
  })
);

module.exports = router;