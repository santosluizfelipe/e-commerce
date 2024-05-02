const { Basket, Product } = require("../models").default;
const { sequelize } = require("../config/sequelize")


const createBasketRepo = async (basketData) => {
  try {
    const newBasket = await Basket.create(basketData);
    return newBasket;
  } catch (error) {
    console.error("Error creating basket:", error);
    throw error;
  }
};

const getUserBasketsRepo = async (userId) => {
  
  try {
    const userBaskets = await Basket.findAll({
      where: {
        buyerUserId: userId,
      },
    });
    return userBaskets;
  } catch (error) {
    console.error("Error fetching user baskets:", error);
    throw error;
  }
};


const addProductToBasketRepo = async (basketId, productId, quantity) => {
  try {
    const basket = await Basket.findByPk(basketId);
    if (!basket) {
      throw new Error("Basket not found");
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    
    // Add the product to the basket with the specified quantity
    await basket.addProduct(product, { through: { quantity: quantity } });
    
    // Return the updated basket
    return basket;
  } catch (error) {
    console.error("Error adding product to basket:", error);
    throw error;
  }
};


const updateBasketRepo = async (basketId, basketData) => {
  try {
    const basketToUpdate = await Basket.findByPk(basketId);
    if (!basketToUpdate) {
      throw new Error("Basket not found");
    }
    await basketToUpdate.update(basketData);
    return basketToUpdate;
  } catch (error) {
    console.error("Error updating basket:", error);
    throw error;
  }
};

const removeProductFromBasketRepo = async (basketId, productId) => {
  try {
    // Logic to remove product from basket (not provided in the original question)
    // You may need to handle the removal of the product association from the BasketProducts join table
  } catch (error) {
    console.error("Error removing product from basket:", error);
    throw error;
  }
};

const deleteBasketRepo = async (basketId) => {
  try {
    const basketToDelete = await Basket.findByPk(basketId);
    if (!basketToDelete) {
      throw new Error("Basket not found");
    }
    await basketToDelete.destroy();
  } catch (error) {
    console.error("Error deleting basket:", error);
    throw error;
  }
};

module.exports = {
  createBasketRepo,
  // getBasketByIdRepo,
  getUserBasketsRepo,
  addProductToBasketRepo,
  updateBasketRepo,
  removeProductFromBasketRepo,
  deleteBasketRepo
};
