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

// Register new user
const getSignup = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot find users" });
  }
};

// POST /api/auth/signup
const postSignup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(401).json({ errors });
  }
};

// Login user
const getLogin = async (req, res) => {
  try {
    res.json("login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error" });
  }
};

// POST /api/auth/login
const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Login error" });
  }
};

module.exports = {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
};
