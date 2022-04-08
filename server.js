require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongoose");
const productRoutes = require("./routes/productRoutes");

connectDB();

const app = express();

app.use(cors());

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.use(express.json());

app.use("/api/products", productRoutes);

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`Server is listening on ${port}`);
});
