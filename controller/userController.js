const User = require("../models/User");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const authenticateUser = async (req, res) => {
  try {
    const user = await User.authenticate(req.body);
    if (!user) res.sendStatus(404);
    const token = await user.generateToken();
    res.send(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authentication error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Users Server error" });
  }
};

module.exports = { authenticateUser, getAllUsers };
