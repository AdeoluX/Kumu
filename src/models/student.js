"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.School, {
        foreignKey: "school_id",
      });
      Student.belongsTo(models.Parent, {
        foreignKey: "parent_id",
      });
      Student.hasMany(models.StudentClassTerm, {
        foreignKey: "student_id",
      });
    }
  }
  Student.init(
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
      middlename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_no: DataTypes.STRING,
      parent_id: DataTypes.UUID,
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
      modelName: "Student",
      tableName: "students",
    }
  );
  return Student;
};
