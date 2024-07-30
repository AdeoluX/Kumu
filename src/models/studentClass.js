"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentClassTerm extends Model {
    static associate(models) {
      StudentClassTerm.belongsTo(models.Student, {
        foreignKey: "student_id",
      });
      StudentClassTerm.belongsTo(models.Term, {
        foreignKey: "term_id",
      });
      StudentClassTerm.belongsTo(models.Class, {
        foreignKey: "class_id",
      });
    }
  }
  
  StudentClassTerm.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      student_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      term_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      class_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "StudentClassTerm",
      tableName: "studentClassTerms",
    }
  );
  return StudentClassTerm;
};
