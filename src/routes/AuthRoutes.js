const express = require('express');
const AuthController = require("../controllers/AuthController.js");
const router = express.Router();
const upload = require('../middlewares/upload.js');
const { authenticateToken } = require('../middlewares/authMiddleware.js');

router.post("/register", upload.single("profile_picture"), AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", authenticateToken, AuthController.logout);

module.exports = router;