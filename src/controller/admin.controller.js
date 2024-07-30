const catchAsync = require("../utils/catchAsync");
const AdminService = require("../services/admin.service");
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");

class AdminController {
  static onboardSchool = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const create = await AdminService.onboardSchool();
    return successResponse(res, create);
  });

  static getAdmins = catchAsync(async (req, res, next) => {
    const create = await AdminService.addClass({
      data: req.body,
      auth: res.locals.user,
      parent_id: req?.query?.parent_id,
    });
    return successResponse(res, create);
  });

  static getOneAdmin = catchAsync(async (req, res, next) => {
    const create = await AdminService.addSubject({
      data: req.body,
      auth: res.locals.user,
      class_id: req?.params?.class_id,
    });
    return successResponse(res, create);
  });

  static getAllClasses = catchAsync(async (req, res, next) => {
    const create = await AdminService.getAllClasses({
      school_id: res.locals.user.schoolId,
    });
    return successResponse(res, create);
  });

  static getOneClass = catchAsync(async (req, res, next) => {
    const create = await AdminService.addUser({
      data: req.body,
      auth: res.locals.user,
      role: req?.params?.role,
    });
    return successResponse(res, create);
  });

  static createClass = catchAsync(async (req, res, next) => {
    const create = await AdminService.createClass({
      data: req.body,
      auth: res.locals.user,
      parent_id: req?.query?.parent_id,
    });
    return successResponse(res, create);
  });

  static getAllStudents = catchAsync(async (req, res, next) => {
    const create = await AdminService.addUser({
      data: req.body,
      auth: res.locals.user,
      role: req?.params?.role,
    });
    return successResponse(res, create);
  });

  static getStudent = catchAsync(async (req, res, next) => {
    const create = await AdminService.addUser({
      data: req.body,
      auth: res.locals.user,
      role: req?.params?.role,
    });
    return successResponse(res, create);
  });

  static createSession = catchAsync(async (req, res, next) => {
    const create = await AdminService.createSession({
      data: req.body,
      auth: res.locals.user,
    });
    return successResponse(res, create);
  });

  static getSessions = catchAsync(async (req, res, next) => {
    const create = await AdminService.getAllSessions({
      auth: res.locals.user,
    });
    return successResponse(res, create);
  });

  static createTerm = catchAsync(async (req, res, next) => {
    const create = await AdminService.createTerm({
      data: req.body,
      auth: res.locals.user,
      session_id: req.params.session_id,
    });
    return successResponse(res, create);
  });

  static getTerms = catchAsync(async (req, res, next) => {
    const create = await AdminService.getTerms({
      data: req.body,
      auth: res.locals.user,
    });
    return successResponse(res, create);
  });

  static getOneTerm = catchAsync(async (req, res, next) => {
    const {term_id} = req.params
    const create = await AdminService.getOneTerm({
      term_id,
      auth: res.locals.user,
    });
    return successResponse(res, create);
  });

  static getSession = catchAsync(async (req, res, next) => {
    const create = await AdminService.getSession({
      data: req.params,
      auth: res.locals.user,
    });
    return successResponse(res, create);
  });
}

module.exports = AdminController;
