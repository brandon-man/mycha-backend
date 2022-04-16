const router = require("express").Router();

const {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
} = require("../controller/authControllers");

router.get("/users", getSignup);

router.post("/users", postSignup);

router.get("/login", getLogin);

router.post("/login", postLogin);

module.exports = router;
