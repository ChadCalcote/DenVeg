const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Sequelize} = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

// Get all users
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const Op = Sequelize.Op;
    const users = await User.findAll({
      where: {
        id: {
          [Op.gte]: 1,
        },
      },
    });
    if (users) {
      res.json({
        users
      });
    } else {
      const err = new Error("Users not found");
      err.status = 404;
      err.title = "Users not found.";
      throw err;
    }
  })
);


// Get user by Id
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const user = await User.findByPk(id);
    if (user) {
      res.json({
        username: user.username,
        userId: id,
      });
    } else {
      const err = new Error("User not found");
      err.status = 404;
      err.title = "User not found.";
      throw err;
    }
  })
);

module.exports = router;
