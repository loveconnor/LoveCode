import baseConfig from "@fluxly/eslint/base";
import reactConfig from "@fluxly/eslint/react";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
];