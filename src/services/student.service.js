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
const { invitationEmail, studentProfile } = require("../templates/email.template");

class StudentService {
  static async registerStudent({data , class_id, term_id, auth}) {
    try{
      const {schoolId} = auth
      const school = await genericRepo.setOptions('School', {
        condition: {id: schoolId}
      }).findOne()
      const term = await genericRepo.setOptions('Term', {
        condition: {id: term_id}
      }).findOne()
      const class_ = await genericRepo.setOptions('Class', {
        condition: {id: class_id}
      }).findOne()
      // register student
      for(let item of data){
        const defaultPassword = generate_random_password(8)
        item = {
          ...item,
          school_id: schoolId,
          password: await hash(defaultPassword)
        }
        const student = await genericRepo.setOptions('Student', {
          data: {...item}
        }).create()

        // await student.setTerms([term])
        // await student.setClasses([class_])

        await genericRepo.setOptions('StudentClassTerm', {
          data: {
            class_id,
            term_id,
            student_id: student.id
          }
        }).create()
        // await sendEmail({
        //   from: '"Kumu" <no-reply@kumu.com>',
        //   to: student.email,
        //   subject: "Login",
        //   html: studentProfile({
        //     name: student.firstname,
        //     defaultPassword,
        //     school: school.name
        //   }),
        //   replyTo: "no-reply@gmail.com",
        // })
      }
      return {message: 'Student Registered.'}
    }catch(error){
      console.log(error)
    }
    
  }

  static async getAllStudents({data , class_id, auth}) {
    
    return {message: 'Subject and Class Linked'}
  }
}

module.exports = StudentService;
