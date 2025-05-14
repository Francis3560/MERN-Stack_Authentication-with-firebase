// src/utils/tokenUtils.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateToken };
