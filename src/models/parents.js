"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Parent.hasMany(models.Student, {
        foreignKey: "parent_id",
      });
      Parent.belongsTo(models.School, {
        foreignKey: "school_id",
      });
    }
  }
  Parent.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      school_id: DataTypes.UUID,
      email: DataTypes .STRING(150),
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: DataTypes.TEXT,
      phone: DataTypes.STRING(20),
      enable: { type: DataTypes.BOOLEAN, defaultValue: false },
      locked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "Parent",
      tableName: "parents",
    }
  );
  return Parent;
};
