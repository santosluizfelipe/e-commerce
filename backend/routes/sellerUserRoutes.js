const express = require("express");
const router = express.Router();

const { getSellerUsers, createSellerUser, updateSellerUser, deleteSellerUser } = require('../controllers/sellerUserController')


router.get('/sellerUsers', getSellerUsers);
router.post('/createSellerUser', createSellerUser);
router.put('/updateSellerUser/:id', updateSellerUser);
router.delete('/deleteSellerUser/:id', deleteSellerUser);

module.exports = router;
