const router = require("express").Router();

const { getLogin, postLogin } = require("../controller/authControllers");

router.get("/login", getLogin);

router.post("/login", postLogin);

module.exports = router;
