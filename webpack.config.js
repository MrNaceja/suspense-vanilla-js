const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "suspense.js",
    path: path.resolve(__dirname, "dist"),
    // library: "Suspense",
    // libraryTarget: "umd",
  },
  mode: "production",
};
