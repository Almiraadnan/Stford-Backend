const UserController = require("../Controller/User.Controller");
const express = require("express");
const UserRoute = express.Router();

UserRoute.get("/", UserController.ShowWorking);
UserRoute.post("/register", UserController.createUser);
UserRoute.post("/login", UserController.loginUser);
UserRoute.post("/me", UserController.getProfile);
UserRoute.get("/logout", UserController.Logout);

module.exports = UserRoute;
