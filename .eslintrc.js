// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      files: ["*.slice.js"],
      // avoid state param assignment
      rules: {
        "no-param-reassign": ["error", { props: false }],
      },
    },
    {
      files: ["*.jsx"],
      rules: {
        "react/prop-types": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
};
