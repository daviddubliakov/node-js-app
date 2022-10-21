const path = require('path');
const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

const products = [];

router.get('/add-product', (_req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title })
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
