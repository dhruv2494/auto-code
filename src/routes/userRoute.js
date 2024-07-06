const express = require("express");
const {
    registerUser
  } = require("../controller/userControler");

  const userRoute = express.Router();



  module.exports = userRoute;