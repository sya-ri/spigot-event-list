import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

const config = [
  {
    ignores: [
      ".next/**",
      "data/**/*.json",
      "spigot-javadoc/docs/**",
      "skills/**/*.md",
    ],
  },
  ...nextCoreWebVitals,
  {
    rules: prettier.rules,
  },
];

export default config;
