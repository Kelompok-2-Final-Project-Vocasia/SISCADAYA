'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mengaitkan Kategori dengan model Cagarbudaya
      Kategori.hasMany(models.Cagarbudaya, {
        foreignKey: "kategoriId",
        as: "cagarbudayas",
      });
    }
  }
  Kategori.init({
    nama : {
      type: DataTypes.ENUM('benda', 'bangunan', 'struktur', 'situs', 'kawasan'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Kategori",
  });
  return Kategori;
};