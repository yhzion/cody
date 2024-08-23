const path = require("path");

module.exports = {
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
      {
        test: /\.wasm$/,
        type: "webassembly/async",
      },
    ],
  },
  resolve: {
    extensions: [".mjs", ".js"],
  },
  experiments: {
    asyncWebAssembly: true,
  },
};
