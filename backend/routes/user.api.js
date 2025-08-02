const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

// 회원가입
router.post("/register", userController.createUser);

module.exports = router;
