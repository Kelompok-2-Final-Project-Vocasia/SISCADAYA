'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cagarbudaya extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mengaitkan Cagarbudaya dengan model Kategori, User, dan Comment
      Cagarbudaya.belongsTo(models.Kategori, {
        foreignKey: "kategoriId",
        as: "kategoris", 
      });
      
      Cagarbudaya.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user", 
      });
      Cagarbudaya.hasMany(models.Comment, {
        foreignKey: "cagarbudayaId",
        as: "comments",
      });

    }
  }
  Cagarbudaya.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    kabupaten: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    provinsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    kategoriId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: "Kategoris",
        key: "id",
    }
    },
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "Cagarbudaya",
  });
  return Cagarbudaya;
};