// src/service/authService.js
const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser } = require('../repository/userRepository');
const { generateToken } = require('../utils/tokenUtils');

// Sign-up service logic
const signupService = async ({ full_name, username, email, phone_number, password }) => {
  // Check if the email is already in use
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email is already in use');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const newUser = await createUser({
    full_name,
    username,
    email,
    phone_number,
    password: hashedPassword,
  });

  return newUser;
};

// Login service logic
const loginService = async ({ email, password }) => {
  // Find the user by email
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT token
  const token = generateToken(user._id);
  return token;
};

module.exports = { signupService, loginService };
