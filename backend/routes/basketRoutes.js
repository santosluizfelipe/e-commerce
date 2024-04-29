const express = require("express");
const router = express.Router();


const { createBasket, getUserBaskets, addProductToBasket, updateBasket, removeProductFromBasket, deleteBasket } = require("../controllers/basketController")


router.post('/createBasket', createBasket);


router.get('/baskets/:buyerUserId', getUserBaskets);


router.post('/baskets/:id/products', addProductToBasket);


router.put('/baskets/:id', updateBasket);


router.delete('/baskets/:id/products/:productId', removeProductFromBasket);


router.delete('/baskets/:id', deleteBasket);

module.exports = router;
