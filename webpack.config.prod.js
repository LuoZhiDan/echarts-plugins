const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        'UIDesigner/scripts/exts/echarts4/echarts-plugins': './index.js', // 加上目录名称
        'runtime/scripts/exts/echarts4/echarts-plugins': './index.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'typeof __DEV__': JSON.stringify('boolean'),
            __DEV__: true
        })
    ],
    output: {
        libraryTarget: 'amd',
        library: 'echarts-plugins',
        path: __dirname + '/../../',
        filename: '[name].js'
    }
};