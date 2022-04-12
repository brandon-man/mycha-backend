const User = require("../models/User");

// Error handler

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    firstName: "",
    lastName: "",
    address: "",
    phone: "XXX-XXX-XXXX",
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

const getSignUp = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup error" });
  }
};

const getLogin = async (req, res) => {
  try {
    res.json("login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error" });
  }
};

const postSignUp = async (req, res) => {
  const { firstName, lastName, address, phone, username, password, email } =
    req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      address,
      phone,
      username,
      password,
      email,
    });
    res.status(201).json(user);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
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
  getSignUp,
  getLogin,
  postSignUp,
  postLogin,
};
