const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 2000, // Seems to stabilise HMR file change detection
    ignored: "/node_modules/"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3101,
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:3101/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        dspWidgets: "dspWidgets@http://localhost:3002/dspWidgets.js",
        dspUtils: "dspUtils@http://localhost:3009/dspUtils.js",
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
