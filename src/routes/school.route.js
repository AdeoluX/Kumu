const express = require("express");
const { verify, formatSheet } = require("../middleware/verifyToken");
const SchoolController = require("../controller/school.controller");
const router = express.Router();

router.post("/register", SchoolController.register);

router.get("/all", SchoolController.allSchools);

module.exports = router;
