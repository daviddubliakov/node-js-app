const Product = require('../models/product');

exports.getAddProduct = (_req, res) => {
  res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });
}

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);

  product.save();
  res.redirect('/');
};

exports.getProducts = (_req, res) => {
  Product.fetchAll((products) => {
    res.render('admin/products', { prods: products, pageTitle: 'Admin Products', path: '/admin/products' });
  });
}
