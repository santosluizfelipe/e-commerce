const express = require("express");
const router = express.Router();

const {getUsers, createUser, updateUser, deleteUser} = require('../controllers/userController')


router.get('/seller-users', getUsers);
router.post('/create-seller-user', createUser);
router.put('/update-seller-user', updateUser);
router.delete('/delete-seller-user', deleteUser);

module.exports = router;