module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "@state": "./src/state",
          "@actions": "./src/actions"
        },
      },
    ],
  ],
};
