'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cagarbudayas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true
        },
      },
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true
        },
      },
      alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true
        },
      },
      kabupaten: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true
        },
      },
      provinsi: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true
        },
      },
      foto: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true
        },
      },
      kategoriId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
          model: "Kategoris",
          key: "id",
      }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cagarbudayas");
  }
};