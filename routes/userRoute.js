const express = require("express");
const userControllers = require("../controllers/userController");
const router = express.Router();

router.post("/register", userControllers.register); // Route untuk registrasi user
router.post("/login", userControllers.login); // Route untuk login user

module.exports = router;