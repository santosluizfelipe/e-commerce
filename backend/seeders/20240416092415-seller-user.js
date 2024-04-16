'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("SellerUser", [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        password: "password123"
      },
      {
        id: 2,
        firstName: "Nick",
        lastName: "Smith",
        email: "nicksmith@example.com",
        password: "password123"
      },
      {
        id: 3,
        firstName: "Bruce",
        lastName: "Wayne",
        email: "iambatman@example.com",
        password: "password123"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("SellerUser", null, {});
  }
};
