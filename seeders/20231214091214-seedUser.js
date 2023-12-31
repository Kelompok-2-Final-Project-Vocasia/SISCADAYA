'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     // Mengenkripsi password "12345678" dengan bcrypt menggunakan cost factor 10.
    const hashedPassword = await bcrypt.hash("12345678", 10);
    // Menambahkan satu record baru ke dalam tabel "Users"
    await queryInterface.bulkInsert(
      "Users", [
        {
          username: "laroi",
          nama: "laroi sukarjo",
          email: "laroi@gmail.com",
          password: hashedPassword,
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    {});
  },

  async down (queryInterface, Sequelize) {
    // Menghapus semua data dari tabel "Users"
    await queryInterface.bulkDelete("Users", null, {})
  }
};
