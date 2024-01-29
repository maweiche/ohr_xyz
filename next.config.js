// next.config.js

const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
    domains: [
      "updg8.com",
      "dev.updg8.com",
      "shdw-drive.genesysgo.net",
      "updg8.storage.googleapis.com",
      "storage.googleapis.com",
    ],
  },
  env: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID:
      "992645609151-sd92v7e9v9cqquteccth22legc8rq47a.apps.googleusercontent.com",
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: "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",
    NEXTAUTH_SECRET: "mQ46qpFwfE1BHuqMC+qlm19qBAD9fVPgh28werwe3ASFlAfnKjM=",
  },
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

    // Exclude transpilation of Mapbox GL JS bundle
    // config.module.rules.push({
    //   test: /\.js$/,
    //   exclude: /node_modules\/mapbox-gl\//,
    //   use: {
    //     loader: "babel-loader",
    //     options: {
    //       // Your Babel options here
    //     },
    //   },
    // });

    // Return the modified config
    return config;
  },
};
