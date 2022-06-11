module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react-hooks"],
  "parserOptions": {
    "project": "tsconfig.json",
    "tsconfigRootDir": __dirname,
    "sourceType": "module"
  },
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@next/next/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "@typescript-eslint/no-empty-function": 0
  }
}
