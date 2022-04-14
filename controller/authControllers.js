const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Error handler

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    username: "",
    password: "",
    email: "",
  };

  // duplicate error code
  if (err.code === 11000) {
    errors.username = "That username is already taken";
    errors.email = "That email is already taken";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, { expiresIn: maxAge });
};

const getLogin = async (req, res) => {
  try {
    res.json("login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error" });
  }
};

const postLogin = async (req, res) => {
  try {
    res.status(201).json("new login");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Login error" });
  }
};

module.exports = {
  getLogin,
  postLogin,
};
