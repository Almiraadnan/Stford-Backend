const emailvalidator = require("email-validator");
const UserModel = require("../Models/User.Model.js");
const sendToken = require("../Utils/Send.Token.js");
const { JWTSecret } = require("../Config/confg.js");
const jwt = require("jsonwebtoken")

const ShowWorking = (req, res) => {
  res.send("It is working Nicely so we can work eith this");
};

const createUser = async (req, res) => {
  const { name, email, password, phoneNo } = req.body;
  if (!email || !password || !phoneNo || !password) {
    return res
      .status(200)
      .json({ success: false, msg: "Please Fill All Fields" });
  }
  const emailExits = await UserModel.findOne({ email })
  if (emailExits) {
    res.status(200).json({ success: false, msg: "Email Already Exists" });
    return
  }
  const User = await UserModel.create({
    name,
    email,
    password,
    phoneNo,
  });
  sendToken(User, 201, res);

};

const loginUser = async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(200)
      .json({ success: false, msg: "Please Enter Email and Password" });
  }
  if (email === "ceorahiddin@gmail.com" && password === "ceoPasswordisCeo") {
    res.status(201).json({
      success: true,
      msg: "Admin Successfully",
      admin: true
    })
    return
  }
  if (emailvalidator.validate(email)) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(200).json({ success: false, msg: "Invalid Email and Password" });
      return
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      res.status(200).json({ success: false, msg: "Invalid Email and Password" });
      return
    }
    sendToken(user, 200, res);
  } else {
    res.status(200).json({ success: false, msg: "Invalid Email" });
    return
  }
};
const Logout = async (req, res, next) => {
  res.cookie("Token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    succes: true,
    msg: "Logout Succesfull",
  });
};

const getProfile = async (req, res) => {
  try {
    const token = req.body
    const tokenData = JSON.parse(token.token)
    var decoded = jwt.verify(tokenData, JWTSecret);
    const user = await UserModel.findOne({ _id: decoded.id })
    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    console.log(error.message);
    res.status(200).json({
      success: false,
      msg: error.message
    })
  }
}

module.exports = {
  createUser,
  loginUser,
  Logout,
  ShowWorking,
  getProfile
};
