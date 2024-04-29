const { Product } = require('../models');

const getProductsBySellerUserRepo = async (sellerUserId) => {
  try {
    const products = await Product.findAll({ where: { sellerUserId: sellerUserId } });
    return products;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};



const getProductBySellerUserAndIdRepo = async (sellerUserId, productId) => {
  try {
    const product = await Product.findOne({ where: { id: productId, sellerUserId } });
    return product;
  } catch (error) {
    console.error('Error fetching product', error)
    throw error;
  }
};


const createProductForSellerUserRepo = async (productData) => {
  try {
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

const updateProductForSellerUserRepo = async (productId, productData) => {
  try {
    const productToUpdate = await Product.findByPk(productId);
    if (!productToUpdate) {
      throw new Error('Product not found');
    }
    await productToUpdate.update(productData);
    return productToUpdate
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

const deleteProductForSellerUserRepo = async (producId) => {
  try {
    const productToDelete = await Product.findByPk(producId);
    if(!productToDelete) {
      throw new Error('Product not found');
    }
    await productToDelete.destroy();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

module.exports = {
  getProductsBySellerUserRepo,
  getProductBySellerUserAndIdRepo,
  createProductForSellerUserRepo,
  updateProductForSellerUserRepo,
  deleteProductForSellerUserRepo
};