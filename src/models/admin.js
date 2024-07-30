"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.belongsTo(models.School, {
        foreignKey: "school_id",
      });
    }
  }
  Admin.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      school_id: DataTypes.UUID,
      email: DataTypes.STRING(150),
      address: DataTypes.TEXT,
      phone: DataTypes.STRING(20),
      enable: { type: DataTypes.BOOLEAN, defaultValue: false },
      locked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "Admin",
      tableName: "admins",
    }
  );
  return Admin;
};
