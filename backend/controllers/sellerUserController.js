const {
  getSellerUsersRepo,
  createSellerUserRepo,
  updateSellerUserRepo,
  deleteSellerUserRepo
} = require("../repositories/sellerUserRepo");

const getSellerUsers = async (req, res) => {
  try {
    const users = await getSellerUsersRepo();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createSellerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = await createSellerUserRepo({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating seller user:", error);
    res.status(500).send(error);
  }
};


const updateSellerUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    // Call the repository function to update the user
    const updatedUser = await updateSellerUserRepo(id, {
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

const deleteSellerUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Call the repository function to delete the user
    await deleteSellerUserRepo(id);

    // Send a success response
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting seller user:", error);
    res.status(500).send("Error deleting seller user");
  }
};

module.exports = {
  getSellerUsers,
  createSellerUser,
  updateSellerUser,
  deleteSellerUser,
};
