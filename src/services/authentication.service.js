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
  hash,
  compare_passwords,
  generateOTP,
} = require("../utils/passwordHash");
const sendEmail = require("./email.service");
const {
  verificationEmail,
  signInEmail,
} = require("../templates/email.template");

class AuthenticationService {
  async login({ email, password }) {
    let users = await genericRepo
      .setOptions("User", {
        selectOptions: ["id", "password", "email", "firstname"],
        condition: { email },
        inclussions: [
          {
            model: db.TenantUserRole,
            include: [
              {
                model: db.Role,
              },
            ],
          },
        ],
      })
      .findOne();
    abortIf(!users, httpStatus.BAD_REQUEST, "Invalid Credentials");
    const check = await compare_passwords(password, users.password);
    abortIf(!check, httpStatus.BAD_REQUEST, "Invalid Credentials");
    let token;
    users = users.toJSON();
    let { TenantUserRoles, ...rest } = users;
    delete users.password;
    delete users.TenantUserRoles;
    if (TenantUserRoles.length === 1) {
      let { Role } = TenantUserRoles[0];
      Role = Role.dataValues;
      token = generateToken({
        ...users,
        role: Role,
        tenantId: TenantUserRoles[0].tenant_id,
      });
      await sendEmail({
        from: '"Kumu" <no-reply@kumu.com>',
        to: users.email,
        subject: "Login",
        html: signInEmail({
          firstname: users.firstname,
        }),
        replyTo: "no-reply@gmail.com",
      });
      return {
        users,
        token,
      };
    } else {
      const jsonData = TenantUserRoles.map((item) => item.Role.toJSON());
      return {
        ...users,
        roles: jsonData,
        tenantId: TenantUserRoles[0].tenant_id,
      };
    }
  }

  async adminLogin({ email, password }) {
    let users = await genericRepo
      .setOptions("Admin", {
        selectOptions: ["id", "password", "email", "firstname", "school_id"],
        condition: { email },
      })
      .findOne();
    abortIf(!users, httpStatus.BAD_REQUEST, "Invalid Credentials");
    const check = await compare_passwords(password, users.password);
    abortIf(!check, httpStatus.BAD_REQUEST, "Invalid Credentials");
    users = users.toJSON();
    delete users.password;
    const token = generateToken({
      user: users,
      schoolId: users.school_id,
    });
    return {
      ...users,
      token,
    };
  }

  async studentLogin({email, password, school}){
    // search for student with email and school
    let student = await genericRepo.setOptions('Student', {
      selectOptions: ['firstname', 'lastname', 'password', 'enable'],
      condition: {
        school_id: school,
        email
      }
    }).findOne()
    abortIf(!student, httpStatus.BAD_REQUEST, 'Invalid Credentials')
    abortIf(!student.enable, httpStatus.BAD_REQUEST, 'User is Inactive')
    const check = await compare_passwords(password, student.password);
    abortIf(!check, httpStatus.BAD_REQUEST, "Invalid Credentials");
    student = student.toJSON();
    delete student.password;
    const token = generateToken({
      student: student,
      schoolId: school,
    });
    return {
      ...student,
      token,
    };
  }

  async parentSignUp({email, firstname, lastname, password, school}){
    // search for student with email and school
    let student = await genericRepo.setOptions('Student', {
      selectOptions: ['firstname', 'lastname', 'password', 'enable'],
      condition: {
        school_id: school,
        email
      }
    }).findOne()
    abortIf(!student, httpStatus.BAD_REQUEST, 'Invalid Credentials')
    abortIf(!student.enable, httpStatus.BAD_REQUEST, 'User is Inactive')
    const check = await compare_passwords(password, student.password);
    abortIf(!check, httpStatus.BAD_REQUEST, "Invalid Credentials");
    student = student.toJSON();
    delete student.password;
    const token = generateToken({
      student: student,
      schoolId: school,
    });
    return {
      ...student,
      token,
    };
  }

  async selectRole({ user, role, tenantId }) {
    const token = generateToken({ ...user, role, tenantId });
    await sendEmail({
      from: '"Kumu" <no-reply@kumu.com>',
      to: user.email,
      subject: "Login",
      html: signInEmail({
        firstname: user.firstname,
      }),
      replyTo: "no-reply@gmail.com",
    });
    return {
      users: user,
      token,
    };
  }

  async createSchool({ user, school }) {
    const t = await db.sequelize.transaction();
    try {
      const { name } = school;
      let {
        confirmPassword,
        password,
        firstname,
        lastname,
        email,
        phone,
        status = "unverified",
      } = user;
      abortIf(
        confirmPassword !== password,
        httpStatus.BAD_REQUEST,
        "Passwords must match"
      );
      password = await hash(password);
      // create Tenant
      const tenant = await genericRepo
        .setOptions("Tenant", {
          data: {
            name,
          },
          transaction: t,
        })
        .create();
      //create User
      let user_ = await genericRepo
        .setOptions("User", {
          data: {
            firstname,
            lastname,
            email,
            phone,
            password,
            status,
          },
          transaction: t,
        })
        .create();
      //Set Tenant User Role
      const tenantUserRole = await genericRepo
        .setOptions("TenantUserRole", {
          data: {
            role_id: "f32dcf16-ba6b-43ec-a5b5-f056836f39d7",
            user_id: user_.id,
            tenant_id: tenant.id,
          },
          transaction: t,
        })
        .create();
      const otp = generateOTP({ number: 4, stringify: true });
      const link = uuidv4();
      await genericRepo
        .setOptions("Otp", {
          data: {
            id: link,
            user_id: user_.id,
            otp,
          },
          transaction: t,
        })
        .create();
      const Role = await genericRepo
        .setOptions("Role", {
          condition: {
            id: "f32dcf16-ba6b-43ec-a5b5-f056836f39d7",
          },
        })
        .findOne();
      user_ = user_.toJSON();
      delete user_.password;
      const token = generateToken({
        ...user_,
        role: Role,
        tenantId: tenant.id,
      });
      //send email to School
      await sendEmail({
        from: '"Kumu" <no-reply@kumu.com>',
        to: user_.email,
        subject: "Email Verification",
        html: verificationEmail({
          name: user_.firstname,
          verificationCode: otp,
          link,
        }),
      });
      await t.commit();
      return { ...user_, token };
    } catch (error) {
      await t.rollback();
      abortIf(error, httpStatus.BAD_REQUEST, error.message);
    }
  }

  async docsApproval({ user, school }) {
    return { ...user };
  }

  async verify({ code, otp }) {
    const findOtp = await genericRepo
      .setOptions("Otp", {
        condition: {
          id: code,
          otp,
        },
        selectOptions: ["user_id"],
      })
      .findOne();
    abortIf(!findOtp, httpStatus.BAD_REQUEST, "Invalid verification process");
    const findUser = await genericRepo
      .setOptions("User", {
        condition: {
          id: findOtp.user_id,
        },
        changes: {
          status: "verified",
        },
      })
      .update();
    return;
  }
}

module.exports = AuthenticationService;
