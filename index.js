const express = require("express");
const { exec } = require("child_process");

const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./src/routes/userRoute");
const userServerRoute = require("./src/routes/userServerRoute");

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => {
    console.log(e.connections[0].client.s.url);
    console.log("Connected!");
  })
  .catch((e) => console.log(e));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/user", userRoute);
try {
  app.use("/server", userServerRoute);
} catch (err) {
  console.log(err);
}

app.get("/", (req, res) => {
  res.render("Home");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Visit http://127.0.0.1:${port}`);
});
