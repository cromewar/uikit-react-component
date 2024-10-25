import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json"; // Add the JSON plugin

export default {
  input: "src/AnimateUIKit.tsx",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.es.js",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    json(), // Enable Rollup to handle JSON imports
    terser(),
  ],
  external: ["react", "react-dom"],
};
