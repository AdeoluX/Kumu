"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeacherClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Subject.belongsTo(models.School, {
      //   foreignKey: "school_id",
      // });
    }
  }
  TeacherClass.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      class_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      teacher_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      // type: DataTypes.ENUM(["compulsory", "elective"]),
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "TeacherClass",
      tableName: "teacherClasses",
    }
  );
  return TeacherClass;
};
