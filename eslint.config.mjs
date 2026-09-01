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
    "Admin/archive/**",
    "playwright-report/**",
    "axe-*",
    "visual-*",
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
      // Unescaped entities are acceptable in JSX text content
      "react/no-unescaped-entities": "warn",
      // React.random() in useMemo is safe and intentional
      "react-hooks/purity": "warn",
    },
  },
  {
    // Plain Node CommonJS scripts may use require().
    files: ["scripts/**/*.js", "**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
   // Test files, type definitions, and config files may use any
   files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx", "**/*.d.ts", "**/*.config.ts", "**/*.config.js"],
   rules: {
     "@typescript-eslint/no-explicit-any": "off",
   },
  },
  {
   // Voice/audio and three.js integration files require 'any' for third-party types
   files: ["**/Voice/**", "**/voice/**", "**/futuristic/**", "**/lib/ai/**", "**/lib/audit/**"],
   rules: {
     "@typescript-eslint/no-explicit-any": "warn",
   },
  },
]);

export default eslintConfig;
