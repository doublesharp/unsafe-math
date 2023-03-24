module.exports = {
  configureYulOptimizer: false,
  mocha: {
    grep: "@skip-on-coverage", // Find everything with this tag
    invert: true               // Run the grep's inverse set.
  },
  onServerReady: function (config) {
    process.env.IS_COVERAGE = true;
  },
  skipFiles: ["test/"]
};