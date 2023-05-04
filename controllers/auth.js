const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');

const User = require('../models/user');

dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.getLogin = (req, res) => {
  let message = req.flash('error');

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
      }

      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }

          req.flash('error', 'Invalid email or password');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login')
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'E-Mail exists already, please pick a different one.');
        return res.redirect('/signup');
      }

      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] }
          });

          return user.save();
        })
        .then(() => {
          res.redirect('/login')
          return sgMail.send({
            to: email,
            from: 'dubliakov1@gmail.com',
            subject: 'Weclome to Node Shop',
            html: '<h1>You were signed up successfuly</h1>'
          });
        })
        .catch(err => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res) => {
  let message = req.flash('error');

  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset passeord',
    errorMessage: message
  });
};

exports.postReset = (req, res, next) => {
  const { email } = req.body;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.redirect('/reset');
    }

    const token = buffer.toString('hex');

    User.findOne({ email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No account with that email found .');
          return res.redirect('/reset');
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;

        return user.save();
      })
      .then(() => {
        res.redirect('/');
        return sgMail.send({
          to: email,
          from: 'davidspam1488@gmail.com',
          subject: 'Password reset',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password</p>
          `

        })
      })
      .catch(err => console.log(err))
  })
};
