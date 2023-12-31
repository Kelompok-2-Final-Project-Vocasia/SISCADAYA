const Joi = require('joi');

// Validasi data register user
const regisUser = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    nama: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

// Validasi data login user
const loginUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

module.exports = { regisUser, loginUser };