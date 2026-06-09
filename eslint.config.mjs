import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Ignore build output, vendor bundles and legacy non-source assets.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "next-env.d.ts",
    "public/**",
    "Admin/assets/**",
    "Admin/public/**",
    "Admin/views/**",
    "**/*.min.js",
  ]),
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // Fetch-on-mount with setLoading(true) is a legitimate, intentional
      // pattern used throughout the app — keep as a warning, not an error.
      "react-hooks/set-state-in-effect": "warn",
      // Allow intentionally-unused identifiers prefixed with underscore.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // Plain Node CommonJS scripts may use require().
    files: ["scripts/**/*.js", "**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

export default eslintConfig;
