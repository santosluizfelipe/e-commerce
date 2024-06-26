const express = require("express");
const router = express.Router();

const { getSellerUsers, getSellerUserById, createSellerUser, updateSellerUser, deleteSellerUser, checkSellerUserByEmail } = require('../controllers/sellerUserController')


router.get('/sellerUsers', getSellerUsers);
router.get('/sellerUsers/:id', getSellerUserById);

router.post('/createSellerUser', createSellerUser);
router.put('/updateSellerUser/:id', updateSellerUser);
router.delete('/deleteSellerUser/:id', deleteSellerUser);

router.get('/checkSellerUserByEmail', checkSellerUserByEmail);

module.exports = router;
