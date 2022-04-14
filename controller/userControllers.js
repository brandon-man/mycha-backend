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

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot find users" });
  }
};

// GET /api/users/:id
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({});
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot find user" });
  }
};

// POST /api/users
const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

// PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const options = { new: true };
    const user = await User.findByIdAndUpdate(id, req.body, options);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update user error!" });
  }
};

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete user error" });
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
