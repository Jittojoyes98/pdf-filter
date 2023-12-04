const User = require("../models/UserModel");

const getUserPdfs = async (userId) => {
  const result = await User.findById(userId).select("pdf");
  return result;
};

module.exports = { getUserPdfs };
