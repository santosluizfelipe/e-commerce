const {
  createBasketRepo,
  // getBasketByIdRepo,
  getUserBasketsRepo,
  addProductToBasketRepo,
  updateBasketRepo,
  removeProductFromBasketRepo,
  deleteBasketRepo,
} = require("../repositories/basketRepo");

const createBasket = async (req, res) => {
  try {
    // Create a new basket using data from the request body
    const newBasket = await createBasketRepo({
      buyerUserId: req.body.buyerUserId,
      
    });
    res.status(201).json(newBasket);
  } catch (error) {
    console.error("Error creating basket:", error);
    res.status(500).send(error);
  }
};

const getUserBaskets = async (req, res) => {
  console.log("++++++++", req.params)
  try {
    const baskets = await getUserBasketsRepo(req.params.buyerUserId);
    res.status(200).send(baskets);
  } catch (error) {
    console.error("Error fetching user baskets:", error);
    res.status(500).send(error);
  }
};

const addProductToBasket = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBasket = await addProductToBasketRepo(
      id,
      req.body.productId,
      req.body.quantity
    );
    res.status(200).json(updatedBasket);
  } catch (error) {
    console.error("Error adding product to basket:", error);
    res.status(500).send(error);
  }
};

const updateBasket = async (req, res) => {
  try {
    const { id } = req.params;
    // Update the specified basket using data from the request body
    const updatedBasket = await updateBasketRepo(id, req.body);
    res.status(200).json(updatedBasket);
  } catch (error) {
    console.error("Error updating basket:", error);
    res.status(500).send(error);
  }
};

const removeProductFromBasket = async (req, res) => {
  try {
    const { id, productId } = req.params;
    // Remove product from the specified basket
    await removeProductFromBasketRepo(id, productId);
    res.status(204).send();
  } catch (error) {
    console.error("Error removing product from basket:", error);
    res.status(500).send(error);
  }
};

const deleteBasket = async (req, res) => {
  try {
    const { id } = req.params;
    // Delete the specified basket
    await deleteBasketRepo(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting basket:", error);
    res.status(500).send(error);
  }
};

module.exports = {
  createBasket,
  getUserBaskets,
  addProductToBasket,
  updateBasket,
  removeProductFromBasket,
  deleteBasket,
};
