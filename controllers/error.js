const { StatusCodes } = require('http-status-codes');

exports.get404 = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).render('404', {
    pageTitle: 'Page Not Found',
    path: '/404',
  });
};

exports.get500 = (req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('500', {
    pageTitle: 'Error !',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn,
  });
};
