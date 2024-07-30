const express = require("express");
const AdminController = require("../controller/admin.controller");
const { verify, formatSheet } = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", verify(["Admin"]), AdminController.getAdmins);

router.get("/class", verify(["Admin"]), AdminController.getAllClasses);

router.get("/students", verify(["Admin"]), AdminController.getAllStudents);

router.get("/session", verify(["Admin"]), AdminController.getSessions);

router.get("/:id", verify(["Admin"]), AdminController.getOneAdmin);

router.get("/classes/:id", verify(["Admin"]), AdminController.getOneClass);

router.post(
  "/class",
  verify(["Admin"]),
  formatSheet,
  AdminController.createClass
);

router.post("/session", verify(["Admin"]), AdminController.createSession);




router.post("/term/:session_id", verify(["Admin"]), AdminController.createTerm);

router.get("/term/get/:term_id", verify(["Admin"]), AdminController.getOneTerm);

router.get(
  "/session/get/:session_id",
  verify(["Admin"]),
  AdminController.getSession
);

router.get("/students/:id", verify(["Admin"]), AdminController.getStudent);

router.patch("/students/:id", verify(["Admin"]), AdminController.onboardSchool);

router.post("/students", verify(["Admin"]), AdminController.onboardSchool);

module.exports = router;
