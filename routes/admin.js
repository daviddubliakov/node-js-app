const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router
  .route('/add-product', isAuth)
  .get(adminController.getAddProduct)
  .post(
    [
      body('title')
        .isString()
        .withMessage(
          'Please provide a proper title with only numbers or letters.',
        )
        .isLength({ min: 3 })
        .trim()
        .withMessage('Title should be at least 3 characters long.'),
      body('price').isNumeric().withMessage('Please provide only numbers.'),
      body('description')
        .isLength({ min: 3, max: 400 })
        .trim()
        .withMessage(
          'Description should be at least 3 characters long and not bigger then 400.',
        ),
    ],
    adminController.postAddProduct,
  );

router.get('/products', isAuth, adminController.getProducts);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product',
  isAuth,
  [
    body('title')
      .isString()
      .withMessage(
        'Please provide a proper title with only numbers or letters.',
      )
      .isLength({ min: 3 })
      .trim()
      .withMessage('Title should be at least 3 characters long.'),
    body('price').isFloat().withMessage('Please provide only numbers.'),
    body('description')
      .isLength({ min: 3, max: 400 })
      .trim()
      .withMessage(
        'Description should be at least 3 characters long and not bigger then 400.',
      ),
  ],
  adminController.postEditProduct,
);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
