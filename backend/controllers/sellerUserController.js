const {getUsersRepo} = require('../repositories/userRepo')

const getUsers = async (req, res) => {
  try { 
    const users = await getUsersRepo();
      res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Error");
  }

};

const createSellerUser = (req, res) => {
  console.log("User Created");
};

const updateSellerUser = (req, res) => {
  console.log("User Updated");
};
const deleteSellerUser = (req, res) => {
  console.log("User Deleted");
};

module.exports = { getUsers, createSellerUser, updateSellerUser, deleteSellerUser };