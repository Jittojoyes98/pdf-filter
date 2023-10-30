module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "eslint-config-prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};

// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:prettier/recommended",
//     "plugin:import/recommended",
//     "eslint-config-prettier",
//   ],
//   overrides: [],
//   parserOptions: {
//     ecmaVersion: "latest",
//     sourceType: "module",
//   },
//   plugins: ["react"],
//   rules: {
//     // 'no-console': 'on',
//     "linebreak-style": ["error", "unix"],
//     quotes: [
//       "warn",
//       "single",
//       {
//         allowTemplateLiterals: true,
//       },
//     ],
//     semi: [1, "always"],
//   },
// };
