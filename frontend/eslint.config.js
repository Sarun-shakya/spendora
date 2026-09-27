import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: { ecmaVersion: "latest", ecmaFeatures: { jsx: true }, sourceType: "module" },
    },
    rules: {
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
      // Fetch-on-mount hooks (useBooks, useTransactions, useAnalytics, etc.)
      // intentionally call their setState-based refetch() inside a mount effect —
      // this is the standard "fetch on mount" pattern used throughout this app.
      "react-hooks/set-state-in-effect": "off",
      // AuthContext intentionally exports both AuthProvider and the useAuth hook.
      "react-refresh/only-export-components": "warn",
    },
  },
]);
