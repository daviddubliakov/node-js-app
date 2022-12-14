const Product = require('../models/product');

exports.getAddProduct = (_req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const product = new Product(title, price, description, imageUrl, null, req.user._id);

  product.save()
    .then(() => {
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  const prodID = req.params.productId;

  if (!editMode) {
    return res.redirect('/');
  }

  Product.findById(prodID)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;


  const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, prodId);

  return product.save()
    .then(() => {
      console.log('UPDATED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })
    })
    .catch(err => console.log(err))
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;

  Product.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED A PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}
