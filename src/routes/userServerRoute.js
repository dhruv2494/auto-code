const express = require("express");
const userServerRoute = express.Router();

userServerRoute.use("/hello", require("./../subServers/hello/index"));
module.exports = userServerRoute;
