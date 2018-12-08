const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        'main': './js/chord.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'typeof __DEV__': JSON.stringify('boolean'),
            __DEV__: true
        }),
        new HtmlWebpackPlugin({
            template: './html/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        open: false
    },
    // resolve:{
    //     alias: ''
    // },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    }
};