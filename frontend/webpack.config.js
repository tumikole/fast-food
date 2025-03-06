module.exports = {
    // other configurations...
    devtool: false, // Disable source maps
    infrastructureLogging: {
      level: 'warn', // Adjust log level to avoid the warning
    },
    ignoreWarnings: [/jsx-a11y\/anchor-is-valid/],

    // More config options...
  };
  