module.exports = {
    // other configurations...
    devtool: false, // Disable source maps
    infrastructureLogging: {
      level: 'warn', // Adjust log level to avoid the warning
    },
    ignoreWarnings: [/jsx-a11y\/anchor-is-valid/],
    resolve: {
      fallback: {
        buffer: require.resolve('buffer/'),
        crypto: require.resolve('crypto-browserify')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: "pre",
          loader: "source-map-loader",
          exclude: [/node_modules\/boxicons/], // Ignore boxicons source maps
        },
      ],
    },
    // More config options...
  };
  