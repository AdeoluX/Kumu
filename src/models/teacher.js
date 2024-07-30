"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teacher.belongsTo(models.School, {
        foreignKey: "school_id",
      });
      Teacher.belongsToMany(models.Subject, {
        through: models.TeacherSubject,
        foreignKey: "teacher_id",
      });
      Teacher.belongsToMany(models.Class, {
        through: models.TeacherClass,
        foreignKey: "teacher_id",
      });
    }
  }
  Teacher.init(
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
      modelName: "Teacher",
      tableName: "teachers",
    }
  );
  return Teacher;
};
