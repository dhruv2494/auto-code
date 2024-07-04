const { exec } = require("child_process");

const runCommandOnDirectory = (command, path) => {
  console.log(command, path);

  return new Promise((resolve, reject) => {
    const childProcess = exec(command, { cwd: path }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running command: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(new Error(stderr));
        return;
      }
      console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });

    // Optional: Forward child process's stdout and stderr to current process
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
  });
};

module.exports = runCommandOnDirectory;
