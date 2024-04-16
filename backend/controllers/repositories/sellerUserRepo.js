const db = require('../models/index');


const getSellerUsersRepo = async()=>{
    try {
        const sellerUsers = await db.User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'password']
        })
        return sellerUsers
    } catch (error) {
        console.log(error)
    }
}

const getSellerUserRepo = async(userId)=>{
    try {
        const sellerUser = await db.User.findAll({
            where:{
                id : userId
            }
        })
        return sellerUser
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getSellerUsersRepo, getSellerUserRepo }