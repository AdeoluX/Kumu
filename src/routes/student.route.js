const express = require("express");
const StudentController = require("../controller/student.controller");
const { verify, formatSheet } = require("../middleware/verifyToken");
const router = express.Router();

router.post(
  "/register-student/:class_id/:term_id",
  verify(["Admin"]),
  formatSheet,
  StudentController.registerStudent
);



module.exports = router;
