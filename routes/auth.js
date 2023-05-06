const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.route('/login')
  .get(authController.getLogin)
  .post(
    [
      body('email').isEmail().withMessage('Please enter a valid email.'),
      body('password').isLength({ min: 5 }).withMessage('Please eneter a password with at least 5 charachters.').isAlphanumeric().withMessage('Please enter a password with only numbers and text.')
    ],
    authController.postLogin
  );

router.route('/signup')
  .get(authController.getSignup)
  .post(
    [
      body('email').isEmail().withMessage('Please enter a valid email.').custom((value) => {
        return User.findOne({ email: value })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('E-Mail exists already, please pick a different one.');
            }
          })
      }),
      body('password').isLength({ min: 5 }).withMessage('Please eneter a password with at least 5 charachters.').isAlphanumeric().withMessage('Please enter a password with only numbers and text.'),
      body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords should be equal!')
        }

        return true;
      })
    ],
    authController.postSignup
  );

router.route('/reset')
  .get(authController.getReset)
  .post(authController.postReset);

router.route('/reset/:token')
  .get(authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

router.post('/logout', authController.postLogout);

module.exports = router;
