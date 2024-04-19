const express = require("express");
const router = express.Router();

const {
  getProductsBySellerUser,
  getProductBySellerUserAndId,
  createProductForSellerUser,
  updateProductForSellerUser,
  deleteProductForSellerUser,
} = require("../controllers/productController");

router.get("/:sellerUserId/products", getProductsBySellerUser);

// GET a specific product belonging to a specific seller user
router.get('/:sellerUserId/products/:productId', getProductBySellerUserAndId);

// POST a new product for a specific seller user
router.post("/sellerUsers/:sellerUserId/createProducts", createProductForSellerUser);

// PUT/update a product belonging to a specific seller user
router.put("/sellerUsers/:sellerUserId/products/:productId", updateProductForSellerUser);

// DELETE a product belonging to a specific seller user
router.delete("/sellerUsers/:sellerUserId/products/:productId", deleteProductForSellerUser);

module.exports = router;
