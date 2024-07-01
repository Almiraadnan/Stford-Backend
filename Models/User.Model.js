const mongoose = require("mongoose");
var validator = require("email-validator");
validator.validate("test@email.com");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { JWTSecret } = require("../Config/confg");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String
  },
  phoneNo: {
    type: String
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, JWTSecret, {
    expiresIn: "5d",
  });
};

UserSchema.methods.comparePassword = async function (EnteredPassword) {
  return await bcrypt.compare(EnteredPassword, this.password);
};
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
