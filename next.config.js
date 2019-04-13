const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    serverAddr: process.env.SERVER_ADDR
  }
};
