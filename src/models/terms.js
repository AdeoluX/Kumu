"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Term extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Term.belongsTo(models.Session, {
        foreignKey: "session_id",
      });
      Term.hasMany(models.StudentClassTerm, {
        foreignKey: "term_id",
      });
    }
  }
  Term.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      session_id: DataTypes.UUID,
      term: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "Term",
      tableName: "terms",
    }
  );
  return Term;
};
