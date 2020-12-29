const express = require("express");
const { check, validationResult } = require("express-validator");
const { Sequelize } = require("../../db/models");
const db = require("../../db/models");
const { Review } = db;
const router = express.Router();

const asyncHandler = (handler) => {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
};

const reviewNotFoundError = (id) => {
  const err = Error("Review Not Found!");
  err.errors = [`Review with id of ${id} could not be found.`];
  err.title = "Review Not Found.";
  err.status = 404;
  return err;
};

const validateReview = [
  check("heading")
    .exists({ checkFalsy: true })
    .withMessage("Heading cannot be empty.")
    .isLength({ max: 50 })
    .withMessage("Heading cannot be longer than 80 characters."),
  check("rating")
    .exists({ checkFalsy: true })
    .withMessage("Must give a rating."),
  check("foodItemId")
    .exists({ checkFalsy: true })
    .withMessage("Food Item ID must be specified."),
  check("userId")
    .exists({ checkFalsy: true })
    .withMessage("User ID must be specified."),
  check("photoUrl")
    .exists({ checkFalsy: true })
    .withMessage("Must specify a photo URL.")
    .isLength({ max: 1000 })
    .withMessage("Photo URL cannot be longer than 1000 characters."),
  check("reviewText")
    .exists({ checkFalsy: true })
    .withMessage("Must provide text for the review."),
];

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const Op = Sequelize.Op;
    const reviews = await Review.findAll({
      where: {
        id: {
          [Op.gte]: 1,
        },
      },
    });
    if (reviews) {
      res.json({ reviews });
    } else {
      const err = new Error("Reviews not found");
      err.status = 404;
      err.title = "Reviews not found.";
      throw err;
    }
  })
);

module.exports = router;
