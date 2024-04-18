const express = require("express");
const router = express.Router();

const { getBuyerUsers, createBuyerUser, updateBuyerUser, deleteBuyerUser } = require('../controllers/buyerUserController')


router.get('/buyerUsers', getBuyerUsers);
router.post('/createBuyerUser', createBuyerUser);
router.put('/updateBuyerUser/:id', updateBuyerUser);
router.delete('/deleteBuyerUser/:id', deleteBuyerUser);

module.exports = router;
