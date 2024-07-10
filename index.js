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
// const {
//   startServer,
//   restartServer,
//   app,
// } = require("./src/serverControl/serverControl");

// startServer();

app.use(bodyParser.json());
app.use(cors());

// let serverInstance;
// const startServer = () => {
//   serverInstance = app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log(`Visit http://127.0.0.1:${port}`);
//   });

//   serverInstance.on("error", (err) => {
//     if (err.code === "EADDRINUSE") {
//       console.error(`Port ${port} is already in use`);
//       process.exit(1); // Exit the process if port is in use
//     }
//     console.error(err);
//     process.exit(1);
//   });
// };

// const restartServer = async (req, res) => {
//   return new Promise((resolve, reject) => {
//     // Close the existing server instance
//     if (serverInstance) {
//       serverInstance.close(() => {
//         console.log("Server instance closed");
//         // Start a new server instance
//         startServer(); // This starts the server asynchronously
//         resolve(); // Resolve the promise after restarting
//       });
//     } else {
//       // No server instance to close, start a new one directly
//       startServer();
//       resolve(); // Resolve the promise after restarting
//     }
//   });
// };

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
// app.get("/restart", async (req, res) => {
//   res.send("Server restarted successfully");
//   res.end()
//   try {
//     await restartServer();
//     console.log("Server restarted");
//     // Optionally, you can send a response here if needed
//   } catch (err) {
//     console.error("Error restarting server:", err);
//     res.status(500).send("Error occurred while restarting server");
//   }
// });
app.get("/restart", (req, res) => {
  console.log("Received restart request");
  exec("node index.js --restart", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      res.status(500).send("Server restart failed");
      return;
    }
    console.log(`Restarting server: ${stdout}`);
    res.send("Server restarting...");
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Visit http://127.0.0.1:${port}`);
});
