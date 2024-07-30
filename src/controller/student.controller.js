const catchAsync = require("../utils/catchAsync");
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");
const StudentService = require("../services/student.service");

class StudentController {
  static registerStudent = catchAsync(async (req, res, next) => {
    const {class_id, term_id} = req.params
    const auth = res.locals.user
    const create = await StudentService.registerStudent({data: req.body, class_id, term_id, auth})
    return successResponse(res, create);
  });
}

module.exports = StudentController;
