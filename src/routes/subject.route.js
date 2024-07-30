const express = require("express");
const SubjectController = require("../controller/subject.controller");
const { verify, formatSheet } = require("../middleware/verifyToken");
const router = express.Router();


router.post(
  "/create-subject/:class_id",
  verify(["Admin"]),
  formatSheet,
  SubjectController.addSubjects
)

router.get(
  "/get-subjects/:class_id",
  verify(["Admin"]),
  SubjectController.getSubjects
)



module.exports = router;
