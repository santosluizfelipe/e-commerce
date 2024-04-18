const { BuyerUser } = require("../models");

const getBuyerUsersRepo = async () => {
  try {
    const buyerUsers = await BuyerUser.findAll({
      attributes: ["id", "firstName", "lastName", "email", "password"],
    });
    return buyerUsers;
  } catch (error) {
    console.log(error);
  }
};

const getBuyerUserRepo = async (userId) => {
  try {
    const findBuyerUser = await BuyerUser.findAll({
      where: {
        id: userId,
      },
    });
    return findBuyerUser;
  } catch (error) {
    console.log(error);
  }
};

const createBuyerUserRepo = async (userData) => {
  try {
    const newBuyerUser = await BuyerUser.create(userData);
    return newBuyerUser;
  } catch (error) {
    console.error("############Error creating buyer user:", error);
    throw error;
  }
};

const updateBuyerUserRepo = async (userId, userData) => {
  try {
    const userToUpdate = await BuyerUser.findByPk(userId);
    if (!userToUpdate) {
      throw new Error("Buyer user not found");
    }
    await userToUpdate.update(userData);
    return userToUpdate;
  } catch (error) {
    console.error("Error updating seller user:", error);
    throw error;
  }
};

const deleteBuyerUserRepo = async (userId) => {
  try {
    const userToDelete = await BuyerUser.findByPk(userId);
    if (!userToDelete) {
      throw new Error("Buyer user not found");
    }
    await userToDelete.destroy();
  } catch (error) {
    console.error("Error deleting seller user:", error);
    throw error;
  }
};


module.exports = {
  getBuyerUsersRepo,
  getBuyerUserRepo,
  createBuyerUserRepo,
  updateBuyerUserRepo,
  deleteBuyerUserRepo
};