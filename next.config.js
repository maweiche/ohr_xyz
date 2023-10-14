// next.config.js

const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Resolve fallbacks
    config.resolve.fallback = {
      fs: false, // fs is a Node.js module, using false will tell webpack to return an empty module
      assert: require.resolve("assert"),
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
    };

    // Add plugins
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
      new webpack.IgnorePlugin({ resourceRegExp: /^react-native-fs$/ })
    );

    // Return the modified config
    return config;
  },
};
