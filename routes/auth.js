const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// /auth/login => GET
router.get('/login', authController.getLogin);

// /auth/login => POST
router.post('/login', authController.postLogin);

module.exports = router;