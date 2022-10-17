const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('<h1>Home Page</h1>')
});

module.exports = router;
