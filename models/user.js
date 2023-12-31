'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mengaitkan User dengan model Comment dan Cagarbudaya
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        as: "comments"
      });
      User.hasMany(models.Cagarbudaya, {
        foreignKey: "userId",
        as: "cagarbudayas"
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Email tidak valid",
        },
      },
    },
    password:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: "User",
  });
  User.beforeCreate(async (user, options) => {
    // Mengubah Password menjadi nilai hash / Hashing Password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });
  return User;
};