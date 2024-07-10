const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

let serverInstance;
const startServer = () => {
  serverInstance = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Visit http://127.0.0.1:${port}`);
  });

  serverInstance.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use`);
      process.exit(1);
    }
    console.error(err);
    process.exit(1);
  });
};

const restartServer = async () => {
  return new Promise((resolve, reject) => {
    if (serverInstance) {
      serverInstance.close(() => {
        console.log("Server instance closed");
        startServer();
        resolve();
      });
    } else {
      startServer();
      resolve();
    }
  });
};

module.exports = { app, startServer, restartServer };
