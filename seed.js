require("dotenv").config();
const Product = require("./models/Product");
const productData = require("./data/products");
const User = require("./models/User");
const userData = require("./data/credentials");
const connectDB = require("./config/mongoose");

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(productData);
    await User.deleteMany({});
    await User.insertMany(userData);
    console.log("Data Import Success");
    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
