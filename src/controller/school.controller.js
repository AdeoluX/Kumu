const catchAsync = require("../utils/catchAsync");
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");
const SchoolService = require("../services/school.service");

class SchoolController {
  static register = catchAsync(async (req, res, next) => {
    const { school, admin } = req.body;
    const create = await SchoolService.register({ school, admin });
    return successResponse(res, create);
  });
  static allSchools = catchAsync(async (req, res, next) => {
    const { search } = req.query;
    const find = await SchoolService.allSchools({ search });
    return successResponse(res, find);
  });
}

module.exports = SchoolController;
