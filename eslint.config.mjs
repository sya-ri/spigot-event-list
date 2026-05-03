import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

const config = [
  ...nextCoreWebVitals,
  {
    rules: prettier.rules,
  },
];

export default config;
