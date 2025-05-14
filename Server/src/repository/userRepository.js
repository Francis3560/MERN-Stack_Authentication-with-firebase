// src/repository/userRepository.js
const User = require('../../models/User');  // Ensure the correct path to User model

// Find user by email
const findUserByEmail = async (email) => {
  try {
    // Use the User model to search for the user by email
    const user = await User.findOne({ email });
    return user;  // Returns the user if found, or null if not found
  } catch (error) {
    throw new Error('Error finding user by email: ' + error.message);
  }
};

// Create a new user
const createUser = async ({ full_name, username, email, phone_number, password }) => {
  try {
    // Create a new user document using the User model
    const user = new User({
      full_name,
      username,
      email,
      phone_number,
      password,  // The password should already be hashed before being passed to this function
    });

    // Save the new user to the database
    await user.save();

    return user;  // Return the created user object
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

// Additional method: update user information
const updateUser = async (userId, updateData) => {
  try {
    // Find the user by ID and update their data
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};

// Additional method: delete user
const deleteUser = async (userId) => {
  try {
    // Delete the user by ID
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
};

module.exports = { findUserByEmail, createUser, updateUser, deleteUser };
