const express = require('express');
const router = express.Router();

const productController = require ('../controllers/productController')

router.get('/sellerUsers/:sellerUserId/products', productController.getProductsBySellerUser);

// GET a specific product belonging to a specific seller user
router.get('/products/:productId', productController.getProductBySellerUserAndId);

// POST a new product for a specific seller user
router.post('/sellerUsers/:sellerUserId/createProducts', productController.createProductForSellerUser);

// PUT/update a product belonging to a specific seller user
router.put('/sellerUsers/:sellerUserId/products/:productId', productController.updateProductForSellerUser);

// DELETE a product belonging to a specific seller user
router.delete('/sellerUsers/:sellerUserId/products/:productId', productController.deleteProductForSellerUser);

module.exports = router;