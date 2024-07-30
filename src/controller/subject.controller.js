const catchAsync = require("../utils/catchAsync");
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");
const SubjectService = require("../services/subject.service");

class SubjectController {
  static addSubjects = catchAsync(async (req, res, next) => {
    const {class_id} = req.params
    const auth = res.locals.user
    const create = await SubjectService.addSubjects({data: req.body, class_id, auth})
    return successResponse(res, create);
  });

  static getSubjects = catchAsync(async (req, res, next) => {
    const {class_id} = req.params
    const auth = res.locals.user
    const {parent_id} = req.query
    const create = await SubjectService.getSubjects({class_id, auth, parent_id})
    return successResponse(res, create);
  });
}

module.exports = SubjectController;
