/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");

module.exports = merge(baseConfig, {
  devServer: {
    historyApiFallback: true,
    port: 8080,
  },
  devtool: "source-map",
  mode: "development",
});
