'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const kategoriIdBenda = await queryInterface.rawSelect('Kategoris', {
      where:{nama:'benda'},
    }, ['id']);

    const kategoriIdBangunan = await queryInterface.rawSelect('Kategoris', {
      where:{nama:'bangunan'},
    }, ['id']);

    const kategoriIdStruktur = await queryInterface.rawSelect('Kategoris', {
      where:{nama:'struktur'},
    }, ['id']);

    const kategoriIdSitus = await queryInterface.rawSelect('Kategoris', {
      where:{nama:'situs'},
    }, ['id']);

    const kategoriIdKawasan = await queryInterface.rawSelect('Kategoris', {
      where:{nama:'kawasan'},
    }, ['id']);

    await queryInterface.bulkInsert('Cagarbudayas', [
      {
        nama: 'Cagar budaya 1',
        deskripsi: 'Deskripsi cagar budaya 1',
        alamat: 'Jl. Cagar Budaya 1',
        kabupaten: 'Kabupaten 1',
        provinsi: 'Provinsi 1',
        foto:'../uploads/download.jpg',
        kategoriId: kategoriIdBenda,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cagarbudayas', null, {})
  }
};
