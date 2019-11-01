var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './lib/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'datalayer_webpack_ts_bundle.js'
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']}
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'public/index.html'
        })
    ]
}
