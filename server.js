const express = require('express');
const path = require('path');

const app = express();

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    res.send("Welcome to mycha");
})

app.get("/contact", (req, res) => {
    res.send("Welcome to the contact page");
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})