import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "./src/app.ts",
  output: {
    dir: "./src/dist",
    format: "esm",
  },
  watch: {
    include: "src/**",
  },
  cache: false,
  external: ["discord.js"],
  plugins: [nodeResolve(), terser(), typescript()],
};
