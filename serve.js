const { execSync } = require("child_process");
const os = require("os");

const port = process.env.PORT || 3131;

const lanIP = Object.values(os.networkInterfaces())
  .flat()
  .find((i) => i.family === "IPv4" && !i.internal)?.address;

console.log(`Serving "public" at http://localhost:${port}`);
if (lanIP) console.log(`                    http://${lanIP}:${port}`);

execSync("npx live-server public --port=" + port + " --host=0.0.0.0 --no-browser --quiet", {
  stdio: "inherit",
});
