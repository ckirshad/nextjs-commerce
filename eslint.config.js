const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "*.config.js",
      "*.config.ts",
      "*.config.mjs",
      "jest.config.js",
      "jest.setup.js",
    ],
  },
];
