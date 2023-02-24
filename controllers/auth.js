exports.getLogin = (req, res) => {
  const isAuthenticated = req.get('Cookie').split('; ').find(c => c.includes('loggedIn')).split('=')[1];
  
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated
  })
};

exports.postLogin = (req, res) => {
  res.setHeader('Set-Cookie', 'loggedIn=true')
  res.redirect('/');
}; 
