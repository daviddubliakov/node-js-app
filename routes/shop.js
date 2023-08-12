const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router
  .route('/cart', isAuth)
  .get(shopController.getCart)
  .post(shopController.postCart);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/checkout', isAuth, shopController.getCheckout);

router.get('/orders/:orderId', isAuth, shopController.getInvoice);
router.get('/orders', isAuth, shopController.getOrders);

router.get('/', shopController.getIndex);

module.exports = router;
