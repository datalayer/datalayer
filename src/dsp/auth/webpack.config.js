const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const path = require("path");

const IS_PRODUCTION = process.argv.indexOf('--production') > -1;
let mode = "development";
if (IS_PRODUCTION) {
  mode = "production";
}
let devtool = "inline-source-map";
if (IS_PRODUCTION) {
  devtool = false;
}
let minimize = false;
if (IS_PRODUCTION) {
  minimize = true;
}

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
    port: 3001,
    historyApiFallback: true,
  },
  devtool: devtool,
  optimization: {
    minimize: minimize,
  },
  output: {
    publicPath: "http://localhost:3001/",
    filename: '[name].[contenthash].dspAuth.js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: { 
      path: "path-browserify"
    },
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
        options: {
          plugins: [
            "@babel/plugin-proposal-class-properties",
          ],
          presets: [
            "@babel/preset-react",
            "@babel/preset-typescript"
          ],
          cacheDirectory: true
        }
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
          cacheDirectory: true
        }
      },
      {
        test: /\.s[ac]ss(\?v=\d+\.\d+\.\d+)?$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css?$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // In .css files, svg is loaded as a data URI.
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.css$/,
        use: {
          loader: 'svg-url-loader',
          options: { encoding: 'none', limit: 10000 }
        }
      },
      {
        // In .ts and .tsx files (both of which compile to .js), svg files
        // must be loaded as a raw string instead of data URIs.
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.js$/,
        use: {
          loader: 'raw-loader'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|ttf|woff|woff2|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000 } }],
      },
     ]
  },
  plugins: [
//    new webpack.ProvidePlugin({
//      process: 'process/browser'
//    }),  
    new webpack.DefinePlugin({
      "process.env": "{}"
    }),
    new ModuleFederationPlugin({
      name: "dspAuth",
      filename: "dspAuth.js",
      exposes: {
        "./routes": "./src/routes",
        './appNameState': './src/state/examples/appName',
        './AuthContext': './src/auth/AuthContext',
        './Auth': './src/Auth',
        './LoginForm': './src/components/auth/LoginForm',
        './CompositeAppWithStore': './src/components/examples/CompositeAppWithStore'
      },
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
