const router = require("express").Router();

const {
  authenticateUser,
  getAllUsers,
} = require("../controller/userController");

// POST /api/auth
router.post("/", authenticateUser);

// GET /api/auth
router.get("/", getAllUsers);

module.exports = router;
