"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subject.belongsTo(models.School, {
        foreignKey: "school_id",
      });
      Subject.belongsToMany(models.Class, {
        through: models.SubjectClass,
        foreignKey: "subject_id",
      });
      Subject.belongsToMany(models.Teacher, {
        through: models.TeacherSubject,
        foreignKey: "subject_id",
      });
    }
  }
  Subject.init(
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
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "Subject",
      tableName: "subjects",
    }
  );
  return Subject;
};
