"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.belongsTo(models.School, {
        foreignKey: "school_id",
      });
      Class.hasMany(models.Class, {
        as: "Children",
        foreignKey: "p_id",
      });
      Class.belongsTo(models.Class, {
        as: "Parent",
        foreignKey: "p_id",
      });
      Class.belongsToMany(models.Subject, {
        through: models.SubjectClass,
        foreignKey: "class_id",
      });
      Class.belongsToMany(models.Teacher, {
        through: models.TeacherClass,
        foreignKey: "class_id",
      });
      Class.hasMany(models.StudentClassTerm, {
        foreignKey: "class_id",
      });
    }
  }
  Class.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      p_id: DataTypes.UUID,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      school_id: DataTypes.UUID,
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "Class",
      tableName: "classes",
    }
  );
  return Class;
};
