'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mengaitkan Comment dengan model Cagarbudaya dan User
      Comment.belongsTo(models.Cagarbudaya, {
        foreignKey: "cagarbudayaId",
        as: "cagarbudayas",
      });

      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user", 
      });
    }
  }
  Comment.init({
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cagarbudayaId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: "Cagarbudayas",
        key: "id",
    }
    },
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "Comment",
  });
  return Comment;
};