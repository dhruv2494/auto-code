const express = require("express");
const userServerRoute = express.Router();

userServerRoute.use("/hello", require("./../subServers/hello/index"));
userServerRoute.use("/hello1", require("./../subServers/hello1/index"));
module.exports = userServerRoute;
