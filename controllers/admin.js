const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddProduct = (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  const product = new Product({ title, price, description, imageUrl, userId: req.session.user._id });

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
        product,
        isAuthenticated: req.session.isLoggedIn
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

  Product.findById(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.image = updatedImageUrl;
    return product.save();
  })
    .then(() => {
      console.log('UPDATED PRODUCT');
      res.redirect('/admin/products');
    }).catch(err => console.log(err));
}

exports.getProducts = (req, res) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'email')
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
        isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch(err => console.log(err))
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;

  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED A PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}
