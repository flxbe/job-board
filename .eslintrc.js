module.exports = {
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  },
  env: {
    es6: true,
    browser: true
  },
  extends: ["eslint:recommended", "prettier"],
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: {
        jest: true
      }
    },
    {
      files: ["babel.config.js", "webpack.config.js"],
      parserOptions: {
        sourceType: "script"
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
