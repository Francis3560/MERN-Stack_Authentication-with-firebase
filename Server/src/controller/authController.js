// src/controller/authController.js
const { signupValidator, loginValidator } = require('../validators/userValidator');
const { signupService, loginService } = require('../service/authService');

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
    res.status(201).json({ message: 'User created successfully', user });
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

module.exports = { signup, login };
