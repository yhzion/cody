const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "development", // mode 설정 추가
  entry: "./src/renderer/index.mjs",
  output: {
    filename: "renderer.bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".mjs", ".js"],
  },
};
