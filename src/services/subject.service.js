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

class SubjectService {
  static async addSubjects({data , class_id, auth}) {
    // create all subjects
    const {schoolId} = auth
    const map = {
      e: 'elective',
      c: 'compulsory'
    }
    for(let item of data){
      item = {
        ...item,
        school_id: schoolId,
      }
      const subject = await genericRepo.setOptions('Subject', {
        data: item
      }).create()

      const subjectClass = await genericRepo.setOptions('SubjectClass', {
        data: {
          class_id,
          subject_id: subject.id,
          type: map[item.type]
        }
      }).create()
      console.log(subject, subjectClass)
    }
    return {message: 'Subject and Class Linked'}
  }
  static async getSubjects({class_id, parent_id, auth}){
    const subjects = await genericRepo.setOptions('Class', {
      selectOptions: ['id','name'],
      condition: {
        id: class_id,
        // ...(parent_id && {p_id: parent_id}),
        school_id: auth.schoolId
      },
      inclussions: [
        {
          model: db.Subject,
          attributes: ['id','name']
        },
        {
          model: db.Class,
          ...(!parent_id ? {as: "Children"} : {as: "Parent"}),
          attributes:['id','name'],
          include: [
            {
              model: db.Subject,
              attributes: ['id','name']
            }
          ]
        },
      ]
    }).findAll()
    return subjects
  }
}

module.exports = SubjectService;
