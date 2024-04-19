const {
  getProductsBySellerUserRepo,
  getProductBySellerUserAndIdRepo,
  createProductForSellerUserRepo,
  updateProductForSellerUserRepo,
  deleteProductForSellerUserRepo,
} = require("../repositories/productRepo");
// Controller method to get all products belonging to a specific seller user
async function getProductsBySellerUser(req, res) {
  try {
    const { sellerUserId } = req.params;
    const products = await getProductsBySellerUserRepo({ where: { sellerUserId } });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller method to get a specific product belonging to a specific seller user
async function getProductBySellerUserAndId(req, res) {
  try {
    const { sellerUserId, productId } = req.params;
    const product = await getProductBySellerUserAndIdRepo({
      where: { id: productId, sellerUserId },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller method to create a new product for a specific seller user
async function createProductForSellerUser(req, res) {
  try {
    const { sellerUserId } = req.params;
    const { name, price, description, photos } = req.body;
    const product = await createProductForSellerUserRepo({
      name,
      price,
      description,
      photos,
      sellerUserId,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller method to update a product belonging to a specific seller user
async function updateProductForSellerUser(req, res) {
  try {
    const { sellerUserId, productId } = req.params;
    const { name, price, description, photos } = req.body;
    const [updatedRows] = await updateProductForSellerUserRepo(
      { name, price, description, photos },
      { where: { id: productId, sellerUserId } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller method to delete a product belonging to a specific seller user
async function deleteProductForSellerUser(req, res) {
  try {
    const { sellerUserId, productId } = req.params;
    const deletedRows = await deleteProductForSellerUserRepo({
      where: { id: productId, sellerUserId },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getProductsBySellerUser,
  getProductBySellerUserAndId,
  createProductForSellerUser,
  updateProductForSellerUser,
  deleteProductForSellerUser,
};
