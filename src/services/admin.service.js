const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { Op, Sequelize } = require("sequelize");
const db = require("../models");
const { generateToken } = require("../utils/tokenManagement");
const { abortIf } = require("../utils/responder");
const { v4: uuidv4 } = require("uuid");
// const { userDTO } = require("../DTOs/user.dto");
const genericRepo = require("../repository");
const {
  generateOTP,
  generate_random_password,
  hash,
} = require("../utils/passwordHash");
const sendEmail = require("./email.service");
const { invitationEmail } = require("../templates/email.template");

class AdminService {
  static async onboardSchool({ file, data }) {
    //create all classes
    // create all students
    // create all Teachers
    // create all subjects
    // create TeacherSubjects
    // create StudentSubject
  }

  static async getAdmins({ search, school_id }) {
    // create all subjects
    let condition = { school_id };
    if (search) {
      condition = {
        ...condition,
        [Op.or]: [
          { firstname: { [Op.iLike]: `${search}` } },
          { lastname: { [Op.iLike]: `${search}` } },
          { email: { [Op.iLike]: `${search}` } },
        ],
      };
    }
    const admins = await genericRepo
      .setOptions("Admin", {
        condition,
      })
      .findAll();
    return admins;
  }

  static async getOneAdmin({ id }) {
    //create all classes
    const t = await db.sequelize.transaction();
    try {
      const admin = await genericRepo
        .setOptions("Admin", {
          condition: { id },
        })
        .findOne();
      await t.commit();
      return admin;
    } catch (error) {
      await t.rollback();
      abortIf(error, httpStatus.BAD_REQUEST, error.message);
    }
  }

  static async getOneClass({ id }) {
    //create all classes
    const t = await db.sequelize.transaction();
    try {
      const admin = await genericRepo
        .setOptions("Class", {
          condition: { id },
        })
        .findOne();
      await t.commit();
      return admin;
    } catch (error) {
      await t.rollback();
      abortIf(error, httpStatus.BAD_REQUEST, error.message);
    }
  }

  static async createClass({ data, auth, parent_id }) {
    const t = await db.sequelize.transaction();
    try {
      const { schoolId } = auth;
      console.log(schoolId, "hhhh");
      const array = [];
      for (let item of data) {
        item.school_id = schoolId;
        if (parent_id) {
          item.p_id = parent_id;
        }
        array.push(item);
      }
      const classes = await genericRepo
        .setOptions("Class", {
          array,
          transaction: t,
        })
        .bulkCreate();
      await t.commit();
      return classes;
    } catch (error) {
      console.log(error)
      await t.rollback();
      abortIf(error, httpStatus.BAD_REQUEST, error.message);
    }
  }

  static async getAllStudents({ search, school_id }) {
    // create all subjects
    let condition = { school_id };
    if (search) {
      condition = {
        ...condition,
        [Op.or]: [
          { firstname: { [Op.iLike]: `${search}` } },
          { lastname: { [Op.iLike]: `${search}` } },
          { email: { [Op.iLike]: `${search}` } },
        ],
      };
    }
    const student = await genericRepo
      .setOptions("Student", {
        condition,
      })
      .findAll();
    return student;
  }

  static async getStudent({ id }) {
    //create all classes
    const t = await db.sequelize.transaction();
    try {
      const student = await genericRepo
        .setOptions("Student", {
          condition: { id },
        })
        .findOne();
      await t.commit();
      return student;
    } catch (error) {
      await t.rollback();
      abortIf(error, httpStatus.BAD_REQUEST, error.message);
    }
  }

  static async getAllClasses({ school_id }) {
    // create all Teachers
    const t = await db.sequelize.transaction();
    try {
      const student = await genericRepo
        .setOptions("Class", {
          condition: { school_id, p_id: null },
          inclussions: [
            {
              model: db.Class,
              as: "Children",
            },
          ],
        })
        .findAll();
      await t.commit();
      return student;
    } catch (error) {
      await t.rollback();
      abortIf(error, httpStatus.BAD_REQUEST, error.message);
    }
  }

  static async createSession({ data, auth }) {
    const { year } = data;
    const { schoolId } = auth;
    const session = await genericRepo
      .setOptions("Session", {
        data: { year, school_id: schoolId },
      })
      .create();
    return session;
  }

  static async createTerm({ data, auth, session_id }) {
    const { term } = data;
    const { schoolId } = auth;
    const session = await genericRepo
      .setOptions("Term", {
        data: { session_id, term },
      })
      .create();
    return session;
  }

  static async getTerms({ data, auth }) {
    const { year } = data;
    const { schoolId } = auth;
    const session = await genericRepo
      .setOptions("Session", {
        data: { year, school_id: schoolId },
      })
      .create();
    return session;
  }

  static async getSession({ data, auth }) {
    const { session_id } = data;
    const session = await genericRepo
      .setOptions("Session", {
        condition: { id: session_id },
        inclussions: [
          {
            model: db.Term,
            as: "Terms",
          },
        ],
      })
      .findOne();
    return session;
  }

  static async getAllSessions({auth}){
    const {schoolId} = auth
    const session = await genericRepo
      .setOptions("Session", {
        condition: { school_id: schoolId },
        inclussions: [
          {
            model: db.Term,
            as: "Terms",
          },
        ],
      })
      .findAll();
    return session;
  }

  static async getOneTerm({ term_id, auth, query }){
    const {schoolId} = auth
    const {class_id, student_id} = query
    const Term = await genericRepo.setOptions('Term', {
      condition: {
        id: term_id
      },
      selectOptions: ['term'],
      inclussions: [
            {
              model: db.Class,
              attributes: ['name'],
              include: [
                {
                  model: db.Student,
                  attributes: ['firstname', 'lastname', 'id_no']
                },
                {
                  model: db.Subject,
                  attributes: ['name']
                }
              ]
            },
            {
              model: db.Session,
              attributes: ['year']
            }
      ]
    }).findOne()
    return Term
  }
}

module.exports = AdminService;
