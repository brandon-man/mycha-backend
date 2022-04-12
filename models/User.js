const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Address is required"],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Phone number is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Mininum password length is 6 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
