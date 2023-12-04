//  create all the login , registration and all pdf of current user route here
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const { genarateToken } = require("../config/helper");

const { getUserPdfs } = require("../services/usersPdf");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter full details");
  }
  let createUser;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User exist");
  }
  createUser = await User.create({
    name,
    email,
    password,
  });
  if (createUser) {
    res.send({
      user_id: createUser._id,
      name,
      email,
      token: genarateToken(createUser.id),
    });
  } else {
    res.status(500);
    throw new Error("Cannot create User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    res.send("Please provide  email or password");
  }
  const userExist = await User.findOne({ email });
  const passwordCorrect = await userExist.matchPassword(password);
  if (userExist && passwordCorrect) {
    res.send({
      id: userExist._id,
      name: userExist.name,
      email,
      token: genarateToken(userExist._id),
    });
  } else {
    res.status(400);
    throw new Error("User with these credentials don't exist");
  }
});

/**
 * @description to get all the paths of the pdf uploaded.
 * @route POST  api/user/
 */

const allPdf = asyncHandler(async (req, res) => {
  const result = await getUserPdfs(req.user._id);
  res.status(200).send(result);
});

module.exports = { loginUser, registerUser, allPdf };
