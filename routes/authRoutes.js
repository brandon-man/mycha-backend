const router = require("express").Router();

const {
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
} = require("../controller/authControllers");

router.get("/signup", getSignUp);

router.post("/signup", postSignUp);

router.get("/login", getLogin);

router.post("/login", postLogin);

module.exports = router;
