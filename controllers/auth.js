const User = require("../models/user");

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  })
};

exports.postLogin = (req, res) => {
  User
    .findById('63f4cabcfee319e443951219')
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      res.redirect('/');
    })
    .catch(err => console.log(err))
}; 
