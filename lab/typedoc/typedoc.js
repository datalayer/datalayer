module.exports = {
  name: "datalab-typedoc",
  mode: "modules",
  out: "_gen/doc2",
  theme: "default",
  ignoreCompilerErrors: "true",
  preserveConstEnums: "true",
  exclude: [
    "*.spec.ts",
    "*.test.ts",
    "**/node_modules/**",
    "**/__tests__/**",
    "**/packages/vega-embed2/**",
    "*.js"
  ],
  externalPattern: "**/node_modules/**",
  excludeExternals: "true",
  stripInternal: "false",
  tsconfig: "tsconfig.base.json"
};
