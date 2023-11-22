const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  allPdf,
  registerUser,
  loginUser,
  uploadPdf,
} = require("../controller/userController");
const upload = require("../middleware/fileuploadMiddleware");
const { fetchCurrentFile, createFile } = require("../controller/fileConroller");

router.route("/").post(registerUser).get(protect, allPdf);
router.route("/login").post(loginUser);
router.route("/upload").post(protect, upload.single("file"), uploadPdf);
router.route("/recentfile").get(protect, fetchCurrentFile);
router.route("/createfile").post(protect, createFile);

module.exports = router;
