const { spawn } = require("child_process");
const fs = require("fs");
const log = fs.createWriteStream("vite-debug.log");

const vite = spawn("npx.cmd", ["vite", "--port", "5175"], {
  cwd: process.cwd(),
  shell: true,
});

vite.stdout.pipe(log);
vite.stderr.pipe(log);

vite.on("close", (code) => {
  log.write(`\nProcess exited with code ${code}`);
});
