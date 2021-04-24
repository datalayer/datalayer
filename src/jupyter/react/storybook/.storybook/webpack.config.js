const path = require("path");

const SRC_PATH = path.join(__dirname, './../src');
const STORIES_PATH = path.join(__dirname, './../stories');

// dont need stories path if you have your stories inside your components folder
module.exports = ({config}) => {

  // https://github.com/webpack-contrib/css-loader/issues/295#issuecomment-644131089
  config.module.rules = config.module.rules.filter(rule => rule.test.toString().indexOf('css') == -1)
  
  config.module.rules.push({
    // This is so that we can compile any React,
    // ES6 and above into normal ES5 syntax.
    test: /\.(js|jsx)$/,
    use: [
      {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-react",
        ],
        cacheDirectory: true
      }
    }],
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [
      SRC_PATH, 
      STORIES_PATH
    ],
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
          options: {
            configFileName: './tsconfig.json'
          }
        },
//        https://github.com/storybookjs/storybook/issues/3968        
        { loader: require.resolve('react-docgen-typescript-loader') }
      ],
    });
  config.resolve.extensions.push('.ts', '.tsx', 'js', 'jsx');

  config.module.rules.push({
    test: /\.css?$/,
    use: ['style-loader', 'css-loader'],
  });
  config.resolve.extensions.push('css');

  config.module.rules.push({
    test: /\.s[ac]ss(\?v=\d+\.\d+\.\d+)?$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  });
  config.resolve.extensions.push('scss', 'sass');

  // Remove rule for images defined by file-loader
  config.module.rules = config.module.rules.filter(
    rule => ! rule.test.toString().includes('jpg')
  );

  config.module.rules.push({
    test: /\.(png|jpg|jpeg|gif|ttf|woff|woff2|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [{ loader: 'url-loader', options: { limit: 10000 } }],
  });
  config.resolve.extensions.push('png', 'jpg', 'jpeg', 'gif', 'ttf', 'woff', 'woff2', 'eot');

  config.module.rules.push({
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
    ],
  });
  config.resolve.extensions.push('svg');

  config.resolve.alias =  Object.assign(config.resolve.alias, { 
    "crypto": "crypto-browserify",
    "path": "path-browserify",
    "stream": "stream-browserify",
    "vm": "vm-browserify",
    "assets": path.resolve(__dirname, './../src/assets/')
  });

//  const babelLoader = config.module.rules[0];
//  babelLoader.exclude.push(require.resolve('./node_modules'));

  return config;

};
