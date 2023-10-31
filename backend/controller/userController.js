//  create all the login , registration and all pdf of current user route here
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const { genarateToken } = require("../config/helper");

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
    res.status(400);
    throw new Error("Cannot create User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    res.send("Please provide the email or password");
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
    throw new Error("Cannot create User");
  }
});

const allPdf = asyncHandler(async (req, res) => {
  // const { userId } = req.body;
  console.log(req.user);
  const result = await User.findById(req.user).select("pdf");
  res.status(200).send(result);
});

module.exports = { loginUser, registerUser, allPdf };
