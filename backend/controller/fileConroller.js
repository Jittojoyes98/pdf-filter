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

    const latestDocument = user.pdf.sort(
      (a, b) => b.createdAt - a.createdAt
    )[0];
    res.json(latestDocument);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { fetchCurrentFile };
