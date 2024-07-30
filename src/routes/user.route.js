const express = require("express");
const UserController = require("../controller/admin.controller");
const { verify } = require("../middleware/verifyToken");
const router = express.Router();

// router.get("/get-all", verify(["ADMIN"]), new UserController().getAllUser);

module.exports = router;
