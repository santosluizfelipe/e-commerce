const { SellerUser } = require("../models");


const getSellerUsersRepo = async () => {
  try {
    const sellerUsers = await SellerUser.findAll({
      attributes: ["id", "firstName", "lastName", "email", "password"],
    });
    return sellerUsers;
  } catch (error) {
    console.log(error);
  }
};

const getSellerUserRepo = async (userId) => {
  try {
    const findSellerUser = await SellerUser.findAll({
      where: {
        id: userId,
      },
    });
    return findSellerUser;
  } catch (error) {
    console.log(error);
  }
};

const createSellerUserRepo = async (userData) => {
  try {
    const newSellerUser = await SellerUser.create(userData);
    return newSellerUser;
  } catch (error) {
    console.error("############Error creating seller user:", error);
    throw error;
  }
};

const updateSellerUserRepo = async (userId, userData) => {
  try {
    const userToUpdate = await SellerUser.findByPk(userId);
    if (!userToUpdate) {
      throw new Error("Seller user not found");
    }
    await userToUpdate.update(userData);
    return userToUpdate;
  } catch (error) {
    console.error("Error updating seller user:", error);
    throw error;
  }
};

const deleteSellerUserRepo = async (userId) => {
  try {
    const userToDelete = await SellerUser.findByPk(userId);
    if (!userToDelete) {
      throw new Error("Seller user not found");
    }
    await userToDelete.destroy();
  } catch (error) {
    console.error("Error deleting seller user:", error);
    throw error;
  }
};


module.exports = {
  getSellerUsersRepo,
  getSellerUserRepo,
  createSellerUserRepo,
  updateSellerUserRepo,
  deleteSellerUserRepo
};
