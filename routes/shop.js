const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (_req, res) => {
  const products = adminData.products;

  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
});

module.exports = router;
