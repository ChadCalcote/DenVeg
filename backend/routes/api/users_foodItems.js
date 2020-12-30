const express = require("express");
const { check, validationResult } = require("express-validator");
const { Sequelize } = require("../../db/models");
const db = require("../../db/models");
const { Users_FoodItem } = db;
const router = express.Router();

const asyncHandler = (handler) => {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
};

const userFoodItemNotFoundError = (id) => {
  const err = Error("User Food Item Not Found!");
  err.errors = [`User Food Item with id of ${id} could not be found.`];
  err.title = "User Food Item Not Found.";
  err.status = 404;
  return err;
};

const validateUsers_foodItems = [
  check("foodItemId")
    .exists({ checkFalsy: true })
    .withMessage("Food Item Id cannot be empty."),
  check("userId")
    .exists({ checkFalsy: true })
    .withMessage("User Id cannot be empty."),
];

// Get all Users_FoodItems
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const Op = Sequelize.Op;
    const userFoodItems = await Users_FoodItem.findAll({
      where: {
        id: {
          [Op.gte]: 1,
        },
      },
    });
    if (userFoodItems) {
      res.json({ userFoodItems });
    } else {
      const err = new Error("User Food Items not found");
      err.status = 404;
      err.title = "User Food Items not found.";
      throw err;
    }
  })
);

// Get Users_FoodItems by ID
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const userFoodItem = await Users_FoodItem.findOne({
      where: {
        id: id,
      },
    });
    if (userFoodItem) {
      res.json({
        Users_FoodItem
      });
    } else {
      const err = new Error("User not found");
      err.status = 404;
      err.title = "User not found.";
      throw err;
    }
  })
);

// Get all User_FoodItems by userId
router.get(
  "/user/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const userFoodItem = await Users_FoodItem.findAll({
      where: {
        userId: req.params.id,
      },
    });
    if (userFoodItem) {
      res.json({
        userFoodItem,
      });
    } else {
      next(userFoodItemNotFoundError(req.params.id));
    }
  })
);

// Create a new Users_FoodItem
router.post(
  "/create",
  validateUsers_foodItems,
  asyncHandler(async (req, res, next) => {
    const { foodItemId, userId } = req.body;
    const usersFoodItem = db.Users_FoodItem.build({
      foodItemId,
      userId
    });
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      await foodItem.save();
      res.json({
        foodItemId,
        userId
      });
    } else {
      userFoodItemsErrors = validatorErrors.array().map((error) => error.msg);
      console.log(userFoodItemsErrors);
      res.json({ userFoodItemsErrors });
    }
  })
);

// Delete a Users_FoodItem
router.delete(
  "/:id(\\d+)/delete",
  asyncHandler(async (req, res, next) => {
    const { userFoodItem } = req.body;
    const destroyedUserFoodItem = userFoodItem;
    const foundUserFoodItem = await Users_FoodItem.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (req.session.auth.userId !== foundUserFoodItem.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You're not authorized to delete this user food item.";
      err.title = "Unauthorized";
      throw err;
    }
    if (foundUserFoodItem) {
      await foundUserFoodItem.destroy();
      res.json({ message: `${destroyedUserFoodItem} has been deleted.` });
    } else {
      next(userFoodItemNotFoundError(req.params.id));
    }
  })
);


module.exports = router;
