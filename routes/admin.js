const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (_req, res) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });
});

router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title })
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
