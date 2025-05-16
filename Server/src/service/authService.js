// src/service/authService.js
const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser } = require('../repository/userRepository');
const { generateToken } = require('../utils/tokenUtils');
const { sendConfirmationEmail } = require('../utils/nodemailer'); // Import sendConfirmationEmail
const jwt = require('jsonwebtoken');

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

  // Generate email verification token
  const verificationToken = jwt.sign(
    { email: newUser.email },
    process.env.JWT_SECRET, // Ensure you have your JWT_SECRET set up in your .env
    { expiresIn: '1h' } // Token expires in 1 hour
  );

  // Send confirmation email with the verification token
  await sendConfirmationEmail(newUser.email, verificationToken);

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
