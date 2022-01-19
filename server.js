require('dotenv').config();
const express = require('express');
const connectDB = require('./config/mongoose');
const productRoutes = require('./routes/productRoutes');

connectDB();

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes)

app.get("/", (req, res) => {
    res.send("Hello World");
})

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
    console.log(`Server is listening on ${port}`)
});

