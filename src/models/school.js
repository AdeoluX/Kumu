"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      School.hasMany(models.Admin, {
        foreignKey: "school_id",
      });
      School.hasMany(models.Parent, {
        foreignKey: "id",
      });
      School.hasMany(models.Student, {
        foreignKey: "school_id",
      });
      School.hasMany(models.Class, {
        foreignKey: "school_id",
      });
      School.hasMany(models.Session, {
        as: "Sessions",
        foreignKey: "school_id",
      });
    }
  }
  School.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: DataTypes.STRING(150),
      address: DataTypes.TEXT,
      phone: DataTypes.STRING(20),
      status: {
        type: DataTypes.ENUM(["verified", "unverified"]),
        defaultValue: "unverified",
      },
      enable: { type: DataTypes.BOOLEAN, defaultValue: false },
      locked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "School",
      tableName: "schools",
    }
  );
  return School;
};
