module.exports = {
  entry: ['./lib/index.js'],
  output: {
    path: require('path').join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: 'development'
}
