exports.get404 = (_req, res) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
}
