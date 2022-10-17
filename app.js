const express = require('express');

const app = express();

// app.use((_req, _res, next) => {
//   console.log('The first middleware');
//   next();
// });

// app.use((req, res) => {
//   console.log('The second middleware');
//   res.send('<h1>Hello world!</h1>');
// });

app.use('/create', (_req, res) => {
  res.send('<h1>Create Page</h1>')
});

app.use('/', (_req, res) => {
  res.send('<h1>Home Page</h1>')
});

app.listen(3000);
