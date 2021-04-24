const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const deps = require("./package.json").dependencies;
// const EnvironmentPlugin = require("webpack/lib/EnvironmentPlugin");

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
  mode: mode,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 2000, // Seems to stabilise HMR file change detection
    ignored: "/node_modules/"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3009
  },
  devtool: devtool,
  optimization: {
    minimize: minimize,
  },
  output: {
    publicPath: "http://localhost:3009/",
    filename: '[name].[contenthash].dspUtils.js',
  },
  resolve: {
    extensions: [
      ".ts", 
      ".tsx", 
      ".js", 
      ".jsx", 
      ".css",
      ".sass",
      ".scss",
      ".svg",
      "png",
      "jpg",
      "jpeg",
      "gif",
      "ttf",
      "woff",
      "woff2",
      "eot",
    ],
    alias: { 
      "crypto": "crypto-browserify",
      "path": "path-browserify",
      "stream": "stream-browserify",
      "vm": "vm-browserify",
      "assets": path.resolve(__dirname, 'src/assets/')
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
          presets: [
            "@babel/preset-env",
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
          presets: ["@babel/preset-react"]
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
        test: /\.(png|jpg|jpeg|gif|ttf|woff|woff2|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000 } }]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        oneOf: [
          {
            // in css files, svg is loaded as a url formatted string
            issuer: /\.css$/ ,
            use: {
              loader: 'svg-url-loader',
              options: { encoding: 'none', limit: 10000 }
            }
          },
          {
            // in js, jsx, ts, and tsx files svg is loaded as a raw string
            issuer: /\.(js|jsx|ts|tsx)$/,
            use: {
              loader: 'raw-loader'
            }
          }
        ]
      }
    ]
  },
  plugins: [
//    new EnvironmentPlugin({
//      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
//      DEBUG: false
//    }),
    new ModuleFederationPlugin({
      name: "dspUtils",
      filename: "dspUtils.js",
      exposes: {
        "./UserPostListExample": "./src/components/UserPostList",
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
      template: "./public/index.html"
    })
  ]
};
