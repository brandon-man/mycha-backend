const express = require('express');
const router = express.Router();

const { getAllProducts, getProductById } = require('../controller/productControllers');

//@desc GET all products from db
//@route GET /api/products
//@access Public
router.get('/', getAllProducts);

router.get('/:id', getProductById);

module.exports = router;