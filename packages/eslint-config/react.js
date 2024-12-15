const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    // node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
    "import",
    "react-refresh",
  ],
  ignorePatterns: ["dist", "vite-env.d.ts"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [{ pattern: "@/**", group: "internal" }],
      },
    ],
    "react/react-in-jsx-scope": "off",
    "spaced-comment": "error",
    quotes: ["warn", "single"],
    "no-duplicate-imports": "error",
    "react/display-name": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
  settings: {
    typescript: {},
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
};
