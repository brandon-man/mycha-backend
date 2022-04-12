require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();

app.use(cors());

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

// MIDDLEWARE

app.use(express.json());

// ROUTES
app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

// PORT

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`Server is listening on ${port}`);
});
