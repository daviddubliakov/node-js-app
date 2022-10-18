const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

router.get('/', (_req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
