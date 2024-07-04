const express = require("express");
const {
    registerUser
  } = require("../controller/userControler");

  const userRoute = express.Router();


  userRoute.post("/register",registerUser)

  module.exports = userRoute;