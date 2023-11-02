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

router.route("/").post(registerUser).get(protect, allPdf);
router.route("/login").post(loginUser);
router.route("/upload").post(protect, upload.single("file"), uploadPdf);

module.exports = router;
