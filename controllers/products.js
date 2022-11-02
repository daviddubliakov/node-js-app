const products = [];

exports.getAddProduct = (_req, res) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });
}

exports.postAddProduct = (req, res) => {
  products.push({ title: req.body.title })
  res.redirect('/');
};

exports.getProducts = (_req, res) => {
  res.render('shop', { prods: products, pageTitle: 'Shop', path: '/', hasProducts: products.length > 0, activeShop: true, productCSS: true });
}

exports.products = products;
