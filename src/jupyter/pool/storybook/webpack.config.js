const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const EnvironmentPlugin = require("webpack/lib/EnvironmentPlugin");

const path = require("path");

module.exports = {
  entry: "./src/example",
  mode: "development",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 2000, // Seems to stabilise HMR file change detection
    ignored: "/node_modules/"
  },
  devServer: {
//    contentBase: path.join(__dirname, "dist"),
    port: 3002
  },
  output: {
    publicPath: "http://localhost:3002/",
    filename: '[name].[contenthash].dlaWidgets.js',
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
      "assets": path.resolve(__dirname, 'src/assets/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-react"
          ]
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
        test: /\.s[ac]ss(\?v=\d+\.\d+\.\d+)?$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css?$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ttf|woff|woff2|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000 } }],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        oneOf: [
          {
            // In css files, svg is loaded as a url formatted string.
            issuer: /\.css$/ ,
            use: {
              loader: 'svg-url-loader',
              options: { encoding: 'none', limit: 10000 }
            }
          },
          {
            // In js, jsx, ts, and tsx files svg is loaded as a raw string.
            issuer: /\.(js|jsx|ts|tsx)$/,
            use: {
              loader: 'raw-loader'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_DEBUG': false,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
//    new EnvironmentPlugin({
//      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
//      DEBUG: false
//    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
