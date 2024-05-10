const express = require("express");
const router = express.Router();

const { getBuyerUsers, getBuyerUserById, createBuyerUser, updateBuyerUser, deleteBuyerUser, checkBuyerUserByEmail } = require('../controllers/buyerUserController')


router.get('/buyerUsers', getBuyerUsers);
router.get('/buyerUsers/:id', getBuyerUserById);

router.post('/createBuyerUser', createBuyerUser);
router.put('/updateBuyerUser/:id', updateBuyerUser);
router.delete('/deleteBuyerUser/:id', deleteBuyerUser);

router.get('/checkBuyerUserByEmail', checkBuyerUserByEmail);

module.exports = router;
