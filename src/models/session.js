"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Session.belongsTo(models.School, {
        foreignKey: "school_id",
      });
      Session.hasMany(models.Term, {
        as: "Terms",
        foreignKey: "session_id",
      });
    }
  }
  Session.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      school_id: DataTypes.UUID,
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "Session",
      tableName: "sessions",
    }
  );
  return Session;
};
