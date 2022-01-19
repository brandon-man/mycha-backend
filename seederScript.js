require('dotenv').config();

const productsData = require('./data/products');
const connectDB = require('./config/mongoose');
const Product = require('./models/Product');

connectDB();

const importData = async () => {
    try {
      await Product.deleteMany({});

      await Product.insertMany(productsData);

      console.log("Data import success");

      process.exit();
    } catch (error) {
        console.error("Error with data import");
        process.exit(1);
    }
};

importData();