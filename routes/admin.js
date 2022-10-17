const express = require('express');

const router = express.Router();

router.get('/add-product', (_req, res) => {
  res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title" /><button type="submit">Add Product</button></form>')
});

router.post('/add-product', (req, res) => {
  res.redirect('/');
});

module.exports = router;
