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

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const userFoodItem = await Users_FoodItem.findAll(id);
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

module.exports = router;
