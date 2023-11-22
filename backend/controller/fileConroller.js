const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

// @desc retrive the recently uploaded file
// @route GET api/user/recentfile
const fetchCurrentFile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).json({ messsage: "User not found" });
    }

    const latestDocument = user.pdf[user.pdf.length - 1];
    res.json(latestDocument);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { fetchCurrentFile };
