const express = require("express");
const UserController = require("../controller/admin.controller");
const { verify } = require("../middleware/verifyToken");
const { validateReq } = require("../middleware/validate");
const {
  login,
  signUp,
  schoolRegistration,
  verification,
  studentLogin,
} = require("../validations/auth.validations");
const AuthenticationController = require("../controller/authentication.controller");
const router = express.Router();

router.post(
  "/sign-in",
  validateReq(login),
  new AuthenticationController().login
);

router.post(
  "/admin-login",
  validateReq(login),
  new AuthenticationController().adminLogin
);

router.post(
  "/student-login",
  validateReq(studentLogin),
  new AuthenticationController().studentLogin
);

router.post(
  "/register-school",
  validateReq(schoolRegistration),
  new AuthenticationController().createSchool
);
router.post(
  "/user-verification",
  validateReq(verification),
  new AuthenticationController().verifyUserEmail
);
router.put("/choose-role", new AuthenticationController().chooseRole);
router.put(
  "/approval/upload-docs",
  new AuthenticationController().docsApproval
);

module.exports = router;
