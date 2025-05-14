// src/router/authRoutes.js
const express = require('express');
const { signup, login } = require('../controller/authController');
const { signupValidator, loginValidator } = require('../validators/userValidator');

const router = express.Router();

// Sign-up Route
router.post('/signup', (req, res, next) => {
  const { error } = signupValidator(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}, signup);

router.post('/login', (req, res, next) => {
  const { error } = loginValidator(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}, login);

module.exports = router;
