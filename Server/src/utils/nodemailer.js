// src/utils/nodemailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

// Function to send confirmation email
const sendConfirmationEmail = (toEmail, verificationToken) => {
  const verificationLink = `http://localhost:5000/api/auth/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER, // The email address from which the email will be sent
    to: toEmail, // The user's email address
    subject: 'Please verify your email',
    text: `Hello,\n\nPlease verify your email by clicking the following link:\n\n${verificationLink}\n\nThe link will expire in 1 hour.`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail };
