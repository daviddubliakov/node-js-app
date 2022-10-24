const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const app = express();

app.engine('hbs', expressHandlebars({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use('/', (_req, res) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
})

app.listen(3000);
