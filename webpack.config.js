"use strict";

const webpack = require("webpack");
const path = require("path");

module.exports = [{
  name: "host",
  context: __dirname,
  target: "node",
  node: {
    __dirname: false
  },
  entry: ["./src/host.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "host.js"
  },
  module: {
    rules: [{
      enforce: "pre",
      test: /\.js/,
      exclude: /node_modules/,
      use: [{
        loader: "eslint-loader"
      }]
    }, {
      test: /\.js/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    }]
  }
}, {
  name: "library",
  context: __dirname,
  entry: ["./src/app/App.jsx"],
  output: {
    path: path.join(__dirname, "dist/app"),
    filename: "app.min.js",
    library: "UserService",
    libraryTarget: "var"
  },
  externals: {
    "react": "React"
  },
  module: {
    rules: [{
      enforce: "pre",
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      use: [{
        loader: "eslint-loader"
      }]
    }, {
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    }]
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx"
    ]
  },
  plugins: [
    new webpack
    .optimize
    .UglifyJsPlugin({
      mangle: false
    })
  ]
}];
