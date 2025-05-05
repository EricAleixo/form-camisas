const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-expressions": "off", // <- Desativa a regra
      "@typescript-eslint/no-unused-vars": "warn",       // <- Só alerta
    },
  },
];
