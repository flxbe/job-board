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
      files: ["**/*.test.js", "**/*.spec.js", "**/*.test.template.js"],
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
