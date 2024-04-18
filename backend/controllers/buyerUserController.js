const {
  getBuyerUsersRepo,
  getBuyerUserRepo,
  createBuyerUserRepo,
  updateBuyerUserRepo,
  deleteBuyerUserRepo
} = require("../repositories/buyerUserRepo");


const getBuyerUsers = async (req, res) => {
  try {
    const users = await getBuyerUsersRepo();
    res.status(200).send(users);
  } catch(error) {
    res.status(500).send(error);
  }
}

const getBuyerUserById = async (req, res) => {
  
  try {
    const { id } = req.params;
    const user = await getBuyerUserRepo(id);
    res.status(200).send(user)
  } catch(error) {
    res.status(500).send(error);
  }
}

const createBuyerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = await createBuyerUserRepo({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating buyer user:", error);
    res.status(500).send(error);
  }
};

const updateBuyerUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    // Call the repository function to update the user
    const updatedUser = await updateBuyerUserRepo(id, {
      firstName,
      lastName,
      email,
      password,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating seller user:", error);
    res.status(500).send("Error updating seller user");
  }
};

const deleteBuyerUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Call the repository function to delete the user
    await deleteBuyerUserRepo(id);

    // Send a success response
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting seller user:", error);
    res.status(500).send("Error deleting seller user");
  }
};

module.exports = {
  getBuyerUsers,
  createBuyerUser,
  updateBuyerUser,
  deleteBuyerUser,
  getBuyerUserById
}