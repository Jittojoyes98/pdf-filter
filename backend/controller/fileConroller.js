const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const fetchCurrentFile = asyncHandler(async (req, res) => {
  try {
    // const pdf = await User.findOne({ _id: req.user._id });
  } catch (error) {}
});

module.exports = { fetchCurrentFile };
