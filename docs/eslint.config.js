import baseConfig from "@fluxly/eslint/base";
import nextjsConfig from "@fluxly/eslint/nextjs";
import reactConfig from "@fluxly/eslint/react";

export default [
    {
        ignores: [".next/**", "tsconfig.tsbuildinfo", ".source/**"],
    },
    ...baseConfig,
    ...reactConfig,
    ...nextjsConfig,
];