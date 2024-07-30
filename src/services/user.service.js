const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenManagement");
const { abortIf } = require("../utils/responder");
// const { userDTO } = require("../DTOs/user.dto");
const genericRepo = require("../repository");


class UserService {
  async createSchool({school, user}){
    const {} = school
    const {} = user
    // create Tenant
    //create User
    //Set Tenant User Role
    return users
  }
}


module.exports = UserService
