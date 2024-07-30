const catchAsync = require("../utils/catchAsync");
const AuthenticationService = require("../services/authentication.service");
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");

class AuthenticationController {
  createSchool = catchAsync(async (req, res, next) => {
    const { user, school } = req.body;
    const login = await new AuthenticationService().createSchool({
      user,
      school,
    });
    return successResponse(res, login);
  });

  verifyUserEmail = catchAsync(async (req, res, next) => {
    const { code, otp } = req.body;
    const login = await new AuthenticationService().verify({ code, otp });
    return successResponse(res, login);
  });

  chooseRole = catchAsync(async (req, res, next) => {
    const { user, role } = req.body;
    const login = await new AuthenticationService().selectRole({ user, role });
    return successResponse(res, login);
  });

  docsApproval = catchAsync(async (req, res, next) => {
    const { user, school } = req.body;
    const login = await new AuthenticationService().docsApproval({
      user,
      school,
    });
    return successResponse(res, login);
  });

  signUp = catchAsync(async (req, res, next) => {
    const login = await new AuthenticationService().signUp(req.body);
    return successResponse(res, login);
  });

  login = catchAsync(async (req, res, next) => {
    const signUp = await new AuthenticationService().login(req.body);
    return successResponse(res, signUp);
  });

  adminLogin = catchAsync(async (req, res, next) => {
    const adminLogin = await new AuthenticationService().adminLogin(req.body);
    return successResponse(res, adminLogin);
  });

  studentLogin = catchAsync(async (req, res, next) => {
    const studentLogin = await new AuthenticationService().studentLogin(req.body);
    return successResponse(res, studentLogin);
  });
}

module.exports = AuthenticationController;
