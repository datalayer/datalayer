const path = require('path');

const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../story');

module.exports = ({ config }) => {

  // don't use storybook's default svg configuration
  // https://github.com/storybookjs/storybook/issues/6758
  config.module.rules = config.module.rules.map(rule => {
    if (rule.test.toString().includes('svg')) {
      const test = rule.test
        .toString()
        .replace('svg|', '')
        .replace(/\//g, '');
      return { ...rule, test: new RegExp(test) };
    } else {
      return rule;
    }
  });

  // ts rules
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    // dont need stories path if you have your stories inside your src folder
    include: [SRC_PATH, STORIES_PATH],
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          configFileName: './.storybook/tsconfig.json'
        }
      },
      { loader: require.resolve('react-docgen-typescript-loader') }
    ]
  });

  // automatically in `DocsPage` or the `Source` doc block.
  config.module.rules.push({
    test: /\.(stories|story)\.[tj]sx?$/,
    exclude: /node_modules/,
    loader: require.resolve('@storybook/source-loader'),
    enforce: 'pre',
  });

  config.resolve.extensions.push('.ts', '.tsx');

  // svg rules
  config.module.rules.push({
    // in css files, svg is loaded as a url formatted string
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: { test: /\.css$/ },
    use: {
      loader: 'svg-url-loader',
      options: { encoding: 'none', limit: 10000 }
    }
  });

//  config.module.rules.push({
//    test: /\.css?$/,
//    use: ['style-loader', 'css-loader'],
//  });
//  config.resolve.extensions.push('css');

  config.module.rules.push({
    test: /\.s[ac]ss(\?v=\d+\.\d+\.\d+)?$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  });
  config.resolve.extensions.push('scss', 'sass');

  config.module.rules.push({
    // in js, jsx, ts, and tsx files svg is loaded as a raw string
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    issuer: { test: /\.(js|jsx|ts|tsx)$/, },
    use: {
      loader: 'raw-loader'
    }
  });

  config.node = {
    fs: 'empty'
  };

  return config;

};
