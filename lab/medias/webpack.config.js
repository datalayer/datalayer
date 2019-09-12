module.exports = {
    entry: './src/scrs.js',
    node: {
        fs: 'empty',
        child_process: 'empty'
    },
    module: {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
      }
};
