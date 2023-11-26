const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { progressMiddleware } = require('../middleware/progressMiddleware')
const {
  allPdf,
  registerUser,
  loginUser,
  uploadPdf,
} = require('../controller/userController')
const upload = require('../middleware/fileuploadMiddleware')
const { fetchCurrentFile, createFile } = require('../controller/fileConroller')

router.route('/').post(registerUser).get(protect, allPdf)
router.route('/login').post(loginUser)
router
  .route('/upload')
  .post(protect, progressMiddleware, upload.single('file'), uploadPdf)
router.route('/recentfile').get(protect, fetchCurrentFile)
router.route('/createfile').post(protect, createFile)

module.exports = router
