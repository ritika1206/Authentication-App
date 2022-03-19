const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/user');

const router = express.Router();

router.post(
  '/signup',
  [
    check('uname')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 7 })
  ],
  userController.signup
);

router.post('/login', userController.login);

module.exports = router;
