const express = require("express");
const AdminController = require("../controller/admin.controller");
const { verify, formatSheet } = require("../middleware/verifyToken");
const router = express.Router();

router.get(
  "/onboard-school",
  verify(["SUPER_ADMIN", "TENANT_ADMIN"]),
  AdminController.onboardSchool
);

router.post(
  "/create-class",
  verify(["SUPER_ADMIN", "TENANT_ADMIN"]),
  formatSheet,
  AdminController.addClasses
);

router.post(
  "/create-subject",
  verify(["SUPER_ADMIN", "TENANT_ADMIN"]),
  formatSheet,
  AdminController.addSubjects
);

router.post(
  "/create-user/:role",
  verify(["SUPER_ADMIN", "TENANT_ADMIN"]),
  formatSheet,
  AdminController.addUser
);

module.exports = router;
