// src/controller/authController.js
const { signupValidator, loginValidator } = require('../validators/userValidator');
const { signupService, loginService } = require('../service/authService');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Signup Controller
const signup = async (req, res) => {
  // Validate the request body using Joi
  const { error } = signupValidator(req.body);
  if (error) {
    // Return all validation errors (not just the first one)
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ message: errorMessages.join(', ') });
  }

  try {
    // Call the signupService to handle the logic
    const user = await signupService(req.body);
    res.status(201).json({ message: 'User created successfully. Please check your email for verification.', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Login Controller
const login = async (req, res) => {
  // Validate the request body using Joi
  const { error } = loginValidator(req.body);
  if (error) {
    // Return all validation errors (not just the first one)
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ message: errorMessages.join(', ') });
  }

  try {
    // Call the loginService to handle the logic
    const token = await loginService(req.body);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ message: 'Login failed: ' + error.message });
  }
};

// Email verification controller
const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Mark the user's email as verified
    user.verified = true;
    user.verificationToken = null; // Clear the verification token

    await user.save();

    res.status(200).json({ message: 'Email successfully verified!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { signup, login, verifyEmail };
