const router = require("express").Router();

const {
  getAllProducts,
  getProductById,
} = require("../controller/productControllers");

//@desc GET all products from db
//@route GET /api/products
//@access Public

// GET /api/products
router.get("/", getAllProducts);

// GET /api/products/:id
router.get("/:id", getProductById);

module.exports = router;
