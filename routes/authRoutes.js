const router = require("express").Router();

const {
  getSignup,
  getLogin,
  postSignup,
  postLogin,
} = require("../controller/authControllers");

router.get("/users", getSignup);

router.get("/login", getLogin);

router.post("/users", postSignup);

router.post("/login", postLogin);

module.exports = router;
