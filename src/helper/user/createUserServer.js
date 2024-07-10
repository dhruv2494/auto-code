const fs = require("fs");
const path = require("path");
const runCommandOnDirectory = require("../runCommandOnDirectory");
const { restartServer } = require("../../serverControl/serverControl");
const createUserServer = async (user) => {
  const directoryPath = path.join(
    __dirname,
    `./../../subServers/${user.username}`
  );
  // Ensure all parent directories exist
  await fs.mkdir(directoryPath, { recursive: true }, async (err) => {
    if (err) {
      console.error("Error creating directory:", err);
    } else {
      console.log("Directory created successfully:", directoryPath);
      const packageJson = {
        name: user.username,
        main: "index.js",
        dependencies: {
          "body-parser": "^1.20.2",
          cors: "^2.8.5",
          dotenv: "^16.4.5",
          ejs: "^3.1.10",
          express: "^4.19.2",
          "express-jwt": "^7.7.8",
          "express-validator": "^7.1.0",
          mongoose: "^8.4.4",
          nodemon: "^3.1.4",
        },
      };

      await fs.writeFile(
        path.join(directoryPath, "package.json"),
        JSON.stringify(packageJson, null, 2),
        async (err) => {
          if (err) {
            console.error("Error writing package.json:", err);
          } else {
            console.log("package.json created successfully");

            await runCommandOnDirectory("npm install", directoryPath)
              .then((e) => {
                console.log("npm install success");
                const indexJsContent = `
                const express = require('express');
                const bodyParser = require('body-parser');
                const cors = require('cors');
                require('dotenv').config();
    
                const app = express();
                const port = process.env.PORT || 3000;
    
                app.use(bodyParser.json());
                app.use(cors());
    
                // Example route
                app.get('/', (req, res) => {
                  res.send('Hello World');
                });
    
                module.exports=app;
              `;

                fs.writeFile(
                  path.join(directoryPath, "index.js"),
                  indexJsContent,
                  (err) => {
                    if (err) {
                      console.error("Error writing index.js:", err);
                    } else {
                      console.log("index.js created successfully");
                      console.log("User server setup complete.");
                    }
                  }
                );
                const userServerRoutePath = path.join(
                  path.join(__dirname, `./../../routes`),
                  "userServerRoute.js"
                );

                fs.readFile(userServerRoutePath, "utf8", async (err, data) => {
                  const newText = `userServerRoute.use("/${user.username}", require("./../subServers/${user.username}/index"));`;

                  if (err) {
                    console.error(`Error reading file: ${err}`);
                    return;
                  }

                  // Split the content by lines
                  let lines = data.split("\n");

                  // Calculate the index of the second last line
                  const secondLastIndex = lines.length - 2;

                  // Insert the new text at the second last line
                  lines.splice(secondLastIndex, 0, newText);

                  // Join the lines back into a single string with newline characters
                  const updatedContent = lines.join("\n");

                  // Write the updated content back to the file
                  fs.writeFile(
                    userServerRoutePath,
                    updatedContent,
                    "utf8",
                    async (err) => {
                      if (err) {
                        console.error(`Error writing file: ${err}`);
                        return;
                      }
                      console.log(
                        `text successfully written to second last line of ${userServerRoutePath}`
                      );
                      try {
                        // await restartServer();
                        fs.appendFile(path.resolve(__dirname, '../../../restart.js'), 'restart\n', (err) => {
                          if (err) {
                            console.error("Error writing to restart.js:", err);
                          } else {
                            console.log("Successfully wrote to restart.js");
                          }
                        });
                        console.log("Server restarted");
                      } catch (err) {
                        console.error("Error restarting server:", err);
                      }
                    }
                  );
                });
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      );
    }
  });
};

module.exports = createUserServer;
