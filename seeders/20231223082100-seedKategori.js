'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kategoris', [
      {nama:'benda',
      createdAt: new Date(),
      updatedAt: new Date()},

      {nama:'bangunan',
      createdAt: new Date(),
      updatedAt: new Date()},

      {nama:'struktur',
      createdAt: new Date(),
      updatedAt: new Date()},

      {nama:'situs',
      createdAt: new Date(),
      updatedAt: new Date()},
      
      {nama:'kawasan',
      createdAt: new Date(),
      updatedAt: new Date()},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kategoris', null, {})
  }
};
