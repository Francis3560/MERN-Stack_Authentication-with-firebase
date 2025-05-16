// src/router/authRoutes.js
const express = require('express');
const { signup, login, verifyEmail } = require('../controller/authController'); // Add verifyEmail
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

// Login Route
router.post('/login', (req, res, next) => {
  const { error } = loginValidator(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}, login);

// Email Verification Route
router.get('/verify-email', verifyEmail); // New route for email verification

module.exports = router;
