const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  allPdf,
  registerUser,
  loginUser,
} = require("../controller/userController");

router.route("/").post(registerUser).get(protect, allPdf);
router.route("/login").post(loginUser);

module.exports = { router };
