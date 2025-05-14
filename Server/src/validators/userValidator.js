
const Joi = require('joi');

// Validator for user signup
const signupValidator = (data) => {
  const schema = Joi.object({
    full_name: Joi.string().min(3).max(100).required().messages({
      'string.base': 'Full name must be a string.',
      'string.empty': 'Full name cannot be empty.',
      'any.required': 'Full name is required.',
    }),
    
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.base': 'Username must be a string.',
      'string.empty': 'Username cannot be empty.',
      'any.required': 'Username is required.',
    }),

    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a valid email address.',
      'string.empty': 'Email cannot be empty.',
      'any.required': 'Email is required.',
    }),

    phone_number: Joi.string().pattern(/^\+254\d{9}$/).required().messages({
      'string.pattern.base': 'Phone number must be in the format +254XXXXXXXXX.',
      'string.empty': 'Phone number cannot be empty.',
      'any.required': 'Phone number is required.',
    }),

    password: Joi.string().min(8).required().messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password cannot be empty.',
      'string.min': 'Password must be at least 8 characters long.',
      'any.required': 'Password is required.',
    }),

    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Password and confirmation must match.',
      'any.required': 'Confirm password is required.',
    }),
  });

  return schema.validate(data);
};

// Validator for user login
const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports = { signupValidator, loginValidator };
