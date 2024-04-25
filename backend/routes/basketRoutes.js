const express = require("express");
const router = express.Router();


const { createBasket, getBasketById, getUserBaskets, addProductToBasket, updateBasket, removeProductFromBasket, deleteBasket } = require('../controllers/basketController');


router.post('/baskets', createBasket);


router.get('/baskets/:id', getBasketById);


router.get('/baskets', getUserBaskets);


router.post('/baskets/:id/products', addProductToBasket);


router.put('/baskets/:id', updateBasket);


router.delete('/baskets/:id/products/:productId', removeProductFromBasket);


router.delete('/baskets/:id', deleteBasket);

module.exports = router;
