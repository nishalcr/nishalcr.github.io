import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

// Next 16 ships native flat-config arrays — spread them directly.
const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },
  ...coreWebVitals,
  ...typescript,
  prettier,
];

export default config;
