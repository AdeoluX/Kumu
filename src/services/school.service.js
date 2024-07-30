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
const { condition } = require("sequelize");

class SchoolService {
  static async register({ school, admin }) {
    const t = await db.sequelize.transaction();
    try {
      const { name, email, address, phone } = school;
      const {
        firstname,
        lastname,
        password,
        confirmPassword,
        admin_email,
        admin_phone,
        admin_address,
      } = admin;
      abortIf(
        password !== confirmPassword,
        httpStatus.BAD_REQUEST,
        "Passwords don't match"
      );
      //register school
      const registerSchool = await genericRepo
        .setOptions("School", {
          data: {
            name,
            email,
            address,
            phone,
          },
          transaction: t,
        })
        .create();
      const admins = await genericRepo
        .setOptions("Admin", {
          data: {
            school_id: registerSchool.id,
            firstname,
            lastname,
            password: await hash(password),
            email: admin_email,
            phone: admin_phone,
            address: admin_address,
          },
          transaction: t,
        })
        .create();
      const token = generateToken({
        user: admins,
        schoolId: registerSchool.id,
      });
      await t.commit();
      return { school: registerSchool, admin: admins, token };
    } catch (error) {
      await t.rollback();
      abortIf(error, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  static async allSchools({ search }) {
    let condition = {};
    if (search) {
      condition = {
        ...condition,
        name: { [Op.iLike]: `%${search}%` },
      };
    }
    const schools = await genericRepo
      .setOptions("School", {
        condition,
      })
      .findAll();
    return schools;
  }
}

module.exports = SchoolService;
