const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "job-board.js",
    path: path.resolve(__dirname, "dist")
  }
};
