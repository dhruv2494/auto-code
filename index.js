const express = require("express");
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

let serverInstance;

const startServer = () => {
  serverInstance = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`visit http://127.0.0.1:${port}`);
  });

  serverInstance.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use`);
      process.exit(1); // Exit the process if port is in use
    }
    // Handle other errors as needed
    console.error(err);
    process.exit(1);
  });
};

const restartServer = () => {
  // Close the existing server instance
  if (serverInstance) {
    serverInstance.close(() => {
      console.log("Server instance closed");
      // Start a new server instance
      startServer();
      res.send("Server restarting...");
    });
  } else {
    // No server instance to close, start a new one directly
    startServer();
    res.send("Server restarting...");
  }
};

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
app.use("/server", userServerRoute);

app.get("/", (req, res) => {
  res.render("Home");
});



startServer()

module.exports={app,serverInstance,restartServer}